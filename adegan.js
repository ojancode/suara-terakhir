// =====================================================================
// SUARA TERAKHIR: adegan 2.5D Bab 2 sampai Bab 8
// Every element sits at its own depth via translateZ, like the hall and the flood.
// Uses el(), person(), pick(), SKINS, SUITS and addFlashes() from index.html.
// =====================================================================
function stage(id){ const st = el($("world"), "stage"); st.id = id; return st; }
const zs = (z, s = 1) => `transform:translateZ(${z}px) scale(${s})`;

function buildStages(){ buildPosko(); buildPod(); buildAsap(); buildKamar(); buildTV(); buildSidang(); buildSiaran(); }

// Bab 2: refugee post at dusk, empty aid crates, a queue with empty plates
function buildPosko(){
  const st = stage("stPosko");
  const R = (a, b) => a + Math.random() * (b - a);
  const motes = (n, a, b) => Array.from({length:n}, () => `<i style="left:${R(a, b)}%;top:${R(0, 90)}%;--d:${R(4, 7).toFixed(1)}s;animation-delay:-${R(0, 6).toFixed(1)}s"></i>`).join("");
  // layer 1: dusk sky with a low sun, hills and the kampung roofs sinking into haze
  el(st, "abs ps-sky", zs(-420));
  el(st, "abs ps-sun", zs(-410));
  el(st, "abs ps-hills", zs(-400));
  el(st, "abs ps-roofs", zs(-380));
  el(st, "abs ps-haze", zs(-360));
  // layer 2: tents, a power pole, the blue tarp of the post with its banner and a sagging string of bulbs
  [[46, 180, 100, "#b5562c"], [62, 150, 86, "#3d6b3d"], [76, 190, 104, "#2d5f8a"]].forEach(([x, w, h, c]) =>
    el(st, "abs ps-tent", `left:${x}%;--w:${w}px;--h:${h}px;--tc:${c};${zs(-260)}`));
  el(st, "abs ps-pole", `left:91%;${zs(-250)}`);
  el(st, "abs ps-terpal", zs(-200));
  el(st, "abs ps-banner", zs(-198), _t("Posko Pengungsian <b>Muara Hilir</b>", "Evacuation Shelter <b>Muara Hilir</b>"));
  el(st, "abs ps-bulbs", zs(-196), [4, 16, 28, 40, 52, 64, 76, 88].map((x, i) => `<i style="left:${x}%;top:${8 + Math.sin(i / 7 * Math.PI) * 14}px"></i>`).join("")
    + `<svg viewBox="0 0 100 30" preserveAspectRatio="none" width="100%" height="100%" style="position:absolute;inset:0"><path d="M0 4Q50 34 100 4" fill="none" stroke="#14121a" stroke-width=".6"/></svg>`);
  // layer 3: damp ground, the aid table with empty crates, the officer and a short queue of large figures
  el(st, "abs ps-ground", zs(-160));
  [[18, 140], [64, 180]].forEach(([x, w]) => el(st, "abs ps-puddle", `left:${x}%;bottom:2%;width:${w}px;${zs(-40)}`));
  el(st, "abs cone", `left:4%;bottom:6%;--cw:280px;--ch:70%;--lc:rgba(255,215,150,.2);${zs(-90)}`);
  person(st, {x:10, y:14, z:-80, s:1.1, seat:true, c:"#7a6a2d", skin:pick(SKINS), peci:true}); // the officer at the table
  el(st, "abs ps-table", zs(-70));
  [[5, 22, "BANTUAN", ""], [13, 22, "KOSONG", " empty"], [9, 30, "BANTUAN", " empty"]].forEach(([x, y, t, c]) =>
    el(st, "abs ps-crate" + c, `left:${x}%;bottom:${y}%;${zs(-66)}`, t));
  person(st, {x:30, y:8, z:20, s:1.05, hero:true, me:true, c:"#e9e6df", tag:"", id:"heroPk"});
  const q = [[46, "#6a3a4a", 1.25], [57, null, 1.3], [68, "#3a5a6a", 1.25]];
  q.forEach(([x, hj, s], i) => {
    const p = person(st, {x, y:10, z:-20, s, c:pick(SUITS), skin:pick(SKINS), hijab:hj});
    if (i === 1) p.insertAdjacentHTML("beforeend", `<span class="ps-sign">${_t("Mana bantuannya?", "Where's the aid?")}</span>`);
  });
  person(st, {x:76, y:10, z:-10, s:.8, c:"#6a4a3a", skin:pick(SKINS)}); // a child holding on to the queue
  el(st, "abs motes", `left:4%;bottom:6%;width:280px;height:70%;${zs(-88)}`, motes(12, 5, 70));
  // layer 4, slightly out of focus: plastic chairs, water gallons and two onlookers
  const fg = el(st, "abs fg-blur", zs(110));
  [[4, "#b8322b"], [10, "#2f6aa3"]].forEach(([x, c]) => el(fg, "abs ps-chair", `left:${x}%;bottom:-40%;--kc:${c}`));
  [[86, -40], [91, -40], [88.5, -28]].forEach(([x, y]) => el(fg, "abs ps-galon", `left:${x}%;bottom:${y}%`));
  [[26, 100], [62, 112]].forEach(([x, h]) => el(fg, "abs sil", `left:${x}%;bottom:-62%;height:${h}px`));
}

