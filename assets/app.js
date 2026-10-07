(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // nav mobile
  var toggle = $('.nav-toggle'), links = $('#navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', links).forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }); });
  }

  // progresso de leitura + seção ativa
  var progress = $('#progress');
  var sections = $$('main section[id]');
  var navAnchors = $$('#navlinks a');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (progress) progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    var cur = null, y = h.scrollTop + 120;
    sections.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
    navAnchors.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // cenários do WhatsApp
  $$('.scenario-tabs .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var k = btn.getAttribute('data-scenario');
      $$('.scenario-tabs .tab-btn').forEach(function (b) { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
      ['a', 'b'].forEach(function (id) {
        $('#chat-' + id).classList.toggle('hidden', id !== k);
        $('#annot-' + id).classList.toggle('hidden', id !== k);
      });
      var body = $('#chat-' + k);
      if (body) body.scrollTop = 0;
    });
  });

  // abas do cockpit
  $$('.ck-top .tabs button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var k = btn.getAttribute('data-pane');
      $$('.ck-top .tabs button').forEach(function (b) { b.classList.toggle('active', b === btn); });
      $$('.ck-pane').forEach(function (p) { p.classList.toggle('active', p.id === 'pane-' + k); });
    });
  });

  // perguntas: abrir/fechar todas
  var qo = $('#q-open'), qc = $('#q-close');
  if (qo) qo.addEventListener('click', function () { $$('#validar details').forEach(function (d) { d.open = true; }); });
  if (qc) qc.addEventListener('click', function () { $$('#validar details').forEach(function (d) { d.open = false; }); });
})();
