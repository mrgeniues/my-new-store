-- ==============================================================================
-- AI TOOLS STORE: HOT DEALS SCHEMA & POLICIES
-- Supports custom promotional offers like Buy 1 Get 1 Free, custom quantities,
-- multi-country localized pricing, stock urgency, and countdown timers.
-- ==============================================================================

-- 1. Create hot_deals table
CREATE TABLE IF NOT EXISTS public.hot_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  short_description TEXT,
  full_description TEXT,
  category TEXT DEFAULT 'Promotions & Bundles',
  
  -- Deal Offer Specifications
  offer_label TEXT NOT NULL DEFAULT 'Buy 1 Get 1 Free',
  buy_quantity INTEGER NOT NULL DEFAULT 1,
  free_quantity INTEGER NOT NULL DEFAULT 1,
  duration TEXT DEFAULT '1 Month', -- e.g. 7 Days, 1 Month, 3 Months, 6 Months, 1 Year, 18 Months, Lifetime
  
  -- Pricing & Multi-Currency Support
  deal_price TEXT NOT NULL DEFAULT 'PKR 1,999 /mo',
  regular_price TEXT DEFAULT 'PKR 3,999 /mo',
  country_pricing JSONB DEFAULT '{
    "Pakistan": "PKR 1,999 /mo",
    "India": "INR 999 /mo",
    "United Arab Emirates": "AED 45 /mo",
    "Saudi Arabia": "SAR 49 /mo",
    "United States": "USD $14.99 /mo",
    "United Kingdom": "GBP £11.99 /mo",
    "Global": "USD $14.99 /mo"
  }'::jsonb,

  -- Badges & Visuals
  badge TEXT DEFAULT '🔥 HOT DEAL',
  badge_type TEXT DEFAULT 'hot',
  theme_color TEXT DEFAULT 'orange',
  
  -- Metadata & Details
  features JSONB DEFAULT '["Instant activation via WhatsApp concierge", "Official private account or invite link", "24/7 dedicated replacement warranty", "Full commercial license included"]'::jsonb,
  how_to_use JSONB DEFAULT '["Order your deal via WhatsApp with one click", "Receive your activation credentials instantly", "Enjoy full access with your bonus free tool/quantity"]'::jsonb,
  tutorial_video_url TEXT,
  tool_url TEXT,
  whatsapp_url TEXT,
  
  -- Urgency & Scarcity
  stock_left TEXT DEFAULT 'Only 8 spots left today',
  expires_at TIMESTAMPTZ,
  rating NUMERIC DEFAULT 4.9,
  users_count TEXT DEFAULT '3.4K claimed',
  
  featured BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_hot_deals_active ON public.hot_deals (active, sort_order);
CREATE INDEX IF NOT EXISTS idx_hot_deals_slug ON public.hot_deals (slug);

-- 3. Row Level Security (RLS)
ALTER TABLE public.hot_deals ENABLE ROW LEVEL SECURITY;

-- 1. Read Policy: Allow anyone to view hot deals
DROP POLICY IF EXISTS "Public can view active hot deals" ON public.hot_deals;
DROP POLICY IF EXISTS "Public can view hot deals" ON public.hot_deals;
CREATE POLICY "Public can view hot deals"
  ON public.hot_deals
  FOR SELECT
  TO public
  USING (true);

-- 2. Insert Policy
DROP POLICY IF EXISTS "Admins have full access to hot_deals" ON public.hot_deals;
DROP POLICY IF EXISTS "Enable insert for hot_deals" ON public.hot_deals;
CREATE POLICY "Enable insert for hot_deals"
  ON public.hot_deals
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 3. Update Policy
DROP POLICY IF EXISTS "Enable update for hot_deals" ON public.hot_deals;
CREATE POLICY "Enable update for hot_deals"
  ON public.hot_deals
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- 4. Delete Policy
DROP POLICY IF EXISTS "Enable delete for hot_deals" ON public.hot_deals;
CREATE POLICY "Enable delete for hot_deals"
  ON public.hot_deals
  FOR DELETE
  TO public
  USING (true);

-- 4. Enable Supabase Realtime Replication for instant live sync
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'hot_deals'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.hot_deals;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    NULL; -- Ignore if publication or privileges differ
END $$;

-- Sample initial Hot Deal: Buy 1 Get 1 Free ChatGPT & Claude Pro Bundle
INSERT INTO public.hot_deals (
  name,
  slug,
  image,
  short_description,
  full_description,
  category,
  offer_label,
  buy_quantity,
  free_quantity,
  deal_price,
  regular_price,
  badge,
  badge_type,
  theme_color,
  stock_left,
  country_pricing
) VALUES (
  'ChatGPT Plus & Claude Pro Duo Bundle',
  'chatgpt-claude-duo-bogo',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'Buy 1 ChatGPT Plus subscription and get 1 Claude 3.5 Sonnet Pro subscription 100% Free! Unlimited reasoning and coding power.',
  'Get the ultimate AI combo deal! Order 1 ChatGPT Plus official seat and instantly claim 1 Claude 3.5 Sonnet Pro seat completely free. Features full GPT-4o, o1 reasoning models, Artifacts, and 200K token context window.',
  'Text / Reasoning',
  'BUY 1 GET 1 FREE',
  1,
  1,
  'PKR 2,499 /mo',
  'PKR 5,500 /mo',
  '🔥 BUY 1 GET 1 FREE',
  'hot',
  'orange',
  'Only 5 bundles remaining',
  '{
    "Pakistan": "PKR 2,499 /mo",
    "India": "INR 1,299 /mo",
    "United Arab Emirates": "AED 59 /mo",
    "Saudi Arabia": "SAR 65 /mo",
    "United States": "USD $19.99 /mo",
    "United Kingdom": "GBP £15.99 /mo",
    "Global": "USD $19.99 /mo"
  }'::jsonb
) ON CONFLICT (slug) DO NOTHING;
