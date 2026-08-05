/* Bio page — paragraphs and photos fade + rise into place once, on scroll */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paragraphs = Array.prototype.slice.call(document.querySelectorAll('.reveal-p'));
  if (!paragraphs.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
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

/* Remaining Bio photos (past the first two) — fade + rise into place once, on scroll */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var images = Array.prototype.slice.call(document.querySelectorAll('.reveal-img'));
  if (!images.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    images.forEach(function (img) { img.classList.add('is-in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  images.forEach(function (img) { observer.observe(img); });
})();
