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
   * DATA: Nine portfolio pieces (three per medium)
   * -------------------------------------------------------------------------- */
  const projects = [
    {
      id: 1,
      title: "Linocut: City Grain",
      category: "Printmaking",
      description: "Bold relief lines carve rhythm from weathered walls and signage.",
      fullDescription:
        "A limited edition linocut exploring the tactile language of urban surfaces. High-contrast cuts echo the way light falls across plaster and metal — each impression whispers a different story from the last.",
      medium: "Oil-based relief ink on cotton rag; hand burnished; edition of 12.",
      image: "https://picsum.photos/id/119/800/600",
      date: "March 2026",
    },
    {
      id: 2,
      title: "Copper Plate Etching — Veil",
      category: "Printmaking",
      description: "Soft aquatint gradients float over fine cross-hatched shadows.",
      fullDescription:
        "An intaglio study in restraint: layered aquatint bites build a veil of tone while selective wiping leaves traces of the artist's hand along the plate's edge.",
      medium: "Copper etching, aquatint, Charbonnel inks on Somerset velvet.",
      image: "https://picsum.photos/id/250/800/600",
      date: "February 2026",
    },
    {
      id: 3,
      title: "Monotype — Tide Memory",
      category: "Printmaking",
      description: "Single-pull ghosts of color washed across a smooth field plate.",
      fullDescription:
        "Monotype allows one honest moment before the image disappears. Transparent rolls of blues and ochres suggest tide lines and tide memory — never the same twice.",
      medium: "Akua intaglio ink on polycarbonate plate; Rives BFK paper.",
      image: "https://picsum.photos/id/338/800/600",
      date: "January 2026",
    },
    {
      id: 4,
      title: "Golden Hour Ledger",
      category: "Photography & Editing",
      description: "Warm tonal curves and split toning honor late-day light on skin and stone.",
      fullDescription:
        "Shot on quiet rooftops, this series chases the last ten minutes of sun. Editing favors curved luminance masks — lifting golds without sacrificing ink-like shadows.",
      medium: "Digital capture; Lightroom + Photoshop; archival pigment print.",
      image: "https://picsum.photos/id/564/800/600",
      date: "March 2026",
    },
    {
      id: 5,
      title: "Double Exposure — Familiar Strangers",
      category: "Photography & Editing",
      description: "Layered silhouettes question identity between crowd and solitude.",
      fullDescription:
        "In-camera double exposures from markets and metro stations, refined with gentle masking so silhouettes breathe without becoming kitsch.",
      medium: "Mirrorless camera; compositing in Photoshop; Hahnemühle photo rag.",
      image: "https://picsum.photos/id/628/800/600",
      date: "February 2026",
    },
    {
      id: 6,
      title: "Infrared Urban Decay",
      category: "Photography & Editing",
      description: "False-color foliage against graphite skies — cities as alien gardens.",
      fullDescription:
        "720nm infrared conversion reveals chlorophyll as snow-bright while concrete falls away into cool voids. Channel swaps and local HSL sculpt a speculative palette.",
      medium: "Full-spectrum body; IR filter; color grading pipeline in Capture One.",
      image: "https://picsum.photos/id/866/800/600",
      date: "December 2025",
    },
    {
      id: 7,
      title: "Charcoal — Nineteen Gestures",
      category: "Drawing",
      description: "Fast gestures searching for weight before detail arrives.",
      fullDescription:
        "A sequence of nineteen two-minute poses — compressed charcoal on toned paper. Erasure is as important as mark: lifting light back into the form.",
      medium: "Nitram charcoal, kneaded eraser, warm gray Canson Mi-Teintes.",
      image: "https://picsum.photos/id/1008/800/600",
      date: "March 2026",
    },
    {
      id: 8,
      title: "Ink & Wash — Conservatory",
      category: "Drawing",
      description: "Loose brush and dry brush describe humidity and leaf-shadow.",
      fullDescription:
        "Working wet-into-wet in a winter conservatory, the drawing chases steam on glass and the scatter of winter light across ferns.",
      medium: "Bamboo pen, iron gall ink, diffuse watercolor washes.",
      image: "https://picsum.photos/id/1056/800/600",
      date: "February 2026",
    },
    {
      id: 9,
      title: "Pastel — Kampala Streets",
      category: "Drawing",
      description: "Soft pastel over textured ground captures street tempo and color.",
      fullDescription:
        "Quick pastel studies from Kampala streets: umbrellas, moto reflections, ochre dust. Scribbled underpainting locks vibration before layers of softer hue calm the surface.",
      medium: "Hard and soft pastel on UART 400 sanded paper; fixed lightly.",
      image: "https://picsum.photos/id/318/800/600",
      date: "January 2026",
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
  const HERO_HEADLINE = "Alex Rivera";
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
    if (category === "Printmaking") return "badge-print";
    if (category === "Photography & Editing") return "badge-photo";
    if (category === "Drawing") return "badge-draw";
    return "badge-print";
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
    descEl.textContent = project.fullDescription;
    medEl.textContent = project.medium;
    imgEl.classList.remove("is-loaded");
    imgEl.src = project.image.replace("/800/600", "/1200/800");
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
    const med = document.getElementById("project-modal-medium");
    const extra =
      med && med.textContent
        ? "\n\nProcess note: edition logs, progressive proofs, and registration marks are archived in the studio flat-file."
        : "";
    window.alert("Process documentation (demo): progressive proofs and tear sheets." + extra);
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
