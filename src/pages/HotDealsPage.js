// AI Tools Store - Hot Deals & Promotional Offers Showcase Page
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { t } from '../i18n/i18n.js';
import { authService } from '../lib/auth.js';
import { buildWhatsAppLink, getToolLocalizedPrice, showToast, parsePriceAndDuration } from '../utils/helpers.js';

export async function renderHotDealsPage(root, { queryParams }) {
  document.title = `🔥 Hot Deals & BOGO Offers | ${t('nav.brand')}`;

  let deals = await toolsApi.getHotDeals();
  let currentCountry = authService.getUserCountry() || 'Pakistan';
  let activeCategory = 'All';
  let searchQuery = '';

  // Extract unique categories from deals
  const dealCategories = ['All', ...new Set(deals.map((d) => d.category || 'Hot Deals').filter(Boolean))];

  function renderDealsGrid(dealsList) {
    if (!dealsList || dealsList.length === 0) {
      return `
        <div class="empty-state-container" style="text-align: center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-glass); border-radius: 16px; margin: 2rem 0;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔥</div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); margin-bottom: 0.5rem; font-weight: 700;">No Hot Deals Found</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.5rem auto; font-size: 0.95rem;">
            No promotions match your current search or category filter. Check back soon for fresh BOGO drops!
          </p>
          <button id="btn-reset-deals-filters" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.6rem 1.5rem;">
            Reset Filters
          </button>
        </div>
      `;
    }

    return `
      <div class="hot-deals-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 1.85rem; margin-top: 1.75rem;">
        ${dealsList.map((deal) => {
          const localizedDealPrice = getToolLocalizedPrice(deal, currentCountry);
          const { amount: dealAmount, periodHtml } = parsePriceAndDuration(localizedDealPrice, '/mo');
          const regularPrice = deal.regularPrice || 'PKR 4,999 /mo';
          const buyQty = deal.buyQuantity || 1;
          const freeQty = deal.freeQuantity || 1;
          const offerLabel = deal.offerLabel || 'BUY 1 GET 1 FREE';

          // Construct customized WhatsApp inquiry message
          const cleanWhatsappNumber = (deal.whatsappUrl || '').includes('wa.me') || (deal.whatsappUrl || '').includes('whatsapp.com') 
            ? deal.whatsappUrl 
            : 'https://wa.me/923001234567';

          const orderMessage = encodeURIComponent(
            `🔥 *HOT DEAL ORDER INQUIRY*\n` +
            `• Deal: ${deal.name}\n` +
            `• Offer: ${offerLabel} (Buy: ${buyQty} | Get Free: ${freeQty})\n` +
            `• Validity / Duration: ${deal.duration || '1 Month'}\n` +
            `• Price: ${localizedDealPrice}\n` +
            `• Region: ${currentCountry}\n\n` +
            `Please share payment details and activate my deal access.`
          );

          let finalWhatsappLink = cleanWhatsappNumber;
          if (cleanWhatsappNumber.includes('chat.whatsapp.com') || cleanWhatsappNumber.includes('/channel/')) {
            finalWhatsappLink = cleanWhatsappNumber;
          } else if (cleanWhatsappNumber.includes('?')) {
            finalWhatsappLink = `${cleanWhatsappNumber}&text=${orderMessage}`;
          } else {
            finalWhatsappLink = `${cleanWhatsappNumber}?text=${orderMessage}`;
          }

          return `
            <div class="hot-deal-card" data-deal-id="${deal.id}" style="position: relative; background: linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%); border: 1.5px solid rgba(249, 115, 22, 0.35); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(249, 115, 22, 0.25); display: flex; flex-direction: column; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;">
              
              <!-- Fiery Glow Accent Overlay -->
              <div style="position: absolute; top: -40px; right: -40px; width: 140px; height: 140px; background: radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%); pointer-events: none; filter: blur(20px);"></div>
              
              <!-- Top Banner & Image -->
              <div style="position: relative; height: 180px; overflow: hidden; background: #0b1120;">
                <img 
                  src="${deal.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'}" 
                  alt="${deal.name}" 
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
                  loading="lazy"
                  onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';"
                />
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%);"></div>
                
                <!-- Main Offer & Validity Badges -->
                <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  <span class="badge" style="background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; font-weight: 800; font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 999px; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.5); letter-spacing: 0.02em;">
                    🔥 ${offerLabel}
                  </span>
                  <span class="badge" style="background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.5); font-weight: 800; font-size: 0.75rem; padding: 0.3rem 0.7rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>⏳</span> <span>${deal.duration || '1 Month'}</span>
                  </span>
                </div>

                <!-- Stock Scarcity Tag -->
                <div style="position: absolute; bottom: 10px; right: 12px;">
                  <span style="font-size: 0.72rem; color: #fde047; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); padding: 0.25rem 0.6rem; border-radius: 6px; border: 1px solid rgba(253, 224, 71, 0.3); font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>⚡</span> <span>${deal.stockLeft || 'Limited slots left'}</span>
                  </span>
                </div>
              </div>

              <!-- Deal Body -->
              <div style="padding: 1.35rem 1.35rem 1.25rem 1.35rem; display: flex; flex-direction: column; flex: 1;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.75rem; color: #fb923c; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                    ${deal.category || 'Special Promotion'}
                  </span>
                  <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: #fbbf24; font-weight: 700;">
                    <span>★</span>
                    <span>${deal.rating ? deal.rating.toFixed(1) : '4.9'}</span>
                  </div>
                </div>

                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-pure); margin: 0 0 0.5rem 0; line-height: 1.35;">
                  ${deal.name}
                </h3>

                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${deal.shortDescription || deal.description || 'Exclusive bundle offer with bonus free tools and instant WhatsApp activation.'}
                </p>

                <!-- BUY X GET Y FREE QUANTITY BREAKDOWN BOX -->
                <div style="background: rgba(15, 23, 42, 0.8); border: 1px dashed rgba(249, 115, 22, 0.4); border-radius: 12px; padding: 0.85rem; margin-bottom: 1.15rem;">
                  <div style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.5rem; text-align: center;">
                    <div style="background: rgba(30, 41, 59, 0.6); padding: 0.5rem 0.25rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.06);">
                      <div style="font-size: 0.65rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">YOU BUY</div>
                      <div style="font-size: 0.95rem; font-weight: 800; color: #38bdf8; margin-top: 0.15rem;">
                        ${buyQty} Qty
                      </div>
                    </div>

                    <div style="font-size: 1.1rem; font-weight: 800; color: #f97316;">+</div>

                    <div style="background: rgba(239, 68, 68, 0.12); padding: 0.5rem 0.25rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.35);">
                      <div style="font-size: 0.65rem; color: #fca5a5; font-weight: 800; text-transform: uppercase;">YOU GET FREE</div>
                      <div style="font-size: 0.95rem; font-weight: 800; color: #ef4444; margin-top: 0.15rem;">
                        ${freeQty} FREE 🎁
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Price Row -->
                <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1.1rem;">
                  <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block; text-transform: uppercase; font-weight: 600;">Promo Price:</span>
                    <div style="display: flex; align-items: baseline; gap: 0.4rem;">
                      <span style="font-size: 1.35rem; font-weight: 900; color: #34d399; letter-spacing: -0.02em;">
                        ${dealAmount}
                      </span>
                      <span style="font-size: 0.78rem; color: var(--text-muted);">${periodHtml || ''}</span>
                    </div>
                  </div>

                  <div style="text-align: right;">
                    <span style="font-size: 0.68rem; color: var(--text-muted); display: block; text-transform: uppercase;">Regular Value:</span>
                    <span style="font-size: 0.88rem; color: #94a3b8; text-decoration: line-through; font-weight: 600;">
                      ${regularPrice}
                    </span>
                  </div>
                </div>

                <!-- Action Button: Claim Deal on WhatsApp -->
                <a 
                  href="${finalWhatsappLink}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-primary btn-claim-deal"
                  style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.8rem 1.25rem; font-size: 0.92rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #10b981, #059669); border: none; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35); text-decoration: none; color: #ffffff; transition: transform 0.2s ease, box-shadow 0.2s ease;"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
                  </svg>
                  <span>Claim Deal on WhatsApp</span>
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function filterDeals() {
    let list = [...deals];
    if (activeCategory && activeCategory !== 'All') {
      list = list.filter((d) => (d.category || '').toLowerCase() === activeCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((d) => 
        (d.name || '').toLowerCase().includes(q) ||
        (d.shortDescription || '').toLowerCase().includes(q) ||
        (d.offerLabel || '').toLowerCase().includes(q) ||
        (d.category || '').toLowerCase().includes(q)
      );
    }
    return list;
  }

  root.innerHTML = `
    ${renderNavbar('/deals')}

    <main class="main-content container hot-deals-page fade-in" style="padding-top: 2rem; padding-bottom: 5rem;">
      <!-- Hero Header -->
      <header class="marketplace-header" style="text-align: center; max-width: 800px; margin: 0 auto 2.5rem auto;">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.2)); border: 1px solid rgba(249, 115, 22, 0.4); padding: 0.35rem 1rem; border-radius: 999px; margin-bottom: 1rem;">
          <span style="font-size: 1.1rem; filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8));">🔥</span>
          <span style="font-size: 0.82rem; font-weight: 800; color: #fb923c; text-transform: uppercase; letter-spacing: 0.05em;">
            Limited-Time Promotional Drops & BOGO
          </span>
        </div>
        
        <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; letter-spacing: -0.02em; color: var(--text-pure); margin-bottom: 0.85rem; line-height: 1.2;">
          Exclusive <span style="background: linear-gradient(135deg, #f97316 0%, #ef4444 50%, #f43f5e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Hot Deals</span> & Combos
        </h1>
        
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
          Unlock Buy 1 Get 1 Free subscriptions, combo packs, and special multi-tool discounts. Each deal is activated instantly with 24/7 dedicated replacement warranty.
        </p>
      </header>

      <!-- Search & Filters -->
      <section class="marketplace-controls" style="margin-bottom: 2rem;">
        <div class="controls-top-row">
          <div class="search-input-wrap" style="flex: 1; max-width: 480px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              id="deals-search-input" 
              placeholder="Search deals by tool name or offer..." 
              value="${searchQuery}"
              class="search-input-field"
            />
          </div>

          <div style="font-size: 0.88rem; color: var(--text-muted);">
            Active Offers: <strong id="deals-counter" style="color: #fb923c;">${deals.length}</strong>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="filter-chips-row" id="deals-category-chips" style="margin-top: 1rem;">
          ${dealCategories.map((cat) => `
            <button class="filter-chip ${activeCategory === cat ? 'active' : ''}" data-category="${cat}">
              ${cat === 'All' ? '🔥 All Offers' : cat}
            </button>
          `).join('')}
        </div>
      </section>

      <!-- Deals Grid Container -->
      <div id="hot-deals-container">
        ${renderDealsGrid(deals)}
      </div>
    </main>

    ${renderFooter()}
  `;

  // Attach Navbar interactions
  attachNavbarEvents();

  // Search input listener
  const searchInput = root.querySelector('#deals-search-input');
  const container = root.querySelector('#hot-deals-container');
  const counter = root.querySelector('#deals-counter');

  function updateView() {
    const filtered = filterDeals();
    if (container) container.innerHTML = renderDealsGrid(filtered);
    if (counter) counter.textContent = filtered.length;
    bindResetBtn();
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      updateView();
    });
  }

  // Category chip listeners
  const chipContainer = root.querySelector('#deals-category-chips');
  if (chipContainer) {
    chipContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      chipContainer.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'All';
      updateView();
    });
  }

  function bindResetBtn() {
    const resetBtn = root.querySelector('#btn-reset-deals-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        activeCategory = 'All';
        if (searchInput) searchInput.value = '';
        if (chipContainer) {
          chipContainer.querySelectorAll('.filter-chip').forEach((c) => {
            c.classList.toggle('active', c.dataset.category === 'All');
          });
        }
        updateView();
      });
    }
  }

  bindResetBtn();

  // Supabase Real-time live update subscription
  if (window._publicDealsRealtimeUnsub) {
    try { window._publicDealsRealtimeUnsub(); } catch (e) {}
  }
  window._publicDealsRealtimeUnsub = toolsApi.subscribeToHotDeals(async () => {
    try {
      deals = await toolsApi.getHotDeals();
      updateView();
    } catch (e) {}
  });
}
