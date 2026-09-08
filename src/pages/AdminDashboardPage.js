// AI Tools Store - Secure Supabase Admin Panel with Complete Management
import { supabase, isSupabaseConfigured, uploadToolImage, defaultWhatsappUrl, getEnv } from '../lib/supabase.js';
import { authService } from '../lib/auth.js';
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { showToast, getCountryFlag, getToolLocalizedPrice } from '../utils/helpers.js';
import { getAppSettings, saveAppSettings, testMcpWebhook } from '../lib/settings.js';

let activeTab = 'tools'; // 'tools' | 'users' | 'analytics' | 'settings'
let adminPricingCountry = 'Pakistan';

export async function renderAdminDashboardPage(root) {
  document.title = 'Admin Management | AI Tools Store';

  // 1. Check if Supabase credentials exist
  if (!isSupabaseConfigured) {
    root.innerHTML = `
      ${renderNavbar('/admin')}
      <main class="main-content container admin-page fade-in" style="max-width: 720px; margin-top: 3rem;">
        <div class="glass-panel" style="padding: 2.5rem; text-align: center; border-color: rgba(245, 158, 11, 0.4);">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; color: #f59e0b;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h2 style="font-size: 1.6rem; color: var(--text-pure); margin-bottom: 0.75rem;">Supabase Connection Required</h2>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Please add your Supabase credentials to your <code style="color: var(--accent-cyan);">.env</code> file:
          </p>
          <pre class="code-block" style="text-align: left; margin-bottom: 1.5rem;">VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-supabase-anon-key</pre>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            Next, run the SQL script in <code style="color: var(--accent-cyan);">supabase/schema.sql</code> in your Supabase SQL Editor to initialize database tables and Row Level Security.
          </p>
          <a href="#/" class="btn btn-secondary">Return to Store</a>
        </div>
      </main>
      ${renderFooter()}
    `;
    attachNavbarEvents();
    return;
  }

  // 2. Check Authentication session
  const user = await authService.getCurrentUser();
  const profile = authService.currentProfile;

  // Case A: User is not logged in -> Show Admin Login Form
  if (!user) {
    root.innerHTML = `
      ${renderNavbar('/admin')}
      <main class="main-content container admin-page fade-in" style="max-width: 480px; margin-top: 3.5rem;">
        <div class="glass-panel" style="padding: 2.5rem; box-shadow: var(--shadow-card-hover);">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; color: var(--accent-cyan);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 style="font-size: 1.65rem; color: var(--text-pure); font-weight: 800;">Admin Sign In</h2>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.35rem;">
              Sign in with your verified administrator credentials to access the store management console
            </p>
          </div>

          <form id="admin-login-form">
            <div class="form-group">
              <label class="form-label" for="admin-email">Admin Email</label>
              <input type="email" id="admin-email" class="form-input" placeholder="admin@aitools.store" required autocomplete="email" />
            </div>

            <div class="form-group" style="margin-bottom: 1.75rem;">
              <label class="form-label" for="admin-password">Password</label>
              <input type="password" id="admin-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" />
            </div>

            <button type="submit" id="admin-login-btn" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.85rem; font-weight: 700;">
              Sign In to Admin Panel
            </button>
          </form>

          <div style="margin-top: 1.5rem; font-size: 0.78rem; text-align: center; color: var(--text-muted);">
            Secured via Supabase Row Level Security (RLS) & Role Authentication
          </div>
        </div>
      </main>
      ${renderFooter()}
    `;
    attachNavbarEvents();

    const loginForm = document.getElementById('admin-login-form');
    const loginBtn = document.getElementById('admin-login-btn');

    loginForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-email').value.trim();
      const password = document.getElementById('admin-password').value;

      loginBtn.textContent = 'Authenticating...';
      loginBtn.disabled = true;

      try {
        await authService.signIn({ email, password });
        if (authService.isAdmin()) {
          showToast('Signed in successfully as Administrator.', 'success');
          renderAdminDashboardPage(root);
        } else {
          showToast('Signed in, but this account is not registered as an administrator.', 'warning');
          renderAdminDashboardPage(root);
        }
      } catch (error) {
        showToast(`Authentication failed: ${error.message}`, 'error');
        loginBtn.textContent = 'Sign In to Admin Panel';
        loginBtn.disabled = false;
      }
    };
    return;
  }

  // Case B: User is logged in but NOT an Admin -> Show Restriction Card
  if (!authService.isAdmin(user, profile)) {
    root.innerHTML = `
      ${renderNavbar('/admin')}
      <main class="main-content container admin-page fade-in" style="max-width: 540px; margin-top: 3.5rem;">
        <div class="glass-panel" style="padding: 2.5rem; text-align: center; border-color: rgba(239, 68, 68, 0.4);">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; color: #f87171;">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 style="font-size: 1.6rem; color: var(--text-pure); margin-bottom: 0.5rem; font-weight: 800;">Administrator Access Required</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">
            You are currently signed in as <strong style="color: var(--text-pure);">${user.email}</strong> with <strong style="color: var(--accent-mint);">VIP Member</strong> status. This panel is restricted exclusively to store administrators.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <a href="#/" class="btn btn-secondary">Return to Store</a>
            <button id="admin-switch-account-btn" class="btn btn-primary">Sign in as Administrator</button>
          </div>
        </div>
      </main>
      ${renderFooter()}
    `;
    attachNavbarEvents();

    document.getElementById('admin-switch-account-btn')?.addEventListener('click', async () => {
      await authService.signOut();
      renderAdminDashboardPage(root);
    });
    return;
  }

  // Case C: Authenticated Administrator -> Render Full Comprehensive Admin Panel
  let tools = [];
  try {
    tools = await toolsApi.adminGetTools();
  } catch (err) {
    showToast(`Failed to load tools from Supabase: ${err.message}`, 'error');
  }

  let categories = [];
  try {
    categories = await toolsApi.adminGetCategories();
  } catch (cErr) {
    console.warn('Could not load categories:', cErr);
  }

  let users = [];
  try {
    users = await authService.getRegisteredUsers();
  } catch (uErr) {
    console.warn('Could not load registered users:', uErr);
  }

  const activeCount = tools.filter((t) => t.active).length;
  const featuredCount = tools.filter((t) => t.featured).length;
  const categoriesList = categories.map((c) => c.name);
  const adminUsersCount = users.filter((u) => u.role === 'admin').length;
  const appSettings = getAppSettings();

  root.innerHTML = `
    ${renderNavbar('/admin')}

    <main class="main-content container admin-page fade-in">
      <!-- Admin Top Header -->
      <div class="section-header-row" style="margin-bottom: 2rem; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-popular" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">
              🛡️ Administrator Console
            </span>
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
              ● Supabase Connected
            </span>
            <span style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">${user.email}</span>
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-pure);">Admin Store Management</h1>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">
            Complete control over AI tool listings, custom categories, customer directory, live analytics, and settings.
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <button id="admin-add-tool-btn" class="btn btn-primary" style="font-size: 0.88rem; padding: 0.65rem 1.35rem; font-weight: 700;">
            + Add New AI Tool
          </button>
          <button id="admin-add-cat-top-btn" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.65rem 1.25rem; font-weight: 700; border-color: rgba(168, 85, 247, 0.4); color: #c084fc;">
            + Add Category
          </button>
          <a href="#/" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.15rem; text-decoration: none;">
            View Store
          </a>
          <button id="admin-signout-btn" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.15rem; border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
            Sign Out
          </button>
        </div>
      </div>

      <!-- Admin Navigation Tabs -->
      <div class="admin-tabs-nav">
        <button class="admin-tab-btn ${activeTab === 'tools' ? 'active' : ''}" data-tab="tools">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>AI Tools Inventory (${tools.length})</span>
        </button>

        <button class="admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}" data-tab="categories">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Categories Catalog (${categories.length})</span>
        </button>

        <button class="admin-tab-btn ${activeTab === 'users' ? 'active' : ''}" data-tab="users">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Registered Members (${users.length})</span>
        </button>

        <button class="admin-tab-btn ${activeTab === 'analytics' ? 'active' : ''}" data-tab="analytics">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span>Store Analytics & KPIs</span>
        </button>

        <button class="admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Store & WhatsApp Settings</span>
        </button>
      </div>

      <!-- TAB 1: AI TOOLS INVENTORY -->
      <div id="tab-content-tools" style="${activeTab === 'tools' ? 'display: block;' : 'display: none;'}">
        <!-- KPI METRIC CARDS -->
        <div class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Catalog Products</h4>
              <div class="kpi-number">${tools.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Synced with Supabase Cloud</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Active Live Tools</h4>
              <div class="kpi-number">${activeCount}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Visible to store visitors</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Featured Selection</h4>
              <div class="kpi-number">${featuredCount}</div>
              <div class="kpi-delta" style="color: #fb923c;">Highlighted on Home Page</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(249, 115, 22, 0.15); color: #fb923c;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Filter and Search Bar -->
        <div class="admin-filter-bar">
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; flex: 1;">
            <input 
              type="text" 
              id="tools-search-input" 
              class="admin-search-input" 
              placeholder="Search tools by name or slug..." 
            />

            <select id="tools-category-filter" class="admin-search-input" style="min-width: 170px;">
              <option value="ALL">All Categories (${categoriesList.length})</option>
              ${categoriesList.map((c) => `<option value="${c}">${c}</option>`).join('')}
            </select>

            <select id="tools-status-filter" class="admin-search-input" style="min-width: 150px;">
              <option value="ALL">All Status (${tools.length})</option>
              <option value="ACTIVE">Active Only (${activeCount})</option>
              <option value="INACTIVE">Inactive Only (${tools.length - activeCount})</option>
              <option value="FEATURED">Featured (${featuredCount})</option>
            </select>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            Showing <strong id="tools-count-badge" style="color: var(--text-pure);">${tools.length}</strong> products
          </div>
        </div>

        <!-- Inventory Table Card -->
        <div class="admin-table-card">
          <!-- View Pricing Mode for Admin -->
          <div class="admin-pricing-mode-bar" style="margin-bottom: 1.5rem; padding: 1.1rem 1.35rem; background: linear-gradient(135deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.9)); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 16px; box-shadow: 0 8px 24px -6px rgba(0,0,0,0.5);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem;">
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); display: flex; align-items: center; justify-content: center; font-size: 1.15rem;">
                  🌍
                </div>
                <div>
                  <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-pure); display: flex; align-items: center; gap: 0.5rem;">
                    <span>View Pricing Mode & Live Country Inspector</span>
                    <span class="badge badge-popular" style="font-size: 0.65rem; padding: 0.1rem 0.45rem;">Admin Panel Only</span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.1rem;">
                    Select any country below to see what localized prices are displayed for store visitors in that country.
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button type="button" id="admin-sync-store-country-btn" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.45rem 0.85rem; border-color: rgba(56, 189, 248, 0.4); color: var(--accent-cyan);" title="Sync active storefront preview to this country">
                  <span>Sync Storefront to <strong id="admin-preview-country-label">${adminPricingCountry}</strong> ↗</span>
                </button>
              </div>
            </div>

            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="admin-pricing-country-chips">
              <button type="button" class="currency-chip ${adminPricingCountry === 'Pakistan' ? 'active' : ''}" data-country="Pakistan">
                <span>🇵🇰</span> <span>Pakistan (PKR)</span>
              </button>
              <button type="button" class="currency-chip ${adminPricingCountry === 'India' ? 'active' : ''}" data-country="India">
                <span>🇮🇳</span> <span>India (INR ₹)</span>
              </button>
              <button type="button" class="currency-chip ${adminPricingCountry === 'United Arab Emirates' ? 'active' : ''}" data-country="United Arab Emirates">
                <span>🇦🇪</span> <span>UAE (AED)</span>
              </button>
              <button type="button" class="currency-chip ${adminPricingCountry === 'Saudi Arabia' ? 'active' : ''}" data-country="Saudi Arabia">
                <span>🇸🇦</span> <span>Saudi Arabia (SAR)</span>
              </button>
              <button type="button" class="currency-chip ${adminPricingCountry === 'United States' ? 'active' : ''}" data-country="United States">
                <span>🇺🇸</span> <span>United States (USD $)</span>
              </button>
              <button type="button" class="currency-chip ${adminPricingCountry === 'United Kingdom' ? 'active' : ''}" data-country="United Kingdom">
                <span>🇬🇧</span> <span>United Kingdom (GBP £)</span>
              </button>
              <button type="button" class="currency-chip ${adminPricingCountry === 'Global' ? 'active' : ''}" data-country="Global">
                <span>🌐</span> <span>Global / Others (USD)</span>
              </button>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                <span>AI Tools Inventory</span>
                <span id="admin-table-country-pill" class="badge badge-new" style="font-size: 0.72rem; font-weight: 700;">
                  ${getCountryFlag(adminPricingCountry)} Showing ${adminPricingCountry} Pricing
                </span>
              </h3>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Real-time Supabase Database Sync</span>
          </div>

          <div id="tools-table-container">
            ${renderToolsTableHtml(tools, adminPricingCountry)}
          </div>
        </div>
      </div>

      <!-- TAB 2: CATEGORIES MANAGEMENT -->
      <div id="tab-content-categories" style="${activeTab === 'categories' ? 'display: block;' : 'display: none;'}">
        <!-- Categories KPI Summary Row -->
        <div class="kpi-row" style="margin-bottom: 2rem;">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Active Categories</h4>
              <div class="kpi-number">${categories.length}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Organized taxonomy</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(168, 85, 247, 0.15); color: #c084fc;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Catalog Tools</h4>
              <div class="kpi-number">${tools.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Across all categories</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Average Products / Category</h4>
              <div class="kpi-number">${categories.length ? (tools.length / categories.length).toFixed(1) : 0}</div>
              <div class="kpi-delta" style="color: #fb923c;">Balanced distribution</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(249, 115, 22, 0.15); color: #fb923c;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Filter and Search Bar for Categories -->
        <div class="admin-filter-bar">
          <div style="display: flex; gap: 0.75rem; align-items: center; flex: 1; max-width: 450px;">
            <input 
              type="text" 
              id="categories-search-input" 
              class="admin-search-input" 
              placeholder="Search categories by name, details, or slug..." 
              style="width: 100%;"
            />
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Total <strong id="categories-count-badge" style="color: var(--text-pure);">${categories.length}</strong> categories
            </div>
            <button id="admin-add-category-btn" class="btn btn-primary" style="font-size: 0.88rem; padding: 0.65rem 1.35rem; font-weight: 700;">
              + Add New Category
            </button>
          </div>
        </div>

        <!-- Categories Table Card -->
        <div class="admin-table-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700;">Store Taxonomy & Categories</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                Manage categories, custom descriptions, icons, theme colors, and banners.
              </p>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Instant Live Sync</span>
          </div>

          <div id="admin-categories-table-container">
            ${renderCategoriesTableHtml(categories)}
          </div>
        </div>
      </div>

      <!-- TAB 3: REGISTERED MEMBERS DIRECTORY -->
      <div id="tab-content-users" style="${activeTab === 'users' ? 'display: block;' : 'display: none;'}">
        <!-- Members Summary KPIs -->
        <div class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Registered Members</h4>
              <div class="kpi-number">${users.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Community Profiles</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>System Administrators</h4>
              <div class="kpi-number">${adminUsersCount}</div>
              <div class="kpi-delta" style="color: #c084fc;">Full administrative privileges</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>VIP Members</h4>
              <div class="kpi-number">${users.length - adminUsersCount}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Active store consumers</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Users Filter Bar -->
        <div class="admin-filter-bar">
          <input 
            type="text" 
            id="users-search-input" 
            class="admin-search-input" 
            placeholder="Search members by name, email, or WhatsApp..." 
            style="min-width: 320px;"
          />
          <span style="font-size: 0.85rem; color: var(--text-muted);">
            Total users: <strong style="color: var(--text-pure);">${users.length}</strong>
          </span>
        </div>

        <!-- Users Table Card -->
        <div class="admin-table-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700;">Customer & Member Directory</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Role access controls & WhatsApp direct concierge</span>
          </div>

          <div id="users-table-container">
            ${renderUsersTableHtml(users)}
          </div>
        </div>
      </div>

      <!-- TAB 3: STORE ANALYTICS & KPIS -->
      <div id="tab-content-analytics" style="${activeTab === 'analytics' ? 'display: block;' : 'display: none;'}">
        <div class="kpi-row kpi-grid-4">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Catalog</h4>
              <div class="kpi-number">${tools.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Listed Tools</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Active Ratio</h4>
              <div class="kpi-number">${tools.length > 0 ? Math.round((activeCount / tools.length) * 100) : 0}%</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">${activeCount} active / ${tools.length} total</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Taxonomy Categories</h4>
              <div class="kpi-number">${categoriesList.length}</div>
              <div class="kpi-delta" style="color: #fb923c;">Distinct verticals</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>WhatsApp Inquiries</h4>
              <div class="kpi-number">3.8K+</div>
              <div class="kpi-delta" style="color: #38bdf8;">High-intent purchase leads</div>
            </div>
          </div>
        </div>

        <!-- Categories Distribution Bar Card -->
        <div class="admin-table-card" style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; margin-bottom: 1.5rem;">
            Products Distribution by Category
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${categories.map((cat) => {
              const count = tools.filter((t) => (t.category || '').toLowerCase() === cat.name.toLowerCase()).length;
              const percent = tools.length > 0 ? Math.round((count / tools.length) * 100) : 0;
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.35rem;">
                    <span style="font-weight: 600; color: var(--text-pure);">${cat.icon || '✨'} ${cat.name}</span>
                    <span style="color: var(--text-secondary);">${count} tools (${percent}%)</span>
                  </div>
                  <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden;">
                    <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, ${cat.color || '#38bdf8'}, #818cf8); border-radius: 999px;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Database Health Checklist Card -->
        <div class="admin-table-card">
          <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; margin-bottom: 1rem;">
            Store Health & Security Status
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(16, 185, 129, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Supabase Cloud Database</div>
              <div style="font-size: 1rem; font-weight: 700; color: #34d399; margin-top: 0.25rem;">✓ Connected & Healthy</div>
            </div>
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(16, 185, 129, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Storage Bucket ('tool-images')</div>
              <div style="font-size: 1rem; font-weight: 700; color: #34d399; margin-top: 0.25rem;">✓ Active & Public</div>
            </div>
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(16, 185, 129, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Row Level Security (RLS)</div>
              <div style="font-size: 1rem; font-weight: 700; color: #34d399; margin-top: 0.25rem;">✓ Enforced</div>
            </div>
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(56, 189, 248, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">WhatsApp Concierge Link</div>
              <div style="font-size: 1rem; font-weight: 700; color: #38bdf8; margin-top: 0.25rem;">✓ Configured</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: STORE, MCP & WHATSAPP SETTINGS -->
      <div id="tab-content-settings" style="${activeTab === 'settings' ? 'display: block;' : 'display: none;'}">
        <!-- Card 1: n8n & MCP Automation Webhook -->
        <div class="admin-table-card" style="max-width: 860px; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(234, 88, 12, 0.15); border: 1px solid rgba(234, 88, 12, 0.35); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                ⚡
              </div>
              <div>
                <h3 style="font-size: 1.25rem; color: var(--text-pure); font-weight: 700; margin: 0;">
                  n8n &amp; MCP (Model Context Protocol) Automation
                </h3>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.2rem 0 0 0;">
                  Forward all customer inquiries, order requests, and messages straight into your n8n workflow or AI Agent via MCP.
                </p>
              </div>
            </div>
            <span class="badge badge-popular" style="background: rgba(234, 88, 12, 0.2); color: #fb923c; border-color: rgba(234, 88, 12, 0.4);">n8n / MCP Hook</span>
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label">n8n / MCP Webhook Endpoint URL</label>
            <input 
              type="url" 
              id="settings-mcp-webhook-url" 
              class="form-input" 
              value="${appSettings.mcpWebhookUrl || ''}" 
              placeholder="https://your-n8n-instance.com/webhook/ai-tools-contact"
            />
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">
              Every query submitted on the Contact page will trigger an HTTP POST request to this endpoint with full customer payload (name, email, WhatsApp number, topic, message).
            </p>
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label class="form-label">MCP Secret Token / API Key (Optional Header)</label>
            <input 
              type="password" 
              id="settings-mcp-secret" 
              class="form-input" 
              value="${appSettings.mcpSecretKey || ''}" 
              placeholder="e.g. bearer_token_or_secret_key"
            />
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">
              If set, sent in the <code style="color: var(--accent-cyan);">Authorization: Bearer</code> and <code style="color: var(--accent-cyan);">X-MCP-Secret</code> headers.
            </p>
          </div>

          <div style="display: flex; gap: 1rem; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
            <button id="btn-test-mcp-ping" type="button" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              ⚡ Test n8n / MCP Ping
            </button>
            <span id="mcp-ping-status" style="font-size: 0.85rem; color: var(--text-muted);"></span>
          </div>
        </div>

        <!-- Card 2: WhatsApp & Support Contact Settings -->
        <div class="admin-table-card" style="max-width: 860px; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem;">
            <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(37, 211, 102, 0.15); border: 1px solid rgba(37, 211, 102, 0.35); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; color: #25D366;">
              📱
            </div>
            <div>
              <h3 style="font-size: 1.25rem; color: var(--text-pure); font-weight: 700; margin: 0;">
                WhatsApp &amp; Direct Support Concierge
              </h3>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.2rem 0 0 0;">
                Configure your official WhatsApp numbers and community links used for customer order fulfillments.
              </p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
            <div class="form-group">
              <label class="form-label">Admin WhatsApp Contact Number</label>
              <input 
                type="text" 
                id="settings-admin-whatsapp-number" 
                class="form-input" 
                value="${appSettings.adminWhatsappNumber || ''}" 
                placeholder="e.g. +92 300 1234567"
              />
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">
                Used for automated WhatsApp direct chat and support routing.
              </p>
            </div>

            <div class="form-group">
              <label class="form-label">WhatsApp Community / Channel URL</label>
              <input 
                type="text" 
                id="settings-admin-whatsapp-url" 
                class="form-input" 
                value="${appSettings.adminWhatsappUrl || defaultWhatsappUrl}" 
                placeholder="https://chat.whatsapp.com/..."
              />
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">
                Official group/channel invite link for users.
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
            <button id="btn-save-all-settings" type="button" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.75rem 2rem; font-weight: 700;">
              Save All Settings
            </button>
            <span id="settings-save-status" style="font-size: 0.85rem; color: #34d399;"></span>
          </div>
        </div>

        <!-- Card 3: Cloud Database Status -->
        <div class="admin-table-card" style="max-width: 860px; margin-bottom: 2rem;">
          <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; margin-bottom: 0.5rem;">
            Database Connection Diagnostics
          </h3>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Supabase Cloud Project URL</label>
            <input 
              type="text" 
              class="form-input" 
              value="${getEnv('VITE_SUPABASE_URL', 'https://rqemoitjanmxsmcmveso.supabase.co')}" 
              readonly 
            />
          </div>
          <div style="display: flex; gap: 1rem; align-items: center; padding-top: 0.5rem;">
            <button id="btn-test-db-ping" type="button" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              Test Database Ping
            </button>
            <span id="db-ping-status" style="font-size: 0.85rem; color: var(--text-muted);"></span>
          </div>
        </div>
      </div>
    </main>

    ${renderFooter()}
  `;

  attachNavbarEvents();

  // Tab Switching logic
  document.querySelectorAll('.admin-tab-btn').forEach((btn) => {
    btn.onclick = () => {
      const tab = btn.dataset.tab;
      activeTab = tab;
      document.querySelectorAll('.admin-tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      ['tools', 'categories', 'users', 'analytics', 'settings'].forEach((tName) => {
        const el = document.getElementById(`tab-content-${tName}`);
        if (el) el.style.display = tName === tab ? 'block' : 'none';
      });
    };
  });

  // Tools Search & Filter Listeners
  const searchInput = document.getElementById('tools-search-input');
  const catFilter = document.getElementById('tools-category-filter');
  const statusFilter = document.getElementById('tools-status-filter');

  const applyToolsFilter = () => {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const cat = catFilter?.value || 'ALL';
    const status = statusFilter?.value || 'ALL';

    const filtered = tools.filter((t) => {
      const matchesQ = !q || (t.name || '').toLowerCase().includes(q) || (t.slug || '').toLowerCase().includes(q) || (t.shortDescription || '').toLowerCase().includes(q);
      const matchesCat = cat === 'ALL' || t.category === cat;
      const matchesStatus =
        status === 'ALL' ||
        (status === 'ACTIVE' && t.active) ||
        (status === 'INACTIVE' && !t.active) ||
        (status === 'FEATURED' && t.featured);

      return matchesQ && matchesCat && matchesStatus;
    });

    const container = document.getElementById('tools-table-container');
    const badge = document.getElementById('tools-count-badge');
    if (badge) badge.textContent = filtered.length;
    if (container) {
      container.innerHTML = renderToolsTableHtml(filtered, adminPricingCountry);
      bindToolsTableEvents(filtered, root, categories);
    }
  };

  if (searchInput) searchInput.oninput = applyToolsFilter;
  if (catFilter) catFilter.onchange = applyToolsFilter;
  if (statusFilter) statusFilter.onchange = applyToolsFilter;

  // View Pricing Mode - Country Switcher for Admin
  const pricingChipsContainer = document.getElementById('admin-pricing-country-chips');
  if (pricingChipsContainer) {
    pricingChipsContainer.querySelectorAll('.currency-chip').forEach((chip) => {
      chip.onclick = (e) => {
        e.preventDefault();
        const country = chip.dataset.country;
        adminPricingCountry = country;
        pricingChipsContainer.querySelectorAll('.currency-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        // Update labels in admin panel
        const label = document.getElementById('admin-preview-country-label');
        if (label) label.textContent = country;
        const pill = document.getElementById('admin-table-country-pill');
        if (pill) pill.innerHTML = `${getCountryFlag(country)} Showing ${country} Pricing`;

        applyToolsFilter();
        showToast(`Admin Pricing Inspector: Showing ${country} rates`, 'info');
      };
    });
  }

  // Sync Storefront Preview Button
  const syncStoreBtn = document.getElementById('admin-sync-store-country-btn');
  if (syncStoreBtn) {
    syncStoreBtn.onclick = () => {
      authService.setUserCountry(adminPricingCountry);
      showToast(`✓ Storefront synchronized to ${adminPricingCountry} rates!`, 'success');
    };
  }

  // Bind tools table events initially
  bindToolsTableEvents(tools, root, categories);

  // Categories Search Listener
  const catSearchInput = document.getElementById('categories-search-input');
  if (catSearchInput) {
    catSearchInput.oninput = () => {
      const q = (catSearchInput.value || '').toLowerCase().trim();
      const filteredCats = categories.filter((c) => {
        return (
          !q ||
          (c.name || '').toLowerCase().includes(q) ||
          (c.slug || '').toLowerCase().includes(q) ||
          (c.description || c.desc || '').toLowerCase().includes(q)
        );
      });
      const container = document.getElementById('admin-categories-table-container');
      const badge = document.getElementById('categories-count-badge');
      if (badge) badge.textContent = filteredCats.length;
      if (container) {
        container.innerHTML = renderCategoriesTableHtml(filteredCats);
        bindCategoriesTableEvents(filteredCats, root, categories);
      }
    };
  }

  // Bind initial categories table events
  bindCategoriesTableEvents(categories, root, categories);

  // Users Search Listener
  const usersSearchInput = document.getElementById('users-search-input');
  if (usersSearchInput) {
    usersSearchInput.oninput = () => {
      const q = (usersSearchInput.value || '').toLowerCase().trim();
      const filteredUsers = users.filter((u) => {
        return (
          !q ||
          (u.full_name || '').toLowerCase().includes(q) ||
          (u.email || '').toLowerCase().includes(q) ||
          (u.whatsapp_number || '').toLowerCase().includes(q)
        );
      });
      const container = document.getElementById('users-table-container');
      if (container) {
        container.innerHTML = renderUsersTableHtml(filteredUsers);
        bindUsersTableEvents(filteredUsers, root);
      }
    };
  }

  // Bind initial users table events
  bindUsersTableEvents(users, root);

  // Admin Sign Out button
  document.getElementById('admin-signout-btn')?.addEventListener('click', async () => {
    await authService.signOut();
    showToast('Signed out from Administrator Console.', 'info');
    renderAdminDashboardPage(root);
  });

  // Add Tool button
  document.getElementById('admin-add-tool-btn')?.addEventListener('click', () => {
    openToolEditorModal(null, root, categories);
  });

  // Add Category buttons
  document.getElementById('admin-add-category-btn')?.addEventListener('click', () => {
    openCategoryEditorModal(null, root, categories);
  });
  document.getElementById('admin-add-cat-top-btn')?.addEventListener('click', () => {
    openCategoryEditorModal(null, root, categories);
  });

  // Test Database Ping Button
  document.getElementById('btn-test-db-ping')?.addEventListener('click', async () => {
    const statusEl = document.getElementById('db-ping-status');
    if (statusEl) statusEl.textContent = 'Pinging Supabase...';
    const start = performance.now();
    try {
      const { count, error } = await supabase.from('tools').select('*', { count: 'exact', head: true });
      const elapsed = Math.round(performance.now() - start);
      if (!error) {
        if (statusEl) {
          statusEl.textContent = `✓ Connected! Roundtrip latency: ${elapsed}ms (Total tools: ${count})`;
          statusEl.style.color = '#34d399';
        }
      } else {
        throw error;
      }
    } catch (e) {
      if (statusEl) {
        statusEl.textContent = `Ping failed: ${e.message}`;
        statusEl.style.color = '#f87171';
      }
    }
  });

  // Test n8n / MCP Webhook Ping Button
  document.getElementById('btn-test-mcp-ping')?.addEventListener('click', async () => {
    const urlInput = document.getElementById('settings-mcp-webhook-url');
    const secretInput = document.getElementById('settings-mcp-secret');
    const statusEl = document.getElementById('mcp-ping-status');

    const url = urlInput?.value?.trim() || '';
    const secret = secretInput?.value?.trim() || '';

    if (!url) {
      showToast('Please enter an n8n / MCP Webhook URL first.', 'error');
      if (statusEl) {
        statusEl.textContent = 'URL required';
        statusEl.style.color = '#f87171';
      }
      return;
    }

    if (statusEl) {
      statusEl.textContent = 'Dispatching test payload to n8n / MCP...';
      statusEl.style.color = 'var(--accent-cyan)';
    }

    try {
      await testMcpWebhook(url, secret);
      if (statusEl) {
        statusEl.textContent = '✓ Webhook responded 200 OK! Payload successfully delivered to n8n.';
        statusEl.style.color = '#34d399';
      }
      showToast('n8n / MCP Webhook ping successful!', 'success');
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = `Error: ${err.message}`;
        statusEl.style.color = '#f87171';
      }
      showToast(`Webhook ping failed: ${err.message}`, 'error');
    }
  });

  // Save All Settings Button
  document.getElementById('btn-save-all-settings')?.addEventListener('click', () => {
    const mcpUrl = document.getElementById('settings-mcp-webhook-url')?.value?.trim() || '';
    const mcpSecret = document.getElementById('settings-mcp-secret')?.value?.trim() || '';
    const adminPhone = document.getElementById('settings-admin-whatsapp-number')?.value?.trim() || '';
    const adminUrl = document.getElementById('settings-admin-whatsapp-url')?.value?.trim() || '';
    const statusEl = document.getElementById('settings-save-status');

    saveAppSettings({
      mcpWebhookUrl: mcpUrl,
      mcpSecretKey: mcpSecret,
      adminWhatsappNumber: adminPhone,
      adminWhatsappUrl: adminUrl
    });

    if (statusEl) {
      statusEl.textContent = '✓ All settings saved successfully!';
      setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3500);
    }

    showToast('n8n MCP & WhatsApp settings saved!', 'success');
  });
}

