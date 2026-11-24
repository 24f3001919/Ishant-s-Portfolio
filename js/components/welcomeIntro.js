/**
 * Netflix-Style Welcome Intro Animation Component
 * The Red Light Sequence: Black Screen -> Anamorphic Beam -> ISHANT Illumination -> Seamless Profile Transition
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
        <div class="nf-ambient-flare"></div>

        <!-- Anamorphic Horizontal Red Light Beam -->
        <div class="nf-light-beam"></div>

        <!-- ISHANT Wordmark with Light Sweep & Studio Reflection -->
        <div class="nf-brand-container">
          <div class="nf-brand-reveal">
            <h1 class="nf-brand-text">ISHANT</h1>
            <div class="nf-light-sweep"></div>
          </div>
          <div class="nf-brand-reflection" aria-hidden="true">
            <div class="nf-brand-text">ISHANT</div>
          </div>
          <div class="nf-brand-sub">Video Editor &amp; 3D Motion Graphics</div>
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

    // Schedule sequence completion (~2.7s reveal, then 450ms clean fade)
    this.timeoutId = setTimeout(() => {
      this.finish(false);
    }, 2700);
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
