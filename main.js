/* Portfolio — cały skrypt strony.
   Nic tu nie renderuje treści: bez JS strona działa w całości,
   traci tylko przełącznik motywu i animację pojawiania.        */

(function () {
  'use strict';

  var root = document.documentElement;

  /* --- Sprzątanie markerów placeholderów --------------------------------
     Klasa .ph podświetla nieuzupełnione pole na żółto. Sama z siebie nie wie,
     czy już coś wpisałeś — więc sprawdzamy to tutaj: jeśli ani treść, ani
     href/src nie zawierają już "{{", marker znika.

     Uwaga: link z uzupełnioną etykietą, ale nadal placeholderowym adresem
     (np. tekst "jan@example.com" przy href="mailto:{{EMAIL}}") zostaje
     podświetlony — bo wciąż jest zepsuty.                                  */

  document.querySelectorAll('.ph').forEach(function (el) {
    var content = el.textContent + ' ' +
                  (el.getAttribute('href') || '') + ' ' +
                  (el.getAttribute('src') || '');
    if (content.indexOf('{{') === -1) el.classList.remove('ph');
  });

  /* --- Motyw ---------------------------------------------------------- */

  var toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'
      );
    }
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* --- Rok w stopce --------------------------------------------------- */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* --- Cienka linia pod nawigacją po przewinięciu ---------------------- */

  var nav = document.getElementById('nav');
  if (nav) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.height = '1px';   /* element o zerowej wysokości bywa
                                        pomijany przez IntersectionObserver */
    document.body.insertBefore(sentinel, document.body.firstChild);

    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* --- Pojawianie sekcji ---------------------------------------------- */

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add('is-in');
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = Math.min(i, 5) * 60 + 'ms';
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* --- Podświetlenie aktywnej sekcji w nawigacji ------------------------ */

  var navLinks = document.querySelectorAll('.nav__links a');
  var sections = [];

  navLinks.forEach(function (link) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) sections.push({ link: link, el: target });
  });

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (s) {
          s.link.classList.toggle('is-active', s.el === entry.target);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s.el); });
  }
})();
