/**
 * Main Application Orchestrator
 * Ishant's Netflix-Inspired Portfolio Website
 */

import { NetflixTheme } from './components/netflixTheme.js';

class App {
  constructor() {
    this.appContainer = document.getElementById('netflix-app');
    this.netflixTheme = null;
    this.init();
  }

  init() {
    if (this.appContainer) {
      this.netflixTheme = new NetflixTheme(this.appContainer);
      this.netflixTheme.render();
    }
  }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.__portfolioApp = new App();
});
