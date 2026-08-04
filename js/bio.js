/* Bio page — lines (and paragraphs) type in left-to-right, one after
   another, once a paragraph crosses a trigger point near the bottom fade
   band. Timing is fixed (CSS transition), not tied to scroll speed/position. */
(function () {
  var FADE_BAND = 110; // matches --bio-fade height in css/style.css
  var LINE_STEP = 450; // ms per line's reveal (also the transition duration, back-to-back)
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paragraphs = Array.prototype.slice.call(document.querySelectorAll('.reveal-p'));

  if (!paragraphs.length) return;

  function clearMask(line) {
    line.style.maskImage = 'none';
    line.style.webkitMaskImage = 'none';
  }

  if (reduceMotion) {
    paragraphs.forEach(function (p) {
      p.querySelectorAll('.bio-line').forEach(function (l) { l.classList.add('is-revealed'); clearMask(l); });
    });
    return;
  }

  function splitIntoLines(p) {
    var text = p.textContent.trim().replace(/\s+/g, ' ');
    var words = text.split(' ');
    p.innerHTML = '';

    var entries = words.map(function (w, i) {
      var span = document.createElement('span');
      span.className = 'bio-word';
      span.textContent = w;
      var space = i < words.length - 1 ? document.createTextNode(' ') : null;
      p.appendChild(span);
      if (space) p.appendChild(space);
      return { span: span, space: space };
    });

    var groups = [];
    var currentTop = null;
    entries.forEach(function (entry) {
      var top = entry.span.offsetTop;
      if (top !== currentTop) {
        groups.push([]);
        currentTop = top;
      }
      groups[groups.length - 1].push(entry);
    });

    p.innerHTML = '';
    return groups.map(function (group, i) {
      var line = document.createElement('span');
      line.className = 'bio-line';
      line.style.transitionDelay = (i * LINE_STEP) + 'ms';
      line.addEventListener('transitionend', function (e) {
        if (e.propertyName === '--reveal') clearMask(line);
      });
      group.forEach(function (entry) {
        line.appendChild(entry.span);
        if (entry.space) line.appendChild(entry.space);
      });
      p.appendChild(line);
      return line;
    });
  }

  function rebuild(p) {
    var lines = splitIntoLines(p);
    if (p.dataset.revealed === 'true') {
      lines.forEach(function (l) { l.style.transitionDelay = '0ms'; l.classList.add('is-revealed'); clearMask(l); });
    }
    return lines;
  }

  paragraphs.forEach(function (p) { rebuild(p); });

  // Sequential gate: a paragraph may not start revealing until the
  // previous paragraph's reveal (all of its lines) has fully finished.
  var nextStart = 0;

  function scheduleParagraph(p) {
    var lines = p.querySelectorAll('.bio-line');
    var now = performance.now();
    var start = Math.max(now, nextStart);
    var duration = lines.length * LINE_STEP;
    nextStart = start + duration;
    setTimeout(function () {
      p.dataset.revealed = 'true';
      lines.forEach(function (line) { line.classList.add('is-revealed'); });
    }, start - now);
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return paragraphs.indexOf(a.target) - paragraphs.indexOf(b.target); })
      .forEach(function (entry) {
        scheduleParagraph(entry.target);
        obs.unobserve(entry.target);
      });
  }, { threshold: 0, rootMargin: '0px 0px -' + FADE_BAND + 'px 0px' });

  paragraphs.forEach(function (p) { observer.observe(p); });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { paragraphs.forEach(rebuild); }, 200);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { paragraphs.forEach(rebuild); });
  }

  document.querySelectorAll('input[name="lang"]').forEach(function (input) {
    input.addEventListener('change', function () {
      setTimeout(function () { paragraphs.forEach(rebuild); }, 0);
    });
  });
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
