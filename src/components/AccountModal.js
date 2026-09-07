// AI Tools Store - User Account Details Modal
import { authService } from '../lib/auth.js';
import { showToast, getCountryFlag } from '../utils/helpers.js';
import { t } from '../i18n/i18n.js';

let isAccountModalOpen = false;

export function openAccountModal() {
  if (isAccountModalOpen) return;
  isAccountModalOpen = true;

  const modalRoot = document.getElementById('modal-root') || document.body;
  const user = authService.currentUser;
  const profile = authService.currentProfile || {};

  if (!user) return;

  const isAdmin = authService.isAdmin(user, profile);

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop auth-backdrop-fade';
  backdrop.id = 'account-modal-backdrop';

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Active Member';

  backdrop.innerHTML = `
    <div class="auth-modal-card" style="max-width: 480px;" onclick="event.stopPropagation();">
      <!-- Close Button -->
      <button id="account-modal-close" class="auth-close-btn">&times;</button>

      <!-- Profile Header -->
      <div style="text-align: center; margin-bottom: 1.75rem;">
        <div style="width: 68px; height: 68px; border-radius: 50%; background: ${isAdmin ? 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)' : 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)'}; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 0 0 25px ${isAdmin ? 'rgba(56, 189, 248, 0.4)' : 'rgba(99, 102, 241, 0.4)'}; font-size: 1.6rem; font-weight: 800; color: #ffffff; border: 2px solid ${isAdmin ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.2)'};">
          ${(profile.full_name || user.email || 'U').charAt(0).toUpperCase()}
        </div>
        <h3 style="font-size: 1.45rem; color: var(--text-pure); font-weight: 800;">${profile.full_name || 'VIP Member'}</h3>
        <p style="font-size: 0.85rem; color: ${isAdmin ? '#38bdf8' : 'var(--accent-mint)'}; margin-top: 0.25rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
          ${isAdmin ? `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
            </svg>
            Verified Administrator
          ` : t('account.verified')}
        </p>
      </div>

      <!-- Account Details Grid -->
      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.75rem;">
        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${t('account.emailLabel')}</span>
          <span style="font-size: 0.88rem; color: var(--text-pure); font-weight: 600;">${user.email}</span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${t('account.whatsappLabel')}</span>
          <span style="font-size: 0.88rem; color: var(--text-pure); font-weight: 600;">${profile.whatsapp_number || 'Not provided'}</span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Country / Geo Pricing</span>
          <span style="font-size: 0.88rem; color: var(--accent-cyan); font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
            <span>${getCountryFlag(profile.country || authService.getUserCountry())}</span>
            <span>${profile.country || authService.getUserCountry() || 'Pakistan'}</span>
          </span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Account Role</span>
          <span style="font-size: 0.82rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 999px; ${isAdmin ? 'background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);' : 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);'}">
            ${isAdmin ? 'Administrator' : 'VIP Member'}
          </span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${t('account.memberSince')}</span>
          <span style="font-size: 0.88rem; color: var(--text-secondary);">${memberSince}</span>
        </div>
      </div>

      <!-- Admin Direct Link (Exclusively for Admins) -->
      ${isAdmin ? `
        <a href="#/admin" id="account-admin-btn" class="btn btn-primary" style="width: 100%; padding: 0.85rem; justify-content: center; gap: 0.6rem; text-decoration: none; margin-bottom: 0.75rem; background: linear-gradient(135deg, #0284c7, #6366f1); border: none; font-weight: 700; box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Open Admin Management Panel</span>
        </a>
      ` : ''}

      <!-- Logout Action -->
      <button id="account-logout-btn" class="btn btn-secondary" style="width: 100%; padding: 0.8rem; border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
        <span>${t('account.signOutBtn')}</span>
      </button>
    </div>
  `;

  const closeModal = () => {
    isAccountModalOpen = false;
    backdrop.remove();
  };

  backdrop.onclick = closeModal;
  backdrop.querySelector('#account-modal-close').onclick = closeModal;

  const adminBtn = backdrop.querySelector('#account-admin-btn');
  if (adminBtn) {
    adminBtn.onclick = () => {
      closeModal();
    };
  }

  backdrop.querySelector('#account-logout-btn').onclick = async () => {
    await authService.signOut();
    showToast('Signed out successfully.', 'info');
    closeModal();
  };

  modalRoot.appendChild(backdrop);
}