// Bab 3: "Ngobrol Jujur" studio: foam wall, neon sign, desk with boom mics
function buildPod(){
  const st = stage("stPod");
  el(st, "abs foam", zs(-240));
  el(st, "abs pod-jendela", `left:10%;top:14%;${zs(-236)}`);
  el(st, "abs pod-rak", `right:9%;top:22%;${zs(-230)}`);
  el(st, "abs neon", "", _t("Ngobrol Jujur", "Honest Talk"));
  el(st, "abs onair", `left:12%;top:16%;${zs(-200)}`, "ON AIR");
  el(st, "abs ring", `left:78%;top:20%;${zs(-160)}`);
  el(st, "abs monitor", `right:6%;bottom:42%;${zs(-120)}`, "<b>●</b> LIVE · 12,4K VIEWERS");
  person(st, {x:30, y:22, z:-30, seat:true, hero:true, me:true, c:"#e9e6df", tag:"", id:"heroPod"});
  person(st, {x:62, y:22, z:-30, seat:true, hero:true, c:"#3b5a4a", skin:"#b07f5e", tag:"Dimas", id:"dimas"});
  el(st, "abs pod-lampu", `left:50%;margin-left:-22px;top:31%;${zs(-40)}`);
  el(st, "abs cone", `left:50%;margin-left:-110px;top:34%;--cw:220px;--ch:42%;--lc:rgba(255,210,140,.2);${zs(-38)}`);
  el(st, "abs desk", zs(-10));
  [[44, "#efe6cf"], [55, "#efe6cf"]].forEach(([x]) => el(st, "abs pod-gelas", `left:${x}%;bottom:25%;${zs(-6)}`));
  el(st, "abs boom", `left:36%;bottom:25%;transform:translateZ(0px) rotate(-18deg)`);
  el(st, "abs boom", `left:62%;bottom:25%;transform:translateZ(0px) rotate(18deg)`);
  el(st, "abs tripod", `left:84%;bottom:0;${zs(90)}`);
  el(st, "abs tripod", `left:4%;bottom:0;${zs(90)}`);
  // layer 4: monitor backs and cables along the floor
  el(st, "abs pod-mon", `left:-4%;bottom:-6%;${zs(130)}`);
  el(st, "abs pod-mon", `right:-4%;bottom:-6%;${zs(130)}`);
  el(st, "abs pod-kabel", zs(120));
}