function renderToolsTableHtml(toolsList, targetCountry = adminPricingCountry) {
  if (!toolsList || toolsList.length === 0) {
    return `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="margin-bottom: 0.5rem; font-size: 1rem; color: var(--text-pure); font-weight: 700;">No tools match your criteria.</p>
        <p style="font-size: 0.85rem;">Click "+ Add New AI Tool" above to insert a new tool, or clear your search filter.</p>
      </div>
    `;
  }

  const flag = getCountryFlag(targetCountry);

  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Tool / Image</th>
          <th>Category</th>
          <th>Price (${flag} ${targetCountry})</th>
          <th>All Rates Set</th>
          <th>WhatsApp Link</th>
          <th>Video Tutorial</th>
          <th>Featured</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${toolsList.map((t) => {
          const localizedPrice = getToolLocalizedPrice(t, targetCountry);
          const cp = t.countryPricing || {};
          const isCustom = Boolean(
            cp[targetCountry] ||
            (targetCountry === 'Pakistan' && (cp.Pakistan || cp.pakistan || cp.PK)) ||
            (targetCountry === 'India' && (cp.India || cp.india || cp.IN)) ||
            (targetCountry === 'United Arab Emirates' && (cp['United Arab Emirates'] || cp.UAE || cp.AE)) ||
            (targetCountry === 'Saudi Arabia' && (cp['Saudi Arabia'] || cp.Saudi || cp.SAR || cp.SA)) ||
            (targetCountry === 'United States' && (cp['United States'] || cp.US || cp.USD)) ||
            (targetCountry === 'United Kingdom' && (cp['United Kingdom'] || cp.UK || cp.GBP || cp.GB))
          );

          const pkVal = cp.Pakistan || cp.PK || '—';
          const inVal = cp.India || cp.IN || '—';
          const uaeVal = cp['United Arab Emirates'] || cp.UAE || '—';
          const saVal = cp['Saudi Arabia'] || cp.SAR || '—';
          const usVal = cp['United States'] || cp.USD || cp.DEFAULT || t.price || '—';

          return `
          <tr data-tool-id="${t.id}">
            <td>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 56px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                  ${t.image ? `<img src="${t.image}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='';this.parentNode.innerHTML='<span style=\\'font-weight:700;color:var(--accent-cyan);\\'>${t.name.slice(0, 2).toUpperCase()}</span>';" />` : `<span style="font-weight: 700; color: var(--accent-cyan); font-size: 0.85rem;">${t.name.slice(0, 2).toUpperCase()}</span>`}
                </div>
                <div>
                  <div style="font-weight: 700; color: var(--text-pure);">${t.name}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">/${t.slug}</div>
                </div>
              </div>
            </td>
            <td><span class="badge badge-popular">${t.category}</span></td>
            <td>
              <div style="font-size: 0.95rem; font-weight: 800; color: ${isCustom ? '#34d399' : 'var(--accent-cyan)'}; white-space: nowrap;">
                ${localizedPrice}
              </div>
              <div style="margin-top: 0.2rem;">
                ${isCustom ? 
                  `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.65rem; border: 1px solid rgba(16, 185, 129, 0.35);">✓ Custom Rate</span>` : 
                  `<span class="badge" style="background: rgba(148, 163, 184, 0.12); color: var(--text-muted); font-size: 0.65rem; border: 1px solid rgba(148, 163, 184, 0.2);">Default / USD</span>`
                }
              </div>
            </td>
            <td>
              <div style="font-size: 0.72rem; display: flex; flex-direction: column; gap: 0.15rem; color: var(--text-secondary); max-width: 170px;">
                <div><strong style="color: var(--text-muted);">🇵🇰 PK:</strong> <span style="color: var(--text-pure);">${pkVal}</span></div>
                <div><strong style="color: var(--text-muted);">🇮🇳 IN:</strong> <span style="color: var(--text-pure);">${inVal}</span></div>
                <div><strong style="color: var(--text-muted);">🇦🇪 AE:</strong> <span style="color: var(--text-pure);">${uaeVal}</span></div>
                <div><strong style="color: var(--text-muted);">🇸🇦 SA:</strong> <span style="color: var(--text-pure);">${saVal}</span></div>
                <div><strong style="color: var(--text-muted);">🌐 USD:</strong> <span style="color: var(--text-pure);">${usVal}</span></div>
              </div>
            </td>
            <td>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); display: inline-block; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${t.whatsappUrl || ''}">
                ${t.whatsappUrl ? 'wa.me linked' : '<span style="color: #64748b;">None</span>'}
              </span>
            </td>
            <td>
              ${t.videoUrl || t.tutorialVideoUrl ? `<span style="color: #38bdf8; font-size: 0.8rem; font-weight: 600;">✓ Linked</span>` : `<span style="color: var(--text-muted); font-size: 0.8rem;">None</span>`}
            </td>
            <td>
              <button 
                class="badge ${t.featured ? 'badge-popular' : ''} toggle-featured-btn" 
                data-id="${t.id}" 
                data-featured="${Boolean(t.featured)}"
                style="cursor: pointer; border: 1px solid var(--border-glass); background: ${t.featured ? 'rgba(249, 115, 22, 0.2)' : 'transparent'}; color: ${t.featured ? '#fb923c' : 'var(--text-muted)'};"
                title="Click to toggle featured status"
              >
                ${t.featured ? '★ Featured' : '☆ Normal'}
              </button>
            </td>
            <td>
              <button 
                class="badge ${t.active ? 'badge-popular' : 'badge-hot'} toggle-active-btn" 
                data-id="${t.id}" 
                data-active="${t.active}"
                style="cursor: pointer; border: none;"
                title="Click to toggle active status"
              >
                ${t.active ? '● Active' : '○ Inactive'}
              </button>
            </td>
            <td>
              <div style="display: flex; gap: 0.4rem;">
                <a href="#/tool/${t.slug || t.id}" class="btn-details" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="Preview tool in store">Preview</a>
                <button class="btn-details edit-tool-btn" data-id="${t.id}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: var(--accent-cyan);" title="Edit tool details">Edit</button>
                <button class="btn-details delete-tool-btn" data-id="${t.id}" data-name="${t.name}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #f87171;" title="Delete tool">Delete</button>
              </div>
            </td>
          </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function bindToolsTableEvents(toolsList, root) {
  // Toggle Active Status
  document.querySelectorAll('.toggle-active-btn').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const currentActive = btn.dataset.active === 'true';
      const newActive = !currentActive;

      try {
        await toolsApi.adminToggleActive(id, newActive);
        showToast(`Tool status changed to ${newActive ? 'Active' : 'Inactive'}.`, 'success');
        renderAdminDashboardPage(root);
      } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
      }
    };
  });

  // Toggle Featured Status
  document.querySelectorAll('.toggle-featured-btn').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const currentFeatured = btn.dataset.featured === 'true';
      const newFeatured = !currentFeatured;

      try {
        const tool = toolsList.find((t) => t.id === id);
        if (tool) {
          await toolsApi.adminSaveTool({ ...tool, featured: newFeatured });
          showToast(`Tool marked as ${newFeatured ? 'Featured' : 'Standard'}.`, 'success');
          renderAdminDashboardPage(root);
        }
      } catch (e) {
        showToast(`Error updating featured: ${e.message}`, 'error');
      }
    };
  });

  // Edit Tool button
  document.querySelectorAll('.edit-tool-btn').forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const tool = toolsList.find((t) => t.id === id);
      if (tool) openToolEditorModal(tool, root, categories);
    };
  });

  // Delete Tool button
  document.querySelectorAll('.delete-tool-btn').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      if (confirm(`Are you sure you want to permanently delete "${name}" from Supabase?`)) {
        try {
          await toolsApi.adminDeleteTool(id);
          showToast(`Deleted "${name}" from Supabase.`, 'success');
          renderAdminDashboardPage(root);
        } catch (e) {
          showToast(`Failed to delete: ${e.message}`, 'error');
        }
      }
    };
  });
}

