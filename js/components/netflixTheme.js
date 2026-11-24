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
import { PROJECTS } from '../data/projects.js';
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
              <div class="nf-profile-card ${p.id === this.currentProfile.id ? 'selected' : ''}" data-profile-id="${p.id}" tabindex="0" style="--profile-accent: ${p.color};">
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
          <button class="nf-manage-profiles-btn" id="nf-skip-profiles">Enter Portfolio</button>
        </div>
      </div>

      <!-- Main Netflix Navigation Bar -->
      <nav class="nf-navbar" id="nf-nav">
        <div class="nf-navbar-left">
          <div class="nf-logo" data-scroll-to="nf-hero-anchor">ISHANT</div>
          <ul class="nf-nav-links">
            <li><a data-scroll-to="nf-hero-anchor" class="active">Home</a></li>
            <li><a data-scroll-to="nf-about-anchor">About</a></li>
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
                <button class="nf-btn nf-btn-primary" data-play-project="${p.id}">
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Play Video
                </button>
                <button class="nf-btn nf-btn-secondary" data-scroll-to="nf-about-anchor">
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
            <button class="nf-btn nf-btn-primary" data-scroll-to="nf-category-commercials">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Explore Commercials
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
      <!-- 4 Main Portfolio Categories                -->
      <!-- ========================================== -->

      <!-- 1. Commercials -->
      <section class="nf-section-row" id="nf-category-commercials">
        <div class="nf-row-header">
          <h2 class="nf-row-title">Commercials</h2>
          <span class="nf-row-see-all">${PROJECTS.filter(p => p.category === 'Commercials').length} Projects</span>
        </div>
        <div class="nf-carousel-wrapper">
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.category === 'Commercials').map(p => this.renderProjectCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- 2. Events -->
      <section class="nf-section-row" id="nf-category-events">
        <div class="nf-row-header">
          <h2 class="nf-row-title">Events</h2>
          <span class="nf-row-see-all">${PROJECTS.filter(p => p.category === 'Events').length} Projects</span>
        </div>
        <div class="nf-carousel-wrapper">
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.category === 'Events').map(p => this.renderProjectCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- 3. 3D Motion Graphics -->
      <section class="nf-section-row" id="nf-category-3d-motion-graphics">
        <div class="nf-row-header">
          <h2 class="nf-row-title">3D Motion Graphics</h2>
          <span class="nf-row-see-all">AAFT University of Media and Arts</span>
        </div>
        <div class="nf-carousel-wrapper">
          <div class="nf-carousel-track">
            <div class="nf-3d-showcase-card">
              <div>
                <span class="nf-3d-badge">Degree in Progress · 2023 – 2027</span>
                <h3 class="nf-3d-title">B.Sc. in 3D Animation and VFX</h3>
                <p class="nf-3d-desc">
                  Currently pursuing academic training in 3D modeling, lighting, dynamics, and visual effects pipelines at AAFT University of Media and Arts, Raipur. Semester CGI showreels and procedural motion design projects are actively in production.
                </p>
                <div class="nf-3d-meta">
                  <span>📍 AAFT University, Raipur</span>
                  <span>•</span>
                  <span>🎬 3D Motion Graphics &amp; VFX</span>
                </div>
              </div>
              <div style="margin-top: 20px;">
                <button class="nf-btn nf-btn-primary" data-scroll-to="nf-contact-anchor" style="font-size: 13px; padding: 9px 18px;">
                  Inquire for 3D Projects &amp; Collaboration
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Personal Projects -->
      <section class="nf-section-row" id="nf-category-personal-projects">
        <div class="nf-row-header">
          <h2 class="nf-row-title">Personal Projects</h2>
          <span class="nf-row-see-all">${PROJECTS.filter(p => p.category === 'Personal Projects').length} Projects</span>
        </div>
        <div class="nf-carousel-wrapper">
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.category === 'Personal Projects').map(p => this.renderProjectCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="nf-contact-section" id="nf-contact-anchor">
        <h2>GET IN TOUCH</h2>
        <p class="sub">Have a commercial, event film, or creative project in mind? Reach out to Ishant directly.</p>

        <!-- Direct Contact Info Strip -->
        <div class="nf-contact-details-bar">
          <div class="nf-contact-card">
            <div class="nf-contact-label">EMAIL</div>
            <a href="mailto:${SITE_CONFIG.author.email}" class="nf-contact-value">${SITE_CONFIG.author.email}</a>
          </div>
          <div class="nf-contact-card">
            <div class="nf-contact-label">PHONE</div>
            <a href="tel:${SITE_CONFIG.author.phone}" class="nf-contact-value">${SITE_CONFIG.author.phone}</a>
          </div>
          <div class="nf-contact-card">
            <div class="nf-contact-label">LOCATION</div>
            <div class="nf-contact-value">${SITE_CONFIG.author.location}</div>
          </div>
          <div class="nf-contact-card">
            <div class="nf-contact-label">ACADEMIC REFERENCE</div>
            <div class="nf-contact-value" style="font-size: 13px;">${SITE_CONFIG.author.reference.name} (${SITE_CONFIG.author.reference.title}, ${SITE_CONFIG.author.reference.institution})</div>
          </div>
        </div>

        <form class="nf-contact-form" id="nf-inquiry-form">
          <div class="nf-form-grid">
            <input class="nf-input" type="text" name="name" placeholder="Your name" required>
            <input class="nf-input" type="email" name="email" placeholder="Email address" required>
            <select class="nf-select nf-form-full" name="projectType">
              <option value="Commercials">Commercials &amp; Brand Ads</option>
              <option value="Events">Event Coverage &amp; Wedding Films</option>
              <option value="3D Motion Graphics">3D Motion Graphics &amp; VFX</option>
              <option value="Personal Projects">Personal / Creative Projects</option>
            </select>
            <textarea class="nf-textarea nf-form-full" name="message" rows="4" placeholder="Tell me about your project, timeline, and requirements..." required></textarea>
            <div class="nf-form-full">
              <button type="submit" class="nf-submit-btn">Send Message</button>
              <div class="nf-form-feedback" id="nf-form-success">
                ✓ Message received! Thank you for reaching out to Ishant.
              </div>
            </div>
          </div>
        </form>
      </section>

      <!-- Footer -->
      <footer class="nf-footer">
        <div>© 2026 ${SITE_CONFIG.author.name} · ${SITE_CONFIG.author.role}</div>
        <div>Raipur, Chhattisgarh · AAFT University of Media and Arts</div>
      </footer>
    `;

    this.bindEvents();
    this.startHeroCarousel();
  }

  renderProjectCard(p) {
    return `
      <div class="nf-card ${p.isVertical ? 'is-vertical-card' : ''}" data-project-id="${p.id}">
        <img class="nf-card-thumb" src="${p.thumbnail}" alt="${p.title}" loading="lazy">
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
        selectProfile(SITE_CONFIG.profiles[0]);
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

    // 3. Project Click to Open Modal
    this.container.addEventListener('click', (e) => {
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

    // 4. Contact form submission
    const form = document.getElementById('nf-inquiry-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const success = document.getElementById('nf-form-success');
        if (success) {
          success.classList.add('visible');
          form.reset();
          setTimeout(() => success.classList.remove('visible'), 5000);
        }
      });
    }

    // 5. Navbar scroll state
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('nf-nav');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }
    }, { passive: true });
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
