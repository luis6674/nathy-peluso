// === BUTTON STYLES ===
function fixButtons() {
  var widget = document.querySelector('.bit-widget');
  if (!widget) return;

  widget
    .querySelectorAll(
      '.bit-button, .bit-rsvp, .bit-offers, .bit-follow-section-cta, .bit-play-my-city-cta, .bit-show-all-cta'
    )
    .forEach(function(el) {
      el.style.setProperty('border', '2px dotted #FF0289', 'important');
      el.style.setProperty('border-radius', '0px', 'important');
      el.style.setProperty('background-color', 'transparent', 'important');
      el.style.setProperty('color', '#FF0289', 'important');
      el.style.setProperty('box-sizing', 'border-box', 'important');
    });

  widget
    .querySelectorAll(
      '.bit-button *, .bit-rsvp *, .bit-offers *, .bit-follow-section-cta *, .bit-play-my-city-cta *, .bit-show-all-cta *'
    )
    .forEach(function(el) {
      el.style.setProperty('color', '#FF0289', 'important');
      el.style.setProperty('text-transform', 'uppercase', 'important');
    });
}

// === DATE SIZE: match venue text ===
function applyDateSize() {
  var venue = document.querySelector('.bit-venue-vertical');
  if (!venue) return;

  var size = window.getComputedStyle(venue).fontSize;

  document.querySelectorAll('.bit-vertical-date').forEach(function(el) {
    el.style.setProperty('font-size', size, 'important');

    el.querySelectorAll('*').forEach(function(c) {
      c.style.setProperty('font-size', size, 'important');
    });

    el.style.removeProperty('font-weight');

    el.querySelectorAll('*').forEach(function(c) {
      c.style.removeProperty('font-weight');
    });
  });
}

// === PLAY MY CITY / SHOW ALL: centered ===
function fixSectionAlignment() {
  var widget = document.querySelector('.bit-widget');
  if (!widget) return;

  widget
    .querySelectorAll('.bit-play-my-city-wrapper, .bit-show-all-wrapper')
    .forEach(function(el) {
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('flex-direction', 'column', 'important');
      el.style.setProperty('text-align', 'center', 'important');
      el.style.setProperty('align-items', 'center', 'important');
      el.style.setProperty('justify-content', 'center', 'important');
    });
}

function runAll() {
  fixButtons();
  applyDateSize();
  fixSectionAlignment();
}

[200, 500, 1000, 2000, 3500].forEach(function(t) {
  setTimeout(runAll, t);
});

new MutationObserver(runAll).observe(document.body, {
  childList: true,
  subtree: true
});

window.addEventListener('resize', runAll);