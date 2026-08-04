/* Bio page — lines type in left-to-right, one after another, once a
   paragraph crosses a trigger point near the bottom fade band. Timing is
   fixed (CSS transition), not tied to scroll speed/position. */
(function () {
  var FADE_BAND = 110; // matches --bio-fade height in css/style.css
  var LINE_STEP = 450; // ms between each line's reveal start (matches transition duration, back-to-back)
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paragraphs = Array.prototype.slice.call(document.querySelectorAll('.reveal-p'));

  if (!paragraphs.length) return;

  if (reduceMotion) {
    paragraphs.forEach(function (p) { p.querySelectorAll('.bio-line').forEach(function (l) { l.classList.add('is-revealed'); }); });
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
      lines.forEach(function (l) { l.style.transitionDelay = '0ms'; l.classList.add('is-revealed'); });
    }
    return lines;
  }

  paragraphs.forEach(function (p) { rebuild(p); });

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var p = entry.target;
        p.dataset.revealed = 'true';
        p.querySelectorAll('.bio-line').forEach(function (line) { line.classList.add('is-revealed'); });
        obs.unobserve(p);
      }
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