// Bab 4: burning peatland under a yellow sky, residents in masks
function buildAsap(){
  const st = stage("stAsap");
  el(st, "abs sun", `right:14%;top:8%;${zs(-320)}`);
  el(st, "abs asap-atap", zs(-360, 1.4));
  [[4, 46, -240], [12, 38, -240], [24, 50, -240], [70, 44, -240], [84, 40, -240], [94, 48, -240]].forEach(([x, h, z]) =>
    el(st, "abs tree", `left:${x}%;bottom:20%;height:${h}%;${zs(z)}`));
  el(st, "abs smoke", `left:10%;top:18%;${zs(-200, 1.4)}`);
  el(st, "abs smoke", `left:52%;top:30%;animation-delay:-9s;${zs(-140, 1.2)}`);
  el(st, "abs burnt");
  // layer 2: a power pole, the official warning and a car's headlights in the smoke
  el(st, "abs posko-tiang", `left:62%;bottom:20%;height:150px;${zs(-180)}`);
  el(st, "abs asap-spanduk", `left:31%;bottom:56%;${zs(-170)}`, _t("Kurangi aktivitas di luar rumah", "Limit outdoor activity"));
  el(st, "abs asap-lampu", `left:56%;bottom:22%;${zs(-150)}`);
  for (let i = 0; i < 14; i++) el(st, "abs ember", `left:${Math.random() * 100}%;bottom:${3 + Math.random() * 16}%;animation-delay:-${Math.random() * 1.6}s;${zs(-40 + Math.random() * 100)}`);
  [[38, 30], [44, 34], [50, 28]].forEach(([x, h]) => el(st, "abs tree", `left:${x}%;bottom:18%;height:${h}%;${zs(-120)}`));
  // residents, a firefighter and other journalists
  [2, 8, 14].forEach(x => person(st, {x, y:16, z:-30, s:.85, mask:true, c:pick(SUITS), skin:pick(SKINS)}));
  person(st, {x:20, y:16, z:-30, s:.85, helmet:true, c:"#8a5a1a", skin:pick(SKINS)});
  person(st, {x:70, y:15, z:10, cam:true, mask:true, c:"#3a3f4a", skin:pick(SKINS)});
  person(st, {x:86, y:15, z:10, cam:true, mask:true, c:"#2c3a46", skin:pick(SKINS)});
  person(st, {x:9, y:6, z:60, hero:true, mask:true, c:"#9c6b8a", skin:"#a3704f", hijab:"#5a3a4a", tag:_t("Bu Sumi", "Mrs. Sumi"), id:"sumi"});
  person(st, {x:4, y:6, z:62, s:.55, mask:true, c:"#c96a3a", skin:"#a3704f"}); // her child
  person(st, {x:78, y:8, z:40, hero:true, c:"#5a5040", skin:"#c99a74", tag:_t("Pak Bupati", "Regent"), id:"bupati", peci:true});
  person(st, {x:30, y:6, z:80, hero:true, me:true, mask:true, c:"#e9e6df", tag:"", id:"heroA"});
  person(st, {x:58, y:6, z:80, hero:true, mask:true, mic:true, c:"#9c4f5a", skin:"#b07f5e", tag:"Nadia", id:"nadiaA"});
  // layer 4: a road barrier and a slow veil of smoke in front of everyone
  el(st, "abs asap-pembatas", `left:40%;bottom:-2%;${zs(120)}`);
  el(st, "abs asap-kabut", zs(140));
  addFlashes(st, [[70, 30], [86, 30], [78, 34]]);
}

