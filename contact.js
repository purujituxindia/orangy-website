// ===========================
// Mobile nav hamburger
// ===========================
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


// ===========================
// Scroll reveal
// ===========================
(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(function (el) { observer.observe(el); });
})();


// ===========================
// Form submission (mailto fallback)
// ===========================
(function () {
  var form = document.getElementById('auditForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = form.querySelector('#cf-name').value.trim();
    var email   = form.querySelector('#cf-email').value.trim();
    var phone   = form.querySelector('#cf-phone').value.trim();
    var company = form.querySelector('#cf-company').value.trim();
    var budget  = form.querySelector('#cf-budget').value.trim();
    var linkedin= form.querySelector('#cf-linkedin').value.trim();
    var brief   = form.querySelector('#cf-brief').value.trim();

    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }

    var subject = encodeURIComponent('Free UX Audit Request — ' + name);
    var body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + phone + '\n' +
      'Company: ' + company + '\n' +
      'Design Budget: ' + budget + '\n' +
      'LinkedIn: ' + linkedin + '\n\n' +
      'Project Brief:\n' + brief
    );

    window.location.href = 'mailto:hello@orangy.design?subject=' + subject + '&body=' + body;

    // Show inline confirmation
    var notice = form.querySelector('.audit-form__notice');
    var submit = form.querySelector('.audit-form__submit');
    if (notice) notice.textContent = 'Thanks! We\'ll be in touch within 24–48 hrs.';
    if (submit) { submit.textContent = 'Sent!'; submit.disabled = true; }
  });
})();
