/* Kavin R V — theme toggle + share links */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');

  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function store(t) { try { localStorage.setItem('theme', t); } catch (e) { /* ignore */ } }

  function apply(t) {
    root.setAttribute('data-theme', t);
    if (btn) {
      var i = btn.querySelector('i');
      if (i) i.className = (t === 'dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    store(t);
  }

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(stored() || (prefersDark ? 'dark' : 'light'));

  if (btn) {
    btn.addEventListener('click', function () {
      apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* Share icons on publication pages: <a data-share="twitter"> etc. */
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);
  var map = {
    twitter:  'https://twitter.com/intent/tweet?url=' + url + '&text=' + title,
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
    linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
    whatsapp: 'https://wa.me/?text=' + title + '%20' + url,
    email:    'mailto:?subject=' + title + '&body=' + url
  };
  Array.prototype.forEach.call(document.querySelectorAll('[data-share]'), function (a) {
    var k = a.getAttribute('data-share');
    if (map[k]) { a.href = map[k]; if (k !== 'email') { a.target = '_blank'; a.rel = 'noopener'; } }
  });

  /* Scroll-linked metal reflection: exposes --sp (0..1) used by the
     navbar glint, the portrait ring, and the big heading sheen. */
  var ticking = false;
  function setSP() {
    var h = document.documentElement;
    var max = (h.scrollHeight - window.innerHeight) || 1;
    var p = Math.min(1, Math.max(0, window.scrollY / max));
    h.style.setProperty('--sp', p.toFixed(4));
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(setSP); }
  }, { passive: true });
  window.addEventListener('resize', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(setSP); }
  }, { passive: true });
  setSP();
})();
