// AI Tools Store - Premium Futuristic Auth Modal (Faithful to Reference Image)
import { authService } from '../lib/auth.js';
import { showToast } from '../utils/helpers.js';
import { t } from '../i18n/i18n.js';

let isModalOpen = false;

/**
 * Closes the auth modal cleanly
 */
export function closeAuthModal() {
  isModalOpen = false;
  const backdrop = document.getElementById('auth-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('fade-out');
    setTimeout(() => {
      try {
        backdrop.remove();
      } catch (e) {}
    }, 150);
  }
}

/**
 * Opens the Sign Up / Sign In popup modal.
 * 
 * @param {Object} options
 * @param {string} [options.defaultTab='signup'] - 'signup' or 'signin'
 * @param {Function} [options.onAuthenticated] - Callback executed on successful login/signup
 */
export function openAuthModal(options = {}) {
  // Check if backdrop element is actually in the DOM
  const existingBackdrop = document.getElementById('auth-modal-backdrop');
  if (existingBackdrop) {
    const targetTab = options.defaultTab || 'signin';
    const tabBtn = targetTab === 'signin' 
      ? document.getElementById('tab-btn-signin') 
      : document.getElementById('tab-btn-signup');
    if (tabBtn) {
      tabBtn.click();
    }
    return;
  }

  isModalOpen = true;

  const modalRoot = document.getElementById('modal-root') || document.body;

  let currentTab = options.defaultTab || 'signin';
  const onAuthenticated = options.onAuthenticated || null;

  // Stored form values across tab toggles
  let cachedEmail = '';
  let cachedFullName = '';
  let cachedPhone = '';

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop auth-backdrop-fade';
  backdrop.id = 'auth-modal-backdrop';

  function renderModalContent() {
    const isSignUp = currentTab === 'signup';

    return `
      <div class="auth-modal-card" onclick="event.stopPropagation();">
        <!-- Ambient Radial Glow Backdrop -->
        <div class="auth-card-ambient-glow"></div>

        <!-- Close Button -->
        <button type="button" id="auth-modal-close" class="auth-close-btn" aria-label="Close modal">&times;</button>

        <!-- Top Pill Toggle: [ Sign In ] [ Sign Up ] -->
        <div class="auth-toggle-pill-container" role="tablist">
          <button type="button" id="tab-btn-signin" class="auth-toggle-pill-btn ${!isSignUp ? 'active' : ''}" role="tab" aria-selected="${!isSignUp}">
            ${t('auth.tabSignIn')}
          </button>
          <button type="button" id="tab-btn-signup" class="auth-toggle-pill-btn ${isSignUp ? 'active' : ''}" role="tab" aria-selected="${isSignUp}">
            ${t('auth.tabSignUp')}
          </button>
        </div>

        <!-- Top Header Icon Container -->
        <div class="auth-header-icon-box">
          ${
            isSignUp
              ? `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                   <circle cx="8.5" cy="7" r="4"/>
                   <line x1="20" y1="8" x2="20" y2="14"/>
                   <line x1="23" y1="11" x2="17" y2="11"/>
                 </svg>`
              : `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                   <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                 </svg>`
          }
        </div>

        <!-- Headings & Subtitles -->
        <div class="auth-title-wrap">
          <h2 class="auth-heading">
            ${isSignUp ? t('auth.createAccountHeading') : t('auth.welcomeBackHeading')}
          </h2>
          <p class="auth-subtitle">
            ${isSignUp ? t('auth.createAccountSub') : t('auth.signInSub')}
          </p>
        </div>

        <!-- Error Notification Banner -->
        <div id="auth-error-banner" class="auth-error-box" style="display: none;"></div>

        <!-- Authentication Form -->
        <form id="auth-main-form" autocomplete="on">
          ${
            isSignUp
              ? `
            <!-- Full Name -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-fullname">${t('auth.fullNameLabel')}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input 
                  type="text" 
                  id="auth-fullname" 
                  class="auth-input-field" 
                  placeholder="${t('auth.fullNamePlaceholder')}" 
                  value="${cachedFullName}"
                  required 
                  autocomplete="name"
                />
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-email">${t('auth.emailLabel')}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input 
                  type="email" 
                  id="auth-email" 
                  class="auth-input-field" 
                  placeholder="${t('auth.emailPlaceholder')}" 
                  value="${cachedEmail}"
                  required 
                  autocomplete="email"
                />
              </div>
            </div>

            <!-- WhatsApp Number (with country code selector) -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-whatsapp">${t('auth.whatsappLabel')}</label>
              <div class="auth-phone-group">
            <select id="auth-country-code" class="auth-country-select">
                  <option value="+92" selected>🇵🇰 +92</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+81">🇯🇵 +81</option>
                </select>
                <div class="auth-input-wrapper" style="flex: 1;">
                  <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <input 
                    type="tel" 
                    id="auth-whatsapp" 
                    class="auth-input-field" 
                    placeholder="${t('auth.whatsappPlaceholder')}" 
                    value="${cachedPhone}"
                    required 
                    autocomplete="tel"
                  />
                </div>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-password">${t('auth.passwordLabel')}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-password" 
                  class="auth-input-field" 
                  placeholder="${t('auth.passwordPlaceholder')}" 
                  required 
                  autocomplete="new-password"
                  minlength="6"
                />
                <button type="button" class="password-toggle-btn" data-target="auth-password" title="Show/Hide Password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group" style="margin-bottom: 1.75rem;">
              <label class="auth-field-label" for="auth-confirm-password">${t('auth.confirmPasswordLabel')}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-confirm-password" 
                  class="auth-input-field" 
                  placeholder="${t('auth.confirmPasswordPlaceholder')}" 
                  required 
                  autocomplete="new-password"
                  minlength="6"
                />
                <button type="button" class="password-toggle-btn" data-target="auth-confirm-password" title="Show/Hide Password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="auth-submit-btn" class="auth-primary-action-btn">
              <span>${t('auth.btnCreateAccount')}</span>
            </button>

            <!-- Switch Link -->
            <div class="auth-bottom-switch-row">
              <span>${t('auth.alreadyHaveAccount')}</span>
              <button type="button" id="switch-to-signin-link" class="auth-switch-text-btn">${t('auth.linkSignIn')}</button>
            </div>
            `
              : `
            <!-- Sign In Email or Phone -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-email">${t('auth.emailLabel')}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input 
                  type="text" 
                  id="auth-email" 
                  class="auth-input-field" 
                  placeholder="${t('auth.emailPlaceholder')}" 
                  value="${cachedEmail}"
                  required 
                  autocomplete="username"
                  autofocus
                />
              </div>
            </div>

            <!-- Sign In Password -->
            <div class="form-group" style="margin-bottom: 2rem;">
              <label class="auth-field-label" for="auth-password">${t('auth.passwordLabel')}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-password" 
                  class="auth-input-field" 
                  placeholder="${t('auth.passwordPlaceholder')}" 
                  required 
                  autocomplete="current-password"
                />
                <button type="button" class="password-toggle-btn" data-target="auth-password" title="Show/Hide Password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sign In Submit Button -->
            <button type="submit" id="auth-submit-btn" class="auth-primary-action-btn">
              <span>${t('auth.btnSignIn')}</span>
            </button>

            <!-- Switch Link -->
            <div class="auth-bottom-switch-row">
              <span>${t('auth.dontHaveAccount')}</span>
              <button type="button" id="switch-to-signup-link" class="auth-switch-text-btn">${t('auth.linkSignUp')}</button>
            </div>
            `
          }
        </form>
      </div>
    `;
  }

  function cacheInputValues() {
    const emailEl = backdrop.querySelector('#auth-email');
    if (emailEl) cachedEmail = emailEl.value.trim();
    const nameEl = backdrop.querySelector('#auth-fullname');
    if (nameEl) cachedFullName = nameEl.value.trim();
    const phoneEl = backdrop.querySelector('#auth-whatsapp');
    if (phoneEl) cachedPhone = phoneEl.value.trim();
  }

  function switchTab(newTab) {
    cacheInputValues();
    currentTab = newTab;
    renderAndUpdate();
    // Focus first input field
    const firstInput = backdrop.querySelector(newTab === 'signup' ? '#auth-fullname' : '#auth-email');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 60);
    }
  }

  function attachModalEvents() {
    // Close button
    const closeBtn = backdrop.querySelector('#auth-modal-close');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeAuthModal();
      };
    }

    // Toggle tabs (both top pill switcher and bottom text links)
    backdrop.querySelectorAll('#tab-btn-signup, #switch-to-signup-link').forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        switchTab('signup');
      };
    });

    backdrop.querySelectorAll('#tab-btn-signin, #switch-to-signin-link').forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        switchTab('signin');
      };
    });

    // Password visibility toggle
    backdrop.querySelectorAll('.password-toggle-btn').forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetId = btn.dataset.target;
        const input = backdrop.querySelector(`#${targetId}`);
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.style.color = isPassword ? 'var(--accent-cyan)' : 'var(--text-muted)';
        }
      };
    });

    // Form Submission Handler
    const form = backdrop.querySelector('#auth-main-form');
    const submitBtn = backdrop.querySelector('#auth-submit-btn');
    const errorBanner = backdrop.querySelector('#auth-error-banner');

    function showError(msg) {
      if (errorBanner) {
        errorBanner.textContent = msg;
        errorBanner.style.display = 'block';
      }
    }

    const handleAuthSubmit = async (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (errorBanner) errorBanner.style.display = 'none';

      const emailInput = backdrop.querySelector('#auth-email');
      const passwordInput = backdrop.querySelector('#auth-password');

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (!email) {
        showError(t('auth.requiredError') || 'Please fill in your credentials.');
        return;
      }

      if (!password) {
        showError(t('auth.requiredError') || 'Please enter your password.');
        return;
      }

      if (currentTab === 'signup') {
        const nameInput = backdrop.querySelector('#auth-fullname');
        const countrySelect = backdrop.querySelector('#auth-country-code');
        const phoneInput = backdrop.querySelector('#auth-whatsapp');
        const confirmInput = backdrop.querySelector('#auth-confirm-password');

        const fullName = nameInput ? nameInput.value.trim() : 'VIP Member';
        const countryCode = countrySelect ? countrySelect.value : '+92';
        const rawPhone = phoneInput ? phoneInput.value.trim() : '';
        const confirmPassword = confirmInput ? confirmInput.value : '';

        // Validation
        if (!fullName) {
          showError(t('auth.requiredError') || 'Please enter your full name.');
          return;
        }

        if (password !== confirmPassword) {
          showError(t('auth.passwordsMismatch') || 'Passwords do not match.');
          return;
        }

        if (password.length < 6) {
          showError(t('auth.minLengthError') || 'Password must be at least 6 characters.');
          return;
        }

        const fullPhone = rawPhone ? `${countryCode} ${rawPhone}` : '';

        if (submitBtn) {
          submitBtn.innerHTML = `<span>${t('auth.creatingAccount') || 'Creating account...'}</span>`;
          submitBtn.disabled = true;
        }

        try {
          const authResult = await authService.signUp({
            fullName,
            email,
            whatsappNumber: fullPhone,
            password
          });

          if (authResult?.needsConfirmation) {
            showToast('Account registered in Supabase! You can now sign in.', 'success');
            switchTab('signin');
            const emailInput = backdrop.querySelector('#auth-email');
            if (emailInput) emailInput.value = email;
            showError('Account created in Supabase! Please enter your password to sign in (or verify your email if required).');
            return;
          }

          showToast(`${t('auth.welcomeToast') || 'Welcome'}, ${fullName}!`, 'success');
          closeAuthModal();

          // Auto-continue requested action
          if (typeof onAuthenticated === 'function') {
            onAuthenticated(authResult);
          }
        } catch (err) {
          showError(err.message || 'Failed to create account. Please try again.');
          if (submitBtn) {
            submitBtn.innerHTML = `<span>${t('auth.btnCreateAccount') || '✦ Create Account'}</span>`;
            submitBtn.disabled = false;
          }
        }
      } else {
        // Sign In Flow
        if (submitBtn) {
          submitBtn.innerHTML = `<span>${t('auth.signingIn') || 'Signing in...'}</span>`;
          submitBtn.disabled = true;
        }

        try {
          const authResult = await authService.signIn({ email, password });
          showToast(t('auth.signedInToast') || 'Signed in successfully!', 'success');
          closeAuthModal();

          // Auto-continue requested action
          if (typeof onAuthenticated === 'function') {
            onAuthenticated(authResult);
          }
        } catch (err) {
          showError(err.message || 'Invalid email or password.');
          if (submitBtn) {
            submitBtn.innerHTML = `<span>${t('auth.btnSignIn') || '→ Sign In'}</span>`;
            submitBtn.disabled = false;
          }
        }
      }
    };

    if (form) {
      form.onsubmit = handleAuthSubmit;
    }
  }

  function renderAndUpdate() {
    backdrop.innerHTML = renderModalContent();
    attachModalEvents();
  }

  backdrop.onclick = closeAuthModal;

  // Append backdrop to modalRoot FIRST so all elements exist in the DOM
  modalRoot.appendChild(backdrop);
  renderAndUpdate();
}

