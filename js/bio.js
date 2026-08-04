/* Bio page — fade + slight rise for each paragraph as it scrolls into view, once */
(function () {
  var paragraphs = document.querySelectorAll('.reveal-p');
  if (!('IntersectionObserver' in window) || !paragraphs.length) {
    paragraphs.forEach(function (p) { p.classList.add('is-in'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

  paragraphs.forEach(function (p) { observer.observe(p); });
})();
