// AI Tools Store - Responsive Header & Navbar Component with Reactive Auth & Global Language Selector
import { authService } from '../lib/auth.js';
import { openSearchModal } from './SearchModal.js';
import { openAuthModal } from './AuthModal.js';
import { openAccountModal } from './AccountModal.js';
import { showToast, getCountryFlag } from '../utils/helpers.js';
import { renderLanguageSelectorButton, initLanguageSelector } from './LanguageSelector.js';
import { t } from '../i18n/i18n.js';
import { defaultWhatsappUrl } from '../lib/supabase.js';

/**
 * Helper to render the live country selector
 */
export function renderCountrySelector(context = 'nav') {
  const userCountry = authService.getUserCountry() || 'Pakistan';
  const flag = getCountryFlag(userCountry);
  const shortLabel = userCountry === 'Pakistan' ? 'PKR' : userCountry === 'India' ? 'INR' : userCountry === 'United Arab Emirates' ? 'AED' : userCountry === 'Saudi Arabia' ? 'SAR' : 'USD';

  return `
    <div class="nav-country-wrapper" id="${context}-country-wrapper" style="position: relative; display: inline-block;">
      <button type="button" class="nav-country-btn" id="${context}-country-btn" title="Pricing Country: ${userCountry} (${shortLabel})">
        <span>${flag}</span>
        <span style="font-weight: 700; font-size: 0.75rem;">${shortLabel}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <div class="nav-country-dropdown" id="${context}-country-dropdown" style="display: none;">
        <div style="font-size: 0.68rem; color: var(--text-muted); padding: 0.35rem 0.65rem; text-transform: uppercase; font-weight: 700; border-bottom: 1px solid var(--border-glass); margin-bottom: 0.25rem;">
          View Pricing For:
        </div>
        <button type="button" class="nav-country-option ${userCountry === 'Pakistan' ? 'active' : ''}" data-country="Pakistan">
          <span>🇵🇰</span>
          <span>Pakistan (PKR)</span>
        </button>
        <button type="button" class="nav-country-option ${userCountry === 'India' ? 'active' : ''}" data-country="India">
          <span>🇮🇳</span>
          <span>India (INR)</span>
        </button>
        <button type="button" class="nav-country-option ${userCountry === 'United Arab Emirates' ? 'active' : ''}" data-country="United Arab Emirates">
          <span>🇦🇪</span>
          <span>UAE (AED)</span>
        </button>
        <button type="button" class="nav-country-option ${userCountry === 'Saudi Arabia' ? 'active' : ''}" data-country="Saudi Arabia">
          <span>🇸🇦</span>
          <span>Saudi Arabia (SAR)</span>
        </button>
        <button type="button" class="nav-country-option ${userCountry === 'United States' ? 'active' : ''}" data-country="United States">
          <span>🇺🇸</span>
          <span>United States (USD)</span>
        </button>
        <button type="button" class="nav-country-option ${userCountry === 'United Kingdom' ? 'active' : ''}" data-country="United Kingdom">
          <span>🇬🇧</span>
          <span>United Kingdom (GBP)</span>
        </button>
        <button type="button" class="nav-country-option ${userCountry === 'Global' || userCountry === 'Other' ? 'active' : ''}" data-country="Global">
          <span>🌐</span>
          <span>Global / Others (USD)</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Helper to render the desktop / mobile authentication slot
 */
export function renderAuthSlot(user, profile, isMobile = false) {
  if (user) {
    const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'VIP Member';
    const initial = displayName.charAt(0).toUpperCase();
    const isAdmin = authService.isAdmin(user, profile);

    if (isMobile) {
      return `
        <div class="mobile-auth-user-box" style="display: flex; flex-direction: column; gap: 0.85rem; padding: 0.5rem 0;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="nav-profile-avatar" style="width: 42px; height: 42px; font-size: 1.05rem; ${isAdmin ? 'border-color: var(--accent-cyan); box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);' : ''}">
              ${initial}
              <span class="avatar-status-dot" style="${isAdmin ? 'background: #38bdf8;' : ''}"></span>
            </div>
            <div style="display: flex; flex-direction: column; overflow: hidden;">
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <span style="font-weight: 700; color: var(--text-pure); font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${displayName}</span>
                ${isAdmin ? '<span class="badge badge-popular" style="font-size: 0.65rem; padding: 0.1rem 0.4rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">Admin</span>' : ''}
              </div>
              <span style="font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.email || ''}</span>
            </div>
          </div>

          ${isAdmin ? `
            <a href="#/admin" class="mobile-auth-admin" style="display: flex; align-items: center; justify-content: center; gap: 0.65rem; padding: 0.75rem; border-radius: 12px; background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.2)); border: 1px solid rgba(56, 189, 248, 0.4); color: var(--accent-cyan); font-weight: 700; font-size: 0.9rem; text-decoration: none; box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>${t('nav.adminPanel') || 'Admin Panel'}</span>
              <span style="background: rgba(56, 189, 248, 0.25); color: #38bdf8; font-size: 0.68rem; padding: 0.1rem 0.45rem; border-radius: 999px; font-weight: 800;">ADMIN</span>
            </a>
          ` : ''}

          <div style="display: flex; gap: 0.6rem;">
            <button type="button" class="btn-nav-account mobile-auth-account" style="flex: 1; justify-content: center; padding: 0.65rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>${t('nav.account')}</span>
            </button>
            <button type="button" class="btn-nav-logout mobile-auth-logout" style="flex: 1; justify-content: center; padding: 0.65rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>${t('nav.logout')}</span>
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="nav-profile-dropdown-wrapper" id="nav-profile-dropdown-wrapper">
        <button type="button" class="btn-nav-profile-trigger ${isAdmin ? 'admin-active' : ''}" id="nav-profile-btn" aria-haspopup="true" aria-expanded="false" title="${displayName} ${isAdmin ? '(Administrator)' : ''}">
          <div class="nav-profile-avatar" style="${isAdmin ? 'border-color: var(--accent-cyan); box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);' : ''}">
            ${initial}
            <span class="avatar-status-dot" style="${isAdmin ? 'background: #38bdf8;' : ''}"></span>
          </div>
          <span class="nav-profile-name">${displayName.split(' ')[0]}</span>
          ${isAdmin ? '<span class="badge badge-popular" style="font-size: 0.65rem; padding: 0.08rem 0.38rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">Admin</span>' : ''}
          <svg class="nav-profile-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div class="nav-profile-dropdown-menu" id="nav-profile-menu" style="display: none;">
          <div class="nav-profile-menu-header">
            <div class="nav-profile-menu-avatar" style="${isAdmin ? 'background: linear-gradient(135deg, #0ea5e9, #6366f1);' : ''}">${initial}</div>
            <div class="nav-profile-menu-meta">
              <span class="nav-profile-menu-fullname">${displayName}</span>
              <span class="nav-profile-menu-email">${user.email || ''}</span>
              <span class="nav-profile-badge" style="${isAdmin ? 'background: rgba(56, 189, 248, 0.18); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);' : ''}">
                ${isAdmin ? `
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                  </svg>
                  ${t('nav.administrator') || 'Administrator'}
                ` : `
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z" />
                  </svg>
                  VIP Member
                `}
              </span>
            </div>
          </div>
          <div class="nav-profile-divider"></div>
          <div class="nav-profile-menu-list">
            ${isAdmin ? `
              <a href="#/admin" class="nav-profile-menu-item admin" id="nav-profile-item-admin" style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-weight: 700;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                <span>${t('nav.adminPanel') || 'Admin Panel'}</span>
                <span class="badge badge-popular" style="margin-left: auto; font-size: 0.65rem; padding: 0.15rem 0.5rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">ADMIN</span>
              </a>
            ` : ''}
            <button type="button" class="nav-profile-menu-item" id="nav-profile-item-account">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>${t('nav.account')}</span>
            </button>
            <button type="button" class="nav-profile-menu-item logout" id="nav-profile-item-logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>${t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Logged out: ONLY ONE Sign In button!
  if (isMobile) {
    return `
      <div style="display: flex; flex-direction: column;">
        <button type="button" class="btn-nav-signin mobile-auth-signin" id="mobile-nav-signin-btn" data-action="signin" title="${t('nav.signIn')}" style="width: 100%; justify-content: center; padding: 0.75rem 1.25rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          <span>${t('nav.signIn')}</span>
        </button>
      </div>
    `;
  }

  return `
    <button type="button" class="btn-nav-signin" id="nav-signin-btn" data-action="signin" title="${t('nav.signIn')}">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      <span>${t('nav.signIn')}</span>
    </button>
  `;
}

