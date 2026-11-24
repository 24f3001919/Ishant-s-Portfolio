/**
 * Project Details & Video Preview Modal Component
 * Netflix-Style Cinematic Modal with Vertical & Landscape Video Support,
 * Role & Software Badges, Previous / Next Navigation, Keyboard Controls,
 * Video Buffering Indicators, Error Handling, and Resource Cleanup.
 */

import { PROJECTS } from '../data/projects.js';
import { SITE_CONFIG } from '../data/config.js';

class ProjectModalManager {
  constructor() {
    this.modalEl = null;
    this.currentProject = null;
    this.playbackInterval = null;
    this.isPlaying = false;
    this.playbackProgress = 0;
    this.previousActiveElement = null;
    this.init();
  }

  init() {
    // Create modal DOM structure
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'pv-modal-overlay';
    this.modalEl.innerHTML = `
      <div class="pv-modal-box" role="dialog" aria-modal="true" aria-labelledby="pv-title">
        <!-- Close & Navigation Controls -->
        <button class="pv-modal-close-btn" aria-label="Close modal (Esc)" title="Close (Esc)">✕</button>
        <button class="pv-nav-arrow pv-nav-prev" aria-label="Previous project (Left Arrow)" title="Previous Project (←)">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button class="pv-nav-arrow pv-nav-next" aria-label="Next project (Right Arrow)" title="Next Project (→)">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        <div class="pv-player-container" id="pv-player-container">
          <!-- Ambient blurred backdrop for atmospheric glow -->
          <img class="pv-player-backdrop-blur" src="" alt="" aria-hidden="true">
          <img class="pv-player-poster" src="" alt="Project Poster">
          <video class="pv-video-element" playsinline controls controlsList="nodownload" preload="metadata"></video>
          
          <!-- Loading Buffer Spinner -->
          <div class="pv-video-spinner" aria-label="Loading video buffer">
            <div class="pv-spinner-ring"></div>
          </div>

          <!-- Video Playback Error Overlay -->
          <div class="pv-video-error" style="display: none;">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#e50914" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p class="pv-error-msg">Video playback stream unavailable.</p>
            <button class="pv-btn pv-btn-retry">Retry Playback</button>
          </div>

          <div class="pv-player-vignette"></div>
          <div class="pv-player-controls-overlay">
            <div class="pv-player-top-bar">
              <span class="pv-player-badge">PREVIEW PLAYER</span>
              <span class="pv-ratio-badge">VERTICAL 9:16</span>
            </div>
            <div class="pv-player-center-action">
              <button class="pv-play-action-btn" aria-label="Play Video (Spacebar)" title="Play / Pause (Spacebar)">▶</button>
            </div>
            <div class="pv-player-bottom-bar">
              <h2 class="pv-player-title" id="pv-title"></h2>
              <div class="pv-scrubber-track" role="slider" aria-label="Timeline Scrubber" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">
                <div class="pv-scrubber-fill"></div>
              </div>
              <div class="pv-playback-status-row">
                <span class="pv-time-indicator">0:00 / 0:30</span>
                <span class="pv-source-indicator"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="pv-modal-body">
          <div class="pv-modal-meta-row">
            <span class="pv-meta-match"></span>
            <span class="pv-meta-category"></span>
            <span class="pv-meta-duration"></span>
            <span class="pv-meta-hd">HD 1080P</span>
            <span class="pv-meta-year"></span>
          </div>

          <!-- Ishant's Role & Software Details Grid -->
          <div class="pv-details-grid">
            <div class="pv-detail-item">
              <span class="pv-detail-label">Ishant's Role:</span>
              <span class="pv-detail-val pv-role-val">Video Editor &amp; Motion Artist</span>
            </div>
            <div class="pv-detail-item">
              <span class="pv-detail-label">Software Used:</span>
              <div class="pv-software-badges pv-software-val"></div>
            </div>
          </div>

          <p class="pv-modal-desc"></p>

          <div class="pv-tags-container">
            <span class="pv-tag-label">Tags &amp; Focus:</span>
            <div class="pv-tags-list"></div>
          </div>

          <div class="pv-modal-actions">
            <button class="pv-btn pv-btn-play" aria-label="Play Video">▶ Play Video</button>
            <div class="pv-modal-nav-hint">Tip: Use <b>←</b> and <b>→</b> keys to switch projects · <b>Space</b> to play/pause</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modalEl);

    // Event Listeners
    const closeBtn = this.modalEl.querySelector('.pv-modal-close-btn');
    closeBtn.addEventListener('click', () => this.close());

    const prevBtn = this.modalEl.querySelector('.pv-nav-prev');
    const nextBtn = this.modalEl.querySelector('.pv-nav-next');
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navigateProject(-1);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navigateProject(1);
    });

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Keyboard controls & accessibility focus trap
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen()) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.navigateProject(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.navigateProject(1);
      } else if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        this.togglePlayback();
      } else if (e.key === 'Tab') {
        this.handleFocusTrap(e);
      }
    });

    const playActionBtn = this.modalEl.querySelector('.pv-play-action-btn');
    const playBarBtn = this.modalEl.querySelector('.pv-btn-play');
    playActionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePlayback();
    });
    playBarBtn.addEventListener('click', () => this.togglePlayback());

    // Connect video element native events for synchronization & buffering
    const videoEl = this.modalEl.querySelector('.pv-video-element');
    const playerContainer = this.modalEl.querySelector('.pv-player-container');
    const timeIndicator = this.modalEl.querySelector('.pv-time-indicator');
    const spinner = this.modalEl.querySelector('.pv-video-spinner');
    const errorOverlay = this.modalEl.querySelector('.pv-video-error');
    const retryBtn = this.modalEl.querySelector('.pv-btn-retry');

    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        errorOverlay.style.display = 'none';
        if (this.currentProject && this.currentProject.videoUrl) {
          videoEl.src = this.currentProject.videoUrl;
          videoEl.load();
          videoEl.play().catch(() => {});
        }
      });
    }

    videoEl.addEventListener('waiting', () => {
      if (spinner) spinner.classList.add('is-buffering');
    });

    videoEl.addEventListener('seeking', () => {
      if (spinner) spinner.classList.add('is-buffering');
    });

    videoEl.addEventListener('playing', () => {
      if (spinner) spinner.classList.remove('is-buffering');
      if (errorOverlay) errorOverlay.style.display = 'none';
      const poster = this.modalEl.querySelector('.pv-player-poster');
      if (poster) poster.style.display = 'none';
      this.isPlaying = true;
      playerContainer.classList.add('is-playing');
      playActionBtn.textContent = '❚❚';
      playBarBtn.textContent = '❚❚ Pause';
    });

    videoEl.addEventListener('canplay', () => {
      if (spinner) spinner.classList.remove('is-buffering');
    });

    videoEl.addEventListener('seeked', () => {
      if (spinner) spinner.classList.remove('is-buffering');
    });

    videoEl.addEventListener('error', () => {
      if (spinner) spinner.classList.remove('is-buffering');
      if (videoEl.error && videoEl.currentSrc && this.isPlaying) {
        if (errorOverlay) errorOverlay.style.display = 'flex';
      }
    });

    videoEl.addEventListener('play', () => {
      this.isPlaying = true;
      playerContainer.classList.add('is-playing');
      playActionBtn.textContent = '❚❚';
      playBarBtn.textContent = '❚❚ Pause';
    });

    videoEl.addEventListener('ended', () => {
      this.isPlaying = false;
      playerContainer.classList.remove('is-playing');
      playActionBtn.textContent = '▶';
      playBarBtn.textContent = '▶ Replay';
      this.updateScrubber(100);
      if (this.currentProject && this.currentProject.id === 'khatu-shyam-full-highlight') {
        this.saveContinueWatchingProgress(videoEl.duration || 390, videoEl.duration || 390, true);
      }
    });

    videoEl.addEventListener('timeupdate', () => {
      if (!videoEl.duration) return;
      const pct = (videoEl.currentTime / videoEl.duration) * 100;
      this.updateScrubber(pct);
      const curr = this.formatTime(videoEl.currentTime);
      const dur = this.formatTime(videoEl.duration);
      timeIndicator.textContent = `${curr} / ${dur}`;

      // Throttled persistence for Continue Watching
      if (this.currentProject && this.currentProject.id === 'khatu-shyam-full-highlight') {
        const now = Date.now();
        if (!this._lastSaveTime || now - this._lastSaveTime > 600) {
          this._lastSaveTime = now;
          this.saveContinueWatchingProgress(videoEl.currentTime, videoEl.duration);
        }
      }
    });

    videoEl.addEventListener('pause', () => {
      this.isPlaying = false;
      playerContainer.classList.remove('is-playing');
      playActionBtn.textContent = '▶';
      playBarBtn.textContent = '▶ Play Video';
      if (this.currentProject && this.currentProject.id === 'khatu-shyam-full-highlight') {
        this.saveContinueWatchingProgress(videoEl.currentTime, videoEl.duration);
      }
    });

    window.addEventListener('beforeunload', () => {
      if (this.currentProject && this.currentProject.id === 'khatu-shyam-full-highlight' && videoEl) {
        this.saveContinueWatchingProgress(videoEl.currentTime, videoEl.duration);
      }
    });

    // Scrubber click to seek
    const scrubberTrack = this.modalEl.querySelector('.pv-scrubber-track');
    scrubberTrack.addEventListener('click', (e) => {
      const rect = scrubberTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      if (videoEl.classList.contains('has-source') && videoEl.duration) {
        videoEl.currentTime = pct * videoEl.duration;
      } else {
        this.playbackProgress = pct * 100;
        this.updateScrubber(this.playbackProgress);
      }
    });
  }

  handleFocusTrap(e) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(this.modalEl.querySelectorAll(focusableSelectors))
      .filter(el => !el.disabled && el.offsetParent !== null);

    if (focusables.length === 0) return;

    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  formatTime(secs) {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  isOpen() {
    return this.modalEl.classList.contains('active');
  }

  navigateProject(direction) {
    if (!this.currentProject) return;
    const idx = PROJECTS.findIndex(p => p.id === this.currentProject.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + PROJECTS.length) % PROJECTS.length;
    this.open(PROJECTS[nextIdx].id);
  }

  open(projectId, options = {}) {
    const project = typeof projectId === 'string'
      ? PROJECTS.find(p => p.id === projectId)
      : PROJECTS[projectId];

    if (!project) return;
    this.currentProject = project;
    this.previousActiveElement = document.activeElement;

    // Elements
    const playerContainer = this.modalEl.querySelector('.pv-player-container');
    const backdropBlur = this.modalEl.querySelector('.pv-player-backdrop-blur');
    const poster = this.modalEl.querySelector('.pv-player-poster');
    const title = this.modalEl.querySelector('.pv-player-title');
    const match = this.modalEl.querySelector('.pv-meta-match');
    const year = this.modalEl.querySelector('.pv-meta-year');
    const duration = this.modalEl.querySelector('.pv-meta-duration');
    const category = this.modalEl.querySelector('.pv-meta-category');
    const desc = this.modalEl.querySelector('.pv-modal-desc');
    const tagsList = this.modalEl.querySelector('.pv-tags-list');
    const timeIndicator = this.modalEl.querySelector('.pv-time-indicator');
    const videoEl = this.modalEl.querySelector('.pv-video-element');
    const sourceIndicator = this.modalEl.querySelector('.pv-source-indicator');
    const ratioBadge = this.modalEl.querySelector('.pv-ratio-badge');
    const spinner = this.modalEl.querySelector('.pv-video-spinner');
    const errorOverlay = this.modalEl.querySelector('.pv-video-error');
    const roleVal = this.modalEl.querySelector('.pv-role-val');
    const softwareVal = this.modalEl.querySelector('.pv-software-val');

    // Reset error & spinner
    if (spinner) spinner.classList.remove('is-buffering');
    if (errorOverlay) errorOverlay.style.display = 'none';

    // Populate data
    backdropBlur.src = project.thumbnail;
    poster.src = project.thumbnail;
    title.textContent = project.title;
    match.textContent = project.match || '98% Match';
    year.textContent = project.year || '2026';
    duration.textContent = project.duration;
    category.textContent = project.category;
    desc.textContent = project.fullDescription || project.description;
    timeIndicator.textContent = `0:00 / ${project.duration}`;
    sourceIndicator.textContent = project.hasRealVideo ? 'Master ProRes / MP4 Stream' : 'Concept Preview';

    // Render Role & Verified Software Badges
    if (roleVal) {
      roleVal.textContent = project.role || 'Video Editor & Motion Designer';
    }
    if (softwareVal) {
      const swList = project.software || ["Adobe Premiere Pro", "After Effects"];
      softwareVal.innerHTML = swList.map(sw => `<span class="pv-software-badge">${sw}</span>`).join('');
    }

    // Vertical format styling
    if (project.isVertical) {
      playerContainer.classList.add('vertical-mode');
      ratioBadge.textContent = '9:16 VERTICAL';
      ratioBadge.style.display = 'inline-block';
    } else {
      playerContainer.classList.remove('vertical-mode');
      ratioBadge.textContent = '16:9 WIDESCREEN';
      ratioBadge.style.display = 'inline-block';
    }

    // Reset playback
    this.stopPlayback();
    this.playbackProgress = 0;
    this.updateScrubber(0);
    playerContainer.classList.remove('is-playing');

    // Render tags
    tagsList.innerHTML = (project.tags || [])
      .map(t => `<span class="pv-tag-pill">${t}</span>`)
      .join(' ');

    // Handle video player source
    if (project.hasRealVideo && project.videoUrl) {
      videoEl.src = project.videoUrl;
      videoEl.classList.add('has-source');
      poster.style.display = 'block';
      backdropBlur.style.display = 'block';

      // Resume / seek handling for Continue Watching or options.startAt
      const seekTarget = options.startAt !== undefined
        ? options.startAt
        : (project.id === 'khatu-shyam-full-highlight' ? (this.getContinueWatchingProgress()?.currentTime || 0) : 0);

      const applySeek = () => {
        if (seekTarget > 0 && seekTarget < (videoEl.duration || 390)) {
          videoEl.currentTime = seekTarget;
          const pct = (videoEl.currentTime / (videoEl.duration || 390)) * 100;
          this.updateScrubber(pct);
          timeIndicator.textContent = `${this.formatTime(videoEl.currentTime)} / ${this.formatTime(videoEl.duration || 390)}`;
        }
        if (options.autoplay) {
          videoEl.play().catch(() => {});
        }
      };

      if (videoEl.readyState >= 1) {
        applySeek();
      } else {
        videoEl.addEventListener('loadedmetadata', applySeek, { once: true });
      }
    } else {
      videoEl.removeAttribute('src');
      videoEl.classList.remove('has-source');
      poster.style.display = 'block';
      backdropBlur.style.display = 'none';
    }

    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set aria-hidden on background application
    const appEl = document.getElementById('netflix-app');
    if (appEl) appEl.setAttribute('aria-hidden', 'true');

    // Focus on close button for accessibility
    setTimeout(() => {
      const closeBtn = this.modalEl.querySelector('.pv-modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  getContinueWatchingProgress() {
    try {
      const raw = localStorage.getItem('ishant_cw_progress_v1');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  saveContinueWatchingProgress(currentTime, duration, forceCompleted = false) {
    const dur = duration || 390;
    const cur = Math.max(0, Math.min(currentTime || 0, dur));
    const percent = Math.min(100, Math.round((cur / dur) * 100));
    const isCompleted = forceCompleted || percent >= 95;
    const state = {
      currentTime: Math.floor(cur * 10) / 10,
      duration: Math.round(dur),
      percent: isCompleted ? 100 : percent,
      completed: isCompleted,
      updatedAt: Date.now()
    };
    try {
      localStorage.setItem('ishant_cw_progress_v1', JSON.stringify(state));
      window.dispatchEvent(new CustomEvent('continue-watching-updated', { detail: state }));
    } catch (e) {}
  }

  close() {
    const videoEl = this.modalEl.querySelector('.pv-video-element');
    if (videoEl) {
      if (this.currentProject && this.currentProject.id === 'khatu-shyam-full-highlight') {
        this.saveContinueWatchingProgress(videoEl.currentTime, videoEl.duration || 390);
      }
      // Clean up media resources to prevent memory leaks and network caching
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
      videoEl.classList.remove('has-source');
    }

    this.stopPlayback();
    this.modalEl.classList.remove('active');
    document.body.style.overflow = '';

    // Remove aria-hidden on app
    const appEl = document.getElementById('netflix-app');
    if (appEl) appEl.removeAttribute('aria-hidden');

    // Restore previous focus
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      this.previousActiveElement.focus();
    }
  }

  togglePlayback() {
    const videoEl = this.modalEl.querySelector('.pv-video-element');
    const playActionBtn = this.modalEl.querySelector('.pv-play-action-btn');
    const playBarBtn = this.modalEl.querySelector('.pv-btn-play');

    if (videoEl.classList.contains('has-source')) {
      if (!videoEl.paused) {
        videoEl.pause();
      } else {
        videoEl.play().catch(err => console.log('Autoplay blocked:', err));
      }
      return;
    }

    if (this.isPlaying) {
      this.stopPlayback();
      playActionBtn.textContent = '▶';
      playBarBtn.textContent = '▶ Play Video';
    } else {
      this.isPlaying = true;
      playActionBtn.textContent = '❚❚';
      playBarBtn.textContent = '❚❚ Playing preview…';
      this.startSimulatedPlayback();
    }
  }

  startSimulatedPlayback() {
    clearInterval(this.playbackInterval);
    const timeIndicator = this.modalEl.querySelector('.pv-time-indicator');

    this.playbackInterval = setInterval(() => {
      this.playbackProgress += 1;
      if (this.playbackProgress > 100) {
        this.playbackProgress = 0;
      }
      this.updateScrubber(this.playbackProgress);

      const seconds = Math.floor((this.playbackProgress / 100) * 30);
      const formatted = `0:${seconds < 10 ? '0' : ''}${seconds}`;
      timeIndicator.textContent = `${formatted} / ${this.currentProject ? this.currentProject.duration : '0:30'}`;
    }, 200);
  }

  stopPlayback() {
    clearInterval(this.playbackInterval);
    this.isPlaying = false;
    const playActionBtn = this.modalEl.querySelector('.pv-play-action-btn');
    const playBarBtn = this.modalEl.querySelector('.pv-btn-play');
    if (playActionBtn) playActionBtn.textContent = '▶';
    if (playBarBtn) playBarBtn.textContent = '▶ Play Video';

    const videoEl = this.modalEl.querySelector('.pv-video-element');
    if (videoEl) {
      try { videoEl.pause(); } catch (e) {}
    }
  }

  updateScrubber(percent) {
    const scrubberFill = this.modalEl.querySelector('.pv-scrubber-fill');
    const scrubberTrack = this.modalEl.querySelector('.pv-scrubber-track');
    if (scrubberFill) {
      scrubberFill.style.width = `${percent}%`;
    }
    if (scrubberTrack) {
      scrubberTrack.setAttribute('aria-valuenow', Math.round(percent));
    }
  }
}

export const projectModal = new ProjectModalManager();
