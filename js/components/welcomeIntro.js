/**
 * Netflix-Style Welcome Intro Animation Component
 * Seamless Transformation: Red Ribbon N -> ISHANT Wordmark Assembly -> Sharp Profile Reveal
 * The initial red N remains the exact same persistent element throughout the animation.
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
        <!-- Ambient Red Atmosphere -->
        <div class="nf-intro-ambient-glow"></div>

        <!-- Vertical Light Streaks behind N -->
        <div class="nf-vertical-streaks">
          <div class="nf-light-column-left"></div>
          <div class="nf-light-column-right"></div>
        </div>

        <!-- The Continuous Wordmark Assembly -->
        <div class="nf-brand-assembly">
          <div class="nf-word-letters-row">
            <span class="nf-letter-char nf-letter-i">I</span>
            <span class="nf-letter-char nf-letter-s">S</span>
            <span class="nf-letter-char nf-letter-h">H</span>
            <span class="nf-letter-char nf-letter-a">A</span>

            <!-- The Persistent Dimensional Red Ribbon N -->
            <div class="nf-ribbon-n-box">
              <svg class="nf-intro-n-svg" viewBox="0 0 100 140" width="100" height="140">
                <defs>
                  <linearGradient id="nLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#b1060f"/>
                    <stop offset="100%" stop-color="#e50914"/>
                  </linearGradient>
                  <linearGradient id="nDiag" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff222b"/>
                    <stop offset="50%" stop-color="#e50914"/>
                    <stop offset="100%" stop-color="#b1060f"/>
                  </linearGradient>
                  <linearGradient id="nRight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#83060c"/>
                    <stop offset="100%" stop-color="#b1060f"/>
                  </linearGradient>
                  <filter id="nShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="-4" dy="0" stdDeviation="5" flood-color="#000000" flood-opacity="0.85"/>
                  </filter>
                </defs>
                <rect class="n-stem-left" x="8" y="8" width="25" height="124" fill="url(#nLeft)"/>
                <rect class="n-stem-right" x="67" y="8" width="25" height="124" fill="url(#nRight)"/>
                <polygon class="n-diagonal" points="8,8 33,8 92,132 67,132" fill="url(#nDiag)" filter="url(#nShadow)"/>
              </svg>
            </div>

            <span class="nf-letter-char nf-letter-t">T</span>
          </div>

          <!-- Subtitle -->
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
