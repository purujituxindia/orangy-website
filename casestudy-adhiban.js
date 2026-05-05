/* ===========================
   CASE STUDY — ADHIBAN
   Handles: image placeholders, nav active state,
            scroll-reveal animations
=========================== */

(function () {
  'use strict';

  /* ── Placeholder images
     Any <img data-placeholder="..."> with src="" gets a grey box.
     Once you set a real src the class is removed automatically.
  ──────────────────────────────────────────────── */
  function initPlaceholders() {
    document.querySelectorAll('img[data-placeholder]').forEach(function (img) {
      if (!img.src || img.src === window.location.href) {
        img.style.background = '#e8e8e8';
        img.style.minHeight  = '100%';
        img.style.minWidth   = '100%';
        img.style.display    = 'block';
      }
      img.addEventListener('load', function () {
        img.style.background = '';
      });
    });
  }

  /* ── Scroll-reveal
     Adds .is-visible to .cs-hero, .cs-intro, .cs-challenge,
     .cs-solution, .cs-features, .cs-outcomes-cards, .cs-stats,
     .cs-process, .cs-final-thoughts, .cs-testimonial,
     .cs-next, .cs-cta as they enter the viewport.
  ──────────────────────────────────────────────── */
  function initReveal() {
    var targets = document.querySelectorAll(
      '.cs-hero, .cs-intro, .cs-challenge, ' +
      '.cs-solution, .cs-features, .cs-outcomes-cards, ' +
      '.cs-stats, .cs-process, .cs-final-thoughts, ' +
      '.cs-testimonial, .cs-next, .cs-cta'
    );

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ── Inject reveal styles into <head> ── */
  function injectRevealCSS() {
    var style = document.createElement('style');
    style.textContent =
      '.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }' +
      '.reveal.is-visible { opacity: 1; transform: none; }';
    document.head.appendChild(style);
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initPlaceholders();
    injectRevealCSS();
    initReveal();
  });
})();
