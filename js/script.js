/**
 * ============================================================================
 * Alex Rivera — Portfolio & Blog (Vanilla JS)
 * ----------------------------------------------------------------------------
 * Responsibilities:
 * - Scroll UX: navbar solid state, back-to-top visibility
 * - Mobile nav: toggle, focus trap basics, backdrop click
 * - Gallery: projects data, debounced search, category filter, modal
 * - Blog: post cards + article modal
 * - Contact: fake submit with UI success + console log
 * - Motion: IntersectionObserver for section reveals (respects reduced motion via CSS)
 * ============================================================================
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
   * DATA: Nine portfolio pieces (three per medium)
   * Each object drives the card grid and the detail modal. `medium` is shown
   * in the modal under "Medium & techniques".
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

  /* --------------------------------------------------------------------------
   * DATA: Blog posts (titles align with user-requested themes)
   * `contentHtml` is injected into the blog modal (trusted static content only).
   * -------------------------------------------------------------------------- */
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
        <img src="https://picsum.photos/id/193/900/500" alt="Abstract workshop textures" width="900" height="500" loading="lazy">
        <p>There is a particular joy in linocut: you are always thinking in reverse. The white of the paper is everything you choose to leave behind; the black — or the first roll of ink — is the courage of your cut.</p>
        <p>I love how the first proof always lies. It reveals where you were timid with the gouge, where a curve wanted more breath. By the fourth pull, the block and I have usually reached an honest agreement.</p>
        <img src="https://picsum.photos/id/367/900/500" alt="Print tools and paper" width="900" height="500" loading="lazy">
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
        <img src="https://picsum.photos/id/180/900/500" alt="City light study" width="900" height="500" loading="lazy">
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
        <img src="https://picsum.photos/id/342/900/500" alt="Street atmosphere reference" width="900" height="500" loading="lazy">
        <p>Kampala teaches speed. Umbrellas become geometry; bodas become diagonal rhythm. I work smaller than I want to — a discipline — so one scene fits in the time it takes for a cloud to cross the sun.</p>
        <p>Pastel over a sharp charcoal scaffold stops mud. The city rewards color that is slightly louder than accurate; truth lives in temperature, not in naming hues.</p>
        <img src="https://picsum.photos/id/325/900/500" alt="Urban sketching detail" width="900" height="500" loading="lazy">
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
        <img src="https://picsum.photos/id/1076/900/500" alt="Studio atmosphere" width="900" height="500" loading="lazy">
        <p>The etching press has opinions. In dry weather it sings high; when humidity climbs, the groan deepens — a reminder that paper is hygroscopic hope. I log pressure in fractional turns now, not guesses.</p>
        <p>Printmaking taught me that repetition is not duplication: it is a chorus. Each voice similar; none identical.</p>
      `,
    },
  ];

  /* --------------------------------------------------------------------------
   * State for gallery (filter + search) — kept minimal to avoid stale DOM reads
   * -------------------------------------------------------------------------- */
  let activeCategory = "all";
  let searchQuery = "";

  /* --------------------------------------------------------------------------
   * DOM references — captured once at init
   * -------------------------------------------------------------------------- */
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

  /**
   * Maps category string → CSS modifier for colored badges on cards/modal.
   */
  function badgeClassForCategory(category) {
    if (category === "Printmaking") return "badge-print";
    if (category === "Photography & Editing") return "badge-photo";
    if (category === "Drawing") return "badge-draw";
    return "badge-print";
  }

  /**
   * Filters the in-memory `projects` array:
   * - Category: "all" keeps every row; otherwise strict equality on `category`
   * - Search: case-insensitive match on title OR description (single pass)
   */
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

  /**
   * Renders `<li.gallery-card>` nodes from filtered data.
   * Uses DocumentFragment to touch the live DOM once (performance).
   * Event delegation on `#gallery-grid` handles clicks — no per-card listeners.
   */
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
          <img src="${p.image}" alt="" width="800" height="600" loading="lazy">
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

    // Re-bind reveal observation for new nodes
    observeNewReveals(galleryGrid);
  }

  /** Minimal HTML escape for text inserted via template strings */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Optional skeleton: show a few placeholder bars, then render after a short tick
   * so first paint feels intentional without blocking interactivity.
   */
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

  /**
   * Project modal population — keeps image alt meaningful for accessibility
   */
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
    imgEl.src = project.image.replace("/800/600", "/1200/800");
    imgEl.alt = project.title;

    openModal(projectModal);
  }

  function openBlogModal(post) {
    const body = document.getElementById("blog-modal-content");
    body.innerHTML = post.contentHtml;
    openModal(blogModal);
  }

  /**
   * Modal open/close with focus management and Escape key
   * Scale + fade is handled in CSS on `.modal-panel`
   */
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

  /**
   * Delegated handler: gallery card click / Enter on focused card
   */
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

  /**
   * Filter tabs: single handler on `.filter-group` reduces listeners
   * Updates `aria-selected` for accessibility
   */
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

  /**
   * Search: debounced input — avoids re-filtering on every keystroke in slow devices
   * 180ms is a balance between snappy and cheap
   */
  let searchDebounce = null;
  function onSearchInput() {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = gallerySearch.value;
      renderGallery();
    }, 180);
  }

  /**
   * Mobile nav: slide-in panel + backdrop; sync aria-expanded
   */
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
   * Navbar background on scroll + back-to-top visibility
   * Single scroll listener (throttled via rAF) to minimize layout thrash
   */
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop;
        header.classList.toggle("is-scrolled", y > 40);
        backToTop.classList.toggle("is-visible", y > 500);
        ticking = false;
      });
      ticking = true;
    }
  }

  /**
   * IntersectionObserver: adds `.is-visible` when elements enter viewport
   */
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

  /**
   * Blog grid render (static cards; read more uses button + dataset id)
   */
  function renderBlog() {
    const frag = document.createDocumentFragment();
    blogPosts.forEach((post) => {
      const li = document.createElement("li");
      li.className = "blog-card reveal";
      li.innerHTML = `
        <div class="blog-card-image">
          <img src="${post.image}" alt="" width="900" height="500" loading="lazy">
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
    observeNewReveals(blogGrid);
  }

  /**
   * Event delegation root for blog "Read More"
   */
  function onBlogGridClick(e) {
    const btn = e.target.closest(".blog-read-more");
    if (!btn) return;
    const id = btn.dataset.blogId;
    const post = blogPosts.find((b) => b.id === id);
    if (post) {
      // Ensure modal title id exists for aria-labelledby — first heading in injected HTML carries it
      openBlogModal(post);
    }
  }

  /**
   * Contact form: prevent real submit; log + success banner
   */
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

  /**
   * Modal backdrop + close buttons — delegated where possible
   */
  function bindModalClose(modalEl, closeBtnId) {
    modalEl.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-modal-close")) closeModal(modalEl);
    });
    const closeBtn = document.getElementById(closeBtnId);
    if (closeBtn) closeBtn.addEventListener("click", () => closeModal(modalEl));
  }

  /**
   * "View Process" on project modal — alert + extra line as requested
   */
  function onProcessClick() {
    const med = document.getElementById("project-modal-medium");
    const extra =
      med && med.textContent
        ? "\n\nProcess note: edition logs, progressive proofs, and registration marks are archived in the studio flat-file."
        : "";
    window.alert("Process documentation (demo): progressive proofs and tear sheets." + extra);
  }

  /**
   * Smooth scroll for anchor links inside nav (optional enhancement)
   */
  function onNavLinkClick(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !header.contains(a)) return;
    if (navMenu.classList.contains("is-open")) setNavOpen(false);
  }

  /* --------------------------------------------------------------------------
   * INIT
   * -------------------------------------------------------------------------- */
  function init() {
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    initReveals();
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

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
