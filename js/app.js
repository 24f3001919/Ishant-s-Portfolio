/**
 * Main Application Orchestrator
 * Ishant's Netflix-Inspired Portfolio Website with Welcome Intro
 */

import { NetflixTheme } from './components/netflixTheme.js';
import { WelcomeIntro } from './components/welcomeIntro.js';

class App {
  constructor() {
    this.appContainer = document.getElementById('netflix-app');
    this.netflixTheme = null;
    this.welcomeIntro = null;
    this.init();
  }

  init() {
    if (this.appContainer) {
      // 1. Initialize and render Netflix experience
      this.netflixTheme = new NetflixTheme(this.appContainer);
      this.netflixTheme.render();

      // 2. Play Netflix-style welcome intro animation on page load
      this.welcomeIntro = new WelcomeIntro(() => {
        // Callback after intro fades into "Who's watching?"
      });
      this.welcomeIntro.play();
    }
  }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.__portfolioApp = new App();
});