// Bab 5: the player's office at 2 a.m., lit by a laptop
function buildKamar(){
  const st = stage("stKamar");
  const R = (a, b) => a + Math.random() * (b - a);
  const motes = (n, a, b) => Array.from({length:n}, () => `<i style="left:${R(a, b)}%;top:${R(0, 90)}%;--d:${R(4, 7).toFixed(1)}s;animation-delay:-${R(0, 6).toFixed(1)}s"></i>`).join("");
  // layer 1: the room wall and a window onto the city at night, rain on the glass
  el(st, "abs km-wall", zs(-300));
  el(st, "abs km-win", zs(-240), Array.from({length:14}, () => `<i style="left:${R(4, 94)}%;top:${R(62, 92)}%"></i>`).join("") + `<span class="km-rain"></span>`);
  el(st, "abs km-curtain", `left:calc(52% - 40px);${zs(-236)}`);
  el(st, "abs km-curtain", `left:calc(52% + 224px);${zs(-236)}`);
  // layer 2: a cork board of clippings tied with red string (the fitnah being pieced together), calendar, shelf, fan
  el(st, "abs km-board", zs(-220), [[8, 10, -4], [52, 8, 3], [100, 14, -2], [24, 60, 5], [86, 64, -5]].map(([x, y, r]) => `<i style="left:${x}px;top:${y}px;--r:${r}deg"></i>`).join("")
    + `<svg viewBox="0 0 158 108"><path d="M26 18L70 16L118 22M70 16L42 66L104 72L118 22" fill="none" stroke="#c23a3a" stroke-width="1.2"/></svg>`);
  el(st, "abs km-cal", zs(-222));
  el(st, "abs km-shelf", zs(-210), [[6, 44, "#6a3a3a"], [20, 38, "#2d4f7a"], [34, 46, "#7a6a2d"], [48, 34, "#3d6b3d"], [70, 40, "#555"]].map(([x, h, c]) => `<i style="left:${x}px;--h:${h}px;--c:${c}"></i>`).join(""));
  el(st, "abs kipas", `left:88%;bottom:8%;${zs(-140)}`, "<i></i>");
  // layer 3: the desk. The laptop lights the player's face cold blue, the desk lamp gives a warm pool, the phone keeps buzzing
  el(st, "abs km-glow", zs(-40));
  person(st, {x:22, y:12, z:-30, s:1.2, seat:true, hero:true, me:true, c:"#e9e6df", tag:"", id:"heroK"});
  el(st, "abs km-pool", zs(-12));
  el(st, "abs km-desk", zs(-10));
  el(st, "abs km-dlamp", zs(-8));
  el(st, "abs km-laptop", zs(-6));
  el(st, "abs km-mug", zs(-6));
  el(st, "abs km-phone", zs(-6));
  // layer 4, out of focus: the door frame, the back of an empty chair and crumpled drafts on the floor
  const fg = el(st, "abs fg-blur", zs(110));
  el(fg, "abs km-door");
  el(fg, "abs km-chair");
  [[34, -34], [44, -40], [58, -30]].forEach(([x, y]) => el(fg, "abs km-paper", `left:${x}%;bottom:${y}%`));
}

