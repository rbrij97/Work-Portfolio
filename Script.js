/* =========================================================
   Financial Analyst Portfolio — micro-interactions
   ========================================================= */

(function () {
  'use strict';

  /* ---- Scroll-triggered reveal for projects + contact ---- */
  const revealTargets = document.querySelectorAll(
    '.project, .section-head, .contact__line, .contact .mono, .contact .btn'
  );

  // Set initial state
  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(36px)';
    el.style.transition =
      'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger entrance slightly for visual rhythm
            const delay = (entry.target.dataset.delay || i * 80) + 'ms';
            entry.target.style.transitionDelay = delay;
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach((el) => io.observe(el));
  } else {
    // Fallback — no IO, just show
    revealTargets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ---- Topbar fades on hero, sharpens on scroll ---- */
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        topbar.style.borderBottom = '1px solid var(--line)';
      } else {
        topbar.style.borderBottom = '1px solid transparent';
      }
    };
    topbar.style.borderBottom = '1px solid transparent';
    topbar.style.transition = 'border-color 0.4s ease';
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Year auto-update in footer ---- */
  const year = new Date().getFullYear();
  document.querySelectorAll('.footer__col').forEach((el) => {
    el.innerHTML = el.innerHTML.replace('2026', year);
  });
})();
