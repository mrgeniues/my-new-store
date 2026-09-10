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

  // =========================================================================
  // HOT DEALS SYSTEM (Buy 1 Get 1 Free, Custom Quantities, Special Promos)
  // =========================================================================

  normalizeHotDeal(row) {
    if (!row) return null;
    return {
      id: row.id,
      slug: row.slug || row.id,
      name: row.name || 'Untitled Hot Deal',
      image: row.image || '',
      shortDescription: row.short_description || '',
      description: row.full_description || row.short_description || '',
      fullDescription: row.full_description || '',
      category: row.category || 'Hot Deals',
      offerLabel: row.offer_label || 'BUY 1 GET 1 FREE',
      buyQuantity: typeof row.buy_quantity === 'number' ? row.buy_quantity : (parseInt(row.buy_quantity, 10) || 1),
      freeQuantity: typeof row.free_quantity === 'number' ? row.free_quantity : (parseInt(row.free_quantity, 10) || 1),
      dealPrice: row.deal_price || row.price || 'PKR 1,999 /mo',
      price: row.deal_price || row.price || 'PKR 1,999 /mo',
      regularPrice: row.regular_price || 'PKR 3,999 /mo',
      countryPricing: (typeof row.country_pricing === 'object' && row.country_pricing !== null) ? row.country_pricing : {},
      badge: row.badge || '🔥 HOT DEAL',
      badgeType: row.badge_type || 'hot',
      themeColor: row.theme_color || 'orange',
      stockLeft: row.stock_left || 'Limited slots available',
      features: Array.isArray(row.features) ? row.features : [
        'Instant WhatsApp Concierge Activation',
        'Official private seat or workspace invite',
        '24/7 dedicated replacement warranty',
        'Full commercial usage rights'
      ],
      howToUse: Array.isArray(row.how_to_use) ? row.how_to_use : [],
      tutorialVideoUrl: row.tutorial_video_url || '',
      toolUrl: row.tool_url || '#',
      whatsappUrl: row.whatsapp_url || defaultWhatsappUrl,
      rating: typeof row.rating === 'number' ? row.rating : 4.9,
      userCount: row.users_count || '2.5K claimed',
      featured: Boolean(row.featured !== false),
      active: Boolean(row.active !== false),
      sortOrder: row.sort_order || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  // Public Query: Get all active hot deals
  async getHotDeals() {
    const STORAGE_KEY = 'ai_tools_hot_deals_v1';
    let deals = [];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('hot_deals')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          deals = data.map((r) => this.normalizeHotDeal(r));
        }
      } catch (err) {
        console.warn('[AI Tools Store] Hot deals Supabase notice:', err.message);
      }
    }

    // Fallback to local storage or starter dataset
    if (deals.length === 0) {
      try {
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (Array.isArray(local) && local.length > 0) {
          deals = local.filter((d) => d.active !== false);
        }
      } catch (e) {}
    }

    if (deals.length === 0) {
      deals = DEFAULT_HOT_DEALS;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_HOT_DEALS));
      } catch (e) {}
    }

    return deals;
  }

  // Public Query: Get single hot deal
  async getHotDealById(idOrSlug) {
    if (!idOrSlug) return null;
    const all = await this.getHotDeals();
    return all.find((d) => d.id === idOrSlug || d.slug === idOrSlug) || null;
  }

  // Admin Query: Get all hot deals (including inactive)
  async adminGetHotDeals() {
    const STORAGE_KEY = 'ai_tools_hot_deals_v1';
    let deals = [];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('hot_deals')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          deals = data.map((r) => this.normalizeHotDeal(r));
        }
      } catch (err) {
        console.warn('[AI Tools Store] Admin hot deals Supabase notice:', err.message);
      }
    }

    if (deals.length === 0) {
      try {
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (Array.isArray(local) && local.length > 0) {
          deals = local.map((d) => this.normalizeHotDeal(d));
        }
      } catch (e) {}
    }

    if (deals.length === 0) {
      deals = DEFAULT_HOT_DEALS;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_HOT_DEALS));
      } catch (e) {}
    }

    return deals;
  }

  // Admin Mutation: Add or Update Hot Deal
  async adminSaveHotDeal(dealData) {
    if (!dealData || !dealData.name || !dealData.name.trim()) {
      throw new Error('Deal product name is required.');
    }

    const STORAGE_KEY = 'ai_tools_hot_deals_v1';
    const cleanName = dealData.name.trim();
    const cleanSlug = (dealData.slug || cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')).trim();

    const normalized = {
      id: dealData.id || ('deal-' + Date.now().toString(36)),
      name: cleanName,
      slug: cleanSlug,
      image: dealData.image || '',
      shortDescription: dealData.shortDescription || dealData.description || '',
      fullDescription: dealData.fullDescription || dealData.description || '',
      category: dealData.category || 'Promotions & Bundles',
      offerLabel: dealData.offerLabel || 'BUY 1 GET 1 FREE',
      buyQuantity: parseInt(dealData.buyQuantity, 10) || 1,
      freeQuantity: parseInt(dealData.freeQuantity, 10) || 1,
      dealPrice: dealData.dealPrice || dealData.price || 'PKR 1,999 /mo',
      price: dealData.dealPrice || dealData.price || 'PKR 1,999 /mo',
      regularPrice: dealData.regularPrice || 'PKR 3,999 /mo',
      countryPricing: (dealData.countryPricing && typeof dealData.countryPricing === 'object') ? dealData.countryPricing : {},
      badge: dealData.badge || `🔥 ${dealData.offerLabel || 'HOT DEAL'}`,
      badgeType: dealData.badgeType || 'hot',
      themeColor: dealData.themeColor || 'orange',
      stockLeft: dealData.stockLeft || 'Only 5 slots left today',
      features: Array.isArray(dealData.features) ? dealData.features : [
        'Instant WhatsApp Concierge Activation',
        'Official private seat or workspace invite',
        '24/7 dedicated replacement warranty'
      ],
      howToUse: Array.isArray(dealData.howToUse) ? dealData.howToUse : [],
      tutorialVideoUrl: dealData.tutorialVideoUrl || '',
      toolUrl: dealData.toolUrl || '#',
      whatsappUrl: dealData.whatsappUrl || defaultWhatsappUrl,
      rating: parseFloat(dealData.rating) || 4.9,
      userCount: dealData.userCount || '2.8K claimed',
      featured: Boolean(dealData.featured !== false),
      active: Boolean(dealData.active !== false),
      sortOrder: parseInt(dealData.sortOrder, 10) || 0,
      updatedAt: new Date().toISOString()
    };

    // 1. Try Supabase
    if (isSupabaseConfigured) {
      try {
        const payload = {
          name: normalized.name,
          slug: normalized.slug,
          image: normalized.image,
          short_description: normalized.shortDescription,
          full_description: normalized.fullDescription,
          category: normalized.category,
          offer_label: normalized.offerLabel,
          buy_quantity: normalized.buyQuantity,
          free_quantity: normalized.freeQuantity,
          deal_price: normalized.dealPrice,
          regular_price: normalized.regularPrice,
          country_pricing: normalized.countryPricing,
          badge: normalized.badge,
          badge_type: normalized.badgeType,
          theme_color: normalized.themeColor,
          stock_left: normalized.stockLeft,
          rating: normalized.rating,
          users_count: normalized.userCount,
          featured: normalized.featured,
          active: normalized.active,
          sort_order: normalized.sortOrder,
          updated_at: new Date().toISOString()
        };

        if (dealData.id && dealData.id.length > 20 && dealData.id.includes('-')) {
          await supabase.from('hot_deals').update(payload).eq('id', dealData.id);
        } else {
          await supabase.from('hot_deals').upsert(payload, { onConflict: 'slug' });
        }
      } catch (err) {
        console.warn('[AI Tools Store] Supabase hot deal save notice:', err.message);
      }
    }

    // 2. Persist to localStorage
    try {
      let localDeals = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (localDeals.length === 0) localDeals = [...DEFAULT_HOT_DEALS];

      const idx = localDeals.findIndex((d) => d.id === normalized.id || d.slug === normalized.slug);
      if (idx >= 0) {
        localDeals[idx] = { ...localDeals[idx], ...normalized };
      } else {
        localDeals.push(normalized);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localDeals));
    } catch (e) {
      console.warn('[AI Tools Store] localStorage save hot deal error:', e);
    }

    return normalized;
  }

  // Admin Mutation: Delete Hot Deal
  async adminDeleteHotDeal(id) {
    const STORAGE_KEY = 'ai_tools_hot_deals_v1';

    if (isSupabaseConfigured) {
      try {
        await supabase.from('hot_deals').delete().eq('id', id);
      } catch (err) {
        console.warn('[AI Tools Store] Supabase hot deal delete notice:', err.message);
      }
    }

    try {
      let localDeals = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      localDeals = localDeals.filter((d) => d.id !== id && d.slug !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localDeals));
    } catch (e) {}

    return true;
  }

  // Admin Mutation: Toggle Hot Deal Active Status
  async adminToggleHotDealActive(id, active) {
    const STORAGE_KEY = 'ai_tools_hot_deals_v1';

    if (isSupabaseConfigured) {
      try {
        await supabase.from('hot_deals').update({ active }).eq('id', id);
      } catch (err) {
        console.warn('[AI Tools Store] Supabase hot deal toggle notice:', err.message);
      }
    }

    try {
      let localDeals = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const deal = localDeals.find((d) => d.id === id || d.slug === id);
      if (deal) {
        deal.active = active;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localDeals));
      }
    } catch (e) {}

    return true;
  }
}

