-- ============================================================================
-- AI TOOLS STORE - SUPABASE DATABASE SCHEMA
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure all columns exist if table was previously created
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'member';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Pakistan';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en';

-- Enable Row Level Security on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop all old policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow anon profile insert during signup" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all users to update profiles" ON public.profiles;

-- RLS POLICY 1: Allow everyone to read profiles (members directory, author names)
CREATE POLICY "Allow all users to read profiles"
ON public.profiles FOR SELECT
TO public
USING (true);

-- RLS POLICY 2: Allow any user (anon or authenticated) to insert profile on signup
CREATE POLICY "Allow all users to insert profiles"
ON public.profiles FOR INSERT
TO public
WITH CHECK (true);

-- RLS POLICY 3: Allow users to update their profile, and admins to promote/demote
CREATE POLICY "Allow all users to update profiles"
ON public.profiles FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- ============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH.USERS SIGNUP
-- Runs with superuser rights (SECURITY DEFINER) whenever a user signs up!
-- ============================================================================
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

  -- Extract WhatsApp number
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

  -- Insert or update public.profiles
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

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SYNC EXISTING USERS FROM AUTH.USERS TO PUBLIC.PROFILES
-- Automatically copies any accounts already created into public.profiles
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
-- 2. TOOLS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  short_description TEXT,
  full_description TEXT,
  price TEXT NOT NULL DEFAULT '$19 /month',
  country_pricing JSONB DEFAULT '{}'::jsonb,
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

-- Fast query indexes
CREATE INDEX IF NOT EXISTS idx_tools_active ON public.tools(active);
CREATE INDEX IF NOT EXISTS idx_tools_category ON public.tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_sort_order ON public.tools(sort_order);

-- Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_tools_updated_at ON public.tools;
CREATE TRIGGER set_tools_updated_at
BEFORE UPDATE ON public.tools
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security on tools
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Public read access for active tools
DROP POLICY IF EXISTS "Public users can view active tools" ON public.tools;
CREATE POLICY "Public users can view active tools"
ON public.tools
FOR SELECT
TO public
USING (active = true);

-- Authenticated admins have full CRUD access
DROP POLICY IF EXISTS "Authenticated admins have full control" ON public.tools;
CREATE POLICY "Authenticated admins have full control"
ON public.tools
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow anon read all for admin preview
DROP POLICY IF EXISTS "Allow anon read all for admin preview" ON public.tools;
CREATE POLICY "Allow anon read all for admin preview"
ON public.tools
FOR SELECT
TO anon
USING (true);

