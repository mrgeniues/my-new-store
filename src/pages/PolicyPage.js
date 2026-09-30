// AI Tools Store - Official Policy & Customer Guidelines Page
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderWhatsAppBanner } from '../components/WhatsAppBanner.js';
import { renderFooter } from '../components/Footer.js';
import { defaultWhatsappUrl } from '../lib/supabase.js';

export async function renderPolicyPage(root, { queryParams } = {}) {
  document.title = 'Policies & Guidelines | AI Tools Store';

  const initialTab = queryParams?.get?.('tab') || 'rules';

  root.innerHTML = `
    ${renderNavbar('/policy')}

    <main class="main-content container policy-page fade-in">
      <!-- Hero Header -->
      <section class="policy-hero-block">
        <span class="badge badge-popular" style="margin-bottom: 0.8rem;">Transparency & Trust</span>
        <h1>Official <span class="text-gradient-ai">Store Policies</span></h1>
        <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-secondary); max-width: 680px; margin: 0 auto;">
          Clear, fair, and friendly standards designed to guarantee instant activations, verified software licenses, and smooth customer experiences.
        </p>
      </section>

      <!-- Main Layout: Sidebar on Left, Content Area on Right -->
      <div class="policy-layout">
        <!-- Left Sidebar Navigation -->
        <aside class="policy-sidebar">
          <div class="policy-sidebar-inner glass-panel">
            <div class="policy-sidebar-header">
              <span class="policy-sidebar-title">Policy Directory</span>
              <span class="policy-sidebar-badge">3 Topics</span>
            </div>

            <nav class="policy-nav-tabs" role="tablist">
              <button 
                type="button" 
                class="policy-tab-btn ${initialTab === 'rules' ? 'active' : ''}" 
                data-tab="rules"
                role="tab"
                aria-selected="${initialTab === 'rules' ? 'true' : 'false'}"
              >
                <div class="policy-tab-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div class="policy-tab-meta">
                  <span class="policy-tab-title">1. Rules & Regulations</span>
                  <span class="policy-tab-desc">Fixed pricing & customer guidelines</span>
                </div>
                <div class="policy-tab-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </button>

              <button 
                type="button" 
                class="policy-tab-btn ${initialTab === 'refund' ? 'active' : ''}" 
                data-tab="refund"
                role="tab"
                aria-selected="${initialTab === 'refund' ? 'true' : 'false'}"
              >
                <div class="policy-tab-icon" style="background: rgba(244, 63, 94, 0.12); color: #fb7185; border-color: rgba(244, 63, 94, 0.25);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                  </svg>
                </div>
                <div class="policy-tab-meta">
                  <span class="policy-tab-title">2. Refund Policy</span>
                  <span class="policy-tab-desc">Digital licenses & replacement criteria</span>
                </div>
                <div class="policy-tab-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </button>

              <button 
                type="button" 
                class="policy-tab-btn ${initialTab === 'activation' ? 'active' : ''}" 
                data-tab="activation"
                role="tab"
                aria-selected="${initialTab === 'activation' ? 'true' : 'false'}"
              >
                <div class="policy-tab-icon" style="background: rgba(16, 185, 129, 0.12); color: #34d399; border-color: rgba(16, 185, 129, 0.25);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <div class="policy-tab-meta">
                  <span class="policy-tab-title">3. Activation Procedure</span>
                  <span class="policy-tab-desc">Reference video & setup compliance</span>
                </div>
                <div class="policy-tab-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </button>
            </nav>

            <!-- Quick WhatsApp Concierge Card in Sidebar -->
            <div class="policy-sidebar-help">
              <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-pure); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
                <span style="font-size: 1rem;">💬</span> Need Policy Clarification?
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
                Our WhatsApp team is available 24/7 to answer onboarding or license queries.
              </p>
              <a href="${defaultWhatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav" style="width: 100%; justify-content: center; font-size: 0.78rem; padding: 0.45rem 0.75rem;">
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>

        <!-- Right Content Details Area -->
        <section class="policy-content-area" id="policy-content-area">
          ${renderTabContent(initialTab)}
        </section>
      </div>

      <!-- Bottom WhatsApp Community Banner -->
      ${renderWhatsAppBanner()}
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();
  attachPolicyPageEvents();
}

/**
 * Returns the HTML for the selected policy tab
 */
function renderTabContent(tabName) {
  switch (tabName) {
    case 'refund':
      return renderRefundPolicyContent();
    case 'activation':
      return renderActivationProcedureContent();
    case 'rules':
    default:
      return renderRulesContent();
  }
}

/**
 * Tab 1: Rules & Regulations
 */
function renderRulesContent() {
  return `
    <article class="policy-panel glass-panel fade-in" id="panel-rules">
      <div class="policy-panel-header">
        <div class="policy-badge-row">
          <span class="policy-pill-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            Section 1
          </span>
          <span class="policy-pill-badge" style="background: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3);">
            Fixed Pricing & Guidelines
          </span>
        </div>
        <h2 class="policy-panel-title">Rules & Regulations</h2>
        <p class="policy-panel-subtitle">
          Essential standards on our fixed pricing structure, support etiquette, and fair usage guidelines.
        </p>
      </div>

      <!-- Friendly Notice Banner -->
      <div class="policy-alert-box policy-alert-cyan">
        <div class="policy-alert-icon">💡</div>
        <div class="policy-alert-body">
          <strong>A Friendly Note for Our Valued Customers:</strong>
          <p>
            We take pride in delivering premium AI software licenses at industry-leading low rates. Our prices are benchmarked to be as low as humanly possible while sustaining verified premium accounts and 24/7 concierge assistance.
          </p>
        </div>
      </div>

      <!-- Policy Detail Cards -->
      <div class="policy-cards-stack">
        <!-- 1. Strictly Fixed Pricing -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee;">
              🏷️
            </div>
            <div>
              <h3 class="policy-card-title">1. Transparent & 100% Fixed Pricing</h3>
              <span class="policy-card-tag">Strict Company Policy</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Every price listed on the AI Tools Store website is strictly <strong>fixed, finalized, and standardized</strong>. There are no hidden fees, unexpected subscription renewal spikes, or arbitrary markups.
            </p>
            <div class="policy-highlight-box">
              <span class="highlight-title">No Price Bargaining or Arguments Needed:</span>
              <p>
                Our customer support agents and WhatsApp concierge team work under rigid pricing automation. <strong>They have zero authority to negotiate, lower, or alter tool prices for individual requests.</strong>
              </p>
              <p style="margin-top: 0.5rem;">
                We kindly request you <strong>not to engage in price debates or bargaining</strong> with our team members. This friendly understanding saves your valuable time and lets our engineers focus on swift activation and setup.
              </p>
            </div>
          </div>
        </div>

        <!-- 2. Looking for Discounts? -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(249, 115, 22, 0.15); color: #fb923c;">
              🔥
            </div>
            <div>
              <h3 class="policy-card-title">2. Official Offers & Hot Deals</h3>
              <span class="policy-card-tag">Special Promotions</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              If you want special discounts or bundle promotions, please explore our dedicated <a href="#/deals" style="color: var(--accent-cyan); text-decoration: underline; font-weight: 700;">Hot Deals</a> section!
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              Whenever discounts, seasonal sales, or <strong>Buy 1 Get 1</strong> packages are active, they are automatically published directly on the store with pre-applied rates. No negotiation is ever required.
            </p>
          </div>
        </div>

        <!-- 3. Courteous Communication -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">
              🤝
            </div>
            <div>
              <h3 class="policy-card-title">3. Respectful & Friendly Community Ethics</h3>
              <span class="policy-card-tag">Mutual Respect</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Our support team strives to assist you with patience, speed, and diligence. We treat every single customer with the utmost courtesy and expect the same friendly, professional respect in return across WhatsApp, email, and live chats.
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              Inappropriate language, aggressive behavior, or repetitive harassment regarding fixed prices will result in immediate termination of the support conversation and potential account suspension.
            </p>
          </div>
        </div>

        <!-- 4. Single-User License Integrity -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              🛡️
            </div>
            <div>
              <h3 class="policy-card-title">4. License Integrity & Fair Usage</h3>
              <span class="policy-card-tag">Security & Compliance</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Each account or software key provided is strictly for the licensed customer or team size specified during purchase. Reselling, sub-leasing, public credential leaks, or abusing shared server quotas is strictly prohibited and results in immediate automated forfeiture without refund.
            </p>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Tab 2: Refund Policy
 */
function renderRefundPolicyContent() {
  return `
    <article class="policy-panel glass-panel fade-in" id="panel-refund">
      <div class="policy-panel-header">
        <div class="policy-badge-row">
          <span class="policy-pill-badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3);">
            Section 2
          </span>
          <span class="policy-pill-badge" style="background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.3);">
            Digital Products & Eligibility
          </span>
        </div>
        <h2 class="policy-panel-title">Refund & Replacement Policy</h2>
        <p class="policy-panel-subtitle">
          Comprehensive explanation on digital goods, subscription activations, and replacement terms.
        </p>
      </div>

      <!-- Critical Notice Box -->
      <div class="policy-alert-box policy-alert-amber">
        <div class="policy-alert-icon">⚠️</div>
        <div class="policy-alert-body">
          <strong>Important Industry Standard Notice:</strong>
          <p>
            All subscriptions, software licenses, account credentials, and API access sold on AI Tools Store are <strong>digital products</strong>, not physical merchandise. Please review the terms below before completing your purchase.
          </p>
        </div>
      </div>

      <div class="policy-cards-stack">
        <!-- 1. Nature of Digital Products -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">
              ⚡
            </div>
            <div>
              <h3 class="policy-card-title">1. No Returns After Successful Activation</h3>
              <span class="policy-card-tag">Digital Asset Rule</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Once your tool subscription has been provisioned and <strong>activated on your account or device</strong>, the digital license is immediately consumed and registered with the service provider.
            </p>
            <div class="policy-highlight-box" style="border-left-color: #f43f5e;">
              <span class="highlight-title" style="color: #fb7185;">Non-Returnable Nature of Activated Subscriptions:</span>
              <p>
                Unlike a physical item that can be placed back in a box, <strong>an activated digital tool cannot be re-activated or returned to reverse the upstream licensing cost</strong>. Therefore, once working access is delivered, payments cannot be returned or refunded simply due to change of mind.
              </p>
            </div>
          </div>
        </div>

        <!-- 2. When Replacement or Refund IS Granted -->
        <div class="policy-card" style="border-color: rgba(16, 185, 129, 0.35);">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              ✅
            </div>
            <div>
              <h3 class="policy-card-title" style="color: #34d399;">2. When You ARE Eligible for a Replacement or Refund</h3>
              <span class="policy-card-tag" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">Guaranteed Protection</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              We firmly stand behind the quality of our offerings. You are 100% entitled to a <strong>free replacement tool or refund</strong> under the following mandatory criteria:
            </p>
            
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div class="policy-check-item">
                <span class="check-icon">✓</span>
                <div>
                  <strong>Strict Compliance with Tool Description:</strong> You have carefully read and followed all prerequisites, instructions, and usage limitations explicitly detailed in the tool's product description.
                </div>
              </div>

              <div class="policy-check-item">
                <span class="check-icon">✓</span>
                <div>
                  <strong>Verified Service Disruption or Invalid Credential:</strong> If the tool ceases functioning, credentials fail authentication, or an unexpected server lock occurs that our technical support team <strong>cannot resolve within our SLA (24–48 hours)</strong>.
                </div>
              </div>

              <div class="policy-check-item">
                <span class="check-icon">✓</span>
                <div>
                  <strong>Prompt Reporting:</strong> The issue was reported to our WhatsApp concierge team within your active warranty window alongside relevant screenshots or error logs.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Ineligible Scenarios -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185;">
              ❌
            </div>
            <div>
              <h3 class="policy-card-title">3. Ineligible Scenarios (Void Warranty)</h3>
              <span class="policy-card-tag">Exclusions</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Refunds, cancellations, or free replacements will <strong>NOT</strong> be issued under any of the following conditions:
            </p>
            <ul class="policy-bullet-list">
              <li>You purchased the subscription but decided you no longer want or need it after credentials were dispatched.</li>
              <li>You failed to read the tool requirements, compatibility notes, or VPN requirements written in the description below the tool.</li>
              <li>You disregarded the official onboarding reference video and attempted an unauthorized setup.</li>
              <li>You altered account passwords, modified recovery emails, or attempted multi-person sharing contrary to the tool's rules.</li>
              <li>Your personal internet connection, local ISP block, or personal computer hardware does not meet minimum application requirements.</li>
            </ul>
          </div>
        </div>

        <!-- 4. How to Claim -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              📩
            </div>
            <div>
              <h3 class="policy-card-title">4. How to Request Replacement Assistance</h3>
              <span class="policy-card-tag">Quick Support</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              If your tool meets the eligibility criteria above, message our WhatsApp support team with:
            </p>
            <div style="background: rgba(15, 23, 42, 0.7); padding: 0.85rem 1rem; border-radius: 8px; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.82rem; color: #cbd5e1; border: 1px solid var(--border-glass);">
              1. Your Registered Email or WhatsApp Phone Number<br/>
              2. Name of the Purchased AI Tool<br/>
              3. Screenshot of the issue showing full screen & error message<br/>
              4. Confirmation that the description guidelines were followed
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Tab 3: Activation Procedure
 */
function renderActivationProcedureContent() {
  return `
    <article class="policy-panel glass-panel fade-in" id="panel-activation">
      <div class="policy-panel-header">
        <div class="policy-badge-row">
          <span class="policy-pill-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
            Section 3
          </span>
          <span class="policy-pill-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            Setup & Reference Guide
          </span>
        </div>
        <h2 class="policy-panel-title">Active Procedure & Setup Compliance</h2>
        <p class="policy-panel-subtitle">
          Follow the mandatory reference video and step guides to ensure permanent, uninterrupted access.
        </p>
      </div>

      <!-- Compliance Notice Box -->
      <div class="policy-alert-box policy-alert-cyan">
        <div class="policy-alert-icon">🎥</div>
        <div class="policy-alert-body">
          <strong>Mandatory Reference Video Included with Every Tool:</strong>
          <p>
            To prevent account lockouts and protect your subscription, <strong>every tool page includes an official walkthrough video tutorial and step description</strong>. Watching this video is a mandatory prerequisite for activation.
          </p>
        </div>
      </div>

      <div class="policy-cards-stack">
        <!-- 1. The Reference Video Protocol -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              ▶️
            </div>
            <div>
              <h3 class="policy-card-title">1. Watch the Reference Video Step-by-Step</h3>
              <span class="policy-card-tag">Mandatory Step</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              When you purchase or inspect any tool on AI Tools Store, scroll down to the <strong>"How to Use & Tutorial"</strong> tab. There you will find a dedicated reference video and detailed sequential guide.
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              This reference video visually walks you through every click: from accessing the verified portal, inserting session credentials or keys, to managing your workspace safely without triggering security locks.
            </p>
          </div>
        </div>

        <!-- 2. Customer Responsibility & Service Loss Disclaimer -->
        <div class="policy-card" style="border-color: rgba(244, 63, 94, 0.4);">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185;">
              ⚠️
            </div>
            <div>
              <h3 class="policy-card-title" style="color: #fb7185;">2. Strict Compliance & Loss of Service Disclaimer</h3>
              <span class="policy-card-tag" style="background: rgba(244, 63, 94, 0.15); color: #fb7185;">Important Disclaimer</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              You must activate your account <strong>strictly by following the provided reference video and instructions</strong>.
            </p>
            
            <div class="policy-highlight-box" style="border-left-color: #f43f5e; background: rgba(244, 63, 94, 0.08);">
              <span class="highlight-title" style="color: #fda4af;">Company Not Responsible If You Act Independently:</span>
              <p>
                <strong>If you act upon your own discretion</strong>—such as altering security settings, changing master passwords, modifying linked recovery email addresses, logging in from untrusted automated scrapers, or skipping the video guide—<strong>the company (AI Tools Store) will NOT be held responsible for any loss of service, account ban, or license termination.</strong>
              </p>
              <p style="margin-top: 0.5rem; font-weight: 600; color: #fecdd3;">
                Any loss of service arising from willful disregard of the official reference video voids all replacement and refund guarantees immediately.
              </p>
            </div>
          </div>
        </div>

        <!-- 3. Unsure of Anything? Ask Support Before Trying -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              💬
            </div>
            <div>
              <h3 class="policy-card-title">3. Unsure? Ask Concierge Before Modifying Anything</h3>
              <span class="policy-card-tag">Safe Path</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              If a screen looks unfamiliar, a prompt asks for a code you don't recognize, or you feel confused at any moment during the video tutorial, <strong>DO NOT guess or experiment on your own</strong>.
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              Simply take a screenshot, pause your screen, and message our WhatsApp Concierge. Our specialists will guide you through the exact button to click within minutes.
            </p>
          </div>
        </div>

        <!-- 4. Step-by-Step Activation Checklist -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">
              📋
            </div>
            <div>
              <h3 class="policy-card-title">4. Quick 4-Step Activation Checklist</h3>
              <span class="policy-card-tag">Standard Workflow</span>
            </div>
          </div>
          <div class="policy-card-body">
            <ol class="policy-num-list">
              <li>
                <strong>Inspect Tool Details:</strong> Read the prerequisite system requirements and usage guidelines on the tool's page.
              </li>
              <li>
                <strong>Watch the Reference Video:</strong> Play the full tutorial video from start to finish before opening the software.
              </li>
              <li>
                <strong>Execute Exactly As Shown:</strong> Copy credentials or extensions accurately as demonstrated in the walkthrough.
              </li>
              <li>
                <strong>Verify & Confirm:</strong> Confirm your workspace is active. If any unexpected error appears, reach out to WhatsApp support immediately.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Attaches interactive tab switching and events
 */
function attachPolicyPageEvents() {
  const tabButtons = document.querySelectorAll('.policy-tab-btn');
  const contentArea = document.getElementById('policy-content-area');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = btn.getAttribute('data-tab');

      // Update active state on buttons
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Render new tab content smoothly
      if (contentArea) {
        contentArea.innerHTML = renderTabContent(tabName);
        // Scroll content area into view on mobile
        if (window.innerWidth < 900) {
          contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      // Update URL hash parameter without refreshing
      try {
        const url = new URL(window.location.href);
        url.hash = `#/policy?tab=${tabName}`;
        window.history.replaceState(null, '', url.toString());
      } catch (err) {}
    });
  });
}