export function toggleProfileDropdown(forceClose = false) {
  const menu = document.getElementById('nav-profile-menu');
  const trigger = document.getElementById('nav-profile-btn');
  if (!menu) return;

  if (forceClose || menu.style.display === 'block') {
    menu.style.display = 'none';
    if (trigger) {
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  } else {
    menu.style.display = 'block';
    if (trigger) {
      trigger.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  }
}

export function renderNavbar(activePath = '/') {
  const isHome = activePath === '/' || activePath === '';
  const isTools = activePath === '/tools';
  const isCategories = activePath === '/categories';
  const isAbout = activePath === '/about';
  const isContact = activePath === '/contact';
  const isAdmin = activePath === '/admin';

  const defaultWhatsApp = defaultWhatsappUrl;
  const user = authService.currentUser;
  const profile = authService.currentProfile;

  return `
    <header class="navbar">
      <div class="container navbar-container">
        <!-- Brand Logo -->
        <a href="#/" class="nav-brand">
          <div class="nav-brand-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z" />
            </svg>
          </div>
          <span>${t('nav.brand')}</span>
        </a>

        <!-- Desktop Navigation Links (Public: Admin removed) -->
        <nav class="nav-menu">
          <a href="#/" class="nav-link ${isHome ? 'active' : ''}">${t('nav.home')}</a>
          <a href="#/tools" class="nav-link ${isTools ? 'active' : ''}">${t('nav.allTools')}</a>
          <a href="#/categories" class="nav-link ${isCategories ? 'active' : ''}">${t('nav.categories')}</a>
          <a href="#/about" class="nav-link ${isAbout ? 'active' : ''}">${t('nav.about')}</a>
          <a href="#/contact" class="nav-link ${isContact ? 'active' : ''}">${t('nav.contact')}</a>
        </nav>

        <!-- Right Nav Actions -->
        <div class="nav-actions">
          <!-- Search, Country Selector & Language Selector: [ 🔍 ] [ 🇵🇰 PKR ▾ ] [ 🌐 EN ▾ ] -->
          <div class="nav-search-lang-group" id="nav-search-lang-group">
            <button id="nav-search-trigger" class="nav-search-btn" title="${t('nav.searchTitle')}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="kbd-shortcut">${t('nav.searchKbd')}</span>
            </button>
            ${renderCountrySelector('nav')}
            ${renderLanguageSelectorButton('nav')}
          </div>

          <!-- Dynamic Auth Slot (Single Sign In when logged out, Profile circle + dropdown when logged in) -->
          <div id="nav-auth-slot" class="nav-auth-slot">
            ${renderAuthSlot(user, profile, false)}
          </div>

          <!-- WhatsApp Community Button -->
          <a href="${defaultWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
            </svg>
            <span>${t('nav.joinWhatsApp')}</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button id="mobile-menu-toggle" class="mobile-toggle-btn" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer (Public: Admin removed) -->
      <div id="mobile-nav-drawer" class="mobile-nav-drawer" style="display: none;">
        <div class="mobile-nav-links">
          <a href="#/" class="mobile-nav-link ${isHome ? 'active' : ''}">${t('nav.home')}</a>
          <a href="#/tools" class="mobile-nav-link ${isTools ? 'active' : ''}">${t('nav.allTools')}</a>
          <a href="#/categories" class="mobile-nav-link ${isCategories ? 'active' : ''}">${t('nav.categories')}</a>
          <a href="#/about" class="mobile-nav-link ${isAbout ? 'active' : ''}">${t('nav.about')}</a>
          <a href="#/contact" class="mobile-nav-link ${isContact ? 'active' : ''}">${t('nav.contact')}</a>

          <div class="mobile-country-wrap" style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-secondary);">Country Pricing:</span>
            ${renderCountrySelector('mobile-nav')}
          </div>

          <div class="mobile-lang-wrap" style="margin-top: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-secondary);">${t('nav.selectLanguage')}:</span>
            ${renderLanguageSelectorButton('mobile-nav')}
          </div>

          <div id="mobile-nav-auth-slot" class="mobile-nav-auth-slot" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-glass);">
            ${renderAuthSlot(user, profile, true)}
          </div>
        </div>
      </div>
    </header>
  `;
}

function bindAuthSlotEvents(container) {
  if (!container) return;

  // Sign In buttons
  container.querySelectorAll('#nav-signin-btn, #mobile-nav-signin-btn, .mobile-auth-signin').forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      openAuthModal({ defaultTab: 'signin' });
    };
  });

  // Profile button trigger for dropdown
  const profileBtn = container.querySelector('#nav-profile-btn');
  if (profileBtn) {
    profileBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleProfileDropdown();
    };
  }

  // Admin Panel button inside dropdown
  const adminItem = container.querySelector('#nav-profile-item-admin');
  if (adminItem) {
    adminItem.onclick = () => {
      toggleProfileDropdown(true);
    };
  }

  // Mobile Admin button
  container.querySelectorAll('.mobile-auth-admin').forEach((btn) => {
    btn.onclick = () => {
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer) drawer.style.display = 'none';
    };
  });

  // Account details modal button inside dropdown
  const accountItem = container.querySelector('#nav-profile-item-account');
  if (accountItem) {
    accountItem.onclick = (e) => {
      e.preventDefault();
      toggleProfileDropdown(true);
      openAccountModal();
    };
  }

  // Logout button inside dropdown
  const logoutItem = container.querySelector('#nav-profile-item-logout');
  if (logoutItem) {
    logoutItem.onclick = async (e) => {
      e.preventDefault();
      toggleProfileDropdown(true);
      try {
        await authService.signOut();
        showToast('Signed out successfully.', 'info');
      } catch (err) {
        console.error('Error signing out:', err);
      }
    };
  }

  // Mobile Account details button
  container.querySelectorAll('.mobile-auth-account').forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      openAccountModal();
    };
  });

  // Mobile Logout button
  container.querySelectorAll('.mobile-auth-logout').forEach((btn) => {
    btn.onclick = async (e) => {
      e.preventDefault();
      try {
        await authService.signOut();
        showToast('Signed out successfully.', 'info');
      } catch (err) {
        console.error('Error signing out:', err);
      }
    };
  });
}

