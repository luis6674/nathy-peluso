/* ============================================================
   VIDEO DATA
   ============================================================ */
const baseVideos = [
  {
    year: '2021', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'MAFIOSA',
    image: 'assets/images/videos/mafiosa.jpg', watchUrl: 'https://www.youtube.com/watch?v=VE241132KKU',
  },
  {
    year: '2021', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'VIVIR ASÍ ES MORIR DE AMOR',
    image: 'assets/images/videos/vivir-asi.jpg', watchUrl: 'https://www.youtube.com/watch?v=o3766wFOG_Q',
  },
  {
    year: '2023', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'SALVAJE',
    image: 'assets/images/videos/salvaje.jpg', watchUrl: 'https://www.youtube.com/watch?v=tPHpFWRGWO0',
  },
  {
    year: '2024', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'ENVIDIA',
    image: 'assets/images/videos/envidia.jpg', watchUrl: 'https://www.youtube.com/watch?v=27Ciie3mZj0',
  },
  {
    year: '2025', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'EROTIKA',
    image: 'assets/images/videos/erotika.jpg', watchUrl: 'https://www.youtube.com/watch?v=lPHdX2Kku0s',
  },
  {
    year: '2025', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'MALPORTADA',
    image: 'assets/images/videos/malportada.jpg', watchUrl: 'https://www.youtube.com/watch?v=LxzDkFpWTW4',
  },
  {
    year: '2025', type: { en: 'LYRIC VIDEO', es: 'LYRIC VIDEO' }, name: 'ANGEL',
    image: 'assets/images/videos/angel.jpg', watchUrl: 'https://www.youtube.com/watch?v=FRXaj-mqMg4',
  },
  {
    year: '2025', type: { en: 'LYRIC VIDEO', es: 'LYRIC VIDEO' }, name: 'NO ES OTRA CANCIÓN ROMÁNTICA',
    image: 'assets/images/videos/no-es-otra-cancion.jpg', watchUrl: 'https://www.youtube.com/watch?v=MN4BAlFQmJE',
  },
  {
    year: '2025', type: { en: 'LYRIC VIDEO', es: 'LYRIC VIDEO' }, name: 'A CABALLO',
    image: 'assets/images/videos/a-caballo.jpg', watchUrl: 'https://www.youtube.com/watch?v=U-mUgBxs4zg',
  },
  {
    year: '2025', type: { en: 'LYRIC VIDEO', es: 'LYRIC VIDEO' }, name: 'QUE LLUEVAN FLORES',
    image: 'assets/images/videos/que-lluevan-flores.jpg', watchUrl: 'https://www.youtube.com/watch?v=Te2-MPEJO-c',
  },
  {
    year: '2025', type: { en: 'LYRIC VIDEO', es: 'LYRIC VIDEO' }, name: 'INSENSATA',
    image: 'assets/images/videos/insensata.jpg', watchUrl: 'https://www.youtube.com/watch?v=YFWj_epMg1E',
  },
  {
    year: '2026', type: { en: 'SESSION', es: 'SESIÓN' }, name: 'COMO EN EL IDILIO',
    image: 'assets/images/videos/como-en-el-idilio.jpg', watchUrl: 'https://www.youtube.com/watch?v=OYtHvS7n7ic', default: true,
  },
];

const videos = baseVideos;

const videosSlider   = document.getElementById('videosSlider');
const videosBgImage  = document.getElementById('videosBgImage');
const videosInfoYear = document.getElementById('videosInfoYear');
const videosInfoType = document.getElementById('videosInfoType');
const videosInfoName = document.getElementById('videosInfoName');
const videosWatch    = document.getElementById('videosWatch');
const videoModal       = document.getElementById('videoModal');
const videoModalFrame  = document.getElementById('videoModalFrame');
const videoModalClose  = document.getElementById('videoModalClose');
const currentLang = () => document.documentElement.lang || 'en';
let currentVideoIndex = 0;

videos.forEach((video, i) => {
  const item = document.createElement('div');
  item.className = 'videos-slider__item';
  item.dataset.index = i;

  const img = document.createElement('img');
  img.src = video.image;
  img.alt = video.name;
  item.appendChild(img);

  item.addEventListener('click', () => setActiveVideo(i, true));
  videosSlider.appendChild(item);
});

function updateVideoInfo(video) {
  videosInfoYear.textContent = video.year;
  videosInfoType.textContent = video.type[currentLang()];
  videosInfoType.dataset.en = video.type.en;
  videosInfoType.dataset.es = video.type.es;
  videosInfoName.textContent = video.name;
  videosWatch.href = video.watchUrl;
}

function setActiveVideo(index, scroll) {
  currentVideoIndex = index;
  const items = videosSlider.querySelectorAll('.videos-slider__item');
  items.forEach(el => el.classList.remove('is-active'));
  const activeEl = items[index];
  activeEl.classList.add('is-active');
  videosBgImage.style.opacity = 0;
  window.setTimeout(() => {
    videosBgImage.src = videos[index].image;
    videosBgImage.style.opacity = 1;
  }, 150);
  updateVideoInfo(videos[index]);
  if (scroll) {
    activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

const initialVideoIndex = Math.max(videos.findIndex(v => v.default), 0);
setActiveVideo(initialVideoIndex, false);
window.addEventListener('load', () => setActiveVideo(initialVideoIndex, true));

/* ============================================================
   SCROLL-DRIVEN SELECTION
   While the user scrolls the slider by hand (touch/trackpad, not a
   click), continuously keep whichever item is nearest the
   container's center selected — so items grow, the background/info
   update, and "WATCH NOW" tracks live as they pass through the
   center, not just once scrolling stops. Throttled to one check per
   animation frame (rather than a debounce) so it tracks in real time
   without fighting the user's scroll with our own scrollIntoView.
   ============================================================ */
let videoScrollSelectTicking = false;

function getCenteredVideoIndex() {
  const items = videosSlider.querySelectorAll('.videos-slider__item');
  const containerCenter = videosSlider.getBoundingClientRect().left + videosSlider.clientWidth / 2;
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

videosSlider.addEventListener('scroll', () => {
  if (videoScrollSelectTicking) return;
  videoScrollSelectTicking = true;
  requestAnimationFrame(() => {
    setActiveVideo(getCenteredVideoIndex(), false);
    videoScrollSelectTicking = false;
  });
}, { passive: true });

/* ============================================================
   VIDEO PLAYER MODAL
   ============================================================ */
function youTubeIdFromUrl(url) {
  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1);
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

function openVideoModal(url) {
  const id = youTubeIdFromUrl(url);
  if (!id) return;
  videoModalFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  videoModal.classList.add('is-open');
}

function closeVideoModal() {
  videoModal.classList.remove('is-open');
  videoModalFrame.src = '';
}

videosWatch.addEventListener('click', e => {
  e.preventDefault();
  openVideoModal(videos[currentVideoIndex].watchUrl);
});
videoModalClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', e => {
  if (e.target === videoModal) closeVideoModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeVideoModal();
});
