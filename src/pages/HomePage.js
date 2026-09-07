// AI Tools Store - Home Page (Faithful to Reference Images)
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderAiOrbHero } from '../components/AiOrbHero.js';
import { renderToolCard, initCardInteractions } from '../components/ToolCard.js';
import { renderWhatsAppBanner } from '../components/WhatsAppBanner.js';
import { renderFooter } from '../components/Footer.js';
import { authService } from '../lib/auth.js';
import { openAuthModal } from '../components/AuthModal.js';
import { t } from '../i18n/i18n.js';
import { defaultWhatsappUrl } from '../lib/supabase.js';

export async function renderHomePage(root) {
  document.title = `${t('nav.brand')} | ${t('hero.headlinePart1')} ${t('hero.headlineGradient')}`;

  const tools = await toolsApi.getTools();
  const categories = await toolsApi.getCategories();
  const defaultWhatsApp = defaultWhatsappUrl;

  // All active tools loaded directly from Supabase
  const displayTools = tools;

  root.innerHTML = `
    ${renderNavbar('/')}

    <main class="main-content fade-in">
      <!-- HERO SECTION (THE INTELLIGENT TOOL INDEX) -->
      <section class="hero-section">
        <div class="container hero-grid">
          <!-- Left Hero Copy -->
          <div class="hero-content">
            <!-- Small Green Label -->
            <div class="hero-green-index-label">
              <span class="index-dot-pulse"></span>
              <span>THE INTELLIGENT TOOL INDEX</span>
            </div>

            <!-- Large Heading -->
            <h1 class="hero-title-main">
              <span class="title-line-1">Discover the</span>
              <span class="title-line-2">
                <span class="text-gradient-violet-blue">Future</span> of <span class="text-gradient-violet-blue">AI Tools</span>
              </span>
            </h1>

            <!-- Supporting Text -->
            <p class="hero-desc-intelligent">
              A sharper way to find the software that moves your work forward. Explore a living catalog of powerful tools, tested by people who build with AI.
            </p>

            <!-- Rounded Search Bar with Mint Button -->
            <form id="hero-search-form" class="hero-search-capsule" action="#/tools" method="get">
              <div class="search-capsule-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="search-capsule-icon">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                  type="text" 
                  id="hero-search-input" 
                  placeholder="What are you looking to create?" 
                  class="search-capsule-input"
                  autocomplete="off"
                />
              </div>
              <button type="submit" class="btn-search-mint" title="Search tools">
                <span>Search tools</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </form>

            <!-- Indexed Count Metadata Row -->
            <div class="hero-indexed-meta">
              <svg class="indexed-pulse-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span>Over <strong>4,200 tools</strong> indexed and reviewed</span>
            </div>

            <!-- Action Buttons Row -->
            <div class="hero-actions-row">
              <a href="#/tools" class="btn-start-discovering">
                <span>Start discovering</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>
              <a href="#/categories" class="link-browse-catalog">
                <span>Browse the catalog</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>

            <!-- Value Proposition Trust Badges -->
            <div class="hero-trust-row">
              <div class="hero-trust-item">
                <div class="hero-trust-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div class="hero-trust-text">
                  <h4>${t('hero.trust1Title')}</h4>
                  <p>${t('hero.trust1Desc')}</p>
                </div>
              </div>

              <div class="hero-trust-item">
                <div class="hero-trust-icon" style="color: #38bdf8;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <div class="hero-trust-text">
                  <h4>${t('hero.trust2Title')}</h4>
                  <p>${t('hero.trust2Desc')}</p>
                </div>
              </div>

              <div class="hero-trust-item">
                <div class="hero-trust-icon" style="color: #c084fc;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <div class="hero-trust-text">
                  <h4>${t('hero.trust3Title')}</h4>
                  <p>${t('hero.trust3Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right 3D Glowing AI Orb System with Orbits & Floating Glass Labels -->
          ${renderAiOrbHero()}
        </div>
      </section>

      <!-- BROWSE CATEGORIES SECTION -->
      <section class="categories-section">
        <div class="container">
          <div class="section-header-row">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.4rem;">${t('categories.badge')}</span>
              <h2 class="section-title">${t('categories.title')}</h2>
            </div>
            <a href="#/categories" class="section-view-all">
              <span>${t('categories.viewAll')}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <!-- Category Pill Tags Row with Hover Glow -->
          <div class="categories-pills-wrap">
            ${categories.map((cat) => `
              <a href="#/tools?category=${encodeURIComponent(cat.name)}" class="category-pill" title="${cat.name}">
                ${cat.image ? `<img src="${cat.image}" alt="" style="width: 20px; height: 20px; border-radius: 4px; object-fit: cover; vertical-align: middle;" />` : `<span class="category-pill-icon">${cat.icon}</span>`}
                <span>${cat.name}</span>
                <span style="font-size: 0.72rem; opacity: 0.65; margin-left: 0.2rem; background: rgba(255,255,255,0.1); padding: 0.1rem 0.45rem; border-radius: 9999px;">${cat.count || 'PRO'}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- FEATURED TOOLS SECTION (3-Column Animated Cards) -->
      <section class="featured-section">
        <div class="container">
          <div class="section-header-row">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.45rem;">${t('featured.badge')}</span>
              <h2 class="section-title">
                <span>${t('featured.title')}</span>
                <span style="font-size: 1.1rem; color: #38bdf8;">✨</span>
              </h2>
              <p style="color: var(--text-secondary); font-size: 0.92rem; margin-top: 0.25rem;">
                ${t('featured.subtitle')}
              </p>
            </div>
            <a href="#/tools" class="section-view-all">
              <span>${t('featured.viewAll')}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <!-- 3-Column Responsive Grid with Equal Heights -->
          <div class="tools-grid-3">
            ${displayTools.length > 0 
              ? displayTools.slice(0, 6).map((tool) => renderToolCard(tool)).join('')
              : `<div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 20px;">
                   <h3 style="color: var(--text-pure); margin-bottom: 0.5rem;">${t('featured.emptyTitle')}</h3>
                   <p style="max-width: 500px; margin: 0 auto 1.5rem auto; font-size: 0.9rem;">
                     ${t('featured.emptyDesc')}
                   </p>
                   ${authService.isAdmin() ? `<a href="#/admin" class="btn btn-primary" style="font-size: 0.85rem;">${t('featured.openAdmin')}</a>` : `<a href="#/tools" class="btn btn-primary" style="font-size: 0.85rem;">${t('featured.viewAll')}</a>`}
                 </div>`
            }
          </div>
        </div>
      </section>

      <!-- WHY CHOOSE AI TOOLS STORE (4 BENEFITS SECTION) -->
      <section class="benefits-section">
        <div class="container">
          <div class="section-header-row" style="margin-bottom: 2rem;">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.5rem;">${t('benefits.badge')}</span>
              <h2 class="section-title">${t('benefits.title')}</h2>
              <p style="margin-top: 0.35rem; color: var(--text-secondary);">
                ${t('benefits.subtitle')}
              </p>
            </div>
          </div>

          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z"/>
                </svg>
              </div>
              <h4>${t('benefits.b1Title')}</h4>
              <p>${t('benefits.b1Desc')}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #c084fc; border-color: rgba(192, 132, 252, 0.3); background: rgba(192, 132, 252, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <h4>${t('benefits.b2Title')}</h4>
              <p>${t('benefits.b2Desc')}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                </svg>
              </div>
              <h4>${t('benefits.b3Title')}</h4>
              <p>${t('benefits.b3Desc')}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #34d399; border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
              </div>
              <h4>${t('benefits.b4Title')}</h4>
              <p>${t('benefits.b4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CALL TO ACTION (FINAL SECTION) -->
      <section class="final-cta-section">
        <div class="container">
          <div class="final-cta-card">
            <span class="final-cta-badge">${t('finalCta.badge')}</span>
            <h2 class="final-cta-title">${t('finalCta.title')}</h2>
            <p class="final-cta-subtitle">
              ${t('finalCta.subtitle')}
            </p>
            <div class="final-cta-actions">
              <button type="button" id="final-cta-signup-btn" class="btn-cta-primary">
                <span>${t('finalCta.getStarted')}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <a href="#/tools" class="btn-cta-secondary">
                <span>${t('finalCta.browseTools')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- BOTTOM WHATSAPP COMMUNITY CTA BANNER -->
      ${renderWhatsAppBanner()}
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();
  initCardInteractions();

  // Final CTA Sign Up button trigger
  const ctaSignUpBtn = document.getElementById('final-cta-signup-btn');
  if (ctaSignUpBtn) {
    ctaSignUpBtn.onclick = () => {
      openAuthModal({ defaultTab: 'signup' });
    };
  }

  // Search form submission
  const heroForm = document.getElementById('hero-search-form');
  const heroInput = document.getElementById('hero-search-input');
  if (heroForm && heroInput) {
    heroForm.onsubmit = (e) => {
      e.preventDefault();
      const q = heroInput.value.trim();
      window.location.hash = `#/tools?q=${encodeURIComponent(q)}`;
    };
  }
}