// One-time global event delegation for all auth triggers & dropdown outside click
if (typeof window !== 'undefined' && !window.__authEventsDelegated) {
  window.__authEventsDelegated = true;
  document.addEventListener('click', (e) => {
    // 0. Close country dropdowns when clicking outside
    if (!e.target.closest('.nav-country-wrapper')) {
      document.querySelectorAll('.nav-country-dropdown').forEach((d) => (d.style.display = 'none'));
    }

    // 1. Close profile dropdown when clicking outside
    const dropdownWrapper = document.getElementById('nav-profile-dropdown-wrapper');
    if (dropdownWrapper && !dropdownWrapper.contains(e.target)) {
      toggleProfileDropdown(true);
    }

    // 2. Sign In Triggers
    const signinTrigger = e.target.closest('#nav-signin-btn, #mobile-nav-signin-btn, .btn-nav-signin, [data-action="signin"]');
    if (signinTrigger) {
      e.preventDefault();
      openAuthModal({ defaultTab: 'signin' });
      return;
    }

    // 3. User Account Trigger
    const accountTrigger = e.target.closest('#nav-account-btn, .mobile-auth-account, [data-action="account"]');
    if (accountTrigger) {
      e.preventDefault();
      openAccountModal();
      return;
    }

    // 4. Logout Trigger
    const logoutTrigger = e.target.closest('#nav-logout-btn, .mobile-auth-logout, [data-action="logout"]');
    if (logoutTrigger) {
      e.preventDefault();
      authService.signOut().then(() => {
        showToast('Signed out successfully.', 'info');
      });
      return;
    }

    // 5. Admin link Trigger
    const adminTrigger = e.target.closest('#nav-profile-item-admin, .mobile-auth-admin');
    if (adminTrigger) {
      toggleProfileDropdown(true);
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer) drawer.style.display = 'none';
    }
  });

  // Close profile dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleProfileDropdown(true);
    }
  });
}

