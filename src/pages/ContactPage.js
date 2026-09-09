// AI Tools Store - Contact & Help Page
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { showToast } from '../utils/helpers.js';
import { supabase, isSupabaseConfigured, defaultWhatsappUrl } from '../lib/supabase.js';
import { getAppSettings } from '../lib/settings.js';
import { mcpClient } from '../lib/mcpClient.js';

export async function renderContactPage(root) {
  document.title = 'Contact & Support | AI Tools Store';

  const defaultWhatsApp = defaultWhatsappUrl;

  root.innerHTML = `
    ${renderNavbar('/contact')}

    <main class="main-content container contact-page fade-in">
      <!-- Ambient Background Glows -->
      <div class="contact-ambient-glow contact-ambient-glow-1" aria-hidden="true"></div>
      <div class="contact-ambient-glow contact-ambient-glow-2" aria-hidden="true"></div>

      <!-- Header Section -->
      <header class="marketplace-header" style="position: relative; z-index: 1;">
        <span class="badge-contact-status">
          <span class="status-dot-pulse"></span>
          24/7 Priority Support Desk • Average Reply &lt; 5 Mins
        </span>
        <h1>We're Here to <span class="text-gradient-ai">Help You Succeed</span></h1>
        <p>Questions about instant tool access, account activations, enterprise licensing, or video tutorials? Reach our team anytime.</p>
      </header>

      <!-- Trust Metrics Badges -->
      <div class="contact-perks-row">
        <div class="contact-perk-item">
          <span>⚡</span>
          <span><span class="perk-highlight">&lt; 5-Min</span> Delivery on WhatsApp</span>
        </div>
        <div class="contact-perk-item">
          <span>🛡️</span>
          <span><span class="perk-highlight">100%</span> Replacement Warranty</span>
        </div>
        <div class="contact-perk-item">
          <span>💬</span>
          <span><span class="perk-highlight">Direct</span> 1-on-1 VIP Support</span>
        </div>
        <div class="contact-perk-item">
          <span>🌐</span>
          <span>PKR, INR, USD &amp; Global Currencies</span>
        </div>
      </div>

      <div class="contact-grid-wrap">
        <!-- Contact Form Card -->
        <div class="contact-form-card">
          <div class="card-icon-title-row">
            <div class="form-header-icon-box">💬</div>
            <div>
              <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800; margin: 0;">Send Us a Message</h3>
              <p style="font-size: 0.84rem; color: var(--text-secondary); margin: 0.25rem 0 0 0;">
                Fill in the details below and our team will respond to your email promptly.
              </p>
            </div>
          </div>

          <form id="contact-form">
            <!-- Full Name -->
            <div class="form-group">
              <label for="contact-name">Your Full Name *</label>
              <div class="form-input-wrapper">
                <span class="form-input-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input type="text" id="contact-name" class="form-input-stylish" placeholder="e.g. Alex Morgan" required />
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label for="contact-email">Email Address *</label>
              <div class="form-input-wrapper">
                <span class="form-input-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input type="email" id="contact-email" class="form-input-stylish" placeholder="e.g. alex@example.com" required />
              </div>
            </div>

            <!-- WhatsApp Number -->
            <div class="form-group">
              <label for="contact-whatsapp">WhatsApp Number *</label>
              <div class="form-input-wrapper">
                <span class="form-input-icon" style="color: #25D366;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                  </svg>
                </span>
                <input type="tel" id="contact-whatsapp" class="form-input-stylish" placeholder="e.g. +92 300 1234567" required />
              </div>
            </div>

            <!-- Topic with Quick Chips -->
            <div class="form-group">
              <div class="quick-topic-label">
                <label for="contact-subject" style="margin-bottom: 0;">Inquiry Topic *</label>
                <span style="font-size: 0.72rem; color: var(--accent-cyan);">Tap a chip to auto-select</span>
              </div>
              <div class="quick-topic-chips" id="topic-chips-group">
                <button type="button" class="topic-chip active" data-topic="License Activation">🔑 License Activation</button>
                <button type="button" class="topic-chip" data-topic="Payment Inquiry">💳 Payment Inquiry</button>
                <button type="button" class="topic-chip" data-topic="Video Tutorial Help">🎥 Tutorial Help</button>
                <button type="button" class="topic-chip" data-topic="Enterprise & Bulk Order">💼 Bulk Order</button>
              </div>
              <div class="form-input-wrapper">
                <span class="form-input-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </span>
                <input type="text" id="contact-subject" class="form-input-stylish" value="License Activation" placeholder="Select or type your inquiry topic..." required />
              </div>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label for="contact-message">How can we help you? *</label>
              <textarea id="contact-message" class="form-textarea-stylish" placeholder="Describe your question, required tool, or issue in detail..." required></textarea>
            </div>

            <button type="submit" class="btn-contact-submit">
              <span>Send Message</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>

        <!-- Right Column: WhatsApp VIP Concierge & FAQ -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- Instant VIP WhatsApp Card -->
          <div class="whatsapp-vip-card">
            <div class="vip-wa-header-row">
              <div class="vip-wa-icon-glow">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                </svg>
              </div>
              <div>
                <span class="vip-wa-badge-pill">
                  <span class="status-dot-pulse" style="width: 6px; height: 6px;"></span>
                  Online Now • Verified Concierge
                </span>
                <h4 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 800; margin: 0;">Direct WhatsApp VIP Support</h4>
                <p style="font-size: 0.78rem; color: #34d399; margin: 0.2rem 0 0 0;">Average reply in &lt; 3 minutes</p>
              </div>
            </div>

            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0.75rem 0;">
              Connect directly with our dedicated concierge on WhatsApp for real-time order activation, instant credentials transfer, and priority replacements.
            </p>

            <div class="vip-perks-list">
              <div class="vip-perk-point">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Instant private credentials delivery within 5 minutes</span>
              </div>
              <div class="vip-perk-point">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Dedicated 1-on-1 human support for all setups</span>
              </div>
              <div class="vip-perk-point">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Instant replacements if any tool needs renewal</span>
              </div>
            </div>

            <a href="${defaultWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn-vip-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
              </svg>
              <span>Chat on WhatsApp Now &rarr;</span>
            </a>
          </div>

          <!-- FAQ Accordion Box -->
          <div class="faq-accordion-box">
            <div class="faq-header-row">
              <span class="faq-header-icon">💡</span>
              <h3 style="font-size: 1.18rem; color: var(--text-pure); font-weight: 800; margin: 0;">Frequently Asked Questions</h3>
            </div>

            <div class="faq-accordion-list">
              <!-- FAQ 1 (Open by default) -->
              <div class="faq-item-card is-open">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">🔑</span>
                    <span>How do I receive my tool login after buying?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body" style="display: block;">
                  Immediately after clicking <strong>Buy Now</strong>, you connect directly to our dedicated WhatsApp concierge who verifies your order and transfers your private access credentials and instructions within <strong>5 minutes</strong>.
                </div>
              </div>

              <!-- FAQ 2 -->
              <div class="faq-item-card">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">🎥</span>
                    <span>Can I watch tutorials before purchasing?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body">
                  Yes! Every tool card has a dedicated <strong>"How to Use"</strong> button that takes you straight to the full video walkthrough and step-by-step instructions before you buy.
                </div>
              </div>

              <!-- FAQ 3 -->
              <div class="faq-item-card">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">💳</span>
                    <span>What payment methods are supported?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body">
                  We support localized payments in Pakistan (Easypaisa, JazzCash, Bank Transfer PKR), plus International Debit/Credit Cards, PayPal, Crypto (USDT/BTC), Apple Pay, and Google Pay coordinated directly via WhatsApp.
                </div>
              </div>

              <!-- FAQ 4 -->
              <div class="faq-item-card">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">🛡️</span>
                    <span>What if my tool access stops working?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body">
                  Every tool subscription includes our <strong>Full Replacement Guarantee</strong>. If you ever face an authentication or access issue, simply message our WhatsApp support and we provide an instant replacement account within minutes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();

  // Topic quick chips interaction
  const topicChips = document.querySelectorAll('.topic-chip');
  const subjectInput = document.getElementById('contact-subject');
  topicChips.forEach((chip) => {
    chip.onclick = () => {
      topicChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      if (subjectInput) {
        subjectInput.value = chip.dataset.topic;
      }
    };
  });

  // Contact Form Submission (Saves to Supabase Table Editor 'contact_messages')
  const form = document.getElementById('contact-form');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span>';

      const name = document.getElementById('contact-name')?.value?.trim() || '';
      const email = document.getElementById('contact-email')?.value?.trim() || '';
      const whatsapp = document.getElementById('contact-whatsapp')?.value?.trim() || '';
      const subject = document.getElementById('contact-subject')?.value?.trim() || 'General Inquiry';
      const message = document.getElementById('contact-message')?.value?.trim() || '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending Message...</span>';
      }

      try {
        // 1. Save to Supabase contact_messages
        if (isSupabaseConfigured) {
          const formattedMessage = whatsapp 
            ? `📱 WhatsApp: ${whatsapp}\n\n${message}` 
            : message;

          const { error } = await supabase.from('contact_messages').insert([
            {
              full_name: name,
              email: email,
              subject: subject,
              message: formattedMessage,
              created_at: new Date().toISOString()
            }
          ]);

          if (error) {
            console.warn('[ContactPage] Supabase insert warning:', error.message);
          }
        }

        // 2. Dispatch ONLY user details directly to n8n Webhook / MCP Server Trigger
        const settings = getAppSettings();
        if (settings.mcpWebhookUrl && settings.mcpWebhookUrl.trim().startsWith('http')) {
          mcpClient.setServerUrl(settings.mcpWebhookUrl);
          mcpClient.setSecretKey(settings.mcpSecretKey || '');
          try {
            await mcpClient.submitInquiry({
              name: name,
              email: email,
              whatsapp: whatsapp,
              topic: subject,
              message: message
            });
          } catch (mcpErr) {
            console.warn('[ContactPage] n8n submission notice:', mcpErr.message);
          }
        }

        showToast(`Thank you, ${name}! Your message has been received. Our team will contact you shortly.`, 'success');
        form.reset();
        topicChips.forEach((c, idx) => c.classList.toggle('active', idx === 0));
        if (subjectInput) subjectInput.value = 'License Activation';
      } catch (err) {
        console.error('[ContactPage] Error submitting form:', err);
        showToast(`Thank you, ${name}! Your message has been received.`, 'success');
        form.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    };
  }

  // Smooth FAQ Accordion Interaction
  document.querySelectorAll('.faq-question-btn').forEach((btn) => {
    btn.onclick = () => {
      const card = btn.closest('.faq-item-card');
      const answer = card.querySelector('.faq-answer-body');
      const isOpen = card.classList.contains('is-open');

      if (isOpen) {
        card.classList.remove('is-open');
        answer.style.display = 'none';
      } else {
        card.classList.add('is-open');
        answer.style.display = 'block';
      }
    };
  });
}
