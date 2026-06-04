/* ═══════════════════════════════════════════════════
   main.js  |  Shared interactions across all pages
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger Menu ───────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  const body       = document.body;

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      body.style.overflow = open ? 'hidden' : '';  // prevent scroll when menu open
    });

    // Tap outside (on overlay background) closes menu
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeMobileNav();
    });
  }

  window.closeMobileNav = function () {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileNav) mobileNav.classList.remove('open');
    body.style.overflow = '';
  };

  // ESC key closes mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      window.closeMobileNav();
    }
  });

  // Close on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) window.closeMobileNav();
  });

  // ── Active Nav Section Indicator ─────────────────
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');
  const sections = [];
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec && !sections.find(s => s.id === id)) sections.push({ id, el: sec });
  });

  if (sections.length) {
    const setActive = (id) => {
      navLinks.forEach(l => {
        const linkId = l.getAttribute('href').slice(1);
        l.classList.toggle('active', linkId === id);
      });
    };

    const navObs = new IntersectionObserver((entries) => {
      // Pick the entry closest to top of viewport that's intersecting
      const intersecting = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (intersecting.length) {
        setActive(intersecting[0].target.id);
      }
    }, {
      rootMargin: '-30% 0px -55% 0px',  // section is "active" when in middle 15% of viewport
      threshold: 0
    });
    sections.forEach(s => navObs.observe(s.el));
  }

  // ── Back to Top Button ───────────────────────────
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Custom Cursor ────────────────────────────────
  const cur  = document.getElementById('cur');
  const curR = document.getElementById('curR');
  if (cur && curR) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    // Dot snaps instantly
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });
    // Ring trails with eased lerp
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      curR.style.left = (rx | 0) + 'px';
      curR.style.top  = (ry | 0) + 'px';
      requestAnimationFrame(animRing);
    })();
    // Hide cursors when mouse leaves window
    document.addEventListener('mouseleave', () => {
      cur.style.opacity = '0';
      curR.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cur.style.opacity = '1';
      curR.style.opacity = '1';
    });
  }

  // ── Scroll Progress Bar ──────────────────────────
  const prog = document.getElementById('prog');
  if (prog) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      prog.style.width = pct + '%';
    }, { passive: true });
  }

  // ── Sticky Nav ───────────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('stuck', window.scrollY > 50);
    }, { passive: true });
  }

  // ── Theme Toggle ─────────────────────────────────
  const html       = document.documentElement;
  const themeBtn   = document.getElementById('themeToggle');
  const themeIcon  = document.getElementById('themeIcon');
  let   dark       = true;

  if (themeBtn) {
    // Restore saved preference
    const saved = localStorage.getItem('sk-theme');
    if (saved === 'light') {
      dark = false;
      html.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
      dark = !dark;
      const theme = dark ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);
      localStorage.setItem('sk-theme', theme);
      if (themeIcon) themeIcon.textContent = dark ? '🌙' : '☀️';
    });
  }

  // ── Scroll Reveal ────────────────────────────────
  const rvEls = document.querySelectorAll('.rv');
  if (rvEls.length) {
    const rvObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          rvObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    rvEls.forEach(el => rvObs.observe(el));
  }

  // ── Skill Bar Animations ─────────────────────────
  const bars = document.querySelectorAll('.sbar-fill');
  if (bars.length) {
    const bObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.w + '%';
          bObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => bObs.observe(b));
  }

  // ── Smooth Anchor Scroll ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Particles (hero only) ────────────────────────
  const pCanvas = document.getElementById('particles');
  if (pCanvas) {
    for (let i = 0; i < 24; i++) {
      const p    = document.createElement('div');
      p.className = 'particle';
      const size  = Math.random() * 4 + 2;
      const delay = Math.random() * 8;
      const dur   = Math.random() * 12 + 8;
      const left  = Math.random() * 100;
      p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s;`;
      pCanvas.appendChild(p);
    }
  }

});

// ── Lightbox ──────────────────────────────────────────────
(function () {
  // Build overlay DOM once
  const overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image preview');

  const wrap = document.createElement('div');
  wrap.className = 'lb-img-wrap';

  const img = document.createElement('img');
  img.alt = '';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lb-close';
  closeBtn.setAttribute('aria-label', 'Close preview');
  closeBtn.innerHTML = '&times;';

  wrap.appendChild(img);
  overlay.appendChild(wrap);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
    // Clear src after transition so old image doesn't flash on next open
    setTimeout(() => { img.src = ''; }, 280);
  }

  closeBtn.addEventListener('click', close);
  // Click outside the image closes overlay
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('lb-open')) close();
  });

  // Attach to all content images (excluding logos, nav icons, avatars)
  function attachLightbox() {
    const selectors = [
      'main img',
    ].join(',');

    document.querySelectorAll(selectors).forEach(function (el) {
      // Skip tiny icons, logos, nav images
      if (el.closest('nav') || el.closest('footer') || el.closest('.back-top')) return;
      if (el.classList.contains('nav-logo-img') || el.classList.contains('ft-logo')) return;
      if (el.getAttribute('data-lb') === 'off') return;
      if (el._lbAttached) return;
      el._lbAttached = true;

      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function () {
        open(el.src, el.alt);
      });
    });
  }

  // Run once DOM ready, then again after any dynamic content
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachLightbox);
  } else {
    attachLightbox();
  }
  // Also catch lazily rendered images
  window.addEventListener('load', attachLightbox);
})();

// ── Project card hero image → navigate to case study ─────
(function () {
  document.querySelectorAll('.project-hero').forEach(function (hero) {
    hero.addEventListener('click', function () {
      const card = hero.closest('.project-card');
      if (!card) return;
      const link = card.querySelector('.project-link');
      if (link && link.href) window.location.href = link.href;
    });
  });
})();