export const DEFAULT_HOT_DEALS = [
  {
    id: 'deal-chatgpt-claude-duo',
    name: 'ChatGPT Plus & Claude Pro Duo Bundle',
    slug: 'chatgpt-claude-duo-bogo',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    shortDescription: 'Buy 1 ChatGPT Plus subscription and get 1 Claude 3.5 Sonnet Pro subscription 100% Free! Unlimited reasoning and coding power.',
    fullDescription: 'Get the ultimate AI combo deal! Order 1 ChatGPT Plus official seat and instantly claim 1 Claude 3.5 Sonnet Pro seat completely free. Features full GPT-4o, o1 reasoning models, Artifacts, and 200K token context window.',
    category: 'Text / Reasoning',
    offerLabel: 'BUY 1 GET 1 FREE',
    buyQuantity: 1,
    freeQuantity: 1,
    price: 'PKR 2,499 /mo',
    dealPrice: 'PKR 2,499 /mo',
    regularPrice: 'PKR 5,500 /mo',
    badge: '🔥 BUY 1 GET 1 FREE',
    badgeType: 'hot',
    themeColor: 'orange',
    stockLeft: 'Only 4 bundles left today',
    rating: 4.9,
    userCount: '3.4K claimed',
    featured: true,
    active: true,
    sortOrder: 1,
    countryPricing: {
      'Pakistan': 'PKR 2,499 /mo',
      'India': 'INR 1,299 /mo',
      'United Arab Emirates': 'AED 59 /mo',
      'Saudi Arabia': 'SAR 65 /mo',
      'United States': 'USD $19.99 /mo',
      'United Kingdom': 'GBP £15.99 /mo',
      'Global': 'USD $19.99 /mo'
    }
  },
  {
    id: 'deal-midjourney-leonardo-combo',
    name: 'Midjourney v6 & Leonardo AI Creative Pack',
    slug: 'midjourney-leonardo-combo-bogo',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80',
    shortDescription: 'Buy 1 Midjourney v6 license and unlock 1 Leonardo AI Ultra license Free. Fast GPU hours and photorealistic rendering.',
    fullDescription: 'Unleash your creative potential with Midjourney v6 and Leonardo AI. Generate world-class visuals, realistic portraits, and concept artwork with zero restrictions.',
    category: 'Image / Design',
    offerLabel: 'BUY 1 GET 1 FREE',
    buyQuantity: 1,
    freeQuantity: 1,
    price: 'PKR 2,999 /mo',
    dealPrice: 'PKR 2,999 /mo',
    regularPrice: 'PKR 6,000 /mo',
    badge: '🎨 BUY 1 GET 1 FREE',
    badgeType: 'hot',
    themeColor: 'teal',
    stockLeft: 'Only 6 licenses remaining',
    rating: 4.9,
    userCount: '2.1K claimed',
    featured: true,
    active: true,
    sortOrder: 2,
    countryPricing: {
      'Pakistan': 'PKR 2,999 /mo',
      'India': 'INR 1,499 /mo',
      'United Arab Emirates': 'AED 69 /mo',
      'Saudi Arabia': 'SAR 75 /mo',
      'United States': 'USD $24.99 /mo',
      'United Kingdom': 'GBP £19.99 /mo',
      'Global': 'USD $24.99 /mo'
    }
  },
  {
    id: 'deal-cursor-copilot-dev-stack',
    name: 'Cursor Pro & GitHub Copilot Dev Stack',
    slug: 'cursor-copilot-dev-stack-bogo',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    shortDescription: 'Buy 1 Cursor Pro subscription and get 1 GitHub Copilot Individual license Free. 10x your development velocity.',
    fullDescription: 'The ultimate AI coding powerhouse. AI multi-file edits, inline predictions, context-aware completions, and full repo understanding.',
    category: 'Coding / Development',
    offerLabel: 'BUY 1 GET 1 FREE',
    buyQuantity: 1,
    freeQuantity: 1,
    price: 'PKR 3,200 /mo',
    dealPrice: 'PKR 3,200 /mo',
    regularPrice: 'PKR 6,500 /mo',
    badge: '⚡ BUY 1 GET 1 FREE',
    badgeType: 'hot',
    themeColor: 'purple',
    stockLeft: 'Only 3 spots available',
    rating: 5.0,
    userCount: '4.8K claimed',
    featured: true,
    active: true,
    sortOrder: 3,
    countryPricing: {
      'Pakistan': 'PKR 3,200 /mo',
      'India': 'INR 1,599 /mo',
      'United Arab Emirates': 'AED 75 /mo',
      'Saudi Arabia': 'SAR 79 /mo',
      'United States': 'USD $25.99 /mo',
      'United Kingdom': 'GBP £20.99 /mo',
      'Global': 'USD $25.99 /mo'
    }
  }
];

export const toolsApi = new ToolsApiService();
