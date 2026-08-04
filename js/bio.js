/* ============================================================
   BIO PAGE — scroll reveal for text (letter-by-letter, random
   order, once only) and images (slide-up + parallax)
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function splitText(p) {
    const text = p.textContent.trim().replace(/\s+/g, ' ');
    p.innerHTML = '';
    text.split(' ').forEach((word, wi, words) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      Array.from(word).forEach(ch => {
        const charSpan = document.createElement('span');
        charSpan.className = 'reveal-char';
        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
      });
      p.appendChild(wordSpan);
      if (wi < words.length - 1) p.appendChild(document.createTextNode(' '));
    });
  }

  function revealChars(p, animate) {
    const chars = Array.from(p.querySelectorAll('.reveal-char'));
    if (!animate) {
      chars.forEach(c => { c.style.transitionDelay = ''; c.classList.add('is-revealed'); });
      return;
    }
    const order = shuffle(chars.map((_, i) => i));
    order.forEach((charIndex, i) => {
      chars[charIndex].style.transitionDelay = `${i * 8}ms`;
    });
    requestAnimationFrame(() => {
      chars.forEach(c => c.classList.add('is-revealed'));
    });
  }

  const textParagraphs = Array.from(document.querySelectorAll('.reveal-text'));

  function triggerParagraph(p, animate) {
    splitText(p);
    revealChars(p, animate);
    p.dataset.revealed = 'true';
  }

  if (reduceMotion) {
    textParagraphs.forEach(p => { p.dataset.revealed = 'true'; });
  } else if ('IntersectionObserver' in window) {
    const textObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerParagraph(entry.target, true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    textParagraphs.forEach(p => textObserver.observe(p));
  }

  // Re-split already-revealed paragraphs after a language switch, without
  // replaying the animation; untriggered paragraphs are left for the
  // IntersectionObserver to split once they scroll into view.
  document.querySelectorAll('input[name="lang"]').forEach(input => {
    input.addEventListener('change', () => {
      textParagraphs.forEach(p => {
        if (p.dataset.revealed === 'true') {
          triggerParagraph(p, false);
        }
      });
    });
  });

  /* -------------------- IMAGES: slide-up + parallax -------------------- */
  const photos = Array.from(document.querySelectorAll('.bio-photo'));

  if (reduceMotion) {
    photos.forEach(img => img.classList.add('is-revealed'));
    return;
  }

  const parallaxActive = new Set();

  function updateParallax() {
    const viewportH = window.innerHeight;
    parallaxActive.forEach(img => {
      const rect = img.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (viewportH / 2 - center) * 0.08;
      img.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if ('IntersectionObserver' in window) {
    const photoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const img = entry.target;
        if (entry.isIntersecting) {
          img.classList.add('is-revealed');
          window.setTimeout(() => parallaxActive.add(img), 900);
          observer.unobserve(img);
        }
      });
    }, { threshold: 0.15 });

    photos.forEach(img => photoObserver.observe(img));
  } else {
    photos.forEach(img => img.classList.add('is-revealed'));
  }
})();
