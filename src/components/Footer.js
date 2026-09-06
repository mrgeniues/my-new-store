// AI Tools Store - Modern High-End Footer Component
import { t } from '../i18n/i18n.js';
import { defaultWhatsappUrl } from '../lib/supabase.js';

export function renderFooter() {
  const defaultWhatsApp = defaultWhatsappUrl;

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Info -->
          <div class="footer-brand">
            <a href="#/" class="nav-brand" style="margin-bottom: 0.5rem;">
              <div class="nav-brand-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z" />
                </svg>
              </div>
              <span>${t('nav.brand')}</span>
            </a>
            <p>
              ${t('footer.desc')}
            </p>
            <div style="margin-top: 1.25rem;">
              <a href="${defaultWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav" style="padding: 0.45rem 0.95rem; font-size: 0.8rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
                </svg>
                <span>${t('nav.joinWhatsApp')}</span>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-col">
            <h4>${t('footer.exploreHeading')}</h4>
            <ul class="footer-links">
              <li><a href="#/">${t('nav.home')}</a></li>
              <li><a href="#/tools">${t('nav.allTools')}</a></li>
              <li><a href="#/categories">${t('nav.categories')}</a></li>
              <li><a href="#/about">${t('nav.about')}</a></li>
              <li><a href="#/contact">${t('nav.contact')}</a></li>
              <li><a href="#/admin">${t('nav.admin')}</a></li>
            </ul>
          </div>

          <!-- Categories -->
          <div class="footer-col">
            <h4>${t('nav.categories')}</h4>
            <ul class="footer-links">
              <li><a href="#/tools?category=AI%20Writing">AI Writing</a></li>
              <li><a href="#/tools?category=Image%20Generation">Image Generation</a></li>
              <li><a href="#/tools?category=Video%20Editing">Video Editing</a></li>
              <li><a href="#/tools?category=Voice%20%26%20Audio">Voice & Audio</a></li>
              <li><a href="#/tools?category=Productivity">Productivity</a></li>
              <li><a href="#/tools?category=Code%20%26%20Dev">Code & Developer</a></li>
            </ul>
          </div>

          <!-- Trust & WhatsApp Direct -->
          <div class="footer-col">
            <h4>${t('footer.communityHeading')}</h4>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 1rem;">
              ${t('benefits.b3Desc')}
            </p>
            <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.4rem;">
              <div>⚡ ${t('toolDetails.guaranteesActivation')}</div>
              <div>🛡 ${t('toolDetails.guaranteesLicensing')}</div>
              <div>💬 ${t('toolDetails.guaranteesSupport')}</div>
            </div>
          </div>
        </div>

        <!-- Copyright & Legal -->
        <div class="footer-bottom">
          <div>
            &copy; 2026 ${t('nav.brand')}. ${t('footer.allRightsReserved')}
          </div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/about">${t('nav.about')}</a>
            <a href="#/contact">${t('nav.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
