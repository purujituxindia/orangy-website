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




// Philosophy pills — click to highlight
(function () {
  var pills = document.querySelectorAll('.philo-pill');
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('philo-pill--active'); });
      this.classList.add('philo-pill--active');
    });
  });
})();


// Scroll-reveal — fade sections in as they enter the viewport
(function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.studio-stats, .studio-story, .studio-highlight, ' +
    '.studio-values, .studio-philosophy, .process, ' +
    '.studio-team, .testimonial, .studio-industry, .brands, .studio-cta'
  );

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(function (el) {
    el.classList.add('reveal');
    io.observe(el);
  });
})();

// Testimonial slider
(function () {
  var track = document.querySelector('.testimonial__track');
  var dots = document.querySelectorAll('.testimonial__dot');
  var prev = document.querySelector('.testimonial__arrow--prev');
  var next = document.querySelector('.testimonial__arrow--next');
  if (!track || !dots.length) return;

  var total = dots.length;
  var current = 0;
  var section = track.closest('.testimonial');
  var timer;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (dot, i) {
      dot.classList.toggle('testimonial__dot--active', i === current);
    });
  }

  function startAutoAdvance() {
    clearInterval(timer);
    timer = setInterval(function () {
      goTo(current + 1);
    }, 5000);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goTo(i);
      startAutoAdvance();
    });
  });

  if (prev) {
    prev.addEventListener('click', function () {
      goTo(current - 1);
      startAutoAdvance();
    });
  }

  if (next) {
    next.addEventListener('click', function () {
      goTo(current + 1);
      startAutoAdvance();
    });
  }

  if (section) {
    section.addEventListener('mouseenter', function () {
      clearInterval(timer);
    });
    section.addEventListener('mouseleave', function () {
      startAutoAdvance();
    });
  }

  goTo(0);
  startAutoAdvance();
})();
