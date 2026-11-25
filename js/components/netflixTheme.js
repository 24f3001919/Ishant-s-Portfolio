/**
 * Netflix Theme Component
 * Ishant Singh's Creative Portfolio
 * Restructured with exactly 4 main categories:
 * 1. Commercials
 * 2. Events
 * 3. 3D Motion Graphics
 * 4. Personal Projects
 * Content strictly aligned with Ishant Singh's official resume.
 */

import { SITE_CONFIG } from '../data/config.js';
import { PROJECTS, CONTINUE_WATCHING_PROJECT, SHOWREEL_PROJECTS, resolveVideoUrl } from '../data/projects.js';
import { projectModal } from './projectModal.js';

export class NetflixTheme {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentProfile = SITE_CONFIG.profiles[0]; // Default Recruiter
    this.heroSlides = PROJECTS.filter(p => p.isHeroFeatured);
    this.currentHeroIndex = 0;
    this.heroInterval = null;
    this.hasSelectedProfile = false;
  }

  render() {
    this.container.innerHTML = `
      <!-- Profile Selection Screen ("Who's watching?") -->
      <div class="nf-profile-overlay ${this.hasSelectedProfile ? 'hidden' : ''}" id="nf-profile-screen">
        <div class="nf-profile-content">
          <h1>Who's watching?</h1>
          <p class="sub">Choose a profile tailored to your visit to Ishant Singh's creative portfolio.</p>
          <div class="nf-profiles-grid">
            ${SITE_CONFIG.profiles.map(p => `
              <div class="nf-profile-card ${p.id === this.currentProfile.id ? 'selected' : ''}" data-profile-id="${p.id}" tabindex="0" role="button" aria-label="Select ${p.name} profile" style="--profile-accent: ${p.color};">
                <div class="nf-profile-avatar-wrap">
                  <img src="${p.avatar}" alt="${p.name}">
                  <div class="nf-profile-active-indicator" title="Selected Profile">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="#ffffff">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  </div>
                </div>
                <div class="nf-profile-name">${p.name}</div>
                <div class="nf-profile-badge">${p.badge}</div>
              </div>
            `).join('')}
          </div>
          <div class="nf-profile-actions">
            <button class="nf-manage-profiles-btn" id="nf-skip-profiles">Enter as <span id="nf-btn-profile-name">${this.currentProfile.name}</span></button>
          </div>
        </div>
      </div>

      <!-- Main Netflix Navigation Bar -->
      <nav class="nf-navbar" id="nf-nav">
        <div class="nf-navbar-left">
          <div class="nf-logo" data-scroll-to="nf-hero-anchor">ISHANT</div>
          <ul class="nf-nav-links">
            <li><a data-scroll-to="nf-hero-anchor" class="active">Home</a></li>
            <li><a data-scroll-to="nf-about-anchor">About</a></li>
            <li><a data-scroll-to="nf-showreel-section">Showreel</a></li>
            <li><a data-scroll-to="nf-category-commercials">Commercials</a></li>
            <li><a data-scroll-to="nf-category-events">Events</a></li>
            <li><a data-scroll-to="nf-category-3d-motion-graphics">3D Motion Graphics</a></li>
            <li><a data-scroll-to="nf-category-personal-projects">Personal Projects</a></li>
            <li><a data-scroll-to="nf-contact-anchor">Contact</a></li>
          </ul>
        </div>
        <div class="nf-navbar-right">
          <div class="nf-active-profile-pill" id="nf-profile-pill" title="Click to change profile">
            <div class="nf-avatar-mini">
              <img id="nf-nav-avatar" src="${this.currentProfile.avatar}" alt="${this.currentProfile.name}">
            </div>
            <span class="nf-profile-label" id="nf-nav-profile-name">${this.currentProfile.name}</span>
          </div>
          <button class="nf-switch-profile-btn" id="nf-switch-profile-btn">Switch Profile</button>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="nf-hero" id="nf-hero-anchor">
        ${this.heroSlides.map((p, idx) => `
          <div class="nf-hero-slide ${idx === 0 ? 'active' : ''}" data-hero-index="${idx}" style="background-image: url('${p.thumbnail}');">
            <div class="nf-hero-content">
              <div class="nf-hero-badge">
                <span class="nf-n-icon">I</span> FEATURED WORK · ${p.category}
              </div>
              <h1 class="nf-hero-title">${p.title}</h1>
              <div class="nf-hero-meta">
                <span class="match">${p.match}</span>
                <span class="badge-hd">HD 1080P</span>
                <span>${p.year}</span>
                <span class="cat-badge">${p.duration}</span>
              </div>
              <p class="nf-hero-desc">${p.description}</p>
              <div class="nf-hero-actions">
                <button class="nf-btn nf-btn-primary" data-play-project="${p.id}" aria-label="Play Featured Video">
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Play Video
                </button>
                <button class="nf-btn nf-btn-showreel" data-scroll-to="nf-showreel-section" data-trigger-showreel="true" aria-label="Watch Ishant's Master Showreel">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>
                  Watch Showreel
                </button>
                <button class="nf-btn nf-btn-secondary" data-scroll-to="nf-about-anchor" aria-label="View About Ishant section">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  About Ishant
                </button>
              </div>
            </div>
          </div>
        `).join('')}

        <!-- Carousel Indicators & Status -->
        <div class="nf-hero-dots">
          ${this.heroSlides.map((_, idx) => `
            <div class="nf-hero-dot ${idx === 0 ? 'active' : ''}" data-goto-hero="${idx}"></div>
          `).join('')}
        </div>
        <div class="nf-hero-now-playing" id="nf-hero-np" data-play-project="${this.heroSlides[0].id}">
          <span>▶ Now Featured: <b>${this.heroSlides[0].title}</b></span>
        </div>
      </header>

      <!-- About Ishant Section (Placed prominently directly below Hero) -->
      <section class="nf-about-section" id="nf-about-anchor">
        <div class="nf-about-poster-wrap">
          <img src="${SITE_CONFIG.assets.profilePhoto}" alt="${SITE_CONFIG.author.name}">
        </div>
        <div class="nf-about-info">
          <h2>ABOUT ISHANT SINGH</h2>
          <div class="nf-about-meta">
            <span class="match">2+ Years Experience</span>
            <span class="badge">VIDEO EDITOR | MOTION GRAPHICS ARTIST</span>
            <span class="badge-hd">RAIPUR, CHHATTISGARH</span>
            <span>2026</span>
          </div>
          <p class="nf-about-bio">Video Editor and Motion Graphics Artist with 2+ years of experience creating engaging visual content for brands, events and social media. Currently pursuing a B.Sc. in 3D Animation and VFX at AAFT University of Media and Arts.</p>

          <dl class="nf-specs-list">
            <dt>Education</dt>
            <dd>
              <strong>B.Sc. in 3D Animation and VFX</strong> (2023 – 2027)<br>
              <span class="nf-spec-sub">AAFT University of Media and Arts, Raipur</span>
            </dd>
            <dt>Experience</dt>
            <dd class="nf-experience-compact">
              <div class="nf-exp-item">
                <div class="nf-exp-header">
                  <strong>Freelance Video Editor &amp; Motion Graphics Artist</strong>
                  <span class="nf-exp-period">2025–2026</span>
                </div>
                <div class="nf-exp-desc">• Video editing, motion graphics and social media content.</div>
              </div>
              <div class="nf-exp-item">
                <div class="nf-exp-header">
                  <strong>Video Editor &amp; Social Media Handler | Elvn8 Clothing Brand</strong>
                  <span class="nf-exp-period">Nov 2025 – May 2026</span>
                </div>
                <div class="nf-exp-desc">• Editing and social media content strategy.</div>
              </div>
            </dd>
            <dt>Location</dt>
            <dd>${SITE_CONFIG.author.location}</dd>
            <dt>Contact</dt>
            <dd>
              <a href="mailto:${SITE_CONFIG.author.email}" class="nf-contact-link">${SITE_CONFIG.author.email}</a>
              <span class="nf-sep">·</span>
              <span class="nf-phone-val">${SITE_CONFIG.author.phone}</span>
            </dd>
          </dl>

          <!-- Separate Skill Blocks -->
          <div class="nf-skills-container">
            <!-- 1. Core Software (Cool-Toned Palette: Muted Teal/Blue) -->
            <div class="nf-skills-block">
              <div class="nf-skills-label software-label">Core Software</div>
              <div class="nf-pills-wrap">
                ${SITE_CONFIG.author.software.map(s => `<span class="nf-pill nf-pill-software">${s}</span>`).join('')}
              </div>
            </div>

            <!-- 2. Editing & Creative Skills (Warm-Toned Palette: Muted Coral/Red) -->
            <div class="nf-skills-block">
              <div class="nf-skills-label creative-label">Editing &amp; Creative Skills</div>
              <div class="nf-pills-wrap">
                ${SITE_CONFIG.author.skills.map(s => `<span class="nf-pill nf-pill-creative">${s}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="nf-about-actions">
            <button class="nf-btn nf-btn-primary" data-scroll-to="nf-continue-watching">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Continue Watching
            </button>
            <button class="nf-btn nf-btn-secondary" data-scroll-to="nf-contact-anchor">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- Dedicated Continue Watching Section        -->
      <!-- Featured Long-Format Production (06:30)    -->
      <!-- ========================================== -->
      <section class="nf-cw-section" id="nf-continue-watching">
        <div class="nf-cw-header">
          <div class="nf-cw-title-wrap">
            <h2 class="nf-cw-title">CONTINUE WATCHING</h2>
            <span class="nf-cw-badge">Featured Long-Format</span>
          </div>
          <div class="nf-cw-duration-chip">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            06:30 Master Cut
          </div>
        </div>

        <div class="nf-cw-card" id="nf-cw-card">
          <div class="nf-cw-thumb-box" id="nf-cw-thumb-box" data-play-project="${CONTINUE_WATCHING_PROJECT.id}" title="Click to play film">
            <img class="nf-cw-thumb-img" src="${CONTINUE_WATCHING_PROJECT.thumbnail}" alt="${CONTINUE_WATCHING_PROJECT.title}">
            <div class="nf-cw-thumb-overlay">
              <div class="nf-cw-play-circle" id="nf-cw-play-circle" title="Play / Resume Film">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><polygon points="7 4 20 12 7 20 7 4"/></svg>
              </div>
            </div>
            <div class="nf-cw-progress-wrap" title="Playback Progress">
              <div class="nf-cw-progress-fill" id="nf-cw-progress-fill" style="width: 0%;"></div>
            </div>
          </div>

          <div class="nf-cw-info">
            <div class="nf-cw-meta">
              <span class="match">${CONTINUE_WATCHING_PROJECT.match}</span>
              <span class="badge-hd">HD 1080P</span>
              <span class="duration-badge">${CONTINUE_WATCHING_PROJECT.duration}</span>
              <span class="year">${CONTINUE_WATCHING_PROJECT.year}</span>
              <span class="format-badge">Full Multi-Cam Highlight</span>
            </div>
            <h3 class="nf-cw-title-text">${CONTINUE_WATCHING_PROJECT.title}</h3>
            <p class="nf-cw-desc">${CONTINUE_WATCHING_PROJECT.description}</p>
            
            <div class="nf-cw-status-row">
              <span class="nf-cw-status-text" id="nf-cw-status-text">Ready to watch · 06:30</span>
            </div>

            <div class="nf-cw-actions">
              <button class="nf-btn nf-btn-primary" id="nf-cw-resume-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                <span id="nf-cw-btn-label">Play Film</span>
              </button>
              <button class="nf-btn nf-btn-secondary" id="nf-cw-restart-btn" style="display: none;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                Start from Beginning
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Dedicated Curated Showreel Section (Exactly 4 Signature Projects) -->
      <section class="nf-section-row nf-showreel-section" id="nf-showreel-section">
        <div class="nf-row-header nf-showreel-header">
          <div class="nf-showreel-header-left">
            <h2 class="nf-row-title">Showreel</h2>
            <span class="nf-showreel-badge">Curated Highlights · 4 Signature Projects</span>
          </div>
          <span class="nf-row-see-all">01 - 04 Reel Order</span>
        </div>
        <div class="nf-carousel-wrapper">
          <button class="nf-carousel-nav-btn nf-carousel-prev" aria-label="Previous items" disabled>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <div class="nf-carousel-track nf-showreel-track">
            ${SHOWREEL_PROJECTS.map((p, idx) => `
              <div class="nf-card nf-showreel-card ${p.isVertical ? 'is-vertical-card' : ''}" data-project-id="${p.id}" data-video-url="${resolveVideoUrl(p.videoUrl) || ''}">
                <div class="nf-showreel-rank-badge">0${idx + 1}</div>
                <div class="nf-card-media-wrap">
                  <img class="nf-card-thumb" src="${p.thumbnail}" alt="${p.title}" loading="lazy">
                  ${p.hasRealVideo ? '<div class="nf-card-video-slot"></div>' : ''}
                </div>
                <div class="nf-card-title-overlay">${p.title}</div>
                <div class="nf-card-hover-drawer">
                  <div class="nf-card-hover-icons">
                    <div class="nf-hover-circle-btn play-btn" data-play-project="${p.id}" title="Play preview">▶</div>
                    <div class="nf-hover-circle-btn" title="Add to Watchlist">+</div>
                    <div class="nf-hover-circle-btn" title="Like">♥</div>
                  </div>
                  <div class="nf-card-hover-meta">
                    <span class="match">${p.match}</span>
                    <span class="duration">${p.duration}</span>
                  </div>
                  <div class="nf-card-hover-tags">${(p.tags || []).join(' · ')}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <button class="nf-carousel-nav-btn nf-carousel-next" aria-label="Next items">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 4 Main Portfolio Categories                -->
      <!-- ========================================== -->

      <!-- 1. Commercials -->
      <section class="nf-section-row" id="nf-category-commercials">
        <div class="nf-row-header">
          <h2 class="nf-row-title">Commercials</h2>
          <span class="nf-row-see-all">${PROJECTS.filter(p => p.category === 'Commercials').length} ${PROJECTS.filter(p => p.category === 'Commercials').length === 1 ? 'Project' : 'Projects'}</span>
        </div>
        <div class="nf-carousel-wrapper">
          <button class="nf-carousel-nav-btn nf-carousel-prev" aria-label="Previous items" disabled>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.category === 'Commercials').map(p => this.renderProjectCard(p)).join('')}
          </div>
          <button class="nf-carousel-nav-btn nf-carousel-next" aria-label="Next items">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </section>

      <!-- 2. Events -->
      <section class="nf-section-row" id="nf-category-events">
        <div class="nf-row-header">
          <h2 class="nf-row-title">Events</h2>
          <span class="nf-row-see-all">${PROJECTS.filter(p => p.category === 'Events').length} ${PROJECTS.filter(p => p.category === 'Events').length === 1 ? 'Project' : 'Projects'}</span>
        </div>
        <div class="nf-carousel-wrapper">
          <button class="nf-carousel-nav-btn nf-carousel-prev" aria-label="Previous items" disabled>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.category === 'Events').map(p => this.renderProjectCard(p)).join('')}
          </div>
          <button class="nf-carousel-nav-btn nf-carousel-next" aria-label="Next items">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </section>

      <!-- 3. 3D Motion Graphics -->
      <section class="nf-section-row" id="nf-category-3d-motion-graphics">
        <div class="nf-row-header">
          <h2 class="nf-row-title">3D Motion Graphics</h2>
          <span class="nf-row-see-all">${PROJECTS.filter(p => p.category === '3D Motion Graphics').length} ${PROJECTS.filter(p => p.category === '3D Motion Graphics').length === 1 ? 'Project' : 'Projects'}</span>
        </div>
        <div class="nf-carousel-wrapper">
          <button class="nf-carousel-nav-btn nf-carousel-prev" aria-label="Previous items" disabled>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.category === '3D Motion Graphics').map(p => this.renderProjectCard(p)).join('')}
          </div>
          <button class="nf-carousel-nav-btn nf-carousel-next" aria-label="Next items">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </section>

      <!-- 4. Personal Projects -->
      <section class="nf-section-row" id="nf-category-personal-projects">
        <div class="nf-row-header">
          <h2 class="nf-row-title">Personal Projects</h2>
          <span class="nf-row-see-all">${PROJECTS.filter(p => p.category === 'Personal Projects').length} ${PROJECTS.filter(p => p.category === 'Personal Projects').length === 1 ? 'Project' : 'Projects'}</span>
        </div>
        <div class="nf-carousel-wrapper">
          <button class="nf-carousel-nav-btn nf-carousel-prev" aria-label="Previous items" disabled>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.category === 'Personal Projects').map(p => this.renderProjectCard(p)).join('')}
          </div>
          <button class="nf-carousel-nav-btn nf-carousel-next" aria-label="Next items">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="nf-contact-section" id="nf-contact-anchor">
        <div class="nf-contact-header">
          <h2>GET IN TOUCH</h2>
          <p class="sub">Have a commercial, event film, or creative project in mind? Send Ishant an inquiry.</p>
        </div>

        <form class="nf-contact-form" id="nf-inquiry-form" novalidate>
          <!-- Honeypot anti-spam field (hidden from legitimate users) -->
          <div class="nf-hp-field" style="display: none !important;" aria-hidden="true">
            <input type="text" name="_gotcha" id="contact-gotcha" tabindex="-1" autocomplete="off">
          </div>

          <div class="nf-form-grid">
            <div class="nf-input-group" id="group-name">
              <label for="contact-name" class="nf-input-label">Your Name <span class="nf-req">*</span></label>
              <input class="nf-input" id="contact-name" type="text" name="name" placeholder="Your name" required autocomplete="name">
              <span class="nf-field-error" id="name-error">Please enter your name.</span>
            </div>
            <div class="nf-input-group" id="group-email">
              <label for="contact-email" class="nf-input-label">Email Address <span class="nf-req">*</span></label>
              <input class="nf-input" id="contact-email" type="email" name="email" placeholder="name@example.com" required autocomplete="email">
              <span class="nf-field-error" id="email-error">Please enter a valid email address.</span>
            </div>
            <div class="nf-input-group nf-form-full">
              <label for="contact-project-type" class="nf-input-label">Project Type</label>
              <select class="nf-select" id="contact-project-type" name="projectType">
                <option value="Commercials">Commercials &amp; Brand Ads</option>
                <option value="Events">Events &amp; Celebration Films</option>
                <option value="3D Motion Graphics">3D Motion Graphics &amp; VFX</option>
                <option value="Personal Projects">Personal / Creative Projects</option>
                <option value="Other Inquiries">Other Creative Inquiry</option>
              </select>
            </div>
            <div class="nf-input-group nf-form-full" id="group-message">
              <label for="contact-message" class="nf-input-label">Project Description / Message <span class="nf-req">*</span></label>
              <textarea class="nf-textarea" id="contact-message" name="message" rows="5" placeholder="Tell me about your project, timeline, and vision..." required></textarea>
              <span class="nf-field-error" id="message-error">Please enter your project message (at least 10 characters).</span>
            </div>
            <div class="nf-form-full">
              <button type="submit" class="nf-submit-btn" id="nf-submit-btn">Submit Inquiry</button>
              <div class="nf-form-feedback" id="nf-form-feedback"></div>
            </div>
          </div>
        </form>
      </section>

      <!-- Footer -->
      <footer class="nf-footer">
        <div>© 2026 ${SITE_CONFIG.author.name} · ${SITE_CONFIG.author.role}</div>
        <div>Raipur, Chhattisgarh · AAFT University of Media and Arts</div>
      </footer>

      <!-- Showreel Dialog Placement Modal -->
      <div class="nf-showreel-modal" id="nf-showreel-modal" style="display: none;">
        <div class="nf-showreel-dialog" role="dialog" aria-modal="true" aria-labelledby="nf-showreel-title">
          <button class="nf-showreel-close" id="nf-showreel-close-btn" aria-label="Close dialog">✕</button>
          <div class="nf-showreel-icon">
            <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="#e50914" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8" fill="#e50914"/>
            </svg>
          </div>
          <h3 id="nf-showreel-title">Master Showreel Placement</h3>
          <p>
            Ishant's dedicated 2026 Master Showreel placement is ready. Awaiting the standalone master showreel video file. In the meantime, you can experience the featured luxury commercial or the 06:30 long-format film below!
          </p>
          <div class="nf-showreel-actions">
            <button class="nf-btn nf-btn-primary" id="nf-sr-play-featured">▶ Play Featured Commercial</button>
            <button class="nf-btn nf-btn-secondary" id="nf-sr-dismiss">Explore Projects</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.startHeroCarousel();
  }

  renderProjectCard(p) {
    return `
      <div class="nf-card ${p.isVertical ? 'is-vertical-card' : ''}" data-project-id="${p.id}" data-video-url="${resolveVideoUrl(p.videoUrl) || ''}">
        <div class="nf-card-media-wrap">
          <img class="nf-card-thumb" src="${p.thumbnail}" alt="${p.title}" loading="lazy">
          ${p.hasRealVideo ? '<div class="nf-card-video-slot"></div>' : ''}
        </div>
        <div class="nf-card-title-overlay">${p.title}</div>
        <div class="nf-card-hover-drawer">
          <div class="nf-card-hover-icons">
            <div class="nf-hover-circle-btn play-btn" data-play-project="${p.id}" title="Play preview">▶</div>
            <div class="nf-hover-circle-btn" title="Add to Watchlist">+</div>
            <div class="nf-hover-circle-btn" title="Like">♥</div>
          </div>
          <div class="nf-card-hover-meta">
            <span class="match">${p.match}</span>
            <span class="duration">${p.duration}</span>
          </div>
          <div class="nf-card-hover-tags">${(p.tags || []).join(' · ')}</div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // 1. Profile selection clicks
    const profileOverlay = document.getElementById('nf-profile-screen');
    const profileCards = this.container.querySelectorAll('.nf-profile-card');
    const skipBtn = document.getElementById('nf-skip-profiles');
    const switchProfileBtn = document.getElementById('nf-switch-profile-btn');
    const profilePill = document.getElementById('nf-profile-pill');

    const selectProfile = (profile) => {
      this.currentProfile = profile;
      this.hasSelectedProfile = true;
      profileCards.forEach(c => {
        c.classList.toggle('selected', c.dataset.profileId === profile.id);
      });

      const navAvatar = document.getElementById('nf-nav-avatar');
      const navName = document.getElementById('nf-nav-profile-name');
      if (navAvatar) navAvatar.src = profile.avatar;
      if (navName) navName.textContent = profile.name;

      if (profileOverlay) {
        profileOverlay.classList.add('hidden');
      }
      document.body.classList.remove('profile-active');
    };

    profileCards.forEach(card => {
      const updateSelection = () => {
        const pId = card.dataset.profileId;
        const profile = SITE_CONFIG.profiles.find(p => p.id === pId);
        if (profile) {
          this.currentProfile = profile;
          profileCards.forEach(c => c.classList.toggle('selected', c.dataset.profileId === profile.id));
          const btnName = document.getElementById('nf-btn-profile-name');
          if (btnName) btnName.textContent = profile.name;
        }
      };

      card.addEventListener('mouseenter', updateSelection);
      card.addEventListener('focus', updateSelection);

      card.addEventListener('click', () => {
        const pId = card.dataset.profileId;
        const profile = SITE_CONFIG.profiles.find(p => p.id === pId);
        if (profile) selectProfile(profile);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') card.click();
      });
    });

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        selectProfile(this.currentProfile || SITE_CONFIG.profiles[0]);
      });
    }

    const showProfileSelector = () => {
      document.body.classList.add('profile-active');
      if (profileOverlay) {
        profileOverlay.classList.remove('hidden');
      }
    };

    if (switchProfileBtn) switchProfileBtn.addEventListener('click', showProfileSelector);
    if (profilePill) profilePill.addEventListener('click', showProfileSelector);

    // 2. Smooth scrolling for nav links
    this.container.querySelectorAll('[data-scroll-to]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.scrollTo;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const navHeight = document.getElementById('nf-nav')?.offsetHeight || 70;
          const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = targetId === 'nf-hero-anchor' ? 0 : elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update active link styling
          this.container.querySelectorAll('.nf-nav-links a').forEach(a => a.classList.remove('active'));
          if (link.closest('.nf-nav-links')) {
            link.classList.add('active');
          }
        }
      });
    });

    // 3. Carousel Chevron Scroll Controls
    this.container.querySelectorAll('.nf-carousel-wrapper').forEach(wrapper => {
      const track = wrapper.querySelector('.nf-carousel-track');
      const prevBtn = wrapper.querySelector('.nf-carousel-prev');
      const nextBtn = wrapper.querySelector('.nf-carousel-next');
      if (!track || !prevBtn || !nextBtn) return;

      const updateArrows = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.disabled = track.scrollLeft <= 6;
        nextBtn.disabled = track.scrollLeft >= maxScroll - 6 || maxScroll <= 0;
      };

      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        track.scrollBy({ left: -(track.clientWidth * 0.75), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        track.scrollBy({ left: track.clientWidth * 0.75, behavior: 'smooth' });
      });

      track.addEventListener('scroll', updateArrows, { passive: true });
      window.addEventListener('resize', updateArrows, { passive: true });
      setTimeout(updateArrows, 150);
    });

    // 4. Desktop Hover Video Previews (Debounced, Muted, Single Active Instance)
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let hoverTimer = null;
    let activeHoverCard = null;

    const stopHoverPreview = () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      if (activeHoverCard) {
        const slot = activeHoverCard.querySelector('.nf-card-video-slot');
        if (slot) {
          const video = slot.querySelector('video');
          if (video) {
            try {
              video.pause();
              video.removeAttribute('src');
              video.load();
              video.remove();
            } catch (e) {}
          }
          slot.innerHTML = '';
        }
        activeHoverCard.classList.remove('has-preview');
        activeHoverCard = null;
      }
    };

    if (canHover) {
      this.container.querySelectorAll('.nf-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          const videoUrl = card.dataset.videoUrl;
          if (!videoUrl) return;

          stopHoverPreview();
          activeHoverCard = card;

          hoverTimer = setTimeout(() => {
            if (activeHoverCard !== card) return;
            const slot = card.querySelector('.nf-card-video-slot');
            if (!slot) return;

            const video = document.createElement('video');
            video.className = 'nf-hover-video';
            video.src = videoUrl;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.preload = 'metadata';

            video.play().then(() => {
              if (activeHoverCard === card) {
                card.classList.add('has-preview');
              } else {
                video.pause();
                video.removeAttribute('src');
                video.load();
                video.remove();
              }
            }).catch(() => {
              // Ignore abort or autoplay restrictions
            });

            slot.appendChild(video);
          }, 280);
        });

        card.addEventListener('mouseleave', () => {
          if (activeHoverCard === card) {
            stopHoverPreview();
          }
        });
      });

      window.addEventListener('scroll', stopHoverPreview, { passive: true });
    }

    // 5. Active Section Scroll-Spy via IntersectionObserver
    const navLinks = this.container.querySelectorAll('.nf-nav-links a');
    const sections = [
      document.getElementById('nf-hero-anchor'),
      document.getElementById('nf-about-anchor'),
      document.getElementById('nf-showreel-section'),
      document.getElementById('nf-category-commercials'),
      document.getElementById('nf-category-events'),
      document.getElementById('nf-category-3d-motion-graphics'),
      document.getElementById('nf-category-personal-projects'),
      document.getElementById('nf-contact-anchor')
    ].filter(Boolean);

    if ('IntersectionObserver' in window && sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('active', link.dataset.scrollTo === targetId);
            });
          }
        });
      }, {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
      });

      sections.forEach(sec => observer.observe(sec));
    }

    // 6. Project Click to Open Modal
    this.container.addEventListener('click', (e) => {
      stopHoverPreview();

      const playBtn = e.target.closest('[data-play-project]');
      if (playBtn) {
        e.stopPropagation();
        projectModal.open(playBtn.dataset.playProject);
        return;
      }

      const card = e.target.closest('.nf-card');
      if (card && card.dataset.projectId) {
        projectModal.open(card.dataset.projectId);
        return;
      }

      const heroDot = e.target.closest('[data-goto-hero]');
      if (heroDot) {
        this.goToHeroSlide(parseInt(heroDot.dataset.gotoHero, 10));
      }
    });

    // 7. Showreel Trigger and Dialog
    const showreelModal = document.getElementById('nf-showreel-modal');
    const showreelCloseBtn = document.getElementById('nf-showreel-close-btn');
    const showreelDismissBtn = document.getElementById('nf-sr-dismiss');
    const showreelPlayFeaturedBtn = document.getElementById('nf-sr-play-featured');

    const openShowreelModal = () => {
      const showreelSec = document.getElementById('nf-showreel-section');
      if (showreelSec) {
        const navHeight = document.getElementById('nf-nav')?.offsetHeight || 70;
        const elementPosition = showreelSec.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth'
        });
      } else if (SITE_CONFIG.assets.heroShowreel) {
        projectModal.open(SITE_CONFIG.assets.heroShowreel);
      } else if (showreelModal) {
        showreelModal.style.display = 'flex';
      }
    };

    const closeShowreelModal = () => {
      if (showreelModal) showreelModal.style.display = 'none';
    };

    this.container.querySelectorAll('[data-trigger-showreel]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openShowreelModal();
      });
    });

    if (showreelCloseBtn) showreelCloseBtn.addEventListener('click', closeShowreelModal);
    if (showreelDismissBtn) showreelDismissBtn.addEventListener('click', closeShowreelModal);
    if (showreelModal) {
      showreelModal.addEventListener('click', (e) => {
        if (e.target === showreelModal) closeShowreelModal();
      });
    }
    if (showreelPlayFeaturedBtn) {
      showreelPlayFeaturedBtn.addEventListener('click', () => {
        closeShowreelModal();
        projectModal.open('villa-omnia-resort');
      });
    }

    // 8. Contact Form Submission & Production Validation
    const form = document.getElementById('nf-inquiry-form');
    if (form) {
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      const projectTypeInput = document.getElementById('contact-project-type');
      const gotchaInput = document.getElementById('contact-gotcha');
      const feedbackEl = document.getElementById('nf-form-feedback');
      const submitBtn = document.getElementById('nf-submit-btn');

      const clearErrors = () => {
        document.querySelectorAll('.nf-input-group').forEach(g => g.classList.remove('has-error'));
        document.querySelectorAll('.nf-input, .nf-textarea').forEach(i => i.classList.remove('is-invalid'));
      };

      [nameInput, emailInput, messageInput].forEach(inp => {
        if (inp) {
          inp.addEventListener('input', () => {
            const group = inp.closest('.nf-input-group');
            if (group) group.classList.remove('has-error');
            inp.classList.remove('is-invalid');
          });
        }
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        // Anti-spam honeypot: if filled, silently succeed
        if (gotchaInput && gotchaInput.value.trim() !== '') {
          if (feedbackEl) {
            feedbackEl.className = 'nf-form-feedback visible';
            feedbackEl.textContent = '✓ Inquiry received. Thank you!';
          }
          form.reset();
          return;
        }

        let hasError = false;
        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const messageVal = messageInput ? messageInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nameVal.length < 2) {
          const grp = document.getElementById('group-name');
          if (grp) grp.classList.add('has-error');
          if (nameInput) nameInput.classList.add('is-invalid');
          hasError = true;
        }

        if (!emailRegex.test(emailVal)) {
          const grp = document.getElementById('group-email');
          if (grp) grp.classList.add('has-error');
          if (emailInput) emailInput.classList.add('is-invalid');
          hasError = true;
        }

        if (messageVal.length < 10) {
          const grp = document.getElementById('group-message');
          if (grp) grp.classList.add('has-error');
          if (messageInput) messageInput.classList.add('is-invalid');
          hasError = true;
        }

        if (hasError) return;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        const endpoint = SITE_CONFIG.formspreeEndpoint;
        const targetEmail = SITE_CONFIG.author.email || 'ishant.edit@gmail.com';

        const triggerMailtoFallback = () => {
          const subject = encodeURIComponent(`Portfolio Inquiry: ${nameVal} [${projectTypeInput ? projectTypeInput.value : 'General'}]`);
          const body = encodeURIComponent(`Client Name: ${nameVal}\nEmail: ${emailVal}\nProject Focus: ${projectTypeInput ? projectTypeInput.value : 'General'}\n\nProject Scope & Message:\n${messageVal}`);
          const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

          if (feedbackEl) {
            feedbackEl.className = 'nf-form-feedback visible';
            feedbackEl.textContent = `✓ Inquiry ready! Opening your email app to deliver to ${targetEmail}...`;
          }

          setTimeout(() => {
            window.location.href = mailtoUrl;
          }, 350);

          form.reset();
        };

        if (endpoint && endpoint.trim().length > 0) {
          try {
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: nameVal,
                email: emailVal,
                projectType: projectTypeInput ? projectTypeInput.value : 'General',
                message: messageVal
              })
            });

            if (res.ok) {
              if (feedbackEl) {
                feedbackEl.className = 'nf-form-feedback visible';
                feedbackEl.textContent = `✓ Inquiry sent directly to Ishant's inbox (${targetEmail})!`;
              }
              form.reset();
            } else {
              triggerMailtoFallback();
            }
          } catch (err) {
            triggerMailtoFallback();
          }
        } else {
          triggerMailtoFallback();
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Inquiry';
        }

        setTimeout(() => {
          if (feedbackEl) feedbackEl.classList.remove('visible');
        }, 8000);
      });
    }

    // 8. Navbar scroll state
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('nf-nav');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }
    }, { passive: true });

    // 9. Continue Watching Interactions & Sync
    const cwThumb = document.getElementById('nf-cw-thumb-box');
    const cwResumeBtn = document.getElementById('nf-cw-resume-btn');
    const cwRestartBtn = document.getElementById('nf-cw-restart-btn');

    if (cwThumb) {
      cwThumb.addEventListener('click', (e) => {
        e.stopPropagation();
        projectModal.open(CONTINUE_WATCHING_PROJECT.id, { autoplay: true });
      });
    }

    if (cwResumeBtn) {
      cwResumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        projectModal.open(CONTINUE_WATCHING_PROJECT.id, { autoplay: true });
      });
    }

    if (cwRestartBtn) {
      cwRestartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        projectModal.open(CONTINUE_WATCHING_PROJECT.id, { startAt: 0, autoplay: true });
      });
    }

    window.addEventListener('continue-watching-updated', () => {
      this.updateContinueWatchingUI();
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'ishant_cw_progress_v1') {
        this.updateContinueWatchingUI();
      }
    });

    // Initial check on load
    this.updateContinueWatchingUI();
  }

  formatTime(secs) {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  updateContinueWatchingUI() {
    const card = document.getElementById('nf-cw-card');
    if (!card) return;

    const progressFill = document.getElementById('nf-cw-progress-fill');
    const statusText = document.getElementById('nf-cw-status-text');
    const btnLabel = document.getElementById('nf-cw-btn-label');
    const restartBtn = document.getElementById('nf-cw-restart-btn');

    let state = null;
    try {
      const raw = localStorage.getItem('ishant_cw_progress_v1');
      if (raw) state = JSON.parse(raw);
    } catch (e) {}

    const totalDur = state?.duration || 390;
    const curTime = state?.currentTime || 0;
    const pct = state?.percent || 0;
    const isCompleted = state?.completed || pct >= 95;

    if (isCompleted) {
      if (progressFill) progressFill.style.width = '100%';
      if (statusText) {
        statusText.innerHTML = '<span style="color: #46d369;">✓ Completed</span> · 06:30 Master Cut · Replay Available';
      }
      if (btnLabel) btnLabel.textContent = 'Replay Film';
      if (restartBtn) restartBtn.style.display = 'none';
    } else if (curTime >= 5 && pct < 95) {
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (statusText) {
        statusText.innerHTML = `<span style="color: #e50914;">▶ In Progress:</span> Watched ${this.formatTime(curTime)} of ${this.formatTime(totalDur)} (${pct}%)`;
      }
      if (btnLabel) btnLabel.textContent = `Resume at ${this.formatTime(curTime)}`;
      if (restartBtn) restartBtn.style.display = 'inline-flex';
    } else {
      if (progressFill) progressFill.style.width = '0%';
      if (statusText) {
        statusText.innerHTML = 'Ready to watch · 06:30 Master Cut';
      }
      if (btnLabel) btnLabel.textContent = 'Play Film';
      if (restartBtn) restartBtn.style.display = 'none';
    }
  }

  startHeroCarousel() {
    clearInterval(this.heroInterval);
    this.heroInterval = setInterval(() => {
      if (!this.hasSelectedProfile) return;
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroSlides.length;
      this.updateHeroSlide();
    }, 7000);
  }

  goToHeroSlide(index) {
    this.currentHeroIndex = index;
    this.updateHeroSlide();
    this.startHeroCarousel();
  }

  updateHeroSlide() {
    const slides = this.container.querySelectorAll('.nf-hero-slide');
    const dots = this.container.querySelectorAll('.nf-hero-dot');
    const npTitle = document.getElementById('nf-hero-np');

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === this.currentHeroIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentHeroIndex);
    });

    if (npTitle && this.heroSlides[this.currentHeroIndex]) {
      const cur = this.heroSlides[this.currentHeroIndex];
      npTitle.innerHTML = `<span>▶ Now Featured: <b>${cur.title}</b></span>`;
      npTitle.dataset.playProject = cur.id;
    }
  }
}
