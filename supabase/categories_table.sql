-- ============================================================================
-- SUPABASE CATEGORIES TABLE & ROW LEVEL SECURITY
-- ============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rqemoitjanmxsmcmveso/sql
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT '✨',
  image TEXT,
  color TEXT DEFAULT '#6366f1',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories(sort_order);

-- Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policy
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories"
ON public.categories FOR SELECT
TO public
USING (true);

-- 2. Insert Policy (Admins / Authenticated)
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
CREATE POLICY "Admins can insert categories"
ON public.categories FOR INSERT
TO public
WITH CHECK (true);

-- 3. Update Policy
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
CREATE POLICY "Admins can update categories"
ON public.categories FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 4. Delete Policy
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;
CREATE POLICY "Admins can delete categories"
ON public.categories FOR DELETE
TO public
USING (true);

-- Initial seed data for standard categories
INSERT INTO public.categories (name, slug, icon, color, description, sort_order)
VALUES
  ('AI Writing', 'ai-writing', '✍️', '#a855f7', 'Advanced copywriting, multilingual blog synthesis, and neural text refinement tools.', 1),
  ('AI Image', 'ai-image', '🎨', '#10b981', 'Visual art synthesis, photorealistic artwork generation, and 4K texture upscaling.', 2),
  ('AI Video', 'ai-video', '🎬', '#f97316', 'Video production, AI realistic avatars, automatic subtitles, and cinematic effects.', 3),
  ('AI Audio', 'ai-audio', '🎙️', '#ec4899', 'Voice cloning, text-to-speech, podcast audio cleaning, and studio music synthesis.', 4),
  ('AI Coding', 'ai-coding', '💻', '#3b82f6', 'AI pair programming, code refactoring, test suite generation, and multi-language linting.', 5),
  ('AI Automation', 'ai-automation', '⚡', '#eab308', 'Autonomous agent systems, workflow webhooks, and zero-code business automations.', 6),
  ('AI Marketing', 'ai-marketing', '📢', '#8b5cf6', 'Conversion optimization, multi-channel ad copy, SEO rank tracking, and outreach bots.', 7),
  ('Productivity', 'productivity', '🚀', '#06b6d4', 'Smart workspaces, knowledge retrieval engines, intelligent note organizers, and assistants.', 8)
ON CONFLICT (slug) DO NOTHING;

-- Verification Check
SELECT id, name, slug, icon, color, description, sort_order, created_at FROM public.categories ORDER BY sort_order ASC;
