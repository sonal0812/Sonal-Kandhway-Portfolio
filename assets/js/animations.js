/* ═══════════════════════════════════════════════════
   animations.js  |  3 targeted portfolio animations
   1. Stat counters   (hero numbers count up)
   2. Word reveal     (section titles stagger in)
   3. Image parallax  (project card depth on hover)
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ════════════════════════════════════════════════
  // 1. STAT COUNTERS — hero numbers count 0 → target
  // ════════════════════════════════════════════════
  const numEls = document.querySelectorAll('.num-big');

  if (numEls.length) {
    const countUp = (el) => {
      // Find the raw text node (preserves child <span>+ intact)
      const textNode = Array.from(el.childNodes)
        .find(n => n.nodeType === 3 && n.textContent.trim() !== '');

      if (!textNode) return;

      const raw     = textNode.textContent.trim();
      const target  = parseFloat(raw);
      if (isNaN(target)) return;

      const duration = 1600;
      const start    = performance.now();

      const tick = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quart — snappy start, soft landing
        const eased    = 1 - Math.pow(1 - progress, 4);
        const current  = Math.floor(eased * target);
        textNode.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          textNode.textContent = raw; // restore exact original
        }
      };

      requestAnimationFrame(tick);
    };

    const statObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          countUp(e.target);
          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });

    numEls.forEach(el => statObs.observe(el));
  }


  // ════════════════════════════════════════════════
  // 2. STAGGERED WORD REVEAL — section titles
  // ════════════════════════════════════════════════
  const titles = document.querySelectorAll('.section-title');

  const wrapWords = (el) => {
    let wordIdx = 0;

    const processNode = (node) => {
      if (node.nodeType === 3) {
        // Text node — split into words, wrap each in a span
        const parts = node.textContent.split(/(\s+)/);
        const frag  = document.createDocumentFragment();
        parts.forEach(part => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part) {
            const span = document.createElement('span');
            span.className = 'rv-word';
            span.style.setProperty('--wi', wordIdx++);
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (
        node.nodeType === 1 &&
        !['SCRIPT', 'STYLE'].includes(node.tagName)
      ) {
        // Element node — recurse, preserving <em>, <br>, etc.
        Array.from(node.childNodes).forEach(processNode);
      }
    };

    processNode(el);
  };

  if (titles.length) {
    titles.forEach(t => wrapWords(t));

    const wordObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('words-revealed');
          wordObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    titles.forEach(t => wordObs.observe(t));
  }


  // ════════════════════════════════════════════════
  // 3. IMAGE PARALLAX — project card depth on hover
  //    (hover-capable devices only — skips touch)
  // ════════════════════════════════════════════════
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const img = card.querySelector('.project-img');
    if (!img) return; // no image yet — skip placeholder cards

    let raf = null;

    card.addEventListener('mouseenter', () => {
      img.style.transition = 'transform 0.08s linear';
    });

    card.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const dx   = (e.clientX - (rect.left + rect.width  / 2)) / rect.width;
        const dy   = (e.clientY - (rect.top  + rect.height / 2)) / rect.height;
        // Max shift: ±12px horizontal, ±8px vertical
        const tx   = dx * 12;
        const ty   = dy * 8;
        img.style.transform = `scale(1.08) translate(${tx}px, ${ty}px)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      img.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      img.style.transform  = '';
      // Clean up inline styles once transition completes
      img.addEventListener('transitionend', () => {
        img.style.transition = '';
        img.style.transform  = '';
      }, { once: true });
    });
  });

});
