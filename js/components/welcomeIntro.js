/**
 * Netflix-Style Welcome Intro Animation Component
 * Centered Ribbon N -> Continuous ISHANT Assembly -> Sharp Profile Reveal
 */

export class WelcomeIntro {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.overlayEl = null;
    this.timeoutId = null;
    this.isFinished = false;
  }

  play() {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (this.onComplete) this.onComplete();
      return;
    }

    // Keep body scrolling locked while intro is active
    document.body.classList.add('profile-active');

    // Create DOM structure
    this.overlayEl = document.createElement('div');
    this.overlayEl.className = 'nf-intro-overlay';
    this.overlayEl.id = 'nf-welcome-intro';
    this.overlayEl.setAttribute('role', 'dialog');
    this.overlayEl.setAttribute('aria-label', 'Welcome to Ishant Creative Portfolio');

    this.overlayEl.innerHTML = `
      <button class="nf-intro-skip-btn" id="nf-skip-intro" aria-label="Skip Introduction">Skip Intro ✕</button>
      <div class="nf-intro-stage">
        <!-- Clean, Subtle, Symmetrical Ambient Radial Glow -->
        <div class="nf-intro-ambient-glow"></div>

        <!-- Master Brand Lockup (N is at exact viewport center, then ISHANT expands around it) -->
        <div class="nf-brand-lockup">
          <div class="nf-wordmark-track">
            <!-- Left Letters: I S H A -->
            <div class="nf-letters-group nf-letters-left">
              <span class="nf-char nf-char-i">I</span>
              <span class="nf-char nf-char-s">S</span>
              <span class="nf-char nf-char-h">H</span>
              <span class="nf-char nf-char-a">A</span>
            </div>

            <!-- The Persistent Dimensional Red Ribbon N -->
            <div class="nf-ribbon-n-cell">
              <svg class="nf-intro-n-svg" viewBox="0 0 70 100">
                <defs>
                  <linearGradient id="nStemLeftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#b1060f"/>
                    <stop offset="100%" stop-color="#e50914"/>
                  </linearGradient>
                  <linearGradient id="nDiagRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff252e"/>
                    <stop offset="45%" stop-color="#e50914"/>
                    <stop offset="100%" stop-color="#b1060f"/>
                  </linearGradient>
                  <linearGradient id="nStemRightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#83060c"/>
                    <stop offset="100%" stop-color="#b1060f"/>
                  </linearGradient>
                  <filter id="nFoldShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="-3" dy="0" stdDeviation="3.5" flood-color="#000000" flood-opacity="0.85"/>
                  </filter>
                </defs>
                <rect class="n-stem-left" x="3" y="0" width="18" height="100" rx="1" fill="url(#nStemLeftGrad)"/>
                <rect class="n-stem-right" x="49" y="0" width="18" height="100" rx="1" fill="url(#nStemRightGrad)"/>
                <polygon class="n-diagonal" points="3,0 21,0 67,100 49,100" fill="url(#nDiagRibbonGrad)" filter="url(#nFoldShadow)"/>
              </svg>
            </div>

            <!-- Right Letter: T -->
            <div class="nf-letters-group nf-letters-right">
              <span class="nf-char nf-char-t">T</span>
            </div>
          </div>

          <!-- Centered Subtitle -->
          <div class="nf-brand-subtitle">VIDEO EDITOR &amp; 3D MOTION GRAPHICS</div>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlayEl);

    // Skip Intro button listener
    const skipBtn = this.overlayEl.querySelector('#nf-skip-intro');
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.finish(true);
      });
    }

    // Schedule sequence completion (~2.8s total display, then 450ms clean opacity fade)
    this.timeoutId = setTimeout(() => {
      this.finish(false);
    }, 2800);
  }

  finish(instant = false) {
    if (this.isFinished) return;
    this.isFinished = true;
    clearTimeout(this.timeoutId);

    if (!this.overlayEl) return;

    if (instant) {
      this.overlayEl.style.transition = 'opacity 0.15s ease';
      this.overlayEl.classList.add('fade-out');
      setTimeout(() => {
        this.cleanup();
      }, 150);
    } else {
      this.overlayEl.classList.add('fade-out');
      setTimeout(() => {
        this.cleanup();
      }, 450);
    }
  }

  cleanup() {
    if (this.overlayEl) {
      this.overlayEl.classList.add('hidden');
      this.overlayEl.remove();
      this.overlayEl = null;
    }
    if (this.onComplete) {
      this.onComplete();
    }
  }
}