export function attachNavbarEvents() {
  // Initialize language selector buttons and dropdown
  initLanguageSelector(document);

  // Initialize Country Selector buttons and options
  ['nav', 'mobile-nav'].forEach((ctx) => {
    const btn = document.getElementById(`${ctx}-country-btn`);
    const menu = document.getElementById(`${ctx}-country-dropdown`);
    if (btn && menu) {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = menu.style.display === 'flex';
        document.querySelectorAll('.nav-country-dropdown').forEach((d) => (d.style.display = 'none'));
        menu.style.display = isOpen ? 'none' : 'flex';
      };

      menu.querySelectorAll('.nav-country-option').forEach((opt) => {
        opt.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const selected = opt.dataset.country;
          menu.style.display = 'none';
          authService.setUserCountry(selected);
          showToast(`Store pricing switched to ${selected}`, 'info');
        };
      });
    }
  });

  const searchBtn = document.getElementById('nav-search-trigger');
  if (searchBtn) {
    searchBtn.onclick = () => openSearchModal();
  }

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (mobileToggle && drawer) {
    mobileToggle.onclick = () => {
      const isVisible = drawer.style.display === 'block';
      drawer.style.display = isVisible ? 'none' : 'block';
    };
  }

  // Bind initial auth slot events
  const desktopSlot = document.getElementById('nav-auth-slot');
  const mobileSlot = document.getElementById('mobile-nav-auth-slot');
  bindAuthSlotEvents(desktopSlot);
  bindAuthSlotEvents(mobileSlot);

  // Subscribe to real-time auth changes
  authService.subscribe(({ user, profile }) => {
    const dSlot = document.getElementById('nav-auth-slot');
    const mSlot = document.getElementById('mobile-nav-auth-slot');
    if (dSlot) {
      dSlot.innerHTML = renderAuthSlot(user, profile, false);
      bindAuthSlotEvents(dSlot);
    }
    if (mSlot) {
      mSlot.innerHTML = renderAuthSlot(user, profile, true);
      bindAuthSlotEvents(mSlot);
    }
  });

  // Global keyboard shortcut for search (⌘K or Ctrl+K)
  window.onkeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  };
}
