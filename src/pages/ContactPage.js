// AI Tools Store - Contact & Help Page
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { showToast } from '../utils/helpers.js';

export async function renderContactPage(root) {
  document.title = 'Contact & Support | AI Tools Store';

  const defaultWhatsApp = import.meta.env.VITE_DEFAULT_WHATSAPP_URL || 'https://chat.whatsapp.com/invite/aitools-store-vip';

  root.innerHTML = `
    ${renderNavbar('/contact')}

    <main class="main-content container contact-page fade-in">
      <header class="marketplace-header">
        <span class="badge badge-popular" style="margin-bottom: 0.6rem;">24/7 Support</span>
        <h1>We're Here to <span class="text-gradient-ai">Help You Succeed</span></h1>
        <p>Questions about tool access, enterprise licenses, or technical tutorials? Reach our team anytime.</p>
      </header>

      <div class="contact-grid-wrap">
        <!-- Contact Form -->
        <div class="contact-form-card">
          <h3 style="font-size: 1.3rem; margin-bottom: 0.4rem; color: var(--text-pure);">Send Us a Message</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
            Fill out the form below and our team will get back to you within a couple of hours.
          </p>

          <form id="contact-form">
            <div class="form-group">
              <label for="contact-name">Your Full Name</label>
              <input type="text" id="contact-name" class="form-input" placeholder="e.g. Alex Morgan" required />
            </div>

            <div class="form-group">
              <label for="contact-email">Email Address</label>
              <input type="email" id="contact-email" class="form-input" placeholder="e.g. alex@example.com" required />
            </div>

            <div class="form-group">
              <label for="contact-subject">Topic</label>
              <input type="text" id="contact-subject" class="form-input" placeholder="e.g. License Activation for ChatGPT Plus" required />
            </div>

            <div class="form-group">
              <label for="contact-message">How can we help you?</label>
              <textarea id="contact-message" class="form-textarea" placeholder="Describe your question or requirement..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem;">
              Send Message
            </button>
          </form>
        </div>

        <!-- WhatsApp Direct & FAQs -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- Instant WhatsApp Card -->
          <div class="glass-panel" style="padding: 2rem; border-color: rgba(37, 211, 102, 0.3);">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(37, 211, 102, 0.15); display: flex; align-items: center; justify-content: center; color: var(--accent-mint);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                </svg>
              </div>
              <div>
                <h4 style="font-size: 1.15rem; color: var(--text-pure);">Need Faster Support?</h4>
                <p style="font-size: 0.8rem; color: var(--accent-mint);">Average reply in &lt; 5 minutes</p>
              </div>
            </div>

            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
              Chat directly with our verified concierge on WhatsApp for real-time order activation, payment inquiries, and instant replacements.
            </p>

            <a href="${defaultWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="width: 100%;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
              </svg>
              <span>Chat on WhatsApp Now</span>
            </a>
          </div>

          <!-- FAQ Accordion -->
          <div class="faq-accordion">
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Frequently Asked Questions</h3>

            <div class="faq-item">
              <button class="faq-question">
                <span>How do I receive my tool login after buying?</span>
                <span class="faq-toggle-icon">+</span>
              </button>
              <div class="faq-answer">
                Immediately after clicking Buy Now, you connect to our dedicated WhatsApp concierge who verifies your order and transfers your private access credentials within 5 minutes.
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">
                <span>Can I watch tutorials before purchasing?</span>
                <span class="faq-toggle-icon">+</span>
              </button>
              <div class="faq-answer">
                Yes! Every tool has its own dedicated "How to Use" video walkthrough and step-by-step instructions available directly on the tool details page.
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">
                <span>What payment methods are supported?</span>
                <span class="faq-toggle-icon">+</span>
              </button>
              <div class="faq-answer">
                We support all major international cards, PayPal, Crypto (USDT/BTC), Apple Pay, Google Pay, and localized bank transfers coordinated directly via WhatsApp.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();

  // Contact Form Submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      showToast(`Thank you, ${name}! Your message has been received. Our concierge will contact you shortly.`, 'success');
      form.reset();
    };
  }

  // FAQ Accordion Interaction
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.onclick = () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-toggle-icon');
      const isExpanded = answer.style.display === 'block';

      answer.style.display = isExpanded ? 'none' : 'block';
      icon.textContent = isExpanded ? '+' : '−';
    };
  });
}
