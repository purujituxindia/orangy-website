// Scroll spy for Table of Contents
(function () {
  var tocLinks = document.querySelectorAll('.toc-link');
  var sections = document.querySelectorAll('.privacy-section');
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

  // Optimize scroll handler with requestAnimationFrame
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

  // Run on load
  updateTOC();
})();
