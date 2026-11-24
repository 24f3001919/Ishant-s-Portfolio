/**
 * Netflix-Style Welcome Intro Animation Component
 * Full-screen sequence: Black screen -> Ribbon 'N' -> ISHANT wordmark -> "Who's watching?"
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

    // Lock scrolling while intro is playing
    document.body.classList.add('profile-active');

    // Create DOM structure
    this.overlayEl = document.createElement('div');
    this.overlayEl.className = 'nf-intro-overlay';
    this.overlayEl.id = 'nf-welcome-intro';
    this.overlayEl.setAttribute('role', 'dialog');
    this.overlayEl.setAttribute('aria-label', 'Welcome to Ishant Portfolio');

    this.overlayEl.innerHTML = `
      <button class="nf-intro-skip-btn" id="nf-skip-intro" aria-label="Skip Introduction">Skip Intro ✕</button>
      <div class="nf-intro-glow"></div>
      <div class="nf-intro-stage">
        <!-- Phase 1: Animated Red Ribbon N Logo -->
        <div class="nf-intro-n-wrap">
          <svg class="nf-intro-n-svg" viewBox="0 0 120 180" width="120" height="180">
            <defs>
              <linearGradient id="nLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#b1060f"/>
                <stop offset="100%" stop-color="#e50914"/>
              </linearGradient>
              <linearGradient id="nDiag" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff1e27"/>
                <stop offset="50%" stop-color="#e50914"/>
                <stop offset="100%" stop-color="#b1060f"/>
              </linearGradient>
              <linearGradient id="nRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#83060c"/>
                <stop offset="100%" stop-color="#b1060f"/>
              </linearGradient>
              <filter id="nShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="-4" dy="0" stdDeviation="6" flood-color="#000000" flood-opacity="0.8"/>
              </filter>
            </defs>
            <rect class="n-stem-left" x="10" y="10" width="30" height="160" fill="url(#nLeft)"/>
            <rect class="n-stem-right" x="80" y="10" width="30" height="160" fill="url(#nRight)"/>
            <polygon class="n-diagonal" points="10,10 40,10 110,170 80,170" fill="url(#nDiag)" filter="url(#nShadow)"/>
          </svg>
        </div>

        <!-- Phase 2: Bold Red ISHANT Wordmark -->
        <div class="nf-intro-wordmark-wrap">
          <h1 class="nf-intro-wordmark">ISHANT</h1>
          <div class="nf-intro-subtitle">Video Editor &amp; 3D Motion Graphics</div>
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

    // Schedule sequence completion (~2.9 seconds to start fade-out)
    this.timeoutId = setTimeout(() => {
      this.finish(false);
    }, 2900);
  }

  finish(instant = false) {
    if (this.isFinished) return;
    this.isFinished = true;
    clearTimeout(this.timeoutId);

    if (!this.overlayEl) return;

    this.overlayEl.classList.add('fade-out');
    setTimeout(() => {
      this.cleanup();
    }, instant ? 200 : 450);
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
