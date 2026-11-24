/**
 * Main Application Orchestrator
 * Controls Theme Switching (Netflix vs. Google) and Global Lifecycle
 */

import { NetflixTheme } from './components/netflixTheme.js';
import { GoogleTheme } from './components/googleTheme.js';

class App {
  constructor() {
    this.activeTheme = 'netflix';
    this.netflixContainer = document.getElementById('theme-netflix');
    this.googleContainer = document.getElementById('theme-google');
    this.netflixTheme = null;
    this.googleTheme = null;
    this.init();
  }

  init() {
    // Instantiate themes
    this.netflixTheme = new NetflixTheme(this.netflixContainer);
    this.googleTheme = new GoogleTheme(this.googleContainer);

    // Initial render
    this.netflixTheme.render();
    this.googleTheme.render();

    // Check saved theme
    const savedTheme = localStorage.getItem('ishu_portfolio_theme');
    if (savedTheme === 'google') {
      this.switchTheme('google');
    } else {
      this.switchTheme('netflix');
    }

    this.bindThemeSwitcher();
    this.bindGlobalKeyboard();
  }

  switchTheme(themeName) {
    this.activeTheme = themeName;
    localStorage.setItem('ishu_portfolio_theme', themeName);

    // Update buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeName);
    });

    // Update view visibility
    if (themeName === 'netflix') {
      this.netflixContainer.classList.add('active');
      this.googleContainer.classList.remove('active');
    } else {
      this.netflixContainer.classList.remove('active');
      this.googleContainer.classList.add('active');
    }
  }

  bindThemeSwitcher() {
    const buttons = document.querySelectorAll('.theme-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTheme = btn.dataset.theme;
        if (targetTheme && targetTheme !== this.activeTheme) {
          this.switchTheme(targetTheme);
        }
      });
    });
  }

  bindGlobalKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      // Quick toggle themes with Shift+T
      if (e.shiftKey && (e.key === 'T' || e.key === 't')) {
        this.switchTheme(this.activeTheme === 'netflix' ? 'google' : 'netflix');
      }
    });
  }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.__portfolioApp = new App();
});
