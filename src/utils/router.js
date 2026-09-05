// AI Tools Store - Lightweight SPA Client Router

export class Router {
  constructor(routes, rootSelector = '#app') {
    this.routes = routes;
    this.root = document.querySelector(rootSelector);
    this.currentRoute = null;

    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());
  }

  getRouteInfo() {
    const hash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = hash.split('?');
    const path = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;

    const params = new URLSearchParams(queryPart || '');
    return { path, params };
  }

  navigate(path, params = {}) {
    let hash = path.startsWith('/') ? path : `/${path}`;
    const query = new URLSearchParams(params).toString();
    if (query) {
      hash += `?${query}`;
    }
    window.location.hash = hash;
  }

  async handleRouting() {
    const { path, params } = this.getRouteInfo();

    // Match exact or dynamic route like /tool/:id
    let matchedRoute = null;
    let pathParams = {};

    for (const [pattern, handler] of Object.entries(this.routes)) {
      if (pattern === path) {
        matchedRoute = handler;
        break;
      }

      // Check pattern with parameters e.g. /tool/:id
      const patternParts = pattern.split('/');
      const pathParts = path.split('/');

      if (patternParts.length === pathParts.length) {
        let isMatch = true;
        const tempParams = {};

        for (let i = 0; i < patternParts.length; i++) {
          if (patternParts[i].startsWith(':')) {
            const paramName = patternParts[i].slice(1);
            tempParams[paramName] = decodeURIComponent(pathParts[i]);
          } else if (patternParts[i] !== pathParts[i]) {
            isMatch = false;
            break;
          }
        }

        if (isMatch) {
          matchedRoute = handler;
          pathParams = tempParams;
          break;
        }
      }
    }

    if (!matchedRoute) {
      matchedRoute = this.routes['*'] || this.routes['/'];
    }

    this.currentRoute = path;
    window.scrollTo(0, 0);

    if (this.root) {
      await matchedRoute(this.root, { pathParams, queryParams: params, router: this });
    }
  }
}
