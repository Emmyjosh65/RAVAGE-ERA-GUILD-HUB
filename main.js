/* ============================================================
   RAVAGE ERA — GUILD HUB  |  main.js
   Hash-router SPA + tryouts + spin + likes + gallery + contact
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- Data ---------------- */

  var SECRET = '800012';
  var ZEUS_WA = '2349066760078';
  var GUILD_EMAIL = 'ge5853987@gmail.com';

  var ASSETS = [
    { src: 'assets/ravage-profile-01.png', label: 'RAVAGE ERA PROFILE 01' },
    { src: 'assets/ravage-profile-02.png', label: 'RAVAGE ERA PROFILE 02' },
    { src: 'assets/ravage-profile-03.png', label: 'RAVAGE ERA PROFILE 03' },
    { src: 'assets/ravage-profile-04.png', label: 'RAVAGE ERA PROFILE 04' },
    { src: 'assets/ravage-profile-05.png', label: 'RAVAGE ERA PROFILE 05' },
    { src: 'assets/ravage-guild.png',     label: 'RAVAGE ERA GUILD' },
    { src: 'assets/ravage-profile-07.png', label: 'RAVAGE ERA PROFILE 07' },
    { src: 'assets/ravage-profile-08.png', label: 'RAVAGE ERA PROFILE 08' }
  ];

  var ADMINS = [
    { name: 'RE SLICK',   pos: 'GUILD LEADER',             wa: '27835309249', rank: 'leader',    desc: 'RE Slick is the Guild Leader of RAVAGE ERA and one of the people responsible for maintaining the direction, discipline and competitive identity of the guild.' },
    { name: 'KAGURA',     pos: 'ASSISTANT GUILD LEADER',   wa: '420736488219', rank: 'assistant', desc: 'Kagura serves as the Assistant Guild Leader, helping coordinate members, support guild activities and maintain the teamwork that keeps RAVAGE ERA moving forward.' },
    { name: 'MARPHY',     pos: 'ELDER ONE',                wa: '2349025007555', rank: 'elder',    desc: 'Marphy is one of the respected senior members of RAVAGE ERA. As Elder One, he represents experience, consistency and support for the guild community.' },
    { name: 'HAPEX',      pos: 'ELDER TWO',                wa: '2348146067809', rank: 'elder',    desc: 'Hapex is an Elder of RAVAGE ERA known for contributing to the guild community and helping maintain a strong and welcoming environment for members.' },
    { name: 'RE DANNY',   pos: 'ELDER TWO',                wa: '2349029032927', rank: 'elder',    desc: 'RE Danny is one of the guild\u2019s Elders, contributing experience, support and leadership to the RAVAGE ERA community.' },
    { name: 'RE ZEUS',    pos: 'MOST VALUED MEMBER',       wa: '2347064849689', rank: 'mvm',      desc: 'RE ZEUS is recognized as a highly valued member of RAVAGE ERA, bringing energy, loyalty and dedication to the guild.' },
    { name: 'EMMEX / ZEUS', pos: 'WEB DEVELOPER',          wa: ZEUS_WA,        rank: 'dev',      desc: 'Emmex, also known as ZEUS, is the web developer behind the RAVAGE ERA Guild Hub. He is responsible for designing, developing and maintaining the digital platform, creating the interface and connecting the guild\u2019s community services into one organized hub.' }
  ];

  var DASH_CARDS = [
    { title: 'TRYOUTS',      desc: 'Join the guild',          route: 'tryouts' },
    { title: 'GUILD',        desc: 'About RAVAGE ERA',        route: 'guild' },
    { title: 'ADMINS',       desc: 'Meet the team',           route: 'admins' },
    { title: 'SPIN & WIN',   desc: 'Community promotion',     route: 'spin' },
    { title: 'LIKES & VISITS', desc: 'Community service',     route: 'likes' },
    { title: 'GALLERY',      desc: 'Media & profiles',        route: 'gallery' },
    { title: 'CONTACT',      desc: 'Reach the guild',         route: 'contact' }
  ];

  var ROUTES = ['home', 'tryouts', 'guild', 'admins', 'spin', 'likes', 'gallery', 'profiles', 'contact'];

  /* ---------------- Helpers ---------------- */

  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  function initials(name) {
    var letters = name.replace(/[^A-Za-z]/g, '');
    return letters.slice(0, 2).toUpperCase() || 'RE';
  }

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isPhone(v) {
    var digits = String(v).replace(/\D/g, '');
    return digits.length >= 7;
  }

  function setErr(id, msg) {
    var el = document.getElementById(id);
    if (el) el.textContent = msg || '';
  }

  function markField(inputId, ok) {
    var input = document.getElementById(inputId);
    if (!input) return;
    var field = input.closest('.field');
    if (field) field.classList.toggle('invalid', !ok);
    if (!ok) {
      input.classList.remove('shake');
      void input.offsetWidth; /* restart animation */
      input.classList.add('shake');
    }
  }

  function validateField(inputId, errId, cond, msg) {
    var ok = !!cond;
    setErr(errId, ok ? '' : msg);
    markField(inputId, ok);
    return ok;
  }

  function openWa(number, text) {
    var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(text || '');
    var win = window.open(url, '_blank', 'noopener');
    if (!win) { window.location.href = url; } /* popup-blocker fallback */
    return url;
  }

  function toast(msg, isError) {
    var el = document.createElement('div');
    el.className = 'toast' + (isError ? ' error' : '');
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 400);
    }, 3800);
  }

  function openModal(id) {
    var m = document.getElementById(id);
    if (m) { m.classList.add('show'); document.body.classList.add('modal-open'); }
  }
  function closeModal(id) {
    var m = document.getElementById(id);
    if (m) { m.classList.remove('show'); }
    if (!$$('.modal.show').length) document.body.classList.remove('modal-open');
  }
  function closeAllModals() {
    $$('.modal').forEach(function (m) { m.classList.remove('show'); });
    document.body.classList.remove('modal-open');
  }

  /* ---------------- Image fallback (missing assets) ---------------- */

  function fallbackSrc(label) {
    var t = encodeURIComponent(label || 'GUILD HUB');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#141824"/><stop offset="1" stop-color="#06070a"/>' +
      '</linearGradient></defs>' +
      '<rect width="640" height="640" fill="url(#g)"/>' +
      '<rect x="20" y="20" width="600" height="600" fill="none" stroke="#f5c542" stroke-opacity=".5" stroke-width="2"/>' +
      '<text x="320" y="300" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#f5c542" text-anchor="middle" letter-spacing="6">RAVAGE ERA</text>' +
      '<text x="320" y="348" font-family="Arial, sans-serif" font-size="15" fill="#e8e6df" text-anchor="middle" letter-spacing="3">' + t + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img && img.tagName === 'IMG' && !img.dataset.fbk) {
      img.dataset.fbk = '1';
      img.src = fallbackSrc(img.getAttribute('data-label') || 'GUILD HUB');
    }
  }, true);

  /* ---------------- Router ---------------- */

  function getRoute() {
    var h = location.hash.replace(/^#\/?/, '').split('?')[0];
    return ROUTES.indexOf(h) !== -1 ? h : 'tryouts';
  }

  function render() {
    var route = getRoute();
    $$('.page').forEach(function (sec) {
      var active = sec.dataset.page === route;
      sec.classList.toggle('active', active);
    });
    $$('.nav-link').forEach(function (a) {
      a.classList.toggle('active', a.dataset.route === route);
    });
    closeSidebar();
    window.scrollTo({ top: 0 });
    document.title = route.toUpperCase() + ' — RAVAGE ERA GUILD HUB';
  }

  window.addEventListener('hashchange', render);

  /* ---------------- Sidebar / mobile menu ---------------- */

  var sidebar = $('#sidebar');
  var backdrop = $('#navBackdrop');
  var menuBtn = $('#menuBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('show');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function () {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  backdrop.addEventListener('click', closeSidebar);
  $$('.nav-link').forEach(function (a) { a.addEventListener('click', closeSidebar); });

  /* ---------------- Render: admins ---------------- */

  function adminCardHTML(a, mode) {
    var btnLabel = mode === 'select' ? 'SELECT ADMIN' : 'CONTACT ON WHATSAPP';
    var btnCls = mode === 'select' ? 'btn btn-gold btn-sm' : 'btn btn-red btn-sm';
    var data = mode === 'select' ? 'data-select-admin' : 'data-contact-admin';
    return (
      '<article class="admin-card rank-' + a.rank + '">' +
        '<div class="admin-avatar">' + initials(a.name) + '</div>' +
        '<h4>' + a.name + '</h4>' +
        '<span class="badge">' + a.pos + '</span>' +
        '<p>' + a.desc + '</p>' +
        '<button class="' + btnCls + '" ' + data + '="' + a.wa + '">' + btnLabel + '</button>' +
      '</article>'
    );
  }

  function renderAdminsGrid(el, mode) {
    el.innerHTML = ADMINS.map(function (a) { return adminCardHTML(a, mode); }).join('');
  }

  renderAdminsGrid($('#adminsGrid'), 'contact');
  renderAdminsGrid($('#tryoutAdminGrid'), 'select');

  /* delegate: contact admins */
  $('#adminsGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-contact-admin]');
    if (btn) {
      var a = ADMINS.filter(function (x) { return x.wa === btn.dataset.contactAdmin; })[0];
      if (a) { openWa(a.wa); toast('WhatsApp opened for ' + a.name); }
    }
  });

  /* ---------------- Dashboard cards ---------------- */

  $('#dashGrid').innerHTML = DASH_CARDS.map(function (c, i) {
    return (
      '<div class="dash-card" data-go="' + c.route + '">' +
        '<div class="dash-num">' + ('0' + (i + 1)) + ' · ' + c.route.toUpperCase() + '</div>' +
        '<h3>' + c.title + '</h3>' +
        '<p>' + c.desc + '</p>' +
        '<span class="dash-open">OPEN ➤</span>' +
      '</div>'
    );
  }).join('');

  $('#dashGrid').addEventListener('click', function (e) {
    var card = e.target.closest('[data-go]');
    if (card) location.hash = '#/' + card.dataset.go;
  });

  /* ---------------- Tryouts ---------------- */

  var tryoutHero = $('#tryoutHero');
  var tryoutFormPanel = $('#tryoutFormPanel');
  var tryoutAdminPanel = $('#tryoutAdminPanel');
  var tryoutPhotoFile = null;
  var tryoutData = {};

  $('#btnStartTryout').addEventListener('click', function () {
    tryoutHero.hidden = true;
    tryoutFormPanel.hidden = false;
  });

  $('#btnTryoutBack').addEventListener('click', function () {
    tryoutFormPanel.hidden = true;
    tryoutHero.hidden = false;
  });

  $('#btnAdminBack').addEventListener('click', function () {
    tryoutAdminPanel.hidden = true;
    tryoutFormPanel.hidden = false;
  });

  /* photo preview */
  $('#tryoutPhoto').addEventListener('change', function () {
    var f = this.files[0];
    if (!f) return;
    if (!f.type.match(/^image\//)) {
      setErr('errTryoutPhoto', 'Please choose an image file.');
      return;
    }
    tryoutPhotoFile = f;
    $('#tryoutPhotoName').textContent = f.name;
    $('#tryoutPhotoPreview').src = URL.createObjectURL(f);
    $('#tryoutPhotoPreviewWrap').hidden = false;
    setErr('errTryoutPhoto', '');
    markField('tryoutPhoto', true);
  });
  $('#tryoutPhotoClear').addEventListener('click', function () {
    tryoutPhotoFile = null;
    $('#tryoutPhoto').value = '';
    $('#tryoutPhotoName').textContent = 'Upload Profile';
    $('#tryoutPhotoPreviewWrap').hidden = true;
  });

  /* clear errors on input */
  ['tryoutName', 'tryoutUid', 'tryoutEmail', 'tryoutPhone'].forEach(function (id) {
    $('#' + id).addEventListener('input', function () {
      setErr('err' + id.charAt(0).toUpperCase() + id.slice(1), '');
      markField(id, true);
    });
  });

  $('#tryoutForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#tryoutName').value.trim();
    var uid = $('#tryoutUid').value.trim();
    var email = $('#tryoutEmail').value.trim();
    var phone = $('#tryoutPhone').value.trim();

    var ok = true;
    ok = validateField('tryoutName', 'errTryoutName', name.length >= 2, 'In-game name is required.') && ok;
    ok = validateField('tryoutUid', 'errTryoutUid', uid.length >= 4, 'UID is required.') && ok;
    ok = validateField('tryoutEmail', 'errTryoutEmail', email === '' || isEmail(email), email ? 'Enter a valid email address.' : '') && ok;
    ok = validateField('tryoutPhone', 'errTryoutPhone', isPhone(phone), 'A valid phone number is required.') && ok;
    ok = validateField('tryoutPhoto', 'errTryoutPhoto', !!tryoutPhotoFile, 'Profile photo is required.') && ok;

    if (!ok) {
      toast('Please fix the highlighted fields.', true);
      return;
    }

    tryoutData = { name: name, uid: uid, email: email, phone: phone };
    tryoutFormPanel.hidden = true;
    tryoutAdminPanel.hidden = false;
    window.scrollTo({ top: 0 });
  });

  /* select admin → WhatsApp + success modal */
  $('#tryoutAdminGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-select-admin]');
    if (!btn) return;
    var a = ADMINS.filter(function (x) { return x.wa === btn.dataset.selectAdmin; })[0];
    if (!a) return;

    var msg = [
      'RAVAGE ERA TRYOUT APPLICATION',
      '',
      'In-game name: ' + tryoutData.name,
      'UID: ' + tryoutData.uid,
      'Email: ' + (tryoutData.email || 'Not provided'),
      'Phone: ' + tryoutData.phone,
      '',
      'Selected admin: ' + a.name + ' (' + a.pos + ')'
    ].join('\n');

    openWa(a.wa, msg);
    openModal('modalTryoutSuccess');
  });

  $('#btnTryoutClose').addEventListener('click', function () { closeModal('modalTryoutSuccess'); });
  $('#btnTryoutViewGuild').addEventListener('click', function () {
    closeModal('modalTryoutSuccess');
    location.hash = '#/guild';
  });

  /* ---------------- Spin & Win ---------------- */

  var REEL_ITEMS = [
    { icon: '🎭', label: 'EMOTE' },
    { icon: '🎫', label: 'BOOYAH PASS' },
    { icon: '🔫', label: 'GUN SKIN' }
  ];
  var REEL_ITEM_H = 88;
  var spinUidValue = '';
  var spinShotFile = null;
  var spinShotUploaded = false;

  /* build reel tracks (12 items each, gun skin at indices 2,5,8,11) */
  $$('#spinReels .reel-track').forEach(function (track) {
    var html = '';
    for (var r = 0; r < 4; r++) {
      REEL_ITEMS.forEach(function (it) {
        html += '<div class="reel-item"><span class="ri">' + it.icon + '</span><span>' + it.label + '</span></div>';
      });
    }
    track.innerHTML = html;
  });

  $('#btnSpinUnlock').addEventListener('click', function () {
    var uid = $('#spinUid').value.trim();
    var code = $('#spinCode').value;
    var ok = true;
    ok = validateField('spinUid', 'errSpinUid', uid.length >= 4, 'UID is required.') && ok;
    ok = validateField('spinCode', 'errSpinCode', code === SECRET, 'Incorrect secret code.') && ok;
    if (!ok) { toast('Check the highlighted fields.', true); return; }

    spinUidValue = uid;
    $('#spinGate').hidden = true;
    $('#spinWheel').hidden = false;
    window.scrollTo({ top: 0 });
  });

  var spinning = false;
  $('#btnSpinStart').addEventListener('click', function () {
    if (spinning) return;
    spinning = true;
    $('#spinResult').hidden = true;
    $('#spinResultCard').hidden = true;

    var btn = this;
    btn.disabled = true;
    btn.textContent = 'SPINNING...';

    var tracks = $$('#spinReels .reel-track');
    var loops = [9, 10, 11];
    tracks.forEach(function (t) {
      t.style.transition = 'none';
      t.style.transform = 'translateY(0)';
    });
    void tracks[0].offsetWidth; /* reflow */

    tracks.forEach(function (t, i) {
      t.style.transition = 'transform 2.9s cubic-bezier(.16,.84,.24,1)';
      var target = -(2 + 3 * loops[i]) * REEL_ITEM_H; /* always lands on GUN SKIN */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { t.style.transform = 'translateY(' + target + 'px)'; });
      });
    });

    setTimeout(function () {
      spinning = false;
      btn.disabled = false;
      btn.textContent = 'SPIN AGAIN';
      $('#spinResult').hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3150);
  });

  $('#btnSpinClaim').addEventListener('click', function () {
    $('#spinWheel').hidden = true;
    $('#spinClaim').hidden = false;
    $('#claimUid').value = spinUidValue;
    window.scrollTo({ top: 0 });
  });

  $('#btnSpinBack').addEventListener('click', function () {
    $('#spinClaim').hidden = true;
    $('#spinWheel').hidden = false;
  });

  $('#btnSpinShowResult').addEventListener('click', function () {
    var uid = $('#claimUid').value.trim();
    var ok = validateField('claimUid', 'errClaimUid', uid.length >= 4, 'UID is required.');
    if (!ok) return;
    $('#spinResultCard').hidden = false;
    $('#shotField').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $('#spinShot').addEventListener('change', function () {
    var f = this.files[0];
    if (!f) return;
    if (!f.type.match(/^image\//)) { setErr('errSpinShot', 'Please choose an image file.'); return; }
    spinShotFile = f;
    $('#spinShotName').textContent = f.name;
    $('#spinShotPreview').src = URL.createObjectURL(f);
    $('#spinShotPreviewWrap').hidden = false;
    $('#btnSpinUpload').disabled = false;
    setErr('errSpinShot', '');
    markField('spinShot', true);
  });

  $('#btnSpinUpload').addEventListener('click', function () {
    if (!spinShotFile) {
      setErr('errSpinShot', 'Please choose a screenshot first.');
      return;
    }
    spinShotUploaded = true;
    this.textContent = 'SCREENSHOT ATTACHED ✓';
    this.disabled = true;
    $('#spinShotHint').textContent = 'Screenshot preview is local only — no server upload.';
    $('#spinContinueRow').hidden = false;
    toast('Screenshot attached.');
  });

  $('#btnSpinContinue').addEventListener('click', function () {
    var uid = $('#claimUid').value.trim();
    var msg = [
      'RAVAGE ERA SPIN & WIN',
      '',
      'UID: ' + uid,
      'Reward shown: GUN SKIN',
      'Screenshot uploaded: YES',
      'Participant confirmation: YES — I confirm my participation in the RAVAGE ERA Spin & Win community promotion.'
    ].join('\n');
    openWa(ZEUS_WA, msg);
    toast('WhatsApp opened — your Spin & Win message is ready. Press Send.');
  });

  /* ---------------- Likes & Visits ---------------- */

  $('#btnLikesUnlock').addEventListener('click', function () {
    var uid = $('#likesUid').value.trim();
    var code = $('#likesCode').value;
    var ok = true;
    ok = validateField('likesUid', 'errLikesUid', uid.length >= 4, 'UID is required.') && ok;
    ok = validateField('likesCode', 'errLikesCode', code === SECRET, 'Incorrect secret code.') && ok;
    if (!ok) { toast('Check the highlighted fields.', true); return; }

    $('#likesSummaryUid').textContent = uid;
    $('#likesGate').hidden = true;
    $('#likesConfirm').hidden = false;
    window.scrollTo({ top: 0 });
  });

  $('#btnLikesBack').addEventListener('click', function () {
    $('#likesConfirm').hidden = true;
    $('#likesGate').hidden = false;
  });

  $('#btnLikesContinue').addEventListener('click', function () {
    var uid = $('#likesSummaryUid').textContent;
    var msg = [
      'RAVAGE ERA LIKES / PROFILE VISIT REQUEST',
      '',
      'UID: ' + uid,
      'Service requested: Free Fire Likes & Profile Visits (RAVAGE ERA community service)'
    ].join('\n');
    openWa(ZEUS_WA, msg);
    toast('WhatsApp opened — your request is ready. Press Send.');
  });

  /* ---------------- Contact ---------------- */

  /* Option A: Email */
  $('#emailForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#cName').value.trim();
    var email = $('#cEmail').value.trim();
    var message = $('#cMessage').value.trim();

    var ok = true;
    ok = validateField('cName', 'errCName', name.length >= 2, 'Name is required.') && ok;
    ok = validateField('cEmail', 'errCEmail', isEmail(email), 'A valid email is required.') && ok;
    ok = validateField('cMessage', 'errCMessage', message.length >= 5, 'Message is required.') && ok;
    if (!ok) { toast('Please fix the highlighted fields.', true); return; }

    var subject = 'RAVAGE ERA GUILD QUERY';
    var body = [
      'RAVAGE ERA WEBSITE QUERY',
      '',
      'Name: ' + name,
      'Email: ' + email,
      '',
      'Message:',
      message
    ].join('\n');

    window.location.href = 'mailto:' + GUILD_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    toast('Opening your email app with the query pre-filled...');
  });

  /* Option B: WhatsApp */
  $('#waForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#wName').value.trim();
    var phone = $('#wPhone').value.trim();
    var message = $('#wMessage').value.trim();

    var ok = true;
    ok = validateField('wName', 'errWName', name.length >= 2, 'Name is required.') && ok;
    ok = validateField('wPhone', 'errWPhone', isPhone(phone), 'A valid phone number is required.') && ok;
    ok = validateField('wMessage', 'errWMessage', message.length >= 5, 'Message is required.') && ok;
    if (!ok) { toast('Please fix the highlighted fields.', true); return; }

    var msg = [
      'RAVAGE ERA WEBSITE QUERY',
      '',
      'Name: ' + name,
      'Phone: ' + phone,
      'Message: ' + message
    ].join('\n');
    openWa(ZEUS_WA, msg);
    toast('WhatsApp opened — your query is ready. Press Send.');
  });

  /* ---------------- Gallery ---------------- */

  var galIndex = 0;
  var galFeatured = $('#galFeatured');
  var galLabel = $('#galLabel');
  var galCounter = $('#galCounter');

  function renderGallery() {
    var g = ASSETS[galIndex];
    galFeatured.src = g.src;
    galFeatured.setAttribute('data-label', g.label);
    galLabel.textContent = g.label;
    galCounter.textContent = (galIndex + 1) + ' / ' + ASSETS.length;
    $$('.gal-thumb').forEach(function (t, i) {
      t.classList.toggle('active', i === galIndex);
    });
  }

  $('#galThumbs').innerHTML = ASSETS.map(function (g, i) {
    return '<button class="gal-thumb" data-i="' + i + '" aria-label="' + g.label + '">' +
      '<img src="' + g.src + '" data-label="' + g.label + '" alt="' + g.label + '"></button>';
  }).join('');

  function galStep(dir) {
    galIndex = (galIndex + dir + ASSETS.length) % ASSETS.length;
    renderGallery();
  }

  $('#btnGalPrev').addEventListener('click', function () { galStep(-1); });
  $('#btnGalNext').addEventListener('click', function () { galStep(1); });

  $('#galThumbs').addEventListener('click', function (e) {
    var t = e.target.closest('.gal-thumb');
    if (t) { galIndex = parseInt(t.dataset.i, 10); renderGallery(); }
  });

  /* swipe */
  var touchX = null;
  var galMain = $('#galMain');
  galMain.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  galMain.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) galStep(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* fullscreen */
  $('#btnGalFull').addEventListener('click', function () {
    var g = ASSETS[galIndex];
    $('#galModalImg').src = g.src;
    $('#galModalImg').setAttribute('data-label', g.label);
    $('#galModalLabel').textContent = g.label;
    openModal('modalGallery');
  });
  $('#btnGalModalClose').addEventListener('click', function () { closeModal('modalGallery'); });

  renderGallery();

  /* ---------------- Profiles ---------------- */

  $('#profilesGrid').innerHTML = ASSETS.map(function (g, i) {
    return (
      '<article class="profile-card">' +
        '<img class="p-img" src="' + g.src + '" data-label="' + g.label + '" alt="' + g.label + '" loading="lazy">' +
        '<div class="p-body">' +
          '<div class="p-badges"><span>PROFILE</span><span>GALLERY</span></div>' +
          '<h4>' + g.label + '</h4>' +
          '<button class="btn btn-gold btn-sm" data-view="' + i + '">VIEW</button>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  $('#profilesGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-view]');
    if (!btn) return;
    var g = ASSETS[parseInt(btn.dataset.view, 10)];
    $('#profModalImg').src = g.src;
    $('#profModalImg').setAttribute('data-label', g.label);
    $('#profModalLabel').textContent = g.label;
    openModal('modalProfile');
  });
  $('#btnProfModalClose').addEventListener('click', function () { closeModal('modalProfile'); });

  /* ---------------- Modal close behaviour ---------------- */

  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m) closeModal(m.id);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
  });

  /* ---------------- Particles ---------------- */

  var fx = $('#fx');
  var fctx = fx.getContext('2d');
  var parts = [];
  var fxW = 0, fxH = 0;
  var fxRunning = true;
  var COLORS = ['245,197,66', '226,51,58', '123,63,228'];

  function sizeFx() {
    fxW = fx.width = window.innerWidth;
    fxH = fx.height = window.innerHeight;
  }
  function makePart() {
    return {
      x: Math.random() * fxW,
      y: Math.random() * fxH,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.38 + 0.08),
      a: Math.random() * 0.5 + 0.1,
      c: COLORS[(Math.random() * COLORS.length) | 0]
    };
  }
  function initParts() {
    var n = Math.min(50, Math.max(18, Math.floor(fxW * fxH / 24000)));
    parts = [];
    for (var i = 0; i < n; i++) parts.push(makePart());
  }
  function tick() {
    fctx.clearRect(0, 0, fxW, fxH);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.y < -8) { p.y = fxH + 8; p.x = Math.random() * fxW; }
      if (p.x < -8) p.x = fxW + 8;
      if (p.x > fxW + 8) p.x = -8;
      fctx.beginPath();
      fctx.arc(p.x, p.y, p.r * 3, 0, 6.2832);
      fctx.fillStyle = 'rgba(' + p.c + ',' + (p.a * 0.18) + ')';
      fctx.fill();
      fctx.beginPath();
      fctx.arc(p.x, p.y, p.r, 0, 6.2832);
      fctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
      fctx.fill();
    }
    if (fxRunning) requestAnimationFrame(tick);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sizeFx();
    initParts();
    tick();
  } else {
    fx.style.display = 'none';
  }
  window.addEventListener('resize', function () { sizeFx(); initParts(); });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { fxRunning = false; }
    else if (!fxRunning && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fxRunning = true; tick();
    }
  });

  /* ---------------- Loader ---------------- */

  function hideLoader() {
    var l = $('#loader');
    if (l && !l.classList.contains('hide')) {
      l.classList.add('hide');
      setTimeout(function () { l.remove(); }, 600);
    }
  }
  if (document.readyState === 'complete') { hideLoader(); }
  else { window.addEventListener('load', hideLoader); }
  setTimeout(hideLoader, 1500); /* safety */

  /* ---------------- Init ---------------- */

  render();
})();
