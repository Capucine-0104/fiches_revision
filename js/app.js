/* Page des fiches : recherche, filtres, suivi de progression. */
(function () {
  'use strict';

  var store = window.MR.store;
  var DONE_KEY = 'mr:done';

  var done = store.get(DONE_KEY, []);
  if (!Array.isArray(done)) done = [];

  var fiches = Array.prototype.slice.call(document.querySelectorAll('.fiche'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.group'));
  var sideGroups = Array.prototype.slice.call(document.querySelectorAll('.side-g'));
  var side = document.querySelector('.side');
  var input = document.getElementById('q');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var count = document.getElementById('count');
  var barFill = document.getElementById('bar-fill');
  var progText = document.getElementById('prog-txt');
  var state = { filter: 'all', query: '' };

  var links = {};
  Array.prototype.forEach.call(document.querySelectorAll('.side a[href^="#"]'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function isNarrow() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  /* Ajoute à chaque fiche un bouton « maîtrisée » à côté du niveau. */
  fiches.forEach(function (fiche) {
    fiche._text = normalize(fiche.textContent);
    var level = fiche.querySelector('.lvl');
    fiche._level = normalize(level.textContent);

    var wrap = document.createElement('div');
    wrap.className = 'hd-r';
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'done';
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', function () { toggle(fiche.id); });

    fiche.querySelector('header').appendChild(wrap);
    wrap.appendChild(level);
    wrap.appendChild(button);
    fiche._button = button;
  });

  function isDone(id) {
    return done.indexOf(id) !== -1;
  }

  function toggle(id) {
    var i = done.indexOf(id);
    if (i === -1) done.push(id); else done.splice(i, 1);
    store.set(DONE_KEY, done);
    renderProgress();
    applyFilters();
  }

  function renderProgress() {
    var n = 0;
    fiches.forEach(function (fiche) {
      var d = isDone(fiche.id);
      if (d) n++;
      fiche.classList.toggle('is-done', d);
      fiche._button.setAttribute('aria-pressed', d ? 'true' : 'false');
      fiche._button.textContent = d ? 'Maîtrisée ✓' : 'Marquer comme maîtrisée';
      if (links[fiche.id]) links[fiche.id].classList.toggle('is-done', d);
    });
    progText.textContent = n + ' / ' + fiches.length + ' fiches maîtrisées';
    barFill.style.width = (fiches.length ? (100 * n / fiches.length) : 0) + '%';
  }

  function applyFilters() {
    var query = normalize(state.query.trim());
    var shown = 0;

    fiches.forEach(function (fiche) {
      var ok = true;
      if (query && fiche._text.indexOf(query) === -1) ok = false;
      if (ok && state.filter === 'todo') ok = !isDone(fiche.id);
      else if (ok && state.filter !== 'all') ok = fiche._level.indexOf(state.filter) !== -1;

      fiche.hidden = !ok;
      if (links[fiche.id]) links[fiche.id].parentNode.hidden = !ok;
      if (ok) shown++;
    });

    groups.forEach(function (g) { g.hidden = !g.querySelector('.fiche:not([hidden])'); });
    sideGroups.forEach(function (g) { g.hidden = !g.querySelector('li:not([hidden])'); });

    if (shown === 0) count.textContent = 'Aucune fiche ne correspond.';
    else count.textContent = shown + (shown > 1 ? ' fiches affichées' : ' fiche affichée');
  }

  input.addEventListener('input', function () {
    state.query = input.value;
    applyFilters();
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      state.filter = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      applyFilters();
    });
  });

  /* Raccourci « / » pour aller dans la recherche. */
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'select' && tag !== 'textarea') {
      e.preventDefault();
      input.focus();
    }
  });

  /* Sommaire : replié sur mobile, et refermé après un clic. */
  if (side && isNarrow()) side.removeAttribute('open');
  Object.keys(links).forEach(function (id) {
    links[id].addEventListener('click', function () {
      if (side && isNarrow()) side.removeAttribute('open');
    });
  });

  /* Met en valeur la fiche visible dans le sommaire. */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || !links[entry.target.id]) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
        links[entry.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    fiches.forEach(function (fiche) { observer.observe(fiche); });
  }

  renderProgress();
  applyFilters();
})();
