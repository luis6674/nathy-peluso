/* ============================================================
   VIDEO DATA
   NOTE: watchUrl is a placeholder ('#') until real video links
   are supplied.
   ============================================================ */
const videos = [
  {
    year: '2025', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'QUE LLUEVAN FLORES',
    image: 'assets/images/videos/que-lluevan-flores.jpg', watchUrl: '#', default: true,
  },
  {
    year: '2025', type: { en: 'SESSION', es: 'SESIÓN' }, name: 'COMO EN EL IDILIO',
    image: 'assets/images/videos/como-en-el-idilio.jpg', watchUrl: '#',
  },
  {
    year: '2024', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'INSENSATA',
    image: 'assets/images/videos/insensata.jpg', watchUrl: '#',
  },
  {
    year: '2024', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'NO ES OTRA CANCIÓN',
    image: 'assets/images/videos/no-es-otra-cancion.jpg', watchUrl: '#',
  },
  {
    year: '2023', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'A CABALLO',
    image: 'assets/images/videos/a-caballo.jpg', watchUrl: '#',
  },
];

const videosSlider   = document.getElementById('videosSlider');
const videosBgImage  = document.getElementById('videosBgImage');
const videosInfoYear = document.getElementById('videosInfoYear');
const videosInfoType = document.getElementById('videosInfoType');
const videosInfoName = document.getElementById('videosInfoName');
const videosWatch    = document.getElementById('videosWatch');
const currentLang = () => document.documentElement.lang || 'en';

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
