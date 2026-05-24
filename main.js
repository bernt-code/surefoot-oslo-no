/* ═══════════════════════════════════════════════════
   SUREFOOT OSLO — Shared JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── MOBILE NAV TOGGLE ──────────────────────────── */
  const nav = document.querySelector('nav.site-nav');
  if (nav) {
    const links = nav.querySelector('.nav-links');

    // Inject hamburger button
    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Åpne meny');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(btn, links);

    btn.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a link is clicked
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── FAQ ACCORDION ─────────────────────────────── */
  // Attach to any .faq-q elements (works on all pages)
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.closest('.faq-item');
      if (item) item.classList.toggle('open');
    });
  });

});

// Legacy inline toggle function (for backward compatibility)
function toggle(btn) {
  const item = btn.closest('.faq-item');
  if (item) item.classList.toggle('open');
}
