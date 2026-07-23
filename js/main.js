/* Kavin R V — renders news/publications from data.js, theme toggle + effects */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');

  /* ---------- news & publications, rendered from js/data.js ---------- */
  function newsItemHTML(n) {
    return '<p class="news-item"><span class="news-date">[' + n.date + ']:</span> ' + n.html + '</p>';
  }
  (function render() {
    var news = window.SITE_NEWS || [];
    var pubs = window.SITE_PUBS || [];
    var missing = !(window.SITE_NEWS && window.SITE_PUBS);
    var note = '<p class="news-item data-missing">Couldn\'t read <code>js/data.js</code> &mdash; it is missing, or it has a syntax error (a missing comma or quote). Open the browser console: the error names the exact line.</p>';

    var box = document.getElementById('news-list');            /* home: scrolling box */
    if (box) {
      if (missing) box.insertAdjacentHTML('beforeend', note);
      news.forEach(function (n) { box.insertAdjacentHTML('beforeend', newsItemHTML(n)); });
    }

    var page = document.getElementById('news-page-list');      /* news.html: grouped by year */
    if (page) {
      if (missing) page.insertAdjacentHTML('beforeend', note);
      var years = [], byYear = {};
      news.forEach(function (n) {
        var y = n.date.slice(-4);
        if (!byYear[y]) { byYear[y] = []; years.push(y); }
        byYear[y].push(n);
      });
      years.forEach(function (y) {
        page.insertAdjacentHTML('beforeend', '<h2 class="news-year serif">' + y + '</h2>');
        byYear[y].forEach(function (n) { page.insertAdjacentHTML('beforeend', newsItemHTML(n)); });
      });
    }

    var list = document.querySelector('.pub-list');            /* home: publications */
    if (list && missing) list.insertAdjacentHTML('beforeend', note);
    if (list) pubs.forEach(function (p) {
      var links = (p.links || []).map(function (l) {
        return '<a class="btn-sm" href="' + l.url + '" target="_blank" rel="noopener">' + l.label + '</a>';
      }).join('');
      if (p.tweet) links += '<a class="btn-sm" href="' + p.tweet + '" target="_blank" rel="noopener"><i class="fa-brands fa-x-twitter"></i> Tweet</a>';
      list.insertAdjacentHTML('beforeend',
        '<article class="pub"><p class="pub-cite"><i class="fa-regular fa-file-lines"></i> ' +
        p.authors + ' (' + p.year + '). ' +
        '<a class="pub-title" href="' + p.page + '">' + p.title + '</a>. ' +
        'In <em>' + p.venue + '</em>.</p>' +
        '<div class="pub-links">' + links + '</div></article>');
    });
  })();

  /* ---------- theme ---------- */
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

  /* Name key elements so the theme transition transforms each piece individually */
  if (document.startViewTransition) {
    var nav = document.querySelector('.navbar'); if (nav) nav.style.viewTransitionName = 'vt-nav';
    var ring = document.querySelector('.avatar-frame'); if (ring) ring.style.viewTransitionName = 'vt-ring';
    var foot = document.querySelector('footer'); if (foot) foot.style.viewTransitionName = 'vt-foot';
    var hs = document.querySelectorAll('.section-title,.news-head h2,.pub-heading,.page-title');
    Array.prototype.forEach.call(hs, function (h, i) {
      if (i < 4) h.style.viewTransitionName = 'vt-t' + (i + 1);
    });
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !reduce) {
        /* to dark: dusk falls down the page while the glass dims beneath;
           to light: light washes down the page while the metal dissolves beneath */
        root.setAttribute('data-vt', next === 'dark' ? 'to-dark' : 'to-light');
        root.classList.add('no-anim');
        var vt = document.startViewTransition(function () { apply(next); });
        vt.finished.finally(function () {
          root.classList.remove('no-anim');
          root.removeAttribute('data-vt');
        });
      } else {
        apply(next);
      }
    });
  }

  /* ---------- share icons on publication pages ---------- */
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

  /* ---------- scroll-linked reflections: --sp drives the navbar glint,
     the portrait ring and the heading sheen */
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
