/* ============================================================
   ALBUM / SINGLE DATA — full discography, chronological order
   NOTE: "Como en el Idilio" is dated 2026 per the Bio page copy
   ("En febrero de 2026, Nathy Peluso..."), even though the source
   file was named as if from Nov 2025 — flagging in case that's wrong.
   ============================================================ */
const releases = [
  {
    year: '2017', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'ESMERALDA',
    image: 'assets/images/music/esmeralda.jpg', listenUrl: 'https://open.spotify.com/track/505pS73CWBrQPE811qppNw',
  },
  {
    year: '2018', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'LA SANDUNGUERA',
    image: 'assets/images/music/la-sandunguera.jpg', listenUrl: 'https://open.spotify.com/track/3xQ254OSkFQBk1F69d3Gwc',
  },
  {
    year: '2020', type: { en: 'ALBUM', es: 'ÁLBUM' }, name: 'CALAMBRE',
    image: 'assets/images/music/calambre.jpg', listenUrl: 'https://open.spotify.com/album/0HvKhpJzjmC5wloza8MjXF',
  },
  {
    year: '2021', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'MAFIOSA',
    image: 'assets/images/music/mafiosa.jpg', listenUrl: 'https://open.spotify.com/track/1X1vW0xDpkOS35ZxcPqLv6',
  },
  {
    year: '2021', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'VIVIR ASÍ',
    image: 'assets/images/music/vivir-asi.jpg', listenUrl: 'https://open.spotify.com/album/3jHBdwS3nCuPC6lThrFJba',
  },
  {
    year: '2024', type: { en: 'ALBUM', es: 'ÁLBUM' }, name: 'GRASA',
    image: 'assets/images/music/grasa.jpg', listenUrl: 'https://open.spotify.com/album/2ab0PTJ5OG7I6YfSqpDFZv',
  },
  {
    year: '2024', type: { en: 'EP', es: 'EP' }, name: 'CLUB GRASA',
    image: 'assets/images/music/club-grasa.jpg', listenUrl: 'https://open.spotify.com/album/72bmHBiYWuPDOZ1GphH2IR',
  },
  {
    year: '2024', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'DE MARAVISHA',
    image: 'assets/images/music/de-maravisha.jpg', listenUrl: 'https://open.spotify.com/track/20Its0iJ6nvKoKw3cY4ydD',
  },
  {
    year: '2025', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'EROTIKA',
    image: 'assets/images/music/erotika.png', listenUrl: 'https://nathypelusoes.lnk.to/EROTIKA',
  },
  {
    year: '2025', type: { en: 'EP', es: 'EP' }, name: 'MALPORTADA',
    image: 'assets/images/music/malportada.jpg', listenUrl: 'https://nathypelusoes.lnk.to/MALPORTADA',
  },
  {
    year: '2026', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'COMO EN EL IDILIO',
    image: 'assets/images/music/como-en-el-idilio.jpg', listenUrl: 'https://sml.lnk.to/CEEI',
  },
  {
    year: '2026', type: { en: 'REMIX', es: 'REMIX' }, name: 'ANGEL (CLUB VERSION)',
    image: 'assets/images/music/angel-remix.jpg', listenUrl: 'https://open.spotify.com/album/6qXCeSE5mvQZ1bcFjQIsB1', default: true,
  },
];

const slider           = document.getElementById('slider');
const musicInfoYear     = document.getElementById('musicInfoYear');
const musicInfoType     = document.getElementById('musicInfoType');
const musicInfoName     = document.getElementById('musicInfoName');
const musicInfoListen   = document.getElementById('musicInfoListen');
const currentLang = () => document.documentElement.lang || 'en';

releases.forEach((release, i) => {
  const item = document.createElement('div');
  item.className = 'slider__item';
  item.dataset.index = i;

  if (release.placeholder) {
    item.style.background = '#222';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'center';
    item.style.color = '#fff';
    item.style.fontFamily = 'var(--font-mono)';
    item.style.fontSize = '11px';
    item.textContent = release.name;
  } else {
    const img = document.createElement('img');
    img.src = release.image;
    img.alt = release.name;
    item.appendChild(img);
  }

  item.addEventListener('click', () => setActive(i, true));
  slider.appendChild(item);
});

function updateInfoPanel(release) {
  musicInfoYear.textContent = release.year;
  musicInfoType.textContent = release.type[currentLang()];
  musicInfoType.dataset.en = release.type.en;
  musicInfoType.dataset.es = release.type.es;
  musicInfoName.textContent = release.name;
  musicInfoListen.href = release.listenUrl;
}

function setActive(index, scroll, behavior) {
  const items = slider.querySelectorAll('.slider__item');
  items.forEach(el => el.classList.remove('is-active'));
  const activeEl = items[index];
  activeEl.classList.add('is-active');
  updateInfoPanel(releases[index]);
  if (scroll) {
    // activeEl's width-grow is CSS-transitioned (see .slider__item.is-active),
    // so its final centered position isn't known until that transition
    // finishes — scrolling immediately would center the pre-grow size instead.
    window.setTimeout(() => {
      activeEl.scrollIntoView({ behavior: behavior || 'smooth', inline: 'center', block: 'nearest' });
    }, 360);
  }
}

const initialIndex = Math.max(releases.findIndex(r => r.default), 0);
setActive(initialIndex, false);
// Jump straight to the default item on load — no smooth glide across
// every item in between, which looked like an unwanted extra step.
// Scroll-driven selection is suppressed for a moment afterward so it
// doesn't react to the layout still settling (width-grow transition)
// and briefly flip to a neighboring item.
window.addEventListener('load', () => {
  suppressScrollSelect = true;
  setActive(initialIndex, true, 'auto');
  // setActive's own scroll happens after a 360ms delay (waiting for
  // the width-grow transition) — suppression must outlast that too.
  window.setTimeout(() => { suppressScrollSelect = false; }, 900);
});

/* ============================================================
   SCROLL-DRIVEN SELECTION
   While the user scrolls the slider by hand (touch/trackpad, not a
   click), continuously keep whichever item is nearest the
   container's center selected — so items grow and the info panel
   updates live as they pass through the center, not just once
   scrolling stops. Throttled to one check per animation frame
   (rather than a debounce) so it tracks in real time without
   fighting the user's scroll with our own scrollIntoView.
   ============================================================ */
let scrollSelectTicking = false;
let suppressScrollSelect = false;

function getCenteredIndex() {
  const items = slider.querySelectorAll('.slider__item');
  const containerCenter = slider.getBoundingClientRect().left + slider.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;
  items.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const distance = Math.abs(rect.left + rect.width / 2 - containerCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });
  return closestIndex;
}

slider.addEventListener('scroll', () => {
  if (suppressScrollSelect || scrollSelectTicking) return;
  scrollSelectTicking = true;
  requestAnimationFrame(() => {
    setActive(getCenteredIndex(), false);
    scrollSelectTicking = false;
  });
}, { passive: true });
