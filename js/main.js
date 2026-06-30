/* ============================================================
   MENU
   ============================================================ */
const menuToggle  = document.getElementById('menuToggle');
const menuClose   = document.getElementById('menuClose');
const menuPanel   = document.getElementById('menuPanel');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks   = document.querySelectorAll('.menu-link');

function openMenu() {
  menuPanel.classList.add('is-open');
  menuOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  menuPanel.classList.remove('is-open');
  menuOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ============================================================
   LANGUAGE SWITCHER
   ============================================================ */
const langInputs = document.querySelectorAll('input[name="lang"]');

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    el.textContent = el.dataset[lang] || el.textContent;
  });
}

langInputs.forEach(input => {
  input.addEventListener('change', () => applyLang(input.value));
});

/* ============================================================
   NAV COLOR ADAPTATION
   — switches hamburger / CTA tint based on section bg
   ============================================================ */
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('main > section');

const sectionThemes = {
  home:        { color: '#FF2D78' },
  tour:        { color: '#FF2D78' },
  bio:         { color: '#FF2D78' },
  music:       { color: '#FF2D78' },
  videos:      { color: '#ffffff' },
  'club-grasa':{ color: '#ffffff' },
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      const theme = sectionThemes[id];
      if (theme) {
        nav.querySelectorAll('.nav__hamburger span').forEach(s => {
          s.style.background = theme.color;
        });
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
