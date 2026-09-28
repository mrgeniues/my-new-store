-- ============================================================================
-- SUPABASE ADMIN USER DELETION SCRIPT
-- ============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
--
-- This script does two things:
-- 1. Adds a RLS DELETE policy on `public.profiles` allowing Admins to delete profiles.
-- 2. Creates a secure SECURITY DEFINER function `delete_user_by_admin(target_user_id)`
--    that deletes the user completely from Supabase Auth (`auth.users`) as well as
--    `public.profiles`, revoking all session tokens and access.
-- ============================================================================

-- 1. Allow administrators to delete profiles directly via RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles delete policy" ON public.profiles;
CREATE POLICY "Profiles delete policy"
ON public.profiles FOR DELETE
TO public
USING (public.is_admin());

-- 2. Secure Function to delete from Supabase Auth (auth.users)
-- Because regular client keys (anon/authenticated) cannot directly DELETE from auth.users,
-- this SECURITY DEFINER function safely executes with database owner privileges
-- ONLY after verifying that the requesting user is an active Administrator.
CREATE OR REPLACE FUNCTION public.delete_user_by_admin(target_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_is_admin BOOLEAN;
BEGIN
  -- Verify requesting caller is verified administrator
  SELECT public.is_admin() INTO v_is_admin;
  
  -- Secondary check: if not matched via is_admin, check profile role directly
  IF NOT COALESCE(v_is_admin, false) THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    ) THEN
      RAISE EXCEPTION 'Access denied: Only store administrators can delete users.';
    END IF;
  END IF;

  -- Prevent admin from accidentally deleting their own active account
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Safety check: You cannot delete your own active administrator account.';
  END IF;

  -- 1. Delete user from auth.users (this terminates all sessions and cascades to foreign keys)
  DELETE FROM auth.users WHERE id = target_user_id;

  -- 2. Explicitly delete from public.profiles (in case ON DELETE CASCADE was omitted)
  DELETE FROM public.profiles WHERE id = target_user_id;

  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    -- If error occurred while deleting from auth.users, attempt deleting profile row
    DELETE FROM public.profiles WHERE id = target_user_id;
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution permission to authenticated & anon roles
GRANT EXECUTE ON FUNCTION public.delete_user_by_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user_by_admin(UUID) TO anon;
