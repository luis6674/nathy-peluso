/* ============================================================
   ALBUM / SINGLE DATA
   NOTE: covers marked `placeholder: true` have no real artwork
   yet — swap in assets/images/music/ once supplied.
   ============================================================ */
const releases = [
  {
    year: '2020', type: { en: 'ALBUM', es: 'ÁLBUM' }, name: 'CALAMBRE',
    image: null, placeholder: true, listenUrl: '#',
  },
  {
    year: '2023', type: { en: 'ALBUM', es: 'ÁLBUM' }, name: 'GRASA',
    image: 'assets/images/music/grasa-album.jpg', listenUrl: '#',
  },
  {
    year: '2024', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'EROTIKA',
    image: 'assets/images/music/erotika.png', listenUrl: '#',
  },
  {
    year: '2025', type: { en: 'EP', es: 'EP' }, name: 'MALPORTADA',
    image: 'assets/images/music/malportada.png', listenUrl: '#', default: true,
  },
  {
    year: '2025', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'COMO EN EL IDILIO',
    image: 'assets/images/music/como-en-el-idilio.png', listenUrl: '#',
  },
  {
    year: '2026', type: { en: 'SINGLE', es: 'SINGLE' }, name: 'CLUB GRASA',
    image: 'assets/images/music/club-grasa.png', listenUrl: '#',
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

function setActive(index, scroll) {
  const items = slider.querySelectorAll('.slider__item');
  items.forEach(el => el.classList.remove('is-active'));
  const activeEl = items[index];
  activeEl.classList.add('is-active');
  updateInfoPanel(releases[index]);
  if (scroll) {
    activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

const initialIndex = Math.max(releases.findIndex(r => r.default), 0);
setActive(initialIndex, false);
window.addEventListener('load', () => setActive(initialIndex, true));
