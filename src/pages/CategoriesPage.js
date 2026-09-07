// AI Tools Store - Categories Directory Page
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';

export async function renderCategoriesPage(root) {
  document.title = 'AI Categories Directory | AI Tools Store';

  const categories = await toolsApi.getCategories();

  root.innerHTML = `
    ${renderNavbar('/categories')}

    <main class="main-content container categories-directory-page fade-in">
      <header class="marketplace-header">
        <span class="badge badge-popular" style="margin-bottom: 0.6rem;">Taxonomy</span>
        <h1>Browse by <span class="text-gradient-ai">AI Category</span></h1>
        <p>Explore software tailored to your specific creative, engineering, and business workflows.</p>
      </header>

      <div class="categories-grid-cards">
        ${categories.map((cat) => `
          <a href="#/tools?category=${encodeURIComponent(cat.name)}" class="category-card-large ${cat.image ? 'has-category-image' : ''}">
            ${cat.image ? `
              <div class="category-card-banner-wrap">
                <img src="${cat.image}" alt="${cat.name}" class="category-card-banner-ambient" aria-hidden="true" onerror="this.style.display='none';" />
                <img src="${cat.image}" alt="${cat.name} banner" class="category-card-banner-img" loading="lazy" onerror="this.style.opacity='0.3';" />
                <div class="category-card-banner-overlay"></div>
                <div class="category-banner-icon-badge" style="background: ${cat.color || '#6366f1'};">
                  ${cat.icon || '✨'}
                </div>
                <span class="cat-card-count cat-card-count-floating">${cat.count} ${cat.count === 1 ? 'Tool' : 'Tools'}</span>
              </div>
            ` : `
              <div class="cat-card-header">
                <div class="cat-card-icon" style="background: ${cat.color}20; color: ${cat.color}; border: 1px solid ${cat.color}40;">
                  <span>${cat.icon}</span>
                </div>
                <span class="cat-card-count">${cat.count} ${cat.count === 1 ? 'Tool' : 'Tools'}</span>
              </div>
            `}

            <div class="cat-card-body">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <h3>${cat.name}</h3>
                ${!cat.image ? '' : `<span style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 600;">Explore &rarr;</span>`}
              </div>
              <p style="margin-top: 0.4rem;">${cat.description || cat.desc || `Explore premium tools in ${cat.name}.`}</p>
            </div>

            <div class="cat-explore-link">
              <span>Explore ${cat.name}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>
        `).join('')}
      </div>
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();
}
