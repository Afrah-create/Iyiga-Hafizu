/**
 * ============================================================================
 * Iyiga Hafizu Portfolio and Journal (Vanilla JS)
 * ----------------------------------------------------------------------------
 * Responsibilities:
 * - Scroll progress bar: page scroll 0–100%, transform-based fill + debounced ARIA
 * - Hero: canvas animation (particles + ink-like curves), typewriter headline,
 *   staggered CSS-driven entrances for sub/tagline/buttons/scroll hint
 * - Lazy images: fade-in when loaded (gallery, blog, modals, about)
 * - Scroll UX: navbar solid state, back-to-top (single rAF-coalesced scroll loop)
 * - Mobile nav, gallery filter/search/modal, blog modals, contact form
 * - IntersectionObserver for section reveals
 * ============================================================================
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
   * DATA: Student projects from `assets/images/`
   * - Filenames:
   *   - `photo*.jpeg` => Photography (photos)
   *   - `photography*.jpeg` => Editing (editing experiments)
   *   - `drawing*.jpeg` => Drawing studies
   * - Modal shows long, detailed descriptions only for a small "featured" set.
   * -------------------------------------------------------------------------- */
  const projects = [
    // Photography (photos)
    {
      id: 1,
      title: "Structural Decay",
      category: "Photography",
      description: "I photographed this abandoned brick home under the Ugandan sky.",
      fullDescription:
        "I photographed this abandoned brick home under the Ugandan sky.\n\nIn this composition I focused on weathered masonry, collapsed lines, and the quiet atmosphere around neglected architecture.",
      medium: "I used documentary photography with careful tonal balance and texture control.",
      date: "April 2026",
      detailed: true,
      image: "assets/images/photo1.jpeg",
    },

    // Editing (photography*)
    {
      id: 2,
      title: "Sandy's Celebration",
      category: "Event Branding",
      description: "I designed this digital layout for a birthday event.",
      fullDescription:
        "I designed this digital layout for a birthday event.\n\nI balanced celebration focused typography, clear hierarchy, and color accents to create a vibrant promotional piece.",
      medium: "I used digital design for event branding, typography hierarchy, and promotional composition.",
      date: "March 2026",
      detailed: true,
      image: "assets/images/photography1.jpeg",
    },
    {
      id: 3,
      title: "Eid Mubarak",
      category: "Political Branding",
      description: "I created this commemorative flyer for leadership in Yumbe District.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "March 2026",
      detailed: false,
      image: "assets/images/photography2.jpeg",
    },
    {
      id: 4,
      title: "Academic Triumph",
      category: "Milestone Photography",
      description: "I created this digital composition for a graduation celebration.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "February 2026",
      detailed: false,
      image: "assets/images/photography3.jpeg",
    },
    {
      id: 5,
      title: "Editing Sprint Quiet Street Color",
      category: "Editing",
      description: "I balanced color softly to keep the mood intact without oversaturation.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "February 2026",
      detailed: false,
      image: "assets/images/photography4.jpeg",
    },
    {
      id: 6,
      title: "Editing Study Dodge and Burn Map",
      category: "Editing",
      description: "I shaped the light selectively to guide the viewer eye naturally.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "January 2026",
      detailed: false,
      image: "assets/images/photography5.jpeg",
    },
    {
      id: 7,
      title: "Editing Notes Edges and Breath Featured",
      category: "Editing",
      description: "I used local contrast adjustments to keep details alive and gentle.",
      fullDescription:
        "This edit focuses on edges and transitions. I kept the strongest contrast only where the subject needs clarity, then softened surrounding areas.\n\nThe result feels closer to charcoal and pencil studies: clear focal marks with gentle gradients elsewhere.",
      medium: "I used local contrast control, tone mapping, and soft color harmonizing.",
      date: "January 2026",
      detailed: true,
      image: "assets/images/photography6.jpeg",
    },
    {
      id: 8,
      title: "Editing Fragment Foliage Reimagined",
      category: "Editing",
      description: "I remapped the tones so the leaves feel like their own universe.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "December 2025",
      detailed: false,
      image: "assets/images/photography8.jpeg",
    },
    {
      id: 9,
      title: "Editing Test Double Realities",
      category: "Editing",
      description: "I used layering experiments to build narrative from ordinary scenes.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "December 2025",
      detailed: false,
      image: "assets/images/photography9.jpeg",
    },
    {
      id: 10,
      title: "Editing Sprint Warm Highlights Featured",
      category: "Editing",
      description: "I lifted warm tones carefully while preserving shadow structure.",
      fullDescription:
        "Highlight control is the heart of this piece. I shaped highlights with a soft roll off, then rebalanced midtones so the warmth stayed controlled.\n\nThis edit aims for a printed glow that you feel before you notice.",
      medium: "I used highlight protection, tonal curve shaping, and subtle split toning.",
      date: "April 2026",
      detailed: true,
      image: "assets/images/photography10.jpeg",
    },
    {
      id: 11,
      title: "Editing Log Deep Charcoal Blacks",
      category: "Editing",
      description: "I kept the blacks deep while still preserving texture.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "March 2026",
      detailed: false,
      image: "assets/images/photography11.jpeg",
    },
    {
      id: 12,
      title: "Editing Log Texture Stack",
      category: "Editing",
      description: "I layered the edit to keep a paper like texture visible in the final image.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "February 2026",
      detailed: false,
      image: "assets/images/photography12.jpeg",
    },
    {
      id: 13,
      title: "Editing Fragment Memory in Motion",
      category: "Editing",
      description: "This frame holds the feeling of motion inside a still image.",
      fullDescription: "",
      medium: "I can share the editing workflow for this piece on request.",
      date: "November 2025",
      detailed: false,
      image: "assets/images/photography47.jpeg",
    },

    // Drawing (drawing*)
    {
      id: 14,
      title: "Cultural Rhythms",
      category: "Drawing",
      description: "I created this surreal charcoal study with African masks and traditional percussion.",
      fullDescription: "",
      medium: "I can share the drawing workflow for this piece on request.",
      date: "April 2026",
      detailed: false,
      image: "assets/images/drawing1.jpeg",
    },
    {
      id: 15,
      title: "Botanical Soul",
      category: "Drawing",
      description: "I created this conceptual pencil piece exploring the bond between people and nature through Monstera foliage.",
      fullDescription:
        "I created this conceptual pencil piece exploring the bond between people and nature through Monstera foliage.\n\nI interwove organic leaf forms and facial structure to express emotional and ecological connection.",
      medium: "I used graphite and pencil layering on paper with form integration and tonal study.",
      date: "March 2026",
      detailed: true,
      image: "assets/images/drawing2.jpeg",
    },
    {
      id: 16,
      title: "The Visionary",
      category: "Drawing",
      description: "I rendered this graphite portrait to express leadership and conviction.",
      fullDescription: "",
      medium: "I can share the drawing workflow for this piece on request.",
      date: "March 2026",
      detailed: false,
      image: "assets/images/drawing3.jpeg",
    },
    {
      id: 17,
      title: "The Gift",
      category: "Drawing",
      description: "I made this narrative sketch to explore the emotional range of gratitude.",
      fullDescription: "",
      medium: "I can share the drawing workflow for this piece on request.",
      date: "February 2026",
      detailed: false,
      image: "assets/images/drawing4.jpeg",
    },
    {
      id: 18,
      title: "Devotion",
      category: "Drawing",
      description: "I created this study of spiritual serenity with intricate henna hand art.",
      fullDescription:
        "I created this study of spiritual serenity with intricate henna hand art.\n\nI emphasized gesture, ornament, and stillness to communicate reverence and inner calm.",
      medium: "I used graphite and ink detailing with ornamental hand study techniques.",
      date: "January 2026",
      detailed: true,
      image: "assets/images/drawing5.jpeg",
    },
    {
      id: 19,
      title: "The Fan",
      category: "Drawing",
      description: "I captured the meeting point between personal identity and sporting passion.",
      fullDescription: "",
      medium: "I can share the drawing workflow for this piece on request.",
      date: "December 2025",
      detailed: false,
      image: "assets/images/drawing6.jpeg",
    },
  ];

  /**
  * Journal: curated subset of local `assets/images/` and not every gallery file.
   * `detailed: true` => longer modal article; `false` => shorter note-style post.
   */
  const blogPosts = [
    {
      id: "b1",
      title: "Structural Decay",
      excerpt: "Photographic study of an abandoned brick dwelling under the Ugandan sky.",
      date: "March 2026",
      image: "assets/images/photo1.jpeg",
      detailed: true,
      contentHtml: `
        <h3 id="blog-modal-title">Structural Decay</h3>
        <p class="blog-modal-meta">March 2026 · Photography</p>
        <img class="img-lazy" src="assets/images/photo1.jpeg" alt="Photographic study of an abandoned brick dwelling" width="900" height="500" loading="lazy" decoding="async">
        <p>Photographic study of an abandoned brick dwelling under the Ugandan sky.</p>
      `,
    },
    {
      id: "b2",
      title: "Editing as Listening",
      excerpt: "Why I treat sliders like volume knobs, not fixes.",
      date: "February 2026",
      image: "assets/images/photography1.jpeg",
      detailed: true,
      contentHtml: `
        <h3 id="blog-modal-title">Editing as Listening</h3>
        <p class="blog-modal-meta">February 2026 · Editing</p>
        <img class="img-lazy" src="assets/images/photography1.jpeg" alt="Editing study" width="900" height="500" loading="lazy" decoding="async">
        <p>Editing is not about proving I was there. It is about deciding what the viewer should feel first.</p>
        <p>I start with global balance, exposure, white balance, and contrast. Then I work locally with small burns and dodges instead of global blasting.</p>
        <p>Grain is sometimes added back on purpose. A little texture keeps the image human, especially when the scene already feels delicate.</p>
        <img class="img-lazy" src="assets/images/photography4.jpeg" alt="Second editing reference" width="900" height="500" loading="lazy" decoding="async">
        <p>This companion frame helped me compare two moods from similar material, warm and restrained.</p>
      `,
    },
    {
      id: "b3",
      title: "Charcoal: Two Kinds of Patience",
      excerpt: "Gesture first and patience second. This is a short studio note.",
      date: "January 2026",
      image: "assets/images/drawing3.jpeg",
      detailed: false,
      contentHtml: `
        <h3 id="blog-modal-title">Charcoal: Two Kinds of Patience</h3>
        <p class="blog-modal-meta">January 2026 · Drawing</p>
        <img class="img-lazy" src="assets/images/drawing3.jpeg" alt="Charcoal drawing study" width="900" height="500" loading="lazy" decoding="async">
        <p>Charcoal rewards two speeds: fast searching lines, then slow corrections. I try not to rush the second part.</p>
      `,
    },
    {
      id: "b4",
      title: "Warm Highlights, Quiet Shadows",
      excerpt: "A quick editing note from a golden hour experiment.",
      date: "December 2025",
      image: "assets/images/photography10.jpeg",
      detailed: false,
      contentHtml: `
        <h3 id="blog-modal-title">Warm Highlights, Quiet Shadows</h3>
        <p class="blog-modal-meta">December 2025 · Editing</p>
        <img class="img-lazy" src="assets/images/photography10.jpeg" alt="Warm highlight edit" width="900" height="500" loading="lazy" decoding="async">
        <p>Golden hour edits tempt you to push warmth everywhere. Here I kept shadows cool so the highlights could glow without turning sugary.</p>
      `,
    },
  ];

  /** WhatsApp Business / chat: +256 776 581377 → digits only for wa.me */
  const WHATSAPP_E164 = "256776581377";

  let activeCategory = "all";
  let searchQuery = "";

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navBackdrop = document.getElementById("nav-backdrop");
  const filterGroup = document.querySelector(".filter-group");
  const gallerySearch = document.getElementById("gallery-search");
  const galleryGrid = document.getElementById("gallery-grid");
  const galleryEmpty = document.getElementById("gallery-empty");
  const galleryLoading = document.getElementById("gallery-loading");
  const projectModal = document.getElementById("project-modal");
  const blogModal = document.getElementById("blog-modal");
  const blogGrid = document.getElementById("blog-grid");
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const backToTop = document.getElementById("back-to-top");
  const footerYear = document.getElementById("footer-year");
  const scrollProgressEl = document.getElementById("scroll-progress");
  const scrollProgressFill = document.getElementById("scroll-progress-fill");

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Debounce helper (used for resize + ARIA updates on scroll progress)
   */
  function debounce(fn, ms) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  /* --------------------------------------------------------------------------
   * Lazy image fade-in: add `.is-loaded` when the browser finishes decoding bits.
  * Keeps one listener per image via `{ once: true }` and prevents memory leaks on reflows.
   * -------------------------------------------------------------------------- */
  function bindLazyImages(root) {
    if (!root) return;
    root.querySelectorAll("img.img-lazy").forEach((img) => {
      const done = () => img.classList.add("is-loaded");
      if (img.complete && img.naturalWidth) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
  }

  /* --------------------------------------------------------------------------
   * Scroll progress bar
   * - Visual: `transform: scaleX(pct)` on the fill (GPU-friendly, smooth).
   * - Coalesced with other scroll work inside one requestAnimationFrame.
   * - `aria-valuenow` is updated with a short debounce so assistive tech is not
   *   spammed on every frame while scroll events fire rapidly.
   * -------------------------------------------------------------------------- */
  let scrollAriaDebounce = null;
  function updateScrollProgress() {
    if (!scrollProgressFill || !scrollProgressEl) return;
    const docEl = document.documentElement;
    const y = window.scrollY || docEl.scrollTop;
    const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(0, (y / maxScroll) * 100));
    scrollProgressFill.style.transform = `scaleX(${pct / 100})`;

    clearTimeout(scrollAriaDebounce);
    scrollAriaDebounce = setTimeout(() => {
      scrollProgressEl.setAttribute("aria-valuenow", String(Math.round(pct)));
    }, 90);
  }

  /* --------------------------------------------------------------------------
   * Hero canvas: soft particles + flowing “ink” curves (warm neutrals)
   * - Caps DPR at 2, reduces particle count on narrow viewports.
   * - Pauses when document is hidden (battery / tab switch).
   * - Static single frame if prefers-reduced-motion.
   * -------------------------------------------------------------------------- */
  function initHeroCanvas(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles = [];
    let ribs = [];
    let running = true;
    let rafId = 0;

    function initParticles() {
      const n = w < 480 ? 42 : w < 900 ? 72 : 108;
      particles = [];
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + Math.random() * 2.1,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          a: 0.07 + Math.random() * 0.32,
          ph: Math.random() * Math.PI * 2,
        });
      }
      ribs = [];
      const rc = w < 480 ? 4 : 7;
      for (let i = 0; i < rc; i++) {
        ribs.push({
          y: Math.random() * h,
          amp: 18 + Math.random() * 55,
          freq: 0.0018 + Math.random() * 0.004,
          speed: 0.06 + Math.random() * 0.1,
          off: Math.random() * Math.PI * 2,
          alpha: 0.055 + Math.random() * 0.1,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function drawFrame(t) {
      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createRadialGradient(w * 0.5, h * 0.32, 0, w * 0.5, h * 0.55, h * 0.95);
      bg.addColorStop(0, "rgba(36, 40, 52, 0.55)");
      bg.addColorStop(0.45, "rgba(18, 20, 26, 0.25)");
      bg.addColorStop(1, "rgba(10, 11, 14, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ribs.forEach((rib) => {
        const yBase = rib.y + Math.sin(t * 0.00025 + rib.off) * 24;
        ctx.beginPath();
        for (let x = -40; x < w + 40; x += 5) {
          const yy =
            yBase + Math.sin(x * rib.freq + rib.off + t * 0.00085 * rib.speed) * rib.amp;
          if (x <= -40) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.strokeStyle = `rgba(196, 165, 116, ${rib.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t * 0.0009 + p.ph) * 0.12;
        p.y += p.vy + Math.cos(t * 0.0007 + p.ph) * 0.1;
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8;
        if (p.y > h + 8) p.y = -8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 215, 195, ${p.a})`;
        ctx.fill();
      });
    }

    function loop(t) {
      if (!running) return;
      drawFrame(t);
      if (!reduced) rafId = requestAnimationFrame(loop);
    }

    function startAnimation() {
      if (reduced) {
        drawFrame(0);
        return;
      }
      rafId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", debounce(resize, 120));

    document.addEventListener("visibilitychange", () => {
      running = document.visibilityState === "visible";
      if (running && !reduced && !rafId) rafId = requestAnimationFrame(loop);
      else if (!running) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    });

    /* First layout pass can report 0x0 so retry once on the next frame */
    if (!w || !h) {
      requestAnimationFrame(() => {
        resize();
        startAnimation();
      });
    } else {
      startAnimation();
    }
  }

  /* --------------------------------------------------------------------------
   * Typewriter headline + staggered hero text/buttons
   * - Subheadline +300ms, tagline +600ms after typewriter completes (spec).
   * - Buttons + ~350ms after tagline wave for a gentle cascade.
   * -------------------------------------------------------------------------- */
  const HERO_HEADLINE = "Iyiga Hafizu";
  const TYPE_MS = 62;

  function initHeroEntrance() {
    const target = document.getElementById("typewriter-target");
    const titleEl = document.getElementById("hero-title");
    const eyebrow = document.getElementById("hero-eyebrow");
    const sub = document.getElementById("hero-sub");
    const tag = document.getElementById("hero-tagline");
    const actions = document.getElementById("hero-actions");
    const scrollHint = document.getElementById("hero-scroll-hint");

    if (!target || !titleEl) return;

    if (prefersReducedMotion()) {
      target.textContent = HERO_HEADLINE;
      titleEl.classList.add("is-done");
      eyebrow && eyebrow.classList.add("is-visible");
      sub && sub.classList.add("is-visible");
      tag && tag.classList.add("is-visible");
      actions && actions.classList.add("is-visible");
      scrollHint && scrollHint.classList.add("is-visible");
      return;
    }

    eyebrow && eyebrow.classList.add("is-visible");

    let i = 0;
    function typeStep() {
      if (i < HERO_HEADLINE.length) {
        target.textContent = HERO_HEADLINE.slice(0, i + 1);
        i++;
        window.setTimeout(typeStep, TYPE_MS);
      } else {
        titleEl.classList.add("is-done");
        window.setTimeout(() => sub && sub.classList.add("is-visible"), 300);
        window.setTimeout(() => tag && tag.classList.add("is-visible"), 600);
        window.setTimeout(() => actions && actions.classList.add("is-visible"), 980);
        window.setTimeout(() => scrollHint && scrollHint.classList.add("is-visible"), 1280);
      }
    }
    window.setTimeout(typeStep, 120);
  }

  function badgeClassForCategory(category) {
    if (category === "Photography") return "badge-photo";
    if (category === "Editing") return "badge-edit";
    if (category === "Drawing") return "badge-draw";
    return "badge-photo";
  }

  function getFilteredProjects() {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((p) => {
      const catOk = activeCategory === "all" || p.category === activeCategory;
      if (!catOk) return false;
      if (!q) return true;
      const hay = (p.title + " " + p.description).toLowerCase();
      return hay.includes(q);
    });
  }

  function renderGallery() {
    const list = getFilteredProjects();
    galleryEmpty.hidden = list.length !== 0;

    const frag = document.createDocumentFragment();
    list.forEach((p, index) => {
      const li = document.createElement("li");
      li.className = "gallery-card reveal" + (index % 3 === 1 ? " feature-tall" : "");
      li.setAttribute("role", "listitem");
      li.tabIndex = 0;
      li.dataset.projectId = String(p.id);

      const badgeClass = badgeClassForCategory(p.category);

      li.innerHTML = `
        <div class="gallery-card-image-wrap">
          <img class="img-lazy" src="${p.image}" alt="" width="800" height="600" loading="lazy" decoding="async">
        </div>
        <div class="gallery-card-body">
          <h3 class="gallery-card-title">${escapeHtml(p.title)}</h3>
          <div class="gallery-card-meta">
            <span class="badge ${badgeClass}">${escapeHtml(p.category)}</span>
            <span class="gallery-card-date">${escapeHtml(p.date)}</span>
          </div>
          <p class="gallery-card-desc">${escapeHtml(p.description)}</p>
        </div>
      `;
      frag.appendChild(li);
    });

    galleryGrid.innerHTML = "";
    galleryGrid.appendChild(frag);
    bindLazyImages(galleryGrid);
    observeNewReveals(galleryGrid);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showGallerySkeletonThenRender() {
    if (!galleryLoading) {
      renderGallery();
      return;
    }
    galleryLoading.hidden = false;
    galleryLoading.setAttribute("aria-busy", "true");
    galleryLoading.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const d = document.createElement("div");
      d.className = "skel-item";
      galleryLoading.appendChild(d);
    }
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        galleryLoading.hidden = true;
        galleryLoading.innerHTML = "";
        galleryLoading.setAttribute("aria-busy", "false");
        renderGallery();
      }, 380);
    });
  }

  function openProjectModal(project) {
    if (!project) return;
    currentProjectForModal = project;
    const badgeEl = document.getElementById("project-modal-badge");
    const titleEl = document.getElementById("project-modal-title");
    const dateEl = document.getElementById("project-modal-date");
    const descEl = document.getElementById("project-modal-desc");
    const medEl = document.getElementById("project-modal-medium");
    const imgEl = document.getElementById("project-modal-img");

    badgeEl.className = "badge " + badgeClassForCategory(project.category);
    badgeEl.textContent = project.category;
    titleEl.textContent = project.title;
    dateEl.textContent = project.date;
    const processBtn = document.getElementById("project-process-btn");
    if (project.detailed) {
      // `fullDescription` may contain artist-friendly paragraphs. We store it as
      // plain text and convert line breaks to `<br>` for readability.
      const raw = project.fullDescription || project.description;
      descEl.innerHTML = escapeHtml(raw).replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");
      medEl.textContent = project.medium;
      if (processBtn) processBtn.textContent = "View Process";
    } else {
      descEl.textContent = project.description;
      medEl.textContent =
        project.mediumHint ||
        "Full medium & techniques are expanded for featured works. Request process notes for this piece.";
      if (processBtn) processBtn.textContent = "Request Process Notes";
    }
    imgEl.classList.remove("is-loaded");
    imgEl.src = project.image;
    imgEl.alt = project.title;
    bindLazyImages(projectModal);

    openModal(projectModal);
  }

  function openBlogModal(post) {
    const body = document.getElementById("blog-modal-content");
    body.innerHTML = post.contentHtml;
    bindLazyImages(body);
    openModal(blogModal);
  }

  let lastFocused = null;
  // Used for the project "View Process" button inside the modal.
  let currentProjectForModal = null;

  function openModal(modalEl) {
    lastFocused = document.activeElement;
    modalEl.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = modalEl.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();

    modalEl._onKeydown = function (e) {
      if (e.key === "Escape") closeModal(modalEl);
    };
    document.addEventListener("keydown", modalEl._onKeydown);
  }

  function closeModal(modalEl) {
    modalEl.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", modalEl._onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function onGalleryInteraction(e) {
    const card = e.target.closest(".gallery-card");
    if (!card || !galleryGrid.contains(card)) return;
    if (e.type === "click" || (e.type === "keydown" && (e.key === "Enter" || e.key === " "))) {
      if (e.type === "keydown") e.preventDefault();
      const id = Number(card.dataset.projectId);
      const proj = projects.find((p) => p.id === id);
      openProjectModal(proj);
    }
  }

  function onFilterClick(e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn || !filterGroup.contains(btn)) return;

    activeCategory = btn.dataset.filter === "all" ? "all" : btn.dataset.filter;

    filterGroup.querySelectorAll(".filter-btn").forEach((b) => {
      const isAct = b === btn;
      b.classList.toggle("is-active", isAct);
      b.setAttribute("aria-selected", isAct ? "true" : "false");
    });

    renderGallery();
  }

  let searchDebounce = null;
  function onSearchInput() {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = gallerySearch.value;
      renderGallery();
    }, 180);
  }

  function setNavOpen(open) {
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navMenu.classList.toggle("is-open", open);
    navBackdrop.hidden = !open;
    if (open) {
      navBackdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    } else {
      navBackdrop.classList.remove("is-visible");
      document.body.style.overflow = "";
    }
  }

  function toggleNav() {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!open);
  }

  /**
   * Single scroll pipeline: one requestAnimationFrame per frame coalesces
   * navbar state, back-to-top, and scroll progress fill (cheap reads).
   */
  let scrollScheduled = false;
  function onWindowScroll() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(() => {
      scrollScheduled = false;
      const y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("is-scrolled", y > 40);
      backToTop.classList.toggle("is-visible", y > 500);
      updateScrollProgress();
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          revealObserver.unobserve(en.target);
        }
      });
    },
    { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  function observeNewReveals(root) {
    root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
  }

  function initReveals() {
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  }

  function renderBlog() {
    const frag = document.createDocumentFragment();
    blogPosts.forEach((post) => {
      const li = document.createElement("li");
      li.className = "blog-card reveal";
      li.innerHTML = `
        <div class="blog-card-image">
          <img class="img-lazy" src="${post.image}" alt="" width="900" height="500" loading="lazy" decoding="async">
        </div>
        <div class="blog-card-content">
          <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
          <p class="blog-card-date">${escapeHtml(post.date)}</p>
          <p class="blog-card-excerpt">${escapeHtml(post.excerpt)}</p>
          <button type="button" class="blog-read-more" data-blog-id="${post.id}">Read More</button>
        </div>
      `;
      frag.appendChild(li);
    });
    blogGrid.appendChild(frag);
    bindLazyImages(blogGrid);
    observeNewReveals(blogGrid);
  }

  function onBlogGridClick(e) {
    const btn = e.target.closest(".blog-read-more");
    if (!btn) return;
    const id = btn.dataset.blogId;
    const post = blogPosts.find((b) => b.id === id);
    if (post) openBlogModal(post);
  }

  /**
   * Contact → WhatsApp: builds `wa.me` URL with pre-filled text (name, email, message).
   * No server: opens WhatsApp Web or the app in a new tab.
   */
  function onContactSubmit(e) {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) {
      window.alert("Please fill in your name, email, and message.");
      return;
    }
    const body = `Hello Iyiga,

Name: ${name}
Email: ${email}

Message:
${message}`;
    const url = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(body)}`;
    console.log("[Contact → WhatsApp]", { name, email, messageLength: message.length });
    window.open(url, "_blank", "noopener,noreferrer");
    formSuccess.hidden = false;
    contactForm.reset();
    formSuccess.focus();
  }

  function bindModalClose(modalEl, closeBtnId) {
    modalEl.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-modal-close")) closeModal(modalEl);
    });
    const closeBtn = document.getElementById(closeBtnId);
    if (closeBtn) closeBtn.addEventListener("click", () => closeModal(modalEl));
  }

  function onProcessClick() {
    if (!currentProjectForModal) {
      window.alert("Process notes are not available right now. Please open a project first.");
      return;
    }

    if (currentProjectForModal.detailed) {
      window.alert(
        "Process documentation (demo):\n\nI plan edits like print tests and build contrast step by step.\nI protect highlights and let shadows carry texture.\nI review the piece in both dark and light view to keep the mood consistent."
      );
      return;
    }

    window.alert(
      "Request Process Notes (demo):\n\nThis piece is part of my studio collection, but only featured works include long form notes.\nIf you want the full workflow for this one, reach out through the contact form."
    );
  }

  function onNavLinkClick(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !header.contains(a)) return;
    if (navMenu.classList.contains("is-open")) setNavOpen(false);
  }

  function init() {
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    initHeroCanvas(document.getElementById("hero-canvas"));
    initHeroEntrance();

    initReveals();
    bindLazyImages(document.body);

    renderBlog();
    showGallerySkeletonThenRender();

    filterGroup.addEventListener("click", onFilterClick);
    gallerySearch.addEventListener("input", onSearchInput);

    galleryGrid.addEventListener("click", onGalleryInteraction);
    galleryGrid.addEventListener("keydown", onGalleryInteraction);

    blogGrid.addEventListener("click", onBlogGridClick);

    bindModalClose(projectModal, "project-modal-close");
    bindModalClose(blogModal, "blog-modal-close");

    document.getElementById("project-process-btn").addEventListener("click", onProcessClick);

    contactForm.addEventListener("submit", onContactSubmit);

    navToggle.addEventListener("click", toggleNav);
    navBackdrop.addEventListener("click", () => setNavOpen(false));
    document.getElementById("site-header").addEventListener("click", onNavLinkClick);

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    onWindowScroll();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
