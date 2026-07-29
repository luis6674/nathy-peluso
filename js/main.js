/* ============================================================
   MOBILE SIDEBAR TOGGLE
   ============================================================ */
const hamburger   = document.getElementById('hamburger');
const sidebar      = document.getElementById('sidebar');
const menuOverlay  = document.getElementById('menuOverlay');
const navLinks     = document.querySelectorAll('.nav-link');

function openSidebar() {
  sidebar.classList.add('is-open');
  menuOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('is-open');
  menuOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openSidebar);
if (menuOverlay) menuOverlay.addEventListener('click', closeSidebar);
navLinks.forEach(link => link.addEventListener('click', closeSidebar));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});

/* ============================================================
   JOIN THE CLUB MODAL
   ============================================================ */
const joinModal   = document.getElementById('joinModal');
const joinTrigger = document.getElementById('joinTrigger');
const joinClose   = document.getElementById('joinClose');

function openJoinModal(e) {
  if (e) e.preventDefault();
  if (joinModal) joinModal.classList.add('is-open');
}
function closeJoinModal() {
  if (joinModal) joinModal.classList.remove('is-open');
}

if (joinTrigger) joinTrigger.addEventListener('click', openJoinModal);
if (joinClose) joinClose.addEventListener('click', closeJoinModal);
if (joinModal) {
  joinModal.addEventListener('click', e => {
    if (e.target === joinModal) closeJoinModal();
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeJoinModal();
});

/* ============================================================
   LANGUAGE SWITCHER
   ============================================================ */
const langInputs = document.querySelectorAll('input[name="lang"]');
const LANG_STORAGE_KEY = 'lang';

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach(el => {
    el.dataset.en = el.dataset.en || el.textContent;
    el.textContent = el.dataset[lang] || el.dataset.en;
  });
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  langInputs.forEach(input => { input.checked = input.value === lang; });
}

langInputs.forEach(input => {
  input.addEventListener('change', () => applyLang(input.value));
});

const savedLang = localStorage.getItem(LANG_STORAGE_KEY) || 'es';
applyLang(savedLang);

/* ============================================================
   SCROLL UP
   ============================================================ */
const scrollUpBtn = document.querySelector('.scroll-up');
if (scrollUpBtn) {
  scrollUpBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   IDLE AUTO-SCROLL
   After a period of no user interaction, slowly scroll whichever
   vertical container is currently scrollable — the Club Grasa
   active tab panel, the Home page tour column, or (falling back)
   the page itself, as on Bio. Any interaction cancels it and
   resets the idle timer.
   ============================================================ */
const IDLE_MS = 6000;
const SCROLL_PX_PER_MS = 0.03;
const PAGE_SCROLL_SPEED_MULTIPLIER = 1.4; // whole-page fallback (e.g. Bio) covers more ground per screen
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lastInteraction = Date.now();
let lastFrameTime = null;

function markInteraction() { lastInteraction = Date.now(); }

['mousemove', 'wheel', 'touchstart', 'keydown', 'mousedown'].forEach(evt => {
  document.addEventListener(evt, markInteraction, { passive: true });
});

function getAutoScrollTarget() {
  const candidates = [
    document.querySelector('.cg-panel.is-active'),
    document.getElementById('tour'),
    document.scrollingElement,
  ];
  return candidates.find(el => el && el.scrollHeight > el.clientHeight) || null;
}

function autoScrollTick(now) {
  requestAnimationFrame(autoScrollTick);
  const dt = lastFrameTime ? now - lastFrameTime : 0;
  lastFrameTime = now;

  if (reduceMotion || Date.now() - lastInteraction < IDLE_MS) return;

  const target = getAutoScrollTarget();
  if (!target) return;

  const speed = target === document.scrollingElement
    ? SCROLL_PX_PER_MS * PAGE_SCROLL_SPEED_MULTIPLIER
    : SCROLL_PX_PER_MS;
  const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
  target.scrollTop = atBottom ? 0 : target.scrollTop + speed * dt;
}

if (!reduceMotion) requestAnimationFrame(autoScrollTick);
