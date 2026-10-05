/* Fonctions communes : stockage local sécurisé et bascule de thème. */
(function () {
  'use strict';

  var THEME_KEY = 'mr:theme';
  var root = document.documentElement;

  // localStorage peut être indisponible (navigation privée, données bloquées) : on ne plante jamais.
  var store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) { /* ignoré */ }
    }
  };

  function effectiveTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return dark ? 'dark' : 'light';
  }

  function setLabel(button) {
    button.textContent = effectiveTheme() === 'dark' ? 'Mode clair' : 'Mode sombre';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme');
    if (!button) return;
    setLabel(button);
    button.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set(THEME_KEY, next);
      setLabel(button);
    });
  });

  window.MR = { store: store };
})();
