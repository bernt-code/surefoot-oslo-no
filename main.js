/* ════════════════════════════════════════════════════════════════════
   SUREFOOT OSLO — Shared JavaScript
   Vanilla JS, no dependencies. Loads on every page.
   ════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── MOBILE NAV TOGGLE ─────────────────────────────── */
  const nav = document.querySelector('nav.site-nav');
  if (nav) {
    const links = nav.querySelector('.nav-links');
    if (links) {
      const btn = document.createElement('button');
      btn.className = 'nav-toggle';
      btn.setAttribute('aria-label', 'Åpne meny');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span></span><span></span><span></span>';
      nav.appendChild(btn);

      btn.addEventListener('click', function () {
        const isOpen = links.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          btn.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ─── NAV SCROLL DETECTION ──────────────────────────── */
  if (nav) {
    const onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── FAQ ACCORDION ─────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.closest('.faq-item');
      if (item) item.classList.toggle('open');
    });
  });

  /* ─── STICKY BOOK BAR ──────────────────────────────── */
  const sticky = document.getElementById('stickyBook');
  if (sticky) {
    const onScrollBook = function () {
      const y = window.scrollY;
      const h = window.innerHeight;
      const doc = document.documentElement.scrollHeight;
      const show = y > h * 0.85 && y < doc - h - 240;
      sticky.classList.toggle('visible', show);
    };
    window.addEventListener('scroll', onScrollBook, { passive: true });
  }

  /* ─── ANIMATED STAT COUNTERS ──────────────────────── */
  const counters = document.querySelectorAll('.statbar-num[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = function (el) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const t0 = performance.now();
      const fmt = function (n) {
        if (n >= 1000000) return (n / 1000000).toFixed(n >= 1000000 ? 0 : 1) + 'M';
        if (n >= 1000) return Math.round(n / 1000) + 'K';
        return Math.round(n).toString();
      };
      const tick = function (t) {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target) + suffix;
      };
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !e.target.dataset.animated) {
          e.target.dataset.animated = '1';
          animate(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { obs.observe(c); });
  }

});

/* Legacy global toggle (used by some existing pages with onclick="toggle(this)") */
function toggle(btn) {
  const item = btn.closest('.faq-item');
  if (item) item.classList.toggle('open');
}