// Bab 6: national TV debate studio
function buildTV(){
  const st = stage("stTV");
  el(st, "abs tv-garis", zs(-300));
  el(st, "abs screen", zs(-260), _t("<b>DEBAT NASIONAL</b><span>Revisi Undang-Undang Lembaga Antikorupsi</span>", "<b>NATIONAL DEBATE</b><span>Revision of the Anti-Corruption Agency Law</span>"));
  // layer 2: the lighting truss and the spots aimed at both lecterns
  el(st, "abs tv-rangka", zs(-150));
  [[20, 22], [47, 0], [74, -22]].forEach(([x, r]) => el(st, "abs tv-lampu", `left:${x}%;top:1%;rotate:${r}deg;${zs(-148)}`));
  el(st, "abs cone", `left:20%;margin-left:-90px;top:4%;--cw:200px;--ch:80%;--lc:rgba(235,240,255,.13);${zs(-40)}`);
  el(st, "abs cone", `left:74%;margin-left:-90px;top:4%;--cw:200px;--ch:80%;--lc:rgba(235,240,255,.13);${zs(-40)}`);
  // studio audience in the dark
  for (let x = 2; x < 100; x += 6) person(st, {x:x + Math.random(), y:28, z:-200, s:.7, c:"#0e1a2a", skin:"#3a3330"});
  el(st, "abs floor");
  person(st, {x:47, y:24, z:-120, seat:true, c:"#7a2d4a", skin:"#d9ae8a", tag:"Rina", id:"rina"});
  el(st, "abs modesk", `left:50%;margin-left:-55px;bottom:22%;${zs(-110)}`);
  person(st, {x:20, y:16, z:20, hero:true, me:true, c:"#e9e6df", tag:"", id:"heroTV"});
  el(st, "abs lectern", `left:18%;bottom:12%;--lc:#4aa3ff;${zs(30)}`);
  person(st, {x:74, y:16, z:20, hero:true, c:"#1e2a3a", skin:"#c99a74", tag:"Hendra", id:"hendra"});
  el(st, "abs lectern", `left:72%;bottom:12%;--lc:#ff5a5a;${zs(30)}`);
  // layer 4: cameras with red tally lights, floor monitors and the front row
  el(st, "abs tripod", `left:2%;bottom:0;${zs(110)}`, `<span class="tv-tally"></span>`);
  el(st, "abs tripod", `left:90%;bottom:0;${zs(110)}`, `<span class="tv-tally"></span>`);
  el(st, "abs tv-monlantai", `left:26%;bottom:-4%;${zs(120)}`);
  el(st, "abs tv-monlantai", `left:62%;bottom:-4%;${zs(120)}`);
  [14, 40, 52, 82].forEach(x => person(st, {x, y:-12, z:160, s:1.1, back:true}));
}

// Bab 7: plenary session hall with tiered rows of members
function buildSidang(){
  const st = stage("stSidang");
  el(st, "abs panelwall", zs(-280));
  el(st, "abs sidang-plafon", zs(-278));
  [[8], [86]].forEach(([x]) => { el(st, "abs sidang-jendela", `left:${x}%;${zs(-276)}`); el(st, "abs sidang-sinar", `left:${x}%;${zs(-270)}`); });
  [[34], [62]].forEach(([x]) => el(st, "abs sidang-tirai", `left:${x}%;${zs(-272)}`));
  el(st, "abs kipas", `left:22%;bottom:40%;${zs(-240)}`, "<i></i>");
  el(st, "abs emblem2", `left:50%;margin-left:-28px;top:4%;${zs(-270)}`);
  el(st, "abs banner", "transform:translateX(-50%) translateZ(-260px) scale(1.1);top:24%", "RAPAT PARIPURNA DEWAN REPUBLIK SENDARU");
  [40, 47, 54].forEach((x, i) => person(st, {x, y:40, z:-200, s:.8, seat:true, peci:true, c:i === 1 ? "#1d1d1d" : pick(SUITS), skin:pick(SKINS), tag:i === 1 ? _t("Ketua", "Chair") : undefined, id:i === 1 ? "ketua" : undefined}));
  el(st, "abs bench", `left:50%;margin-left:-150px;bottom:36%;${zs(-190)}`);
  el(st, "abs chamberfloor");
  // three rows of members; the centre aisle stays free for the speaker
  [[30, -120, .8], [20, -60, .9], [10, 0, 1]].forEach(([y, z, s]) => {
    el(st, "abs seatrow", `left:-4%;right:58%;bottom:${y - 2}%;${zs(z)}`);
    el(st, "abs seatrow", `left:58%;right:-4%;bottom:${y - 2}%;${zs(z)}`);
    for (let x = -2; x < 100; x += 6.5){
      if (x > 36 && x < 58) continue;
      const m = person(st, {x:x + Math.random(), y, z, s, seat:true, c:pick(SUITS), skin:pick(SKINS), peci:Math.random() < .4, hijab:Math.random() < .2 ? pick(["#3a4a5a", "#5a2a2a", "#2f4a3a"]) : null});
      m.classList.add("mbr");
    }
  });
  person(st, {x:12, y:10, z:10, seat:true, c:"#4a2a2a", skin:"#c99a74", tag:_t("Koalisi", "Coalition"), id:"anggota"});
  person(st, {x:66, y:10, z:10, seat:true, c:"#3a2450", tag:"Darsono", id:"darsonoS"});
  person(st, {x:46, y:8, z:70, hero:true, me:true, c:"#e9e6df", tag:"", id:"heroS"});
  el(st, "abs micstand", `left:52%;bottom:8%;${zs(72)}`);
  // press gallery
  person(st, {x:88, y:30, z:-100, s:.8, cam:true, c:"#2c3a46", skin:pick(SKINS)});
  person(st, {x:94, y:30, z:-100, s:.8, mic:true, c:"#9c4f5a", skin:"#b07f5e", tag:"Nadia", id:"nadiaS"});
  // layer 4: the public gallery railing and spectators seen from behind
  el(st, "abs sidang-pagar", zs(130));
  [-2, 8, 86, 96].forEach(x => person(st, {x, y:-12, z:160, s:1.1, back:true}));
  addFlashes(st, [[88, 44], [6, 40], [92, 46]]);
}
// members who dare to stand with the player (n of up to 48 in the story maths)
function standUp(n){
  const all = [...document.querySelectorAll("#stSidang .p.mbr")];
  const k = Math.round(all.length * Math.min(1, n / 48));
  all.sort(() => Math.random() - .5).forEach((m, i) => setTimeout(() => m.classList.toggle("up", i < k), i < k ? 200 + i * 90 : 0));
}

