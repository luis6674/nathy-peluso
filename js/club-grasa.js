const cgTabs   = document.querySelectorAll('.cg-tab');
const cgPanels = document.querySelectorAll('.cg-panel');

cgTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    cgTabs.forEach(t => t.classList.toggle('is-active', t === tab));
    cgPanels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === target));
  });
});
