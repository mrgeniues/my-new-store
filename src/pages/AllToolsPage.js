// AI Tools Store - All Tools Marketplace Catalog Page
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderToolCard, initCardInteractions } from '../components/ToolCard.js';
import { renderFooter } from '../components/Footer.js';
import { t } from '../i18n/i18n.js';
import { authService } from '../lib/auth.js';
import { showToast } from '../utils/helpers.js';

export async function renderAllToolsPage(root, { queryParams }) {
  document.title = `${t('nav.allTools')} | ${t('nav.brand')}`;

  const initialCategory = queryParams?.get('category') || 'All';
  const initialSearch = queryParams?.get('q') || '';

  const tools = await toolsApi.getTools();
  const categories = await toolsApi.getCategories();
  let currentCountry = authService.getUserCountry() || 'Pakistan';

  root.innerHTML = `
    ${renderNavbar('/tools')}

    <main class="main-content container marketplace-page fade-in">
      <header class="marketplace-header">
        <span class="badge badge-new" style="margin-bottom: 0.6rem;">${t('categories.badge')}</span>
        <h1>${t('allTools.headerTitle')}</h1>
        <p>${t('allTools.headerSubtitle')}</p>
      </header>

      ${authService.isAdmin() ? `
        <!-- Currency & Country Quick-Filter Bar (Admin Preview Only) -->
        <div class="catalog-currency-bar">
          <div class="currency-bar-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span style="display: flex; align-items: center; gap: 0.4rem;">
              <span>Pricing Inspector:</span>
              <span class="badge badge-popular" style="font-size: 0.62rem; padding: 0.05rem 0.35rem;">Admin Preview</span>
            </span>
          </div>
          <div class="currency-bar-options" id="catalog-currency-options">
            <button type="button" class="currency-chip ${currentCountry === 'Pakistan' ? 'active' : ''}" data-country="Pakistan" title="View pricing in PKR">
              <span>🇵🇰</span>
              <span>Pakistan (PKR)</span>
            </button>
            <button type="button" class="currency-chip ${currentCountry === 'United States' ? 'active' : ''}" data-country="United States" title="View pricing in USD ($)">
              <span>🇺🇸</span>
              <span>USD ($)</span>
            </button>
            <button type="button" class="currency-chip ${currentCountry === 'India' ? 'active' : ''}" data-country="India" title="View pricing in INR (₹)">
              <span>🇮🇳</span>
              <span>India (INR ₹)</span>
            </button>
            <button type="button" class="currency-chip ${currentCountry === 'United Arab Emirates' ? 'active' : ''}" data-country="United Arab Emirates" title="View pricing in AED">
              <span>🇦🇪</span>
              <span>UAE (AED)</span>
            </button>
            <button type="button" class="currency-chip ${currentCountry === 'Saudi Arabia' ? 'active' : ''}" data-country="Saudi Arabia" title="View pricing in SAR">
              <span>🇸🇦</span>
              <span>Saudi (SAR)</span>
            </button>
            <button type="button" class="currency-chip ${currentCountry === 'Global' || currentCountry === 'Other' ? 'active' : ''}" data-country="Global" title="View Global pricing in USD ($)">
              <span>🌐</span>
              <span>Global ($)</span>
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Controls & Filter Bar -->
      <section class="marketplace-controls">
        <div class="controls-top-row">
          <!-- Search Input -->
          <div class="search-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              id="catalog-search-input" 
              placeholder="${t('allTools.searchPlaceholder')}" 
              value="${initialSearch}"
              class="search-input-field"
            />
          </div>

          <!-- Sort and View Mode -->
          <div class="filter-actions">
            <select id="catalog-sort-select" class="sort-select">
              <option value="popular">${t('allTools.sortPopular')}</option>
              <option value="rating">${t('allTools.sortRating')}</option>
              <option value="price-asc">${t('allTools.sortPriceLow')}</option>
              <option value="price-desc">${t('allTools.sortPriceHigh')}</option>
              <option value="alpha">${t('allTools.sortName')}</option>
            </select>

            <!-- Grid vs List View Toggle -->
            <div class="view-toggle-group">
              <button id="view-grid-btn" class="view-toggle-btn active" title="Grid View">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                </svg>
              </button>
              <button id="view-list-btn" class="view-toggle-btn" title="List View">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="4" cy="6" r="1.5"/>
                  <circle cx="4" cy="12" r="1.5"/>
                  <circle cx="4" cy="18" r="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Category Filter Pills -->
        <div class="filter-chips-row" id="catalog-category-chips">
          <button class="filter-chip ${initialCategory === 'All' ? 'active' : ''}" data-category="All">
            ${t('allTools.allCategories')} (${tools.length})
          </button>
          ${categories.map((cat) => `
            <button class="filter-chip ${initialCategory.toLowerCase() === cat.name.toLowerCase() ? 'active' : ''}" data-category="${cat.name}">
              ${cat.image ? `<img src="${cat.image}" alt="" style="width: 16px; height: 16px; border-radius: 3px; object-fit: cover; vertical-align: middle; margin-right: 4px;" />` : `${cat.icon} `}${cat.name} (${cat.count})
            </button>
          `).join('')}
        </div>
      </section>

      <!-- Active Filter Status & Count -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
        <div id="catalog-results-count">Showing tools...</div>
        <div id="catalog-clear-wrap" style="display: none;">
          <button id="catalog-clear-btn" class="btn-details" style="font-size: 0.78rem; padding: 0.25rem 0.65rem;">
            ${t('allTools.clearFilters')}
          </button>
        </div>
      </div>

      <!-- Tools Grid Container -->
      <div id="catalog-tools-container" class="catalog-grid"></div>

      <!-- Load More / Pagination Action -->
      <div id="catalog-load-more-wrap" style="text-align: center; margin-top: 3rem; display: none;">
        <button id="catalog-load-more-btn" class="btn btn-secondary" style="padding: 0.8rem 2.5rem;">
          ${t('allTools.loadMore')}
        </button>
      </div>
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();

  // State
  let currentCategory = initialCategory;
  let currentSearch = initialSearch;
  let currentSort = 'popular';
  let isListView = false;
  let visibleCount = 12;

  const container = document.getElementById('catalog-tools-container');
  const countLabel = document.getElementById('catalog-results-count');
  const clearWrap = document.getElementById('catalog-clear-wrap');
  const clearBtn = document.getElementById('catalog-clear-btn');
  const loadMoreWrap = document.getElementById('catalog-load-more-wrap');
  const loadMoreBtn = document.getElementById('catalog-load-more-btn');
  const searchInput = document.getElementById('catalog-search-input');
  const sortSelect = document.getElementById('catalog-sort-select');
  const gridBtn = document.getElementById('view-grid-btn');
  const listBtn = document.getElementById('view-list-btn');
  const chipsContainer = document.getElementById('catalog-category-chips');

  function getFilteredAndSortedTools() {
    let list = [...tools];

    // Category filter
    if (currentCategory && currentCategory !== 'All') {
      list = list.filter((t) => (t.category || '').toLowerCase() === currentCategory.toLowerCase());
    }

    // Search filter
    if (currentSearch) {
      const q = currentSearch.toLowerCase().trim();
      list = list.filter((t) => 
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.shortDescription && t.shortDescription.toLowerCase().includes(q)) ||
        (t.features && t.features.some((f) => f.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (currentSort === 'latest') {
      // reverse order
      list.reverse();
    } else if (currentSort === 'price-asc') {
      list.sort((a, b) => a.priceValue - b.priceValue);
    } else if (currentSort === 'price-desc') {
      list.sort((a, b) => b.priceValue - a.priceValue);
    } else if (currentSort === 'alpha') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Popularity (featured first, then rating)
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }

  function updateView() {
    const filtered = getFilteredAndSortedTools();
    const visible = filtered.slice(0, visibleCount);

    countLabel.textContent = t('allTools.resultsCount', { count: `${visible.length} / ${filtered.length}` });
    clearWrap.style.display = (currentSearch || currentCategory !== 'All') ? 'block' : 'none';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3>${t('allTools.noResultsTitle')}</h3>
          <p>${t('allTools.noResultsDesc')}</p>
          <button id="empty-clear-btn" class="btn btn-primary">${t('allTools.resetFilters')}</button>
        </div>
      `;
      document.getElementById('empty-clear-btn')?.addEventListener('click', resetFilters);
      loadMoreWrap.style.display = 'none';
      return;
    }

    container.className = isListView ? 'catalog-grid list-view' : 'catalog-grid tools-grid-3';
    container.innerHTML = visible.map((t) => renderToolCard(t)).join('');

    loadMoreWrap.style.display = visible.length < filtered.length ? 'block' : 'none';

    // Initialize interactive mouse glow and favorite toggles
    initCardInteractions();
  }

  function resetFilters() {
    currentCategory = 'All';
    currentSearch = '';
    searchInput.value = '';
    chipsContainer.querySelectorAll('.filter-chip').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.category === 'All');
    });
    updateView();
  }

  // Event Listeners
  searchInput.oninput = (e) => {
    currentSearch = e.target.value.trim();
    visibleCount = 12;
    updateView();
  };

  sortSelect.onchange = (e) => {
    currentSort = e.target.value;
    updateView();
  };

  chipsContainer.onclick = (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    chipsContainer.querySelectorAll('.filter-chip').forEach((b) => b.classList.remove('active'));
    chip.classList.add('active');
    currentCategory = chip.dataset.category;
    visibleCount = 12;
    updateView();
  };

  clearBtn.onclick = resetFilters;

  gridBtn.onclick = () => {
    isListView = false;
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    updateView();
  };

  listBtn.onclick = () => {
    isListView = true;
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    updateView();
  };

  loadMoreBtn.onclick = () => {
    visibleCount += 8;
    updateView();
  };

  // Currency & Country Switcher click event
  const currencyOptions = document.getElementById('catalog-currency-options');
  if (currencyOptions) {
    currencyOptions.onclick = (e) => {
      const chip = e.target.closest('.currency-chip');
      if (!chip) return;
      const targetCountry = chip.dataset.country;
      currentCountry = targetCountry;
      authService.setUserCountry(targetCountry);
      currencyOptions.querySelectorAll('.currency-chip').forEach((b) => b.classList.remove('active'));
      chip.classList.add('active');
      showToast(`Pricing updated for ${targetCountry}`, 'info');
      updateView();
    };
  }

  // Initial render
  updateView();
}
