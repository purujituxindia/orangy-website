// Hide navbar on scroll down, show on scroll up
(function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  var lastY = window.scrollY;
  var ticking = false;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        if (y > lastY && y > 80) {
          navbar.classList.add('navbar--hidden');
        } else {
          navbar.classList.remove('navbar--hidden');
        }
        navbar.classList.toggle('navbar--scrolled', y > 10);
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// Mobile nav hamburger
(function() {
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
    hamburger.addEventListener('click', function() {
      document.body.classList.contains('nav-open') ? closeNav() : openNav();
    });
  }

  if (mobileNav) {
    var closeBtn = mobileNav.querySelector('.mobile-nav__close');
    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeNav);
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav();
  });
})();

// Hero card parallax
(function() {
  var hero = document.querySelector('.hero');
  var card = document.querySelector('.hero__card-preview');
  if (!hero || !card) return;
  var heroH, winH, range;
  var ticking = false;

  function updateLayout() {
    heroH = hero.offsetHeight;
    winH = window.innerHeight;
    range = Math.max(1, heroH - winH);
    update();
  }

  function update() {
    if (window.innerWidth <= 600) {
      ticking = false;
      return;
    }
    var scrollY = window.scrollY;
    var progress = Math.max(0, Math.min(1, scrollY / range));
    var y = 60 - 62 * progress;
    card.style.transform = 'translateX(-50%) translateY(' + y + '%)';
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', function() {
    window.requestAnimationFrame(updateLayout);
  }, { passive: true });
  updateLayout();
})();

// Tag pills — Healthcare UX deactivates when another pill is hovered
(function() {
  var pills = document.querySelectorAll('.tag-pill');
  var defaultPill = document.querySelector('.tag-pill--green');
  if (!defaultPill) return;

  pills.forEach(function(pill) {
    if (pill === defaultPill) return;
    pill.addEventListener('mouseenter', function() {
      defaultPill.classList.remove('tag-pill--green');
    });
    pill.addEventListener('mouseleave', function() {
      defaultPill.classList.add('tag-pill--green');
    });
  });
})();

