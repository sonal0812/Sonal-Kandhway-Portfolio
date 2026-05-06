/* ═══════════════════════════════════════════════════
   main.js  |  Shared interactions across all pages
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ────────────────────────────────
  const cur  = document.getElementById('cur');
  const curR = document.getElementById('curR');
  if (cur && curR) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      curR.style.left = rx + 'px';
      curR.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
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
