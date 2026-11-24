/**
 * Google Theme Component
 * Clean Google search experience: Homepage, live Search Results, Knowledge Panel, and Tabs
 */

import { SITE_CONFIG } from '../data/config.js';
import { PROJECTS } from '../data/projects.js';
import { projectModal } from './projectModal.js';

export class GoogleTheme {
  constructor(containerEl) {
    this.container = containerEl;
    this.viewState = 'home'; // 'home' | 'results'
    this.activeTab = 'all';  // 'all' | 'videos' | 'about' | 'contact'
    this.searchQuery = '';
    this.videoFilter = 'All';
    this.snippetInterval = null;
    this.snippetIndex = 0;
    this.suggestions = [
      'ishant video editor portfolio',
      '3D motion graphics blender',
      'commercial brand launch film',
      'about ishant education & skills',
      'hire ishant contact inquiry',
      'vertical reels & shorts 2026',
      'showreel 2026 full preview'
    ];
  }

  render() {
    if (this.viewState === 'home') {
      this.renderHome();
    } else {
      this.renderResults();
    }
  }

  getFilteredProjects() {
    if (!this.searchQuery.trim()) {
      return PROJECTS;
    }
    const q = this.searchQuery.toLowerCase().trim();
    return PROJECTS.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTags = (p.tags || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchCat || matchDesc || matchTags;
    });
  }

  renderHome() {
    clearInterval(this.snippetInterval);
    this.container.innerHTML = `
      <div class="gg-top-bar">
        <a data-gg-tab="about">About</a>
        <a data-gg-tab="videos">My Dedicated Portfolio</a>
        <a data-gg-tab="contact">Contact Me</a>
        <div class="gg-apps-icon" title="Google apps"></div>
        <div class="gg-avatar-btn" title="Google Account: Ishant">I</div>
      </div>

      <main class="gg-home-main">
        <div class="gg-brand-logo" id="gg-home-logo">
          <span class="c-blue-1">I</span><span class="c-red-1">s</span><span class="c-yellow">h</span><span class="c-blue-2">a</span><span class="c-green">n</span><span class="c-red-2">t</span>
        </div>

        <div class="gg-search-box">
          <div class="gg-search-input-wrap">
            <svg class="gg-search-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input class="gg-search-input" id="gg-main-search-input" type="text" placeholder="Search Ishant's projects, reels, or skills..." autocomplete="off">
          </div>
          <div class="gg-suggestions-dropdown" id="gg-suggestions"></div>
        </div>

        <div class="gg-home-buttons">
          <button class="gg-btn-search" id="gg-btn-search">Ishant Search</button>
          <button class="gg-btn-search" id="gg-btn-lucky">I'm Feeling Lucky</button>
        </div>

        <div class="gg-quick-tags">
          Ishant is also available in:
          <a data-quick-q="3D Motion Graphics">3D Motion</a>
          <a data-quick-q="Video Editing">Video Editing</a>
          <a data-quick-q="Commercials">Commercials</a>
          <a data-quick-q="Reels & Shorts">Reels</a>
        </div>
      </main>

      <footer class="gg-home-footer">
        <span>${SITE_CONFIG.author.location}</span>
        <span>·</span>
        <span>${SITE_CONFIG.author.role}</span>
        <span>·</span>
        <span>Interactive Google Search Theme</span>
      </footer>
    `;

    this.bindHomeEvents();
  }

  renderResults() {
    const results = this.getFilteredProjects();
    const heroFeatured = PROJECTS.filter(p => p.isHeroFeatured);

    let tabContent = '';

    if (this.activeTab === 'all') {
      tabContent = `
        <div class="gg-results-layout">
          <div>
            <div class="gg-search-stats">
              About ${results.length} results (0.${18 + results.length * 3} seconds)
            </div>

            <!-- Featured Snippet Carousel -->
            <div class="gg-featured-snippet">
              <div class="gg-snippet-reel">
                ${heroFeatured.map((p, idx) => `
                  <div class="gg-snippet-slide ${idx === 0 ? 'active' : ''}" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${p.thumbnail}');">
                    <small>${p.category}</small>
                    <h3>${p.title}</h3>
                  </div>
                `).join('')}
              </div>
              <div class="gg-snippet-info">
                <b>Ishant's Proof of Work Showcase</b>
                High-impact commercial video editing and 3D motion design. Click any search result below to inspect or preview video.
              </div>
            </div>

            <!-- Organic Search Results -->
            <div class="gg-organic-list">
              ${results.map(p => `
                <div class="gg-result-item" data-project-id="${p.id}">
                  <div>
                    <div class="gg-result-breadcrumb">
                      <div class="gg-result-favicon">I</div>
                      <div>
                        ishant.studio
                        <small>ishant.studio › portfolio › ${p.id}</small>
                      </div>
                    </div>
                    <h3 class="gg-result-title">${p.title} – ${p.category} | Ishant</h3>
                    <p class="gg-result-snippet">${p.duration} · ${p.description}</p>
                  </div>
                  <div class="gg-result-thumb-box">
                    <img src="${p.thumbnail}" alt="${p.title}" loading="lazy">
                    <span class="duration-tag">${p.duration}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- People Also Ask -->
            <div class="gg-paa-box">
              <h4>People also ask</h4>
              <details open>
                <summary>Who is Ishant?</summary>
                <p>${SITE_CONFIG.author.bio} He specializes in ${SITE_CONFIG.author.role}.</p>
              </details>
              <details>
                <summary>Which software does Ishant use for video editing & 3D?</summary>
                <p>Ishant works professionally with ${SITE_CONFIG.author.software.join(', ')}.</p>
              </details>
              <details>
                <summary>How can I hire Ishant for commercial projects or showreels?</summary>
                <p>You can use the <a data-gg-tab="contact">Contact tab</a> or submit an inquiry directly through this portfolio.</p>
              </details>
            </div>
          </div>

          <!-- Knowledge Panel (Right side) -->
          <aside class="gg-knowledge-panel">
            <div class="gg-kp-photo-header">
              <img src="${SITE_CONFIG.assets.profilePhoto}" alt="${SITE_CONFIG.author.name}">
            </div>
            <div class="gg-kp-body">
              <h2>${SITE_CONFIG.author.name}</h2>
              <div class="gg-kp-subtitle">${SITE_CONFIG.author.role}</div>
              <p class="gg-kp-desc">${SITE_CONFIG.author.bio}</p>
              <hr class="gg-kp-divider">
              <dl class="gg-kp-dl">
                <dt>Role</dt>
                <dd>${SITE_CONFIG.author.role}</dd>
                <dt>Education</dt>
                <dd>${SITE_CONFIG.author.education}</dd>
                <dt>Location</dt>
                <dd>${SITE_CONFIG.author.location}</dd>
                <dt>Software</dt>
                <dd>${SITE_CONFIG.author.software.slice(0, 4).join(', ')}</dd>
              </dl>
              <div class="gg-kp-actions">
                <button class="gg-kp-btn" data-gg-tab="videos">View All Work</button>
                <button class="gg-kp-btn" data-gg-tab="contact">Hire Ishant</button>
              </div>
            </div>
          </aside>
        </div>
      `;
    } else if (this.activeTab === 'videos') {
      const filtered = this.videoFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === this.videoFilter);

      tabContent = `
        <div class="gg-chips-bar">
          ${['All', ...SITE_CONFIG.categories].map(c => `
            <button class="gg-chip-btn ${this.videoFilter === c ? 'active' : ''}" data-video-chip="${c}">
              ${c}
            </button>
          `).join('')}
        </div>
        <div class="gg-videos-grid">
          ${filtered.map(p => `
            <div class="gg-video-card" data-project-id="${p.id}">
              <div class="gg-video-thumb">
                <img src="${p.thumbnail}" alt="${p.title}" loading="lazy">
                <span class="duration-tag">${p.duration}</span>
              </div>
              <h3>${p.title}</h3>
              <small>ishant.studio · ${p.category} · 2026</small>
            </div>
          `).join('')}
        </div>
      `;
    } else if (this.activeTab === 'about') {
      tabContent = `
        <div class="gg-results-layout" style="grid-template-columns: minmax(0, 680px);">
          <div class="gg-knowledge-panel" style="position: static;">
            <div class="gg-kp-photo-header" style="height: 240px;">
              <img src="${SITE_CONFIG.assets.profilePhoto}" alt="${SITE_CONFIG.author.name}">
            </div>
            <div class="gg-kp-body">
              <h2>${SITE_CONFIG.author.name}</h2>
              <div class="gg-kp-subtitle">${SITE_CONFIG.author.role}</div>
              <p class="gg-kp-desc" style="font-size: 15px; margin-bottom: 20px;">${SITE_CONFIG.author.bio}</p>
              <hr class="gg-kp-divider">
              <dl class="gg-kp-dl" style="grid-template-columns: 120px 1fr;">
                <dt>Role</dt>
                <dd>${SITE_CONFIG.author.role}</dd>
                <dt>Education</dt>
                <dd>${SITE_CONFIG.author.education}</dd>
                <dt>Location</dt>
                <dd>${SITE_CONFIG.author.location}</dd>
                <dt>Software</dt>
                <dd>${SITE_CONFIG.author.software.join(', ')}</dd>
                <dt>Specialties</dt>
                <dd>${SITE_CONFIG.author.skills.join(' · ')}</dd>
              </dl>
              <div class="gg-kp-actions" style="margin-top: 24px;">
                <button class="gg-kp-btn" data-gg-tab="videos">Browse Video Catalog</button>
                <button class="gg-kp-btn" data-gg-tab="contact">Send Inquiry</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'contact') {
      tabContent = `
        <div class="gg-contact-card">
          <h2>Get in Touch with Ishant</h2>
          <p class="sub">Tell me about your creative brief, campaign timeline, or editing project.</p>
          <form id="gg-contact-form">
            <div class="gg-form-grid">
              <input class="gg-input" type="text" name="name" placeholder="Name" required>
              <input class="gg-input" type="email" name="email" placeholder="Email" required>
              <select class="gg-select gg-form-full" name="projectType">
                <option value="Commercial Video">Commercial Video Editing</option>
                <option value="3D Motion">3D Motion Graphics</option>
                <option value="Reels">Reels & Shorts</option>
                <option value="Other">Other Creative Work</option>
              </select>
              <textarea class="gg-textarea gg-form-full" name="message" rows="4" placeholder="Tell me about your project..." required></textarea>
              <div class="gg-form-full">
                <button type="submit" class="gg-submit-btn">Send Message</button>
                <span class="gg-form-feedback" id="gg-form-feedback">✓ Inquiry sent successfully! (Prototype mode)</span>
              </div>
            </div>
          </form>
        </div>
      `;
    }

    this.container.innerHTML = `
      <header class="gg-results-header">
        <div class="gg-brand-logo" id="gg-results-logo">
          <span class="c-blue-1">I</span><span class="c-red-1">s</span><span class="c-yellow">h</span><span class="c-blue-2">a</span><span class="c-green">n</span><span class="c-red-2">t</span>
        </div>
        <div class="gg-search-box">
          <div class="gg-search-input-wrap">
            <input class="gg-search-input" id="gg-header-search-input" type="text" value="${this.searchQuery}" placeholder="Search Ishant's work">
            <svg class="gg-search-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>
        <div class="gg-avatar-btn" style="margin-left: auto;">I</div>
      </header>

      <nav class="gg-tabs-nav">
        <a class="gg-tab-link ${this.activeTab === 'all' ? 'active' : ''}" data-gg-tab="all">All</a>
        <a class="gg-tab-link ${this.activeTab === 'videos' ? 'active' : ''}" data-gg-tab="videos">Videos</a>
        <a class="gg-tab-link ${this.activeTab === 'about' ? 'active' : ''}" data-gg-tab="about">About</a>
        <a class="gg-tab-link ${this.activeTab === 'contact' ? 'active' : ''}" data-gg-tab="contact">Contact</a>
      </nav>

      <div class="gg-tab-view-container">
        ${tabContent}
      </div>
    `;

    this.bindResultsEvents();
    if (this.activeTab === 'all') {
      this.startSnippetCarousel();
    }
  }

  bindHomeEvents() {
    const input = this.container.querySelector('#gg-main-search-input');
    const suggestionsBox = this.container.querySelector('#gg-suggestions');
    const btnSearch = this.container.querySelector('#gg-btn-search');
    const btnLucky = this.container.querySelector('#gg-btn-lucky');

    const doSearch = (query) => {
      this.searchQuery = query;
      this.viewState = 'results';
      this.activeTab = 'all';
      this.render();
    };

    if (input) {
      input.focus();
      input.addEventListener('input', () => {
        const val = input.value.trim().toLowerCase();
        if (!val) {
          suggestionsBox.style.display = 'none';
          return;
        }
        const matches = this.suggestions.filter(s => s.toLowerCase().includes(val));
        if (matches.length > 0) {
          suggestionsBox.style.display = 'block';
          suggestionsBox.innerHTML = matches.map(m => `
            <div class="gg-suggestion-item" data-suggestion="${m}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#9aa0a6"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>
              <span>${m}</span>
            </div>
          `).join('');
        } else {
          suggestionsBox.style.display = 'none';
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          doSearch(input.value);
        }
      });
    }

    if (btnSearch) {
      btnSearch.addEventListener('click', () => {
        doSearch(input ? input.value : '');
      });
    }

    if (btnLucky) {
      btnLucky.addEventListener('click', () => {
        const randomProject = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
        projectModal.open(randomProject.id, 'google');
      });
    }

    this.container.addEventListener('click', (e) => {
      const item = e.target.closest('[data-suggestion]');
      if (item) {
        doSearch(item.dataset.suggestion);
        return;
      }

      const quick = e.target.closest('[data-quick-q]');
      if (quick) {
        doSearch(quick.dataset.quickQ);
        return;
      }

      const tabLink = e.target.closest('[data-gg-tab]');
      if (tabLink) {
        this.viewState = 'results';
        this.activeTab = tabLink.dataset.ggTab;
        this.render();
      }
    });
  }

  bindResultsEvents() {
    // Return to home upon clicking logo
    const logo = this.container.querySelector('#gg-results-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        this.viewState = 'home';
        this.searchQuery = '';
        this.render();
      });
    }

    // Header search
    const headerInput = this.container.querySelector('#gg-header-search-input');
    if (headerInput) {
      headerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.searchQuery = headerInput.value;
          this.render();
        }
      });
    }

    // Tabs navigation
    this.container.addEventListener('click', (e) => {
      const tabLink = e.target.closest('[data-gg-tab]');
      if (tabLink) {
        this.activeTab = tabLink.dataset.ggTab;
        this.render();
        return;
      }

      const chip = e.target.closest('[data-video-chip]');
      if (chip) {
        this.videoFilter = chip.dataset.videoChip;
        this.render();
        return;
      }

      const projectCard = e.target.closest('.gg-result-item') || e.target.closest('.gg-video-card');
      if (projectCard && projectCard.dataset.projectId) {
        projectModal.open(projectCard.dataset.projectId, 'google');
        return;
      }
    });

    // Contact form submit
    const contactForm = this.container.querySelector('#gg-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const feedback = this.container.querySelector('#gg-form-feedback');
        if (feedback) {
          feedback.style.display = 'inline-block';
          contactForm.reset();
        }
      });
    }
  }

  startSnippetCarousel() {
    clearInterval(this.snippetInterval);
    const slides = this.container.querySelectorAll('.gg-snippet-slide');
    if (!slides || slides.length === 0) return;

    this.snippetInterval = setInterval(() => {
      slides[this.snippetIndex].classList.remove('active');
      this.snippetIndex = (this.snippetIndex + 1) % slides.length;
      slides[this.snippetIndex].classList.add('active');
    }, 4000);
  }

  destroy() {
    clearInterval(this.snippetInterval);
  }
}
