/* SKDV जानकारी — main.js (no dependencies) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* mobile nav */
  var tg = $('.nav-toggle'), nav = $('#nav');
  if (tg && nav) {
    tg.addEventListener('click', function () {
      var o = nav.classList.toggle('open');
      tg.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
  }

  /* table of contents from h2[id] */
  var toc = $('.toc');
  if (toc) {
    var hs = $$('.prose h2[id]');
    if (hs.length > 1) {
      var html = '<b>इस पेज पर</b>';
      hs.forEach(function (h) { html += '<a href="#' + h.id + '">' + h.textContent + '</a>'; });
      toc.innerHTML = html;
    }
  }

  /* share */
  var sh = $('#share');
  if (sh) {
    sh.addEventListener('click', function () {
      var data = { title: document.title, text: document.title, url: location.href };
      if (navigator.share) { navigator.share(data).catch(function () {}); }
      else {
        window.open('https://wa.me/?text=' + encodeURIComponent(document.title + ' ' + location.href), '_blank', 'noopener');
      }
    });
  }

  /* yatra year filter */
  var fb = $$('.filters button');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      var y = b.getAttribute('data-year');
      fb.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('[data-y]').forEach(function (it) {
        it.style.display = (y === 'all' || it.getAttribute('data-y') === y) ? '' : 'none';
      });
    });
  });

  /* YouTube in-page player */
  var IF_ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  function embedUrl(type, id, autoplay) {
    if (type === 'list') {
      return 'https://www.youtube.com/embed/videoseries?list=' + encodeURIComponent(id) + '&rel=0' + (autoplay ? '&autoplay=1' : '');
    }
    return 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?rel=0' + (autoplay ? '&autoplay=1' : '');
  }
  function watchUrl(type, id) {
    return type === 'list' ? 'https://www.youtube.com/playlist?list=' + encodeURIComponent(id) : 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
  }

  $$('[data-player]').forEach(function (root) {
    var frame = $('.player-frame', root), now = $('.now', root), ext = $('.ext', root);
    var buttons = $$('[data-vtype]', root.parentNode);

    function playVideo(type, id, title, autoplay) {
      var i = document.createElement('iframe');
      i.src = embedUrl(type, id, autoplay);
      i.title = title || 'YouTube video player';
      i.allow = IF_ALLOW;
      i.allowFullscreen = true;
      i.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.innerHTML = '';
      frame.appendChild(i);
      if (now) now.textContent = title;
      if (ext) ext.href = watchUrl(type, id);
    }

    function pick(b, autoplay) {
      buttons.forEach(function (x) { x.removeAttribute('aria-current'); });
      b.setAttribute('aria-current', 'true');
      playVideo(b.getAttribute('data-vtype'), b.getAttribute('data-vid'), b.getAttribute('data-vtitle'), autoplay);
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        pick(b, true);
        if (window.innerWidth < 900) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    var initialIframe = $('iframe', frame);
    if (initialIframe) {
      if (buttons.length) buttons[0].setAttribute('aria-current', 'true');
      if (now && buttons.length) now.textContent = buttons[0].getAttribute('data-vtitle');
      if (ext && buttons.length) ext.href = watchUrl(buttons[0].getAttribute('data-vtype'), buttons[0].getAttribute('data-vid'));
    } else if (buttons.length) {
      pick(buttons[0], false);
    }
  });

  /* images: overrides from assets/js/images.js, fallback if a URL fails */
  var MAP = window.SKDV_IMAGES || {};
  $$('img[data-img]').forEach(function (im) {
    var k = im.getAttribute('data-img');
    if (MAP[k] && im.getAttribute('src').indexOf(MAP[k].split('?')[0]) === -1) { im.src = MAP[k]; }
    im.addEventListener('error', function () {
      if (im.getAttribute('data-fb')) { return; }
      im.setAttribute('data-fb', '1');
      im.src = 'https://picsum.photos/seed/' + encodeURIComponent(k) + '/1000/700';
    });
  });
  if (window.SKDV_SAMPLE_BADGE) { document.documentElement.classList.add('sample-badge'); }

  /* file:// warning — YouTube embeds need http(s) */
  if (location.protocol === 'file:') { document.documentElement.classList.add('is-file'); }
})();
