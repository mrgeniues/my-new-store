-- ============================================================================
-- MAKE A USER AN ADMINISTRATOR IN SUPABASE
-- ============================================================================
-- Run this in your Supabase SQL Editor whenever you want to grant Admin access
-- to any email account:
-- ============================================================================

-- Replace 'your_email@gmail.com' with the email of the user you want to make Admin:
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'numan_test_ai_store@gmail.com'; -- <-- Put your email here

-- Verify that the role has been updated:
SELECT id, full_name, email, role FROM public.profiles WHERE role = 'admin';
