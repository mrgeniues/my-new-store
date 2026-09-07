-- ============================================================================
-- COUNTRY PRICING & USER GEO-LOCATION DATABASE MIGRATION
-- Run this script in your Supabase SQL Editor: Dashboard > SQL Editor > New Query
-- ============================================================================

-- 1. Add country_pricing JSONB column to public.tools (supports Pakistan, India, UAE, Global, etc.)
ALTER TABLE public.tools 
ADD COLUMN IF NOT EXISTS country_pricing JSONB DEFAULT '{}'::jsonb;

-- 2. Add country TEXT column to public.profiles (stores selected country on account creation)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Pakistan';

-- 3. Update automatic signup trigger to save user's country from registration metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_whatsapp TEXT;
  user_country TEXT;
  user_role TEXT;
BEGIN
  -- Extract full name
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1),
    'VIP Member'
  );

  -- Extract WhatsApp number
  user_whatsapp := COALESCE(NEW.raw_user_meta_data->>'whatsapp_number', '');

  -- Extract selected Country (default: Pakistan)
  user_country := COALESCE(NEW.raw_user_meta_data->>'country', 'Pakistan');

  -- Auto-assign admin role if email matches admin patterns
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

  -- Insert or update profile
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

-- 4. Set sensible sample country pricing for existing tools (if null)
UPDATE public.tools
SET country_pricing = jsonb_build_object(
  'Pakistan', 'Rs 1,500 /month',
  'India', '₹499 /month',
  'United Arab Emirates', 'AED 49 /month',
  'DEFAULT', COALESCE(price, '$19 /month')
)
WHERE country_pricing IS NULL OR country_pricing = '{}'::jsonb;

-- Confirmation query
SELECT id, name, price, country_pricing FROM public.tools LIMIT 5;
