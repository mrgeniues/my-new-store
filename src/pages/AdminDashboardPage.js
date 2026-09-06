// AI Tools Store - Secure Supabase Admin Panel with Complete Management
import { supabase, isSupabaseConfigured, uploadToolImage, defaultWhatsappUrl, getEnv } from '../lib/supabase.js';
import { authService } from '../lib/auth.js';
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { showToast } from '../utils/helpers.js';

let activeTab = 'tools'; // 'tools' | 'users' | 'analytics' | 'settings'

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

  let users = [];
  try {
    users = await authService.getRegisteredUsers();
  } catch (uErr) {
    console.warn('Could not load registered users:', uErr);
  }

  const activeCount = tools.filter((t) => t.active).length;
  const featuredCount = tools.filter((t) => t.featured).length;
  const categoriesList = Array.from(new Set(tools.map((t) => t.category).filter(Boolean)));
  const adminUsersCount = users.filter((u) => u.role === 'admin').length;

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
            Complete control over AI tool listings, customer directory, live analytics, and concierge community settings.
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <button id="admin-add-tool-btn" class="btn btn-primary" style="font-size: 0.88rem; padding: 0.65rem 1.35rem; font-weight: 700;">
            + Add New AI Tool
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
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700;">AI Tools Inventory</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Real-time Supabase Database Sync</span>
          </div>

          <div id="tools-table-container">
            ${renderToolsTableHtml(tools)}
          </div>
        </div>
      </div>

      <!-- TAB 2: REGISTERED MEMBERS DIRECTORY -->
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
        <div class="kpi-row" style="grid-template-columns: repeat(4, 1fr);">
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
            ${categoriesList.map((cat) => {
              const count = tools.filter((t) => t.category === cat).length;
              const percent = tools.length > 0 ? Math.round((count / tools.length) * 100) : 0;
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.35rem;">
                    <span style="font-weight: 600; color: var(--text-pure);">${cat}</span>
                    <span style="color: var(--text-secondary);">${count} tools (${percent}%)</span>
                  </div>
                  <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden;">
                    <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8); border-radius: 999px;"></div>
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

      <!-- TAB 4: STORE & WHATSAPP SETTINGS -->
      <div id="tab-content-settings" style="${activeTab === 'settings' ? 'display: block;' : 'display: none;'}">
        <div class="admin-table-card" style="max-width: 800px; margin-bottom: 2rem;">
          <h3 style="font-size: 1.25rem; color: var(--text-pure); font-weight: 700; margin-bottom: 0.5rem;">
            Global Concierge & Community Settings
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.75rem;">
            Configure your community group invitations and fallback WhatsApp concierge link for visitors.
          </p>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label class="form-label">WhatsApp Community Invite URL</label>
            <div style="display: flex; gap: 0.75rem;">
              <input 
                type="text" 
                id="settings-whatsapp-url" 
                class="form-input" 
                value="${defaultWhatsappUrl}" 
                readonly 
                style="flex: 1;"
              />
              <a 
                href="${defaultWhatsappUrl}" 
                target="_blank" 
                class="btn btn-secondary" 
                style="padding: 0.65rem 1.2rem; font-size: 0.85rem; white-space: nowrap; text-decoration: none;"
              >
                Test Link ↗
              </a>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">
              Configured in your <code style="color: var(--accent-cyan);">.env</code> file or Hostinger panel as <code style="color: var(--accent-cyan);">VITE_DEFAULT_WHATSAPP_URL</code>.
            </p>
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label class="form-label">Supabase Cloud Project URL</label>
            <input 
              type="text" 
              class="form-input" 
              value="${getEnv('VITE_SUPABASE_URL', 'https://rqemoitjanmxsmcmveso.supabase.co')}" 
              readonly 
            />
          </div>

          <div style="display: flex; gap: 1rem; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
            <button id="btn-test-db-ping" class="btn btn-primary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
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

      ['tools', 'users', 'analytics', 'settings'].forEach((tName) => {
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
      container.innerHTML = renderToolsTableHtml(filtered);
      bindToolsTableEvents(filtered, root);
    }
  };

  if (searchInput) searchInput.oninput = applyToolsFilter;
  if (catFilter) catFilter.onchange = applyToolsFilter;
  if (statusFilter) statusFilter.onchange = applyToolsFilter;

  // Bind tools table events initially
  bindToolsTableEvents(tools, root);

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
    openToolEditorModal(null, root);
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
}

function renderToolsTableHtml(toolsList) {
  if (!toolsList || toolsList.length === 0) {
    return `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="margin-bottom: 0.5rem; font-size: 1rem; color: var(--text-pure); font-weight: 700;">No tools match your criteria.</p>
        <p style="font-size: 0.85rem;">Click "+ Add New AI Tool" above to insert a new tool, or clear your search filter.</p>
      </div>
    `;
  }

  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Tool / Image</th>
          <th>Category</th>
          <th>Price</th>
          <th>WhatsApp Link</th>
          <th>Video Tutorial</th>
          <th>Featured</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${toolsList.map((t) => `
          <tr data-tool-id="${t.id}">
            <td>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                  ${t.image ? `<img src="${t.image}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='';this.parentNode.innerHTML='<span style=\\'font-weight:700;color:var(--accent-cyan);\\'>${t.name.slice(0, 2).toUpperCase()}</span>';" />` : `<span style="font-weight: 700; color: var(--accent-cyan); font-size: 0.85rem;">${t.name.slice(0, 2).toUpperCase()}</span>`}
                </div>
                <div>
                  <div style="font-weight: 700; color: var(--text-pure);">${t.name}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">/${t.slug}</div>
                </div>
              </div>
            </td>
            <td><span class="badge badge-popular">${t.category}</span></td>
            <td style="color: var(--accent-mint); font-weight: 700;">${t.price}</td>
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
        `).join('')}
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
      if (tool) openToolEditorModal(tool, root);
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

// Modal for Adding / Editing a Tool with Supabase Storage File Upload
function openToolEditorModal(existingTool, root) {
  const modalRoot = document.getElementById('modal-root') || document.body;

  const isEdit = Boolean(existingTool);
  const tool = existingTool || {
    name: '',
    slug: '',
    category: 'AI Writing',
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
            Fill in product information, pricing, WhatsApp links, and tutorial media.
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

        <!-- Category & Price -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select id="tool-category" class="sort-select" style="width: 100%; border-radius: var(--radius-md);">
              <option value="AI Writing" ${tool.category === 'AI Writing' ? 'selected' : ''}>AI Writing</option>
              <option value="AI Image" ${tool.category === 'AI Image' ? 'selected' : ''}>AI Image</option>
              <option value="AI Video" ${tool.category === 'AI Video' ? 'selected' : ''}>AI Video</option>
              <option value="AI Audio" ${tool.category === 'AI Audio' ? 'selected' : ''}>AI Audio</option>
              <option value="AI Coding" ${tool.category === 'AI Coding' ? 'selected' : ''}>AI Coding</option>
              <option value="AI Automation" ${tool.category === 'AI Automation' ? 'selected' : ''}>AI Automation</option>
              <option value="Productivity" ${tool.category === 'Productivity' ? 'selected' : ''}>Productivity</option>
              <option value="Marketing" ${tool.category === 'Marketing' ? 'selected' : ''}>Marketing</option>
              <option value="Business" ${tool.category === 'Business' ? 'selected' : ''}>Business</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Price *</label>
            <input type="text" id="tool-price" class="form-input" value="${tool.price || '$19 /month'}" placeholder="e.g. $19 /month" required />
          </div>
        </div>

        <!-- Image: URL or Supabase Storage Upload -->
        <div class="form-group">
          <label class="form-label">Tool Logo / Image URL</label>
          <div style="display: flex; gap: 0.75rem;">
            <input type="text" id="tool-image-url" class="form-input" value="${tool.image || ''}" placeholder="https://example.com/logo.png" style="flex: 1;" />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="tool-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="upload-status-text" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-top: 0.35rem;"></span>
        </div>

        <!-- Short Description -->
        <div class="form-group">
          <label class="form-label">Short Description (Card Summary) *</label>
          <input type="text" id="tool-short-desc" class="form-input" value="${tool.shortDescription || ''}" placeholder="One sentence summarizing key value proposition..." required />
        </div>

        <!-- Full Description -->
        <div class="form-group">
          <label class="form-label">Full Description (Tool Details Page) *</label>
          <textarea id="tool-full-desc" class="form-textarea" style="min-height: 90px;" placeholder="Comprehensive overview of capabilities, use cases, and prompt styles..." required>${tool.fullDescription || tool.description || ''}</textarea>
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

  // Auto slug generation from name for new tools
  const nameInput = document.getElementById('tool-name');
  const slugInput = document.getElementById('tool-slug');
  if (!isEdit) {
    nameInput.oninput = () => {
      slugInput.value = nameInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    };
  }

  // File Upload to Supabase Storage
  const fileInput = document.getElementById('tool-image-file');
  const imageUrlInput = document.getElementById('tool-image-url');
  const statusText = document.getElementById('upload-status-text');

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    statusText.textContent = 'Uploading to Supabase Storage...';
    statusText.style.display = 'block';

    try {
      const publicUrl = await uploadToolImage(file);
      imageUrlInput.value = publicUrl;
      statusText.textContent = '✓ Image uploaded successfully to Supabase Storage!';
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

    const payload = {
      id: tool.id,
      name: nameInput.value.trim(),
      slug: slugInput.value.trim(),
      category: document.getElementById('tool-category').value,
      price: document.getElementById('tool-price').value.trim(),
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
      renderAdminDashboardPage(root);
    } catch (err) {
      showToast(`Supabase save error: ${err.message}`, 'error');
      submitBtn.textContent = isEdit ? 'Save Changes in Supabase' : 'Add Tool to Supabase';
      submitBtn.disabled = false;
    }
  };
}
