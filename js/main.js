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
const joinModal        = document.getElementById('joinModal');
const joinTrigger       = document.getElementById('joinTrigger');
const joinTriggerMobile = document.getElementById('joinTrigerMobile');
const joinClose         = document.getElementById('joinClose');

function openJoinModal(e) {
  if (e) e.preventDefault();
  if (joinModal) joinModal.classList.add('is-open');
}
function closeJoinModal() {
  if (joinModal) joinModal.classList.remove('is-open');
}

if (joinTrigger) joinTrigger.addEventListener('click', openJoinModal);
if (joinTriggerMobile) joinTriggerMobile.addEventListener('click', openJoinModal);
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

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach(el => {
    el.dataset.en = el.dataset.en || el.textContent;
    el.textContent = el.dataset[lang] || el.dataset.en;
  });
}

langInputs.forEach(input => {
  input.addEventListener('change', () => applyLang(input.value));
});

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