// Video Player
(function() {
  var vp = document.getElementById('vp');
  if (!vp) return;
  var video      = vp.querySelector('.vp__video');
  var placeholder= vp.querySelector('.vp__placeholder');
  var playBig    = vp.querySelector('.vp__play-big');
  var btnPlay    = vp.querySelector('.vp__btn--play');
  var timeDisp   = vp.querySelector('.vp__time');
  var fill       = vp.querySelector('.vp__timeline-fill');
  var bufferedEl = vp.querySelector('.vp__timeline-buffered');
  var thumb      = vp.querySelector('.vp__timeline-thumb');
  var timeline   = vp.querySelector('.vp__timeline');
  var tlWrap     = vp.querySelector('.vp__timeline-wrap');
  var btnSpeed   = vp.querySelector('.vp__btn--speed');
  var speedMenu  = vp.querySelector('.vp__menu--speed');
  var btnQuality = vp.querySelector('.vp__btn--quality');
  var qualityMenu= vp.querySelector('.vp__menu--quality');
  var btnFs      = vp.querySelector('.vp__btn--fs');
  var hideTimer;

  var SVG_PLAY  = '<svg viewBox="0 0 24 24"><polygon points="6,3 20,12 6,21" fill="#fff"/></svg>';
  var SVG_PAUSE = '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18" fill="#fff"/><rect x="15" y="3" width="4" height="18" fill="#fff"/></svg>';
  var SVG_FS    = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
  var SVG_FS_EXIT = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polyline points="21,9 21,3 15,3"/><polyline points="3,15 3,21 9,21"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="10" y1="14" x2="3" y2="21"/></svg>';

  function fmt(s) {
    s = Math.floor(s || 0);
    var m = Math.floor(s / 60), sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }
  function setProgress(pct) {
    fill.style.width  = pct + '%';
    thumb.style.left  = pct + '%';
  }
  function play() {
    video.play();
    vp.classList.add('vp--playing');
    vp.classList.remove('vp--paused');
    btnPlay.innerHTML = SVG_PAUSE;
  }
  function pause() {
    video.pause();
    vp.classList.remove('vp--playing');
    vp.classList.add('vp--paused');
    btnPlay.innerHTML = SVG_PLAY;
  }
  function togglePlay() { video.paused ? play() : pause(); }

  function showControls() {
    vp.classList.add('vp--show-controls');
    clearTimeout(hideTimer);
    if (!video.paused) {
      hideTimer = setTimeout(function() {
        vp.classList.remove('vp--show-controls');
      }, 2500);
    }
  }

  vp.addEventListener('mousemove', showControls);
  video.addEventListener('click', togglePlay);
  playBig.addEventListener('click', togglePlay);
  btnPlay.addEventListener('click', function(e) { e.stopPropagation(); togglePlay(); });

  video.addEventListener('timeupdate', function() {
    if (!video.duration) return;
    var pct = (video.currentTime / video.duration) * 100;
    setProgress(pct);
    timeDisp.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
  });
  video.addEventListener('progress', function() {
    if (!video.duration) return;
    try {
      var b = video.buffered;
      if (b.length) bufferedEl.style.width = (b.end(b.length - 1) / video.duration * 100) + '%';
    } catch(e) {}
  });
  video.addEventListener('ended', function() {
    vp.classList.remove('vp--playing');
    vp.classList.add('vp--paused');
    btnPlay.innerHTML = SVG_PLAY;
    setProgress(0);
    timeDisp.textContent = '0:00 / ' + fmt(video.duration);
  });

  // Seek
  var seeking = false;
  function seekTo(e) {
    var rect = timeline.getBoundingClientRect();
    var x    = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    var pct  = Math.max(0, Math.min(1, x / rect.width));
    if (video.duration) { video.currentTime = pct * video.duration; setProgress(pct * 100); }
  }
  tlWrap.addEventListener('mousedown', function(e) { seeking = true; seekTo(e); });
  document.addEventListener('mousemove', function(e) { if (seeking) seekTo(e); });
  document.addEventListener('mouseup',   function()  { seeking = false; });
  tlWrap.addEventListener('touchstart', function(e) { seeking = true; seekTo(e); }, { passive: true });
  tlWrap.addEventListener('touchmove',  function(e) { if (seeking) seekTo(e); }, { passive: true });
  tlWrap.addEventListener('touchend',   function()  { seeking = false; });

  // Speed menu
  btnSpeed.addEventListener('click', function(e) {
    e.stopPropagation();
    speedMenu.classList.toggle('vp__menu--open');
    qualityMenu.classList.remove('vp__menu--open');
  });
  speedMenu.querySelectorAll('button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var spd = parseFloat(this.dataset.speed);
      video.playbackRate = spd;
      btnSpeed.textContent = spd === 1 ? '1x' : spd + 'x';
      speedMenu.querySelectorAll('button').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      speedMenu.classList.remove('vp__menu--open');
    });
  });

  // Quality menu
  btnQuality.addEventListener('click', function(e) {
    e.stopPropagation();
    qualityMenu.classList.toggle('vp__menu--open');
    speedMenu.classList.remove('vp__menu--open');
  });
  qualityMenu.querySelectorAll('button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      qualityMenu.querySelectorAll('button').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      var q = this.dataset.quality;
      btnQuality.textContent = q === '720' ? 'HD' : q;
      qualityMenu.classList.remove('vp__menu--open');
    });
  });

  // Close menus on outside click
  document.addEventListener('click', function() {
    speedMenu.classList.remove('vp__menu--open');
    qualityMenu.classList.remove('vp__menu--open');
  });

  // Fullscreen
  btnFs.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      (vp.requestFullscreen || vp.webkitRequestFullscreen).call(vp);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  });
  document.addEventListener('fullscreenchange', function() {
    btnFs.innerHTML = document.fullscreenElement ? SVG_FS_EXIT : SVG_FS;
  });

  // Keyboard
  vp.addEventListener('keydown', function(e) {
    switch(e.key) {
      case ' ': case 'k': e.preventDefault(); togglePlay(); break;
      case 'f': case 'F': btnFs.click(); break;
      case 'ArrowRight': video.currentTime = Math.min(video.duration||0, (video.currentTime||0) + 5); break;
      case 'ArrowLeft':  video.currentTime = Math.max(0, (video.currentTime||0) - 5); break;
      case 'ArrowUp':    video.volume = Math.min(1, video.volume + 0.1); break;
      case 'ArrowDown':  video.volume = Math.max(0, video.volume - 0.1); break;
    }
  });
})();

