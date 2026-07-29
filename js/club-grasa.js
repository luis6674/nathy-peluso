const cgTabs   = document.querySelectorAll('.cg-tab');
const cgPanels = document.querySelectorAll('.cg-panel');

cgTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    cgTabs.forEach(t => t.classList.toggle('is-active', t === tab));
    cgPanels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === target));
  });
});

/* ============================================================
   IDLE AUTO-SCROLL
   After a period of no user interaction, slowly scroll the active
   panel down. Any interaction cancels it and resets the idle timer.
   ============================================================ */
const IDLE_MS = 6000;
const SCROLL_PX_PER_MS = 0.03;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lastInteraction = Date.now();
let lastFrameTime = null;

function markInteraction() { lastInteraction = Date.now(); }

['mousemove', 'wheel', 'touchstart', 'keydown', 'mousedown'].forEach(evt => {
  document.addEventListener(evt, markInteraction, { passive: true });
});

function autoScrollTick(now) {
  requestAnimationFrame(autoScrollTick);
  const dt = lastFrameTime ? now - lastFrameTime : 0;
  lastFrameTime = now;

  if (reduceMotion || Date.now() - lastInteraction < IDLE_MS) return;

  const panel = document.querySelector('.cg-panel.is-active');
  if (!panel || panel.scrollHeight <= panel.clientHeight) return;

  const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
  panel.scrollTop = atBottom ? 0 : panel.scrollTop + SCROLL_PX_PER_MS * dt;
}

if (!reduceMotion) requestAnimationFrame(autoScrollTick);