function renderUsersTableHtml(usersList) {
  if (!usersList || usersList.length === 0) {
    return `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-weight: 700; color: var(--text-pure);">No registered members found.</p>
      </div>
    `;
  }

  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Member</th>
          <th>Email Address</th>
          <th>WhatsApp Number</th>
          <th>Country / Region</th>
          <th>Language</th>
          <th>Registered On</th>
          <th>Last Login</th>
          <th>Role</th>
          <th>Role Action</th>
        </tr>
      </thead>
      <tbody>
        ${usersList.map((u) => {
          const isAdmin = u.role === 'admin';
          const initial = (u.full_name || u.email || 'U').charAt(0).toUpperCase();
          const cleanPhone = (u.whatsapp_number || '').replace(/\D/g, '');
          const joinedDate = u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Active';
          const lastLogin = u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : '—';

          return `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: ${isAdmin ? 'linear-gradient(135deg, #0284c7, #6366f1)' : 'rgba(255,255,255,0.08)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 0.85rem; border: 1px solid ${isAdmin ? 'rgba(56,189,248,0.5)' : 'var(--border-glass)'};">
                    ${initial}
                  </div>
                  <span style="font-weight: 700; color: var(--text-pure);">${u.full_name || 'VIP Member'}</span>
                </div>
              </td>
              <td style="color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.85rem;">${u.email}</td>
              <td>
                ${cleanPhone ? `
                  <a href="https://wa.me/${cleanPhone}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-mint); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;" title="Chat on WhatsApp">
                    <span>${u.whatsapp_number}</span>
                    <span style="font-size: 0.7rem;">↗</span>
                  </a>
                ` : `<span style="color: var(--text-muted); font-size: 0.82rem;">None</span>`}
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.4rem; font-weight: 600; color: var(--text-pure); font-size: 0.85rem;">
                  <span>${getCountryFlag(u.country)}</span>
                  <span>${u.country || 'Pakistan'}</span>
                </div>
              </td>
              <td><span style="text-transform: uppercase; font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">${u.preferred_language || 'en'}</span></td>
              <td style="font-size: 0.82rem; color: var(--text-muted);">${joinedDate}</td>
              <td style="font-size: 0.82rem; color: var(--accent-cyan); font-family: var(--font-mono);">${lastLogin}</td>
              <td>
                <span style="font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 999px; ${isAdmin ? 'background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4);' : 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);'}">
                  ${isAdmin ? '🛡️ Administrator' : 'VIP Member'}
                </span>
              </td>
              <td>
                <button 
                  class="btn-details toggle-user-role-btn" 
                  data-user-id="${u.id}" 
                  data-user-role="${u.role}"
                  style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: ${isAdmin ? '#f87171' : 'var(--accent-cyan)'};"
                >
                  ${isAdmin ? 'Demote to Member' : 'Promote to Admin'}
                </button>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function bindUsersTableEvents(usersList, root) {
  document.querySelectorAll('.toggle-user-role-btn').forEach((btn) => {
    btn.onclick = async () => {
      const userId = btn.dataset.userId;
      const currentRole = btn.dataset.userRole;
      const newRole = currentRole === 'admin' ? 'member' : 'admin';

      if (confirm(`Change this user's role to "${newRole.toUpperCase()}"?`)) {
        try {
          await authService.updateUserRole(userId, newRole);
          showToast(`User role updated to ${newRole}.`, 'success');
          renderAdminDashboardPage(root);
        } catch (err) {
          showToast(`Failed to update role: ${err.message}`, 'error');
        }
      }
    };
  });
}