// Bab 8: night broadcast studio; the crowd waits outside the window
function buildSiaran(){
  const st = stage("stSiaran");
  // layer 1: dark studio and a huge LED wall: the crowd outside holding up phone lights, the title and a live voice meter
  el(st, "abs sr-back", zs(-320));
  el(st, "abs sr-led", zs(-260), `<div class="sr-crowd"></div><div class="sr-title">${_t("Kami Mendengar", "We Hear You")}</div><div class="sr-wave"></div>`);
  el(st, "abs onair", `left:3%;top:4%;${zs(-250)}`, "ON AIR");
  el(st, "abs monitor", `right:3%;top:4%;${zs(-250)}`, "<b>●</b> NASIONAL · SEMUA KANAL");
  // layer 2: the lighting truss, three cans and one hard beam on the desk
  el(st, "abs sr-truss", zs(-160));
  [30, 50, 70].forEach(x => el(st, "abs sr-can", `left:calc(${x}% - 11px);${zs(-158)}`));
  el(st, "abs sr-beam", `left:50%;${zs(-150)}`);
  [[11, -120], [76, -120]].forEach(([x, z]) => el(st, "abs sr-mon", `left:${x}%;${zs(z)}`));
  // layer 3: floor with a pool of light, the player at the news desk, Nadia filming from the side
  el(st, "abs sr-floor", zs(-140));
  person(st, {x:48, y:12, z:-30, s:1.15, seat:true, hero:true, me:true, c:"#e9e6df", tag:"", id:"heroSi"});
  el(st, "abs sr-desk", zs(-10));
  person(st, {x:80, y:4, z:40, s:1.1, hero:true, cam:true, c:"#9c4f5a", skin:"#b07f5e", tag:"Nadia", id:"nadiaSi"})
    .insertAdjacentHTML("beforeend", `<span class="tally"></span>`);
  el(st, "abs tripod", `left:12%;bottom:-6%;${zs(60)}`, `<span class="tv-tally"></span>`);
  // layer 4, out of focus: the teleprompter and the floor crew with headsets
  const fg = el(st, "abs fg-blur", zs(110));
  el(fg, "abs sr-prompter");
  [[18, 104], [70, 96]].forEach(([x, h]) => el(fg, "abs sil", `left:${x}%;bottom:-62%;height:${h}px`, `<span class="headset" style="position:absolute;top:-34px;left:50%;width:40px;height:22px;margin-left:-20px;border:3px solid #222;border-bottom:0;border-radius:20px 20px 0 0"></span>`));
}
