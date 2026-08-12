/* ============================================================
   RAVAGE ERA — GUILD HUB  |  main.js  (v2 — Guild Hub OS)
   Hash-router SPA + boot sequence + terminal + cloud + widgets
   ============================================================ */
(function () {
  'use strict';

  /* ==========================================================
     EDIT ME — GUILD DATA  (update numbers/members here)
     ========================================================== */

  var SECRET = '800012';                 // frontend access gate only
  var ZEUS_WA = '2349066760078';
  var GUILD_EMAIL = 'ge5853987@gmail.com';

  var GUILD_STATS = [
    { num: 48,     suffix: '',  label: 'GUILD MATES' },
    { num: 5000,   suffix: '+', label: 'MATCHES PLAYED' },
    { num: 10,     suffix: '+', label: 'TRYOUTS RECEIVED' },
    { num: null,   suffix: '',  label: 'MONTHS STRONG' } // computed from founding date
  ];
  var FOUNDED = { month: 3, year: 2025 }; // March 2025

  var ANNOUNCEMENTS = [
    { date: 'THIS WEEK', warn: true, title: 'GUILD POINTS WARNING',
      body: 'Any guild mate with less than 1,000 guild points at the end of the week will be removed. Earn your points, warriors.' },
    { date: 'UPCOMING', warn: false, title: 'GUILD TOURNAMENT',
      body: 'Tournament hosted by Assistant Guild Leader KAGURA at 5:30 PM Nigerian time. All squads report in.' },
    { date: 'NEWS', warn: false, title: 'THE SQUAD IS GROWING',
      body: 'RAVAGE ERA is 48 warriors strong with 5,000+ matches played. We Stand United.' }
  ];

  var TOURNAMENT = { hour: 17, minute: 30, offset: 1 }; // 5:30 PM WAT (UTC+1)

  var MVP_LIST = [
    { name: 'SLICK BOY', tag: 'GUILD LEADER', desc: 'Founder of RAVAGE ERA. The one who started it all and keeps the guild on course.' },
    { name: 'KAGURA', tag: 'ASSISTANT GUILD LEADER', desc: 'Coordinates the guild and hosts our tournaments. The engine behind guild events.' },
    { name: 'RE DANNY', tag: 'ELDER', desc: 'Part of the first squad. Experience and consistency in every lobby.' },
    { name: 'HAPEX', tag: 'ELDER', desc: 'Keeps the community strong and the environment welcoming for every warrior.' }
  ];

  var TIMELINE = [
    { date: 'MARCH 2025', title: 'THE FOUNDING', body: 'RAVAGE ERA was founded by SLICK BOY with a vision: a guild built on trust, skill and loyalty.' },
    { date: 'MARCH 2025', title: 'THE FIRST SQUAD', body: 'The first squad was formed: SLICK, DANNY and KAGURA — the core that the guild was built around.' },
    { date: '2025 — 2026', title: 'GROWTH & RECRUITMENT', body: 'Tryouts opened and warriors joined from everywhere. The guild grew into a real community.' },
    { date: 'TODAY', title: 'THE CURRENT ERA', body: '48 warriors strong, 5,000+ matches across BR, Clash Squad and guild wars — and we keep climbing.' }
  ];

  var SKILLS = [
    { label: 'RUSH',      pct: 92, note: 'Main playstyle — we push hard.' },
    { label: 'SUPPORT',   pct: 78, note: 'Covering fire and callouts.' },
    { label: 'SNIPER',    pct: 64, note: 'Our web developer is the sniper guy.' },
    { label: 'LEADERSHIP', pct: 85, note: 'Squad leads and elders keep order.' }
  ];

  var FAQ = [
    { q: 'How do I join RAVAGE ERA?',
      a: 'Go to the TRYOUTS page, fill in your details, select an administrator and send the prepared WhatsApp message. Our admins will review your application.' },
    { q: 'What are the guild requirements?',
      a: 'Active participation, teamwork, respect, consistency — and at least 1,000 guild points per week.' },
    { q: 'What happens if I have less than 1,000 guild points?',
      a: 'Any guild mate with less than 1,000 guild points at the end of the week will be removed from the guild.' },
    { q: 'Is the Spin & Win guaranteed by Garena / Free Fire?',
      a: 'No. It is a RAVAGE ERA community promotion only. Garena / Free Fire does not officially guarantee these rewards and this website does not modify Free Fire accounts.' },
    { q: 'Does this website add likes or profile visits itself?',
      a: 'No. The LIKES & VISITS page only prepares a request message for our web developer / admin, who handles the service outside the game.' },
    { q: 'Who built this website?',
      a: 'EMMEX / ZEUS — the RAVAGE ERA web developer. He designed and maintains the Guild Hub and connects all of the guild\u2019s community services into one organized platform.' }
  ];

  var TERM_COMMANDS = {
    help:    'Available commands: help · whoami · guild · admins · tryouts · spin · rules · booyah · slick · kagura · danny · hapex · zeus · clear',
    whoami:  '> RAVAGER // WARRIOR // MEMBER OF RAVAGE ERA.\n> We Stand United.',
    guild:   '> RAVAGE ERA — competitive Free Fire guild.\n> 48 warriors · 5,000+ matches · founded March 2025 by SLICK BOY.\n> Visit the GUILD page for the full story.',
    admins:  '> GUILD LEADER: RE SLICK\n> ASSISTANT LEADER: KAGURA\n> ELDERS: MARPHY, HAPEX, RE DANNY\n> MVP: RE ZEUS\n> WEB DEV: EMMEX / ZEUS\n> Full profiles on the ADMINS page.',
    tryouts: '> Think you have what it takes?\n> Submit your application on the TRYOUTS page and an admin will review it.',
    spin:    '> SPIN & WIN — community promotion (₦4,000 / $2).\n> Rewards: EMOTE · BOOYAH PASS · GUN SKIN. Access on the SPIN page.',
    rules:   '> THE WARRIOR\u2019S CODE:\n> 01 WE STAND UNITED\n> 02 EARN YOUR POINTS (min 1,000/week)\n> 03 RESPECT EVERY WARRIOR\n> 04 REPRESENT WITH PRIDE\n> 05 SHOW UP',
    booyah:  'BOOYAH! 🔥🔥🔥 WE STAND UNITED!',
    slick:   '> SLICK BOY — Guild Leader. Founder of RAVAGE ERA. The direction, discipline and identity of the guild run through him.',
    kagura:  '> KAGURA — Assistant Guild Leader. Coordinates members and hosts the guild tournaments (5:30 PM Nigerian time).',
    danny:   '> RE DANNY — Elder. Part of the founding squad (SLICK, DANNY, KAGURA). Experience and support.',
    hapex:   '> HAPEX — Elder. Known for contributing to the community and keeping the guild welcoming.',
    zeus:    '> EMMEX / ZEUS — Web Developer. The sniper guy who built this Guild Hub. WhatsApp: 09066760078',
    clear:   null
  };

  var CLOUD_WORDS = ['BOOYAH', 'RUSH', 'CLUTCH', 'SNIPER', 'HEADSHOT', 'RANKED', 'SQUAD', 'BOOYAH PASS', 'GUN SKIN', 'WARRIOR', 'GLORY', 'UNITED', 'TRYOUT', 'LEGEND', 'ERA', 'VICTORY', 'RAGER', 'ELITE'];

  /* ---------------- Placeholder RE images (no photo files needed) ---------------- */

  function reImage(label, big) {
    var t = encodeURIComponent(label || 'GUILD HUB');
    var w = big ? 900 : 640;
    var h = big ? 900 : 640;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#141824"/><stop offset="1" stop-color="#06070a"/>' +
      '</linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
      '<rect x="24" y="24" width="' + (w - 48) + '" height="' + (h - 48) + '" fill="none" stroke="#f5c542" stroke-opacity=".45" stroke-width="2"/>' +
      '<circle cx="' + (w / 2) + '" cy="' + (h / 2 - 60) + '" r="' + (big ? 150 : 110) + '" fill="none" stroke="#f5c542" stroke-opacity=".35" stroke-width="2"/>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 - 20) + '" font-family="Arial, sans-serif" font-size="' + (big ? 120 : 90) + '" font-weight="900" fill="#f5c542" text-anchor="middle">RE</text>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 + 90) + '" font-family="Arial, sans-serif" font-size="' + (big ? 34 : 24) + '" font-weight="700" fill="#e8e6df" text-anchor="middle" letter-spacing="6">RAVAGE ERA</text>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 + 140) + '" font-family="Arial, sans-serif" font-size="' + (big ? 20 : 15) + '" fill="#9aa0ad" text-anchor="middle" letter-spacing="3">' + t + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var ASSETS = [
    { src: reImage('PROFILE 01'), label: 'RAVAGE ERA PROFILE 01' },
    { src: reImage('PROFILE 02'), label: 'RAVAGE ERA PROFILE 02' },
    { src: reImage('PROFILE 03'), label: 'RAVAGE ERA PROFILE 03' },
    { src: reImage('PROFILE 04'), label: 'RAVAGE ERA PROFILE 04' },
    { src: reImage('PROFILE 05'), label: 'RAVAGE ERA PROFILE 05' },
    { src: reImage('THE GUILD', true), label: 'RAVAGE ERA GUILD' },
    { src: reImage('PROFILE 07'), label: 'RAVAGE ERA PROFILE 07' },
    { src: reImage('PROFILE 08'), label: 'RAVAGE ERA PROFILE 08' }
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
      void input.offsetWidth;
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
    if (!win) { window.location.href = url; }
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
    if (m) m.classList.remove('show');
    if (!$$('.modal.show').length) document.body.classList.remove('modal-open');
  }
  function closeAllModals() {
    $$('.modal').forEach(function (m) { m.classList.remove('show'); });
    document.body.classList.remove('modal-open');
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Image error fallback ---------------- */

  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img && img.tagName === 'IMG' && !img.dataset.fbk) {
      img.dataset.fbk = '1';
      img.src = reImage(img.getAttribute('data-label') || 'GUILD HUB');
    }
  }, true);

  /* ==========================================================
     BOOT SEQUENCE
     ========================================================== */

  var boot = $('#boot');
  var bootLog = $('#bootLog');
  var bootTimers = [];
  var bootDone = false;

  var BOOT_LINES = [
    '> INITIALIZING RAVAGE ERA SYSTEMS...',
    '> LOADING GUILD DATA ............ <span class="ok">OK</span>',
    '> SYNCING SQUAD ROSTER (48 MEMBERS) <span class="ok">OK</span>',
    '> CALIBRATING AIM ............... <span class="ok">OK</span>',
    '> CHARGING BOOYAH PROTOCOL ...... <span class="ok">OK</span>',
    '> ENCRYPTING WARRIOR COMMS ....... <span class="ok">OK</span>',
    '> <span class="gold">ACCESS GRANTED — WE STAND UNITED.</span>'
  ];

  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    bootTimers.forEach(clearTimeout);
    try { sessionStorage.setItem('re_booted', '1'); } catch (e) {}
    boot.classList.add('hide');
    setTimeout(function () { if (boot.parentNode) boot.parentNode.removeChild(boot); }, 600);
  }

  $('#bootSkip').addEventListener('click', finishBoot);

  (function runBoot() {
    if (sessionStorage.getItem('re_booted') === '1') { finishBoot(); return; }
    bootLog.innerHTML = '';
    BOOT_LINES.forEach(function (line, i) {
      bootTimers.push(setTimeout(function () {
        var div = document.createElement('div');
        div.innerHTML = line;
        bootLog.appendChild(div);
        bootLog.scrollTop = bootLog.scrollHeight;
      }, 260 + i * 330));
    });
    bootTimers.push(setTimeout(finishBoot, 260 + BOOT_LINES.length * 330 + 500));
  })();

  /* ==========================================================
     ROUTER
     ========================================================== */

  function getRoute() {
    var h = location.hash.replace(/^#\/?/, '').split('?')[0];
    return ROUTES.indexOf(h) !== -1 ? h : 'tryouts';
  }

  function render() {
    var route = getRoute();
    $$('.page').forEach(function (sec) {
      sec.classList.toggle('active', sec.dataset.page === route);
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

  /* ==========================================================
     HOME — TYPEWRITER
     ========================================================== */

  var TYPED = [
    'WE STAND UNITED.',
    'Built by warriors. United by RAVAGE.',
    'Drop in. Squad up. Booyah.',
    'Think you have what it takes?',
    '5,000+ matches. One guild. Zero doubts.'
  ];

  (function typewriter() {
    var el = $('#twText');
    if (!el) return;
    if (reducedMotion) { el.textContent = TYPED[0]; return; }
    var pi = 0, ci = 0, deleting = false;
    (function step() {
      var phrase = TYPED[pi];
      el.textContent = phrase.slice(0, ci);
      var delay = deleting ? 20 : 46;
      if (!deleting) {
        if (ci < phrase.length) { ci++; setTimeout(step, delay); return; }
        deleting = true; setTimeout(step, 1900); return;
      }
      if (ci > 0) { ci--; setTimeout(step, delay); return; }
      deleting = false;
      pi = (pi + 1) % TYPED.length;
      setTimeout(step, 350);
    })();
  })();

  /* ==========================================================
     HOME — STATS COUNTERS
     ========================================================== */

  function monthsSince(m, y) {
    var now = new Date();
    var d = new Date(y, m - 1, 1);
    return Math.max(0, (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth()));
  }

  function animateCount(el, target, suffix, duration) {
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  (function buildStats() {
    var grid = $('#statsGrid');
    if (!grid) return;
    var stats = GUILD_STATS.map(function (s) {
      var num = s.num === null ? monthsSince(FOUNDED.month, FOUNDED.year) : s.num;
      return '<div class="stat-card"><div class="stat-num" data-num="' + num + '" data-suffix="' + s.suffix + '">0</div><span class="stat-label">' + s.label + '</span></div>';
    }).join('');
    grid.innerHTML = stats;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var card = en.target;
        var numEl = card.querySelector('.stat-num');
        animateCount(numEl, parseInt(numEl.dataset.num, 10), numEl.dataset.suffix, 1400);
        io.unobserve(card);
      });
    }, { threshold: 0.4 });
    $$('.stat-card').forEach(function (c) { io.observe(c); });
  })();

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

  /* ---------------- Announcements ---------------- */

  $('#announceList').innerHTML = ANNOUNCEMENTS.map(function (a) {
    return (
      '<div class="announce-item' + (a.warn ? ' warn' : '') + '">' +
        '<span class="announce-date">' + a.date + '</span>' +
        '<div><h4>' + a.title + '</h4><p>' + a.body + '</p></div>' +
      '</div>'
    );
  }).join('');

  /* ---------------- Tournament countdown ---------------- */

  function nextTournament() {
    var now = new Date();
    var t = new Date(now);
    t.setUTCHours(TOURNAMENT.hour - TOURNAMENT.offset, TOURNAMENT.minute, 0, 0);
    if (t <= now) t.setUTCDate(t.getUTCDate() + 1);
    return t;
  }

  (function countdown() {
    var cdD = $('#cdDays'), cdH = $('#cdHours'), cdM = $('#cdMins'), cdS = $('#cdSecs');
    if (!cdD) return;
    var liveNote = null;
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = nextTournament() - new Date();
      if (diff <= 0) {
        cdD.textContent = '00'; cdH.textContent = '00'; cdM.textContent = '00'; cdS.textContent = '00';
        if (!liveNote) {
          liveNote = document.createElement('div');
          liveNote.className = 'countdown-live';
          liveNote.textContent = '● TOURNAMENT LIVE — REPORT IN, WARRIORS!';
          $('#countdown').appendChild(liveNote);
        }
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor(diff % 86400000 / 3600000);
      var m = Math.floor(diff % 3600000 / 60000);
      var s = Math.floor(diff % 60000 / 1000);
      cdD.textContent = pad(d); cdH.textContent = pad(h); cdM.textContent = pad(m); cdS.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ---------------- MVP of the week ---------------- */

  (function mvp() {
    var card = $('#mvpCard'), dots = $('#mvpDots');
    if (!card) return;
    var idx = 0, timer = null;

    function renderMvp() {
      var m = MVP_LIST[idx];
      card.style.animation = 'none';
      void card.offsetWidth;
      card.style.animation = '';
      card.innerHTML =
        '<div class="mvp-avatar">' + initials(m.name) + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div class="mvp-tag">★ MVP OF THE WEEK</div>' +
          '<h4>' + m.name + '</h4>' +
          '<p>' + m.tag + ' — ' + m.desc + '</p>' +
        '</div>';
      $$('.mvp-dot', dots).forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    }

    dots.innerHTML = MVP_LIST.map(function (_, i) {
      return '<button class="mvp-dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" aria-label="MVP ' + (i + 1) + '"></button>';
    }).join('');

    dots.addEventListener('click', function (e) {
      var d = e.target.closest('.mvp-dot');
      if (!d) return;
      idx = parseInt(d.dataset.i, 10);
      renderMvp();
      restart();
    });

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        idx = (idx + 1) % MVP_LIST.length;
        renderMvp();
      }, 5000);
    }

    card.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    card.addEventListener('mouseleave', restart);

    renderMvp();
    restart();
  })();

  /* ==========================================================
     INTERACTIVE TERMINAL
     ========================================================== */

  (function terminal() {
    var out = $('#termOut'), input = $('#termInput'), tags = $('#termTags');
    if (!out) return;

    function line(html, cls) {
      var div = document.createElement('div');
      if (cls) div.className = cls;
      div.innerHTML = html;
      out.appendChild(div);
      out.scrollTop = out.scrollHeight;
    }
    function greet() {
      line('<span class="t-dim">Welcome to the RAVAGE ERA Command Center.</span>');
      line("<span class='t-dim'>Type 'help' to list commands, or click a quick tag.</span>");
      line('');
    }

    function run(cmdRaw) {
      var cmd = String(cmdRaw || '').trim().toLowerCase();
      line('<span class="t-cmd">RE@RAVAGE-ERA:~$ ' + cmd + '</span>');
      if (!cmd) { line('<span class="t-dim">Type a command. (help)</span>'); return; }
      if (cmd === 'clear') { out.innerHTML = ''; return; }
      var res = TERM_COMMANDS[cmd];
      if (res === undefined) {
        line("<span class='t-err'>command not found: " + cmd + "</span>");
        line("<span class='t-dim'>Type 'help' to see available commands.</span>");
        return;
      }
      res.split('\n').forEach(function (r) {
        line(r.replace(/^> ?/, ''), /BOOYAH/.test(r) ? 't-ok' : '');
      });
      line('');
    }

    tags.innerHTML = ['help', 'whoami', 'guild', 'admins', 'rules', 'booyah', 'clear'].map(function (c) {
      return '<button class="term-tag" data-cmd="' + c + '" type="button">' + c + '</button>';
    }).join('');

    tags.addEventListener('click', function (e) {
      var t = e.target.closest('.term-tag');
      if (t) run(t.dataset.cmd);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { run(input.value); input.value = ''; }
    });

    greet();
    run('help');
  })();

  /* ==========================================================
     DRAGGABLE BOOYAH CLOUD (3D sphere)
     ========================================================== */

  (function cloud() {
    var wrap = $('#cloudWrap'), sphere = $('#cloudSphere');
    if (!sphere) return;

    var words = CLOUD_WORDS.slice(0, 20);
    var n = words.length;
    var R = 135;
    var pts = [];
    var golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = 1 - (i / (n - 1)) * 2;
      var rad = Math.sqrt(1 - y * y);
      var th = golden * i;
      pts.push({ x: Math.cos(th) * rad, y: y, z: Math.sin(th) * rad });
    }

    sphere.innerHTML = words.map(function (w) {
      return '<span class="cloud-word">' + w + '</span>';
    }).join('');
    var els = $$('.cloud-word', sphere);

    var rx = -0.35, ry = 0.6;
    var autoSpeed = 0.0016;
    var dragging = false, lastX = 0, lastY = 0;
    var running = true;

    function renderFrame() {
      if (!dragging && !reducedMotion) { ry += autoSpeed; rx += autoSpeed * 0.35; }
      var depthSum = 0;
      for (i = 0; i < n; i++) {
        var p = pts[i];
        var x1 = p.x * Math.cos(ry) + p.z * Math.sin(ry);
        var z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
        var y2 = p.y * Math.cos(rx) - z1 * Math.sin(rx);
        var z2 = p.y * Math.sin(rx) + z1 * Math.cos(rx);
        var depth = (z2 + 1) / 2;
        depthSum += depth;
        var scale = 0.72 + depth * 0.55;
        var el = els[i];
        el.style.transform = 'translate(-50%,-50%) translate3d(' + (x1 * R) + 'px,' + (y2 * R) + 'px,' + (z2 * R) + 'px) scale(' + scale + ')';
        el.style.opacity = (0.35 + depth * 0.65).toFixed(2);
        el.style.zIndex = Math.round(depth * 100);
        el.style.fontSize = (12 + depth * 5) + 'px';
      }
      if (running && !reducedMotion) requestAnimationFrame(renderFrame);
    }

    if (reducedMotion) { renderFrame(); return; }

    wrap.addEventListener('pointerdown', function (e) {
      dragging = true;
      lastX = e.clientX; lastY = e.clientY;
      wrap.setPointerCapture(e.pointerId);
    });
    wrap.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      ry += (e.clientX - lastX) * 0.005;
      rx += (e.clientY - lastY) * 0.005;
      lastX = e.clientX; lastY = e.clientY;
    });
    wrap.addEventListener('pointerup', function () { dragging = false; });
    wrap.addEventListener('pointercancel', function () { dragging = false; });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; renderFrame(); }
    });

    renderFrame();
  })();

  /* ==========================================================
     GUILD — TIMELINE + SKILLS
     ========================================================== */

  $('#timeline').innerHTML = TIMELINE.map(function (t) {
    return (
      '<div class="tl-item">' +
        '<div class="tl-date">' + t.date + '</div>' +
        '<h4>' + t.title + '</h4>' +
        '<p>' + t.body + '</p>' +
      '</div>'
    );
  }).join('');

  (function skills() {
    var list = $('#skillsList');
    if (!list) return;
    list.innerHTML = SKILLS.map(function (s) {
      return (
        '<div class="skill-row" data-pct="' + s.pct + '">' +
          '<div class="sk-head"><span>' + s.label + '</span><span>' + s.pct + '%</span></div>' +
          '<div class="sk-bar"><div class="sk-fill"></div></div>' +
          '<small class="hint">' + s.note + '</small>' +
        '</div>'
      );
    }).join('');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var fill = en.target.querySelector('.sk-fill');
        fill.style.width = en.target.dataset.pct + '%';
        io.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    $$('.skill-row', list).forEach(function (r) { io.observe(r); });
  })();

  /* ==========================================================
     ADMINS
     ========================================================== */

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
        '<button class="' + btnCls + '" ' + data + '="' + a.wa + '" type="button">' + btnLabel + '</button>' +
      '</article>'
    );
  }

  renderAdminsGrid($('#adminsGrid'), 'contact');
  renderAdminsGrid($('#tryoutAdminGrid'), 'select');

  function renderAdminsGrid(el, mode) {
    el.innerHTML = ADMINS.map(function (a) { return adminCardHTML(a, mode); }).join('');
  }

  $('#adminsGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-contact-admin]');
    if (btn) {
      var a = ADMINS.filter(function (x) { return x.wa === btn.dataset.contactAdmin; })[0];
      if (a) { openWa(a.wa); toast('WhatsApp opened for ' + a.name); }
    }
  });

  /* ==========================================================
     TRYOUTS
     ========================================================== */

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

  /* ==========================================================
     SPIN & WIN
     ========================================================== */

  var REEL_ITEMS = [
    { icon: '🎭', label: 'EMOTE' },
    { icon: '🎫', label: 'BOOYAH PASS' },
    { icon: '🔫', label: 'GUN SKIN' }
  ];
  var REEL_ITEM_H = 88;
  var spinUidValue = '';
  var spinShotFile = null;

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

    var btn = this;
    btn.disabled = true;
    btn.textContent = 'SPINNING...';

    var tracks = $$('#spinReels .reel-track');
    var loops = [9, 10, 11];
    tracks.forEach(function (t) {
      t.style.transition = 'none';
      t.style.transform = 'translateY(0)';
    });
    void tracks[0].offsetWidth;

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

  /* ==========================================================
     LIKES & VISITS
     ========================================================== */

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

  /* ==========================================================
     CONTACT
     ========================================================== */

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

  /* ==========================================================
     FAQ (accordion)
     ========================================================== */

  (function faq() {
    var list = $('#faqList');
    if (!list) return;
    list.innerHTML = FAQ.map(function (f, i) {
      return (
        '<div class="faq-item">' +
          '<button class="faq-q" type="button" data-i="' + i + '">' +
            '<span>' + f.q + '</span><span class="faq-x">+</span>' +
          '</button>' +
          '<div class="faq-a">' + f.a + '</div>' +
        '</div>'
      );
    }).join('');

    list.addEventListener('click', function (e) {
      var q = e.target.closest('.faq-q');
      if (!q) return;
      var item = q.parentNode;
      var wasOpen = item.classList.contains('open');
      $$('.faq-item', list).forEach(function (it) { it.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  })();

  /* ==========================================================
     GALLERY
     ========================================================== */

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
    return '<button class="gal-thumb" data-i="' + i + '" aria-label="' + g.label + '" type="button">' +
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

  var touchX = null;
  var galMain = $('#galMain');
  galMain.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  galMain.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) galStep(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  $('#btnGalFull').addEventListener('click', function () {
    var g = ASSETS[galIndex];
    $('#galModalImg').src = g.src;
    $('#galModalImg').setAttribute('data-label', g.label);
    $('#galModalLabel').textContent = g.label;
    openModal('modalGallery');
  });
  $('#btnGalModalClose').addEventListener('click', function () { closeModal('modalGallery'); });

  renderGallery();

  /* ==========================================================
     PROFILES
     ========================================================== */

  $('#profilesGrid').innerHTML = ASSETS.map(function (g, i) {
    return (
      '<article class="profile-card">' +
        '<img class="p-img" src="' + g.src + '" data-label="' + g.label + '" alt="' + g.label + '" loading="lazy">' +
        '<div class="p-body">' +
          '<div class="p-badges"><span>PROFILE</span><span>GALLERY</span></div>' +
          '<h4>' + g.label + '</h4>' +
          '<button class="btn btn-gold btn-sm" data-view="' + i + '" type="button">VIEW</button>' +
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

  /* ==========================================================
     MODAL CLOSE BEHAVIOUR
     ========================================================== */

  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m) closeModal(m.id);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
  });

  /* ==========================================================
     PARTICLES
     ========================================================== */

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
    if (fxRunning && !document.hidden) requestAnimationFrame(tick);
  }

  if (!reducedMotion) {
    sizeFx();
    initParts();
    tick();
  } else {
    fx.style.display = 'none';
  }
  window.addEventListener('resize', function () { sizeFx(); initParts(); });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !reducedMotion && fxRunning) tick();
  });

  /* ==========================================================
     INIT
     ========================================================== */

  render();
})();
