// AI Tools Store - Supabase Client Integration
import { createClient } from '@supabase/supabase-js';

// Fallback production credentials to ensure connection even if environment variables are delayed or missing in host build
const DEFAULT_SUPABASE_URL = 'https://rqemoitjanmxsmcmveso.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk';
const DEFAULT_WHATSAPP_URL = 'https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q';

export const getEnv = (key, fallback = '') => {
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__[key]) {
    return window.__ENV__[key];
  }
  if (key === 'VITE_SUPABASE_URL' && import.meta?.env?.VITE_SUPABASE_URL) {
    return import.meta.env.VITE_SUPABASE_URL;
  }
  if (key === 'VITE_SUPABASE_ANON_KEY' && import.meta?.env?.VITE_SUPABASE_ANON_KEY) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
  if (key === 'VITE_DEFAULT_WHATSAPP_URL' && import.meta?.env?.VITE_DEFAULT_WHATSAPP_URL) {
    return import.meta.env.VITE_DEFAULT_WHATSAPP_URL;
  }
  if (key === 'VITE_ADMIN_EMAILS' && import.meta?.env?.VITE_ADMIN_EMAILS) {
    return import.meta.env.VITE_ADMIN_EMAILS;
  }
  if (typeof import.meta !== 'undefined' && import.meta?.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return fallback;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', DEFAULT_SUPABASE_URL);
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY', DEFAULT_SUPABASE_ANON_KEY);
export const defaultWhatsappUrl = getEnv('VITE_DEFAULT_WHATSAPP_URL', DEFAULT_WHATSAPP_URL);

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') && 
  !supabaseAnonKey.includes('your-anon-key')
);

// Resilient client initialization with auto refresh and session persistence
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: { persistSession: false }
    });

// Helper to upload tool logo/image to Supabase Storage bucket 'tool-images'
export async function uploadToolImage(file) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `logos/${fileName}`;

  const { data, error } = await supabase.storage
    .from('tool-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from('tool-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