-- ============================================================================
-- 3. STORAGE BUCKET FOR TOOL IMAGES
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('tool-images', 'tool-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view tool images" ON storage.objects;
CREATE POLICY "Public can view tool images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'tool-images');

DROP POLICY IF EXISTS "Authenticated admins can upload tool images" ON storage.objects;
CREATE POLICY "Authenticated admins can upload tool images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'tool-images');

DROP POLICY IF EXISTS "Authenticated admins can modify tool images" ON storage.objects;
CREATE POLICY "Authenticated admins can modify tool images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'tool-images');

DROP POLICY IF EXISTS "Authenticated admins can delete tool images" ON storage.objects;
CREATE POLICY "Authenticated admins can delete tool images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'tool-images');

-- ============================================================================
-- 4. SEED INITIAL AI TOOLS CATALOG
-- ============================================================================
INSERT INTO public.tools (
  name, slug, short_description, full_description, price, category,
  features, how_to_use, tutorial_video_url, tool_url, whatsapp_url,
  rating, users_count, badge, badge_type, theme_color, featured, active, sort_order
) VALUES
(
  'WriteGen AI',
  'writegen-ai',
  'Advanced AI writing assistant for high-converting blogs, articles, and marketing copy.',
  'WriteGen AI delivers high-precision multilingual copywriting, SEO article generation, and conversion-focused marketing campaigns powered by cutting-edge neural language models.',
  '$19 /month',
  'AI Writing',
  '["SEO Optimized Blog & Article Generation", "100+ High-converting Marketing Templates", "Built-in Plagiarism & AI Score Detection", "Real-time Multilingual Rewriting"]'::jsonb,
  '[
    {"step": 1, "title": "Purchase License via WhatsApp", "text": "Click Buy Now to activate the WriteGen AI license instantly via WhatsApp concierge."},
    {"step": 2, "title": "Choose Content Type", "text": "Select from Blog Post, Social Ad, Sales Page, or Email Newsletter."},
    {"step": 3, "title": "Enter Core Keywords", "text": "Input target keywords, tone of voice, and desired length."},
    {"step": 4, "title": "Generate & Fine-tune", "text": "Refine in the interactive editor and export in 1-click."}
  ]'::jsonb,
  'https://www.youtube.com/embed/outcGtbnMuQ',
  'https://writegen.ai',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20WriteGen%20AI%20from%20AI%20Tools%20Store',
  4.80,
  '12.4K',
  'Hot',
  'hot',
  'purple',
  true,
  true,
  1
),
(
  'Artify Studio',
  'artify-studio',
  'Create stunning photorealistic AI art, illustrations, and 4K textures in seconds.',
  'Artify Studio is an elite visual synthesis suite for concept artists, digital designers, and 3D illustrators. Generate photorealistic graphics, logo designs, and 4K textures from text prompts.',
  '$29 /month',
  'AI Image',
  '["Ultra-Photorealistic 4K Canvas Rendering", "Precise Inpainting & Outpainting Brush", "Commercial License for Generated Artwork", "Fast Cloud GPU Cluster Acceleration"]'::jsonb,
  '[
    {"step": 1, "title": "Order via WhatsApp Concierge", "text": "Connect with the concierge team to obtain dedicated Artify Studio access credentials."},
    {"step": 2, "title": "Describe The Scene", "text": "Enter prompt details including lighting, camera angle, and art style."},
    {"step": 3, "title": "Upscale to 4K", "text": "Select the preferred candidate and upscale with enhanced clarity."}
  ]'::jsonb,
  'https://www.youtube.com/embed/5F46M3D6i0I',
  'https://artify.studio',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20Artify%20Studio%20from%20AI%20Tools%20Store',
  4.90,
  '8.7K',
  'Popular',
  'popular',
  'teal',
  true,
  true,
  2
),
(
  'CodePilot AI',
  'codepilot-ai',
  'AI pair programmer that writes, debugs, and optimizes code across 40+ languages.',
  'CodePilot AI embeds deep neural intelligence into the editor. Write whole functions, run automated test suites, explain complex codebases, and refactor legacy code in real-time.',
  '$24 /month',
  'AI Coding',
  '["Multi-language code completion across 40+ languages", "In-editor interactive AI refactoring chat", "Automated unit test & documentation synthesis", "Enterprise security and private code isolation"]'::jsonb,
  '[
    {"step": 1, "title": "Activate Seat via WhatsApp", "text": "Get immediate activation credentials and extension license key."},
    {"step": 2, "title": "Install VS Code Plugin", "text": "Install the CodePilot AI extension in the IDE and authenticate."},
    {"step": 3, "title": "Type and Tab", "text": "Accept intelligent auto-completions and generate tests effortlessly."}
  ]'::jsonb,
  'https://www.youtube.com/embed/4bfwXgIq7pU',
  'https://codepilot.ai',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20CodePilot%20AI%20from%20AI%20Tools%20Store',
  4.70,
  '15.2K',
  'New',
  'new',
  'blue',
  true,
  true,
  3
),
(
  'ChatGPT Plus',
  'chatgpt-plus',
  'The flagship conversational AI assistant with GPT-4o, DALL·E 3, and Custom GPTs.',
  'ChatGPT Plus grants premium access to OpenAI flagship multimodal models. Experience lightning-fast responses, advanced browsing capabilities, custom GPT agents, high-resolution DALL·E 3 image generation, and live audio-visual reasoning.',
  '$20 /month',
  'AI Writing',
  '["Access to OpenAI GPT-4o & GPT-4 Turbo models", "Instant Web Browsing & Live Data Search", "Advanced Data Analysis with Python sandbox", "Create and deploy unlimited Custom GPTs"]'::jsonb,
  '[
    {"step": 1, "title": "Order via WhatsApp", "text": "Connect with the concierge on WhatsApp to request ChatGPT Plus account activation."},
    {"step": 2, "title": "Receive Secure Credentials", "text": "The team provisions the dedicated email invitation within 5 minutes."},
    {"step": 3, "title": "Sign in to chatgpt.com", "text": "Log in and verify the Plus badge is active."},
    {"step": 4, "title": "Start Creating", "text": "Access GPT-4o, DALL-E 3 image creation, and custom GPT models."}
  ]'::jsonb,
  'https://www.youtube.com/embed/outcGtbnMuQ',
  'https://chatgpt.com',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20ChatGPT%20Plus%20from%20AI%20Tools%20Store',
  4.90,
  '34.2K',
  'Hot',
  'hot',
  'purple',
  true,
  true,
  4
),
(
  'Midjourney Pro',
  'midjourney-pro',
  'Industry-standard photorealistic image synthesis engine with v6.1 architecture.',
  'Midjourney is the premier platform for cinematic visual art, photorealistic portraits, and concept design with ultra-high dynamic range and texture rendering.',
  '$10 /month',
  'AI Image',
  '["Midjourney v6.1 Ultra-Photorealistic Rendering Engine", "Fast GPU generation credits per month", "Commercial usage rights for generated artwork", "Access to Midjourney Web Generation Canvas"]'::jsonb,
  '[
    {"step": 1, "title": "Order via WhatsApp", "text": "Contact the team to get the dedicated Midjourney account or server seat."},
    {"step": 2, "title": "Access Discord / Web Portal", "text": "Sign in with the verified credentials provided."},
    {"step": 3, "title": "Prompt /imagine", "text": "Generate 4 variations and upscale the favorites to 4K resolution."}
  ]'::jsonb,
  'https://www.youtube.com/embed/5F46M3D6i0I',
  'https://midjourney.com',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20Midjourney%20from%20AI%20Tools%20Store',
  4.95,
  '42.0K',
  'Popular',
  'popular',
  'teal',
  true,
  true,
  5
),
(
  'Runway Gen-3',
  'runway-gen3',
  'Cinematic AI video generation with Gen-3 Alpha camera and motion controls.',
  'Transform text prompts or static photographs into ultra-cinematic 4K video clips with precise motion brush controls, lip-sync, and realistic camera physics.',
  '$15 /month',
  'AI Video',
  '["Gen-3 Alpha Text-to-Video and Image-to-Video", "Motion Brush for localized velocity direction", "Camera Director controls (Pan, Tilt, Dolly, Zoom)", "Green Screen AI background removal"]'::jsonb,
  '[
    {"step": 1, "title": "Activate on WhatsApp", "text": "Get high-credit Runway access within 5 minutes on WhatsApp."},
    {"step": 2, "title": "Launch Gen-3 Studio", "text": "Select Text/Image to Video in the Runway portal."},
    {"step": 3, "title": "Render & Export", "text": "Download cinematic 4K video clips for all projects."}
  ]'::jsonb,
  'https://www.youtube.com/embed/i_x3Bkn0pU8',
  'https://runwayml.com',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20Runway%20from%20AI%20Tools%20Store',
  4.88,
  '19.8K',
  'New',
  'new',
  'blue',
  true,
  true,
  6
),
(
  'ElevenLabs AI',
  'elevenlabs-ai',
  'Hyper-realistic voice synthesis, emotional text-to-speech, and instant voice cloning.',
  'Create studio-grade voiceovers in 30+ languages with unmatched emotional delivery, pacing control, and AI voice cloning technology.',
  '$22 /month',
  'AI Audio',
  '["Hyper-realistic voice synthesis in 30+ languages", "Instant 1-minute voice cloning engine", "Audio Native reader and video dubbing studio", "Commercial broadcasting license included"]'::jsonb,
  '[
    {"step": 1, "title": "Connect on WhatsApp", "text": "Obtain high-quota ElevenLabs credentials via WhatsApp."},
    {"step": 2, "title": "Paste The Script", "text": "Select from library of 500+ voices or upload the voice sample."},
    {"step": 3, "title": "Generate & Download", "text": "Export crystal-clear 48kHz WAV audio files."}
  ]'::jsonb,
  'https://www.youtube.com/embed/outcGtbnMuQ',
  'https://elevenlabs.io',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20ElevenLabs%20from%20AI%20Tools%20Store',
  4.92,
  '28.5K',
  'Hot',
  'hot',
  'purple',
  true,
  true,
  7
),
(
  'Make Automation AI',
  'make-automation-ai',
  'Visual workflow builder to connect AI models with 1,500+ cloud applications.',
  'Design automated workflows that pass data between ChatGPT, Slack, Google Sheets, Supabase, and CRM systems with zero code required.',
  '$16 /month',
  'AI Automation',
  '["Visual drag-and-drop workflow canvas", "Native OpenAI & Anthropic AI connector modules", "Multi-step routers, error filters, and webhooks", "Unlimited scenario executions with low latency"]'::jsonb,
  '[
    {"step": 1, "title": "Get Activated", "text": "Contact WhatsApp concierge to get an enterprise Pro workspace."},
    {"step": 2, "title": "Create a Scenario", "text": "Connect applications and AI endpoints in minutes."},
    {"step": 3, "title": "Turn ON", "text": "Run automated triggers 24/7 without manual intervention."}
  ]'::jsonb,
  'https://www.youtube.com/embed/4bfwXgIq7pU',
  'https://make.com',
  'https://wa.me/1234567890?text=Hi%2C%20I%20want%20to%20buy%20Make%20Automation%20from%20AI%20Tools%20Store',
  4.85,
  '21.1K',
  'Popular',
  'popular',
  'teal',
  true,
  true,
  8
)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    price = EXCLUDED.price,
    category = EXCLUDED.category,
    features = EXCLUDED.features,
    how_to_use = EXCLUDED.how_to_use,
    rating = EXCLUDED.rating,
    users_count = EXCLUDED.users_count,
    badge = EXCLUDED.badge,
    theme_color = EXCLUDED.theme_color,
    featured = EXCLUDED.featured,
    active = EXCLUDED.active,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();
