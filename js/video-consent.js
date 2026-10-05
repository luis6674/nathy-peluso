/* ============================================================
   THIRD-PARTY EMBED COOKIE CONSENT (YouTube, SoundCloud)
   These embeds set targeting cookies (SoundCloud even before play), so each lives in a
   `.video-consent` wrapper holding an <iframe data-src="…"> (no `src`
   until consent, so nothing is requested from YouTube beforehand) and a
   `.video-cookie-layer` overlay with an "Accept cookies" button and a
   plain link to the content on the provider's site.

   Consent comes from OneTrust (loaded separately on production): the
   Targeting group C0004 must be active. Without OneTrust (e.g. local
   dev) the overlay simply stays up.
   ============================================================ */
(function () {
  const TARGETING_GROUP = 'C0004';

  function hasConsent() {
    return typeof OnetrustActiveGroups !== 'undefined' &&
      OnetrustActiveGroups.includes(TARGETING_GROUP);
  }

  // Show/hide every overlay and load/unload its iframe to match consent.
  function sync() {
    const consented = hasConsent();
    document.querySelectorAll('.video-consent').forEach(wrap => {
      const layer = wrap.querySelector('.video-cookie-layer');
      const iframe = wrap.querySelector('iframe');
      const dataSrc = iframe && iframe.dataset.src;
      if (layer) layer.hidden = consented;
      if (!iframe) return;
      if (consented && dataSrc) {
        if (iframe.getAttribute('src') !== dataSrc) iframe.setAttribute('src', dataSrc);
      } else if (iframe.hasAttribute('src')) {
        iframe.removeAttribute('src');
      }
    });
    return consented;
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.video-cookie-accept')) return;
    if (typeof OneTrust !== 'undefined') OneTrust.UpdateConsent('Category', 'C0004:1');
    sync();
  });

  // OneTrust loads asynchronously and may be ready before or after us, so
  // listen for its events and poll (stopping once consent is granted).
  window.addEventListener('OneTrustGroupsUpdated', sync);
  if (typeof OneTrust !== 'undefined' && OneTrust.OnConsentChanged) OneTrust.OnConsentChanged(sync);
  const poll = setInterval(() => { if (sync()) clearInterval(poll); }, 1000);

  window.VideoConsent = { hasConsent, sync };
  sync();
})();
