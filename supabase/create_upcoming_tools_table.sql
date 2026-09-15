-- ==============================================================================
-- AI TOOLS STORE: UPCOMING TOOLS & DISCOUNT SYSTEM MIGRATION SCRIPT
-- Copy & Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Create `upcoming_tools` Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.upcoming_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  image TEXT,
  description TEXT NOT NULL,
  expected_date TEXT DEFAULT 'Coming Soon',
  badge TEXT DEFAULT '🚀 UPCOMING',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 2. Performance Indexes
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_upcoming_tools_active ON public.upcoming_tools (active, sort_order);

-- ------------------------------------------------------------------------------
-- 3. Row Level Security (RLS) Policies
-- ------------------------------------------------------------------------------
ALTER TABLE public.upcoming_tools ENABLE ROW LEVEL SECURITY;

-- Allow everyone (public/visitors) to view active upcoming tools
DROP POLICY IF EXISTS "Public can view upcoming tools" ON public.upcoming_tools;
CREATE POLICY "Public can view upcoming tools"
  ON public.upcoming_tools
  FOR SELECT
  TO public
  USING (true);

-- Allow inserting upcoming tools (Admin / authenticated or public fallback)
DROP POLICY IF EXISTS "Enable insert for upcoming_tools" ON public.upcoming_tools;
CREATE POLICY "Enable insert for upcoming_tools"
  ON public.upcoming_tools
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow updating upcoming tools
DROP POLICY IF EXISTS "Enable update for upcoming_tools" ON public.upcoming_tools;
CREATE POLICY "Enable update for upcoming_tools"
  ON public.upcoming_tools
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow deleting upcoming tools
DROP POLICY IF EXISTS "Enable delete for upcoming_tools" ON public.upcoming_tools;
CREATE POLICY "Enable delete for upcoming_tools"
  ON public.upcoming_tools
  FOR DELETE
  TO public
  USING (true);

-- ------------------------------------------------------------------------------
-- 4. Add `discount_percent` to Existing `tools` and `hot_deals` Tables
-- ------------------------------------------------------------------------------
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS discount_percent NUMERIC DEFAULT 0;
ALTER TABLE public.hot_deals ADD COLUMN IF NOT EXISTS discount_percent NUMERIC DEFAULT 0;

-- ------------------------------------------------------------------------------
-- 5. Seed Initial Demo Upcoming Tool (Only if table is currently empty)
-- ------------------------------------------------------------------------------
INSERT INTO public.upcoming_tools (title, description, image, badge, expected_date, sort_order)
SELECT 
  'Sora Video Creator Pro',
  'Next-generation text-to-photorealistic-video engine with 1080p high definition scene composition and AI voice synchronization.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  '🚀 UPCOMING',
  'Coming Soon',
  1
WHERE NOT EXISTS (SELECT 1 FROM public.upcoming_tools LIMIT 1);

