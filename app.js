(function () {
  'use strict';

  // ───────────────────────── Données ─────────────────────────

  var POSTES = {
    pcr:   { label: 'PCR',   color: '#2e7df5' },
    regul: { label: 'Régul', color: '#f28c29' },
    j1:    { label: 'J+1',   color: '#21b573' }
  };
  var SHIFTS = {
    matin: { agents: 3, postes: ['pcr', 'regul', 'j1'] },
    aprem: { agents: 2, postes: ['pcr', 'regul'] }
  };
  var MODES = ['dice', 'wheel', 'ball'];

  // Gages (= relance). Un gage tiré ne ressort plus de la journée (sur ce téléphone).
  var JOKES = [{"t": "Rejoue", "e": "🎲", "s": "Rejoue", "m": "Rejoue !"}, {"t": "Rentre chez toi", "e": "🏠", "s": "Maison", "m": "Tu peux rentrer chez toi…\nmais non 😄 Relance !"}, {"t": "Tu paies les croissants", "e": "🥐", "s": "Croissants", "m": "Demain, les croissants c'est pour toi 🥐\nRelance !"}, {"t": "Tu paies les cafés", "e": "☕", "s": "Cafés", "m": "Les cafés sont pour toi ☕\nRelance !"}, {"t": "Sieste accordée", "e": "😴", "s": "Sieste", "m": "Sieste accordée… dans tes rêves 😴\nRelance !"}, {"t": "Retard ATFM", "e": "⏳", "s": "ATFM", "m": "Slot ATFM : ton poste est retardé ⏳\nRelance !"}, {"t": "CAVOK", "e": "☀️", "s": "CAVOK", "m": "Ciel dégagé, mais toujours pas de poste ☀️\nRelance !"}, {"t": "Remise de gaz", "e": "🛫", "s": "Remise de gaz", "m": "Approche ratée, remise de gaz 🛫\nRelance !"}, {"t": "Pas de bol", "e": "🍀", "s": "Pas de bol", "m": "Pas de bol… 🍀\nRelance !"}, {"t": "Tu ranges la salle", "e": "🧹", "s": "Ménage", "m": "La salle de pause te remercie 🧹\nRelance !"}, {"t": "Les vacances ?", "e": "🏖️", "s": "Vacances", "m": "Les vacances, c'est pas pour tout de suite 🏖️\nRelance !"}, {"t": "Raté !", "e": "🙈", "s": "Raté", "m": "Raté ! 🙈\nRelance !"}, {"t": "Le chef a dit non", "e": "🙅", "s": "Chef", "m": "Le chef a dit non 🙅\nRelance !"}, {"t": "Pain au chocolat", "e": "🍫", "s": "Chocolat", "m": "Pain au chocolat, pas chocolatine 🍫\nRelance !"}, {"t": "Bouchon sur l'A7", "e": "🚗", "s": "A7", "m": "Coincé dans les bouchons 🚗\nRelance !"}, {"t": "Mistral", "e": "💨", "s": "Mistral", "m": "Le mistral a emporté ton poste 💨\nRelance !"}, {"t": "Piste fermée", "e": "🚧", "s": "Piste fermée", "m": "Piste fermée pour balayage 🚧\nRelance !"}, {"t": "Go-around", "e": "🔄", "s": "Go-around", "m": "Go-around ! On refait un tour 🔄\nRelance !"}, {"t": "Brouillard", "e": "🌫️", "s": "Brouillard", "m": "Visibilité nulle, on n'y voit rien 🌫️\nRelance !"}, {"t": "Péril aviaire", "e": "🐦", "s": "Oiseaux", "m": "Péril aviaire sur le dé 🐦\nRelance !"}, {"t": "Vol annulé", "e": "❌", "s": "Annulé", "m": "Vol annulé, poste annulé ❌\nRelance !"}, {"t": "Bagage perdu", "e": "🧳", "s": "Bagage", "m": "Ton poste est resté sur le tapis 🧳\nRelance !"}, {"t": "Tu fais la vaisselle", "e": "🍽️", "s": "Vaisselle", "m": "La vaisselle de la salle de pause t'attend 🍽️\nRelance !"}, {"t": "Pastis à 18h", "e": "🥃", "s": "Pastis", "m": "C'est toi qui régales à l'apéro 🥃\nRelance !"}, {"t": "Pétanque", "e": "🎯", "s": "Pétanque", "m": "Tu tires ou tu pointes ? 🎯\nRelance !"}, {"t": "Allez l'OM", "e": "⚽", "s": "OM", "m": "Droit au but… mais pas cette fois ⚽\nRelance !"}, {"t": "Les cigales", "e": "🦗", "s": "Cigales", "m": "On n'entend que les cigales 🦗\nRelance !"}, {"t": "Panne de café", "e": "🫗", "s": "Plus de café", "m": "La machine à café est en panne 🫗\nRelance !"}, {"t": "Réunion surprise", "e": "📋", "s": "Réunion", "m": "Réunion surprise à 6h 📋\nRelance !"}, {"t": "Astreinte", "e": "📟", "s": "Astreinte", "m": "Tu prends l'astreinte du week-end 📟\nRelance !"}, {"t": "Double vacation", "e": "🔁", "s": "Doublé", "m": "Tu doubles ta vacation… non, on rigole 🔁\nRelance !"}, {"t": "Tu apportes le gâteau", "e": "🎂", "s": "Gâteau", "m": "Demain, gâteau pour toute l'équipe 🎂\nRelance !"}, {"t": "Parking P9", "e": "🅿️", "s": "P9", "m": "Va te garer au fond du P9 🅿️\nRelance !"}, {"t": "Navette en retard", "e": "🚌", "s": "Navette", "m": "La navette est encore en retard 🚌\nRelance !"}, {"t": "Badge oublié", "e": "🪪", "s": "Badge", "m": "Badge oublié, retour à la maison 🪪\nRelance !"}, {"t": "Radio en panne", "e": "📻", "s": "Radio HS", "m": "Plus de radio, plus de poste 📻\nRelance !"}, {"t": "Poste en dégivrage", "e": "❄️", "s": "Dégivrage", "m": "Ton poste est au dégivrage ❄️\nRelance !"}, {"t": "Push-back", "e": "🚜", "s": "Push-back", "m": "Push-back : on recule pour mieux relancer 🚜\nRelance !"}, {"t": "Turbulences", "e": "🎢", "s": "Turbulences", "m": "Zone de turbulences, attache ta ceinture 🎢\nRelance !"}, {"t": "Carburant minimum", "e": "⛽", "s": "Carburant", "m": "Minimum fuel : il te reste un lancer ⛽\nRelance !"}, {"t": "Déroutement", "e": "🧭", "s": "Dérouté", "m": "Dérouté sur Nice, reviens vite 🧭\nRelance !"}, {"t": "Grasse matinée", "e": "🛌", "s": "Grasse mat'", "m": "Retourne te coucher… dans tes rêves 🛌\nRelance !"}, {"t": "Tu sors les poubelles", "e": "🗑️", "s": "Poubelles", "m": "Les poubelles ne sortent pas toutes seules 🗑️\nRelance !"}, {"t": "Bouillabaisse", "e": "🐟", "s": "Bouillabaisse", "m": "Tu invites tout le monde à la bouillabaisse 🐟\nRelance !"}, {"t": "Coup de soleil", "e": "🥵", "s": "Canicule", "m": "Trop chaud pour travailler 🥵\nRelance !"}, {"t": "Le dé boude", "e": "😤", "s": "Boude", "m": "Le sort boude, insiste un peu 😤\nRelance !"}, {"t": "Presque !", "e": "🤏", "s": "Presque", "m": "C'était presque ça 🤏\nRelance !"}, {"t": "Joker", "e": "🃏", "s": "Joker", "m": "Joker ! Ça ne sert à rien, mais c'est joli 🃏\nRelance !"}, {"t": "Loto du jour", "e": "🎰", "s": "Loto", "m": "Perdu, comme au loto 🎰\nRelance !"}, {"t": "Chat noir", "e": "🐈‍⬛", "s": "Chat noir", "m": "Un chat noir vient de passer 🐈‍⬛\nRelance !"}];

  // null = gage. Dé : 6 faces (avant, droite, arrière, gauche, haut, bas), postes sur des faces adjacentes
  // pour que la vue de départ ne montre que des postes. Roulettes : 12 cases, postes et gages en alternance.
  function slots(shift, mode) {
    if (mode === 'dice') {
      return shift === 'matin' ? ['pcr', 'regul', null, null, 'j1', null] : ['pcr', 'regul', null, null, null, null];
    }
    return shift === 'matin'
      ? ['pcr', null, 'regul', null, 'j1', null, 'pcr', null, 'regul', null, 'j1', null]
      : ['pcr', null, 'regul', null, 'pcr', null, 'regul', null, 'pcr', null, 'regul', null];
  }

  // ───────────────────────── Stockage ─────────────────────────

  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* navigation privée */ } }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function usedJokes() {
    if (load('jokesDay') !== today()) return [];
    try { return JSON.parse(load('jokesUsed') || '[]'); } catch (e) { return []; }
  }
  function markJoke(title) {
    var used = usedJokes();
    if (used.indexOf(title) < 0) used.push(title);
    save('jokesDay', today());
    save('jokesUsed', JSON.stringify(used));
  }

  function shuffled(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function randomFaces(shift, mode) {
    // Les gages déjà tirés aujourd'hui passent en dernier : ils ne servent que si la réserve est épuisée
    var used = usedJokes();
    var pool = shuffled(JOKES.filter(function (j) { return used.indexOf(j.t) < 0; }))
      .concat(shuffled(JOKES.filter(function (j) { return used.indexOf(j.t) >= 0; })));
    return slots(shift, mode).map(function (p) { return p ? { poste: p } : { joke: pool.shift() }; });
  }

  // ───────────────────────── État ─────────────────────────

  var mode = MODES.indexOf(load('mode')) >= 0 ? load('mode') : 'dice';
  var current = 'matin';
  var rolling = false;
  var states = {};

  function newState(shift) {
    var names = [];
    for (var i = 0; i < SHIFTS[shift].agents; i++) names.push('');
    return { faces: randomFaces(shift, mode), taken: {}, assigned: [], turn: 0, lastFace: null, message: null, names: names };
  }
  function nameOf(st, i) { return st.names[i] || 'COA ' + (i + 1); }
  function isDone(shift) { return states[shift].assigned.length >= SHIFTS[shift].agents; }

  // ───────────────────────── Maths 3D (matrices 3×3, lignes) ─────────────────────────

  var I3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  function mul(a, b) {
    var r = [];
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
      r.push(a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j]);
    }
    return r;
  }
  function transpose(a) { return [a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]]; }
  function apply(a, v) {
    return [a[0] * v[0] + a[1] * v[1] + a[2] * v[2], a[3] * v[0] + a[4] * v[1] + a[5] * v[2], a[6] * v[0] + a[7] * v[1] + a[8] * v[2]];
  }
  function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, c, -s, 0, s, c]; }
  function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, s, 0, 1, 0, -s, 0, c]; }
  function rotAxis(u, a) {
    var c = Math.cos(a), s = Math.sin(a), t = 1 - c, x = u[0], y = u[1], z = u[2];
    return [t * x * x + c, t * x * y - s * z, t * x * z + s * y,
            t * x * y + s * z, t * y * y + c, t * y * z - s * x,
            t * x * z - s * y, t * y * z + s * x, t * z * z + c];
  }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function toAxisAngle(m) {
    var c = Math.max(-1, Math.min(1, (m[0] + m[4] + m[8] - 1) / 2)), angle = Math.acos(c);
    if (angle < 1e-4) return { axis: [0, 1, 0], angle: 0 };
    if (Math.PI - angle < 1e-3) {
      var x = Math.sqrt(Math.max(0, (m[0] + 1) / 2)), y = Math.sqrt(Math.max(0, (m[4] + 1) / 2)), z = Math.sqrt(Math.max(0, (m[8] + 1) / 2));
      if (x >= y && x >= z) { if (m[1] < 0) y = -y; if (m[2] < 0) z = -z; }
      else if (y >= z) { if (m[1] < 0) x = -x; if (m[5] < 0) z = -z; }
      else { if (m[2] < 0) x = -x; if (m[5] < 0) y = -y; }
      return { axis: norm([x, y, z]), angle: angle };
    }
    var s = 2 * Math.sin(angle);
    return { axis: [(m[7] - m[5]) / s, (m[2] - m[6]) / s, (m[3] - m[1]) / s], angle: angle };
  }
  function css3d(m) {
    return 'matrix3d(' + [m[0], m[3], m[6], 0, m[1], m[4], m[7], 0, m[2], m[5], m[8], 0, 0, 0, 0, 1].join(',') + ')';
  }
  function mod(a, m) { m = m || 2 * Math.PI; var r = a % m; return r < 0 ? r + m : r; }
  // Angle >= cur + turns tours, congru à target modulo 2π
  function nextAngle(cur, target, turns) { var base = cur + turns * 2 * Math.PI; return base + mod(target - base); }

  function el(tag, cls, parent) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (parent) parent.appendChild(e);
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Geste commun : toucher = lancer, glisser = tourner, relâcher vite = lancer
  function gestures(target, h) {
    var down = null, last = null, speed = 0;
    target.addEventListener('pointerdown', function (e) {
      down = { x: e.clientX, y: e.clientY }; last = { x: e.clientX, y: e.clientY, t: e.timeStamp }; speed = 0;
      target.setPointerCapture(e.pointerId);
      if (h.start) h.start(e);
    });
    target.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dt = Math.max(e.timeStamp - last.t, 1);
      speed = Math.hypot(e.clientX - last.x, e.clientY - last.y) / dt * 1000;
      if (h.move) h.move(e, e.clientX - last.x, e.clientY - last.y);
      last = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    });
    function end(e) {
      if (!down) return;
      var moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      var stale = e.timeStamp - last.t > 120;
      down = null;
      if (h.end) h.end();
      if (moved < 10 || (!stale && speed > 1100)) h.throw();
    }
    target.addEventListener('pointerup', end);
    target.addEventListener('pointercancel', function () { down = null; if (h.end) h.end(); });
  }

  // ───────────────────────── Dé 3D ─────────────────────────

  function makeDice(stage, onThrow) {
    var root = el('div', 'spinner dice', stage);
    var float = el('div', 'float', root), hop = el('div', 'hop', float), tilt = el('div', 'tilt', hop), cube = el('div', 'cube', tilt);
    var faceEls = [];
    for (var i = 0; i < 6; i++) faceEls.push(el('div', 'face f' + i, cube));

    // Légère inclinaison de la vue, pour garder du relief quand une face est de face
    var W = mul(rotX(-0.2), rotY(-0.24));
    tilt.style.transform = css3d(W);
    // Normales des faces et rotation qui amène chaque face devant
    var NORMALS = [[0, 0, 1], [1, 0, 0], [0, 0, -1], [-1, 0, 0], [0, -1, 0], [0, 1, 0]];
    var TARGETS = [I3, rotY(-Math.PI / 2), rotY(Math.PI), rotY(Math.PI / 2), rotX(-Math.PI / 2), rotX(Math.PI / 2)];

    var O = I3, anim = null, state = null, busy = false;

    function setO(m) { O = m; cube.style.transform = css3d(m); }

    // Vue de départ : seules les faces « poste » sont visibles (coin à 3 postes le matin, arête à 2 l'après-midi)
    function startOrientation() {
      var sum = [0, 0, 0];
      if (state) state.faces.forEach(function (f, i) { if (f.poste) { sum[0] += NORMALS[i][0]; sum[1] += NORMALS[i][1]; sum[2] += NORMALS[i][2]; } });
      var d = Math.hypot(sum[0], sum[1], sum[2]) > 0.1 ? norm(sum) : norm([1, -1, 1]);
      var v = apply(transpose(W), [0, 0, 1]);
      function frame(f) {
        var up = [0, -1, 0], k = dot(up, f);
        var u = norm([up[0] - k * f[0], up[1] - k * f[1], up[2] - k * f[2]]), w = cross(f, u);
        return [f[0], u[0], w[0], f[1], u[1], w[1], f[2], u[2], w[2]];
      }
      return mul(frame(v), transpose(frame(d)));
    }

    function render() {
      root.style.setProperty('--s', Math.round(Math.min(root.clientWidth, root.clientHeight) * 0.5) + 'px');
      if (!state) return;
      state.faces.forEach(function (f, i) {
        var e = faceEls[i], hit = i === state.lastFace;
        if (f.poste) {
          var who = state.taken[f.poste] != null ? nameOf(state, state.taken[f.poste]) : null;
          var grey = who != null && !hit;
          e.className = 'face f' + i + ' ' + f.poste + (grey ? ' grey' : '') + (hit ? ' hit' : '');
          e.style.background = 'linear-gradient(145deg, ' + POSTES[f.poste].color + ', ' + shade(POSTES[f.poste].color, -0.45) + ')';
          e.innerHTML = '<div class="lab">' + POSTES[f.poste].label + '</div>' +
            (who != null ? '<div class="tag">' + (grey ? 'pris · ' : '') + esc(who) + '</div>' : '');
        } else {
          e.className = 'face f' + i + ' joke' + (hit ? ' hit' : '');
          e.style.background = '';
          e.innerHTML = '<div class="emo">' + f.joke.e + '</div><div class="lab">' + esc(f.joke.t) + '</div>';
        }
      });
    }

    gestures(root, {
      move: function (e, dx, dy) { if (!busy) setO(mul(mul(rotX(-dy * 0.012), rotY(dx * 0.012)), O)); },
      throw: onThrow
    });

    return {
      el: root,
      layout: render,
      configure: function (st, animated) {
        state = st;
        render();
        if (!animated) { anim = null; busy = false; setO(st.lastFace != null ? TARGETS[st.lastFace] : startOrientation()); }
      },
      reset: function () {
        // Retour animé à la vue de départ
        var from = O, to = startOrientation(), d = toAxisAngle(mul(transpose(to), from));
        anim = { t0: null, T: 600, step: function (p) {
          var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          setO(mul(to, rotAxis(d.axis, d.angle * (1 - e))));
        } };
      },
      roll: function (face, done) {
        busy = true;
        var T = TARGETS[face], d = toAxisAngle(mul(transpose(T), O));
        var kx = (2 + Math.floor(Math.random() * 2)) * 2 * Math.PI, ky = (3 + Math.floor(Math.random() * 2)) * 2 * Math.PI;
        anim = { t0: null, T: 2400, step: function (p) {
          var r = 1 - (1 - Math.pow(1 - p, 3.6)); // reste à parcourir : 1 → 0, en décélérant
          setO(mul(mul(mul(T, rotAxis(d.axis, d.angle * r)), rotX(kx * r)), rotY(ky * r)));
          // Petit saut au lancer puis rebond
          var t = p * 2.4, y = 0;
          if (t < 0.75) y = Math.sin(Math.PI * t / 0.75) * 0.55;
          else if (t < 1.11) y = Math.sin(Math.PI * (t - 0.75) / 0.36) * 0.12;
          hop.style.transform = 'translateY(' + (-y * root.clientHeight * 0.28) + 'px)';
        }, done: function () { hop.style.transform = ''; setO(T); busy = false; done(); } };
      },
      frame: function (now) {
        if (!anim) return;
        if (anim.t0 == null) anim.t0 = now;
        var p = Math.min((now - anim.t0) / anim.T, 1), a = anim;
        a.step(p);
        if (p >= 1) { if (anim === a) anim = null; if (a.done) a.done(); }
      }
    };
  }

  // Éclaircit (t > 0) ou assombrit (t < 0) une couleur #rrggbb
  function shade(hex, t) {
    var n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255], to = t > 0 ? 255 : 0, k = Math.abs(t);
    return 'rgb(' + c.map(function (v) { return Math.round(v + (to - v) * k); }).join(',') + ')';
  }

  // ───────────────────────── Roulettes (aiguille à cliquet / bille casino) ─────────────────────────

  var FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  var BOWL = 1.3; // rayon extérieur de la cuvette en bois (casino), en rayons de roue

  function drawText(ctx, text, o) {
    ctx.save();
    ctx.font = (o.weight || 700) + ' ' + o.size + 'px ' + FONT;
    ctx.fillStyle = o.color || '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var words = String(text).split(' '), lines = [], line = '';
    words.forEach(function (w) {
      var t = line ? line + ' ' + w : w;
      if (line && ctx.measureText(t).width > o.width) { lines.push(line); line = w; } else line = t;
    });
    lines.push(line);
    var lh = o.size * 1.12, y0 = o.y - (lines.length - 1) * lh / 2;
    lines.forEach(function (l, i) {
      ctx.fillText(l, o.x, y0 + i * lh);
      if (o.strike) {
        var w = ctx.measureText(l).width;
        ctx.fillRect(o.x - w / 2, y0 + i * lh - o.size * 0.05, w, o.size * 0.1);
      }
    });
    ctx.restore();
  }
  function disc(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); }
  function radial(ctx, x0, y0, r0, x1, y1, r1, stops) {
    var g = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    stops.forEach(function (s) { g.addColorStop(s[0], s[1]); });
    return g;
  }
  function faceInfo(st, i) {
    var f = st.faces[i], hit = i === st.lastFace, who = null;
    if (f.poste && st.taken[f.poste] != null) who = nameOf(st, st.taken[f.poste]);
    return { f: f, hit: hit, who: who, grey: who != null && !hit };
  }

  // Roue à aiguille : cases, libellés le long du rayon, tiges métalliques sur les séparations
  function drawWheel(ctx, R, st) {
    var n = st.faces.length, step = 2 * Math.PI / n, rim = R * 0.965;
    function center(i) { return -Math.PI / 2 + i * step; }
    st.faces.forEach(function (_, i) {
      var c = center(i), o = faceInfo(st, i);
      var base = o.f.poste ? (o.grey ? '#3d3d3d' : POSTES[o.f.poste].color) : (Math.floor(i / 2) % 2 === 0 ? '#2b2b36' : '#3d3d4a');
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, rim, c - step / 2, c + step / 2); ctx.closePath();
      ctx.fillStyle = radial(ctx, 0, 0, 0, 0, 0, rim, [[0, shade(base, 0.18)], [0.55, base], [1, shade(base, -0.3)]]);
      ctx.fill();
      if (o.hit) { ctx.strokeStyle = '#fff'; ctx.lineWidth = R * 0.025; ctx.stroke(); }

      ctx.save();
      ctx.rotate(c);
      if (o.f.poste) {
        drawText(ctx, POSTES[o.f.poste].label, { size: R * (o.f.poste === 'regul' ? 0.11 : 0.12), weight: 800,
          color: 'rgba(255,255,255,' + (o.grey ? 0.45 : 1) + ')', x: R * 0.6, y: o.who == null ? 0 : -R * 0.035, width: R * 0.5, strike: o.grey });
        if (o.who != null) drawText(ctx, (o.grey ? 'pris · ' : '') + o.who, { size: R * 0.05, weight: 600, color: 'rgba(255,255,255,.85)', x: R * 0.6, y: R * 0.065, width: R * 0.5 });
      } else {
        drawText(ctx, o.f.joke.e, { size: R * 0.085, weight: 400, x: R * 0.8, y: 0, width: R * 0.2 });
        drawText(ctx, o.f.joke.s, { size: R * 0.058, weight: 700, color: 'rgba(255,255,255,.9)', x: R * 0.47, y: 0, width: R * 0.4 });
      }
      ctx.restore();
    });

    // Séparations et jante
    ctx.strokeStyle = '#121212'; ctx.lineWidth = R * 0.018; ctx.beginPath();
    for (var i = 0; i < n; i++) { var a = center(i) - step / 2; ctx.moveTo(0, 0); ctx.lineTo(rim * Math.cos(a), rim * Math.sin(a)); }
    ctx.stroke();
    ctx.strokeStyle = '#171717'; ctx.lineWidth = R * 0.07; disc(ctx, 0, 0, rim); ctx.stroke();

    for (i = 0; i < n; i++) {
      // Petite ampoule au milieu de chaque case
      var b = center(i);
      ctx.fillStyle = 'rgba(255,255,255,.55)'; disc(ctx, rim * Math.cos(b), rim * Math.sin(b), R * 0.012); ctx.fill();
      // Tige métallique sur chaque séparation (c'est elle qui fait cliqueter l'aiguille)
      var t = center(i) - step / 2, px = R * 0.93 * Math.cos(t), py = R * 0.93 * Math.sin(t), r = R * 0.028;
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = R * 0.012; ctx.shadowOffsetY = R * 0.008;
      ctx.fillStyle = '#b3b3b3'; disc(ctx, px, py, r); ctx.fill(); ctx.restore();
      ctx.fillStyle = radial(ctx, px - r * 0.35, py - r * 0.35, 0, px, py, r, [[0, '#fff'], [1, '#8c8c8c']]);
      disc(ctx, px, py, r); ctx.fill();
    }

    // Moyeu
    ctx.fillStyle = '#141414'; disc(ctx, 0, 0, R * 0.15); ctx.fill();
    var cap = R * 0.085;
    ctx.fillStyle = radial(ctx, -cap * 0.3, -cap * 0.3, 0, 0, 0, cap, [[0, '#fff'], [1, '#9e9e9e']]);
    disc(ctx, 0, 0, cap); ctx.fill();
  }

  // Cuvette fixe du casino : bord en bois, piste de la bille, losanges déflecteurs
  function drawBowl(ctx, R) {
    var tr = R * BOWL;
    ctx.fillStyle = radial(ctx, 0, 0, R * 1.17, 0, 0, tr, [[0, '#6b381a'], [0.5, '#9e5c2b'], [1, '#4d2612']]);
    disc(ctx, 0, 0, tr); ctx.fill();
    ctx.fillStyle = radial(ctx, 0, 0, R * 0.98, 0, 0, R * 1.17, [[0, '#1f120a'], [0.55, '#422614'], [1, '#1a0f08']]);
    disc(ctx, 0, 0, R * 1.17); ctx.fill();
    ctx.strokeStyle = '#d9ad52'; ctx.lineWidth = R * 0.012; disc(ctx, 0, 0, R * 1.175); ctx.stroke();
    ctx.fillStyle = '#e6bf66';
    for (var k = 0; k < 8; k++) {
      ctx.save(); ctx.rotate(k * Math.PI / 4 + Math.PI / 8);
      var x = R * 1.04, w = R * 0.05, h = R * 0.022;
      ctx.beginPath(); ctx.moveTo(x - w, 0); ctx.lineTo(x, -h); ctx.lineTo(x + w, 0); ctx.lineTo(x, h); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }

  // Cylindre tournant du casino : cases à cloisons, couronne des secteurs, cône en bois et croix dorée
  function drawCasino(ctx, R, st) {
    var n = st.faces.length, step = 2 * Math.PI / n, gold = '#e0b85c';
    function center(i) { return -Math.PI / 2 + i * step; }
    function sector(r0, r1, a0, a1) { ctx.beginPath(); ctx.arc(0, 0, r1, a0, a1); ctx.arc(0, 0, r0, a1, a0, true); ctx.closePath(); }
    ctx.fillStyle = '#0f0f0f'; disc(ctx, 0, 0, R); ctx.fill();

    st.faces.forEach(function (_, i) {
      var c = center(i), o = faceInfo(st, i);
      // Postes en couleur, gages en noir / rouge comme au casino
      var base = o.f.poste ? (o.grey ? '#424242' : POSTES[o.f.poste].color) : (Math.floor(i / 2) % 2 === 0 ? '#14141a' : '#8c141a');
      ctx.fillStyle = base; sector(R * 0.56, R * 0.83, c - step / 2, c + step / 2); ctx.fill();
      ctx.fillStyle = shade(base, -0.35); sector(R * 0.83, R * 0.97, c - step / 2, c + step / 2); ctx.fill();
      if (o.hit) { ctx.strokeStyle = '#fff'; ctx.lineWidth = R * 0.02; sector(R * 0.56, R * 0.97, c - step / 2, c + step / 2); ctx.stroke(); }
      ctx.save(); ctx.rotate(c);
      if (o.f.poste) {
        drawText(ctx, POSTES[o.f.poste].label, { size: R * (o.f.poste === 'regul' ? 0.075 : 0.085), weight: 800,
          color: 'rgba(255,255,255,' + (o.grey ? 0.45 : 1) + ')', x: R * 0.695, y: 0, width: R * 0.27, strike: o.grey });
      } else {
        drawText(ctx, o.f.joke.e, { size: R * 0.08, weight: 400, x: R * 0.695, y: 0, width: R * 0.2 });
      }
      ctx.restore();
    });

    // Cloisons métalliques (3 cases de bille par secteur)
    ctx.strokeStyle = '#d1d1d1';
    for (var k = 0; k < 3 * n; k++) {
      var a = -Math.PI / 2 - step / 2 + k * step / 3, r0 = R * (k % 3 === 0 ? 0.56 : 0.83);
      ctx.lineWidth = R * (k % 3 === 0 ? 0.016 : 0.009);
      ctx.beginPath(); ctx.moveTo(r0 * Math.cos(a), r0 * Math.sin(a)); ctx.lineTo(R * 0.97 * Math.cos(a), R * 0.97 * Math.sin(a)); ctx.stroke();
    }
    ctx.lineWidth = R * 0.012; disc(ctx, 0, 0, R * 0.83); ctx.stroke();
    ctx.strokeStyle = gold; ctx.lineWidth = R * 0.02; disc(ctx, 0, 0, R * 0.97); ctx.stroke();

    // Cône central en bois
    ctx.fillStyle = radial(ctx, 0, 0, 0, 0, 0, R * 0.56, [[0, '#c78040'], [1, '#733d1a']]);
    disc(ctx, 0, 0, R * 0.56); ctx.fill();
    ctx.strokeStyle = gold; ctx.lineWidth = R * 0.014; disc(ctx, 0, 0, R * 0.56); ctx.stroke();
    ctx.lineWidth = R * 0.008; disc(ctx, 0, 0, R * 0.36); ctx.stroke();

    // Tourelle : croix dorée à 4 branches terminées par des boules
    function goldBall(x, y, r) {
      ctx.fillStyle = radial(ctx, x - r * 0.35, y - r * 0.35, 0, x, y, r, [[0, '#ffedad'], [0.5, gold], [1, '#997029']]);
      disc(ctx, x, y, r); ctx.fill();
    }
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = R * 0.04; ctx.shadowOffsetX = R * 0.015; ctx.shadowOffsetY = R * 0.025;
    for (k = 0; k < 4; k++) {
      var b = k * Math.PI / 2 + Math.PI / 4;
      ctx.strokeStyle = gold; ctx.lineWidth = R * 0.044; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R * 0.3 * Math.cos(b), R * 0.3 * Math.sin(b)); ctx.stroke();
      goldBall(R * 0.31 * Math.cos(b), R * 0.31 * Math.sin(b), R * 0.045);
    }
    goldBall(0, 0, R * 0.09);
    ctx.restore();
  }

  function makeWheel(stage, style, onThrow) {
    var root = el('div', 'spinner wheel', stage);
    var bowl = style === 'ball' ? el('canvas', '', root) : null;
    var canvas = el('canvas', '', root);
    var needleEl = style === 'pointer' ? el('div', 'needle', root) : null;
    var ballEl = style === 'ball' ? el('div', 'ball', root) : null;

    var state = null, R = 0, cx = 0, cy = 0, angle = 0;
    var ballRel = null, ballAbs = -Math.PI / 2, ballRadius = 0; // ballRel : angle dans le repère de la roue, null = sur la piste
    var busy = false, dragging = false, anim = null, lastPan = 0;
    var needle = 0, needleSpeed = 0, lastAngle = 0; // aiguille : ressort amorti poussé par les tiges

    function n() { return state ? state.faces.length : 12; }
    function step() { return 2 * Math.PI / n(); }
    function center(i) { return -Math.PI / 2 + i * step(); }
    function trackR() { return R * 1.09; }
    function pocketR() { return R * 0.9; }

    function fit(cv, radius, draw) {
      var dpr = Math.min(window.devicePixelRatio || 1, 3), size = Math.max(Math.round(2 * radius), 1);
      cv.width = Math.round(size * dpr); cv.height = Math.round(size * dpr);
      cv.style.width = size + 'px'; cv.style.height = size + 'px';
      cv.style.left = (cx - radius) + 'px'; cv.style.top = (cy - radius) + 'px';
      var ctx = cv.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, radius * dpr, radius * dpr);
      draw(ctx);
    }

    function render() {
      if (!state || R <= 0) return;
      fit(canvas, R, function (ctx) { if (style === 'ball') drawCasino(ctx, R, state); else drawWheel(ctx, R, state); });
    }

    function layout() {
      var w = root.clientWidth, h = root.clientHeight;
      if (!w || !h) return;
      cx = w / 2; cy = h / 2;
      var half = Math.min(w, h) / 2;
      R = style === 'pointer' ? half * 0.9 : half * 0.97 / BOWL;
      if (style === 'ball') {
        fit(bowl, R * BOWL, function (ctx) { drawBowl(ctx, R); });
        var br = R * 0.048;
        ballEl.style.width = ballEl.style.height = 2 * br + 'px';
        if (!ballRadius) ballRadius = trackR();
      } else {
        // La pointe descend jusqu'aux tiges de la jante
        var nw = R * 0.17, nh = R * 0.19;
        needleEl.style.width = nw + 'px'; needleEl.style.height = nh + 'px';
        needleEl.style.left = (cx - nw / 2) + 'px'; needleEl.style.top = (cy - R * 1.07) + 'px';
      }
      render();
      applyAll();
    }

    function applyAll() {
      if (R <= 0) return;
      canvas.style.transform = 'rotate(' + angle + 'rad)';
      if (style === 'ball') {
        var a, r;
        if (busy) { a = ballAbs; r = ballRadius; }
        else if (ballRel != null) { a = angle + ballRel; r = pocketR(); }
        else { a = -Math.PI / 2; r = trackR(); }
        ballAbs = a; ballRadius = r;
        var br = R * 0.048;
        ballEl.style.transform = 'translate(' + (cx + r * Math.cos(a) - br) + 'px,' + (cy + r * Math.sin(a) - br) + 'px)';
      } else {
        needleEl.style.transform = 'rotate(' + needle + 'rad)';
      }
    }

    // Chaque tige pousse la pointe ; une fois passée, l'aiguille claque et revient en oscillant
    function needleStep(dt) {
      var wheelSpeed = (angle - lastAngle) / dt;
      lastAngle = angle;
      var s = mod(angle, step()) - step() / 2; // position signée de la tige la plus proche (positive = déjà passée)
      var w = 0.075, maxD = 0.55, push = null;
      if (wheelSpeed > 0.05 && s > -w && s < 0.3 * w) push = -maxD * (s + w) / (1.3 * w);
      else if (wheelSpeed < -0.05 && s < w && s > -0.3 * w) push = maxD * (w - s) / (1.3 * w);
      if (push != null && Math.abs(push) > Math.abs(needle) && push * needle >= 0) {
        needle = push; needleSpeed = 0;
      } else {
        needleSpeed += (-1100 * needle - 16 * needleSpeed) * dt;
        needle += needleSpeed * dt;
      }
    }

    // Rayon de la bille : sort de sa case, roule sur la piste, puis tombe en rebondissant (avant les sauts de case)
    function ballCurve(p, start) {
      if (p < 0.08) return start + (trackR() - start) * (p / 0.08);
      if (p < 0.45) return trackR();
      if (p < 0.7) {
        var u = (p - 0.45) / 0.25;
        return pocketR() + (trackR() - pocketR()) * Math.pow(1 - u, 2) * Math.abs(Math.cos(2.5 * Math.PI * u));
      }
      return pocketR();
    }

    gestures(root, {
      start: function (e) { var b = root.getBoundingClientRect(); lastPan = Math.atan2(e.clientY - b.top - cy, e.clientX - b.left - cx); dragging = true; },
      move: function (e) {
        if (busy) return;
        var b = root.getBoundingClientRect(), a = Math.atan2(e.clientY - b.top - cy, e.clientX - b.left - cx), d = a - lastPan;
        if (d > Math.PI) d -= 2 * Math.PI;
        if (d < -Math.PI) d += 2 * Math.PI;
        angle += d; lastPan = a;
      },
      end: function () { dragging = false; },
      throw: onThrow
    });

    return {
      el: root,
      layout: layout,
      configure: function (st, animated) {
        state = st;
        if (!animated) {
          anim = null; busy = false;
          if (st.lastFace != null) { if (style === 'pointer') angle = -st.lastFace * step(); else ballRel = center(st.lastFace); }
          else if (style === 'ball') ballRel = null;
        }
        render();
        applyAll();
      },
      reset: function () { if (style === 'ball') { ballRel = null; ballAbs = -Math.PI / 2; } },
      roll: function (face, done) {
        busy = true;
        var w0 = angle, c = center(face);
        if (style === 'pointer') {
          var jitter = (Math.random() * 0.6 - 0.3) * step(); // pas toujours pile au centre de la case
          var w1 = nextAngle(w0, -face * step() + jitter, 4 + Math.floor(Math.random() * 2));
          anim = { t0: null, T: 4200, step: function (p) { angle = w0 + (w1 - w0) * (1 - Math.pow(1 - p, 4)); },
            done: function () { angle = mod(angle); lastAngle = angle; busy = false; done(); } };
        } else {
          var w1b = w0 + 4 * Math.PI + Math.random() * 2 * Math.PI;
          var b0 = ballRel != null ? w0 + ballRel : ballAbs, r0 = ballRel == null ? trackR() : pocketR();
          // Après sa chute, la bille saute plusieurs fois de case en case par-dessus les cloisons avant de se loger
          var hops = 3 + Math.floor(Math.random() * 3), pocketStep = step() / 3, dir = Math.random() < 0.5 ? 1 : -1;
          var cStart = c + dir * hops * pocketStep;
          // La bille part en sens inverse, plusieurs tours d'avance, puis se fait rattraper par la roue
          var rel0 = cStart + 10 * Math.PI + mod(b0 - w0 - cStart);
          anim = { t0: null, T: 5800, step: function (p) {
            angle = w0 + (w1b - w0) * (1 - Math.pow(1 - p, 3.2));
            var q = Math.min(p / 0.7, 1), rel = cStart + (rel0 - cStart) * Math.pow(1 - q, 3), bump = 0;
            if (p >= 0.7) {
              var u = Math.min((p - 0.7) / 0.23, 1) * hops, j = Math.min(Math.floor(u), hops);
              var f = Math.min((u - j) / 0.6, 1), e = j >= hops ? 0 : (1 - Math.cos(Math.PI * f)) / 2;
              rel -= dir * (j + e) * pocketStep;
              if (j < hops) bump = Math.sin(Math.PI * f) * R * 0.07 * (hops - j) / hops;
            }
            ballAbs = angle + rel;
            ballRadius = ballCurve(p, r0) + bump;
            // Petits sauts sur les losanges déflecteurs pendant que la bille roule sur la piste
            if (p > 0.08 && p < 0.5) {
              var x = mod(ballAbs - Math.PI / 8, Math.PI / 4), d = Math.min(x, Math.PI / 4 - x);
              ballRadius -= R * 0.035 * Math.max(0, 1 - d / 0.07);
            }
          }, done: function () { ballRel = c; angle = mod(angle); busy = false; done(); } };
        }
      },
      frame: function (now, dt) {
        var finished = null;
        if (anim) {
          if (anim.t0 == null) anim.t0 = now;
          var p = Math.min((now - anim.t0) / anim.T, 1);
          anim.step(p);
          if (p >= 1) { finished = anim; anim = null; }
        }
        if (style === 'pointer') needleStep(dt);
        if (finished) finished.done();
        applyAll();
      }
    };
  }

  // ───────────────────────── Interface ─────────────────────────

  function $(id) { return document.getElementById(id); }
  var stage = $('stage');
  var spinners = {
    dice: makeDice(stage, roll),
    wheel: makeWheel(stage, 'pointer', roll),
    ball: makeWheel(stage, 'ball', roll)
  };
  function spinner() { return spinners[mode]; }
  var tabs = [].slice.call(document.querySelectorAll('.tab'));
  var modeButtons = [].slice.call(document.querySelectorAll('.mode'));

  Object.keys(SHIFTS).forEach(function (s) { states[s] = newState(s); });

  function renderNames() {
    var box = $('names'), st = states[current];
    box.innerHTML = '';
    st.names.forEach(function (name, i) {
      var input = el('input', '', box);
      input.placeholder = 'COA ' + (i + 1);
      input.maxLength = 3;
      input.autocapitalize = 'characters';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.enterKeyHint = i + 1 < st.names.length ? 'next' : 'done';
      input.value = name;
      input.addEventListener('input', function () {
        // Trigramme facultatif : 3 lettres
        var clean = input.value.toUpperCase().replace(/[^A-ZÀ-Ý]/g, '').slice(0, 3);
        if (input.value !== clean) input.value = clean;
        states[current].names[i] = clean;
        if (!rolling) spinner().configure(states[current], true);
        renderStatus();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        var next = box.children[i + 1];
        if (next) next.focus(); else input.blur();
      });
    });
  }

  function renderStatus() {
    var st = states[current], title, sub;
    if (isDone(current)) { title = 'Postes attribués ✅'; sub = 'Bonne vacation !'; }
    else if (rolling) { title = 'Ça tourne… 🎲'; sub = ''; }
    else if (st.message) { title = st.message; sub = 'Toujours à ' + nameOf(st, st.turn); }
    else { title = 'Au tour de ' + nameOf(st, st.turn); sub = mode === 'dice' ? 'Touche ou lance le dé' : 'Touche ou lance la roue'; }
    $('title').textContent = title;
    $('sub').textContent = sub;

    var box = $('results');
    box.innerHTML = '';
    for (var i = 0; i < SHIFTS[current].agents; i++) {
      var a = null;
      st.assigned.forEach(function (x) { if (x.coa === i) a = x; });
      var r = el('div', 'res' + (a ? ' set' : ''), box);
      if (a) r.style.background = POSTES[a.poste].color;
      el('div', 'who', r).textContent = nameOf(st, i);
      el('div', 'what', r).textContent = a ? POSTES[a.poste].label : '–';
    }
    tabs.forEach(function (t) { t.classList.toggle('on', t.dataset.shift === current); });
    modeButtons.forEach(function (b) { b.classList.toggle('on', b.dataset.mode === mode); });
  }

  function showSpinner(animated) {
    MODES.forEach(function (m) { spinners[m].el.classList.toggle('on', m === mode); });
    spinner().layout();
    spinner().configure(states[current], animated);
  }

  function select(shift) {
    if (rolling || shift === current) return;
    current = shift;
    renderNames();
    showSpinner(false);
    renderStatus();
  }

  function setMode(m) {
    if (rolling || m === mode) return;
    mode = m;
    save('mode', m);
    // Le dé a 6 faces, les roulettes 12 cases : on refait les faces au changement de mode
    Object.keys(states).forEach(function (s) { states[s].faces = randomFaces(s, mode); states[s].lastFace = null; });
    showSpinner(false);
    renderStatus();
  }

  // Onglet selon l'heure : 05:55–13:55 matin, 13:56–22:00 après-midi, sinon nuit
  function shiftForNow() {
    var d = new Date(), m = d.getHours() * 60 + d.getMinutes();
    if (m >= 355 && m <= 835) return 'matin';
    if (m > 835 && m <= 1320) return 'aprem';
    return null;
  }
  function autoSelect() {
    var now = shiftForNow();
    $('night').classList.toggle('show', !now);
    var st = states[current], inProgress = st.assigned.length > 0 && !isDone(current);
    if (!inProgress) select(now || 'matin'); // sans interrompre un tirage en cours
  }

  function roll() {
    if (rolling || isDone(current)) return;
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    var shift = current, st = states[shift];
    // Nouveaux gages à chaque lancer (changés pendant que ça tourne)
    st.faces = randomFaces(shift, mode);
    st.lastFace = null;
    var used = usedJokes(), candidates = [];
    st.faces.forEach(function (f, i) {
      if (f.poste ? st.taken[f.poste] == null : used.indexOf(f.joke.t) < 0) candidates.push(i);
    });
    if (!candidates.length) return;
    var face = candidates[Math.floor(Math.random() * candidates.length)];
    rolling = true;
    spinner().configure(st, true);
    renderStatus();
    spinner().roll(face, function () { land(shift, face); });
  }

  function assign(st, poste) {
    st.taken[poste] = st.turn;
    st.assigned.push({ coa: st.turn, poste: poste });
    st.turn++;
  }

  function land(shift, face) {
    rolling = false;
    var st = states[shift], f = st.faces[face];
    st.lastFace = face;
    if (f.joke) {
      st.message = f.joke.m;
      markJoke(f.joke.t);
    } else {
      st.message = null;
      assign(st, f.poste);
      // Le dernier COA récupère le dernier poste
      var left = SHIFTS[shift].postes.filter(function (p) { return st.taken[p] == null; });
      if (left.length === 1 && st.turn === SHIFTS[shift].agents - 1) assign(st, left[0]);
    }
    if (shift === current) spinner().configure(st, true);
    renderStatus();
  }

  function replay() {
    if (rolling) return;
    var names = states[current].names;
    states[current] = newState(current);
    states[current].names = names; // même équipe : on garde les trigrammes
    spinner().configure(states[current], true);
    spinner().reset();
    renderStatus();
  }

  tabs.forEach(function (t) { t.addEventListener('click', function () { select(t.dataset.shift); }); });
  modeButtons.forEach(function (b) { b.addEventListener('click', function () { setMode(b.dataset.mode); }); });
  $('replay').addEventListener('click', replay);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) autoSelect(); });
  window.addEventListener('resize', function () { spinner().layout(); });
  if (window.ResizeObserver) new ResizeObserver(function () { spinner().layout(); }).observe(stage);

  var lastFrame = 0;
  function loop(now) {
    var dt = Math.min(Math.max((now - lastFrame) / 1000, 1 / 120), 1 / 30);
    lastFrame = now;
    spinner().frame(now, dt);
    requestAnimationFrame(loop);
  }

  var shiftNow = shiftForNow();
  $('night').classList.toggle('show', !shiftNow);
  current = shiftNow || 'matin';
  renderNames();
  showSpinner(false);
  renderStatus();
  requestAnimationFrame(loop);

  // Test : ?auto=N enchaîne N lancers, ?mode=dice|wheel|ball, ?shift=matin|aprem
  var params = new URLSearchParams(location.search);
  if (params.get('shift') && SHIFTS[params.get('shift')]) select(params.get('shift'));
  if (MODES.indexOf(params.get('mode')) >= 0) setMode(params.get('mode'));
  var auto = parseInt(params.get('auto') || '0', 10);
  for (var k = 0; k < auto; k++) setTimeout(roll, 1000 + k * 3000);

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
