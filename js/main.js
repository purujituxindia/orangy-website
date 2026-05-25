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

// Count-up animation for stat numbers
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
    '.pf-stat__num, .stat-item__num, .studio-stats__num, .studio-highlight__num, .cs-stat__num'
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

// Scroll-reveal — fade sections in as they enter the viewport
(function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.clients, .works, .process, .expertise, ' +
    '.testimonial, .preview, .about, .brands, .cta, .faq'
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
    current = idx;
    updateDots(current);
    track.style.transform = 'translateX(-' + cards[current].offsetLeft + 'px)';
  }

  // After each animated transition, silently reset if we landed on a clone
  track.addEventListener('transitionend', function (e) {
    if (e.propertyName !== 'transform') return;
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
