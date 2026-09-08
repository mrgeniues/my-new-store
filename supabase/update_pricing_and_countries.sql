-- ============================================================================
-- MULTI-COUNTRY PRICING & USER REGION MIGRATION SCRIPT
-- Run this in your Supabase Dashboard: SQL Editor > New Query > Run
-- ============================================================================

-- 1. Ensure `country_pricing` JSONB column exists on public.tools
ALTER TABLE public.tools 
ADD COLUMN IF NOT EXISTS country_pricing JSONB DEFAULT '{}'::jsonb;

-- 2. Ensure `country` column exists on public.profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Pakistan';

-- 3. Update auth signup trigger to automatically save user's selected country
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_whatsapp TEXT;
  user_country TEXT;
  user_role TEXT;
BEGIN
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1),
    'VIP Member'
  );

  user_whatsapp := COALESCE(NEW.raw_user_meta_data->>'whatsapp_number', '');
  user_country := COALESCE(NEW.raw_user_meta_data->>'country', 'Pakistan');

  -- Auto-assign admin role for admin emails
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

  INSERT INTO public.profiles (id, full_name, email, whatsapp_number, country, preferred_language, role, created_at, updated_at)
  VALUES (
    NEW.id,
    user_full_name,
    LOWER(NEW.email),
    user_whatsapp,
    user_country,
    'en',
    user_role,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    whatsapp_number = COALESCE(NULLIF(EXCLUDED.whatsapp_number, ''), public.profiles.whatsapp_number),
    country = COALESCE(NULLIF(EXCLUDED.country, ''), public.profiles.country),
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Update existing tools with complete default multi-country pricing (if empty)
UPDATE public.tools
SET country_pricing = jsonb_build_object(
  'Pakistan', COALESCE(country_pricing->>'Pakistan', '1,500 PKR /month'),
  'India', COALESCE(country_pricing->>'India', '₹499 /month'),
  'United Arab Emirates', COALESCE(country_pricing->>'United Arab Emirates', 'AED 49 /month'),
  'Saudi Arabia', COALESCE(country_pricing->>'Saudi Arabia', 'SAR 49 /month'),
  'United States', COALESCE(country_pricing->>'United States', '$19 /month'),
  'United Kingdom', COALESCE(country_pricing->>'United Kingdom', '£15 /month'),
  'DEFAULT', COALESCE(country_pricing->>'DEFAULT', COALESCE(price, '$19 /month'))
)
WHERE country_pricing IS NULL OR country_pricing = '{}'::jsonb;

-- 5. Verification query: view updated sample tools
SELECT id, name, price, country_pricing FROM public.tools LIMIT 5;
