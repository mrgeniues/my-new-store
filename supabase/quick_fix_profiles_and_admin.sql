-- ============================================================================
-- SUPABASE QUICK FIX: USER SIGNUP AUTO-SAVE & ADMIN PRIVILEGES
-- ============================================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/rqemoitjanmxsmcmveso
-- 2. Go to: SQL Editor (left sidebar)
-- 3. Click: "+ New query"
-- 4. Paste ALL of this code and click "Run" (green button)
-- ============================================================================

-- STEP 1: Ensure profiles table has all required columns
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

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'member';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en';

-- STEP 2: Configure open Row Level Security (RLS) policies so signups are never blocked
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all users to read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow anon profile insert during signup" ON public.profiles;

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

-- STEP 3: Create the automatic database trigger on auth.users
-- Whenever ANY user signs up, this function copies their data into public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_whatsapp TEXT;
  user_role TEXT;
BEGIN
  -- Extract full name from metadata or username
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1),
    'VIP Member'
  );

  -- Extract WhatsApp number from signup data
  user_whatsapp := COALESCE(NEW.raw_user_meta_data->>'whatsapp_number', '');

  -- Auto-assign admin role if email matches admin patterns
  IF (
    NEW.email ILIKE 'admin@%' OR 
    NEW.email ILIKE 'superadmin@%' OR 
    NEW.email ILIKE '%@aitools.store' OR 
    NEW.email = 'admin@aitools.vip'
  ) THEN
    user_role := 'admin';
  ELSE
    user_role := 'member';
  END IF;

  -- Upsert into public.profiles
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

-- Attach trigger to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- STEP 4: Immediately sync ALL existing accounts from auth.users into public.profiles
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

-- STEP 5: Verification Check
-- After running, this returns all user profiles now saved in your database:
SELECT id, full_name, email, whatsapp_number, role, created_at FROM public.profiles ORDER BY created_at DESC;
