-- ============================================================================
-- AI TOOLS STORE - SUPABASE DATABASE & TABLE EDITOR SETUP SCRIPT
-- ============================================================================
-- This script creates and secures ALL database tables so you can view, edit,
-- and manage all data in your Supabase Table Editor:
--   1. public.profiles        -> All registered users & their WhatsApp numbers / roles
--   2. public.tools           -> All AI tools in your catalog
--   3. public.contact_messages -> Inquiries & messages submitted from the Contact page
--   4. public.orders          -> Tool purchase clicks & WhatsApp order inquiries
--   5. storage.buckets        -> tool-images bucket for uploading logos & banners
-- ============================================================================
-- HOW TO RUN:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/rqemoitjanmxsmcmveso
-- 2. In the left sidebar, click "SQL Editor"
-- 3. Click "+ New query"
-- 4. Paste ALL of this code into the editor and click "Run" (green button)
-- 5. Then go to "Table Editor" in the left sidebar to see all your tables & data!
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. PROFILES TABLE (REGISTERED USERS & ROLES)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT,
  preferred_language TEXT DEFAULT 'en',
  role TEXT NOT NULL DEFAULT 'member', -- 'admin' or 'member'
  last_sign_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure all columns exist even if table was created previously
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'member';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMPTZ;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Reset and create RLS policies for profiles
DROP POLICY IF EXISTS "Allow all users to read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles read policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles insert policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles update policy" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Allow all users to read profiles"
ON public.profiles FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow all users to insert profiles"
ON public.profiles FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow all users to update profiles"
ON public.profiles FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Trigger: Automatically copy new signups from auth.users into public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_whatsapp TEXT;
  user_role TEXT;
BEGIN
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1),
    'VIP Member'
  );

  user_whatsapp := COALESCE(NEW.raw_user_meta_data->>'whatsapp_number', '');

  -- Automatically assign admin role if email matches admin patterns
  IF (
    NEW.email ILIKE 'admin@%' OR 
    NEW.email ILIKE 'superadmin@%' OR 
    NEW.email ILIKE '%@aitools.store' OR 
    NEW.email = 'admin@aitools.vip' OR
    NEW.email = 'numanali1n@gmail.com'
  ) THEN
    user_role := 'admin';
  ELSE
    user_role := 'member';
  END IF;

  INSERT INTO public.profiles (id, full_name, email, whatsapp_number, preferred_language, role, last_sign_in_at, created_at, updated_at)
  VALUES (
    NEW.id,
    user_full_name,
    NEW.email,
    user_whatsapp,
    'en',
    user_role,
    NEW.last_sign_in_at,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    whatsapp_number = COALESCE(NULLIF(EXCLUDED.whatsapp_number, ''), public.profiles.whatsapp_number),
    role = CASE WHEN public.profiles.role = 'admin' THEN 'admin' ELSE EXCLUDED.role END,
    last_sign_in_at = EXCLUDED.last_sign_in_at,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Immediate Sync: Copy existing auth.users into public.profiles
INSERT INTO public.profiles (id, full_name, email, whatsapp_number, preferred_language, role, last_sign_in_at, created_at, updated_at)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1), 'VIP Member'),
  u.email,
  COALESCE(u.raw_user_meta_data->>'whatsapp_number', ''),
  'en',
  CASE 
    WHEN (u.email ILIKE 'admin@%' OR u.email ILIKE 'superadmin@%' OR u.email ILIKE '%@aitools.store' OR u.email = 'admin@aitools.vip' OR u.email = 'numanali1n@gmail.com') THEN 'admin'
    ELSE 'member'
  END,
  u.last_sign_in_at,
  u.created_at,
  now()
FROM auth.users u
ON CONFLICT (id) DO UPDATE
SET
  full_name = EXCLUDED.full_name,
  whatsapp_number = COALESCE(NULLIF(EXCLUDED.whatsapp_number, ''), public.profiles.whatsapp_number),
  last_sign_in_at = EXCLUDED.last_sign_in_at,
  updated_at = now();


-- ============================================================================
-- 2. TOOLS TABLE (AI TOOLS CATALOG)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  short_description TEXT,
  full_description TEXT,
  price TEXT NOT NULL DEFAULT '$19 /month',
  category TEXT NOT NULL DEFAULT 'AI Writing',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  how_to_use JSONB NOT NULL DEFAULT '[]'::jsonb,
  tutorial_video_url TEXT,
  tool_url TEXT,
  whatsapp_url TEXT,
  rating NUMERIC(3, 2) DEFAULT 4.80,
  users_count TEXT DEFAULT '10.5K',
  badge TEXT,
  badge_type TEXT DEFAULT 'new',
  icon_gradient TEXT,
  theme_color TEXT DEFAULT 'blue',
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tools_active ON public.tools(active);
CREATE INDEX IF NOT EXISTS idx_tools_category ON public.tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read tools" ON public.tools;
DROP POLICY IF EXISTS "Public users can view active tools" ON public.tools;
DROP POLICY IF EXISTS "Allow anon read all for admin preview" ON public.tools;
DROP POLICY IF EXISTS "Authenticated admins have full control" ON public.tools;
DROP POLICY IF EXISTS "Tools read policy" ON public.tools;
DROP POLICY IF EXISTS "Tools admin insert policy" ON public.tools;
DROP POLICY IF EXISTS "Tools admin update policy" ON public.tools;
DROP POLICY IF EXISTS "Tools admin delete policy" ON public.tools;
DROP POLICY IF EXISTS "Allow full access to tools" ON public.tools;

CREATE POLICY "Allow full access to tools"
ON public.tools FOR ALL
TO public
USING (true)
WITH CHECK (true);


-- ============================================================================
-- 3. CONTACT_MESSAGES TABLE (INQUIRIES FROM CONTACT PAGE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow public read contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow full access to contact messages" ON public.contact_messages;

CREATE POLICY "Allow full access to contact messages"
ON public.contact_messages FOR ALL
TO public
USING (true)
WITH CHECK (true);


-- ============================================================================
-- 4. ORDERS TABLE (TOOL PURCHASE CLICKS & WHATSAPP ORDERS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE SET NULL,
  tool_name TEXT NOT NULL,
  price TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  status TEXT NOT NULL DEFAULT 'inquiry_whatsapp',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow full access to orders" ON public.orders;

CREATE POLICY "Allow full access to orders"
ON public.orders FOR ALL
TO public
USING (true)
WITH CHECK (true);


-- ============================================================================
-- 5. STORAGE BUCKET (TOOL-IMAGES FOR UPLOADING LOGOS/PICTURES)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('tool-images', 'tool-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view tool images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload tool images" ON storage.objects;
DROP POLICY IF EXISTS "Public can update tool images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete tool images" ON storage.objects;
DROP POLICY IF EXISTS "Full access to tool images" ON storage.objects;

CREATE POLICY "Full access to tool images"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'tool-images')
WITH CHECK (bucket_id = 'tool-images');
