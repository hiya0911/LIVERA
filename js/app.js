/**
 * LIVERA — The Operating System for Living Culture
 * Master Application Controller & State Manager
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // LocalStorage State Management
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    BOOKMARKS: 'livera_bookmarks_v1',
    SUBMISSIONS: 'livera_community_submissions_v1',
    SESSION_REQUESTS: 'livera_session_requests_v1',
    LESSON_PROGRESS: 'livera_lesson_progress_v1'
  };

  const AppState = {
    currentView: 'discover',
    bookmarks: [],
    submissions: [],
    sessionRequests: [],
    lessonProgress: {}, // { pathwayId: [completedLessonId, ...] }
    activeModal: null,
    activeLessonData: null, // { pathway, currentLessonIndex }
    activeMapLocationId: 'loc-bankura',
    activePassportId: 'LIV-BEN-0842',
    storyWizardStep: 1,
    storyWizardData: {
      contributorName: '',
      community: '',
      language: 'Bengali & English',
      category: 'Craft',
      title: '',
      storyText: '',
      tradition: '',
      timePeriod: '',
      hasAudioSimulation: false,
      region: 'Birbhum',
      passedDownBy: '',
      consentAgreed: false
    }
  };

  // Initialize persistent state from LocalStorage
  function loadPersistedState() {
    try {
      const storedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      AppState.bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : ['arc-01', 'arc-03'];

      const storedSubmissions = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      AppState.submissions = storedSubmissions 
        ? JSON.parse(storedSubmissions) 
        : [...LIVERA_DATA.seedSubmissions];

      const storedRequests = localStorage.getItem(STORAGE_KEYS.SESSION_REQUESTS);
      AppState.sessionRequests = storedRequests ? JSON.parse(storedRequests) : [];

      const storedProgress = localStorage.getItem(STORAGE_KEYS.LESSON_PROGRESS);
      AppState.lessonProgress = storedProgress 
        ? JSON.parse(storedProgress) 
        : { 'learn-01': ['les-01-01'] };
    } catch (e) {
      console.warn('LocalStorage unavailable or corrupted. Falling back to defaults.', e);
      AppState.bookmarks = ['arc-01', 'arc-03'];
      AppState.submissions = [...LIVERA_DATA.seedSubmissions];
      AppState.sessionRequests = [];
      AppState.lessonProgress = { 'learn-01': ['les-01-01'] };
    }
  }

  function saveState(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  // --------------------------------------------------------------------------
  // Toast Notifications
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${escapeHTML(message)}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // --------------------------------------------------------------------------
  // Navigation & View Routing
  // --------------------------------------------------------------------------
  function navigateTo(viewId) {
    const views = document.querySelectorAll('.app-view');
    const navLinks = document.querySelectorAll('.nav-link');

    let targetView = document.getElementById(`view-${viewId}`);
    if (!targetView) {
      viewId = 'discover';
      targetView = document.getElementById('view-discover');
    }

    views.forEach(v => v.classList.remove('active'));
    targetView.classList.add('active');

    navLinks.forEach(link => {
      if (link.dataset.view === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    AppState.currentView = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile nav if open
    const mainNav = document.getElementById('main-nav');
    if (mainNav) mainNav.classList.remove('mobile-open');

    // Trigger view-specific render hooks
    if (viewId === 'archive') {
      renderArchiveView();
    } else if (viewId === 'artisans') {
      renderArtisansView();
    } else if (viewId === 'learn') {
      renderLearningView();
    } else if (viewId === 'map') {
      renderMapView();
    } else if (viewId === 'community') {
      renderCommunityView();
    } else if (viewId === 'passport') {
      renderPassportView(AppState.activePassportId);
    }
  }

  // --------------------------------------------------------------------------
  // Bookmarks Toggle & Drawer
  // --------------------------------------------------------------------------
  function toggleBookmark(entryId) {
    const idx = AppState.bookmarks.indexOf(entryId);
    if (idx > -1) {
      AppState.bookmarks.splice(idx, 1);
      showToast('Removed from saved living heritage archive');
    } else {
      AppState.bookmarks.push(entryId);
      showToast('Saved to your living heritage collection');
    }
    saveState(STORAGE_KEYS.BOOKMARKS, AppState.bookmarks);
    updateBookmarkBadges();
    
    // Refresh bookmark button states if visible
    document.querySelectorAll(`.card-bookmark-btn[data-id="${entryId}"]`).forEach(btn => {
      btn.classList.toggle('bookmarked', AppState.bookmarks.includes(entryId));
    });
  }

  function updateBookmarkBadges() {
    const count = AppState.bookmarks.length;
    const badge = document.getElementById('header-bookmark-count');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function openBookmarksModal() {
    const listContainer = document.getElementById('bookmarks-list-container');
    if (!listContainer) return;

    if (AppState.bookmarks.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; color: var(--terracotta-base);">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <p style="font-weight: 600; font-size: 1.1rem; color: var(--deep-indigo);">No saved traditions yet</p>
          <p style="font-size: 0.88rem; margin-top: 0.4rem;">Browse the Living Archive and click the bookmark icon to save crafts, music, and stories.</p>
          <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="LIVERA.navigateTo('archive'); LIVERA.closeModal();">Explore Living Archive</button>
        </div>
      `;
    } else {
      const savedEntries = LIVERA_DATA.archive.filter(e => AppState.bookmarks.includes(e.id));
      listContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${savedEntries.map(entry => `
            <div style="display: flex; gap: 1rem; background: var(--bg-surface-soft); padding: 0.9rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); align-items: center;">
              <img src="${entry.image}" alt="${escapeHTML(entry.title)}" style="width: 70px; height: 70px; border-radius: var(--radius-sm); object-fit: cover;">
              <div style="flex-grow: 1;">
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--terracotta-base); text-transform: uppercase;">${escapeHTML(entry.category)} • ${escapeHTML(entry.region)}</span>
                <h4 style="font-size: 1rem; margin: 0.2rem 0; cursor: pointer;" onclick="LIVERA.openArchiveModal('${entry.id}')">${escapeHTML(entry.title)}</h4>
                <span class="status-indicator" style="font-size: 0.72rem;"><span class="status-dot"></span> ${escapeHTML(entry.provenanceStatus)}</span>
              </div>
              <button class="btn btn-sm btn-outline" onclick="LIVERA.openArchiveModal('${entry.id}')">View</button>
              <button class="btn-icon" title="Remove" onclick="LIVERA.toggleBookmark('${entry.id}'); LIVERA.openBookmarksModal();" style="width: 32px; height: 32px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }

    openModal('modal-bookmarks');
  }

  // --------------------------------------------------------------------------
  // Modals Framework
  // --------------------------------------------------------------------------
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    AppState.activeModal = modalId;
  }

  function closeModal() {
    if (AppState.activeModal) {
      const modal = document.getElementById(AppState.activeModal);
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
      AppState.activeModal = null;
    }
  }

  // --------------------------------------------------------------------------
  // HOME / DISCOVER VIEW RENDERING
  // --------------------------------------------------------------------------
  function initDiscoverView() {
    // Populate featured experiences (top 6 entries)
    const featuredGrid = document.getElementById('featured-experiences-grid');
    if (!featuredGrid) return;

    const featuredItems = LIVERA_DATA.archive.slice(0, 6);
    featuredGrid.innerHTML = featuredItems.map(entry => createCulturalCardHTML(entry)).join('');
  }

  function createCulturalCardHTML(entry) {
    const isBookmarked = AppState.bookmarks.includes(entry.id);
    return `
      <article class="cultural-card" data-id="${entry.id}">
        <div class="card-img-wrapper">
          <img src="${entry.image}" alt="${escapeHTML(entry.title)}" loading="lazy">
          <div class="card-top-badges">
            <span class="card-category-badge">${escapeHTML(entry.category)}</span>
            <button class="card-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${entry.id}" onclick="LIVERA.toggleBookmark('${entry.id}')" title="Save Tradition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="card-region-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${escapeHTML(entry.region)}
          </div>
          <h3 class="card-title">${escapeHTML(entry.title)}</h3>
          <div class="card-bengali-script">${escapeHTML(entry.bengaliTitle)}</div>
          <p class="card-summary">${escapeHTML(entry.summary)}</p>
          <div class="card-tags">
            ${entry.tags.map(t => `<span class="mini-tag">#${escapeHTML(t)}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span class="status-indicator">
              <span class="status-dot"></span>
              ${escapeHTML(entry.provenanceStatus)}
            </span>
            <button class="btn btn-sm btn-outline-terracotta" onclick="LIVERA.openArchiveModal('${entry.id}')">
              Explore Story →
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // --------------------------------------------------------------------------
  // LIVING ARCHIVE VIEW
  // --------------------------------------------------------------------------
  function renderArchiveView() {
    const grid = document.getElementById('archive-grid');
    if (!grid) return;

    const searchTerm = (document.getElementById('archive-search-input')?.value || '').toLowerCase().trim();
    const activeCategoryPill = document.querySelector('.filter-pill.active')?.dataset.category || 'all';
    const selectedRegion = document.getElementById('archive-region-filter')?.value || 'all';
    const selectedSort = document.getElementById('archive-sort-filter')?.value || 'featured';

    let filtered = LIVERA_DATA.archive.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm) ||
        item.bengaliTitle.includes(searchTerm) ||
        item.summary.toLowerCase().includes(searchTerm) ||
        item.tags.some(t => t.toLowerCase().includes(searchTerm)) ||
        item.region.toLowerCase().includes(searchTerm);

      const matchesCategory = activeCategoryPill === 'all' || item.category.toLowerCase().includes(activeCategoryPill.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || item.district.toLowerCase() === selectedRegion.toLowerCase();

      return matchesSearch && matchesCategory && matchesRegion;
    });

    // Sort control
    if (selectedSort === 'az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    const countLabel = document.getElementById('archive-count-label');
    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} living traditions across Bengal`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #FFF; border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; color: var(--terracotta-base);">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 style="color: var(--deep-indigo); margin-bottom: 0.5rem;">No living traditions match your search</h3>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem auto;">Try clearing your filters or search for terms like "Kantha", "Baul", "terracotta", "mask", or "silk".</p>
          <button class="btn btn-outline-terracotta" onclick="LIVERA.resetArchiveFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => createCulturalCardHTML(item)).join('');
  }

  function resetArchiveFilters() {
    const searchInput = document.getElementById('archive-search-input');
    if (searchInput) searchInput.value = '';

    const regionSelect = document.getElementById('archive-region-filter');
    if (regionSelect) regionSelect.value = 'all';

    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));

    renderArchiveView();
  }

  function openArchiveModal(entryId) {
    const entry = LIVERA_DATA.archive.find(e => e.id === entryId);
    if (!entry) return;

    const modalBody = document.getElementById('archive-modal-content');
    if (!modalBody) return;

    const isBookmarked = AppState.bookmarks.includes(entry.id);
    const relatedEntries = LIVERA_DATA.archive.filter(e => entry.relatedIds?.includes(e.id));
    const relatedPractitioner = LIVERA_DATA.practitioners.find(p => entry.relatedIds?.includes(p.id));

    modalBody.innerHTML = `
      <div style="position: relative; width: 100%; height: 320px; overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
        <img src="${entry.image}" alt="${escapeHTML(entry.title)}" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(0deg, rgba(10, 17, 40, 0.95) 0%, transparent 100%); color: #FFF;">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span class="card-category-badge" style="background: var(--terracotta-base);">${escapeHTML(entry.category)}</span>
            <span class="card-category-badge" style="background: rgba(255,255,255,0.2);">${escapeHTML(entry.knowledgeType)}</span>
          </div>
          <h2 style="color: #FFF; font-size: 1.8rem; margin-bottom: 0.25rem;">${escapeHTML(entry.title)}</h2>
          <div class="bengali-script" style="color: var(--gold-accent); font-size: 1.1rem;">${escapeHTML(entry.bengaliTitle)}</div>
        </div>
      </div>
      <div style="padding: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-light); flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta-base);">Geographic Association</div>
            <div style="font-weight: 600; color: var(--deep-indigo);">${escapeHTML(entry.region)} (District: ${escapeHTML(entry.district)})</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">Provenance Documentation</div>
            <div class="status-indicator"><span class="status-dot"></span> ${escapeHTML(entry.provenanceStatus)}</div>
          </div>
          <button class="btn btn-sm ${isBookmarked ? 'btn-gold' : 'btn-outline'}" onclick="LIVERA.toggleBookmark('${entry.id}'); LIVERA.openArchiveModal('${entry.id}');">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="margin-right: 0.35rem;">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            ${isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Tradition'}
          </button>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-family: var(--font-serif); color: var(--deep-indigo); margin-bottom: 0.6rem;">Cultural & Historical Context</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${escapeHTML(entry.context)}</p>
        </div>

        <div style="background-color: var(--bg-surface-soft); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--terracotta-base); margin-bottom: 2rem;">
          <h4 style="font-family: var(--font-serif); color: var(--deep-indigo); margin-bottom: 0.5rem;">Associated Technique & Practice</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">${escapeHTML(entry.technique)}</p>
        </div>

        ${relatedPractitioner ? `
          <div style="margin-bottom: 2rem; background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <img src="${relatedPractitioner.avatar}" alt="${escapeHTML(relatedPractitioner.name)}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
              <div>
                <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--gold-accent);">Master Practitioner</span>
                <h5 style="margin: 0; color: var(--deep-indigo); font-size: 1rem;">${escapeHTML(relatedPractitioner.name)}</h5>
                <span style="font-size: 0.78rem; color: var(--text-secondary);">${escapeHTML(relatedPractitioner.region)}</span>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-terracotta" onclick="LIVERA.closeModal(); LIVERA.openArtisanModal('${relatedPractitioner.id}')">View Profile</button>
          </div>
        ` : ''}

        ${relatedEntries.length > 0 ? `
          <div>
            <h4 style="font-family: var(--font-serif); color: var(--deep-indigo); margin-bottom: 0.8rem;">Related Traditions in Bengal</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              ${relatedEntries.map(rel => `
                <div style="display: flex; gap: 0.75rem; background: var(--bg-surface-soft); padding: 0.75rem; border-radius: var(--radius-sm); align-items: center; cursor: pointer;" onclick="LIVERA.openArchiveModal('${rel.id}')">
                  <img src="${rel.image}" alt="${escapeHTML(rel.title)}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;">
                  <div>
                    <h5 style="font-size: 0.85rem; margin: 0; color: var(--deep-indigo);">${escapeHTML(rel.title)}</h5>
                    <span style="font-size: 0.72rem; color: var(--terracotta-base);">${escapeHTML(rel.region)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="margin-top: 2.5rem; text-align: center; font-size: 0.75rem; color: var(--text-muted); border-top: 1px dashed var(--border-light); padding-top: 1.2rem;">
          LIVERA Archive Entry ID: ${escapeHTML(entry.id)} • Documentation standard for Living Heritage
        </div>
      </div>
    `;

    openModal('modal-archive-detail');
  }

  // --------------------------------------------------------------------------
  // ARTISANS & PRACTITIONERS DIRECTORY VIEW
  // --------------------------------------------------------------------------
  function renderArtisansView() {
    const grid = document.getElementById('artisans-grid');
    if (!grid) return;

    const searchTerm = (document.getElementById('artisan-search-input')?.value || '').toLowerCase().trim();
    const selectedCraft = document.getElementById('artisan-craft-filter')?.value || 'all';

    const filtered = LIVERA_DATA.practitioners.filter(item => {
      const matchesSearch = !searchTerm ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.craft.toLowerCase().includes(searchTerm) ||
        item.region.toLowerCase().includes(searchTerm) ||
        item.skills.some(s => s.toLowerCase().includes(searchTerm));

      const matchesCraft = selectedCraft === 'all' || item.category.toLowerCase().includes(selectedCraft.toLowerCase());

      return matchesSearch && matchesCraft;
    });

    grid.innerHTML = filtered.map(p => `
      <article class="artisan-card">
        <div class="artisan-header">
          <div class="artisan-avatar-wrap">
            <img src="${p.avatar}" alt="${escapeHTML(p.name)}" loading="lazy">
          </div>
          <h3 class="artisan-name">${escapeHTML(p.name)}</h3>
          <div class="artisan-bengali-name">${escapeHTML(p.bengaliName)}</div>
          <span class="artisan-craft-tag">${escapeHTML(p.craft)}</span>
        </div>
        <div class="artisan-body">
          <div class="artisan-meta-row">
            <span>📍 ${escapeHTML(p.region)}</span>
            <span>⭐ ${p.rating} (${p.studentsMentored} mentored)</span>
          </div>
          <p class="artisan-bio-snippet">${escapeHTML(p.bio)}</p>
          <div class="artisan-skills-list">
            ${p.skills.map(s => `<span class="skill-tag">${escapeHTML(s)}</span>`).join('')}
          </div>
          <div class="artisan-actions">
            <button class="btn btn-sm btn-outline" onclick="LIVERA.openArtisanModal('${p.id}')">Full Profile</button>
            <button class="btn btn-sm btn-primary" onclick="LIVERA.openSessionRequestModal('${p.id}')">Request Session</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function openArtisanModal(artisanId) {
    const p = LIVERA_DATA.practitioners.find(a => a.id === artisanId);
    if (!p) return;

    const modalBody = document.getElementById('artisan-modal-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="background: linear-gradient(135deg, var(--deep-indigo) 0%, var(--indigo-card) 100%); color: #FFF; padding: 3rem 2rem 2rem; text-align: center; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
        <img src="${p.avatar}" alt="${escapeHTML(p.name)}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 4px solid var(--gold-accent); margin: 0 auto 1rem auto; box-shadow: 0 4px 16px rgba(0,0,0,0.4);">
        <h2 style="color: #FFF; font-size: 1.8rem; margin-bottom: 0.2rem;">${escapeHTML(p.name)}</h2>
        <div style="color: var(--gold-accent); font-size: 1.1rem; margin-bottom: 0.6rem;">${escapeHTML(p.bengaliName)}</div>
        <div style="display: inline-block; background: rgba(200, 90, 50, 0.3); border: 1px solid rgba(200, 90, 50, 0.5); padding: 0.3rem 0.9rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; color: #FFB39A;">
          ${escapeHTML(p.craft)}
        </div>
        <div style="margin-top: 1rem; font-size: 0.85rem; color: #CBD5E1;">
          📍 ${escapeHTML(p.region)} • ⏳ ${escapeHTML(p.experience)}
        </div>
      </div>
      <div style="padding: 2.5rem;">
        <div style="margin-bottom: 2rem;">
          <h4 style="font-family: var(--font-serif); color: var(--deep-indigo); margin-bottom: 0.5rem;">Biography & Lineage</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${escapeHTML(p.bio)}</p>
        </div>

        <div style="background: var(--bg-surface-soft); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--gold-accent); margin-bottom: 2rem;">
          <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta-base); margin-bottom: 0.35rem;">In Their Own Words</div>
          <p style="font-style: italic; color: var(--deep-indigo); font-family: var(--font-serif); font-size: 1.1rem; line-height: 1.5;">“${escapeHTML(p.culturalStory)}”</p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-family: var(--font-serif); color: var(--deep-indigo); margin-bottom: 0.8rem;">Mastery & Techniques</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${p.skills.map(s => `<span class="skill-tag" style="padding: 0.35rem 0.75rem; font-size: 0.82rem;">${escapeHTML(s)}</span>`).join('')}
          </div>
        </div>

        ${p.passportId ? `
          <div style="background: var(--gold-light); border: 1px solid rgba(197, 154, 71, 0.4); border-radius: var(--radius-md); padding: 1.2rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
            <div>
              <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #9A6F1D;">Verified Cultural Passport Linked</span>
              <div style="font-family: var(--font-mono); font-weight: 700; color: var(--deep-indigo);">${escapeHTML(p.passportId)}</div>
            </div>
            <button class="btn btn-sm btn-gold" onclick="LIVERA.closeModal(); LIVERA.navigateTo('passport'); LIVERA.renderPassportView('${p.passportId}');">
              View Provenance Passport →
            </button>
          </div>
        ` : ''}

        <div style="display: flex; gap: 1rem; justify-content: flex-end; border-top: 1px solid var(--border-light); padding-top: 1.5rem;">
          <button class="btn btn-outline" onclick="LIVERA.closeModal()">Close</button>
          <button class="btn btn-primary" onclick="LIVERA.closeModal(); LIVERA.openSessionRequestModal('${p.id}');">Request a Learning Session</button>
        </div>
      </div>
    `;

    openModal('modal-artisan-detail');
  }

  // --------------------------------------------------------------------------
  // REQUEST A LEARNING SESSION WORKFLOW
  // --------------------------------------------------------------------------
  function openSessionRequestModal(artisanId) {
    const practitioner = LIVERA_DATA.practitioners.find(p => p.id === artisanId) || LIVERA_DATA.practitioners[0];
    const select = document.getElementById('request-practitioner-select');
    if (select) {
      select.innerHTML = LIVERA_DATA.practitioners.map(p => `
        <option value="${p.id}" ${p.id === practitioner.id ? 'selected' : ''}>${escapeHTML(p.name)} (${escapeHTML(p.craft)})</option>
      `).join('');
    }

    openModal('modal-session-request');
  }

  function handleSessionRequestSubmit(e) {
    e.preventDefault();
    const practitionerId = document.getElementById('request-practitioner-select').value;
    const name = document.getElementById('request-name').value.trim();
    const contact = document.getElementById('request-contact').value.trim();
    const mode = document.getElementById('request-mode').value;
    const message = document.getElementById('request-message').value.trim();

    if (!name || !contact) {
      alert('Please provide your name and contact details.');
      return;
    }

    const practitioner = LIVERA_DATA.practitioners.find(p => p.id === practitionerId);
    const referenceId = `REQ-LIV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest = {
      id: referenceId,
      practitionerId,
      practitionerName: practitioner ? practitioner.name : 'Master Practitioner',
      learnerName: name,
      contact,
      mode,
      message,
      createdAt: new Date().toISOString()
    };

    AppState.sessionRequests.push(newRequest);
    saveState(STORAGE_KEYS.SESSION_REQUESTS, AppState.sessionRequests);

    closeModal();
    showToast(`Learning request submitted! Ref: ${referenceId}`, 'success');

    // Show confirmation modal
    const confirmationModal = document.getElementById('modal-request-confirmation');
    if (confirmationModal) {
      document.getElementById('confirmation-ref-id').textContent = referenceId;
      document.getElementById('confirmation-practitioner-name').textContent = practitioner?.name || 'Selected Artisan';
      openModal('modal-request-confirmation');
    }
  }

  // --------------------------------------------------------------------------
  // LEARN A CRAFT (Apprenticeship Pathways & Interactive Lessons)
  // --------------------------------------------------------------------------
  function renderLearningView() {
    const grid = document.getElementById('pathways-grid');
    if (!grid) return;

    grid.innerHTML = LIVERA_DATA.learningPathways.map(pathway => {
      const completedList = AppState.lessonProgress[pathway.id] || [];
      const totalLessons = pathway.lessons.length;
      const progressPercent = Math.round((completedList.length / totalLessons) * 100);

      return `
        <article class="pathway-card">
          <div class="pathway-header">
            <div class="pathway-level-tag">${escapeHTML(pathway.level)} • ${escapeHTML(pathway.category)}</div>
            <h3 class="pathway-title">${escapeHTML(pathway.title)}</h3>
            <div class="bengali-script" style="font-size: 0.9rem; color: var(--text-muted);">${escapeHTML(pathway.bengaliTitle)}</div>
          </div>
          <div class="pathway-body">
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.2rem;">${escapeHTML(pathway.summary)}</p>
            <div class="pathway-meta-list">
              <div class="meta-icon-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${escapeHTML(pathway.duration)}</span>
              </div>
              <div class="meta-icon-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Curated with <strong>${escapeHTML(pathway.instructor)}</strong></span>
              </div>
            </div>

            <div class="progress-container">
              <div class="progress-label-row">
                <span>Progress: ${completedList.length} of ${totalLessons} lessons completed</span>
                <span>${progressPercent}%</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-fill" style="width: ${progressPercent}%;"></div>
              </div>
            </div>

            <div style="display: flex; gap: 0.75rem; margin-top: auto;">
              <button class="btn btn-primary" style="flex-grow: 1;" onclick="LIVERA.startPathway('${pathway.id}')">
                ${completedList.length === 0 ? 'Start Pathway' : (progressPercent === 100 ? 'Review Lessons' : 'Continue Learning')}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function startPathway(pathwayId) {
    const pathway = LIVERA_DATA.learningPathways.find(p => p.id === pathwayId);
    if (!pathway) return;

    AppState.activeLessonData = {
      pathwayId,
      pathway,
      currentLessonIndex: 0
    };

    renderLessonPlayer();
    openModal('modal-lesson-player');
  }

  function renderLessonPlayer() {
    const { pathway, currentLessonIndex } = AppState.activeLessonData;
    const lesson = pathway.lessons[currentLessonIndex];
    const completedList = AppState.lessonProgress[pathway.id] || [];

    // Sidebar navigation
    const navList = document.getElementById('lesson-player-nav');
    if (navList) {
      document.getElementById('lesson-player-pathway-title').textContent = pathway.title;
      navList.innerHTML = pathway.lessons.map((les, idx) => {
        const isDone = completedList.includes(les.id);
        const isActive = idx === currentLessonIndex;
        return `
          <button class="lesson-nav-btn ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="LIVERA.jumpToLesson(${idx})">
            <span>${idx + 1}. ${escapeHTML(les.title)}</span>
            ${isDone ? '<span style="color: var(--forest-moss);">✓</span>' : ''}
          </button>
        `;
      }).join('');
    }

    // Content pane
    const contentPane = document.getElementById('lesson-player-content');
    if (contentPane) {
      const isCompleted = completedList.includes(lesson.id);

      contentPane.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta-base);">
            Lesson ${currentLessonIndex + 1} of ${pathway.lessons.length} • ${escapeHTML(lesson.duration)}
          </span>
          ${isCompleted ? '<span class="status-indicator" style="font-size: 0.8rem;"><span class="status-dot"></span> Completed</span>' : ''}
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--deep-indigo); margin-bottom: 0.5rem;">${escapeHTML(lesson.title)}</h2>
        <p style="font-style: italic; color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">${escapeHTML(lesson.summary)}</p>

        <div class="lesson-content-text">${escapeHTML(lesson.content)}</div>

        <!-- Knowledge Check Quiz -->
        <div class="quiz-card">
          <div class="quiz-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Knowledge Check Quiz
          </div>
          <h4 class="quiz-question">${escapeHTML(lesson.quiz.question)}</h4>
          <div class="quiz-options" id="quiz-options-container">
            ${lesson.quiz.options.map((opt, oIdx) => `
              <button class="quiz-option-btn" onclick="LIVERA.checkQuizAnswer(${oIdx})">
                ${String.fromCharCode(65 + oIdx)}. ${escapeHTML(opt)}
              </button>
            `).join('')}
          </div>
          <div id="quiz-feedback-box" class="quiz-feedback"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light);">
          <button class="btn btn-outline" ${currentLessonIndex === 0 ? 'disabled' : ''} onclick="LIVERA.jumpToLesson(${currentLessonIndex - 1})">
            ← Previous Lesson
          </button>
          ${currentLessonIndex < pathway.lessons.length - 1 ? `
            <button class="btn btn-primary" onclick="LIVERA.jumpToLesson(${currentLessonIndex + 1})">
              Next Lesson →
            </button>
          ` : `
            <button class="btn btn-gold" onclick="LIVERA.finishPathway('${pathway.id}')">
              Complete Pathway 🎓
            </button>
          `}
        </div>
      `;
    }
  }

  function jumpToLesson(idx) {
    if (!AppState.activeLessonData) return;
    AppState.activeLessonData.currentLessonIndex = idx;
    renderLessonPlayer();
  }

  function checkQuizAnswer(selectedIdx) {
    const { pathway, currentLessonIndex } = AppState.activeLessonData;
    const lesson = pathway.lessons[currentLessonIndex];
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const optionButtons = document.querySelectorAll('.quiz-option-btn');

    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === lesson.quiz.correctIndex) {
        btn.classList.add('selected-correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('selected-wrong');
      }
    });

    if (selectedIdx === lesson.quiz.correctIndex) {
      feedbackBox.className = 'quiz-feedback show';
      feedbackBox.style.backgroundColor = 'var(--moss-light)';
      feedbackBox.style.color = 'var(--forest-moss)';
      feedbackBox.innerHTML = `<strong>Correct!</strong> ${escapeHTML(lesson.quiz.explanation)}`;

      // Mark lesson completed
      if (!AppState.lessonProgress[pathway.id]) {
        AppState.lessonProgress[pathway.id] = [];
      }
      if (!AppState.lessonProgress[pathway.id].includes(lesson.id)) {
        AppState.lessonProgress[pathway.id].push(lesson.id);
        saveState(STORAGE_KEYS.LESSON_PROGRESS, AppState.lessonProgress);
      }
    } else {
      feedbackBox.className = 'quiz-feedback show';
      feedbackBox.style.backgroundColor = 'var(--vermilion-subtle)';
      feedbackBox.style.color = 'var(--vermilion)';
      feedbackBox.innerHTML = `<strong>Not quite.</strong> ${escapeHTML(lesson.quiz.explanation)}`;
    }
  }

  function finishPathway(pathwayId) {
    closeModal();
    renderLearningView();
    showToast('Congratulations! Pathway completed and badge saved to your profile.', 'success');
  }

  // --------------------------------------------------------------------------
  // CULTURAL MAP VIEW
  // --------------------------------------------------------------------------
  function renderMapView() {
    selectMapLocation(AppState.activeMapLocationId || 'loc-bankura');
  }

  function selectMapLocation(locationId) {
    AppState.activeMapLocationId = locationId;
    const loc = LIVERA_DATA.mapLocations.find(l => l.id === locationId) || LIVERA_DATA.mapLocations[0];

    // Update map pin markers
    document.querySelectorAll('.map-marker-pin').forEach(pin => {
      pin.classList.toggle('active', pin.dataset.location === locationId);
    });

    // Update sidebar details
    const sidebar = document.getElementById('map-location-sidebar');
    if (!sidebar) return;

    const practitioners = LIVERA_DATA.practitioners.filter(p => loc.keyPractitionerIds.includes(p.id));

    sidebar.innerHTML = `
      <div class="loc-badge">West Bengal Regional Heritage Hub</div>
      <h2 class="loc-title">${escapeHTML(loc.name)}</h2>
      <div class="loc-bengali">${escapeHTML(loc.bengaliName)}</div>
      <p class="loc-tagline">“${escapeHTML(loc.tagline)}”</p>

      <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.8rem;">
        ${escapeHTML(loc.description)}
      </p>

      <div class="loc-section-title">Living Traditions of the Region</div>
      <div class="loc-practices-list">
        ${loc.featuredPractices.map(fp => `
          <div class="loc-practice-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            <span>${escapeHTML(fp)}</span>
          </div>
        `).join('')}
      </div>

      ${practitioners.length > 0 ? `
        <div class="loc-section-title" style="margin-top: 1.5rem;">Associated Master Practitioners</div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.8rem;">
          ${practitioners.map(p => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface-soft); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="${p.avatar}" alt="${escapeHTML(p.name)}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;">
                <div>
                  <h5 style="margin: 0; font-size: 0.88rem; color: var(--deep-indigo);">${escapeHTML(p.name)}</h5>
                  <span style="font-size: 0.72rem; color: var(--terracotta-base);">${escapeHTML(p.craft)}</span>
                </div>
              </div>
              <button class="btn btn-sm btn-outline-terracotta" onclick="LIVERA.openArtisanModal('${p.id}')">Profile</button>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="loc-section-title">Cultural Landmarks & Field Sites</div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.8rem;">
        ${loc.attractions.map(att => `<span class="mini-tag">🏛️ ${escapeHTML(att)}</span>`).join('')}
      </div>

      <button class="btn btn-primary" style="width: 100%;" onclick="LIVERA.filterArchiveByDistrict('${loc.id}')">
        Explore All ${escapeHTML(loc.name)} Traditions in Archive →
      </button>
    `;
  }

  function filterArchiveByDistrict(locId) {
    const mapToDistrict = {
      'loc-kolkata': 'Kolkata',
      'loc-bankura': 'Bankura',
      'loc-bishnupur': 'Bankura',
      'loc-purulia': 'Purulia',
      'loc-shantiniketan': 'Birbhum',
      'loc-murshidabad': 'Malda'
    };

    const targetDistrict = mapToDistrict[locId] || 'all';
    navigateTo('archive');
    const regionSelect = document.getElementById('archive-region-filter');
    if (regionSelect) {
      regionSelect.value = targetDistrict;
      renderArchiveView();
    }
  }

  // --------------------------------------------------------------------------
  // CULTURAL PASSPORT & PROVENANCE VERIFICATION
  // --------------------------------------------------------------------------
  function renderPassportView(passportId) {
    const passport = LIVERA_DATA.culturalPassports.find(p => p.passportId === passportId) || LIVERA_DATA.culturalPassports[0];
    AppState.activePassportId = passport.passportId;

    const input = document.getElementById('passport-lookup-input');
    if (input) input.value = passport.passportId;

    const container = document.getElementById('passport-document-container');
    if (!container) return;

    container.innerHTML = `
      <div class="passport-document-card">
        <div class="passport-doc-header">
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--gold-accent); letter-spacing: 0.14em;">
              Digital Cultural Provenance Record
            </span>
            <h2 style="font-size: 2rem; color: var(--deep-indigo); margin: 0.2rem 0;">${escapeHTML(passport.title)}</h2>
            <div style="font-family: var(--font-mono); font-size: 1rem; color: var(--terracotta-base); font-weight: 700;">
              PASSPORT ID: ${escapeHTML(passport.passportId)}
            </div>
          </div>
          <div class="passport-stamp-seal">
            <span>LIVERA</span>
            <span style="font-size: 0.55rem; color: var(--forest-moss);">${escapeHTML(passport.verificationStatus)}</span>
            <span>BENGAL</span>
          </div>
        </div>

        <div class="passport-details-grid">
          <div>
            <div class="passport-field-label">Craft & Tradition</div>
            <div class="passport-field-value">${escapeHTML(passport.craft)} (${escapeHTML(passport.category)})</div>
          </div>
          <div>
            <div class="passport-field-label">Region of Origin</div>
            <div class="passport-field-value">📍 ${escapeHTML(passport.originRegion)}</div>
          </div>
          <div>
            <div class="passport-field-label">Master Practitioner / Workshop</div>
            <div class="passport-field-value">👤 ${escapeHTML(passport.practitioner)}</div>
          </div>
          <div>
            <div class="passport-field-label">Registered Issue Date</div>
            <div class="passport-field-value">📅 ${escapeHTML(passport.issuedDate)}</div>
          </div>
          <div>
            <div class="passport-field-label">Technique & Method</div>
            <div class="passport-field-value">${escapeHTML(passport.technique)}</div>
          </div>
          <div>
            <div class="passport-field-label">Verified Raw Materials</div>
            <div class="passport-field-value">${escapeHTML(passport.materials)}</div>
          </div>
        </div>

        <div class="provenance-timeline">
          <h4 style="font-family: var(--font-serif); color: var(--deep-indigo); margin-bottom: 0.8rem;">
            Provenance Verification Evidence
          </h4>
          ${passport.provenanceEvidence.map(item => `
            <div class="provenance-evidence-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--forest-moss)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${escapeHTML(item)}</span>
            </div>
          `).join('')}
          <div style="margin-top: 1rem; padding-top: 0.8rem; border-top: 1px dashed var(--border-light); font-size: 0.82rem; color: var(--text-secondary);">
            <strong>Verification Transparency Note:</strong> ${escapeHTML(passport.statusNote)}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; flex-wrap: gap;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <!-- Simulated QR code representation -->
            <div style="width: 60px; height: 60px; background: #000; padding: 4px; border-radius: 4px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;">
              <div style="background: #fff;"></div><div style="background: #000;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div>
              <div style="background: #000;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div><div style="background: #000;"></div>
              <div style="background: #fff;"></div><div style="background: #fff;"></div><div style="background: #000;"></div><div style="background: #fff;"></div>
              <div style="background: #fff;"></div><div style="background: #000;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">
              <div>LIVERA Immutable Ledger Token</div>
              <div style="font-family: var(--font-mono); font-size: 0.7rem;">HASH: 0x8F3A...E24C</div>
            </div>
          </div>
          <button class="btn btn-outline" onclick="window.print()">Print / Export Passport PDF</button>
        </div>
      </div>
    `;
  }

  function handlePassportLookup(e) {
    e.preventDefault();
    const input = document.getElementById('passport-lookup-input');
    if (!input) return;

    const term = input.value.trim().toUpperCase();
    const match = LIVERA_DATA.culturalPassports.find(p => p.passportId === term);
    if (match) {
      renderPassportView(match.passportId);
      showToast(`Passport ${match.passportId} loaded`);
    } else {
      alert(`No passport found for ID "${term}". Click one of the sample ID chips below.`);
    }
  }

  // --------------------------------------------------------------------------
  // PRESERVE A STORY WIZARD (4 Steps to Local Persistence)
  // --------------------------------------------------------------------------
  function openStoryWizard() {
    AppState.storyWizardStep = 1;
    renderStoryWizardStep(1);
    openModal('modal-preserve-story');
  }

  function renderStoryWizardStep(step) {
    AppState.storyWizardStep = step;

    // Stepper header circles
    document.querySelectorAll('.step-item').forEach((item, idx) => {
      const stepNum = idx + 1;
      item.classList.toggle('active', stepNum === step);
      item.classList.toggle('completed', stepNum < step);
    });

    // Step panes
    document.querySelectorAll('.wizard-step-pane').forEach((pane, idx) => {
      pane.classList.toggle('active', idx + 1 === step);
    });

    if (step === 4) {
      // Populate step 4 review summary
      populateWizardReview();
    }
  }

  function nextStoryWizardStep() {
    const current = AppState.storyWizardStep;

    if (current === 1) {
      const name = document.getElementById('wiz-contributor-name').value.trim();
      const community = document.getElementById('wiz-community').value.trim();
      if (!name) {
        alert('Please enter your contributor name.');
        return;
      }
      AppState.storyWizardData.contributorName = name;
      AppState.storyWizardData.community = community || 'Bengal Community';
      AppState.storyWizardData.language = document.getElementById('wiz-language').value;
      AppState.storyWizardData.category = document.getElementById('wiz-category').value;
    } else if (current === 2) {
      const title = document.getElementById('wiz-title').value.trim();
      const text = document.getElementById('wiz-story-text').value.trim();
      if (!title || !text) {
        alert('Please provide a title and story narrative.');
        return;
      }
      AppState.storyWizardData.title = title;
      AppState.storyWizardData.storyText = text;
      AppState.storyWizardData.tradition = document.getElementById('wiz-tradition').value.trim();
      AppState.storyWizardData.timePeriod = document.getElementById('wiz-time-period').value.trim();
    } else if (current === 3) {
      const consent = document.getElementById('wiz-consent-checkbox').checked;
      if (!consent) {
        alert('Please review and check the cultural stewardship consent box to proceed.');
        return;
      }
      AppState.storyWizardData.region = document.getElementById('wiz-region').value;
      AppState.storyWizardData.passedDownBy = document.getElementById('wiz-passed-down').value.trim();
      AppState.storyWizardData.consentAgreed = consent;
    }

    renderStoryWizardStep(current + 1);
  }

  function prevStoryWizardStep() {
    if (AppState.storyWizardStep > 1) {
      renderStoryWizardStep(AppState.storyWizardStep - 1);
    }
  }

  function populateWizardReview() {
    const d = AppState.storyWizardData;
    const reviewContainer = document.getElementById('wiz-review-container');
    if (!reviewContainer) return;

    reviewContainer.innerHTML = `
      <div style="background: var(--bg-surface-soft); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); font-size: 0.9rem;">
        <div style="margin-bottom: 1rem;">
          <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Story Title:</strong>
          <h4 style="color: var(--deep-indigo); margin-top: 0.2rem;">${escapeHTML(d.title)}</h4>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1rem;">
          <div>
            <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Contributor:</strong>
            <div>${escapeHTML(d.contributorName)} (${escapeHTML(d.community)})</div>
          </div>
          <div>
            <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Region & Category:</strong>
            <div>${escapeHTML(d.region)} • ${escapeHTML(d.category)}</div>
          </div>
          <div>
            <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Tradition / Lineage:</strong>
            <div>${escapeHTML(d.tradition || 'Living Folk Tradition')}</div>
          </div>
          <div>
            <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Passed Down By:</strong>
            <div>${escapeHTML(d.passedDownBy || 'Oral family history')}</div>
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Story Narrative:</strong>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 0.3rem;">${escapeHTML(d.storyText)}</p>
        </div>
        <div style="padding: 0.8rem; background: var(--moss-light); border-radius: 4px; color: var(--forest-moss); font-size: 0.8rem;">
          ✓ Contributor consent affirmed for cultural preservation and community attribution.
        </div>
      </div>
    `;
  }

  function submitStoryPreservation() {
    const d = AppState.storyWizardData;
    const refId = `SUB-LIV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSubmission = {
      id: refId,
      title: d.title,
      contributorName: d.contributorName,
      community: d.community,
      category: d.category,
      tradition: d.tradition || 'Living Oral Knowledge',
      region: d.region,
      timePeriod: d.timePeriod || 'Contemporary Living Tradition',
      storyText: d.storyText,
      passedDownBy: d.passedDownBy || 'Family Elders',
      consentAgreed: true,
      status: "Community contributed — awaiting review",
      submittedDate: new Date().toISOString().split('T')[0]
    };

    AppState.submissions.unshift(newSubmission);
    saveState(STORAGE_KEYS.SUBMISSIONS, AppState.submissions);

    // Show success view inside modal
    const pane4 = document.getElementById('wizard-pane-4');
    pane4.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--moss-light); color: var(--forest-moss); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--deep-indigo); margin-bottom: 0.5rem;">Story Preserved Successfully!</h3>
        <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto 1.5rem auto;">
          Thank you, <strong>${escapeHTML(d.contributorName)}</strong>. Your contribution has been safely encoded in LIVERA's community repository with attribution rights.
        </p>
        <div style="display: inline-block; background: var(--bg-surface-soft); border: 2px dashed var(--terracotta-base); padding: 0.8rem 1.8rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 1.1rem; color: var(--deep-indigo); font-weight: 700; margin-bottom: 1.5rem;">
          Reference ID: ${refId}
        </div>
        <div style="font-size: 0.8rem; color: var(--forest-moss); font-weight: 600; margin-bottom: 2rem;">
          Status: Community contributed — awaiting editorial review
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn-outline" onclick="LIVERA.closeModal()">Close</button>
          <button class="btn btn-primary" onclick="LIVERA.closeModal(); LIVERA.navigateTo('community');">View Community Submissions</button>
        </div>
      </div>
    `;

    showToast(`Story preserved with ID: ${refId}`, 'success');
  }

  // --------------------------------------------------------------------------
  // COMMUNITY & CULTURAL STEWARDSHIP VIEW
  // --------------------------------------------------------------------------
  function renderCommunityView() {
    const list = document.getElementById('community-submissions-list');
    if (!list) return;

    list.innerHTML = AppState.submissions.map(sub => `
      <div style="background: #FFF; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 1.8rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta-base);">${escapeHTML(sub.category)} • 📍 ${escapeHTML(sub.region)}</span>
            <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--deep-indigo); margin: 0.2rem 0;">${escapeHTML(sub.title)}</h4>
            <div style="font-size: 0.82rem; color: var(--text-muted);">Contributed by <strong>${escapeHTML(sub.contributorName)}</strong> (${escapeHTML(sub.community)}) • Passed down by ${escapeHTML(sub.passedDownBy || 'Ancestors')}</div>
          </div>
          <span style="background: var(--moss-light); color: var(--forest-moss); border: 1px solid rgba(46, 83, 57, 0.2); font-size: 0.72rem; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: var(--radius-full);">
            ${escapeHTML(sub.status)}
          </span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin: 0.5rem 0;">
          ${escapeHTML(sub.storyText)}
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.8rem; font-size: 0.78rem; color: var(--text-muted);">
          <span>Demo Ledger Ref: <code>${escapeHTML(sub.id)}</code></span>
          <span>Submitted: ${escapeHTML(sub.submittedDate)}</span>
        </div>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // GLOBAL SEARCH MODAL
  // --------------------------------------------------------------------------
  function openGlobalSearchModal() {
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
    renderGlobalSearchResults('');
    openModal('modal-global-search');
    setTimeout(() => input?.focus(), 100);
  }

  function handleGlobalSearchInput(e) {
    renderGlobalSearchResults(e.target.value.toLowerCase().trim());
  }

  function renderGlobalSearchResults(query) {
    const container = document.getElementById('global-search-results');
    if (!container) return;

    if (!query) {
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          Type to search across living traditions, master artisans, and learning pathways...
          <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; flex-wrap: wrap;">
            <span class="mini-tag" style="cursor: pointer;" onclick="LIVERA.quickSearch('Kantha')">Kantha</span>
            <span class="mini-tag" style="cursor: pointer;" onclick="LIVERA.quickSearch('Terracotta')">Terracotta</span>
            <span class="mini-tag" style="cursor: pointer;" onclick="LIVERA.quickSearch('Baul')">Baul Music</span>
            <span class="mini-tag" style="cursor: pointer;" onclick="LIVERA.quickSearch('Chhau')">Chhau Masks</span>
            <span class="mini-tag" style="cursor: pointer;" onclick="LIVERA.quickSearch('Patachitra')">Patachitra</span>
          </div>
        </div>
      `;
      return;
    }

    // Match archives
    const matchedArchive = LIVERA_DATA.archive.filter(e => 
      e.title.toLowerCase().includes(query) || 
      e.summary.toLowerCase().includes(query) ||
      e.tags.some(t => t.toLowerCase().includes(query))
    );

    // Match practitioners
    const matchedArtisans = LIVERA_DATA.practitioners.filter(a =>
      a.name.toLowerCase().includes(query) ||
      a.craft.toLowerCase().includes(query) ||
      a.region.toLowerCase().includes(query)
    );

    // Match learning pathways
    const matchedLessons = LIVERA_DATA.learningPathways.filter(l =>
      l.title.toLowerCase().includes(query) ||
      l.summary.toLowerCase().includes(query)
    );

    const totalMatches = matchedArchive.length + matchedArtisans.length + matchedLessons.length;

    if (totalMatches === 0) {
      container.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
          No results found for "<strong>${escapeHTML(query)}</strong>". Try searching for crafts or regions.
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); padding: 0.5rem 1rem 0;">
        Found ${totalMatches} cultural matches
      </div>
      ${matchedArchive.map(item => `
        <div class="search-result-item" onclick="LIVERA.closeModal(); LIVERA.openArchiveModal('${item.id}');">
          <div>
            <span style="font-size: 0.7rem; color: var(--terracotta-base); font-weight: 700; text-transform: uppercase;">Tradition • ${escapeHTML(item.category)}</span>
            <div style="font-weight: 600; color: var(--deep-indigo);">${escapeHTML(item.title)}</div>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHTML(item.region)}</span>
        </div>
      `).join('')}
      ${matchedArtisans.map(item => `
        <div class="search-result-item" onclick="LIVERA.closeModal(); LIVERA.openArtisanModal('${item.id}');">
          <div>
            <span style="font-size: 0.7rem; color: var(--gold-accent); font-weight: 700; text-transform: uppercase;">Practitioner</span>
            <div style="font-weight: 600; color: var(--deep-indigo);">${escapeHTML(item.name)} (${escapeHTML(item.craft)})</div>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHTML(item.region)}</span>
        </div>
      `).join('')}
      ${matchedLessons.map(item => `
        <div class="search-result-item" onclick="LIVERA.closeModal(); LIVERA.startPathway('${item.id}');">
          <div>
            <span style="font-size: 0.7rem; color: #2563EB; font-weight: 700; text-transform: uppercase;">Learning Pathway</span>
            <div style="font-weight: 600; color: var(--deep-indigo);">${escapeHTML(item.title)}</div>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHTML(item.duration)}</span>
        </div>
      `).join('')}
    `;
  }

  function quickSearch(term) {
    const input = document.getElementById('global-search-input');
    if (input) {
      input.value = term;
      renderGlobalSearchResults(term.toLowerCase());
    }
  }

  // --------------------------------------------------------------------------
  // RESET DEMO DATA
  // --------------------------------------------------------------------------
  function resetDemoData() {
    if (confirm('Reset demo data to default prototype state? This will restore initial bookmarks, seed contributions, and learning progress.')) {
      localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
      localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
      localStorage.removeItem(STORAGE_KEYS.SESSION_REQUESTS);
      localStorage.removeItem(STORAGE_KEYS.LESSON_PROGRESS);
      loadPersistedState();
      updateBookmarkBadges();
      navigateTo(AppState.currentView);
      showToast('Prototype demo data has been reset to defaults', 'success');
    }
  }

  // --------------------------------------------------------------------------
  // DOM Ready & Event Listeners
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    loadPersistedState();
    updateBookmarkBadges();
    initDiscoverView();

    // Setup Navigation clicks
    document.querySelectorAll('[data-view-nav]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const targetView = el.getAttribute('data-view-nav');
        if (targetView) navigateTo(targetView);
      });
    });

    // Mobile Hamburger
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (mobileToggle && mainNav) {
      mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-open');
      });
    }

    // Header scroll blur effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.app-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    });

    // Filter pill clicks in archive
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderArchiveView();
      });
    });

    // Archive inputs
    document.getElementById('archive-search-input')?.addEventListener('input', renderArchiveView);
    document.getElementById('archive-region-filter')?.addEventListener('change', renderArchiveView);
    document.getElementById('archive-sort-filter')?.addEventListener('change', renderArchiveView);

    // Artisan filters
    document.getElementById('artisan-search-input')?.addEventListener('input', renderArtisansView);
    document.getElementById('artisan-craft-filter')?.addEventListener('change', renderArtisansView);

    // Global search input
    document.getElementById('global-search-input')?.addEventListener('input', handleGlobalSearchInput);

    // Session request form submit
    document.getElementById('form-session-request')?.addEventListener('submit', handleSessionRequestSubmit);

    // Audio recording simulation button
    document.getElementById('btn-simulate-record')?.addEventListener('click', () => {
      const btn = document.getElementById('btn-simulate-record');
      btn.textContent = '● Recording Oral Audio (00:08)...';
      btn.style.borderColor = 'var(--vermilion)';
      btn.style.color = 'var(--vermilion)';
      setTimeout(() => {
        btn.textContent = '✓ Simulated Audio Track Attached (48s)';
        btn.style.borderColor = 'var(--forest-moss)';
        btn.style.color = 'var(--forest-moss)';
        AppState.storyWizardData.hasAudioSimulation = true;
      }, 1500);
    });

    // Modal background close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
      });
    });

    // ESC key closes modals
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  });

  // Expose LIVERA namespace for inline events & testing
  window.LIVERA = {
    navigateTo,
    toggleBookmark,
    openBookmarksModal,
    openModal,
    closeModal,
    openArchiveModal,
    resetArchiveFilters,
    openArtisanModal,
    openSessionRequestModal,
    startPathway,
    jumpToLesson,
    checkQuizAnswer,
    finishPathway,
    selectMapLocation,
    filterArchiveByDistrict,
    renderPassportView,
    handlePassportLookup,
    openStoryWizard,
    nextStoryWizardStep,
    prevStoryWizardStep,
    submitStoryPreservation,
    openGlobalSearchModal,
    quickSearch,
    resetDemoData,
    showToast
  };

})();
