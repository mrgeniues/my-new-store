// AI Tools Store - Premium Animated Tool Cards (Matching Exact Reference Image)
import { getToolIconSvg, buildWhatsAppLink, showToast, getToolLocalizedPrice, getCountryFlag, renderFormattedPoints } from '../utils/helpers.js';
import { requireAuth } from '../utils/authGuard.js';
import { t, getLocalizedTool } from '../i18n/i18n.js';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { authService } from '../lib/auth.js';

// Local storage key for saved favorites
const FAVORITES_KEY = 'ai_tools_favorites_v1';

export function getFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavorite(toolId, toolName = 'Tool') {
  const current = getFavorites();
  const index = current.indexOf(toolId);
  let isSaved = false;

  if (index >= 0) {
    current.splice(index, 1);
    showToast(t('card.removedFavToast') || `Removed from saved favorites`, 'info');
  } else {
    current.push(toolId);
    isSaved = true;
    showToast(t('card.addedFavToast') || `Added to your favorites!`, 'success');
  }

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Failed to save favorite:', e);
  }

  // Update heart icons on screen
  document.querySelectorAll(`.btn-favorite[data-tool-id="${toolId}"]`).forEach((btn) => {
    btn.classList.toggle('active', isSaved);
    btn.setAttribute('aria-checked', String(isSaved));
  });

  return isSaved;
}

export function renderToolCard(rawTool) {
  const tool = getLocalizedTool(rawTool);
  const iconSvg = getToolIconSvg(tool.id, tool.name);
  const userCountry = authService.getUserCountry() || 'Pakistan';
  const localizedPrice = getToolLocalizedPrice(tool, userCountry);
  const buyLink = buildWhatsAppLink(tool.whatsappUrl, tool.name, localizedPrice, userCountry);
  const isFav = getFavorites().includes(tool.id);

  // Theme identification (purple, teal, or blue)
  let theme = tool.themeColor || 'blue';
  if (!tool.themeColor) {
    const cat = (tool.category || '').toLowerCase();
    if (cat.includes('writing') || cat.includes('text') || tool.id.includes('write')) {
      theme = 'purple';
    } else if (cat.includes('image') || cat.includes('artify') || cat.includes('midjourney')) {
      theme = 'teal';
    } else {
      theme = 'blue';
    }
  }

  // Localized Price formatting (country targeted)
  let amount = '$19';
  let unit = 'month';
  if (localizedPrice) {
    if (localizedPrice.includes('/')) {
      const parts = localizedPrice.split('/');
      amount = parts[0].trim();
      unit = parts[1].trim() || 'month';
    } else {
      amount = localizedPrice.trim();
    }
  }

  const ratingVal = tool.rating ? tool.rating.toFixed(1) : '4.8';
  const usersVal = tool.userCount || `${(tool.reviewCount ? (tool.reviewCount / 10).toFixed(1) : '12.4')}K`;

  return `
    <div class="futuristic-tool-card theme-${theme}" data-tool-id="${tool.id}">
      <!-- Dynamic Mouse-Tracking Glow Overlay -->
      <div class="card-mouse-glow"></div>

      <!-- Animated Abstract Mesh & Particles Background -->
      <div class="card-mesh-bg">
        <svg class="mesh-waves-svg" viewBox="0 0 400 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad-${tool.id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${theme === 'purple' ? '#a855f7' : theme === 'teal' ? '#10b981' : '#3b82f6'}" stop-opacity="0.35"/>
              <stop offset="60%" stop-color="${theme === 'purple' ? '#6366f1' : theme === 'teal' ? '#06b6d4' : '#60a5fa'}" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path class="mesh-path mesh-path-1" fill="url(#waveGrad-${tool.id})" d="M0,80 Q100,140 200,80 T400,90 L400,240 L0,240 Z" />
          <path class="mesh-path mesh-path-2" fill="url(#waveGrad-${tool.id})" d="M0,110 Q120,50 240,110 T400,100 L400,240 L0,240 Z" />
        </svg>
        <div class="card-particles-layer"></div>
      </div>

      <!-- Card Top: Logo Container & Favorite Button -->
      <div class="card-header-row">
        <div class="card-logo-box">
          <div class="logo-inner-icon">
            ${tool.image ? `<img src="${tool.image}" alt="${tool.name} logo" />` : iconSvg}
          </div>
        </div>

        <button 
          class="btn-favorite ${isFav ? 'active' : ''}" 
          data-tool-id="${tool.id}" 
          data-tool-name="${tool.name}"
          title="${t('card.saveFav')}"
          aria-label="${t('card.saveFav')}"
        >
          <svg class="heart-icon" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      <!-- Category Pill Badge -->
      <div class="card-badge-row">
        <span class="card-category-pill">${tool.category}</span>
      </div>

      <!-- Tool Title & Description (Bullet Points Supported) -->
      <div class="card-body-content">
        <h3 class="card-tool-name">${tool.name}</h3>
        <div class="card-tool-desc">
          ${renderFormattedPoints(tool.shortDescription || tool.description || '', { isCard: true, maxPoints: 3 })}
        </div>
      </div>

      <!-- Rating & User Stats Row -->
      <div class="card-stats-row">
        <div class="rating-item" title="${t('card.rating')}: ${ratingVal}">
          <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span class="rating-val">${ratingVal}</span>
        </div>
        <span class="stat-separator">•</span>
        <div class="users-item">
          <svg class="users-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span class="users-val">${usersVal} ${t('card.users')}</span>
        </div>
      </div>

      <!-- Price & Primary Buy Now Row (Side-by-Side as in Reference) -->
      <div class="card-price-buy-row">
        <div class="card-price-block">
          <div style="display: flex; align-items: baseline; gap: 0.35rem; flex-wrap: wrap;">
            <span class="price-currency">${amount}</span>
            <span class="price-country-badge" title="Live rate for ${userCountry}">${getCountryFlag(userCountry)}</span>
          </div>
          <span class="price-period">${unit.toLowerCase().includes('month') ? t('card.perMonth') : `/${unit}`}</span>
        </div>

        <a 
          href="${buyLink}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-card-buy-primary"
          data-buy-url="${buyLink}"
          data-tool-id="${tool.id}"
          data-tool-name="${tool.name}"
          data-tool-price="${localizedPrice}"
          data-user-country="${userCountry}"
          title="${t('card.buyNow')}: ${tool.name}"
        >
          <svg class="btn-bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>${t('card.buyNow')}</span>
        </a>
      </div>

      <!-- Secondary Actions Row: How to Use & View Details -->
      <div class="card-secondary-actions-row">
        <a 
          href="#/tool/${tool.id}" 
          class="btn-sub-card btn-how-to-use" 
          data-tool-id="${tool.id}"
          title="${t('card.howToUse')}: ${tool.name}"
        >
          <svg class="btn-sub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
          </svg>
          <span>${t('card.howToUse')}</span>
        </a>

        <a href="#/tool/${tool.id}" class="btn-sub-card btn-view-details" title="${t('card.viewDetails')}: ${tool.name}">
          <span>${t('card.viewDetails')}</span>
          <svg class="btn-sub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </div>
  `;
}

