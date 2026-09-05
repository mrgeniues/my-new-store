// AI Tools Store - Supabase Authentication & Profile Service with Resilient Session Fallback
import { supabase, isSupabaseConfigured } from './supabase.js';

const STORAGE_SESSION_KEY = 'ai_tools_user_session_v1';
const STORAGE_USERS_KEY = 'ai_tools_users_store_v1';
const ADMIN_AUTH_KEY = 'ai_tools_admin_authorized';
const ADMIN_EMAIL_KEY = 'ai_tools_admin_email';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.currentProfile = null;
    this.listeners = new Set();

    // 1. First restore session from local storage if present
    this.restoreLocalSession();

    // 2. If Supabase is configured with active keys, connect to Supabase Auth
    if (isSupabaseConfigured) {
      // Check Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          this.currentUser = session.user;
          this.fetchProfile(this.currentUser.id);
          this.saveLocalSession(this.currentUser, this.currentProfile);
        }
        this.notifyListeners();
      }).catch((e) => {
        console.warn('[AI Tools Store Auth] Supabase session check notice:', e);
      });

      // Listen for Supabase auth state changes
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
  }

  restoreLocalSession() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.user) {
          this.currentUser = parsed.user;
          const userEmail = (parsed.user.email || '').toLowerCase();
          const isAdminUser =
            userEmail.startsWith('admin@') ||
            userEmail.startsWith('superadmin@') ||
            userEmail === 'admin@aitools.store' ||
            userEmail === 'admin@aitools.vip' ||
            localStorage.getItem(ADMIN_AUTH_KEY) === 'true';

          this.currentProfile = parsed.profile || {
            id: parsed.user.id,
            full_name: parsed.user.user_metadata?.full_name || 'VIP Member',
            email: parsed.user.email || '',
            whatsapp_number: parsed.user.user_metadata?.whatsapp_number || '',
            role: isAdminUser ? 'admin' : 'member'
          };

          if (isAdminUser) {
            this.currentProfile.role = 'admin';
          }
        }
      }
    } catch (e) {
      console.warn('[AI Tools Store Auth] Could not restore local session:', e);
    }
  }

  saveLocalSession(user, profile) {
    try {
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
    } catch (e) {
      console.warn('[AI Tools Store Auth] Could not clear local session:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Immediately call listener with current state
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
    if (!userId) return null;

    if (isSupabaseConfigured) {
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
      } catch (e) {
        console.warn('Could not fetch Supabase profile:', e);
      }
    }

    // Fallback profile
    this.currentProfile = this.currentProfile || {
      id: userId,
      full_name: this.currentUser?.user_metadata?.full_name || 'VIP Member',
      email: this.currentUser?.email || '',
      whatsapp_number: this.currentUser?.user_metadata?.whatsapp_number || '',
      created_at: this.currentUser?.created_at || new Date().toISOString()
    };
    return this.currentProfile;
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
        console.warn('Supabase getSession fallback:', e);
      }
    }

    this.restoreLocalSession();
    return this.currentUser;
  }

  isAuthenticated() {
    return Boolean(this.currentUser);
  }

  isAdmin(user = this.currentUser, profile = this.currentProfile) {
    if (!user) return false;

    // Strict role check: If profile explicitly specifies 'member', reject admin privileges
    // unless email is specifically on the admin whitelist
    if (profile && profile.role === 'member') {
      const email = (user.email || '').toLowerCase().trim();
      const envAdminEmails = (import.meta.env.VITE_ADMIN_EMAILS || import.meta.env.VITE_ADMIN_EMAIL || '')
        .toLowerCase()
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean);

      if (!envAdminEmails.includes(email) && !email.startsWith('admin@') && !email.startsWith('superadmin@') && email !== 'admin@aitools.store') {
        return false;
      }
    }

    // 1. Explicit role flag in database profile or auth user metadata
    if (profile?.role === 'admin' || profile?.is_admin === true) return true;
    if (user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin') return true;

    // 2. Email-based administrator matching
    const email = (user.email || '').toLowerCase().trim();
    if (!email) return false;

    const envAdminEmails = (import.meta.env.VITE_ADMIN_EMAILS || import.meta.env.VITE_ADMIN_EMAIL || '')
      .toLowerCase()
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    if (envAdminEmails.includes(email)) return true;

    if (
      email.startsWith('admin@') ||
      email.startsWith('superadmin@') ||
      email === 'admin@aitools.store' ||
      email === 'admin@aitools.vip'
    ) {
      return true;
    }

    // 3. Explicit admin session token
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

  async getRegisteredUsers() {
    const userMap = new Map();

    // 1. Fetch from Supabase profiles if active
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          data.forEach((p) => {
            const email = (p.email || '').toLowerCase();
            const isAdmin =
              p.role === 'admin' ||
              email.startsWith('admin@') ||
              email.startsWith('superadmin@') ||
              email === 'admin@aitools.store';

            userMap.set(email, {
              id: p.id,
              full_name: p.full_name || 'VIP Member',
              email: p.email || '',
              whatsapp_number: p.whatsapp_number || '',
              preferred_language: p.preferred_language || 'en',
              role: isAdmin ? 'admin' : 'member',
              last_sign_in_at: p.last_sign_in_at || null,
              created_at: p.created_at || new Date().toISOString()
            });
          });
        }
      } catch (err) {
        console.warn('Supabase profiles query note:', err);
      }
    }

    // 2. Fetch from local users storage
    try {
      const localUsers = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      localUsers.forEach((rec) => {
        const email = (rec.email || rec.user?.email || '').toLowerCase();
        if (email && !userMap.has(email)) {
          const isAdmin =
            rec.profile?.role === 'admin' ||
            email.startsWith('admin@') ||
            email.startsWith('superadmin@') ||
            email === 'admin@aitools.store';

          userMap.set(email, {
            id: rec.user?.id || 'usr_' + Math.random().toString(36).substring(2, 7),
            full_name: rec.profile?.full_name || rec.user?.user_metadata?.full_name || 'VIP Member',
            email: rec.email || rec.user?.email || '',
            whatsapp_number: rec.profile?.whatsapp_number || rec.user?.user_metadata?.whatsapp_number || '',
            preferred_language: 'en',
            role: isAdmin ? 'admin' : 'member',
            created_at: rec.user?.created_at || new Date().toISOString()
          });
        }
      });
    } catch (e) {
      console.warn('Local users store note:', e);
    }

    // 3. Ensure current user is in the list
    if (this.currentUser) {
      const myEmail = (this.currentUser.email || '').toLowerCase();
      if (myEmail && !userMap.has(myEmail)) {
        userMap.set(myEmail, {
          id: this.currentUser.id,
          full_name: this.currentProfile?.full_name || 'VIP Member',
          email: this.currentUser.email || '',
          whatsapp_number: this.currentProfile?.whatsapp_number || '',
          preferred_language: 'en',
          role: this.isAdmin() ? 'admin' : 'member',
          created_at: this.currentUser.created_at || new Date().toISOString()
        });
      } else if (myEmail && userMap.has(myEmail) && this.isAdmin()) {
        const u = userMap.get(myEmail);
        u.role = 'admin';
      }
    }

    // Return as array sorted with Admins first, then by date
    return Array.from(userMap.values()).sort((a, b) => {
      if (a.role === 'admin' && b.role !== 'admin') return -1;
      if (b.role === 'admin' && a.role !== 'admin') return 1;
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
  }

  async updateUserRole(userId, newRole) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
      } catch (err) {
        console.warn('Supabase role update note:', err);
      }
    }

    // Update in local users store
    try {
      const usersList = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      const idx = usersList.findIndex((u) => u.user?.id === userId || u.profile?.id === userId);
      if (idx >= 0) {
        if (!usersList[idx].profile) usersList[idx].profile = {};
        usersList[idx].profile.role = newRole;
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usersList));
      }
    } catch (e) {
      console.warn('Local role update note:', e);
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

  async signUp({ fullName, email, whatsappNumber, password }) {
    const cleanEmail = (email || '').trim();
    const cleanName = (fullName || '').trim() || 'VIP Member';
    const cleanPhone = (whatsappNumber || '').trim();

    if (!cleanEmail) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    let userObj = null;
    let profileObj = null;
    let needsConfirmation = false;

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanName,
            whatsapp_number: cleanPhone
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {
        userObj = data.user;

        // Directly insert/upsert into public.profiles
        const isAdmin =
          cleanEmail.toLowerCase().startsWith('admin@') ||
          cleanEmail.toLowerCase().startsWith('superadmin@') ||
          cleanEmail.toLowerCase() === 'admin@aitools.store' ||
          cleanEmail.toLowerCase() === 'admin@aitools.vip';

        try {
          await supabase.from('profiles').upsert({
            id: userObj.id,
            full_name: cleanName,
            email: cleanEmail,
            whatsapp_number: cleanPhone,
            role: isAdmin ? 'admin' : 'member',
            preferred_language: 'en'
          });
        } catch (pErr) {
          console.warn('[AI Tools Store Auth] Profile upsert warning (trigger may handle):', pErr);
        }

        // If session was returned immediately (Confirm email is OFF in Supabase)
        if (data.session) {
          this.currentUser = userObj;
          await this.fetchProfile(userObj.id);
          this.saveLocalSession(this.currentUser, this.currentProfile);
          this.notifyListeners();
          return { user: this.currentUser, profile: this.currentProfile, session: data.session };
        } else {
          // If session is null, email confirmation is active in Supabase Auth settings
          needsConfirmation = true;
        }
      }
    } else {
      // Offline fallback only when Supabase credentials are not in .env
      const userId = 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
      userObj = {
        id: userId,
        email: cleanEmail,
        created_at: new Date().toISOString(),
        user_metadata: {
          full_name: cleanName,
          whatsapp_number: cleanPhone
        }
      };
    }

    const isAdminUser =
      cleanEmail.toLowerCase().startsWith('admin@') ||
      cleanEmail.toLowerCase().startsWith('superadmin@') ||
      cleanEmail.toLowerCase() === 'admin@aitools.store' ||
      cleanEmail.toLowerCase() === 'admin@aitools.vip';

    profileObj = {
      id: userObj.id,
      full_name: cleanName,
      email: cleanEmail,
      whatsapp_number: cleanPhone,
      role: isAdminUser ? 'admin' : 'member',
      created_at: userObj.created_at || new Date().toISOString()
    };

    if (needsConfirmation) {
      return {
        user: userObj,
        profile: profileObj,
        needsConfirmation: true,
        message: 'Account created! Please sign in with your email and password.'
      };
    }

    this.currentUser = userObj;
    this.currentProfile = profileObj;
    this.saveLocalSession(userObj, profileObj);
    this.notifyListeners();

    return { user: userObj, profile: profileObj };
  }

  async signIn({ email, password }) {
    const rawInput = (email || '').trim();
    if (!rawInput) {
      throw new Error('Please enter your email or username.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    let userObj = null;
    let profileObj = null;

    const isPhone = !rawInput.includes('@') && /^[\d\+\s\-]{6,}$/.test(rawInput);
    const cleanDigits = rawInput.replace(/\D/g, '');
    const cleanEmail = rawInput;

    if (isSupabaseConfigured) {
      const emailToTry = isPhone ? `${cleanDigits}@phone.aitools.vip` : cleanEmail;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToTry,
        password
      });

      if (error) {
        if (error.message && error.message.toLowerCase().includes('email not confirmed')) {
          throw new Error('Email not confirmed. Please check your inbox or disable "Confirm email" in Supabase Auth Settings.');
        }
        throw new Error(error.message || 'Invalid email or password.');
      }

      if (data?.user) {
        userObj = data.user;
        await this.fetchProfile(userObj.id);
        profileObj = this.currentProfile;
      }
    } else {
      // Offline fallback: Check local registered users store by email OR phone number
      try {
        const usersList = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
        const matched = usersList.find((u) => {
          const uEmail = (u.email || u.user?.email || '').toLowerCase();
          const uPhone = (u.profile?.whatsapp_number || u.whatsapp_number || u.user?.user_metadata?.whatsapp_number || '').replace(/\D/g, '');
          
          if (!isPhone && uEmail === cleanEmail.toLowerCase()) return true;
          if (isPhone && cleanDigits && uPhone && (uPhone.includes(cleanDigits) || cleanDigits.includes(uPhone))) return true;
          if (uEmail === cleanEmail.toLowerCase()) return true;
          return false;
        });

        if (matched) {
          userObj = matched.user;
          profileObj = matched.profile;
        }
      } catch (e) {
        console.warn('Could not read users store:', e);
      }

      if (!userObj) {
        throw new Error('Account not found. Please sign up first.');
      }
    }

    const activeEmail = (userObj?.email || cleanEmail || '').toLowerCase();
    const isAdminUser =
      activeEmail.startsWith('admin@') ||
      activeEmail.startsWith('superadmin@') ||
      activeEmail === 'admin@aitools.store' ||
      activeEmail === 'admin@aitools.vip' ||
      localStorage.getItem(ADMIN_AUTH_KEY) === 'true';

    if (isAdminUser) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      localStorage.setItem(ADMIN_EMAIL_KEY, userObj?.email || cleanEmail);
      if (profileObj) profileObj.role = 'admin';
    }

    this.currentUser = userObj;
    this.currentProfile = profileObj || {
      id: userObj.id,
      full_name: userObj.user_metadata?.full_name || 'VIP Member',
      email: userObj.email,
      whatsapp_number: userObj.user_metadata?.whatsapp_number || '',
      role: isAdminUser ? 'admin' : 'member',
      created_at: userObj.created_at
    };

    if (isAdminUser) {
      this.currentProfile.role = 'admin';
    }

    this.saveLocalSession(this.currentUser, this.currentProfile);
    this.notifyListeners();

    return { user: this.currentUser, profile: this.currentProfile };
  }

  async signOut() {
    this.clearLocalSession();
    this.currentUser = null;
    this.currentProfile = null;

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut notice:', e);
      }
    }

    this.notifyListeners();
    return true;
  }
}

export const authService = new AuthService();

