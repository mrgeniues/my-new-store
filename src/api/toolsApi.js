// AI Tools Store - Supabase Data Access Service
// Single source of truth: Supabase PostgreSQL database
import { supabase, isSupabaseConfigured, defaultWhatsappUrl } from '../lib/supabase.js';

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
      countryPricing: (typeof row.country_pricing === 'object' && row.country_pricing !== null) ? row.country_pricing : {},
      category: row.category || 'Text / Writing',
      badge: row.badge || '',
      badgeType: row.badge_type || 'new',
      features: Array.isArray(row.features) ? row.features : [],
      howToUse: Array.isArray(row.how_to_use) ? row.how_to_use : [],
      videoUrl: row.tutorial_video_url || '',
      tutorialVideoUrl: row.tutorial_video_url || '',
      toolUrl: row.tool_url || '#',
      whatsappUrl: row.whatsapp_url || defaultWhatsappUrl || 'https://chat.whatsapp.com/invite/aitools-store-vip',
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

  // Storage keys for resilient offline/local caching of custom categories
  // =========================================================================

  // Fetch raw categories from Supabase (purely real admin categories, no fake defaults)
  async getRawCategories() {
    const STORAGE_CATEGORIES_KEY = 'ai_tools_custom_categories_v2';
    const STORAGE_DELETED_CATEGORIES_KEY = 'ai_tools_deleted_categories_v2';

    // Legacy fake category keys to filter out so old client caches never show dummy defaults
    const LEGACY_FAKE_KEYS = new Set([
      'ai writing', 'ai-writing', 'cat-writing',
      'ai image', 'ai-image', 'cat-image',
      'ai video', 'ai-video', 'cat-video',
      'ai audio', 'ai-audio', 'cat-audio',
      'ai coding', 'ai-coding', 'cat-coding',
      'ai automation', 'ai-automation', 'cat-automation',
      'ai marketing', 'ai-marketing', 'cat-marketing',
      'productivity', 'cat-productivity'
    ]);

    let deletedKeys = [];
    try {
      deletedKeys = JSON.parse(localStorage.getItem(STORAGE_DELETED_CATEGORIES_KEY) || '[]');
    } catch (e) {}

    let list = [];

    // 1. Fetch real categories directly from Supabase
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          list = data
            .filter((r) => !LEGACY_FAKE_KEYS.has((r.name || '').trim().toLowerCase()) && !LEGACY_FAKE_KEYS.has((r.slug || '').trim().toLowerCase()))
            .map((r) => ({
              id: r.id,
              name: r.name,
              slug: r.slug || r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              icon: r.icon || '✨',
              color: r.color || '#6366f1',
              desc: r.description || '',
              description: r.description || '',
              image: r.image || '',
              sortOrder: typeof r.sort_order === 'number' ? r.sort_order : 0
            }));
        }
      } catch (err) {
        console.warn('[AI Tools Store] Notice fetching Supabase categories:', err.message);
      }
    }

    // 2. Build unified category map strictly from real database items (with local offline fallback)
    const categoryMap = new Map();

    if (list.length > 0) {
      // Supabase has active categories created by admin
      list.forEach((item) => {
        const key = item.name.toLowerCase();
        categoryMap.set(key, { ...item, count: 0 });
      });
    } else {
      // Fallback only if Supabase is offline or empty: check local custom categories
      try {
        const rawLocal = JSON.parse(localStorage.getItem(STORAGE_CATEGORIES_KEY) || '[]');
        const sanitized = rawLocal.filter((item) => {
          const key = (item.name || '').trim().toLowerCase();
          const slug = (item.slug || '').trim().toLowerCase();
          const id = (item.id || '').trim().toLowerCase();
          return !LEGACY_FAKE_KEYS.has(key) && !LEGACY_FAKE_KEYS.has(slug) && !LEGACY_FAKE_KEYS.has(id);
        });
        localStorage.setItem(STORAGE_CATEGORIES_KEY, JSON.stringify(sanitized));

        sanitized.forEach((item) => {
          const key = item.name.toLowerCase();
          if (!deletedKeys.includes(key) && !deletedKeys.includes(item.slug)) {
            categoryMap.set(key, { ...item, count: 0 });
          }
        });
      } catch (e) {}
    }

    return Array.from(categoryMap.values()).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  // Public Query: Get categories with real-time tool counts from active tools
  async getCategories() {
    const tools = await this.getTools();
    const categories = await this.getRawCategories();
    const map = new Map();

    categories.forEach((cat) => {
      map.set(cat.name.toLowerCase(), { ...cat, count: 0 });
    });

    // Count tools for each category and link representative tool image if category has no image
    tools.forEach((t) => {
      const toolCat = (t.category || '').trim();
      if (!toolCat) return;

      const key = toolCat.toLowerCase();
      let targetCat = null;

      if (map.has(key)) {
        targetCat = map.get(key);
      } else {
        for (const [mapKey, item] of map.entries()) {
          if (mapKey.includes(key) || key.includes(mapKey)) {
            targetCat = item;
            break;
          }
        }
        if (!targetCat) {
          targetCat = {
            id: 'cat-' + key.replace(/[^a-z0-9]+/g, '-'),
            name: toolCat,
            slug: key.replace(/[^a-z0-9]+/g, '-'),
            icon: '✨',
            color: '#6366f1',
            desc: `Curated AI tools in ${toolCat}.`,
            description: `Curated AI tools in ${toolCat}.`,
            image: '',
            sortOrder: 99,
            count: 0
          };
          map.set(key, targetCat);
        }
      }

      targetCat.count++;
      // If category has no dedicated image, use the first available tool image from this category
      if (!targetCat.image && t.image) {
        targetCat.image = t.image;
      }
    });

    return Array.from(map.values()).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  // Admin Query: Get all categories with tool counts (including inactive tools)
  async adminGetCategories() {
    const tools = await this.adminGetTools().catch(() => []);
    const categories = await this.getRawCategories();
    const map = new Map();

    categories.forEach((cat) => {
      map.set(cat.name.toLowerCase(), { ...cat, count: 0 });
    });

    tools.forEach((t) => {
      const toolCat = (t.category || '').trim();
      if (!toolCat) return;
      const key = toolCat.toLowerCase();
      let targetCat = null;
      if (map.has(key)) {
        targetCat = map.get(key);
      } else {
        for (const [mapKey, item] of map.entries()) {
          if (mapKey.includes(key) || key.includes(mapKey)) {
            targetCat = item;
            break;
          }
        }
        if (!targetCat) {
          targetCat = {
            id: 'cat-' + key.replace(/[^a-z0-9]+/g, '-'),
            name: toolCat,
            slug: key.replace(/[^a-z0-9]+/g, '-'),
            icon: '✨',
            color: '#6366f1',
            desc: `Curated AI tools in ${toolCat}.`,
            description: `Curated AI tools in ${toolCat}.`,
            image: '',
            sortOrder: 99,
            count: 0
          };
          map.set(key, targetCat);
        }
      }
      targetCat.count++;
      if (!targetCat.image && t.image) {
        targetCat.image = t.image;
      }
    });

    return Array.from(map.values()).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  // Admin Mutation: Add or Update Category
  async adminSaveCategory(catData) {
    if (!catData || !catData.name || !catData.name.trim()) {
      throw new Error('Category name is required.');
    }

    const cleanName = catData.name.trim();
    const cleanSlug = (catData.slug || cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')).trim();
    const cleanDesc = (catData.description || catData.desc || '').trim();
    const cleanIcon = (catData.icon || '✨').trim();
    const cleanImage = (catData.image || '').trim();
    const cleanColor = catData.color || '#6366f1';
    const sortOrder = parseInt(catData.sortOrder ?? catData.sort_order, 10) || 0;

    const normalized = {
      id: catData.id || ('cat-' + Date.now().toString(36)),
      name: cleanName,
      slug: cleanSlug,
      description: cleanDesc,
      desc: cleanDesc,
      icon: cleanIcon,
      image: cleanImage,
      color: cleanColor,
      sortOrder
    };

    // 1. Persist to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const payload = {
          name: cleanName,
          slug: cleanSlug,
          description: cleanDesc,
          icon: cleanIcon,
          image: cleanImage,
          color: cleanColor,
          sort_order: sortOrder
        };

        if (catData.id && catData.id.length > 20 && catData.id.includes('-')) {
          await supabase.from('categories').update(payload).eq('id', catData.id);
        } else {
          await supabase.from('categories').upsert(payload, { onConflict: 'slug' });
        }
      } catch (err) {
        console.warn('[AI Tools Store] Supabase category save notice:', err.message);
      }
    }

    // 2. Persist to localStorage for instant client availability
    try {
      const STORAGE_CATEGORIES_KEY = 'ai_tools_custom_categories_v2';
      const STORAGE_DELETED_CATEGORIES_KEY = 'ai_tools_deleted_categories_v2';

      let localCategories = JSON.parse(localStorage.getItem(STORAGE_CATEGORIES_KEY) || '[]');
      const existingIdx = localCategories.findIndex(
        (c) => c.id === normalized.id || c.slug === normalized.slug || c.name.toLowerCase() === cleanName.toLowerCase()
      );
      if (existingIdx >= 0) {
        localCategories[existingIdx] = { ...localCategories[existingIdx], ...normalized };
      } else {
        localCategories.push(normalized);
      }
      localStorage.setItem(STORAGE_CATEGORIES_KEY, JSON.stringify(localCategories));

      // Remove from deleted list if re-added
      let deletedKeys = JSON.parse(localStorage.getItem(STORAGE_DELETED_CATEGORIES_KEY) || '[]');
      deletedKeys = deletedKeys.filter((k) => k !== cleanName.toLowerCase() && k !== cleanSlug);
      localStorage.setItem(STORAGE_DELETED_CATEGORIES_KEY, JSON.stringify(deletedKeys));
    } catch (e) {
      console.warn('[AI Tools Store] localStorage save category error:', e);
    }

    return normalized;
  }

  // Admin Mutation: Delete Category
  async adminDeleteCategory(categoryId, categoryName) {
    const cleanName = (categoryName || '').trim().toLowerCase();
    const cleanId = (categoryId || '').trim();

    // 1. Delete from Supabase
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('categories').delete();
        if (cleanId && cleanId.length > 20 && cleanId.includes('-')) {
          query = query.eq('id', cleanId);
        } else if (cleanName) {
          query = query.or(`name.ilike.${cleanName},slug.eq.${cleanId}`);
        }
        await query;
      } catch (err) {
        console.warn('[AI Tools Store] Supabase category delete notice:', err.message);
      }
    }

    // 2. Delete from localStorage
    try {
      const STORAGE_CATEGORIES_KEY = 'ai_tools_custom_categories_v2';
      const STORAGE_DELETED_CATEGORIES_KEY = 'ai_tools_deleted_categories_v2';

      let localCategories = JSON.parse(localStorage.getItem(STORAGE_CATEGORIES_KEY) || '[]');
      localCategories = localCategories.filter(
        (c) => c.id !== cleanId && c.name.toLowerCase() !== cleanName && c.slug !== cleanId
      );
      localStorage.setItem(STORAGE_CATEGORIES_KEY, JSON.stringify(localCategories));

      // Record in deleted list so default categories don't automatically reappear
      let deletedKeys = JSON.parse(localStorage.getItem(STORAGE_DELETED_CATEGORIES_KEY) || '[]');
      if (cleanName && !deletedKeys.includes(cleanName)) deletedKeys.push(cleanName);
      if (cleanId && !deletedKeys.includes(cleanId)) deletedKeys.push(cleanId);
      localStorage.setItem(STORAGE_DELETED_CATEGORIES_KEY, JSON.stringify(deletedKeys));
    } catch (e) {
      console.warn('[AI Tools Store] localStorage delete category error:', e);
    }

    return true;
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
      country_pricing: (toolData.countryPricing && typeof toolData.countryPricing === 'object') ? toolData.countryPricing : {},
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
