// AI Tools Store - Tool Details Page (Core Page with How-To-Use & Dynamic WhatsApp Buy Now)
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderHowToUse } from '../components/HowToUse.js';
import { renderToolCard } from '../components/ToolCard.js';
import { renderFooter } from '../components/Footer.js';
import { getToolIconSvg, buildWhatsAppLink } from '../utils/helpers.js';
import { requireAuth } from '../utils/authGuard.js';
import { t, getLocalizedTool } from '../i18n/i18n.js';

export async function renderToolDetailsPage(root, { pathParams }) {
  const toolId = pathParams?.id;
  const rawTool = await toolsApi.getToolById(toolId);

  if (!rawTool) {
    document.title = `${t('toolDetails.notFoundTitle')} | ${t('nav.brand')}`;
    root.innerHTML = `
      ${renderNavbar('/tools')}
      <main class="main-content container empty-state" style="margin-top: 5rem;">
        <div class="empty-state-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2>${t('toolDetails.notFoundTitle')}</h2>
        <p>${t('toolDetails.notFoundDesc')}</p>
        <a href="#/tools" class="btn btn-primary">${t('toolDetails.backToTools')}</a>
      </main>
      ${renderFooter()}
    `;
    attachNavbarEvents();
    return;
  }

  const tool = getLocalizedTool(rawTool);
  document.title = `${tool.name} | ${t('nav.brand')}`;

  // Get similar tools
  const allTools = await toolsApi.getTools();
  const relatedTools = allTools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  // Dynamic WhatsApp URL strictly from backend/API
  const dynamicWhatsAppBuyUrl = buildWhatsAppLink(tool.whatsappUrl, tool.name);

  root.innerHTML = `
    ${renderNavbar('/tools')}

    <main class="main-content container tool-details-page fade-in">
      <!-- Breadcrumbs Navigation -->
      <nav class="breadcrumbs-bar">
        <a href="#/">${t('nav.home')}</a>
        <span class="breadcrumbs-separator">/</span>
        <a href="#/tools">${t('nav.allTools')}</a>
        <span class="breadcrumbs-separator">/</span>
        <a href="#/tools?category=${encodeURIComponent(tool.category)}">${tool.category}</a>
        <span class="breadcrumbs-separator">/</span>
        <span style="color: var(--text-pure); font-weight: 600;">${tool.name}</span>
      </nav>

      <!-- Main Two-Column Layout -->
      <div class="details-layout">
        <!-- Left Column: Tool Specs & Descriptions -->
        <div class="details-main-content">
          <div class="details-header">
            <div class="details-logo-box" style="background: ${tool.iconGradient || 'linear-gradient(135deg, #4f46e5, #06b6d4)'}; color: #ffffff;">
              ${tool.image ? `<img src="${tool.image}" alt="${tool.name} Logo" />` : getToolIconSvg(tool.id, tool.name)}
            </div>

            <div class="details-title-wrap">
              <h1>${tool.name}</h1>
              <div class="details-badges-row">
                <span class="badge badge-popular">${tool.category}</span>
                ${tool.badge ? `<span class="badge badge-hot">★ ${tool.badge}</span>` : ''}
                <span style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: #fbbf24; font-weight: 700;">
                  ★ ${tool.rating || 4.9} <span style="color: var(--text-muted); font-weight: 400;">(${tool.reviewCount || 150}+ reviews)</span>
                </span>
              </div>
            </div>
          </div>

          <p class="details-short-desc">${tool.shortDescription || ''}</p>

          <!-- Full Description Card -->
          <div class="details-full-desc-card">
            <h3>${tool.name}</h3>
            <p>${tool.description || tool.shortDescription || ''}</p>

            <!-- Key Features Checklist -->
            <div style="margin-top: 1.5rem;">
              <h4 style="font-size: 1rem; color: var(--text-pure); margin-bottom: 0.85rem;">${t('toolDetails.featuresTab')}</h4>
              <div class="features-checklist">
                ${(tool.features || []).map((feat) => `
                  <div class="feature-check-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>${feat}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- DYNAMIC HOW TO USE SECTION (Video & Step-by-Step Instructions) -->
          ${renderHowToUse(tool)}
        </div>

        <!-- Right Column: Sticky Purchase & License Box -->
        <aside class="details-sidebar">
          <div class="purchase-card-sticky">
            <div class="purchase-price-block">
              <div class="purchase-price-val">${tool.price ? tool.price.split('/')[0].trim() : '$19'}</div>
              <div class="purchase-price-period">${t('card.perMonth')} &bull; ${t('hero.trust2Title')}</div>
            </div>

            <!-- BUY NOW BUTTON (Redirects to backend WhatsApp link) -->
            <a 
              href="${dynamicWhatsAppBuyUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-buy-whatsapp-main"
              id="tool-buy-now-btn"
              title="${t('toolDetails.buyNowWhatsApp')}: ${tool.name}"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
              </svg>
              <span>${t('toolDetails.buyNowWhatsApp')}</span>
            </a>

            <!-- Official Website Direct Link -->
            ${tool.toolUrl && tool.toolUrl !== '#' ? `
              <a href="${tool.toolUrl}" target="_blank" rel="noopener noreferrer" class="btn-visit-tool">
                <span>${t('toolDetails.visitWebsite')}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ` : ''}

            <!-- Purchase Guarantees & Features -->
            <ul class="purchase-guarantees">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${t('toolDetails.guaranteesSupport')}</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${t('toolDetails.guaranteesActivation')}</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${t('toolDetails.guaranteesLicensing')}</span>
              </li>
            </ul>

            <!-- WhatsApp Purchase Guarantee -->
            <div style="font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
              <span style="color: var(--accent-mint);">✓</span> ${t('toolDetails.purchaseVerified')}
            </div>
          </div>
        </aside>
      </div>

      <!-- Related Tools Row -->
      ${relatedTools.length > 0 ? `
        <section style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle);">
          <div class="section-header-row">
            <h3 class="section-title">Similar AI Tools in ${tool.category}</h3>
            <a href="#/tools?category=${encodeURIComponent(tool.category)}" class="section-view-all">
              <span>Explore Category</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
          <div class="tools-grid-3">
            ${relatedTools.map((t) => renderToolCard(t)).join('')}
          </div>
        </section>
      ` : ''}
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();
  initCardInteractions();

  const buyNowBtn = document.getElementById('tool-buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.onclick = (e) => {
      e.preventDefault();
      const buyUrl = buyNowBtn.getAttribute('href');
      requireAuth(() => {
        window.open(buyUrl, '_blank', 'noopener,noreferrer');
      }, { defaultTab: 'signup' });
    };
  }
}
