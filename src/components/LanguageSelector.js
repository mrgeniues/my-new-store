// AI Tools Store - Global Language Selector Component
// Compact glassmorphic trigger [ 🌐 EN ▾ ] with searchable dropdown containing 47+ world languages

import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../i18n/languages.js';
import { getCurrentLanguage, setLanguage, isRTL, onLanguageChange, t } from '../i18n/i18n.js';

let isOpen = false;
let searchQuery = '';

/**
 * Render the compact trigger button HTML
 */
export function renderLanguageSelectorButton(idPrefix = 'nav') {
  const currentCode = getCurrentLanguage();
  const lang = getLanguageByCode(currentCode) || { flag: '🌐', code: currentCode.toUpperCase(), nativeName: 'English' };

  return `
    <div class="lang-selector-wrapper" id="${idPrefix}-lang-selector-wrapper">
      <button 
        type="button" 
        class="lang-selector-btn" 
        id="${idPrefix}-lang-selector-btn"
        aria-haspopup="dialog"
        aria-expanded="false"
        title="${t('nav.selectLanguage')}: ${lang.nativeName} (${lang.name})"
      >
        <span class="lang-btn-flag">${lang.flag}</span>
        <span class="lang-btn-code">${lang.code.toUpperCase()}</span>
        <svg class="lang-btn-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  `;
}

/**
 * Mount the language modal/dropdown into document body if not already present
 */
function ensureDropdownContainer() {
  let modal = document.getElementById('lang-selector-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'lang-selector-modal';
  modal.className = 'lang-modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.style.display = 'none';

  modal.innerHTML = `
    <div class="lang-modal-backdrop" id="lang-modal-backdrop"></div>
    <div class="lang-modal-card glass glow-sm">
      <div class="lang-modal-header">
        <div class="lang-modal-title-wrap">
          <div class="lang-globe-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <div>
            <h3 class="lang-modal-title" id="lang-modal-heading">${t('nav.selectLanguage')}</h3>
            <p class="lang-modal-sub">Choose your preferred language / اپنی زبان منتخب کریں</p>
          </div>
        </div>
        <button type="button" class="lang-modal-close" id="lang-modal-close-btn" aria-label="Close Language Selector">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="lang-search-box">
        <svg class="lang-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="lang-filter-input" 
          class="lang-filter-input" 
          placeholder="Search 47+ languages (e.g. Urdu, Arabic, Spanish, हिन्दी)..."
          autocomplete="off"
        />
        <button type="button" id="lang-filter-clear" class="lang-filter-clear" style="display:none;" aria-label="Clear search">×</button>
      </div>

      <div class="lang-list-container" id="lang-list-container">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Bind modal events
  const backdrop = modal.querySelector('#lang-modal-backdrop');
  const closeBtn = modal.querySelector('#lang-modal-close-btn');
  const filterInput = modal.querySelector('#lang-filter-input');
  const clearBtn = modal.querySelector('#lang-filter-clear');

  backdrop.addEventListener('click', closeLanguageModal);
  closeBtn.addEventListener('click', closeLanguageModal);

  filterInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    clearBtn.style.display = searchQuery ? 'block' : 'none';
    renderLanguageList();
  });

  clearBtn.addEventListener('click', () => {
    filterInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    renderLanguageList();
    filterInput.focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeLanguageModal();
    }
  });

  return modal;
}

/**
 * Render language list inside the modal container based on search
 */
function renderLanguageList() {
  const container = document.getElementById('lang-list-container');
  if (!container) return;

  const currentCode = getCurrentLanguage();
  const q = searchQuery;

  const filtered = SUPPORTED_LANGUAGES.filter(item => {
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="lang-empty-state">
        <p>No languages found matching "${q}"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(lang => {
    const isSelected = lang.code.toLowerCase() === currentCode.toLowerCase();
    const isRtlLang = lang.dir === 'rtl';

    return `
      <button 
        type="button" 
        class="lang-option-btn ${isSelected ? 'active' : ''}" 
        data-lang-code="${lang.code}"
        title="${lang.nativeName} (${lang.name})"
      >
        <span class="lang-option-flag">${lang.flag}</span>
        <div class="lang-option-info">
          <div class="lang-option-native ${isRtlLang ? 'rtl-text' : ''}">${lang.nativeName}</div>
          <div class="lang-option-english">${lang.name} ${isRtlLang ? '<span class="lang-rtl-tag">RTL</span>' : ''}</div>
        </div>
        <div class="lang-option-meta">
          <span class="lang-option-code">${lang.code.toUpperCase()}</span>
          ${isSelected ? `
            <span class="lang-option-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          ` : ''}
        </div>
      </button>
    `;
  }).join('');

  // Attach selection listeners
  container.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.dataset.langCode;
      await selectLanguage(code);
    });
  });
}

/**
 * Handle selecting a language
 */
async function selectLanguage(code) {
  await setLanguage(code);
  updateAllButtons();
  closeLanguageModal();
}

/**
 * Update all rendered trigger buttons on the page with the current language
 */
export function updateAllButtons() {
  const currentCode = getCurrentLanguage();
  const lang = getLanguageByCode(currentCode) || { flag: '🌐', code: currentCode.toUpperCase(), nativeName: 'English' };

  document.querySelectorAll('.lang-selector-btn').forEach(btn => {
    const flagEl = btn.querySelector('.lang-btn-flag');
    const codeEl = btn.querySelector('.lang-btn-code');
    if (flagEl) flagEl.textContent = lang.flag;
    if (codeEl) codeEl.textContent = lang.code.toUpperCase();
    btn.setAttribute('title', `${t('nav.selectLanguage')}: ${lang.nativeName} (${lang.name})`);
  });
}

/**
 * Open the language selection modal
 */
export function openLanguageModal() {
  const modal = ensureDropdownContainer();
  isOpen = true;
  modal.style.display = 'flex';
  document.body.classList.add('lang-modal-open');

  const filterInput = modal.querySelector('#lang-filter-input');
  if (filterInput) {
    filterInput.value = '';
    searchQuery = '';
    const clearBtn = modal.querySelector('#lang-filter-clear');
    if (clearBtn) clearBtn.style.display = 'none';
  }

  renderLanguageList();

  setTimeout(() => {
    modal.classList.add('is-active');
    if (filterInput) filterInput.focus();
  }, 10);
}

/**
 * Close the language selection modal
 */
export function closeLanguageModal() {
  const modal = document.getElementById('lang-selector-modal');
  if (!modal) return;

  modal.classList.remove('is-active');
  isOpen = false;
  document.body.classList.remove('lang-modal-open');

  setTimeout(() => {
    if (!isOpen) {
      modal.style.display = 'none';
    }
  }, 200);
}

/**
 * Initialize language selector listeners for buttons already in the DOM
 */
export function initLanguageSelector(container = document) {
  ensureDropdownContainer();

  container.querySelectorAll('.lang-selector-btn').forEach(btn => {
    if (btn.dataset.initialized) return;
    btn.dataset.initialized = 'true';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLanguageModal();
    });
  });

  // Keep trigger buttons in sync if language changes elsewhere
  onLanguageChange(() => {
    updateAllButtons();
  });
}

export default {
  renderLanguageSelectorButton,
  initLanguageSelector,
  openLanguageModal,
  closeLanguageModal,
  updateAllButtons
};
