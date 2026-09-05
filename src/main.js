// AI Tools Store - Main Application Bootstrap
import { Router } from './utils/router.js';
import { toolsApi } from './api/toolsApi.js';
import { renderHomePage } from './pages/HomePage.js';
import { renderAllToolsPage } from './pages/AllToolsPage.js';
import { renderToolDetailsPage } from './pages/ToolDetailsPage.js';
import { renderCategoriesPage } from './pages/CategoriesPage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderContactPage } from './pages/ContactPage.js';
import { renderAdminDashboardPage } from './pages/AdminDashboardPage.js';

// Define Application Routes
const routes = {
  '/': renderHomePage,
  '/tools': renderAllToolsPage,
  '/tool/:id': renderToolDetailsPage,
  '/categories': renderCategoriesPage,
  '/about': renderAboutPage,
  '/contact': renderContactPage,
  '/admin': renderAdminDashboardPage,
  '*': renderHomePage
};

import { onLanguageChange } from './i18n/i18n.js';

// Bootstrap App
let appRouter = null;

async function initApp() {
  console.log('[AI Tools Store] Initializing marketplace client...');
  
  // Pre-check API connectivity in background
  toolsApi.getTools().catch((err) => {
    console.warn('[AI Tools Store] API initialized with offline fallback dataset:', err);
  });

  // Start Router
  appRouter = new Router(routes, '#app');
  window.__appRouter = appRouter;

  // Seamlessly re-render current route on language switch without full page refresh
  onLanguageChange(() => {
    if (appRouter) {
      appRouter.handleRouting();
    }
  });
}

// Kickoff when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
