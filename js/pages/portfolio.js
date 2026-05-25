/* ===========================
   PORTFOLIO PAGE JS
=========================== */
(function () {
  'use strict';

  /* ── Filter tabs ── */
  const filters = document.querySelectorAll('.pf-filter');
  const cards   = document.querySelectorAll('.pf-card');

  function applyFilter(category) {
    /* Update button states */
    filters.forEach(function (btn) {
      const active = btn.dataset.filter === category;
      btn.classList.toggle('pf-filter--active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    /* Show / hide cards */
    cards.forEach(function (card) {
      if (category === 'all') {
        card.classList.remove('pf-card--hidden');
      } else {
        const match = card.dataset.category === category;
        card.classList.toggle('pf-card--hidden', !match);
      }
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.dataset.filter);
    });
  });

  /* ── Inject project counts into filter labels ── */
  filters.forEach(function (btn) {
    const f = btn.dataset.filter;
    if (f === 'all') {
      btn.textContent = 'All Projects (' + cards.length + ')';
    } else {
      const count = document.querySelectorAll('.pf-card[data-category="' + f + '"]').length;
      btn.textContent = btn.textContent + ' (' + count + ')';
    }
  });

  /* ── Apply filter from URL param e.g. ?filter=healthcare ── */
  const urlFilter = new URLSearchParams(window.location.search).get('filter');
  if (urlFilter) applyFilter(urlFilter);

})();