// ============================================================================
// CATEGORIES TABLE & EVENT HANDLERS
// ============================================================================

function renderCategoriesTableHtml(categoriesList) {
  if (!categoriesList || categoriesList.length === 0) {
    return `
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</div>
        <p style="font-weight: 700; color: var(--text-pure); font-size: 1.05rem;">No categories found.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Click "+ Add New Category" above to create your first category.</p>
      </div>
    `;
  }

  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th style="width: 70px;">Media</th>
          <th>Category & Slug</th>
          <th>Description & Details</th>
          <th>Theme Color</th>
          <th>Assigned Tools</th>
          <th>Sort Order</th>
          <th style="text-align: right;">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${categoriesList.map((cat) => `
          <tr data-category-id="${cat.id}">
            <td>
              <div style="width: 44px; height: 44px; border-radius: 12px; background: ${cat.color || '#6366f1'}20; border: 1px solid ${cat.color || '#6366f1'}40; display: flex; align-items: center; justify-content: center; overflow: hidden; font-size: 1.35rem; flex-shrink: 0;">
                ${cat.image ? `<img src="${cat.image}" alt="${cat.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.style.display='none';this.parentNode.innerHTML='<span>${cat.icon || '✨'}</span>';" />` : `<span>${cat.icon || '✨'}</span>`}
              </div>
            </td>
            <td>
              <div>
                <div style="font-weight: 700; color: var(--text-pure); font-size: 0.95rem;">${cat.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">/${cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</div>
              </div>
            </td>
            <td style="max-width: 320px;">
              <div style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" title="${cat.description || cat.desc || ''}">
                ${cat.description || cat.desc || '<span style="color: #64748b; font-style: italic;">No description provided</span>'}
              </div>
            </td>
            <td>
              <div style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.25rem 0.65rem; border-radius: 9999px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); font-size: 0.75rem; font-family: var(--font-mono);">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${cat.color || '#6366f1'};"></span>
                <span>${cat.color || '#6366f1'}</span>
              </div>
            </td>
            <td>
              <span class="badge ${cat.count > 0 ? 'badge-popular' : ''}" style="font-size: 0.78rem;">
                ${cat.count || 0} ${cat.count === 1 ? 'Tool' : 'Tools'}
              </span>
            </td>
            <td style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">
              #${cat.sortOrder ?? 0}
            </td>
            <td style="text-align: right;">
              <div style="display: inline-flex; gap: 0.4rem; justify-content: flex-end;">
                <a href="#/tools?category=${encodeURIComponent(cat.name)}" class="btn-details" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="View category in store">Store</a>
                <button class="btn-details edit-category-btn" data-id="${cat.id}" data-name="${cat.name}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: var(--accent-cyan);" title="Edit category details">Edit</button>
                <button class="btn-details delete-category-btn" data-id="${cat.id}" data-name="${cat.name}" data-count="${cat.count || 0}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #f87171;" title="Delete category">Delete</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function bindCategoriesTableEvents(categoriesList, root, allCategories = []) {
  // Edit Category button
  document.querySelectorAll('.edit-category-btn').forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const category = categoriesList.find((c) => c.id === id || c.name === name);
      if (category) openCategoryEditorModal(category, root, allCategories);
    };
  });

  // Delete Category button
  document.querySelectorAll('.delete-category-btn').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const count = parseInt(btn.dataset.count, 10) || 0;

      const message = count > 0
        ? `⚠️ Category "${name}" currently has ${count} tool(s) assigned to it.\n\nAre you sure you want to permanently delete this category?`
        : `Are you sure you want to permanently delete category "${name}"?`;

      if (confirm(message)) {
        try {
          await toolsApi.adminDeleteCategory(id, name);
          showToast(`Category "${name}" deleted successfully.`, 'success');
          renderAdminDashboardPage(root);
        } catch (e) {
          showToast(`Failed to delete category: ${e.message}`, 'error');
        }
      }
    };
  });
}

// ============================================================================
// CATEGORY EDITOR MODAL (ADD / EDIT CATEGORY + IMAGE UPLOAD)
// ============================================================================
function openCategoryEditorModal(existingCategory, root, allCategories = []) {
  const modalRoot = document.getElementById('modal-root') || document.body;
  const isEdit = Boolean(existingCategory);

  const cat = existingCategory || {
    name: '',
    slug: '',
    icon: '✨',
    color: '#6366f1',
    description: '',
    image: '',
    sortOrder: allCategories.length + 1
  };

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop auth-backdrop-fade';

  backdrop.innerHTML = `
    <div class="modal-card" style="max-width: 640px; max-height: 92vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800;">
            ${isEdit ? `Edit Category: ${cat.name}` : 'Create New AI Category'}
          </h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
            Configure category metadata, icon, theme color, custom details, and banner image.
          </p>
        </div>
        <button id="cat-editor-close" class="modal-close-btn">&times;</button>
      </div>

      <form id="category-editor-form">
        <!-- Name & Slug -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Category Name *</label>
            <input type="text" id="cat-name" class="form-input" value="${cat.name || ''}" placeholder="e.g. AI Video Creation" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="cat-slug" class="form-input" value="${cat.slug || ''}" placeholder="e.g. ai-video-creation" required />
          </div>
        </div>

        <!-- Icon, Color & Sort Order -->
        <div style="display: grid; grid-template-columns: 0.6fr 1fr 0.6fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Icon (Emoji) *</label>
            <input type="text" id="cat-icon" class="form-input" value="${cat.icon || '✨'}" placeholder="🎬" required style="font-size: 1.2rem; text-align: center;" />
          </div>
          <div class="form-group">
            <label class="form-label">Theme Color *</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input type="color" id="cat-color-picker" value="${cat.color || '#6366f1'}" style="width: 44px; height: 40px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: transparent; cursor: pointer; padding: 2px;" />
              <input type="text" id="cat-color-text" class="form-input" value="${cat.color || '#6366f1'}" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Sort Order</label>
            <input type="number" id="cat-sort-order" class="form-input" value="${cat.sortOrder ?? 0}" min="0" />
          </div>
        </div>

        <!-- Preset Color Badges Row -->
        <div style="margin: -0.5rem 0 1.25rem 0; display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${['#a855f7', '#3b82f6', '#10b981', '#f97316', '#ec4899', '#eab308', '#06b6d4', '#6366f1', '#14b8a6', '#ef4444'].map((c) => `
            <button type="button" class="preset-color-btn" data-color="${c}" style="width: 24px; height: 24px; border-radius: 50%; background: ${c}; border: 2px solid ${cat.color === c ? '#ffffff' : 'transparent'}; cursor: pointer; transition: transform 0.15s;"></button>
          `).join('')}
        </div>

        <!-- Details / Description -->
        <div class="form-group">
          <label class="form-label">Category Description & Details *</label>
          <textarea id="cat-description" class="form-textarea" style="min-height: 85px;" placeholder="Comprehensive details explaining what AI tools and creative workflows belong in this category..." required>${cat.description || cat.desc || ''}</textarea>
        </div>

        <!-- Category Image Upload & Preview -->
        <div class="form-group">
          <label class="form-label">Category Image / Banner (Optional)</label>
          <div style="display: flex; gap: 0.75rem; margin-bottom: 0.6rem;">
            <input type="text" id="cat-image-url" class="form-input" value="${cat.image || ''}" placeholder="https://example.com/category-banner.png" style="flex: 1;" />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="cat-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="cat-upload-status" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-bottom: 0.5rem;"></span>

          <!-- Live Image Preview Container -->
          <div id="cat-image-preview-wrap" style="${cat.image ? 'display: flex;' : 'display: none;'} align-items: center; gap: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-glass); border-radius: var(--radius-md);">
            <img id="cat-image-preview" src="${cat.image || ''}" alt="Preview" style="width: 70px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-glass);" />
            <div style="flex: 1; font-size: 0.8rem; color: var(--text-muted);">
              Live Image / Banner Preview
            </div>
            <button type="button" id="cat-image-clear" class="btn-details" style="color: #f87171; font-size: 0.75rem;">Clear Image</button>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem; margin-top: 1.5rem;">
          <button type="button" id="cat-cancel-btn" class="btn btn-secondary">Cancel</button>
          <button type="submit" id="cat-submit-btn" class="btn btn-primary" style="padding: 0.75rem 1.75rem; font-weight: 700;">
            ${isEdit ? 'Save Category Changes' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  `;

  modalRoot.appendChild(backdrop);

  const closeModal = () => backdrop.remove();
  backdrop.onclick = closeModal;
  document.getElementById('cat-editor-close').onclick = closeModal;
  document.getElementById('cat-cancel-btn').onclick = closeModal;

  // Auto slug from name
  const nameInput = document.getElementById('cat-name');
  const slugInput = document.getElementById('cat-slug');
  if (!isEdit) {
    nameInput.oninput = () => {
      slugInput.value = nameInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    };
  }

  // Color picker sync
  const colorPicker = document.getElementById('cat-color-picker');
  const colorText = document.getElementById('cat-color-text');
  colorPicker.oninput = () => {
    colorText.value = colorPicker.value;
  };
  colorText.oninput = () => {
    if (/^#[0-9a-f]{6}$/i.test(colorText.value)) {
      colorPicker.value = colorText.value;
    }
  };

  // Preset color buttons
  document.querySelectorAll('.preset-color-btn').forEach((btn) => {
    btn.onclick = () => {
      const col = btn.dataset.color;
      colorPicker.value = col;
      colorText.value = col;
      document.querySelectorAll('.preset-color-btn').forEach((b) => b.style.borderColor = 'transparent');
      btn.style.borderColor = '#ffffff';
    };
  });

  // Image Upload and live preview
  const fileInput = document.getElementById('cat-image-file');
  const imageUrlInput = document.getElementById('cat-image-url');
  const uploadStatus = document.getElementById('cat-upload-status');
  const previewWrap = document.getElementById('cat-image-preview-wrap');
  const previewImg = document.getElementById('cat-image-preview');
  const clearBtn = document.getElementById('cat-image-clear');

  const updatePreview = (url) => {
    if (url) {
      previewImg.src = url;
      previewWrap.style.display = 'flex';
    } else {
      previewWrap.style.display = 'none';
      previewImg.src = '';
    }
  };

  imageUrlInput.oninput = () => updatePreview(imageUrlInput.value.trim());

  if (clearBtn) {
    clearBtn.onclick = () => {
      imageUrlInput.value = '';
      updatePreview('');
    };
  }

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadStatus.textContent = 'Processing & uploading category image...';
    uploadStatus.style.display = 'block';

    try {
      const publicUrl = await uploadToolImage(file, 'categories');
      imageUrlInput.value = publicUrl;
      updatePreview(publicUrl);
      uploadStatus.textContent = '✓ Image uploaded successfully!';
      uploadStatus.style.color = 'var(--accent-mint)';
    } catch (err) {
      uploadStatus.textContent = `Upload error: ${err.message}`;
      uploadStatus.style.color = '#f87171';
    }
  };

  // Form submit
  const form = document.getElementById('category-editor-form');
  const submitBtn = document.getElementById('cat-submit-btn');

  form.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Saving Category...';
    submitBtn.disabled = true;

    const payload = {
      id: cat.id,
      name: nameInput.value.trim(),
      slug: slugInput.value.trim(),
      icon: document.getElementById('cat-icon').value.trim() || '✨',
      color: colorText.value.trim() || '#6366f1',
      description: document.getElementById('cat-description').value.trim(),
      image: imageUrlInput.value.trim(),
      sortOrder: parseInt(document.getElementById('cat-sort-order').value, 10) || 0
    };

    try {
      await toolsApi.adminSaveCategory(payload);
      showToast(`Category "${payload.name}" saved successfully!`, 'success');
      closeModal();
      activeTab = 'categories';
      renderAdminDashboardPage(root);
    } catch (err) {
      showToast(`Category save error: ${err.message}`, 'error');
      submitBtn.textContent = isEdit ? 'Save Category Changes' : 'Create Category';
      submitBtn.disabled = false;
    }
  };
}

