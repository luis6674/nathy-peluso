/* ============================================================
   VIDEO DATA
   ============================================================ */
const baseVideos = [
  {
    year: '2025', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'QUE LLUEVAN FLORES',
    image: 'assets/images/videos/que-lluevan-flores.jpg', watchUrl: 'https://www.youtube.com/watch?v=Te2-MPEJO-c', default: true,
  },
  {
    year: '2025', type: { en: 'SESSION', es: 'SESIÓN' }, name: 'COMO EN EL IDILIO',
    image: 'assets/images/videos/como-en-el-idilio.jpg', watchUrl: 'https://www.youtube.com/watch?v=OYtHvS7n7ic',
  },
  {
    year: '2024', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'INSENSATA',
    image: 'assets/images/videos/insensata.jpg', watchUrl: 'https://www.youtube.com/watch?v=YFWj_epMg1E',
  },
  {
    year: '2024', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'NO ES OTRA CANCIÓN ROMÁNTICA',
    image: 'assets/images/videos/no-es-otra-cancion.jpg', watchUrl: 'https://www.youtube.com/watch?v=MN4BAlFQmJE',
  },
  {
    year: '2023', type: { en: 'VIDEOCLIP', es: 'VIDEOCLIP' }, name: 'A CABALLO',
    image: 'assets/images/videos/a-caballo.jpg', watchUrl: 'https://www.youtube.com/watch?v=U-mUgBxs4zg',
  },
];

// Only 5 real videos exist right now — repeated once to simulate a
// fuller 10-item slider until more are supplied.
const videos = [...baseVideos, ...baseVideos];

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
