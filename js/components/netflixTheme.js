/**
 * Netflix Theme Component
 * Handles Profile Selection, Hero Carousel, Category Rails, and Smooth Page Scrolling
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
      <!-- Profile Selection Screen -->
      <div class="nf-profile-overlay ${this.hasSelectedProfile ? 'hidden' : ''}" id="nf-profile-screen">
        <div class="nf-profile-content">
          <h1>Who's watching?</h1>
          <p class="sub">Choose a profile tailored to your visit to Ishant's creative portfolio.</p>
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

      <!-- Main Netflix Interface -->
      <nav class="nf-navbar" id="nf-nav">
        <div class="nf-navbar-left">
          <div class="nf-logo" data-scroll-to="nf-hero-anchor">ISHANT</div>
          <ul class="nf-nav-links">
            <li><a data-scroll-to="nf-hero-anchor" class="active">Home</a></li>
            <li><a data-scroll-to="nf-about-anchor">About</a></li>
            <li><a data-scroll-to="nf-top8-section">Top 8</a></li>
            <li><a data-scroll-to="nf-category-commercials">Commercials</a></li>
            <li><a data-scroll-to="nf-category-video-editing">Video Editing</a></li>
            <li><a data-scroll-to="nf-category-reels---shorts">Reels &amp; Shorts</a></li>
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
                <span class="nf-n-icon">I</span> MOTION SERIES · ${p.category}
              </div>
              <h1 class="nf-hero-title">${p.title}</h1>
              <div class="nf-hero-meta">
                <span class="match">${p.match}</span>
                <span class="badge-hd">4K UHD</span>
                <span>${p.year}</span>
                <span class="cat-badge">${p.duration}</span>
              </div>
              <p class="nf-hero-desc">${p.description}</p>
              <div class="nf-hero-actions">
                <button class="nf-btn nf-btn-primary" data-play-project="${p.id}">
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Play Showreel
                </button>
                <button class="nf-btn nf-btn-secondary" data-scroll-to="nf-about-anchor">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  More Info
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
          <h2>ABOUT ISHANT</h2>
          <div class="nf-about-meta">
            <span class="match">100% Match</span>
            <span class="badge">PRODUCER / ARTIST</span>
            <span class="badge-hd">4K UHD</span>
            <span>2026</span>
          </div>
          <p class="nf-about-bio">${SITE_CONFIG.author.bio}</p>
          <dl class="nf-specs-list">
            <dt>Role</dt>
            <dd>${SITE_CONFIG.author.role}</dd>
            <dt>Education</dt>
            <dd>${SITE_CONFIG.author.education}</dd>
            <dt>Location</dt>
            <dd>${SITE_CONFIG.author.location}</dd>
          </dl>
          <div class="nf-pills-wrap">
            ${SITE_CONFIG.author.software.map(s => `<span class="nf-pill">${s}</span>`).join('')}
          </div>
          <div class="nf-about-actions">
            <button class="nf-btn nf-btn-primary" data-scroll-to="nf-top8-section">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Explore Projects
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

      <!-- Top 8 Projects This Week -->
      <section class="nf-section-row" id="nf-top8-section">
        <div class="nf-row-header">
          <h2 class="nf-row-title">Top 8 Projects This Week</h2>
        </div>
        <div class="nf-carousel-wrapper">
          <div class="nf-carousel-track">
            ${PROJECTS.filter(p => p.topRank).sort((a, b) => a.topRank - b.topRank).map(p => `
              <div class="nf-top-item" data-project-id="${p.id}">
                <div class="nf-top-rank-number">${p.topRank}</div>
                <div class="nf-top-poster">
                  <img src="${p.thumbnail}" alt="${p.title}" loading="lazy">
                  <div class="nf-top-label">${p.title}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Categories Rails -->
      ${SITE_CONFIG.categories.map(cat => {
        const catSlug = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const catProjects = PROJECTS.filter(p => p.category === cat);
        if (catProjects.length === 0) return '';
        return `
          <section class="nf-section-row" id="nf-category-${catSlug}">
            <div class="nf-row-header">
              <h2 class="nf-row-title">${cat}</h2>
              <span class="nf-row-see-all">${catProjects.length} Projects</span>
            </div>
            <div class="nf-carousel-wrapper ${cat === 'Reels & Shorts' ? 'nf-reels-rail' : ''}">
              <div class="nf-carousel-track">
                ${catProjects.map(p => `
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
                `).join('')}
              </div>
            </div>
          </section>
        `;
      }).join('')}

      <!-- Contact Section -->
      <section class="nf-contact-section" id="nf-contact-anchor">
        <h2>REQUEST A NEW TITLE</h2>
        <p class="sub">Have a project or film in mind? Send an inquiry and let's put your story on screen.</p>
        <form class="nf-contact-form" id="nf-inquiry-form">
          <div class="nf-form-grid">
            <input class="nf-input" type="text" name="name" placeholder="Your name" required>
            <input class="nf-input" type="email" name="email" placeholder="Email address" required>
            <select class="nf-select nf-form-full" name="projectType">
              <option value="3D Motion Graphics">3D Motion Graphics</option>
              <option value="Video Editing">Commercial Video Editing</option>
              <option value="Reels & Shorts">High-Retention Reels / Shorts</option>
              <option value="Showreel / Brand Film">Showreel / Brand Film</option>
            </select>
            <textarea class="nf-textarea nf-form-full" name="message" rows="4" placeholder="Tell me about your project, timeline, and vision..." required></textarea>
            <div class="nf-form-full">
              <button type="submit" class="nf-submit-btn">Send Request</button>
              <div class="nf-form-feedback" id="nf-form-success">
                ✓ Request received! (Prototype mode: Connected to client frontend)
              </div>
            </div>
          </div>
        </form>
      </section>

      <!-- Footer -->
      <footer class="nf-footer">
        <div>© 2026 ${SITE_CONFIG.author.name} · ${SITE_CONFIG.author.role}</div>
        <div>Cinematic Netflix-inspired creative portfolio. All media placeholders prepared for final assets.</div>
      </footer>
    `;

    this.bindEvents();
    this.startHeroCarousel();
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
      document.body.classList.remove('profile-active');
      if (profileOverlay) {
        profileOverlay.classList.add('hidden');
      }
      const avatarEl = document.getElementById('nf-nav-avatar');
      const nameEl = document.getElementById('nf-nav-profile-name');
      if (avatarEl) avatarEl.src = profile.avatar;
      if (nameEl) nameEl.textContent = profile.name;
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

    // 2. Smooth scrolling for nav links on window
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

      const card = e.target.closest('.nf-card') || e.target.closest('.nf-top-item');
      if (card && card.dataset.projectId) {
        projectModal.open(card.dataset.projectId);
        return;
      }

      const heroDot = e.target.closest('[data-goto-hero]');
      if (heroDot) {
        this.goToHeroSlide(parseInt(heroDot.dataset.gotoHero, 10));
      }
    });

    // 4. Window scroll detection for navbar styling
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('nf-nav');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }
    }, { passive: true });

    // 5. Contact form submission
    const form = document.getElementById('nf-inquiry-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const success = document.getElementById('nf-form-success');
        if (success) {
          success.style.display = 'block';
          form.reset();
        }
      });
    }
  }

  startHeroCarousel() {
    clearInterval(this.heroInterval);
    this.heroInterval = setInterval(() => {
      const nextIndex = (this.currentHeroIndex + 1) % this.heroSlides.length;
      this.goToHeroSlide(nextIndex);
    }, 6500);
  }

  goToHeroSlide(index) {
    this.currentHeroIndex = index;
    const slides = this.container.querySelectorAll('.nf-hero-slide');
    const dots = this.container.querySelectorAll('.nf-hero-dot');
    const np = document.getElementById('nf-hero-np');

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === index);
    });

    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === index);
    });

    if (np && this.heroSlides[index]) {
      const project = this.heroSlides[index];
      np.dataset.playProject = project.id;
      np.innerHTML = `<span>▶ Now Featured: <b>${project.title}</b></span>`;
    }
  }

  destroy() {
    clearInterval(this.heroInterval);
  }
}