// Count-up animation for stat numbers (Unified)
(function () {
  var DURATION = 1500;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function parseNum(text) {
    var match = text.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!match) return null;
    return { prefix: match[1], target: parseInt(match[2], 10), suffix: match[3] };
  }

  function animateNum(el, parsed) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / DURATION, 1);
      el.textContent = parsed.prefix + Math.round(easeOut(progress) * parsed.target) + parsed.suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var els = document.querySelectorAll(
    '.pf-stat__num, .stat-item__num, .studio-stats__num, .studio-highlight__num, .cs-stat__num, .svc-stat__num'
  );
  if (!els.length || !('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      var parsed = parseNum(entry.target.textContent.trim());
      if (parsed) animateNum(entry.target, parsed);
    });
  }, { threshold: 0.4 });

  els.forEach(function (el) { io.observe(el); });
})();

// Scroll-reveal — fade sections in as they enter the viewport (Unified)
(function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.clients, .works, .process, .expertise, .testimonial, .preview, .about, .brands, .cta, .faq, ' +
    '.studio-stats, .studio-story, .studio-highlight, .studio-values, .studio-philosophy, .studio-team, .studio-industry, .studio-cta, ' +
    '.cs-hero, .cs-intro, .cs-challenge, .cs-solution, .cs-features, .cs-outcomes-cards, .cs-stats, .cs-process, .cs-final-thoughts, .cs-testimonial, .cs-next, .cs-cta, .reveal'
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

// Testimonial slider — infinite loop
(function () {
  var track   = document.querySelector('.testimonial__track');
  var dots    = document.querySelectorAll('.testimonial__dot');
  var prevBtn = document.querySelector('.testimonial__arrow--prev');
  var nextBtn = document.querySelector('.testimonial__arrow--next');
  if (!track || !dots.length) return;

  var origCards = Array.prototype.slice.call(track.querySelectorAll('.testimonial__card'));
  var origCount = origCards.length;
  if (!origCount) return;

  // Prepend + append full sets of clones so wrap is seamless in both directions
  var prepFrag = document.createDocumentFragment();
  origCards.forEach(function (c) { prepFrag.appendChild(c.cloneNode(true)); });
  track.insertBefore(prepFrag, track.firstChild);
  origCards.forEach(function (c) { track.appendChild(c.cloneNode(true)); });

  // Layout: [origCount prepend-clones][origCount originals][origCount append-clones]
  var cards   = Array.prototype.slice.call(track.querySelectorAll('.testimonial__card'));
  var current = origCount; // start at first real card

  function updateDots(idx) {
    var realIdx = ((idx - origCount) % origCount + origCount) % origCount;
    dots.forEach(function (d, i) {
      d.hidden = false;
      d.classList.toggle('testimonial__dot--active', i === realIdx);
    });
  }

  var isAnimating = false;

  function jumpTo(idx) {
    track.style.transition = 'none';
    track.getBoundingClientRect();
    track.style.transform = 'translateX(-' + cards[idx].offsetLeft + 'px)';
    track.getBoundingClientRect();
    track.style.transition = '';
    current = idx;
    updateDots(current);
  }

  function goTo(idx) {
    if (isAnimating) return;
    isAnimating = true;
    current = idx;
    updateDots(current);
    track.style.transform = 'translateX(-' + cards[current].offsetLeft + 'px)';
  }

  // After each animated transition, silently reset if we landed on a clone
  track.addEventListener('transitionend', function (e) {
    if (e.propertyName !== 'transform') return;
    isAnimating = false;
    if (current < origCount) {
      jumpTo(current + origCount);
    } else if (current >= 2 * origCount) {
      jumpTo(current - origCount);
    }
  });

  jumpTo(origCount);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goTo(origCount + i); });
  });
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
  window.addEventListener('resize', function () { jumpTo(current); }, { passive: true });

  // Auto-advance every 5s
  var timer = setInterval(function () { goTo(current + 1); }, 5000);
  var section = track.closest('.testimonial');
  if (section) {
    section.addEventListener('mouseenter', function () { clearInterval(timer); });
    section.addEventListener('mouseleave', function () {
      timer = setInterval(function () { goTo(current + 1); }, 5000);
    });
  }
})();

