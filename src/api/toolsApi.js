// AI Tools Store - Supabase Data Access Service
// Single source of truth: Supabase PostgreSQL database
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

class ToolsApiService {
  // Normalize a Supabase record into standard camelCase/snake_case hybrid for frontend
  normalizeTool(row) {
    if (!row) return null;
    return {
      id: row.id,
      slug: row.slug || row.id,
      name: row.name || 'Untitled Tool',
      image: row.image || '',
      shortDescription: row.short_description || '',
      description: row.full_description || row.short_description || '',
      fullDescription: row.full_description || '',
      price: row.price || '$19 /month',
      category: row.category || 'Text / Writing',
      badge: row.badge || '',
      badgeType: row.badge_type || 'new',
      features: Array.isArray(row.features) ? row.features : [],
      howToUse: Array.isArray(row.how_to_use) ? row.how_to_use : [],
      videoUrl: row.tutorial_video_url || '',
      tutorialVideoUrl: row.tutorial_video_url || '',
      toolUrl: row.tool_url || '#',
      whatsappUrl: row.whatsapp_url || import.meta.env.VITE_DEFAULT_WHATSAPP_URL || 'https://chat.whatsapp.com/invite/aitools-store-vip',
      rating: typeof row.rating === 'number' ? row.rating : 4.8,
      userCount: row.users_count || '10.5K',
      themeColor: row.theme_color || 'blue',
      featured: Boolean(row.featured),
      active: Boolean(row.active),
      sortOrder: row.sort_order || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  // Public Query: Fetch all active tools directly from Supabase
  async getTools() {
    if (!isSupabaseConfigured) {
      console.warn('[AI Tools Store] Supabase URL or Anon Key not yet configured in .env.');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[AI Tools Store] Supabase query error:', error.message);
        return [];
      }

      return (data || []).map((row) => this.normalizeTool(row));
    } catch (err) {
      console.error('[AI Tools Store] Failed to connect to Supabase:', err);
      return [];
    }
  }

  // Public Query: Fetch single tool by slug or UUID
  async getToolById(idOrSlug) {
    if (!isSupabaseConfigured || !idOrSlug) return null;

    try {
      // Check UUID format vs slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      
      let query = supabase.from('tools').select('*');
      if (isUuid) {
        query = query.or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
      } else {
        query = query.eq('slug', idOrSlug);
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        console.error(`[AI Tools Store] Error fetching tool "${idOrSlug}":`, error.message);
        return null;
      }

      return data ? this.normalizeTool(data) : null;
    } catch (err) {
      console.error(`[AI Tools Store] Exception fetching tool "${idOrSlug}":`, err);
      return null;
    }
  }

  // Public Query: Get categories with real-time tool counts from Supabase
  async getCategories() {
    const tools = await this.getTools();
    const map = new Map();

    // The 8 official marketplace categories specified in design requirements
    const standardCategories = [
      { name: 'AI Writing', icon: '✍️', color: '#a855f7' },
      { name: 'AI Image', icon: '🎨', color: '#10b981' },
      { name: 'AI Video', icon: '🎬', color: '#f97316' },
      { name: 'AI Audio', icon: '🎙️', color: '#ec4899' },
      { name: 'AI Coding', icon: '💻', color: '#3b82f6' },
      { name: 'AI Automation', icon: '⚡', color: '#eab308' },
      { name: 'AI Marketing', icon: '📢', color: '#8b5cf6' },
      { name: 'Productivity', icon: '🚀', color: '#06b6d4' }
    ];

    standardCategories.forEach((sc) => {
      const key = sc.name.toLowerCase();
      map.set(key, {
        id: key.replace(/[^a-z0-9]+/g, '-'),
        name: sc.name,
        icon: sc.icon,
        color: sc.color,
        count: 0
      });
    });

    // Tally actual tools from database
    tools.forEach((t) => {
      const cat = t.category || 'Productivity';
      const key = cat.toLowerCase();
      
      let matched = false;
      for (const [mapKey, item] of map.entries()) {
        if (key.includes(mapKey) || mapKey.includes(key) || (key.includes('write') && mapKey.includes('write')) || (key.includes('code') && mapKey.includes('code')) || (key.includes('image') && mapKey.includes('image')) || (key.includes('video') && mapKey.includes('video'))) {
          item.count++;
          matched = true;
          break;
        }
      }

      if (!matched) {
        if (!map.has(key)) {
          map.set(key, {
            id: key.replace(/[^a-z0-9]+/g, '-'),
            name: cat,
            icon: '✨',
            color: '#6366f1',
            count: 1
          });
        } else {
          map.get(key).count++;
        }
      }
    });

    return Array.from(map.values());
  }

  // =========================================================================
  // ADMIN ONLY FUNCTIONS (Secured by Supabase RLS & Auth)
  // =========================================================================

  // Admin Query: Fetch all tools (including inactive ones)
  async adminGetTools() {
    if (!isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data || []).map((row) => this.normalizeTool(row));
  }

  // Admin Mutation: Insert or update a tool in Supabase
  async adminSaveTool(toolData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured.');
    }

    const payload = {
      name: toolData.name.trim(),
      slug: (toolData.slug || toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim(),
      image: toolData.image || null,
      short_description: toolData.shortDescription || null,
      full_description: toolData.fullDescription || toolData.description || null,
      price: toolData.price || '$19 /month',
      category: toolData.category || 'Text / Writing',
      badge: toolData.badge || null,
      badge_type: toolData.badgeType || 'new',
      theme_color: toolData.themeColor || 'blue',
      features: Array.isArray(toolData.features) ? toolData.features : [],
      how_to_use: Array.isArray(toolData.howToUse) ? toolData.howToUse : [],
      tutorial_video_url: toolData.tutorialVideoUrl || toolData.videoUrl || null,
      tool_url: toolData.toolUrl || null,
      whatsapp_url: toolData.whatsappUrl || null,
      rating: parseFloat(toolData.rating) || 4.8,
      users_count: toolData.userCount || toolData.users_count || '10.5K',
      featured: Boolean(toolData.featured),
      active: toolData.active !== false,
      sort_order: parseInt(toolData.sortOrder || toolData.sort_order, 10) || 0
    };

    if (toolData.id && toolData.id.length > 20) {
      // Update existing record
      const { data, error } = await supabase
        .from('tools')
        .update(payload)
        .eq('id', toolData.id)
        .select()
        .single();

      if (error) throw error;
      return this.normalizeTool(data);
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('tools')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return this.normalizeTool(data);
    }
  }

  // Admin Mutation: Delete a tool from Supabase
  async adminDeleteTool(id) {
    if (!isSupabaseConfigured) throw new Error('Supabase not configured.');

    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Admin Mutation: Toggle active status
  async adminToggleActive(id, active) {
    if (!isSupabaseConfigured) throw new Error('Supabase not configured.');

    const { data, error } = await supabase
      .from('tools')
      .update({ active })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.normalizeTool(data);
  }
}

export const toolsApi = new ToolsApiService();
