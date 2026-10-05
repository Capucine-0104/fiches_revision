/* Cartes de révision : cinq boîtes à la manière de Leitner, version simple (4 états). */
(function () {
  'use strict';

  var store = window.MR.store;
  var BOX_KEY = 'mr:boxes';
  var MAX_BOX = 3; // 0 nouvelle, 1 à revoir, 2 en cours, 3 acquise

  function hash(text) {
    var h = 5381;
    for (var i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  var titles = {};
  window.CHAPTERS.forEach(function (c) { titles[c[0]] = c[1]; });

  var cards = window.CARDS.map(function (c) {
    return { chap: c[0], q: c[1], a: c[2], id: hash(c[0] + '|' + c[1]) };
  });

  var boxes = store.get(BOX_KEY, {});
  if (!boxes || typeof boxes !== 'object' || Array.isArray(boxes)) boxes = {};

  var select = document.getElementById('chap');
  var onlyDue = document.getElementById('only-due');
  var resetBtn = document.getElementById('reset');
  var stats = document.getElementById('stats');
  var stage = document.getElementById('stage');

  var deck = [];
  var pos = 0;
  var revealed = false;
  var session = { ok: 0, ko: 0 };

  function box(card) { return boxes[card.id] || 0; }

  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = list[i]; list[i] = list[j]; list[j] = t;
    }
    return list;
  }

  function inChapter(card) {
    return select.value === 'all' || card.chap === select.value;
  }

  function fillSelect() {
    var all = document.createElement('option');
    all.value = 'all';
    all.textContent = 'Tous les chapitres (' + cards.length + ')';
    select.appendChild(all);
    window.CHAPTERS.forEach(function (c) {
      var n = cards.filter(function (card) { return card.chap === c[0]; }).length;
      if (!n) return;
      var o = document.createElement('option');
      o.value = c[0];
      o.textContent = c[1] + ' (' + n + ')';
      select.appendChild(o);
    });
  }

  function renderStats() {
    var counts = [0, 0, 0, 0];
    cards.filter(inChapter).forEach(function (card) { counts[box(card)]++; });
    var labels = ['Nouvelles', 'À revoir', 'En cours', 'Acquises'];
    stats.innerHTML = counts.map(function (n, i) {
      return '<div class="stat"><b>' + n + '</b><span>' + labels[i] + '</span></div>';
    }).join('');
  }

  function build() {
    var list = cards.filter(function (card) {
      return inChapter(card) && (!onlyDue.checked || box(card) < MAX_BOX);
    });
    shuffle(list);
    list.sort(function (a, b) { return box(a) - box(b); }); // tri stable : au hasard dans chaque boîte
    deck = list;
    pos = 0;
    revealed = false;
    session = { ok: 0, ko: 0 };
    renderStats();
    show();
  }

  function show() {
    if (!deck.length) {
      stage.innerHTML = '<div class="end"><h2>Aucune carte à afficher</h2>' +
        '<p>Toutes les cartes de cette sélection sont acquises. Décoche « Seulement les cartes à revoir » pour les repasser.</p></div>';
      return;
    }
    if (pos >= deck.length) {
      stage.innerHTML = '<div class="end"><h2>Série terminée</h2>' +
        '<p>' + session.ok + ' carte' + (session.ok > 1 ? 's' : '') + ' sue' + (session.ok > 1 ? 's' : '') +
        ', ' + session.ko + ' à revoir.</p>' +
        '<button type="button" class="btn-p" id="again">Nouvelle série</button></div>';
      var again = document.getElementById('again');
      again.addEventListener('click', build);
      again.focus();
      return;
    }

    var card = deck[pos];
    var html = '<article class="card">' +
      '<div class="card-meta"><span>' + titles[card.chap] + '</span><span>Carte ' + (pos + 1) + ' / ' + deck.length + '</span></div>' +
      '<h2 class="card-q">' + card.q + '</h2>';

    if (!revealed) {
      html += '<div class="acts"><button type="button" class="btn-p" id="reveal">Afficher la réponse</button></div>';
    } else {
      html += '<div class="card-a" aria-live="polite"><p>' + card.a + '</p></div>' +
        '<div class="acts">' +
        '<button type="button" class="btn-s" id="ko">À revoir<span class="kbd">1</span></button>' +
        '<button type="button" class="btn-p" id="ok">Je savais<span class="kbd">2</span></button>' +
        '</div>' +
        '<a class="card-link" href="index.html#' + card.chap + '">Relire la fiche</a>';
    }
    html += '</article>';
    stage.innerHTML = html;

    if (!revealed) {
      var reveal = document.getElementById('reveal');
      reveal.addEventListener('click', function () { revealed = true; show(); });
      reveal.focus();
    } else {
      document.getElementById('ko').addEventListener('click', function () { answer(false); });
      var ok = document.getElementById('ok');
      ok.addEventListener('click', function () { answer(true); });
      ok.focus();
    }
  }

  function answer(known) {
    var card = deck[pos];
    // Réussite : une carte nouvelle ou à revoir passe en cours, puis acquise. Échec : retour à « à revoir ».
    boxes[card.id] = known ? Math.min(Math.max(box(card), 1) + 1, MAX_BOX) : 1;
    store.set(BOX_KEY, boxes);
    if (known) session.ok++; else session.ko++;
    pos++;
    revealed = false;
    renderStats();
    show();
  }

  document.addEventListener('keydown', function (e) {
    if (!revealed || pos >= deck.length) return;
    if (e.key === '1') answer(false);
    else if (e.key === '2') answer(true);
  });

  select.addEventListener('change', build);
  onlyDue.addEventListener('change', build);
  resetBtn.addEventListener('click', function () {
    if (!window.confirm('Effacer toute ta progression sur les cartes ?')) return;
    boxes = {};
    store.set(BOX_KEY, boxes);
    build();
  });

  fillSelect();
  build();
})();
