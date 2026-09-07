// AI Tools Store - Supabase Authentication & Profile Service (Direct Database Integration)
import { supabase, isSupabaseConfigured, getEnv } from './supabase.js';

const STORAGE_SESSION_KEY = 'ai_tools_user_session_v1';
const ADMIN_AUTH_KEY = 'ai_tools_admin_authorized';
const ADMIN_EMAIL_KEY = 'ai_tools_admin_email';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.currentProfile = null;
    this.listeners = new Set();

    // 1. Purge any legacy fake/dummy accounts created during offline testing
    this.purgeLegacyDummyAccounts();

    // 2. Restore active verified session from Supabase
    this.initSupabaseAuth();
  }

  // Purge any local dummy user IDs that start with 'usr_'
  purgeLegacyDummyAccounts() {
    try {
      localStorage.removeItem('ai_tools_users_store_v1');
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const userId = parsed?.user?.id || '';
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
        if (!isUuid) {
          localStorage.removeItem(STORAGE_SESSION_KEY);
          localStorage.removeItem(ADMIN_AUTH_KEY);
          localStorage.removeItem(ADMIN_EMAIL_KEY);
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  async initSupabaseAuth() {
    if (!isSupabaseConfigured) {
      console.warn('[AI Tools Store Auth] Supabase is not configured. User accounts will not work without Supabase.');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        this.currentUser = session.user;
        await this.fetchProfile(this.currentUser.id);
        this.saveLocalSession(this.currentUser, this.currentProfile);
      } else {
        // Double check cached session if network is slow
        this.restoreLocalSession();
      }
      this.notifyListeners();
    } catch (err) {
      console.warn('[AI Tools Store Auth] getSession error:', err);
    }

    // Listen for real-time auth events from Supabase
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        this.currentUser = session.user;
        await this.fetchProfile(this.currentUser.id);
        this.saveLocalSession(this.currentUser, this.currentProfile);
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = null;
        this.currentProfile = null;
        this.clearLocalSession();
      }
      this.notifyListeners();
    });
  }

  restoreLocalSession() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const userId = parsed?.user?.id || '';
        // Only restore if user has a valid Supabase UUID
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
        if (isUuid && parsed?.user) {
          this.currentUser = parsed.user;
          this.currentProfile = parsed.profile || null;
        } else {
          this.clearLocalSession();
        }
      }
    } catch (e) {
      console.warn('[AI Tools Store Auth] Could not restore local session:', e);
    }
  }

  saveLocalSession(user, profile) {
    try {
      if (!user || !user.id) return;
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({ user, profile }));
    } catch (e) {
      console.warn('[AI Tools Store Auth] Could not save local session:', e);
    }
  }

  clearLocalSession() {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      localStorage.removeItem(ADMIN_AUTH_KEY);
      localStorage.removeItem(ADMIN_EMAIL_KEY);
      localStorage.removeItem('ai_tools_users_store_v1');
    } catch (e) {
      console.warn('[AI Tools Store Auth] Could not clear local session:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    try {
      listener({ user: this.currentUser, profile: this.currentProfile });
    } catch (err) {
      console.error('Error in initial auth listener call:', err);
    }
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    const state = { user: this.currentUser, profile: this.currentProfile };
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Error in auth listener notification:', err);
      }
    });
  }

  async fetchProfile(userId) {
    if (!userId || !isSupabaseConfigured) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        this.currentProfile = data;
        this.saveLocalSession(this.currentUser, this.currentProfile);
        return this.currentProfile;
      }

      // If user exists in Auth but not yet in profiles, insert it into profiles
      if (this.currentUser) {
        const userMeta = this.currentUser.user_metadata || {};
        const email = (this.currentUser.email || '').toLowerCase().trim();
        const fullName = userMeta.full_name || email.split('@')[0] || 'VIP Member';
        const phone = userMeta.whatsapp_number || '';
        const isUserAdmin = this.isAdmin(this.currentUser);

        const country = userMeta.country || this.getUserCountry() || 'Pakistan';

        const { data: newProfile, error: upsertErr } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            full_name: fullName,
            email: email,
            whatsapp_number: phone,
            country: country,
            role: isUserAdmin ? 'admin' : 'member',
            preferred_language: 'en',
            last_sign_in_at: new Date().toISOString()
          })
          .select()
          .maybeSingle();

        if (!upsertErr && newProfile) {
          this.currentProfile = newProfile;
          if (newProfile.country) {
            localStorage.setItem('ai_tools_user_country_v1', newProfile.country);
          }
          this.saveLocalSession(this.currentUser, this.currentProfile);
          return this.currentProfile;
        }
      }
    } catch (e) {
      console.warn('Could not fetch Supabase profile:', e);
    }

    return this.currentProfile;
  }

  // Get active country for the current visitor or logged-in user
  getUserCountry() {
    if (this.currentProfile?.country) return this.currentProfile.country;
    if (this.currentUser?.user_metadata?.country) return this.currentUser.user_metadata.country;
    try {
      const stored = localStorage.getItem('ai_tools_user_country_v1');
      if (stored) return stored;
    } catch (e) {}
    return 'Pakistan'; // Default store country
  }

  // Set active country (triggers live reactive update across app)
  setUserCountry(country) {
    if (!country) return;
    try {
      localStorage.setItem('ai_tools_user_country_v1', country);
    } catch (e) {}

    if (this.currentProfile) {
      this.currentProfile.country = country;
      this.saveLocalSession(this.currentUser, this.currentProfile);
      
      // Also update Supabase in background if logged in
      if (isSupabaseConfigured && this.currentUser?.id) {
        supabase
          .from('profiles')
          .update({ country, updated_at: new Date().toISOString() })
          .eq('id', this.currentUser.id)
          .then(() => {})
          .catch((err) => console.warn('Could not update profile country in Supabase:', err));
      }
    }

    this.notifyListeners();

    // Dispatch global custom event for non-listener components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai_tools_country_changed', { detail: { country } }));
    }
  }

  async getCurrentUser() {
    if (this.currentUser) return this.currentUser;

    if (isSupabaseConfigured) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          this.currentUser = session.user;
          return this.currentUser;
        }
      } catch (e) {
        console.warn('Supabase getSession error:', e);
      }
    }

    this.restoreLocalSession();
    return this.currentUser;
  }

  isAuthenticated() {
    return Boolean(this.currentUser && this.currentUser.id);
  }

  isAdmin(user = this.currentUser, profile = this.currentProfile) {
    if (!user) return false;

    const email = (user.email || '').toLowerCase().trim();
    const envAdminEmails = (getEnv('VITE_ADMIN_EMAILS', '') || getEnv('VITE_ADMIN_EMAIL', ''))
      .toLowerCase()
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    // 1. Check verified administrator emails
    if (
      email === 'numanali1n@gmail.com' ||
      email.startsWith('admin@') ||
      email.startsWith('superadmin@') ||
      email === 'admin@aitools.store' ||
      email === 'admin@aitools.vip' ||
      envAdminEmails.includes(email)
    ) {
      return true;
    }

    // 2. Role in database profile
    if (profile?.role === 'admin' || profile?.is_admin === true) return true;
    if (user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin') return true;

    // 3. Admin session token
    if (localStorage.getItem(ADMIN_AUTH_KEY) === 'true') {
      const authEmail = localStorage.getItem(ADMIN_EMAIL_KEY);
      if (authEmail && authEmail.toLowerCase() === email) {
        return true;
      }
    }

    return false;
  }

  setAdminAuthorized(authorized = true, email = null) {
    if (authorized) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      if (email || this.currentUser?.email) {
        localStorage.setItem(ADMIN_EMAIL_KEY, email || this.currentUser?.email);
      }
      if (this.currentProfile) {
        this.currentProfile.role = 'admin';
      }
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
      localStorage.removeItem(ADMIN_EMAIL_KEY);
      if (this.currentProfile && this.currentProfile.role === 'admin') {
        this.currentProfile.role = 'member';
      }
    }
    this.notifyListeners();
  }

  // Fetch registered users directly from Supabase public.profiles table
  async getRegisteredUsers() {
    if (!isSupabaseConfigured) {
      console.warn('[AI Tools Store Auth] Supabase not configured for getRegisteredUsers.');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[AI Tools Store Auth] Supabase profiles query error:', error.message);
        return [];
      }

      return (data || []).map((p) => {
        const email = (p.email || '').toLowerCase();
        const isAdmin =
          p.role === 'admin' ||
          email === 'numanali1n@gmail.com' ||
          email.startsWith('admin@') ||
          email.startsWith('superadmin@') ||
          email === 'admin@aitools.store';

        return {
          id: p.id,
          full_name: p.full_name || 'VIP Member',
          email: p.email || '',
          whatsapp_number: p.whatsapp_number || '',
          country: p.country || 'Pakistan',
          preferred_language: p.preferred_language || 'en',
          role: isAdmin ? 'admin' : 'member',
          last_sign_in_at: p.last_sign_in_at || null,
          created_at: p.created_at || new Date().toISOString()
        };
      });
    } catch (err) {
      console.error('[AI Tools Store Auth] Error fetching profiles:', err);
      return [];
    }
  }

  // Update user role in Supabase public.profiles
  async updateUserRole(userId, newRole) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured.');
    }

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }

    if (this.currentUser?.id === userId && this.currentProfile) {
      this.currentProfile.role = newRole;
      if (newRole === 'admin') {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
        localStorage.setItem(ADMIN_EMAIL_KEY, this.currentUser.email);
      } else {
        localStorage.removeItem(ADMIN_AUTH_KEY);
        localStorage.removeItem(ADMIN_EMAIL_KEY);
      }
      this.saveLocalSession(this.currentUser, this.currentProfile);
      this.notifyListeners();
    }
    return true;
  }

  // Sign up directly into Supabase Auth and public.profiles with Country selection
  async signUp({ fullName, email, whatsappNumber, password, country = 'Pakistan' }) {
    const cleanEmail = (email || '').trim();
    const cleanName = (fullName || '').trim() || 'VIP Member';
    const cleanPhone = (whatsappNumber || '').trim();
    const cleanCountry = (country || 'Pakistan').trim();

    if (!cleanEmail) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (!isSupabaseConfigured) {
      throw new Error('Supabase backend is not connected. Please check your Supabase configuration.');
    }

    // 1. Create account in Supabase Auth (with country in user metadata)
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanName,
          whatsapp_number: cleanPhone,
          country: cleanCountry
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.user) {
      throw new Error('Failed to create account in Supabase. Please try again.');
    }

    const userObj = data.user;
    const isAdmin =
      cleanEmail.toLowerCase() === 'numanali1n@gmail.com' ||
      cleanEmail.toLowerCase().startsWith('admin@') ||
      cleanEmail.toLowerCase().startsWith('superadmin@') ||
      cleanEmail.toLowerCase() === 'admin@aitools.store' ||
      cleanEmail.toLowerCase() === 'admin@aitools.vip';

    // 2. Insert into Supabase public.profiles table (including country)
    let profileObj = null;
    try {
      const { data: insertedProfile, error: upsertErr } = await supabase
        .from('profiles')
        .upsert({
          id: userObj.id,
          full_name: cleanName,
          email: cleanEmail,
          whatsapp_number: cleanPhone,
          country: cleanCountry,
          role: isAdmin ? 'admin' : 'member',
          preferred_language: 'en',
          last_sign_in_at: new Date().toISOString()
        })
        .select()
        .single();

      if (upsertErr) {
        console.warn('[AI Tools Store Auth] Profile upsert notice:', upsertErr.message);
      } else {
        profileObj = insertedProfile;
      }
    } catch (pErr) {
      console.warn('[AI Tools Store Auth] Profile upsert error:', pErr);
    }

    // Store country active selection locally
    this.setUserCountry(cleanCountry);

    // If session returned immediately (Confirm email is OFF in Supabase)
    if (data.session) {
      this.currentUser = userObj;
      this.currentProfile = profileObj || await this.fetchProfile(userObj.id);
      this.saveLocalSession(this.currentUser, this.currentProfile);
      this.notifyListeners();
      return { user: this.currentUser, profile: this.currentProfile, session: data.session };
    }

    // If email confirmation is required by Supabase Auth settings
    return {
      user: userObj,
      profile: profileObj,
      needsConfirmation: true,
      message: 'Account registered in Supabase! If email confirmation is enabled, please verify your email before signing in.'
    };
  }

  // Sign in directly through Supabase Auth
  async signIn({ email, password }) {
    const rawInput = (email || '').trim();
    if (!rawInput) {
      throw new Error('Please enter your email address.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    if (!isSupabaseConfigured) {
      throw new Error('Supabase backend is not connected.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: rawInput,
      password
    });

    if (error) {
      if (error.message && error.message.toLowerCase().includes('email not confirmed')) {
        throw new Error('Email not confirmed yet. In Supabase Dashboard > Authentication > Providers > Email, turn off "Confirm email" or check your inbox.');
      }
      throw new Error(error.message || 'Invalid email or password.');
    }

    if (!data?.user) {
      throw new Error('Sign in failed: No user returned from Supabase.');
    }

    this.currentUser = data.user;
    this.currentProfile = await this.fetchProfile(data.user.id);

    const isAdminUser = this.isAdmin(this.currentUser, this.currentProfile);
    if (isAdminUser) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      localStorage.setItem(ADMIN_EMAIL_KEY, this.currentUser.email);
      if (this.currentProfile) this.currentProfile.role = 'admin';
    }

    this.saveLocalSession(this.currentUser, this.currentProfile);
    this.notifyListeners();

    return { user: this.currentUser, profile: this.currentProfile, session: data.session };
  }

  async signOut() {
    this.clearLocalSession();
    this.currentUser = null;
    this.currentProfile = null;

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }

    this.notifyListeners();
    return true;
  }
}

export const authService = new AuthService();