// Expertise list — hover swaps active state + shows project count
(function () {
  var list = document.querySelector('.expertise__list');
  if (!list) return;

  var items = list.querySelectorAll('.expertise__item');
  var firstItem = items[0];

  items.forEach(function (item) {
    var metaEl = item.querySelector('.expertise__meta');
    var originalText = metaEl.innerHTML;
    var projectsText = item.dataset.projects || originalText;

    item.addEventListener('mouseenter', function () {
      firstItem.classList.remove('expertise__item--active');
      metaEl.textContent = projectsText;
    });

    item.addEventListener('mouseleave', function () {
      metaEl.innerHTML = originalText;
    });
  });

  list.addEventListener('mouseleave', function () {
    firstItem.classList.add('expertise__item--active');
  });
})();

// FAQ accordion
document.querySelectorAll('.faq-item__header').forEach(function(header) {
  header.addEventListener('click', function() {
    var item = this.closest('.faq-item');
    var isOpen = item.classList.contains('faq-item--open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(function(el) {
      el.classList.remove('faq-item--open');
      el.querySelector('.faq-item__header').setAttribute('aria-expanded', 'false');
    });
    // Toggle clicked
    if (!isOpen) {
      item.classList.add('faq-item--open');
      this.setAttribute('aria-expanded', 'true');
    }
  });
  header.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});

// Hero Section Carousel
(function() {
  var container = document.querySelector('.hero-carousel');
  if (!container) return;

  var slides = container.querySelectorAll('.hero-carousel__slide');
  var dots = container.querySelectorAll('.hero-carousel__dot');
  var prevBtn = container.querySelector('.hero-carousel__nav--left');
  var nextBtn = container.querySelector('.hero-carousel__nav--right');
  var progressBar = container.querySelector('.hero-carousel__progress-bar');
  
  var currentIdx = 0;
  var slideDuration = 6000; // 6 seconds per slide
  var animationFrameId = null;
  var startTime = null;
  var elapsedBeforePause = 0;
  var isPaused = false;

  function showSlide(idx) {
    slides.forEach(function(slide, i) {
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === idx);
    });
    currentIdx = idx;
    resetProgressBar();
  }

  function nextSlide() {
    var nextIdx = (currentIdx + 1) % slides.length;
    showSlide(nextIdx);
  }

  function prevSlide() {
    var prevIdx = (currentIdx - 1 + slides.length) % slides.length;
    showSlide(prevIdx);
  }

  function animateProgressBar(timestamp) {
    if (!startTime) startTime = timestamp;
    
    var elapsed = timestamp - startTime + elapsedBeforePause;
    
    if (elapsed >= slideDuration) {
      nextSlide();
      return;
    }

    var progressPct = (elapsed / slideDuration) * 100;
    progressBar.style.width = progressPct + '%';

    if (!isPaused) {
      animationFrameId = requestAnimationFrame(animateProgressBar);
    }
  }

  function startAutoplay() {
    isPaused = false;
    startTime = null;
    animationFrameId = requestAnimationFrame(animateProgressBar);
  }

  function pauseAutoplay() {
    isPaused = true;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (startTime) {
      elapsedBeforePause += performance.now() - startTime;
    }
  }

  function resetProgressBar() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    progressBar.style.width = '0%';
    elapsedBeforePause = 0;
    startTime = null;
    if (!isPaused) {
      startAutoplay();
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
    });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      showSlide(i);
    });
  });

  container.addEventListener('mouseenter', function() {
    pauseAutoplay();
  });

  container.addEventListener('mouseleave', function() {
    isPaused = false;
    startTime = performance.now();
    animationFrameId = requestAnimationFrame(animateProgressBar);
  });

  // Init
  showSlide(0);
})();

