/**
 * ============================================================================
 * Alex Rivera — Portfolio & Blog (Vanilla JS)
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
      title: "Photo Study — Night Light on Kampala Windows",
      category: "Photography",
      description: "A quiet night scene built from reflections and controlled contrast.",
      fullDescription:
        "This photo starts with observation: light patterns in shop windows and wet pavement. I captured the scene with an emphasis on highlights, then kept shadows intact during editing so the texture stays believable.\n\nThe goal was simple: let the warm tones feel like memory while the dark areas hold structure.",
      medium: "Photography: handheld night capture; Editing: contrast shaping + highlight protection.",
      date: "April 2026",
      detailed: true,
      image: "assets/images/photo1.jpeg",
    },

    // Editing (photography*)
    {
      id: 2,
      title: "Editing Notes — Contrast & Grain (Featured)",
      category: "Editing",
      description: "Curves and grain to make the image feel printed, not processed.",
      fullDescription:
        "I treated this edit like a printmaking test: build contrast gradually, then stop. The grain is intentionally visible, because it carries the atmosphere.\n\nInstead of flattening blacks, I protected midtones so the scene keeps breathing room.",
      medium: "Editing: Curves + tonal range control; simulated print grain; gentle local adjustments.",
      date: "March 2026",
      detailed: true,
      image: "assets/images/photography1.jpeg",
    },
    {
      id: 3,
      title: "Editing Log — Terracotta Shadows",
      category: "Editing",
      description: "Warm shadows balanced against neutral highlights for skin-safe tone.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "March 2026",
      detailed: false,
      image: "assets/images/photography2.jpeg",
    },
    {
      id: 4,
      title: "Editing Log — Texture Preservation",
      category: "Editing",
      description: "Sharpening that avoids crunchy edges; soft focus in the right places.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "February 2026",
      detailed: false,
      image: "assets/images/photography3.jpeg",
    },
    {
      id: 5,
      title: "Editing Sprint — Quiet Street Color",
      category: "Editing",
      description: "Subtle color balancing to keep the mood intact without oversaturation.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "February 2026",
      detailed: false,
      image: "assets/images/photography4.jpeg",
    },
    {
      id: 6,
      title: "Editing Study — Dodge & Burn Map",
      category: "Editing",
      description: "Selective light shaping to guide the viewer’s eye naturally.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "January 2026",
      detailed: false,
      image: "assets/images/photography5.jpeg",
    },
    {
      id: 7,
      title: "Editing Notes — Edges & Breath (Featured)",
      category: "Editing",
      description: "Local contrast adjustments to keep details alive, not harsh.",
      fullDescription:
        "This edit focuses on edges and transitions. I kept the strongest contrast only where the subject needs clarity, then softened surrounding areas.\n\nThe result feels closer to charcoal and pencil studies: clear focal marks with gentle gradients elsewhere.",
      medium: "Editing: local contrast + micro-detail control; tone mapping; soft color harmonizing.",
      date: "January 2026",
      detailed: true,
      image: "assets/images/photography6.jpeg",
    },
    {
      id: 8,
      title: "Editing Fragment — Foliage Re-Imagined",
      category: "Editing",
      description: "A tonal remap that makes leaves look like their own universe.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "December 2025",
      detailed: false,
      image: "assets/images/photography8.jpeg",
    },
    {
      id: 9,
      title: "Editing Test — Double Realities",
      category: "Editing",
      description: "Layering experiments to build narrative from ordinary scenes.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "December 2025",
      detailed: false,
      image: "assets/images/photography9.jpeg",
    },
    {
      id: 10,
      title: "Editing Sprint — Warm Highlights (Featured)",
      category: "Editing",
      description: "Gold tones lifted carefully while preserving shadow structure.",
      fullDescription:
        "Highlight control is the heart of this piece. I shaped highlights with a soft roll-off, then rebalanced midtones so the warmth doesn’t become loud.\n\nThe edit aims for a “printed” glow—felt more than seen.",
      medium: "Editing: highlight protection; tonal curve shaping; subtle split toning.",
      date: "April 2026",
      detailed: true,
      image: "assets/images/photography10.jpeg",
    },
    {
      id: 11,
      title: "Editing Log — Deep Charcoal Blacks",
      category: "Editing",
      description: "Blacks that hold texture instead of disappearing into ink.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "March 2026",
      detailed: false,
      image: "assets/images/photography11.jpeg",
    },
    {
      id: 12,
      title: "Editing Log — Texture Stack",
      category: "Editing",
      description: "Layering to keep paper-like texture visible in the final image.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "February 2026",
      detailed: false,
      image: "assets/images/photography12.jpeg",
    },
    {
      id: 13,
      title: "Editing Fragment — Memory in Motion",
      category: "Editing",
      description: "A short series frame: the feeling of motion held in a still image.",
      fullDescription: "",
      medium: "Editing workflow (details in featured notes).",
      date: "November 2025",
      detailed: false,
      image: "assets/images/photography47.jpeg",
    },

    // Drawing (drawing*)
    {
      id: 14,
      title: "Charcoal Gesture #1 — Weight",
      category: "Drawing",
      description: "Quick marks to find structure before detail arrives.",
      fullDescription: "",
      medium: "Drawing workflow (details in featured notes).",
      date: "April 2026",
      detailed: false,
      image: "assets/images/drawing1.jpeg",
    },
    {
      id: 15,
      title: "Charcoal Study #2 — Space (Featured)",
      category: "Drawing",
      description: "A study in proportion and negative space using charcoal restraint.",
      fullDescription:
        "This drawing begins with spacing, not shading. I block the main planes first, then let charcoal darken only the decisions that matter.\n\nErasure becomes part of the composition—lifting light back into the form.",
      medium: "Drawing: charcoal + kneaded eraser; toned paper; value mapping from gesture to form.",
      date: "March 2026",
      detailed: true,
      image: "assets/images/drawing2.jpeg",
    },
    {
      id: 16,
      title: "Graphite Study #3 — Line Rhythm",
      category: "Drawing",
      description: "A line-based practice focused on rhythm and direction changes.",
      fullDescription: "",
      medium: "Drawing workflow (details in featured notes).",
      date: "March 2026",
      detailed: false,
      image: "assets/images/drawing3.jpeg",
    },
    {
      id: 17,
      title: "Figure Rhythm #4 — Tempo",
      category: "Drawing",
      description: "Gesture-first drawing to capture movement in a single pass.",
      fullDescription: "",
      medium: "Drawing workflow (details in featured notes).",
      date: "February 2026",
      detailed: false,
      image: "assets/images/drawing4.jpeg",
    },
    {
      id: 18,
      title: "Ink Wash #5 — Leaf Shadow (Featured)",
      category: "Drawing",
      description: "Loose ink and wash to translate humidity and soft edges.",
      fullDescription:
        "The wash here is intentionally uneven. I used ink bleeding as a compositional tool, then re-drew only the lines that needed clarity.\n\nThe piece explores how shadow behaves when the air feels thick—soft edges, layered values, and quiet contrast.",
      medium: "Drawing: ink + watercolor wash; layered wet-into-wet; edge control via dry brush.",
      date: "January 2026",
      detailed: true,
      image: "assets/images/drawing5.jpeg",
    },
    {
      id: 19,
      title: "Pastel Dust #6 — Kampala Dust",
      category: "Drawing",
      description: "Color dust on textured ground to capture street tempo.",
      fullDescription: "",
      medium: "Drawing workflow (details in featured notes).",
      date: "December 2025",
      detailed: false,
      image: "assets/images/drawing6.jpeg",
    },
  ];

  const blogPosts = [
    {
      id: "b1",
      title: "The Joy of Linocut Printmaking",
      excerpt: "Why carving backward feels like learning a secret language with the gouge.",
      date: "March 18, 2026",
      image: "https://picsum.photos/id/193/900/500",
      contentHtml: `
        <h3 id="blog-modal-title">The Joy of Linocut Printmaking</h3>
        <p class="blog-modal-meta">March 18, 2026 · Printmaking</p>
        <img class="img-lazy" src="https://picsum.photos/id/193/900/500" alt="Abstract workshop textures" width="900" height="500" loading="lazy" decoding="async">
        <p>There is a particular joy in linocut: you are always thinking in reverse. The white of the paper is everything you choose to leave behind; the black — or the first roll of ink — is the courage of your cut.</p>
        <p>I love how the first proof always lies. It reveals where you were timid with the gouge, where a curve wanted more breath. By the fourth pull, the block and I have usually reached an honest agreement.</p>
        <img class="img-lazy" src="https://picsum.photos/id/367/900/500" alt="Print tools and paper" width="900" height="500" loading="lazy" decoding="async">
        <p>For students: keep your bench clean, warm your ink plate slightly in winter, and never rush the tuning fork test — if the ink sings, it usually rolls true.</p>
      `,
    },
    {
      id: "b2",
      title: "Editing Techniques That Changed My Photography",
      excerpt: "Curves, color isolation, and the ethics of the crop — a studio notebook.",
      date: "February 4, 2026",
      image: "https://picsum.photos/id/180/900/500",
      contentHtml: `
        <h3 id="blog-modal-title">Editing Techniques That Changed My Photography</h3>
        <p class="blog-modal-meta">February 4, 2026 · Photography</p>
        <img class="img-lazy" src="https://picsum.photos/id/180/900/500" alt="City light study" width="900" height="500" loading="lazy" decoding="async">
        <p>Editing is not correction — it is continuation. The shutter ends one sentence; the curve tool begins the next. Three habits shifted my work: luminosity masks for skin and stone, color range isolation for odd urban greens, and printing early to punish lazy contrast.</p>
        <p>I keep a "lie journal" — notes on images I almost over-smoothed. Humility scales faster than presets.</p>
      `,
    },
    {
      id: "b3",
      title: "Sketching in Kampala Streets",
      excerpt: "Pastel dust, traffic hum, and the generosity of strangers pausing.",
      date: "January 22, 2026",
      image: "https://picsum.photos/id/342/900/500",
      contentHtml: `
        <h3 id="blog-modal-title">Sketching in Kampala Streets</h3>
        <p class="blog-modal-meta">January 22, 2026 · Drawing</p>
        <img class="img-lazy" src="https://picsum.photos/id/342/900/500" alt="Street atmosphere reference" width="900" height="500" loading="lazy" decoding="async">
        <p>Kampala teaches speed. Umbrellas become geometry; bodas become diagonal rhythm. I work smaller than I want to — a discipline — so one scene fits in the time it takes for a cloud to cross the sun.</p>
        <p>Pastel over a sharp charcoal scaffold stops mud. The city rewards color that is slightly louder than accurate; truth lives in temperature, not in naming hues.</p>
        <img class="img-lazy" src="https://picsum.photos/id/325/900/500" alt="Urban sketching detail" width="900" height="500" loading="lazy" decoding="async">
        <p>Tip: tape a scrap of mesh over your box — it keeps dust from becoming a second medium on your clothes.</p>
      `,
    },
    {
      id: "b4",
      title: "When the Press Groans Kindly",
      excerpt: "Notes on pressure, humidity, and listening to the etching press.",
      date: "December 7, 2025",
      image: "https://picsum.photos/id/1076/900/500",
      contentHtml: `
        <h3 id="blog-modal-title">When the Press Groans Kindly</h3>
        <p class="blog-modal-meta">December 7, 2025 · Studio notes</p>
        <img class="img-lazy" src="https://picsum.photos/id/1076/900/500" alt="Studio atmosphere" width="900" height="500" loading="lazy" decoding="async">
        <p>The etching press has opinions. In dry weather it sings high; when humidity climbs, the groan deepens — a reminder that paper is hygroscopic hope. I log pressure in fractional turns now, not guesses.</p>
        <p>Printmaking taught me that repetition is not duplication: it is a chorus. Each voice similar; none identical.</p>
      `,
    },
  ];

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
   * Keeps one listener per image via `{ once: true }` — no memory leaks on reflows.
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

    /* First layout pass can report 0×0 — retry once on the next frame */
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

  function onContactSubmit(e) {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    };
    console.log("[Contact form — demo only]", payload);
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
        "Process documentation (demo):\n\n• I plan edits like print tests: build contrast step-by-step.\n• I protect highlights and let shadows carry texture.\n• I review the piece in both dark and light view to keep the mood consistent."
      );
      return;
    }

    window.alert(
      "Request Process Notes (demo):\n\nThis piece is part of the studio collection, but only featured works include long-form notes.\nIf you’d like the full workflow for this one, reach out via the contact form."
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
