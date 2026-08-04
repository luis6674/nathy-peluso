/* Bio page — lines reveal left-to-right as they clear the bottom fade band */
(function () {
  var FADE_BAND = 110; // matches --bio-fade height in css/style.css
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paragraphs = Array.prototype.slice.call(document.querySelectorAll('.reveal-p'));

  if (reduceMotion || !paragraphs.length) return;

  var allLines = [];

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
    return groups.map(function (group) {
      var line = document.createElement('span');
      line.className = 'bio-line';
      group.forEach(function (entry) {
        line.appendChild(entry.span);
        if (entry.space) line.appendChild(entry.space);
      });
      p.appendChild(line);
      return line;
    });
  }

  function rebuildLines() {
    allLines = [];
    paragraphs.forEach(function (p) {
      allLines = allLines.concat(splitIntoLines(p));
    });
  }

  function update() {
    var vh = window.innerHeight;
    allLines.forEach(function (line) {
      var rect = line.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      var progress = (vh - rect.top) / FADE_BAND;
      progress = Math.max(0, Math.min(1, progress));
      line.style.setProperty('--reveal', (progress * 100) + '%');
    });
    ticking = false;
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  rebuildLines();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      rebuildLines();
      update();
    });
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      rebuildLines();
      update();
    }, 200);
  });

  document.querySelectorAll('input[name="lang"]').forEach(function (input) {
    input.addEventListener('change', function () {
      setTimeout(function () {
        rebuildLines();
        update();
      }, 0);
    });
  });
})();