// Global AI Summary Toast and Redirect
window.askForSummary = function(service) {
  var promptText = "As a product owner, analyze Orangy Design’s website and brand. Tell me what it's like to work with them, how they establish trust, and the business impact and real outcomes they create for their clients.";
  
  // Copy to clipboard with success feedback
  navigator.clipboard.writeText(promptText).then(function() {
    var toast = document.getElementById('summary-toast');
    if (toast) {
      toast.textContent = 'Prompt copied! Opening ' + service + '...';
      toast.classList.add('summary-toast--visible');
      setTimeout(function() {
        toast.classList.remove('summary-toast--visible');
      }, 3500);
    }
  }).catch(function(err) {
    console.error('Failed to copy text: ', err);
  });

  // Target URLs
  var targetUrl = '';
  var encodedPrompt = encodeURIComponent(promptText);
  
  if (service === 'ChatGPT') {
    targetUrl = 'https://chatgpt.com/?q=' + encodedPrompt;
  } else if (service === 'Claude') {
    targetUrl = 'https://claude.ai/new?q=' + encodedPrompt;
  } else if (service === 'Perplexity') {
    targetUrl = 'https://www.perplexity.ai/search?q=' + encodedPrompt;
  } else if (service === 'Google AI') {
    targetUrl = 'https://gemini.google.com/app';
  }

  if (targetUrl) {
    setTimeout(function() {
      window.open(targetUrl, '_blank');
    }, 1200); // Elegant timing to allow reading the toast first
  }
};

// Case study placeholder images & dynamic styles
(function () {
  'use strict';
  
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

  function injectRevealCSS() {
    if (document.getElementById('reveal-css-style')) return;
    var style = document.createElement('style');
    style.id = 'reveal-css-style';
    style.textContent =
      '.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }' +
      '.reveal.is-visible { opacity: 1; transform: none; }';
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initPlaceholders();
      injectRevealCSS();
    });
  } else {
    initPlaceholders();
    injectRevealCSS();
  }
})();

// Contact page: form submission (mailto fallback)
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
    if (notice) notice.textContent = 'Thanks! We\'ll be in touch within 4–8 hours.';
    if (submit) { submit.textContent = 'Sent!'; submit.disabled = true; }
  });
})();

// Portfolio Page filter tabs & url filters
(function () {
  'use strict';

  var filters = document.querySelectorAll('.pf-filter');
  var cards   = document.querySelectorAll('.pf-card');
  if (!filters.length || !cards.length) return;

  function applyFilter(category) {
    /* Update button states */
    filters.forEach(function (btn) {
      var active = btn.dataset.filter === category;
      btn.classList.toggle('pf-filter--active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    /* Show / hide cards */
    cards.forEach(function (card) {
      if (category === 'all') {
        card.classList.remove('pf-card--hidden');
      } else {
        var match = card.dataset.category === category;
        card.classList.toggle('pf-card--hidden', !match);
      }
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.dataset.filter);
    });
  });

  /* Inject project counts into filter labels */
  filters.forEach(function (btn) {
    var f = btn.dataset.filter;
    if (f === 'all') {
      btn.textContent = 'All Projects (' + cards.length + ')';
    } else {
      var count = document.querySelectorAll('.pf-card[data-category="' + f + '"]').length;
      btn.textContent = btn.textContent.split(' (')[0] + ' (' + count + ')';
    }
  });

  /* Apply filter from URL param e.g. ?filter=healthcare */
  var urlFilter = new URLSearchParams(window.location.search).get('filter');
  if (urlFilter) applyFilter(urlFilter);
})();

// Scroll spy for Table of Contents (Privacy & Terms)
(function () {
  var tocLinks = document.querySelectorAll('.toc-link');
  var sections = document.querySelectorAll('.privacy-section, .terms-section');
  if (!tocLinks.length || !sections.length) return;

  function getActiveSection() {
    var scrollPos = window.scrollY + 150; // offset for nav height
    
    // Find the section that is currently in view
    for (var i = sections.length - 1; i >= 0; i--) {
      var section = sections[i];
      if (scrollPos >= section.offsetTop) {
        return section.id;
      }
    }
    return sections[0].id;
  }

  function updateTOC() {
    var activeId = getActiveSection();
    tocLinks.forEach(function (link) {
      var href = link.getAttribute('href').substring(1);
      if (href === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateTOC();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateTOC();
})();

// Studio philosophy pills — click to highlight
(function () {
  var pills = document.querySelectorAll('.philo-pill');
  if (!pills.length) return;
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('philo-pill--active'); });
      this.classList.add('philo-pill--active');
    });
  });
})();