// Compact tool card for secondary lists if needed
export function renderCompactToolCard(tool) {
  return renderToolCard(tool);
}

// Setup global interactive events for dynamic cards (mouse-following glow, favorite toggle, protected actions)
export function initCardInteractions() {
  // Favorite button clicks
  document.querySelectorAll('.btn-favorite').forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const toolId = btn.dataset.toolId;
      const toolName = btn.dataset.toolName;
      toggleFavorite(toolId, toolName);
    };
  });

  // Protected Buy Now Action: prompts Auth if logged out, logs order in Supabase, resumes action on success
  document.querySelectorAll('.btn-card-buy-primary').forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const buyUrl = btn.dataset.buyUrl || btn.getAttribute('href');
      const toolId = btn.dataset.toolId;
      const toolName = btn.dataset.toolName || 'AI Tool';
      const toolPrice = btn.dataset.toolPrice || '$19 /month';

      requireAuth(async (authResult) => {
        if (isSupabaseConfigured) {
          try {
            const user = authResult?.user || authService.currentUser;
            await supabase.from('orders').insert([
              {
                tool_id: toolId || null,
                tool_name: toolName,
                price: toolPrice,
                user_id: user?.id || null,
                user_email: user?.email || 'guest@anonymous.com',
                status: 'inquiry_whatsapp',
                created_at: new Date().toISOString()
              }
            ]);
          } catch (oErr) {
            console.warn('[ToolCard] Order log warning:', oErr);
          }
        }
        window.open(buyUrl, '_blank', 'noopener,noreferrer');
      }, { defaultTab: 'signup' });
    };
  });

  // Protected How to Use Action: prompts Auth if logged out, resumes navigation on success
  document.querySelectorAll('.btn-how-to-use').forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const toolId = btn.dataset.toolId;
      requireAuth(() => {
        window.location.hash = `#/tool/${toolId}#how-to-use`;
      }, { defaultTab: 'signup' });
    };
  });

  // Dynamic mouse-following radial glow on cards
  document.querySelectorAll('.futuristic-tool-card').forEach((card) => {
    card.onmousemove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };
  });
}
