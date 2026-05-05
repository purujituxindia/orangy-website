// Hide navbar on scroll down, show on scroll up
(function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > lastY && y > 80) {
      navbar.classList.add('navbar--hidden');
    } else {
      navbar.classList.remove('navbar--hidden');
    }
    navbar.classList.toggle('navbar--scrolled', y > 10);
    lastY = y;
  }, { passive: true });
})();

// Mobile nav — hamburger toggle
(function () {
  var hamburger = document.querySelector('.navbar__hamburger');
  var mobileNav = document.querySelector('.mobile-nav');

  function openNav() {
    document.body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
  }
  function closeNav() {
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      document.body.classList.contains('nav-open') ? closeNav() : openNav();
    });
  }
  if (mobileNav) {
    var closeBtn = mobileNav.querySelector('.mobile-nav__close');
    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav();
  });
})();


// Scroll reveal
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { observer.observe(el); });
})();


// Stats count-up
(function () {
  var nums = document.querySelectorAll('.svc-stat__num');
  if (!nums.length) return;

  function animateNum(el) {
    var text = el.textContent.trim();
    var target = parseInt(text.replace(/\D/g, ''), 10);
    var suffix = text.replace(/[0-9]/g, '');
    var start = null;
    var duration = 1200;

    if (!target || el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    function tick(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateNum(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  nums.forEach(function (num) {
    observer.observe(num);
  });
})();