// Process Cards: Card 3 Aurora Canvas (hills-script)
(function () {
  var canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var card = canvas.parentElement;
  var W, H, hovered = false;
  var ORBS = [
    { nx:.30, ny:.60, nx2:.70, ny2:.85, sp:.11, ph:0.0,  r:.52, h:145, s:55, l:58 },
    { nx:.65, ny:.75, nx2:.25, ny2:.65, sp:.08, ph:2.3,  r:.42, h:160, s:50, l:62 },
    { nx:.50, ny:.90, nx2:.50, ny2:.98, sp:.15, ph:4.1,  r:.35, h:130, s:60, l:55 },
    { nx:.20, ny:.80, nx2:.80, ny2:.70, sp:.10, ph:1.5,  r:.38, h:170, s:45, l:65 },
  ];
  function resize() {
    var r = card.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width  = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  card.addEventListener('mouseenter', function() { hovered = true; });
  card.addEventListener('mouseleave', function() { hovered = false; });
  var t = 0;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    t += hovered ? 0.018 : 0.005;
    var alpha0 = hovered ? 0.55 : 0.38;
    var alpha1 = hovered ? 0.25 : 0.16;
    for (var i = 0; i < ORBS.length; i++) {
      var o = ORBS[i];
      var cx = W * (o.nx  + Math.sin(t * o.sp + o.ph)           * (o.nx2 - o.nx) * 0.9);
      var cy = H * (o.ny  + Math.cos(t * o.sp * 0.7 + o.ph + 1) * (o.ny2 - o.ny) * 0.9);
      var r  = o.r * Math.min(W, H) * 0.9;
      var gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gr.addColorStop(0,   'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + alpha0 + ')');
      gr.addColorStop(0.4, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + alpha1 + ')');
      gr.addColorStop(1,   'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  resize(); tick();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resize).observe(card);
  }
})();

// Process Cards: Card 2 Fluid Canvas (shader-bg-script)
(function () {
  var canvas = document.getElementById('fluid-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var card = canvas.parentElement;
  var W, H, hovered = false;
  var ORBS = [
    { nx: 0.22, ny: 0.55, nx2: 0.75, ny2: 0.80, sp: 0.14, ph: 0.0,  r: 0.68, h: 238, s: 60, l: 62 },
    { nx: 0.68, ny: 0.72, nx2: 0.30, ny2: 0.60, sp: 0.10, ph: 2.1,  r: 0.58, h: 255, s: 55, l: 66 },
    { nx: 0.50, ny: 0.85, nx2: 0.55, ny2: 0.95, sp: 0.18, ph: 4.2,  r: 0.50, h: 222, s: 65, l: 58 },
    { nx: 0.15, ny: 0.78, nx2: 0.82, ny2: 0.68, sp: 0.12, ph: 1.3,  r: 0.54, h: 270, s: 50, l: 70 },
    { nx: 0.80, ny: 0.60, nx2: 0.20, ny2: 0.90, sp: 0.16, ph: 3.5,  r: 0.44, h: 210, s: 70, l: 65 },
  ];
  function resize() {
    var rect = card.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  card.addEventListener('mouseenter', function() { hovered = true; });
  card.addEventListener('mouseleave', function() { hovered = false; });
  var t = 0;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    t += hovered ? 0.020 : 0.006;
    var a0 = hovered ? 0.75 : 0.55;
    for (var i = 0; i < ORBS.length; i++) {
      var o = ORBS[i];
      var cx = W * (o.nx  + Math.sin(t * o.sp + o.ph)           * (o.nx2 - o.nx) * 0.9);
      var cy = H * (o.ny  + Math.cos(t * o.sp * 0.7 + o.ph + 1) * (o.ny2 - o.ny) * 0.9);
      var r  = o.r * Math.min(W, H);
      var gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gr.addColorStop(0,    'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + a0 + ')');
      gr.addColorStop(0.25, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + (a0 * 0.65) + ')');
      gr.addColorStop(0.55, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + (a0 * 0.28) + ')');
      gr.addColorStop(0.80, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + (a0 * 0.08) + ')');
      gr.addColorStop(1,    'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  resize(); tick();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resize).observe(card);
  }
})();

// Process Cards: Card 1 Dotted Surface Canvas
(function () {
  var canvas = document.getElementById('dotted-surface-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var card = canvas.parentElement;
  var W, H, hovered = false;
  var ORBS = [
    { nx:.25, ny:.55, nx2:.72, ny2:.80, sp:.12, ph:0.0,  r:.65, h: 20, s:80, l:65 },
    { nx:.70, ny:.68, nx2:.28, ny2:.58, sp:.09, ph:2.0,  r:.55, h: 10, s:75, l:68 },
    { nx:.48, ny:.85, nx2:.52, ny2:.95, sp:.16, ph:3.9,  r:.48, h: 30, s:70, l:62 },
    { nx:.18, ny:.75, nx2:.78, ny2:.72, sp:.11, ph:1.2,  r:.52, h:  5, s:85, l:70 },
  ];
  function resize() {
    var r = card.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width  = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  card.addEventListener('mouseenter', function() { hovered = true; });
  card.addEventListener('mouseleave', function() { hovered = false; });
  var t = 0;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    t += hovered ? 0.018 : 0.005;
    var a0 = hovered ? 0.72 : 0.52;
    for (var i = 0; i < ORBS.length; i++) {
      var o = ORBS[i];
      var cx = W * (o.nx  + Math.sin(t * o.sp + o.ph)           * (o.nx2 - o.nx) * 0.9);
      var cy = H * (o.ny  + Math.cos(t * o.sp * 0.7 + o.ph + 1) * (o.ny2 - o.ny) * 0.9);
      var r  = o.r * Math.min(W, H);
      var gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gr.addColorStop(0,    'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + a0 + ')');
      gr.addColorStop(0.25, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + (a0 * 0.65) + ')');
      gr.addColorStop(0.55, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + (a0 * 0.28) + ')');
      gr.addColorStop(0.80, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + (a0 * 0.08) + ')');
      gr.addColorStop(1,    'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  resize(); tick();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resize).observe(card);
  }
})();

// CTA Dome Canvas Animation (cta-dome-script)
(function () {
  var canvas = document.getElementById('cta-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, rot = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resize).observe(canvas.parentElement);
  }
  resize();

  var MERIDIANS = 30;
  var RINGS = 14;

  function frame() {
    requestAnimationFrame(frame);
    if (!W || !H) return;
    ctx.clearRect(0, 0, W, H);

    var cx  = W / 2;
    var vy  = H * -0.6;   // vanishing point above canvas
    var byC = H * 1.08;   // dome base below canvas
    var bR  = W * 0.92;   // base radius

    // Meridians
    for (var i = 0; i < MERIDIANS; i++) {
      var a  = (i / MERIDIANS) * Math.PI * 2 + rot;
      var bx = cx + Math.cos(a) * bR;
      var by = byC - Math.sin(a) * H * 0.06;
      var t  = (Math.cos(a) + 1) * 0.5;          // 0 back → 1 front
      var al = 0.12 + 0.55 * t;
      ctx.strokeStyle = 'rgba(210,45,25,' + al + ')';
      ctx.lineWidth   = 0.6 + t * 0.9;
      ctx.shadowBlur  = t > 0.5 ? 7 : 2;
      ctx.shadowColor = 'rgba(255,55,20,0.45)';
      ctx.beginPath();
      ctx.moveTo(cx, vy);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }

    // Latitude rings
    ctx.shadowBlur = 2;
    ctx.lineWidth  = 0.7;
    for (var j = 1; j <= RINGS; j++) {
      var lt  = j / RINGS;
      var y  = vy + (byC - vy) * lt;
      var rx = bR * lt;
      var ry = rx * 0.13;
      if (y < -ry - 4 || y > H + ry + 4) continue;
      var ringAl = 0.08 + 0.22 * lt;
      ctx.strokeStyle = 'rgba(210,45,25,' + ringAl + ')';
      ctx.shadowColor = 'rgba(255,55,20,' + (ringAl * 0.6) + ')';
      ctx.beginPath();
      ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    rot += 0.0004;
  }

  requestAnimationFrame(frame);
})();

// GSAP Interactive columns for Scaling card on hover
(function() {
  if (typeof gsap === 'undefined') return;

  var validateCard = document.querySelector('.process-card--validate');
  if (validateCard) {
    var columns = validateCard.querySelectorAll('.chart-column');
    validateCard.addEventListener('mouseenter', function() {
      gsap.fromTo(columns, 
        { scaleY: 0.15 },
        { scaleY: 1, duration: 1.3, stagger: 0.12, ease: "elastic.out(1.1, 0.6)" }
      );
    });
    validateCard.addEventListener('mouseleave', function() {
      gsap.to(columns, { scaleY: 1, duration: 0.6, ease: "power2.out" });
    });
  }
})();