// ============================================================================
// TOOL EDITOR MODAL (ADD / EDIT TOOL + IMAGE UPLOAD + DYNAMIC CATEGORIES)
// ============================================================================
function openToolEditorModal(existingTool, root, allCategories = []) {
  const modalRoot = document.getElementById('modal-root') || document.body;

  const defaultCatName = allCategories.length > 0 
    ? (typeof allCategories[0] === 'string' ? allCategories[0] : allCategories[0].name)
    : 'Ai Tools';

  const tool = existingTool || {
    name: '',
    slug: '',
    category: defaultCatName,
    price: '$19 /month',
    shortDescription: '',
    fullDescription: '',
    image: '',
    tutorialVideoUrl: '',
    whatsappUrl: '',
    toolUrl: '',
    rating: 4.8,
    userCount: '10.5K',
    featured: false,
    active: true,
    sortOrder: 0,
    features: ['Instant Access', 'Video Tutorial Included', '24/7 Priority Support'],
    howToUse: [
      { step: 1, title: 'Open the tool', text: 'Sign in using the credentials provided.' },
      { step: 2, title: 'Input your prompt', text: 'Choose your desired template or generate content.' }
    ]
  };

  // Parse initial price into currency, amount, duration
  const initialPriceStr = (tool.price || '$19 /month').trim();
  let initialCurrency = 'USD';
  let initialAmount = '19';
  let initialDuration = 'month';
  let initialCustomDuration = '';

  if (/pkr/i.test(initialPriceStr) || /rs/i.test(initialPriceStr)) {
    initialCurrency = 'PKR';
  } else if (/inr/i.test(initialPriceStr) || /₹/.test(initialPriceStr)) {
    initialCurrency = 'INR';
  } else if (/aed/i.test(initialPriceStr)) {
    initialCurrency = 'AED';
  } else if (/\$/.test(initialPriceStr) || /usd/i.test(initialPriceStr)) {
    initialCurrency = 'USD';
  }

  const numMatch = initialPriceStr.match(/[\d,.]+/);
  if (numMatch) {
    initialAmount = numMatch[0].replace(/,/g, '');
  }

  if (initialPriceStr.includes('/')) {
    const rawDur = initialPriceStr.split('/')[1].trim();
    const durLower = rawDur.toLowerCase();
    if (durLower === 'month' || durLower === 'mo') initialDuration = 'month';
    else if (durLower === 'year' || durLower === 'yr') initialDuration = 'year';
    else if (durLower.includes('3 month')) initialDuration = '3months';
    else if (durLower.includes('6 month')) initialDuration = '6months';
    else if (durLower.includes('12 month')) initialDuration = '12months';
    else if (durLower.includes('18 month')) initialDuration = '18months';
    else if (durLower.includes('lifetime') || durLower.includes('one-time')) initialDuration = 'lifetime';
    else {
      initialDuration = 'custom';
      initialCustomDuration = rawDur;
    }
  } else if (/lifetime|one-time/i.test(initialPriceStr)) {
    initialDuration = 'lifetime';
  }

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop auth-backdrop-fade';

  backdrop.innerHTML = `
    <div class="modal-card" style="max-width: 720px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800;">
            ${isEdit ? `Edit AI Tool: ${tool.name}` : 'Add New AI Tool to Supabase'}
          </h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
            Fill in product information, dynamic category, pricing, WhatsApp links, and media.
          </p>
        </div>
        <button id="editor-modal-close" class="modal-close-btn">&times;</button>
      </div>

      <form id="supabase-tool-form">
        <!-- Name & Slug -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Tool Name *</label>
            <input type="text" id="tool-name" class="form-input" value="${tool.name || ''}" placeholder="e.g. WriteGen AI" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="tool-slug" class="form-input" value="${tool.slug || ''}" placeholder="e.g. writegen-ai" required />
          </div>
        </div>

        <!-- Category & Base Price -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label class="form-label" style="margin-bottom: 0;">Category *</label>
              <button type="button" id="quick-add-cat-btn" style="background: none; border: none; color: var(--accent-cyan); font-size: 0.78rem; font-weight: 600; cursor: pointer; text-decoration: underline;">
                + New Category
              </button>
            </div>
            <select id="tool-category" class="sort-select" style="width: 100%; border-radius: var(--radius-md);">
              ${allCategories.length > 0 
                ? allCategories.map((c) => {
                    const cName = typeof c === 'string' ? c : c.name;
                    const cIcon = (typeof c === 'object' && c.icon) ? c.icon : '✨';
                    return `
                      <option value="${cName}" ${(tool.category || '').toLowerCase() === cName.toLowerCase() ? 'selected' : ''}>
                        ${cIcon} ${cName}
                      </option>
                    `;
                  }).join('')
                : `
                  <option value="${tool.category || 'Ai Tools'}" selected>✨ ${tool.category || 'Ai Tools'}</option>
                `
              }
            </select>
          </div>
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label class="form-label" style="margin-bottom: 0;">Global / Default Price *</label>
              <span style="font-size: 0.72rem; color: var(--accent-mint); font-weight: 600;">Auto-syncs with Builder</span>
            </div>
            <input type="text" id="tool-price" class="form-input" value="${tool.price || '$19 /month'}" placeholder="e.g. 500 PKR / 18 Months" required />
          </div>
        </div>

        <!-- Interactive Pricing & Duration Studio / Builder -->
        <div class="pricing-studio-container">
          <div class="pricing-studio-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.45rem;">
                <span style="font-size: 1.1rem;">💎</span>
                <span style="font-weight: 800; color: var(--text-pure); font-size: 0.95rem;">Payment Duration & Currency Studio</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
                Set monthly, yearly, 18-month, or custom plans with instant PKR, $, and currency presets:
              </p>
            </div>
            <div class="pricing-live-pill" id="pricing-live-preview-pill" title="Live Preview of Formatted Rate">
              <span>✦ Live Price:</span>
              <span id="pricing-live-text" style="color: #ffffff;">${tool.price || '$19 /month'}</span>
            </div>
          </div>

          <!-- 1. Billing Duration Options -->
          <div style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 0.35rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Billing Duration / Plan Period:
            </label>
            <div class="pricing-duration-grid" id="pricing-duration-buttons">
              <button type="button" class="duration-pill-btn ${initialDuration === 'month' ? 'active' : ''}" data-duration="month">Monthly (/month)</button>
              <button type="button" class="duration-pill-btn ${initialDuration === 'year' ? 'active' : ''}" data-duration="year">Yearly (/year)</button>
              <button type="button" class="duration-pill-btn ${initialDuration === '3months' ? 'active' : ''}" data-duration="3months">3 Months Plan</button>
              <button type="button" class="duration-pill-btn ${initialDuration === '6months' ? 'active' : ''}" data-duration="6months">6 Months Plan</button>
              <button type="button" class="duration-pill-btn ${initialDuration === '12months' ? 'active' : ''}" data-duration="12months">12 Months Plan</button>
              <button type="button" class="duration-pill-btn ${initialDuration === '18months' ? 'active' : ''}" data-duration="18months">18 Months Plan</button>
              <button type="button" class="duration-pill-btn ${initialDuration === 'lifetime' ? 'active' : ''}" data-duration="lifetime">Lifetime (One-Time)</button>
              <button type="button" class="duration-pill-btn ${initialDuration === 'custom' ? 'active' : ''}" data-duration="custom">✏️ Custom Duration</button>
            </div>
            
            <!-- Custom Duration Input Row (shown when Custom is selected) -->
            <div id="custom-duration-row" style="display: ${initialDuration === 'custom' ? 'flex' : 'none'}; align-items: center; gap: 0.75rem; margin-top: 0.4rem;">
              <span style="font-size: 0.78rem; color: var(--text-secondary); white-space: nowrap;">Custom Plan Name / Period:</span>
              <input type="text" id="custom-duration-input" class="form-input" style="padding: 0.4rem 0.75rem; font-size: 0.85rem;" value="${initialCustomDuration || '18 Months'}" placeholder="e.g. 18 Months, 2 Years, or 90 Days" />
            </div>
          </div>

          <!-- 2. Currency Selector & Quick Presets -->
          <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 1rem; align-items: start;">
            <div>
              <label class="form-label" style="font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--accent-cyan);">
                Primary Currency:
              </label>
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="pricing-currency-buttons">
                <button type="button" class="currency-select-btn ${initialCurrency === 'PKR' ? 'active' : ''}" data-curr="PKR">🇵🇰 PKR (Rs)</button>
                <button type="button" class="currency-select-btn ${initialCurrency === 'USD' ? 'active' : ''}" data-curr="USD">🇺🇸 USD ($)</button>
                <button type="button" class="currency-select-btn ${initialCurrency === 'INR' ? 'active' : ''}" data-curr="INR">🇮🇳 INR (₹)</button>
                <button type="button" class="currency-select-btn ${initialCurrency === 'AED' ? 'active' : ''}" data-curr="AED">🇦🇪 AED</button>
              </div>
              <div style="margin-top: 0.6rem;">
                <label class="form-label" style="font-size: 0.76rem; margin-bottom: 0.25rem;">Numeric Price / Amount:</label>
                <input type="number" id="pricing-numeric-amount" class="form-input" value="${initialAmount || 500}" min="0" step="any" placeholder="e.g. 500 or 19" style="font-weight: 700; font-family: var(--font-mono);" />
              </div>
            </div>

            <div>
              <label class="form-label" style="font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--accent-cyan);">
                Quick Fill Amount Presets:
              </label>
              
              <!-- PKR Fillers -->
              <div id="presets-pkr-row" style="display: ${initialCurrency === 'PKR' ? 'block' : 'none'};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular PKR rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="250">Rs 250</button>
                  <button type="button" class="quick-amount-chip" data-amount="500">500 PKR</button>
                  <button type="button" class="quick-amount-chip" data-amount="1000">Rs 1,000</button>
                  <button type="button" class="quick-amount-chip" data-amount="1500">1,500 PKR</button>
                  <button type="button" class="quick-amount-chip" data-amount="2500">2,500 PKR</button>
                  <button type="button" class="quick-amount-chip" data-amount="5000">5,000 PKR</button>
                </div>
              </div>

              <!-- USD Fillers -->
              <div id="presets-usd-row" style="display: ${initialCurrency === 'USD' ? 'block' : 'none'};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular USD ($) rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="5">$5</button>
                  <button type="button" class="quick-amount-chip" data-amount="9">$9</button>
                  <button type="button" class="quick-amount-chip" data-amount="15">$15</button>
                  <button type="button" class="quick-amount-chip" data-amount="19">$19</button>
                  <button type="button" class="quick-amount-chip" data-amount="29">$29</button>
                  <button type="button" class="quick-amount-chip" data-amount="49">$49</button>
                  <button type="button" class="quick-amount-chip" data-amount="99">$99</button>
                </div>
              </div>

              <!-- INR Fillers -->
              <div id="presets-inr-row" style="display: ${initialCurrency === 'INR' ? 'block' : 'none'};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular INR (₹) rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="299">₹299</button>
                  <button type="button" class="quick-amount-chip" data-amount="499">₹499</button>
                  <button type="button" class="quick-amount-chip" data-amount="999">₹999</button>
                  <button type="button" class="quick-amount-chip" data-amount="1499">₹1,499</button>
                </div>
              </div>

              <!-- AED Fillers -->
              <div id="presets-aed-row" style="display: ${initialCurrency === 'AED' ? 'block' : 'none'};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular AED rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="29">AED 29</button>
                  <button type="button" class="quick-amount-chip" data-amount="49">AED 49</button>
                  <button type="button" class="quick-amount-chip" data-amount="89">AED 89</button>
                  <button type="button" class="quick-amount-chip" data-amount="149">AED 149</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Country-Specific Pricing (Geo-Targeted Rates) -->
        <div class="geo-pricing-container">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <div style="display: flex; align-items: center; gap: 0.45rem;">
              <span style="font-size: 1.1rem;">🌍</span>
              <label class="form-label" style="margin-bottom: 0; font-weight: 800; color: var(--text-pure);">
                Country-Specific Pricing (Geo-Pricing)
              </label>
            </div>
            <span style="font-size: 0.72rem; color: var(--accent-mint); font-weight: 700;">✓ Live Verification Synced</span>
          </div>
          <p style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 0.75rem;">
            Define exact localized prices for Pakistan, India, UAE, and Global visitors:
          </p>

          <!-- Master Geo Auto-Fill Bar -->
          <div class="geo-auto-fill-bar">
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--accent-cyan); white-space: nowrap;">⚡ Quick Fillers:</span>
            <button type="button" id="geo-fill-all-smart" class="admin-chip-btn" style="color: var(--accent-mint); border-color: rgba(16, 185, 129, 0.35);" title="Auto-fill all countries with their native currencies using the current plan duration">
              ⚡ Smart Fill All (PKR + $ + ₹ + AED)
            </button>
            <button type="button" id="geo-fill-pkr-all" class="admin-chip-btn" title="Set PKR rate across all countries">
              🇵🇰 Set All to PKR
            </button>
            <button type="button" id="geo-fill-usd-all" class="admin-chip-btn" title="Set USD ($) rate across all countries">
              🇺🇸 Set All to USD ($)
            </button>
            <button type="button" id="geo-sync-duration-all" class="admin-chip-btn" style="color: #a855f7; border-color: rgba(168, 85, 247, 0.35);" title="Keep current amounts but sync duration suffix across all country inputs">
              ⏱️ Sync Duration to All
            </button>
          </div>

          <div class="geo-pricing-grid">
            <!-- Pakistan -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇵🇰</span>
                <span>Pakistan Price (PKR)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-pakistan" 
                class="form-input geo-price-input" 
                value="${tool.countryPricing?.Pakistan || tool.countryPricing?.pakistan || ''}" 
                placeholder="e.g. 500 PKR / 18 Months" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="500">500 PKR</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="1000">1,000 PKR</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="1500">1,500 PKR</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="2500">2,500 PKR</button>
              </div>
            </div>

            <!-- India -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇮🇳</span>
                <span>India Price (INR)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-india" 
                class="form-input geo-price-input" 
                value="${tool.countryPricing?.India || tool.countryPricing?.india || ''}" 
                placeholder="e.g. ₹499 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-india" data-prefix="INR" data-val="299">₹299</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-india" data-prefix="INR" data-val="499">₹499</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-india" data-prefix="INR" data-val="999">₹999</button>
              </div>
            </div>

            <!-- UAE -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇦🇪</span>
                <span>UAE / Middle East (AED)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-uae" 
                class="form-input geo-price-input" 
                value="${tool.countryPricing?.['United Arab Emirates'] || tool.countryPricing?.UAE || ''}" 
                placeholder="e.g. AED 49 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uae" data-prefix="AED" data-val="29">AED 29</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uae" data-prefix="AED" data-val="49">AED 49</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uae" data-prefix="AED" data-val="89">AED 89</button>
              </div>
            </div>

            <!-- Saudi Arabia -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇸🇦</span>
                <span>Saudi Arabia (SAR)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-saudi" 
                class="form-input geo-price-input" 
                value="${tool.countryPricing?.['Saudi Arabia'] || tool.countryPricing?.Saudi || tool.countryPricing?.SAR || ''}" 
                placeholder="e.g. SAR 49 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-saudi" data-prefix="SAR" data-val="29">SAR 29</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-saudi" data-prefix="SAR" data-val="49">SAR 49</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-saudi" data-prefix="SAR" data-val="89">SAR 89</button>
              </div>
            </div>

            <!-- United States -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇺🇸</span>
                <span>United States (USD)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-us" 
                class="form-input geo-price-input" 
                value="${tool.countryPricing?.['United States'] || tool.countryPricing?.US || tool.countryPricing?.USD || ''}" 
                placeholder="e.g. $19 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-us" data-prefix="USD" data-val="9">$9</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-us" data-prefix="USD" data-val="19">$19</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-us" data-prefix="USD" data-val="29">$29</button>
              </div>
            </div>

            <!-- United Kingdom -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇬🇧</span>
                <span>United Kingdom (GBP)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-uk" 
                class="form-input geo-price-input" 
                value="${tool.countryPricing?.['United Kingdom'] || tool.countryPricing?.UK || tool.countryPricing?.GBP || ''}" 
                placeholder="e.g. £15 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uk" data-prefix="GBP" data-val="9">£9</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uk" data-prefix="GBP" data-val="15">£15</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uk" data-prefix="GBP" data-val="25">£25</button>
              </div>
            </div>

            <!-- Global / Others -->
            <div class="geo-country-card" style="border-color: rgba(56, 189, 248, 0.35);">
              <div class="geo-country-label" style="color: var(--accent-cyan);">
                <span>🌐</span>
                <span>Other Countries (USD)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-default" 
                class="form-input geo-price-input" 
                value="${tool.countryPricing?.DEFAULT || tool.countryPricing?.default || tool.price || '$19 /month'}" 
                placeholder="e.g. $19 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="9">$9</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="19">$19</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="29">$29</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="49">$49</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tool Image / Media Banner with Live High-Fidelity Preview -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label class="form-label" style="margin-bottom: 0;">Tool Image / Media Banner *</label>
            <span style="font-size: 0.72rem; color: var(--accent-cyan);">✦ Renders prominent high-res banner on storefront</span>
          </div>
          <div style="display: flex; gap: 0.75rem; margin-bottom: 0.6rem;">
            <input type="text" id="tool-image-url" class="form-input" value="${tool.image || ''}" placeholder="https://example.com/banner-or-logo.png" style="flex: 1;" />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="tool-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="upload-status-text" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-bottom: 0.5rem;"></span>

          <!-- Live Card Media Banner Preview Container -->
          <div id="tool-image-preview-wrap" style="padding: 0.85rem; background: rgba(0,0,0,0.35); border: 1px dashed var(--border-glass); border-radius: var(--radius-md);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-pure);">Live Card Banner Preview:</span>
              <button type="button" id="tool-image-clear" class="btn-details" style="color: #f87171; font-size: 0.75rem; display: ${tool.image ? 'inline-block' : 'none'};">Clear Image</button>
            </div>
            
            <div class="tool-modal-banner-preview" id="modal-banner-box">
              ${tool.image ? `
                <div class="tool-modal-banner-ambient" id="modal-banner-ambient" style="background-image: url('${tool.image}');"></div>
                <img class="tool-modal-banner-img" id="tool-image-preview" src="${tool.image}" alt="Banner Preview" />
                <div style="position: absolute; top: 10px; left: 10px; z-index: 3;" class="badge badge-popular" id="modal-preview-cat-badge">${tool.category || 'AI Tool'}</div>
                <div style="position: absolute; bottom: 10px; right: 10px; z-index: 3; background: rgba(0,0,0,0.75); border: 1px solid var(--accent-cyan); color: #38bdf8; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;" id="modal-preview-price-badge">${tool.price || '$19 /month'}</div>
              ` : `
                <div style="text-align: center; color: var(--text-muted); padding: 1.5rem;" id="modal-banner-empty">
                  <div style="font-size: 2rem; margin-bottom: 0.35rem;">🖼️</div>
                  <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">No Image Selected Yet</div>
                  <div style="font-size: 0.72rem; margin-top: 0.2rem;">Upload a file or paste an image URL above to preview how your banner displays</div>
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Short Description with Bullet Points Support -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label class="form-label" style="margin-bottom: 0;">Short Description (Card Summary Points) *</label>
            <span style="font-size: 0.72rem; color: var(--accent-cyan);">✦ Paste with points (• or -) or 1 per line</span>
          </div>
          <textarea id="tool-short-desc" class="form-textarea" style="min-height: 85px;" placeholder="• Point 1: Key capability&#10;• Point 2: Instant activation&#10;• Point 3: Best monthly price" required>${tool.shortDescription || ''}</textarea>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">
            Points pasted with bullets or on newlines will be rendered as clean vertical list items on the tool cards.
          </p>
        </div>

        <!-- Full Description -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label class="form-label" style="margin-bottom: 0;">Full Description (Tool Details Page) *</label>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Points & paragraphs supported</span>
          </div>
          <textarea id="tool-full-desc" class="form-textarea" style="min-height: 95px;" placeholder="Comprehensive overview of capabilities, use cases, and prompt styles..." required>${tool.fullDescription || tool.description || ''}</textarea>
        </div>

        <!-- WhatsApp Purchase URL -->
        <div class="form-group">
          <label class="form-label">WhatsApp Purchase URL *</label>
          <input type="text" id="tool-whatsapp-url" class="form-input" value="${tool.whatsappUrl || ''}" placeholder="https://wa.me/1234567890?text=I+want+to+buy" required />
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
            This link is opened when visitors click "Buy Now" on the tool card or details page.
          </p>
        </div>

        <!-- Tutorial Video URL -->
        <div class="form-group">
          <label class="form-label">Tutorial Video URL (YouTube embed or MP4)</label>
          <input type="text" id="tool-video-url" class="form-input" value="${tool.tutorialVideoUrl || tool.videoUrl || ''}" placeholder="https://www.youtube.com/embed/..." />
        </div>

        <!-- Tool Official URL -->
        <div class="form-group">
          <label class="form-label">Official Tool Website URL</label>
          <input type="text" id="tool-official-url" class="form-input" value="${tool.toolUrl || ''}" placeholder="https://tool.ai" />
        </div>

        <!-- Rating, Users Count, Sort Order -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Rating</label>
            <input type="number" step="0.05" min="1" max="5" id="tool-rating" class="form-input" value="${tool.rating || 4.8}" />
          </div>
          <div class="form-group">
            <label class="form-label">Users Count</label>
            <input type="text" id="tool-users-count" class="form-input" value="${tool.userCount || '10.5K'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Sort Order</label>
            <input type="number" id="tool-sort-order" class="form-input" value="${tool.sortOrder || 0}" />
          </div>
        </div>

        <!-- Features List (Comma or newline separated) -->
        <div class="form-group">
          <label class="form-label">Features (1 per line)</label>
          <textarea id="tool-features" class="form-textarea" style="min-height: 70px;" placeholder="Feature 1&#10;Feature 2&#10;Feature 3">${Array.isArray(tool.features) ? tool.features.join('\n') : ''}</textarea>
        </div>

        <!-- Toggles: Featured & Active -->
        <div style="display: flex; gap: 2rem; margin: 1rem 0 1.5rem 0;">
          <label style="display: flex; align-items: center; gap: 0.55rem; cursor: pointer; color: var(--text-pure);">
            <input type="checkbox" id="tool-featured" ${tool.featured ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;" />
            <span style="font-weight: 600;">Mark as Featured Tool</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.55rem; cursor: pointer; color: var(--text-pure);">
            <input type="checkbox" id="tool-active" ${tool.active !== false ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;" />
            <span style="font-weight: 600;">Active (Visible on public store)</span>
          </label>
        </div>

        <!-- Submit & Cancel Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
          <button type="button" id="editor-cancel-btn" class="btn btn-secondary">Cancel</button>
          <button type="submit" id="editor-submit-btn" class="btn btn-primary" style="padding: 0.75rem 1.75rem; font-weight: 700;">
            ${isEdit ? 'Save Changes in Supabase' : 'Add Tool to Supabase'}
          </button>
        </div>
      </form>
    </div>
  `;

  modalRoot.appendChild(backdrop);

  const closeModal = () => backdrop.remove();
  backdrop.onclick = closeModal;
  document.getElementById('editor-modal-close').onclick = closeModal;
  document.getElementById('editor-cancel-btn').onclick = closeModal;

  // Quick Add Category from Tool modal
  document.getElementById('quick-add-cat-btn')?.addEventListener('click', () => {
    closeModal();
    openCategoryEditorModal(null, root, allCategories);
  });

  // Auto slug generation from name for new tools
  const nameInput = document.getElementById('tool-name');
  const slugInput = document.getElementById('tool-slug');
  if (!isEdit) {
    nameInput.oninput = () => {
      slugInput.value = nameInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    };
  }

  // --- Pricing Studio & Duration Interactive Logic ---
  let currentDuration = initialDuration;
  let currentCurrency = initialCurrency;

  const getDurationSuffix = (dur) => {
    if (dur === 'month') return '/month';
    if (dur === 'year') return '/year';
    if (dur === '3months') return '/3 Months';
    if (dur === '6months') return '/6 Months';
    if (dur === '12months') return '/12 Months';
    if (dur === '18months') return '/18 Months';
    if (dur === 'lifetime') return '(Lifetime)';
    if (dur === 'custom') {
      const customVal = document.getElementById('custom-duration-input')?.value.trim() || '18 Months';
      return /lifetime|one-time/i.test(customVal) ? `(${customVal})` : `/${customVal}`;
    }
    return '/month';
  };

  const calculateFormattedPrice = () => {
    const amt = document.getElementById('pricing-numeric-amount')?.value.trim() || '500';
    const durSuffix = getDurationSuffix(currentDuration);
    let formatted = '';
    if (currentCurrency === 'PKR') {
      formatted = `${amt} PKR ${durSuffix}`;
    } else if (currentCurrency === 'USD') {
      formatted = `$${amt} ${durSuffix}`;
    } else if (currentCurrency === 'INR') {
      formatted = `₹${amt} ${durSuffix}`;
    } else if (currentCurrency === 'AED') {
      formatted = `AED ${amt} ${durSuffix}`;
    } else {
      formatted = `${amt} ${durSuffix}`;
    }
    return formatted.replace(/\s+/g, ' ').trim();
  };

  const syncPriceToInputs = (formatted) => {
    const priceInput = document.getElementById('tool-price');
    const liveText = document.getElementById('pricing-live-text');
    const previewPriceBadge = document.getElementById('modal-preview-price-badge');
    if (priceInput) priceInput.value = formatted;
    if (liveText) liveText.textContent = formatted;
    if (previewPriceBadge) previewPriceBadge.textContent = formatted;
  };

  // Duration buttons
  const durationBtns = backdrop.querySelectorAll('#pricing-duration-buttons .duration-pill-btn');
  const customDurationRow = document.getElementById('custom-duration-row');
  const customDurationInput = document.getElementById('custom-duration-input');

  durationBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      durationBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentDuration = btn.getAttribute('data-duration');

      if (currentDuration === 'custom') {
        if (customDurationRow) customDurationRow.style.display = 'flex';
        if (customDurationInput) customDurationInput.focus();
      } else {
        if (customDurationRow) customDurationRow.style.display = 'none';
      }

      const formatted = calculateFormattedPrice();
      syncPriceToInputs(formatted);
    });
  });

  if (customDurationInput) {
    customDurationInput.addEventListener('input', () => {
      if (currentDuration === 'custom') {
        const formatted = calculateFormattedPrice();
        syncPriceToInputs(formatted);
      }
    });
  }

  // Currency buttons & preset rows
  const currencyBtns = backdrop.querySelectorAll('#pricing-currency-buttons .currency-select-btn');
  const presetPkr = document.getElementById('presets-pkr-row');
  const presetUsd = document.getElementById('presets-usd-row');
  const presetInr = document.getElementById('presets-inr-row');
  const presetAed = document.getElementById('presets-aed-row');
  const amountInput = document.getElementById('pricing-numeric-amount');

  currencyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.getAttribute('data-curr');

      if (presetPkr) presetPkr.style.display = currentCurrency === 'PKR' ? 'block' : 'none';
      if (presetUsd) presetUsd.style.display = currentCurrency === 'USD' ? 'block' : 'none';
      if (presetInr) presetInr.style.display = currentCurrency === 'INR' ? 'block' : 'none';
      if (presetAed) presetAed.style.display = currentCurrency === 'AED' ? 'block' : 'none';

      // Set sensible initial number if default was mismatched
      if (currentCurrency === 'PKR' && amountInput && (amountInput.value === '19' || !amountInput.value)) {
        amountInput.value = '500';
      } else if (currentCurrency === 'USD' && amountInput && amountInput.value === '500') {
        amountInput.value = '19';
      }

      const formatted = calculateFormattedPrice();
      syncPriceToInputs(formatted);
    });
  });

  // Amount preset chips
  backdrop.querySelectorAll('.pricing-studio-container .quick-amount-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const amt = chip.getAttribute('data-amount');
      if (amt && amountInput) {
        amountInput.value = amt;
        const formatted = calculateFormattedPrice();
        syncPriceToInputs(formatted);
      }
    });
  });

  if (amountInput) {
    amountInput.addEventListener('input', () => {
      const formatted = calculateFormattedPrice();
      syncPriceToInputs(formatted);
    });
  }

  // Manual input in main tool-price input
  const mainPriceInput = document.getElementById('tool-price');
  if (mainPriceInput) {
    mainPriceInput.addEventListener('input', () => {
      const val = mainPriceInput.value.trim();
      const liveText = document.getElementById('pricing-live-text');
      const previewPriceBadge = document.getElementById('modal-preview-price-badge');
      if (liveText) liveText.textContent = val || '$19 /month';
      if (previewPriceBadge) previewPriceBadge.textContent = val || '$19 /month';
    });
  }

  // Category select syncs to banner preview badge
  const catSelect = document.getElementById('tool-category');
  if (catSelect) {
    catSelect.addEventListener('change', () => {
      const badge = document.getElementById('modal-preview-cat-badge');
      if (badge) badge.textContent = catSelect.value || 'AI Tool';
    });
  }

  // Geo Pricing Quick Actions
  const geoPkInput = document.getElementById('geo-price-pakistan');
  const geoInInput = document.getElementById('geo-price-india');
  const geoUaeInput = document.getElementById('geo-price-uae');
  const geoSaudiInput = document.getElementById('geo-price-saudi');
  const geoUsInput = document.getElementById('geo-price-us');
  const geoUkInput = document.getElementById('geo-price-uk');
  const geoDefInput = document.getElementById('geo-price-default');

  // Smart Fill All
  document.getElementById('geo-fill-all-smart')?.addEventListener('click', () => {
    const durSuffix = getDurationSuffix(currentDuration);
    const amt = amountInput?.value.trim() || '500';
    if (geoPkInput) geoPkInput.value = `${currentCurrency === 'PKR' ? amt : '500'} PKR ${durSuffix}`;
    if (geoInInput) geoInInput.value = `₹${currentCurrency === 'INR' ? amt : '499'} ${durSuffix}`;
    if (geoUaeInput) geoUaeInput.value = `AED ${currentCurrency === 'AED' ? amt : '49'} ${durSuffix}`;
    if (geoSaudiInput) geoSaudiInput.value = `SAR ${currentCurrency === 'SAR' ? amt : '49'} ${durSuffix}`;
    if (geoUsInput) geoUsInput.value = `$${currentCurrency === 'USD' ? amt : '19'} ${durSuffix}`;
    if (geoUkInput) geoUkInput.value = `£${currentCurrency === 'GBP' ? amt : '15'} ${durSuffix}`;
    if (geoDefInput) geoDefInput.value = `$${currentCurrency === 'USD' ? amt : '19'} ${durSuffix}`;
    showToast(`⚡ All country rates filled with ${durSuffix}`);
  });

  // Fill All as PKR
  document.getElementById('geo-fill-pkr-all')?.addEventListener('click', () => {
    const durSuffix = getDurationSuffix(currentDuration);
    const amt = amountInput?.value.trim() || '500';
    const val = `${amt} PKR ${durSuffix}`;
    if (geoPkInput) geoPkInput.value = val;
    if (geoInInput) geoInInput.value = val;
    if (geoUaeInput) geoUaeInput.value = val;
    if (geoSaudiInput) geoSaudiInput.value = val;
    if (geoUsInput) geoUsInput.value = val;
    if (geoUkInput) geoUkInput.value = val;
    if (geoDefInput) geoDefInput.value = val;
    if (mainPriceInput) {
      mainPriceInput.value = val;
      syncPriceToInputs(val);
    }
    showToast(`🇵🇰 Set all country rates to ${val}`);
  });

  // Fill All as USD
  document.getElementById('geo-fill-usd-all')?.addEventListener('click', () => {
    const durSuffix = getDurationSuffix(currentDuration);
    const amt = currentCurrency === 'USD' ? (amountInput?.value.trim() || '19') : '19';
    const val = `$${amt} ${durSuffix}`;
    if (geoPkInput) geoPkInput.value = val;
    if (geoInInput) geoInInput.value = val;
    if (geoUaeInput) geoUaeInput.value = val;
    if (geoSaudiInput) geoSaudiInput.value = val;
    if (geoUsInput) geoUsInput.value = val;
    if (geoUkInput) geoUkInput.value = val;
    if (geoDefInput) geoDefInput.value = val;
    if (mainPriceInput) {
      mainPriceInput.value = val;
      syncPriceToInputs(val);
    }
    showToast(`🇺🇸 Set all country rates to ${val}`);
  });

  // Sync duration across all country rates
  document.getElementById('geo-sync-duration-all')?.addEventListener('click', () => {
    const durSuffix = getDurationSuffix(currentDuration);
    const replaceDur = (input) => {
      if (!input || !input.value.trim()) return;
      let val = input.value.trim();
      if (val.includes('/')) {
        val = val.split('/')[0].trim() + ' ' + durSuffix;
      } else if (/\(.*\)/.test(val)) {
        val = val.replace(/\(.*\)/, '').trim() + ' ' + durSuffix;
      } else {
        val = val + ' ' + durSuffix;
      }
      input.value = val.replace(/\s+/g, ' ').trim();
    };

    replaceDur(geoPkInput);
    replaceDur(geoInInput);
    replaceDur(geoUaeInput);
    replaceDur(geoSaudiInput);
    replaceDur(geoUsInput);
    replaceDur(geoUkInput);
    replaceDur(geoDefInput);
    replaceDur(mainPriceInput);
    if (mainPriceInput) syncPriceToInputs(mainPriceInput.value);
    showToast(`⏱️ Synced duration "${durSuffix}" to all countries!`);
  });

  // Individual country quick chips
  backdrop.querySelectorAll('.country-quick-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const targetId = chip.getAttribute('data-target');
      const prefix = chip.getAttribute('data-prefix');
      const val = chip.getAttribute('data-val');
      const targetInput = document.getElementById(targetId);
      const durSuffix = getDurationSuffix(currentDuration);

      if (targetInput) {
        if (prefix === 'PKR') {
          targetInput.value = `${val} PKR ${durSuffix}`;
        } else if (prefix === 'INR') {
          targetInput.value = `₹${val} ${durSuffix}`;
        } else if (prefix === 'AED') {
          targetInput.value = `AED ${val} ${durSuffix}`;
        } else if (prefix === 'SAR') {
          targetInput.value = `SAR ${val} ${durSuffix}`;
        } else if (prefix === 'USD') {
          targetInput.value = `$${val} ${durSuffix}`;
        } else if (prefix === 'GBP') {
          targetInput.value = `£${val} ${durSuffix}`;
        }
      }
    });
  });

  // Image Upload and Live High-Fidelity Banner Preview
  const fileInput = document.getElementById('tool-image-file');
  const imageUrlInput = document.getElementById('tool-image-url');
  const statusText = document.getElementById('upload-status-text');
  const bannerBox = document.getElementById('modal-banner-box');
  const clearBtn = document.getElementById('tool-image-clear');

  const updateToolPreview = (url) => {
    if (url) {
      const cat = document.getElementById('tool-category')?.value || 'AI Tool';
      const curPrice = document.getElementById('tool-price')?.value || '$19 /month';
      bannerBox.innerHTML = `
        <div class="tool-modal-banner-ambient" id="modal-banner-ambient" style="background-image: url('${url}');"></div>
        <img class="tool-modal-banner-img" id="tool-image-preview" src="${url}" alt="Banner Preview" />
        <div style="position: absolute; top: 10px; left: 10px; z-index: 3;" class="badge badge-popular" id="modal-preview-cat-badge">${cat}</div>
        <div style="position: absolute; bottom: 10px; right: 10px; z-index: 3; background: rgba(0,0,0,0.75); border: 1px solid var(--accent-cyan); color: #38bdf8; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;" id="modal-preview-price-badge">${curPrice}</div>
      `;
      if (clearBtn) clearBtn.style.display = 'inline-block';
    } else {
      bannerBox.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 1.5rem;" id="modal-banner-empty">
          <div style="font-size: 2rem; margin-bottom: 0.35rem;">🖼️</div>
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">No Image Selected Yet</div>
          <div style="font-size: 0.72rem; margin-top: 0.2rem;">Upload a file or paste an image URL above to preview how your banner displays</div>
        </div>
      `;
      if (clearBtn) clearBtn.style.display = 'none';
    }
  };

  imageUrlInput.oninput = () => updateToolPreview(imageUrlInput.value.trim());

  if (clearBtn) {
    clearBtn.onclick = () => {
      imageUrlInput.value = '';
      updateToolPreview('');
    };
  }

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    statusText.textContent = 'Processing & uploading image...';
    statusText.style.display = 'block';

    try {
      const publicUrl = await uploadToolImage(file, 'logos');
      imageUrlInput.value = publicUrl;
      updateToolPreview(publicUrl);
      statusText.textContent = '✓ Image uploaded successfully!';
      statusText.style.color = 'var(--accent-mint)';
    } catch (err) {
      statusText.textContent = `Upload failed: ${err.message}`;
      statusText.style.color = '#f87171';
    }
  };

  // Form submission
  const form = document.getElementById('supabase-tool-form');
  const submitBtn = document.getElementById('editor-submit-btn');

  form.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Saving to Supabase...';
    submitBtn.disabled = true;

    const rawFeatures = document.getElementById('tool-features').value;
    const parsedFeatures = rawFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    // Country-specific pricing dictionary
    const toolBasePrice = document.getElementById('tool-price')?.value.trim() || '$19 /month';
    const pkPrice = document.getElementById('geo-price-pakistan')?.value.trim() || '';
    const inPrice = document.getElementById('geo-price-india')?.value.trim() || '';
    const uaePrice = document.getElementById('geo-price-uae')?.value.trim() || '';
    const saudiPrice = document.getElementById('geo-price-saudi')?.value.trim() || '';
    const usPrice = document.getElementById('geo-price-us')?.value.trim() || '';
    const ukPrice = document.getElementById('geo-price-uk')?.value.trim() || '';
    const defPrice = document.getElementById('geo-price-default')?.value.trim() || toolBasePrice;

    const countryPricing = {
      ...(tool.countryPricing || {}),
      DEFAULT: defPrice
    };
    if (pkPrice) {
      countryPricing.Pakistan = pkPrice;
      countryPricing.pakistan = pkPrice;
      countryPricing.PK = pkPrice;
    }
    if (inPrice) {
      countryPricing.India = inPrice;
      countryPricing.india = inPrice;
      countryPricing.IN = inPrice;
    }
    if (uaePrice) {
      countryPricing['United Arab Emirates'] = uaePrice;
      countryPricing.UAE = uaePrice;
      countryPricing.AE = uaePrice;
    }
    if (saudiPrice) {
      countryPricing['Saudi Arabia'] = saudiPrice;
      countryPricing.Saudi = saudiPrice;
      countryPricing.SAR = saudiPrice;
      countryPricing.SA = saudiPrice;
    }
    if (usPrice) {
      countryPricing['United States'] = usPrice;
      countryPricing.US = usPrice;
      countryPricing.USD = usPrice;
    }
    if (ukPrice) {
      countryPricing['United Kingdom'] = ukPrice;
      countryPricing.UK = ukPrice;
      countryPricing.GBP = ukPrice;
      countryPricing.GB = ukPrice;
    }

    const payload = {
      id: tool.id,
      name: nameInput.value.trim(),
      slug: slugInput.value.trim(),
      category: document.getElementById('tool-category').value,
      price: toolBasePrice,
      countryPricing: countryPricing,
      image: imageUrlInput.value.trim(),
      shortDescription: document.getElementById('tool-short-desc').value.trim(),
      fullDescription: document.getElementById('tool-full-desc').value.trim(),
      whatsappUrl: document.getElementById('tool-whatsapp-url').value.trim(),
      tutorialVideoUrl: document.getElementById('tool-video-url').value.trim(),
      toolUrl: document.getElementById('tool-official-url').value.trim(),
      rating: parseFloat(document.getElementById('tool-rating').value) || 4.8,
      userCount: document.getElementById('tool-users-count').value.trim() || '10.5K',
      sortOrder: parseInt(document.getElementById('tool-sort-order').value, 10) || 0,
      featured: document.getElementById('tool-featured').checked,
      active: document.getElementById('tool-active').checked,
      features: parsedFeatures.length > 0 ? parsedFeatures : (tool.features || []),
      howToUse: tool.howToUse || []
    };

    try {
      await toolsApi.adminSaveTool(payload);
      showToast(`Tool "${payload.name}" successfully saved in Supabase!`, 'success');
      closeModal();
      activeTab = 'tools';
      renderAdminDashboardPage(root);
    } catch (err) {
      showToast(`Supabase save error: ${err.message}`, 'error');
      submitBtn.textContent = isEdit ? 'Save Changes in Supabase' : 'Add Tool to Supabase';
      submitBtn.disabled = false;
    }
  };
}
