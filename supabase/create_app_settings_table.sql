-- ==============================================================================
-- AI TOOLS STORE: APP SETTINGS & WEBHOOK CONFIGURATION TABLE
-- Copy & Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- ==============================================================================

-- 1. Create `app_settings` Table
CREATE TABLE IF NOT EXISTS public.app_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  new_user_webhook_url TEXT,
  new_user_webhook_enabled BOOLEAN DEFAULT true,
  mcp_webhook_url TEXT,
  mcp_secret_key TEXT,
  admin_whatsapp_number TEXT,
  admin_whatsapp_url TEXT,
  global_discount_percent INTEGER DEFAULT 0,
  global_discount_active BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure columns exist if table was already present
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS new_user_webhook_url TEXT;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS new_user_webhook_enabled BOOLEAN DEFAULT true;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS mcp_webhook_url TEXT;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS mcp_secret_key TEXT;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS admin_whatsapp_number TEXT;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS admin_whatsapp_url TEXT;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS global_discount_percent INTEGER DEFAULT 0;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS global_discount_active BOOLEAN DEFAULT false;
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- 2. Insert Default Row if missing
INSERT INTO public.app_settings (id, new_user_webhook_url, new_user_webhook_enabled, updated_at)
VALUES ('global', '', true, now())
ON CONFLICT (id) DO NOTHING;

-- 3. Row Level Security (RLS)
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Allow everyone (public/all visitors) to read app settings
DROP POLICY IF EXISTS "Allow public read access to app_settings" ON public.app_settings;
CREATE POLICY "Allow public read access to app_settings"
  ON public.app_settings
  FOR SELECT
  TO public
  USING (true);

-- Allow admins or service to insert/update settings
DROP POLICY IF EXISTS "Allow update app_settings" ON public.app_settings;
CREATE POLICY "Allow update app_settings"
  ON public.app_settings
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
