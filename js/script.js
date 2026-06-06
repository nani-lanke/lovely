/* =========================================================
   Logos Links — Portfolio interactions
   Nav · reveal-on-scroll · gallery filter · lightbox · back-to-top
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const navbar = $("#navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    toTop.hidden = window.scrollY < 600;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  const closeNav = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeNav));

  /* ---------- Active section highlight ---------- */
  const sections = $$("main section[id]");
  const navAnchors = $$("#navLinks a");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navAnchors.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealItems = $$(".reveal");
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => revealObs.observe(el));

  /* ---------- Gallery filter ---------- */
  const filters = $$(".filter");
  const galleryItems = $$(".gallery-item");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      galleryItems.forEach((item) => {
        const show = cat === "all" || item.dataset.cat === cat;
        item.classList.toggle("hide", !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCaption = $("#lbCaption");
  const lbClose = $("#lbClose");
  const lbPrev = $("#lbPrev");
  const lbNext = $("#lbNext");

  let group = []; // current array of {src, caption}
  let index = 0;
  let lastFocus = null;

  function buildGroupFrom(imgs) {
    return imgs.map((img) => ({
      src: img.getAttribute("src"),
      caption: img.getAttribute("alt") || "",
    }));
  }

  function openLightbox(list, startIndex, trigger) {
    group = list;
    index = startIndex;
    lastFocus = trigger || document.activeElement;
    render();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }

  function render() {
    const item = group[index];
    if (!item) return;
    lbImg.setAttribute("src", item.src);
    lbImg.setAttribute("alt", item.caption);
    lbCaption.textContent = item.caption;
    const multi = group.length > 1;
    lbPrev.style.display = multi ? "" : "none";
    lbNext.style.display = multi ? "" : "none";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  const step = (dir) => {
    index = (index + dir + group.length) % group.length;
    render();
  };

  // Gallery grid → lightbox (uses currently visible items)
  galleryItems.forEach((fig) => {
    fig.addEventListener("click", () => {
      const visible = galleryItems.filter((i) => !i.classList.contains("hide"));
      const imgs = visible.map((i) => $("img", i));
      const list = buildGroupFrom(imgs);
      const startImg = $("img", fig);
      const start = imgs.indexOf(startImg);
      openLightbox(list, Math.max(0, start), fig);
    });
  });

  // Project screenshot thumbnails → lightbox (scoped to that app's set)
  $$(".project-shots").forEach((wrap) => {
    const imgs = $$("img.screenshot", wrap);
    imgs.forEach((img, i) => {
      img.addEventListener("click", () =>
        openLightbox(buildGroupFrom(imgs), i, img)
      );
    });
  });

  // "View Screenshots" / "View Gallery" buttons → open that app's set
  $$(".js-view-shots").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.gallery;
      const wrap = $(`.project-shots[data-gallery="${CSS.escape(name)}"]`);
      if (!wrap) return;
      const imgs = $$("img.screenshot", wrap);
      openLightbox(buildGroupFrom(imgs), 0, btn);
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => step(-1));
  lbNext.addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  /* ---------- App screenshot carousels (dots) ---------- */
  $$(".shots-carousel").forEach((car) => {
    const slides = $$("img.screenshot", car);
    if (slides.length < 2) return;

    // Build dot indicators
    const dots = document.createElement("div");
    dots.className = "shots-dots";
    dots.setAttribute("role", "tablist");
    dots.setAttribute("aria-label", "Screenshot navigation");
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Go to screenshot " + (i + 1));
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", () =>
        car.scrollTo({ left: i * car.clientWidth, behavior: "smooth" })
      );
      dots.appendChild(b);
    });
    car.insertAdjacentElement("afterend", dots);
    const dotBtns = Array.from(dots.children);

    const setActive = () => {
      const i = Math.round(car.scrollLeft / car.clientWidth);
      dotBtns.forEach((d, n) => d.classList.toggle("active", n === i));
    };
    let raf;
    car.addEventListener(
      "scroll",
      () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(setActive);
      },
      { passive: true }
    );
    window.addEventListener("resize", setActive);
  });

  /* ---------- App projects carousel (numbered dots) ---------- */
  const appsCar = $("#appsCarousel");
  if (appsCar) {
    const cards = $$(":scope > .project-card", appsCar);
    // Off-screen slides never trigger the scroll-reveal observer, so show them directly.
    cards.forEach((c) => c.classList.add("in"));
    if (cards.length > 1) {
      const ord = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
      const dots = document.createElement("div");
      dots.className = "apps-dots";
      dots.setAttribute("role", "tablist");
      dots.setAttribute("aria-label", "App projects");

      cards.forEach((card, i) => {
        const name = (card.querySelector(".project-head h3")?.textContent || "App " + (i + 1)).trim();
        const feat = card.querySelector(".project-feature")?.getAttribute("src") || "";
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = `<img class="apps-dot-thumb" src="${feat}" alt="" aria-hidden="true"><span class="apps-dot-name">${name}</span>`;
        b.setAttribute("aria-label", `${ord[i] || i + 1} project: ${name}`);
        if (i === 0) b.classList.add("active");
        b.addEventListener("click", () =>
          appsCar.scrollTo({ left: i * appsCar.clientWidth, behavior: "smooth" })
        );
        dots.appendChild(b);
      });
      appsCar.insertAdjacentElement("beforebegin", dots);
      const dotBtns = Array.from(dots.children);

      const setActiveApp = () => {
        const i = Math.round(appsCar.scrollLeft / appsCar.clientWidth);
        dotBtns.forEach((d, n) => d.classList.toggle("active", n === i));
      };
      let rafA;
      appsCar.addEventListener(
        "scroll",
        () => {
          cancelAnimationFrame(rafA);
          rafA = requestAnimationFrame(setActiveApp);
        },
        { passive: true }
      );
      window.addEventListener("resize", setActiveApp);
    }
  }

  /* ---------- Back to top ---------- */
  const toTop = $("#toTop");
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  onScroll();
})();
