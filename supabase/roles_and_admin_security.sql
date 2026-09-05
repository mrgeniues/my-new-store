-- ============================================================================
-- SUPABASE ROLE-BASED ACCESS CONTROL (RBAC) & ADMIN SECURITY
-- ============================================================================
-- ROLES:
--   1. 'admin'  : Full access to Admin Panel, editing tools, managing users,
--                 uploading images, and configuring settings.
--   2. 'member' : Standard user. NO access to Admin Panel, NO access to edit
--                 or delete tools, NO admin panel shown in UI or database.
-- ============================================================================
-- INSTRUCTIONS TO RUN:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/rqemoitjanmxsmcmveso
-- 2. Click "SQL Editor" on the left navigation.
-- 3. Click "+ New query", paste this entire script, and click "Run".
-- ============================================================================

-- STEP 1: Ensure profiles table has strict role column ('admin' or 'member')
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT,
  preferred_language TEXT DEFAULT 'en',
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure columns exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'member';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en';

-- Add check constraint for valid roles ('admin' or 'member')
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS check_valid_role;
ALTER TABLE public.profiles ADD CONSTRAINT check_valid_role CHECK (role IN ('admin', 'member'));

-- ============================================================================
-- STEP 2: HELPER FUNCTION: is_admin()
-- Returns TRUE only if the authenticated user has role = 'admin' in public.profiles
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================================
-- STEP 3: ROW LEVEL SECURITY ON PROFILES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all users to read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow anon profile insert during signup" ON public.profiles;
DROP POLICY IF EXISTS "Profiles read policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles insert policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles update policy" ON public.profiles;

-- 1. Everyone can read profiles (members see their account; admins view directory)
CREATE POLICY "Profiles read policy"
ON public.profiles FOR SELECT
TO public
USING (true);

-- 2. Any new signup can insert their initial profile
CREATE POLICY "Profiles insert policy"
ON public.profiles FOR INSERT
TO public
WITH CHECK (true);

-- 3. Regular users can only update their own profile; ONLY Admins can change roles
CREATE POLICY "Profiles update policy"
ON public.profiles FOR UPDATE
TO public
USING (auth.uid() = id OR public.is_admin())
WITH CHECK (
  public.is_admin() OR 
  (auth.uid() = id AND (role IS NULL OR role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())))
);

-- ============================================================================
-- STEP 4: ROW LEVEL SECURITY ON TOOLS TABLE (ADMIN ONLY CAN EDIT/ADD/DELETE)
-- ============================================================================
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public users can view active tools" ON public.tools;
DROP POLICY IF EXISTS "Allow anon read all for admin preview" ON public.tools;
DROP POLICY IF EXISTS "Authenticated admins have full control" ON public.tools;
DROP POLICY IF EXISTS "Allow public read tools" ON public.tools;
DROP POLICY IF EXISTS "Allow admin full control tools" ON public.tools;
DROP POLICY IF EXISTS "Tools read policy" ON public.tools;
DROP POLICY IF EXISTS "Tools admin insert policy" ON public.tools;
DROP POLICY IF EXISTS "Tools admin update policy" ON public.tools;
DROP POLICY IF EXISTS "Tools admin delete policy" ON public.tools;

-- 1. Public & Members can VIEW tools in the marketplace catalog
CREATE POLICY "Tools read policy"
ON public.tools FOR SELECT
TO public
USING (true);

-- 2. ONLY Admins can INSERT new tools into the catalog
CREATE POLICY "Tools admin insert policy"
ON public.tools FOR INSERT
TO public
WITH CHECK (public.is_admin());

-- 3. ONLY Admins can UPDATE/EDIT tools (name, price, active, featured, etc.)
CREATE POLICY "Tools admin update policy"
ON public.tools FOR UPDATE
TO public
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 4. ONLY Admins can DELETE tools
CREATE POLICY "Tools admin delete policy"
ON public.tools FOR DELETE
TO public
USING (public.is_admin());

-- ============================================================================
-- STEP 5: ROW LEVEL SECURITY ON STORAGE (TOOL-IMAGES BUCKET)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('tool-images', 'tool-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view tool images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can upload tool images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can modify tool images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can delete tool images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload tool images" ON storage.objects;
DROP POLICY IF EXISTS "Public can update tool images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete tool images" ON storage.objects;

-- 1. Anyone can view tool images
CREATE POLICY "Public can view tool images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'tool-images');

-- 2. ONLY Admins can upload images
CREATE POLICY "Only admins can upload tool images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'tool-images' AND public.is_admin());

-- 3. ONLY Admins can update images
CREATE POLICY "Only admins can update tool images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'tool-images' AND public.is_admin());

-- 4. ONLY Admins can delete images
CREATE POLICY "Only admins can delete tool images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'tool-images' AND public.is_admin());

-- ============================================================================
-- STEP 6: AUTOMATIC SIGNUP TRIGGER (DEFAULTS TO 'member', 'admin' IF ADMIN EMAIL)
-- ============================================================================
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

  -- Automatically assign 'admin' ONLY if email is in the admin format
  IF (
    NEW.email ILIKE 'admin@%' OR 
    NEW.email ILIKE 'superadmin@%' OR 
    NEW.email ILIKE '%@aitools.store' OR 
    NEW.email = 'admin@aitools.vip'
  ) THEN
    user_role := 'admin';
  ELSE
    user_role := 'member'; -- Normal users are ALWAYS standard members!
  END IF;

  INSERT INTO public.profiles (id, full_name, email, whatsapp_number, preferred_language, role, created_at, updated_at)
  VALUES (
    NEW.id,
    user_full_name,
    NEW.email,
    user_whatsapp,
    'en',
    user_role,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    whatsapp_number = COALESCE(NULLIF(EXCLUDED.whatsapp_number, ''), public.profiles.whatsapp_number),
    role = CASE WHEN public.profiles.role = 'admin' THEN 'admin' ELSE EXCLUDED.role END,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STEP 7: SYNC EXISTING USERS FROM AUTH.USERS TO PUBLIC.PROFILES
-- ============================================================================
INSERT INTO public.profiles (id, full_name, email, whatsapp_number, preferred_language, role, created_at, updated_at)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1), 'VIP Member'),
  u.email,
  COALESCE(u.raw_user_meta_data->>'whatsapp_number', ''),
  'en',
  CASE 
    WHEN (u.email ILIKE 'admin@%' OR u.email ILIKE 'superadmin@%' OR u.email ILIKE '%@aitools.store' OR u.email = 'admin@aitools.vip') THEN 'admin'
    ELSE 'member'
  END,
  u.created_at,
  now()
FROM auth.users u
ON CONFLICT (id) DO UPDATE
SET
  full_name = EXCLUDED.full_name,
  whatsapp_number = COALESCE(NULLIF(EXCLUDED.whatsapp_number, ''), public.profiles.whatsapp_number),
  updated_at = now();

-- ============================================================================
-- STEP 8: HOW TO MAKE ANY ACCOUNT AN ADMIN (OR DEMOTE TO MEMBER)
-- ============================================================================
-- To make your account an Administrator:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'YOUR_EMAIL@gmail.com';

-- To demote an account back to standard Member:
-- UPDATE public.profiles SET role = 'member' WHERE email = 'SOME_USER@gmail.com';

-- View all users and their roles:
SELECT id, full_name, email, role, created_at FROM public.profiles ORDER BY created_at DESC;
