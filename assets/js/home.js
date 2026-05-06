/* ═══════════════════════════════════════════════════
   home.js  |  Portfolio homepage interactions
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Story Accordion ──────────────────────────────
  const stoggle = document.getElementById('storyToggle');
  const sbody   = document.getElementById('storyBody');
  if (stoggle && sbody) {
    stoggle.addEventListener('click', () => {
      const open = sbody.classList.toggle('open');
      stoggle.classList.toggle('open', open);
    });
  }

  // ── Contact Form ─────────────────────────────────
  const form      = document.getElementById('contactForm');
  const success   = document.getElementById('formSuccess');
  const errBox    = document.getElementById('cfError');
  const submitBtn = document.getElementById('cfSubmit');
  const textarea  = document.getElementById('cf-message');
  const charCount = document.getElementById('charCount');

  if (!form) return;

  const submitTxt = submitBtn.querySelector('.cf-submit-text');
  const submitIco = submitBtn.querySelector('.cf-submit-icon');
  const submitLdr = submitBtn.querySelector('.cf-submit-loading');

  // Character counter
  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = len + ' / 1000';
      if (len > 1000) textarea.value = textarea.value.slice(0, 1000);
      charCount.style.color = len > 900 ? '#f87171' : 'var(--ink-3)';
    });
  }

  // Form submit
  form.addEventListener('submit', async e => {
    e.preventDefault();
    errBox.style.display = 'none';

    const action = form.getAttribute('action');

    // Demo mode if Formspree ID not replaced
    if (action.includes('YOUR_FORM_ID')) {
      showSuccess();
      return;
    }

    // Loading state
    setLoading(true);

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showSuccess();
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      errBox.style.display = 'block';
      setLoading(false);
    }
  });

  function setLoading(on) {
    submitBtn.disabled        = on;
    submitTxt.style.display   = on ? 'none'   : 'inline';
    submitIco.style.display   = on ? 'none'   : 'inline';
    submitLdr.style.display   = on ? 'flex'   : 'none';
    if (on) {
      submitLdr.style.alignItems = 'center';
      submitLdr.style.gap        = '8px';
    }
  }

  function showSuccess() {
    form.classList.add('hide');
    success.classList.add('show');
  }

  // Exposed globally for "Send another" button
  window.resetForm = function () {
    form.reset();
    form.classList.remove('hide');
    success.classList.remove('show');
    setLoading(false);
    if (charCount) charCount.textContent = '0 / 1000';
  };

});
