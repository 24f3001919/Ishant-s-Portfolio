/**
 * Project Details & Video Preview Modal Component
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
    this.init();
  }

  init() {
    // Create modal DOM structure
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'pv-modal-overlay';
    this.modalEl.innerHTML = `
      <div class="pv-modal-box" role="dialog" aria-modal="true">
        <button class="pv-modal-close-btn" aria-label="Close modal">✕</button>
        <div class="pv-player-container">
          <img class="pv-player-poster" src="" alt="Project Poster">
          <video class="pv-video-element" playsinline controls></video>
          <div class="pv-player-vignette"></div>
          <div class="pv-player-controls-overlay">
            <span class="pv-player-badge">PREVIEW PLAYER</span>
            <div class="pv-player-center-action">
              <button class="pv-play-action-btn" aria-label="Play Video">▶</button>
            </div>
            <div class="pv-player-bottom-bar">
              <h2 class="pv-player-title"></h2>
              <div class="pv-scrubber-track">
                <div class="pv-scrubber-fill"></div>
              </div>
              <div class="pv-playback-status-row">
                <span class="pv-time-indicator">0:00 / 0:30</span>
                <span class="pv-source-indicator">[Video file placeholder: Replace in assets/videos/]</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pv-modal-body">
          <div class="pv-modal-meta-row">
            <span class="pv-meta-match"></span>
            <span class="pv-meta-year"></span>
            <span class="pv-meta-duration"></span>
            <span class="pv-meta-hd">4K UHD</span>
            <span class="pv-meta-category"></span>
          </div>
          <p class="pv-modal-desc"></p>
          <div class="pv-tags-container">
            <span class="pv-tag-label">Tools & Tags:</span>
            <div class="pv-tags-list"></div>
          </div>
          <div class="pv-modal-actions">
            <button class="pv-btn pv-btn-play">▶ Play Full Preview</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modalEl);

    // Event Listeners
    const closeBtn = this.modalEl.querySelector('.pv-modal-close-btn');
    closeBtn.addEventListener('click', () => this.close());

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    const playActionBtn = this.modalEl.querySelector('.pv-play-action-btn');
    const playBarBtn = this.modalEl.querySelector('.pv-btn-play');
    playActionBtn.addEventListener('click', () => this.togglePlayback());
    playBarBtn.addEventListener('click', () => this.togglePlayback());
  }

  isOpen() {
    return this.modalEl.classList.contains('active');
  }

  open(projectId) {
    const project = typeof projectId === 'string'
      ? PROJECTS.find(p => p.id === projectId)
      : PROJECTS[projectId];

    if (!project) return;
    this.currentProject = project;

    // Populate data
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

    poster.src = project.thumbnail;
    title.textContent = project.title;
    match.textContent = project.match || '98% Match';
    year.textContent = project.year || '2026';
    duration.textContent = project.duration;
    category.textContent = project.category;
    desc.textContent = project.fullDescription || project.description;
    timeIndicator.textContent = `0:00 / ${project.duration}`;
    sourceIndicator.textContent = `[Target: ${project.videoUrl}]`;

    // Reset playback
    this.stopPlayback();
    this.playbackProgress = 0;
    this.updateScrubber(0);

    // Render tags
    tagsList.innerHTML = (project.tags || [])
      .map(t => `<span class="pv-tag-pill">${t}</span>`)
      .join(' ');

    // Handle video player source
    if (project.hasRealVideo && project.videoUrl) {
      videoEl.src = project.videoUrl;
      videoEl.classList.add('has-source');
      poster.style.display = 'none';
    } else {
      videoEl.removeAttribute('src');
      videoEl.classList.remove('has-source');
      poster.style.display = 'block';
    }

    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  togglePlayback() {
    const videoEl = this.modalEl.querySelector('.pv-video-element');
    const playActionBtn = this.modalEl.querySelector('.pv-play-action-btn');
    const playBarBtn = this.modalEl.querySelector('.pv-btn-play');

    if (videoEl.classList.contains('has-source') && !videoEl.paused) {
      videoEl.pause();
      this.isPlaying = false;
      playActionBtn.textContent = '▶';
      playBarBtn.textContent = '▶ Play Full Preview';
      return;
    } else if (videoEl.classList.contains('has-source')) {
      videoEl.play();
      this.isPlaying = true;
      playActionBtn.textContent = '❚❚';
      playBarBtn.textContent = '❚❚ Pause';
      return;
    }

    // Fallback interactive simulated player
    if (this.isPlaying) {
      this.stopPlayback();
      playActionBtn.textContent = '▶';
      playBarBtn.textContent = '▶ Play Full Preview';
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
    if (playBarBtn) playBarBtn.textContent = '▶ Play Full Preview';

    const videoEl = this.modalEl.querySelector('.pv-video-element');
    if (videoEl) {
      try { videoEl.pause(); } catch (e) {}
    }
  }

  updateScrubber(percent) {
    const scrubberFill = this.modalEl.querySelector('.pv-scrubber-fill');
    if (scrubberFill) {
      scrubberFill.style.width = `${percent}%`;
    }
  }

  close() {
    this.stopPlayback();
    this.modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export const projectModal = new ProjectModalManager();
