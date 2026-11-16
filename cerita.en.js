// =====================================================================
// SUARA TERAKHIR (THE LAST VOICE): English story text (Prologue to Chapter 9)
// Same logic as cerita.js; only the visible text is translated. Loaded instead of cerita.js
// when the player picks English on the title screen (see the loader in index.html).
// All characters, places and companies are fictional.
//
// Placeholder: {p} = sir/ma'am (mid-sentence only), {N} = player's first name.
// Typed lines (t, PROLOG_LINES, B8_PIDATO) use plain ASCII only, so any keyboard can match them.
// Ids (vo, node, folder, flags, evidence and promise keys) stay as in cerita.js.
// d = Trust change, e = Elite Pressure change, r = reaction (not voiced).
// =====================================================================

const EVIDENCE = {
  kayu:       { tag:"Numbered logs",   text:"A photo of numbered logs." },
  bansos:     { tag:"Aid report",      text:"A social aid report with no recipient signatures." },
  impor:      { tag:"Import permit",   text:"Import permit records owned by Mr. Darsono's younger brother." },
  satelit:    { tag:"Satellite image", text:"Satellite images of fire hotspots inside a palm oil concession." },
  video:      { tag:"Original footage", text:"Original footage proving the smear video was fake." },
  sertifikat: { tag:"Sea certificates", text:"263 land certificates issued for plots in the sea." }
};

// Promises not yet kept. The people collect on them in Chapter 8.
const PROMISES = {
  tanggul_sebulan:  "build the levee within one month",
  nama_kayu:        "name the owner of the logs tomorrow",
  penjara_sawit:    "put the palm oil company in jail",
  rumah_warga:      "replace every damaged home",
  bansos_besok:     "get all the aid to the shelter by tomorrow morning",
  uang_tunai:       "give cash to every family at the shelter",
  cair_12jam:       "release the aid within twelve hours",
  cair_minggu_ini:  "release the aid this week",
  beras_turun:      "bring rice prices down next month",
  beras_murah:      "make rice cheaper than Bram promised",
  politik_bersih:   "clean up politics within five years",
  biaya_anak:       "pay for the treatment of every sick child",
  langit_biru:      "bring back blue skies next week",
  bukti_pendengung: "prove who paid the buzzers",
  mundur:           "resign from the house if the revision passed",
  rev_gagal:        "stop the revision of the law"
};
// A caller's line collecting on each promise (Chapter 8). VO: b8_tagih_<id>_l / _p
const TAGIH = {
  tanggul_sebulan:  "You promised the levee would stand within one month. It's been months, and all we have is a project sign.",
  nama_kayu:        "You promised to name the owner of those logs the very next day. We're still waiting.",
  penjara_sawit:    "You promised to put the palm oil company in jail the next day. Why are they still free?",
  rumah_warga:      "You promised every one of our damaged homes would be replaced. To this day, we still live in tents.",
  bansos_besok:     "You promised all the aid would reach the shelter the next morning. We waited for days.",
  uang_tunai:       "You promised cash for every family at the shelter. That money never came.",
  cair_12jam:       "You promised the aid would be released within twelve hours. In the end, we waited two more weeks.",
  cair_minggu_ini:  "You promised the aid would be released that same week. In the end, we waited a month.",
  beras_turun:      "You promised rice prices would fall the next month. Now they have gone up again.",
  beras_murah:      "You promised rice would be cheaper than what Bram promised. At the market, the price never changed.",
  politik_bersih:   "You promised to clean up politics within five years. Tonight, you're the one about to be arrested.",
  biaya_anak:       "You promised to pay for the children made sick by the smoke. My child's hospital bill is still unpaid.",
  langit_biru:      "You promised our sky would be blue again within a week. The smoke only cleared two months later.",
  bukti_pendengung: "You promised to prove who paid the buzzers. Where is the proof?",
  mundur:           "You promised to resign if that revision passed. It passed last week, and you're still in the house.",
  rev_gagal:        "You promised that revision would never pass. Last week, it passed."
};
const SAFE_OFFER = 10; // this many safe answers make Mr. Darsono offer a seat (hidden ending)

// ---------------------------------------------------------------------
// PROLOGUE
// ---------------------------------------------------------------------
const PROLOG_LINES = [
  {t:"I swear that I will work for the people.", vo:"sumpah_1"},
  {t:"I will not stay silent when something is wrong.", vo:"sumpah_2"},
  {t:"The voice of the people is the voice I bring to this building.", vo:"sumpah_3"}
];
async function prolog(){
  chapterStart(0, "Oath of Office", "hall", "", "aula");
  const pick = await card({ vo:"prolog_buka", voFrom:2, btn:"Step Up to the Podium", alt:"Skip Tutorial", parts:[
    {tag:"h2", text:"Prologue"}, {tag:"h1", text:"Oath of Office"},
    {tag:"p", cls:"story", text:"The house of representatives, morning. Your first day as a representative of the people."}],
    after: brief("How to Play", "", "Type your speech exactly. There's no time limit.", ["Capital letters must match", "Punctuation must match"], false) });
  // skipping the tutorial also skips speed calibration: assume ~36 words per minute (same as the name-card checkbox)
  if (pick === "alt"){ S.cps = 3; return; }
  await say("Master of Ceremonies", "Would the youngest member of the house please step up to the podium to take the oath of office.", null, {vo:"mc_panggil"});
  flashes(3);
  await wait(400);
  await say("Master of Ceremonies", "Please rise.", null, {vo:"mc_berdiri"});
  await wait(500);
  const {chars, secs} = await speech(PROLOG_LINES, "hero", "Oath of office");
  // calibrate: characters per second, clamped so very slow or very fast typists still get a fair game
  S.cps = Math.max(1.2, Math.min(8, chars / secs));
  await say("Master of Ceremonies", "Thank you. Ladies and gentlemen, please give a round of applause.", null, {vo:"mc_tepuk_tangan"});
  applause(3.5); flashes(5);
  await wait(2000);
  await say("Another Official", "(chuckles) Honest politics? How cute.", null, {vo:"tertawa", folder:"pejabat"});
  await wait(1400);
  await say("Mr. Darsono", "In here, the loudest voice is usually the first to disappear. Just a friendly reminder, kid. Politics isn't about right or wrong. It's about who survives.", null, {vo:"prolog", folder:"darsono"});
  await wait(1800);
  const wpm = Math.round(S.cps * 60 / 5);
  await card({ btn:"Go to Chapter 1", parts:[{tag:"h2", text:"Speech Complete"}],
    after:`<div class="bignum"><b>${wpm}</b><span>words per minute</span></div><p class="story">That's your typing speed. Time limits in the chapters ahead are adjusted to it.</p>` });
}

// ---------------------------------------------------------------------
// CHAPTER 1: RISING WATER (forum: Doorstop Interview)
// ---------------------------------------------------------------------
function bab1Data(){
  return [
    { q:"This levee was promised three years ago. Why hasn't it been built yet? People here have lost their homes, and we need an honest answer, not another promise.", vo:"b1_q1",
      opts:[
        {t:"The budget was released. I want to find out where the money went.", vo:"b1_q1_a", d:+12, r:"Nadia nods slowly. The residents behind her start recording."},
        {t:"The rain was extreme. This is purely a natural disaster.", vo:"b1_q1_b", d:-10, r:`A woman shouts, "It rains every year, {p}!"`},
        {t:"That's the agency's business, not mine.", vo:"b1_q1_c", d:-15, r:`Nadia lowers her microphone. "You're our representative, aren't you?"`}
      ],
      sulit:[
        {t:"The money came three years ago and the levee never did. I'll trace where it went.", vo:"b1_q1_sa", d:+12, r:"Nadia nods slowly. The residents behind her start recording."},
        {t:"We're reviewing every budget so this never happens again.", vo:"b1_q1_sb", d:-4, safe:true, r:"It sounds tidy, but these people have heard that sentence far too often."},
        {t:"One month from now this levee will stand, I guarantee it!", vo:"b1_q1_sc", d:+2, promise:"tanggul_sebulan", r:"The crowd cheers. But one month is a very bold promise."}
      ]},
    { q:"What will you do for these people tonight?", vo:"b1_q2",
      opts:[
        {t:"My house becomes a shelter tonight, and I'll sleep here too.", vo:"b1_q2_a", d:+10, r:"A few residents start carrying mattresses to the shelter."},
        {t:"We will discuss it at the meeting next week.", vo:"b1_q2_b", d:-8, safe:true, r:`"By next week our houses will be gone, {p}."`},
        {t:"There's enough aid already. People shouldn't be so spoiled.", vo:"b1_q2_c", d:-20, r:"The clip spreads through every neighborhood chat group within minutes."}
      ],
      sulit:[
        {t:"Tonight my house is open, and every family will get a place to sleep.", vo:"b1_q2_sa", d:+10, r:"A few residents start carrying mattresses to the shelter."},
        {t:"I've called social services, and the aid is on its way here.", vo:"b1_q2_sb", d:+2, r:"The right step, but people want to see you do something yourself."},
        {t:"Whatever happens, I'm not going home until the water goes down.", vo:"b1_q2_sc", d:+3, r:"A heroic line, but people need real help. Showing up isn't enough."}
      ]},
    { q:"The Minister of Public Works says this flood is the residents' fault for dumping trash everywhere. What's your response?", vo:"b1_q3",
      opts:[
        {t:"Trash is a problem. The bigger problem is that the levee was never built.", vo:"b1_q3_a", d:+12, r:`Nadia writes quickly. "Can I quote you on that?"`},
        {t:"I agree with the Minister.", vo:"b1_q3_b", d:-10, safe:true, r:`The residents exchange looks. "Just like the rest of them."`},
        {t:"The Minister has no idea what he is talking about.", vo:"b1_q3_c", d:-4, r:"True or not, it sounds rude. The clip becomes a meme."}
      ],
      sulit:[
        {t:"Trash is a problem. The bigger problem is that the levee was never built.", vo:"b1_q3_sa", d:+12, r:`Nadia writes quickly. "Can I quote you on that?"`},
        {t:"Both the government and the residents share the blame here.", vo:"b1_q3_sb", d:-3, safe:true, r:"It sounds wise, but it also sounds like defending the Minister."},
        {t:"The Minister is welcome to come here and see it for himself.", vo:"b1_q3_sc", d:+5, r:"A subtle jab. But the public is still waiting for your own position."}
      ]},
    { q:"Neatly cut logs are floating down the river. Do you know where they came from?", vo:"b1_q4",
      opts:[
        {t:"Not yet. What I do know is that this evidence goes with me to the house.", vo:"b1_q4_a", d:+12, ev:"kayu", r:"Nadia photographs the number stamped on the end of the log."},
        {t:"Those are just trees that fell in the heavy rain.", vo:"b1_q4_b", d:-10, r:"A resident points at the chainsaw marks on the log."},
        {t:"This must be the palm oil company. Tomorrow I'll put them in jail!", vo:"b1_q4_c", d:+3, promise:"penjara_sawit", r:"The crowd cheers. But a promise that big will be collected on."}
      ],
      sulit:[
        {t:"Not yet. What I do know is that this evidence goes with me to the house.", vo:"b1_q4_sa", d:+12, ev:"kayu", r:"Nadia photographs the number stamped on the end of the log."},
        {t:"It looks like illegal logging. We will look into it.", vo:"b1_q4_sb", d:+4, r:"Reasonable, but without proof, that line is easy to deny."},
        {t:"I know who owns them. Tomorrow I'll name them.", vo:"b1_q4_sc", d:+2, promise:"nama_kayu", r:"Other reporters swarm in. If there's no name tomorrow, you'll be called a liar."}
      ]},
    { q:"What's your message for the people who lost their homes tonight?", vo:"b1_q5",
      opts:[
        {t:"I won't stop until all of you have a home again.", vo:"b1_q5_a", d:+12, r:"A moment of silence. Then someone starts to clap."},
        {t:"Be patient. There's a lesson in everything.", vo:"b1_q5_b", d:-5, r:"The words sound hollow in the pouring rain."},
        {t:"Remember to vote for me again in the next election.", vo:"b1_q5_c", d:-15, r:`Nadia switches off her camera. "I thought you were different."`}
      ],
      sulit:[
        {t:"I won't stop until all of you have a home again.", vo:"b1_q5_sa", d:+12, r:"A moment of silence. Then someone starts to clap."},
        {t:"The government will replace every damaged home.", vo:"b1_q5_sb", d:+2, promise:"rumah_warga", r:"People applaud, but you don't have the authority to promise that yet."},
        {t:"I'm so sorry. This must be terribly hard for all of you.", vo:"b1_q5_sc", d:+3, r:"Sincere, but it doesn't say what you'll actually do."}
      ]}
  ];
}
async function bab1(){
  chapterStart(1, "Rising Water", "flood", "", "banjir");
  await card({ vo:"bab1_buka", voFrom:2, mark:1, btn:"Go to the Site", parts:[
    {tag:"h2", text:"Chapter 1"}, {tag:"h1", text:"Rising Water"},
    {tag:"p", cls:"story", text:"Three days after your swearing-in, a flood swallows your district. A young reporter is waiting for you at the water's edge."}],
    after: brief("New Forum", "Doorstop Interview", "The reporter asks, and you have three possible answers. Type the one you want to say.",
      ["Start with a capital letter", "Mind the punctuation", S.relaxed ? "No time limit" : "There's a time limit"]) });
  S.rec = true; // record typing stats for this chapter
  await runForum(bab1Data(), {...FORUMS.cegat, who:"Nadia · Reporter", node:"nadia", folder:"nadia", hero:"heroF", prompt:"Answer Nadia's question"});
  await chapterEnd(1, {
    tinggi:["The Only Official Who Waded Into the Water", "Nadia's article is read by millions. Your name is getting known, and the Round Table is taking note of it."],
    sedang:["New Representative: Hope or Lip Service?", "The public is still unsure. Your chance isn't over yet."],
    rendah:["Just Like All the Others", "People are disappointed. Lost trust is hard to win back."]
  }, "The Missing Aid");
}

// ---------------------------------------------------------------------
// CHAPTER 2: THE MISSING AID (new forum: Comment Section; new meter: Elite Pressure)
// ---------------------------------------------------------------------
function bab2Data(){
  return [
    { who:"@bunda_raisa", q:"We have been living in the evacuation camp for two weeks now. Where did the aid that was supposedly sent actually go?", vo:"b2_q1",
      opts:[
        {t:"I'm tracing the data right now. I'll post the results here.", vo:"b2_q1_a", d:+10, r:"Thousands like your comment. Some residents share photos of the empty shelter."},
        {t:"The aid is being processed. Please be patient.", vo:"b2_q1_b", d:-6, safe:true, r:`The first reply under your comment: "Patient until when, {p}?"`},
        {t:"Ask the ministry. That isn't under my authority.", vo:"b2_q1_c", d:-12, r:"A screenshot of your reply spreads with the caption: representative passes the buck."}
      ],
      sulit:[
        {t:"I've requested the distribution data. As soon as I get it, I'll post it here.", vo:"b2_q1_sa", d:+10, r:"Thousands like your comment. Some residents share photos of the empty shelter."},
        {t:"The distribution was delayed. We're looking for the cause.", vo:"b2_q1_sb", d:+2, safe:true, r:"Honest, but people want to know who is holding the aid back."},
        {t:"By tomorrow morning all the aid will have reached the shelter.", vo:"b2_q1_sc", d:+2, promise:"bansos_besok", r:"People are relieved to read it. But you have no control over those aid trucks."}
      ]},
    { who:"@kabar.sendaru", q:"The Minister of Social Affairs says one hundred percent of the aid has been distributed. Do you have different data?", vo:"b2_q2",
      opts:[
        {t:"The data at other shelters says otherwise. I want the distribution audited.", vo:"b2_q2_a", d:+10, e:+6, r:"The news account quotes your reply. At the ministry, a few phones start ringing."},
        {t:"I trust the Minister's statement.", vo:"b2_q2_b", d:-10, safe:true, r:"People at the shelter reply with photos of empty plates."},
        {t:"The Minister of Social Affairs is lying and must resign today!", vo:"b2_q2_c", d:+3, e:+20, r:"Thousands cheer in the comments. At the ministry, someone writes your name down."}
      ],
      sulit:[
        {t:"The people at this shelter have received nothing. That number must be audited.", vo:"b2_q2_sa", d:+10, e:+6, r:"The news account quotes your reply. At the ministry, a few phones start ringing."},
        {t:"Maybe the national and local data just don't match yet.", vo:"b2_q2_sb", d:-2, safe:true, r:"It sounds reasonable, but also like making excuses for the ministry."},
        {t:"If the number is right, show us the list of recipients today.", vo:"b2_q2_sc", d:+6, e:+12, r:"A sharp challenge. The ministry doesn't answer, but they heard it."}
      ]},
    { who:"@infoviral_88", q:"People say the aid was held back because folks here didn't vote for the ruling party. Is that true?", vo:"b2_q3",
      opts:[
        {t:"I don't have proof of that yet. Let's wait until the data is clear.", vo:"b2_q3_a", d:+8, r:"Some users praise you for not spreading rumors."},
        {t:"Absolutely right, this is clearly a political game!", vo:"b2_q3_b", d:-8, e:+10, r:"The rumor turns out to be a hoax. Now you're accused of helping spread it."},
        {t:"That's a hoax. I'll report whoever spreads it to the police.", vo:"b2_q3_c", d:-6, r:"Your threat scares people out of asking questions. The comments go quiet."}
      ],
      sulit:[
        {t:"I haven't seen any proof, so I won't start guessing.", vo:"b2_q3_sa", d:+8, r:"Some users praise you for not spreading rumors."},
        {t:"It could be. This kind of pattern has happened before.", vo:"b2_q3_sb", d:-6, e:+8, r:"The hoax spreaders use your words as confirmation."},
        {t:"Impossible. The government would never be that cruel.", vo:"b2_q3_sc", d:-4, safe:true, r:"People who have gone hungry for two weeks don't believe that defense."}
      ]},
    { who:"Document from Ms. Laras", q:"Social Aid Distribution Report, Muara Hilir District. Which part matters most?", silent:true, noTimer:true, feed:false, node:null,
      prompt:"Mark the most important part of the document", hint:"Type the line you think matters most, then press Enter.",
      opts:[
        {t:"Recipients: 4,200 families. Recipient signatures: 0.", d:+6, ev:"bansos", r:"Thousands of recipients, and not a single signature. The aid only existed on paper."},
        {t:"Distribution schedule: every Monday and Thursday at 08.00.", d:0, r:"Just a schedule. Nothing suspicious there."},
        {t:"Note: the temporary warehouse is inside the ministry compound.", d:+2, r:"Interesting, but it doesn't prove anything yet."}
      ],
      sulit:[
        {t:"There are 4,200 families listed, but the signature column is empty.", d:+6, ev:"bansos", r:"Thousands of recipients, and not a single signature. The aid only existed on paper."},
        {t:"Distribution partner: PT Bundar Logistik Sendaru.", d:+2, r:"The partner's name matters, but without proof of wrongdoing, a name isn't enough."},
        {t:"The distribution budget doubled compared to last year.", d:+2, r:"Suspicious, but a budget increase could have a reason."}
      ]},
    { who:"@pak_rt_muara", q:"I'm the neighborhood head here. If you really care, what can you do for us now, not later?", vo:"b2_q4",
      opts:[
        {t:"Today I'll buy rice for this shelter with my own money.", vo:"b2_q4_a", d:+8, r:"Photos of rice sacks at the shelter go around. Small help, but real."},
        {t:"Next year I'll propose an additional budget.", vo:"b2_q4_b", d:-6, safe:true, r:`"Next year?" the neighborhood head replies. "We need to eat today."`},
        {t:"I'm a victim of the system too, so there isn't much I can do.", vo:"b2_q4_c", d:-10, r:"Users call your reply the laziest excuse of the week."}
      ],
      sulit:[
        {t:"This afternoon I'll bring rice and medicine to the shelter and hand it out myself.", vo:"b2_q4_sa", d:+8, r:"Photos of rice sacks at the shelter go around. Small help, but real."},
        {t:"I've contacted several donors. Hopefully we hear back soon.", vo:"b2_q4_sb", d:+2, r:"Good, but nobody can eat hopefully."},
        {t:"Starting tomorrow, I'll give cash to every family at the shelter.", vo:"b2_q4_sc", d:+2, promise:"uang_tunai", r:"Your comment is flooded with thanks. But where will the money come from?"}
      ]},
    { who:"@bramsatria", q:"If I were the representative, social aid would be released within twenty-four hours. People need action, not audits.", vo:"b2_q5", folder:"bram",
      opts:[
        {t:"Fast aid is good. Even better is aid that doesn't get stolen on the way.", vo:"b2_q5_a", d:+10, r:"Your reply is quoted thousands of times. Bram doesn't reply again."},
        {t:"Go ahead and prove it, if you can.", vo:"b2_q5_b", d:-3, r:"The little spat becomes a show, not a solution."},
        {t:"I can release it in twelve hours too!", vo:"b2_q5_c", d:+2, promise:"cair_12jam", r:"Now two promises are racing each other. The people will collect on both."}
      ],
      sulit:[
        {t:"An audit is exactly what makes the next round of aid reach the right people.", vo:"b2_q5_sa", d:+10, r:"Your reply is quoted thousands of times. Bram doesn't reply again."},
        {t:"Come on, let's just work together. People don't need us fighting.", vo:"b2_q5_sb", d:+3, safe:true, r:"A calm line, but Bram uses it to pose for photos with the residents."},
        {t:"I agree. This week the aid will definitely be released.", vo:"b2_q5_sc", d:+3, promise:"cair_minggu_ini", r:"People are happy to read it. But there are only four days left this week."}
      ]}
  ];
}
async function bab2(){
  chapterStart(2, "The Missing Aid", "posko", "feedOn", "posko");
  await card({ vo:"bab2_buka", voFrom:2, mark:2, btn:"Open the Comment Section", parts:[
    {tag:"h2", text:"Chapter 2"}, {tag:"h1", text:"The Missing Aid"},
    {tag:"p", cls:"story", text:"Two weeks after the flood, the social aid still hasn't arrived. At the shelter, people queue with empty plates, while your name starts trending on social media."}],
    after: brief("New Forum", "Comment Section", "Residents' comments pop up one by one on your phone. Reply by typing one of the answers. Every reply is read by thousands.",
      ["New meter: Elite Pressure", "Attacking officials raises Elite Pressure", S.relaxed ? "No time limit" : "Time is still generous"]) });
  await say("Narrator", "Your phone buzzes. The video of your riverside interview has been watched two million times.", null, {vo:"b2_n1"});
  S.rec = true;
  const F = {...FORUMS.sosmed, who:"Netizens", folder:"warga", hero:"heroPk", prompt:"Reply to this comment",
    timeout:{line:"The comment sinks without an answer. Your silence is taken as your answer.", d:-6}};
  const data = bab2Data();
  await runForum(data.slice(0, 3), F);
  await say("Narrator", "A message arrives from an unknown number. The sender says her name is Laras, an employee at the Ministry of Social Affairs.", null, {vo:"b2_n2"});
  await say("Ms. Laras", "I can't talk long. I'm sending you one document. Read it carefully, then mark the part that matters most.", null, {vo:"b2_laras1", folder:"laras"});
  await runForum(data.slice(3), F);
  await say("Narrator", "Three days later, the Minister of Social Affairs is dismissed. Part of the aid is released, but not a single member of the Round Table is touched.", null, {vo:"b2_n3"});
  await chapterEnd(2, {
    tinggi:["Aid Data Exposed, Social Affairs Minister Dismissed", "People start receiving aid. But the minister was only a scapegoat, and the Round Table stays intact."],
    sedang:["Minister Dismissed, Residents Still Waiting", "The public is starting to notice you, but doesn't fully trust you yet."],
    rendah:["Aid Partly Released, Young Representative Drowned Out", "People feel your replies only added to the noise in the comments."]
  }, "Rising Prices");
}

// ---------------------------------------------------------------------
// CHAPTER 3: RISING PRICES (new forum: Podcast; new meter: Pending Promises)
// ---------------------------------------------------------------------
function bab3Data(){
  return [
    { q:"Let's get straight to it. Cooking oil has vanished from the markets, even though our country is the world's largest palm oil producer. How is that possible?", vo:"b3_q1",
      opts:[
        {t:"Someone is holding back supply on purpose to push prices up. That's what we have to expose.", vo:"b3_q1_a", d:+10, e:+5, r:`Dimas leans back in his chair. "Now that's an honest conversation."`},
        {t:"Global demand is high right now, so this is normal.", vo:"b3_q1_b", d:-8, safe:true, r:"The live chat fills with one question: normal how?"},
        {t:"It's all because of greedy market traders.", vo:"b3_q1_c", d:-10, r:"Small traders are furious. They can barely get stock themselves."}
      ],
      sulit:[
        {t:"The goods exist, they're just stuck in warehouses. I want to know who is holding them.", vo:"b3_q1_sa", d:+10, e:+5, r:`Dimas leans back in his chair. "Now that's an honest conversation."`},
        {t:"World prices are rising, and we are feeling the impact.", vo:"b3_q1_sb", d:-2, safe:true, r:"Partly true, but listeners know the warehouses in Sendaru are full."},
        {t:"This is a government failure. I'm ashamed to be part of it.", vo:"b3_q1_sc", d:+3, e:+8, r:"A brave admission, but listeners are waiting for a way out."}
      ]},
    { q:"Our listeners want certainty. Can you promise that rice prices will fall next month?", vo:"b3_q2",
      opts:[
        {t:"I won't promise something I can't be sure of yet.", vo:"b3_q2_a", d:+8, r:"Dimas pauses. It's an answer he rarely hears from a politician."},
        {t:"Yes, next month rice prices will definitely fall.", vo:"b3_q2_b", d:+3, promise:"beras_turun", r:"The clip is cut and shared. Next month, everyone will be checking prices."},
        {t:"That depends on the central government, not on me.", vo:"b3_q2_c", d:-6, safe:true, r:`"Then why did we vote for you?" a listener writes.`}
      ],
      sulit:[
        {t:"One thing I can promise: I'll make the rice stock data public.", vo:"b3_q2_sa", d:+10, r:"A small promise, but one that can be kept. Dimas nods."},
        {t:"I'll do everything I can to bring prices down next month.", vo:"b3_q2_sb", d:+3, promise:"beras_turun", r:"It sounds careful, but listeners still write it down as a promise."},
        {t:"If those warehouses are opened, prices will surely fall within a month.", vo:"b3_q2_sc", d:+4, promise:"beras_turun", r:"The logic makes sense, but that word surely will be collected on."}
      ]},
    { q:"Bram Satria is promising rice at five thousand rupiah a kilo. What's your response?", vo:"b3_q3",
      opts:[
        {t:"Sweet promises are easy. People deserve to know where the money comes from.", vo:"b3_q3_a", d:+10, r:"An economist shares your clip and writes: finally, someone asked."},
        {t:"I can make it even cheaper than that!", vo:"b3_q3_b", d:+2, promise:"beras_murah", r:"A promise war begins. Listeners cheer, but nobody knows how."},
        {t:"Bram is a liar. Don't believe him.", vo:"b3_q3_c", d:-6, r:"Bram's supporters flood the comments. The talk turns into a brawl."}
      ],
      sulit:[
        {t:"Show us the math. A subsidy that big means somebody has to pay for it.", vo:"b3_q3_sa", d:+10, r:"An economist shares your clip and writes: finally, someone asked."},
        {t:"If he can do it, great. As long as the numbers add up, I support it.", vo:"b3_q3_sb", d:+2, safe:true, r:"A polite stance. But Bram uses it as an endorsement of his promise."},
        {t:"Even four thousand is possible, if we wipe out the import mafia.", vo:"b3_q3_sc", d:+3, e:+8, promise:"beras_murah", r:"Listeners cheer. You just joined the promise war."}
      ]},
    { q:"One last thing. A lot of young people say politics is dirty and pointless. What would you like to tell them?", vo:"b3_q4",
      opts:[
        {t:"Politics is dirty. That's exactly why good people must not walk away.", vo:"b3_q4_a", d:+10, r:"That line becomes the most shared quote of the week."},
        {t:"Don't think about it too much, just enjoy your lives.", vo:"b3_q4_b", d:-8, r:"The young listeners feel talked down to."},
        {t:"Vote for me, and politics will be clean within five years.", vo:"b3_q4_c", d:+1, promise:"politik_bersih", r:"It sounds like a campaign ad. A very big promise."}
      ],
      sulit:[
        {t:"If honest people leave, their seats get filled by dishonest ones.", vo:"b3_q4_sa", d:+10, r:"That line becomes the most shared quote of the week."},
        {t:"It's okay to be disappointed, as long as you still show up to vote.", vo:"b3_q4_sb", d:+4, r:"A good message, even if it sounds like a public service ad."},
        {t:"Give me five years, and I'll clean up the politics of this country.", vo:"b3_q4_sc", d:+2, promise:"politik_bersih", r:"It sounds grand. In five years, this clip will be played again."}
      ]},
    { who:"Document from Ms. Laras", q:"This Year's Rice Import Permits. Which part matters most?", silent:true, noTimer:true, node:null,
      prompt:"Mark the most important part of the document", hint:"Type the line you think matters most, then press Enter.",
      opts:[
        {t:"Sole permit holder: PT Bundar Pangan Sejahtera, commissioner Haryo Darsono.", d:+6, ev:"impor", r:"The commissioner of the sole import permit holder turns out to be Mr. Darsono's younger brother."},
        {t:"Import quota this year: 2 million tons.", d:0, r:"A big number, but it doesn't show who benefits."},
        {t:"Unloading port: Tanjung Sendaru.", d:0, r:"Just a location. Nothing odd there."}
      ],
      sulit:[
        {t:"Commissioner of PT Bundar Pangan Sejahtera: Haryo Darsono.", d:+6, ev:"impor", r:"The commissioner of the sole import permit holder turns out to be Mr. Darsono's younger brother."},
        {t:"The import permit was issued two days before prices started rising.", d:+3, r:"Suspicious timing, but who benefits?"},
        {t:"The import quota is split evenly among seven companies.", d:0, r:"It looks fair on paper. The problem is in another line."}
      ]}
  ];
}
async function bab3(){
  chapterStart(3, "Rising Prices", "pod", "", "siniar");
  await card({ vo:"bab3_buka", voFrom:2, mark:3, btn:"Enter the Studio", parts:[
    {tag:"h2", text:"Chapter 3"}, {tag:"h1", text:"Rising Prices"},
    {tag:"p", cls:"story", text:"Cooking oil disappears from the markets, and the price of rice rises three times in a month. A popular podcast, Honest Talk, invites you to speak."}],
    after: brief("New Forum", "Honest Talk Podcast", "The conversation is long and relaxed. You have more time, but precision matters more: a messy sentence sounds unconvincing.",
      ["New meter: Pending Promises", "Precision matters more than speed", "Be careful with promises"]) });
  await say("Dimas · Honest Talk", "Welcome to Honest Talk. Today our guest is the representative whose video is going viral. Just relax. In here, we speak honestly.", $("dimas"), {vo:"b3_dimas0", folder:"dimas"});
  S.rec = true;
  const F = {...FORUMS.siniar, who:"Dimas · Honest Talk", node:"dimas", folder:"dimas", hero:"heroPod", prompt:"Answer Dimas's question",
    timeout:{line:"The silence goes on too long. Dimas laughs awkwardly and changes the subject.", d:-6}};
  const data = bab3Data();
  await runForum(data.slice(0, 2), F);
  await say("Narrator", "On another podcast, Bram Satria promises rice at five thousand rupiah a kilo. The clip is watched ten million times.", null, {vo:"b3_n1"});
  await say("Bram Satria", "Rice for five thousand! That's my promise. People don't need math, people need courage!", null, {vo:"b3_bram1", folder:"bram"});
  await runForum(data.slice(2, 4), F);
  await say("Narrator", "After the show, a message arrives from Ms. Laras.", null, {vo:"b3_n2"});
  await say("Ms. Laras", "I got the list of rice import permit holders. There's one name you might recognize.", null, {vo:"b3_laras1", folder:"laras"});
  await runForum(data.slice(4), F);
  await chapterEnd(3, {
    tinggi:["Refusing Sweet Promises, Young Representative Wins Listeners", "Your clip is shared with one simple caption: turns out honesty is interesting."],
    sedang:["Five-Thousand Rice or Plain Honesty? The Public Is Split", "Some listeners praise you, others trust Bram's promise more."],
    rendah:["Bram Satria Soars, Young Representative Left Behind", "Sweet promises spread faster than honest explanations."]
  }, "Yellow Sky");
}

// ---------------------------------------------------------------------
// CHAPTER 4: YELLOW SKY (forest fires; Doorstop Interview, choices get more nuanced)
// ---------------------------------------------------------------------
function bab4Data(){
  return [
    { q:"The local government says these fires were started by farmers clearing land by burning it. Do you agree?", vo:"b4_q1",
      opts:[
        {t:"Small farmers can't burn thousands of hectares on their own.", vo:"b4_q1_a", d:+10, e:+5, r:"The farmers watching nod. Nadia writes down: thousands of hectares."},
        {t:"We need to teach farmers to stop burning their land.", vo:"b4_q1_b", d:-2, safe:true, r:"Not wrong, but it puts the blame on the people with the least power."},
        {t:"That's slander. Our farmers have never burned anything.", vo:"b4_q1_c", d:-4, r:"Some farmers do burn small plots. Your line is easy to knock down."}
      ],
      sulit:[
        {t:"Before we blame anyone, match the hotspots against the land permit map.", vo:"b4_q1_sa", d:+10, e:+5, r:"Nadia pulls her mask down for a second. \"Now that's the right question.\""},
        {t:"Everyone, farmers included, has to stop burning land.", vo:"b4_q1_sb", d:0, safe:true, r:"Fair on paper, but the big corporations get to hide behind it too."},
        {t:"This is the corporations. The farmers are just the scapegoats.", vo:"b4_q1_sc", d:+5, e:+12, r:"The crowd cheers. But without data, that accusation is easy to break."}
      ]},
    { who:"Mrs. Sumi · Resident", node:"sumi", folder:"warga", q:"My kid's been coughing for a week. School's closed, the clinic's full. Where are we supposed to go, {p}?", vo:"b4_q2",
      opts:[
        {t:"Starting tonight I'm opening a shelter house with air purifiers.", vo:"b4_q2_a", d:+10, r:"Mrs. Sumi grips your hand. That night, thirty children sleep at the shelter house."},
        {t:"Wear a mask and stay indoors as much as you can.", vo:"b4_q2_b", d:-3, safe:true, r:"Good advice, except Mrs. Sumi's house is already full of smoke."},
        {t:"Hang in there. The rain will come soon.", vo:"b4_q2_c", d:-8, r:"Mrs. Sumi looks away. The sky is still yellow, and there's no sign of rain."}
      ],
      sulit:[
        {t:"Tonight I'm opening a shelter house with air purifiers, just for the kids.", vo:"b4_q2_sa", d:+10, r:"Mrs. Sumi grips your hand. That night, thirty children sleep at the shelter house."},
        {t:"I've asked the health office to send more staff to the clinic.", vo:"b4_q2_sb", d:+4, r:"The right move, though Mrs. Sumi still has to wait in line for hours."},
        {t:"I'll pay for the treatment of every sick child here.", vo:"b4_q2_sc", d:+3, promise:"biaya_anak", r:"The mothers cry with relief. But the number of sick children keeps growing."}
      ]},
    { who:"Document from Ms. Laras", q:"Satellite Hotspot Images, West Sendaru, This Week. Which part matters most?", silent:true, noTimer:true, node:null,
      prompt:"Mark the most important part of the document", hint:"Type the line you think matters most, then press Enter.",
      opts:[
        {t:"Hotspots: 287 of 312 are inside the PT Cakrawala Sawit Sendaru concession.", d:+6, ev:"satelit", r:"Almost every hotspot is on one company's land. Its shareholder sits on the Round Table."},
        {t:"Residents' land: 25 hotspots, mostly small gardens.", d:0, r:"True, but that's only a small part of all the hotspots."},
        {t:"Wind direction: southwest, 20 kilometers per hour.", d:0, r:"Useful for guessing where the smoke goes, but it doesn't say who did it."}
      ],
      sulit:[
        {t:"A total of 287 of the 312 hotspots are inside the PT Cakrawala Sawit Sendaru concession.", d:+6, ev:"satelit", r:"Almost every hotspot is on one company's land. Its shareholder sits on the Round Table."},
        {t:"Residents' land recorded 25 hotspots, mostly small gardens.", d:0, r:"True, but that's only a small part of all the hotspots."},
        {t:"The burned peatland reached 40,000 hectares, twice as much as last year.", d:+2, r:"A horrifying number, but it doesn't say who did it."}
      ]},
    { q:"If you've got proof, would you dare say the company's name on camera?", vo:"b4_q3",
      opts:[
        {t:"I'm handing the company's name and the data to law enforcement.", vo:"b4_q3_a", d:+6, e:+5, r:"A careful move. Your data is safe with the authorities, but the public still doesn't know the name."},
        {t:"I'll say it right now: PT Cakrawala Sawit Sendaru.", vo:"b4_q3_b", d:+10, e:+25, flag:"sebut", r:"The cameras close in. That name is tonight's headline, and the Round Table hears it."},
        {t:"Not yet. I'm not naming anyone for now.", vo:"b4_q3_c", d:-4, safe:true, r:`Nadia sighs. "The smoke won't wait, {p}."`}
      ],
      sulit:[
        {t:"The data goes to law enforcement first. Then we announce it together.", vo:"b4_q3_sa", d:+6, e:+5, r:"A careful move. Your data is safe with the authorities, but the public still doesn't know the name."},
        {t:"The company is PT Cakrawala Sawit Sendaru, and I have the data.", vo:"b4_q3_sb", d:+10, e:+25, flag:"sebut", r:"The cameras close in. That name is tonight's headline, and the Round Table hears it."},
        {t:"Let the law do its job. I don't want to get ahead of it.", vo:"b4_q3_sc", d:-3, safe:true, r:`Nadia sighs. "The smoke won't wait, {p}."`}
      ]},
    { who:"The Regent", node:"bupati", folder:"bupati", q:"Don't stir up trouble, {p}. Those palm oil investors keep this region alive. If they leave, what are people going to eat?", vo:"b4_q4",
      opts:[
        {t:"People need to breathe before they can work and eat.", vo:"b4_q4_a", d:+10, e:+6, r:"The Regent doesn't answer. He walks off, already on the phone with someone."},
        {t:"Fair point. We all need to protect investment.", vo:"b4_q4_b", d:-8, safe:true, r:"The Regent smiles, satisfied. The residents watching don't smile back."},
        {t:"How much is that company paying you, sir?", vo:"b4_q4_c", d:-2, e:+12, r:"The reporters laugh, but the Regent won't forget that question."}
      ],
      sulit:[
        {t:"Investment is fine, just not by burning our children's lungs.", vo:"b4_q4_sa", d:+10, e:+6, r:"The Regent doesn't answer. He walks off, already on the phone with someone."},
        {t:"Let's find a middle ground, so investment goes on and the forest stays.", vo:"b4_q4_sb", d:0, safe:true, r:"A middle ground sounds wise, but smoke doesn't do middle grounds."},
        {t:"If those investors broke the law, their permits should go today.", vo:"b4_q4_sc", d:+5, e:+14, r:"Firm and on target. In the capital, someone writes your name down."}
      ]},
    { q:"What's your message for the people sleeping in masks tonight?", vo:"b4_q5",
      opts:[
        {t:"You're not alone. Someone caused this smoke, and we will go after them.", vo:"b4_q5_a", d:+10, r:"Nadia slowly lowers her camera. Nobody cheers, but everyone heard."},
        {t:"Stay healthy and drink plenty of water.", vo:"b4_q5_b", d:-2, safe:true, r:"Good health advice, but it sounds like a clinic announcement."},
        {t:"I promise your sky will be blue again next week.", vo:"b4_q5_c", d:+2, promise:"langit_biru", r:"People want to believe it. But peat fires can burn for months."}
      ],
      sulit:[
        {t:"Breathing clean air is your right. It's not a gift from anyone.", vo:"b4_q5_sa", d:+10, r:"Nadia slowly lowers her camera. Nobody cheers, but everyone heard."},
        {t:"Stay inside for now and look after the kids until the air gets better.", vo:"b4_q5_sb", d:+2, safe:true, r:"A caring message, but it doesn't say when this will end."},
        {t:"Next week your sky will be blue again, I guarantee it.", vo:"b4_q5_sc", d:+2, promise:"langit_biru", r:"People want to believe it. But peat fires can burn for months."}
      ]}
  ];
}
async function bab4(){
  chapterStart(4, "Yellow Sky", "asap", "", "asap");
  await card({ vo:"bab4_buka", voFrom:2, mark:4, btn:"Go to the Site", parts:[
    {tag:"h2", text:"Chapter 4"}, {tag:"h1", text:"Yellow Sky"},
    {tag:"p", cls:"story", text:"A long dry season. The sky over West Sendaru turns yellow, schools close, and hospitals fill with people who can't breathe. The officials call it a normal dry season."}],
    after: brief("Forum", "Doorstop Interview at the Fire Site", "From this chapter on, no answer is completely wrong. Every answer has a price.",
      ["More nuanced choices", "Elite Pressure matters more", S.relaxed ? "No time limit" : "There is a time limit"], false) });
  await say("Nadia · Reporter", "We meet again. This time the water's been swapped for smoke.", $("nadiaA"), {vo:"b4_nadia0", folder:"nadia"});
  S.rec = true;
  const F = {...FORUMS.cegat, who:"Nadia · Reporter", node:"nadiaA", folder:"nadia", hero:"heroA", prompt:"Answer this question"};
  const data = bab4Data();
  await runForum(data.slice(0, 2), F);
  await say("Ms. Laras", "I got this week's satellite images of the hotspots. Compare them with the land permit map.", null, {vo:"b4_laras1", folder:"laras"});
  await runForum(data.slice(2), F);
  await chapterEnd(4, {
    sebut:["Young Representative Names the Land Burners", "That night your name is the headline. In a meeting room somewhere, the Round Table decides to hit back."],
    tinggi:["In the Smoke, One Voice Refuses to Blame the Farmers", "People heard you. But the name of the land burner is still tucked away in the Round Table's drawer."],
    sedang:["The Smoke Lingers, the Answers Stay Vague", "The public is still waiting to see if you have the nerve."],
    rendah:["A Haze of Smoke, a Haze of Promises", "People are getting tired of hearing safe sentences."]
  }, "Smear", S.flags.sebut ? "sebut" : null);
}

// ---------------------------------------------------------------------
// CHAPTER 5: SMEAR (fast Comment Section; new mechanic: typos become twisted headlines)
// ---------------------------------------------------------------------
const NOISE = [
  ["@new_account_812", "Knew it. They're all the same."],
  ["@tired_citizen", "#FakeRepresentative"],
  ["@free_speech99", "Give the people their money back!"],
  ["@neutral_observer", "Wait for the explanation before you judge."],
  ["@account_4471", "Just resign!"],
  ["@muara_resident", "I still believe in you, but please explain."],
  ["@clean_sendaru", "That video's way too neat to be a coincidence."],
  ["@anon_23019", "#FakeRepresentative #FakeRepresentative"]
];
function bab5Data(){
  return [
    { who:"@sane_citizen01", hot:true, q:"Turns out you're just like the rest! How much was in the envelope, {p}?", vo:"b5_q1",
      opts:[
        {t:"That video isn't true. I'll prove it with data.", vo:"b5_q1_a", d:+8, r:"Some users hold back. They're waiting for your proof."},
        {t:"I don't need to answer cheap accusations like this.", vo:"b5_q1_b", d:-8, r:"Arrogant silence reads like a confession."},
        {t:"Go ahead and report me, I'm not scared!", vo:"b5_q1_c", d:-2, r:"Bold, but it doesn't deny anything."}
      ],
      sulit:[
        {t:"I never took that envelope. I want the full footage released.", vo:"b5_q1_sa", d:+8, r:"Some users hold back. They're waiting for your proof."},
        {t:"This is a smear. I'm taking it to court.", vo:"b5_q1_sb", d:+2, r:"A legitimate step, but the courts are too slow to fight a viral video."},
        {t:"You're welcome to check my bank account any time.", vo:"b5_q1_sc", d:+5, r:"Bold, but the buzzers immediately start digging through your family's accounts."}
      ]},
    { who:"@kabar.sendaru", q:"Mr. Darsono has asked the Ethics Council to investigate you. Are you ready to step aside temporarily?", vo:"b5_q2",
      opts:[
        {t:"Investigate me, go ahead. Stepping down over a smear is what I won't do.", vo:"b5_q2_a", d:+10, e:+5, r:"A firm stance. The news account makes it the headline."},
        {t:"If that's the party's decision, I'll go along with it.", vo:"b5_q2_b", d:-6, safe:true, r:"Users conclude: you can be steered."},
        {t:"Darsono is the one who should be investigated, not me!", vo:"b5_q2_c", d:+2, e:+18, r:"A hard counterattack. The pressure from above gets heavier."}
      ],
      sulit:[
        {t:"Go ahead and investigate. I'll show up to every hearing myself.", vo:"b5_q2_sa", d:+8, e:+3, r:"Calm and open. A few neutral accounts start defending you."},
        {t:"For the common good, I'm willing to step aside for now.", vo:"b5_q2_sb", d:-4, safe:true, r:"It sounds mature, but the buzzers call it an admission of guilt."},
        {t:"Mr. Darsono should be investigated too, over the rice imports.", vo:"b5_q2_sc", d:+4, e:+15, r:"You hit back. The Round Table now sees you as a real threat."}
      ]},
    { who:"@infoterkini.id", hot:true, q:"BREAKING: your family turns out to own an illegal mine in East Sendaru!", vo:"b5_q3",
      opts:[
        {t:"That's a hoax. Here are my family's assets, check them yourself.", vo:"b5_q3_a", d:+10, r:"Open data takes the wind out of the hoax."},
        {t:"My family has nothing to do with politics.", vo:"b5_q3_b", d:-2, r:"True, but without a clear denial, the hoax keeps spreading."},
        {t:"I'll put every single one of these hoax spreaders in jail!", vo:"b5_q3_c", d:-6, r:"The threat becomes a joke: the representative who can't take criticism."}
      ],
      sulit:[
        {t:"Here's my family's asset report. Anyone can look through it.", vo:"b5_q3_sa", d:+10, r:"Open data takes the wind out of the hoax."},
        {t:"Please leave my family out of politics.", vo:"b5_q3_sb", d:0, r:"A very human request, but the hoax keeps going around."},
        {t:"I've reported the accounts spreading this hoax to the cyber police.", vo:"b5_q3_sc", d:+2, r:"A legitimate step, but users say you're silencing criticism."}
      ]},
    { who:"@ibu_muara", q:"I'm from Muara. You stood with us by the river that night. I still want to believe you. Please just tell the truth.", vo:"b5_q4",
      opts:[
        {t:"Thank you for believing in me. I never took that money, and it will come out.", vo:"b5_q4_a", d:+10, r:"The people of Muara share your reply. They still remember that night of the flood."},
        {t:"Just trust me. That's all I can say.", vo:"b5_q4_b", d:-2, r:"Sincere, but it gives no reason to trust you."},
        {t:"If you don't believe me, go vote for someone else next time.", vo:"b5_q4_c", d:-10, r:"That line hurts the people who stood by you the most."}
      ],
      sulit:[
        {t:"Thank you for still believing. The proof that the video is fake is being checked.", vo:"b5_q4_sa", d:+10, r:"The people of Muara share your reply. They still remember that night of the flood."},
        {t:"It's fair if you have doubts. I won't push you.", vo:"b5_q4_sb", d:+3, r:"Humble, but people need more than understanding."},
        {t:"Just pray for me, and hope this is over soon.", vo:"b5_q4_sc", d:-3, safe:true, r:"It sounds resigned, as if even you aren't sure."}
      ]},
    { who:"@kabar.sendaru", q:"The original footage is out. What do you want to say to the people who spread the smear?", vo:"b5_q5",
      opts:[
        {t:"I forgive them. It's whoever made the video who has to be investigated.", vo:"b5_q5_a", d:+10, e:+6, r:"That line is the top headline. This time, nobody twists it."},
        {t:"Come on, let's just forget about all this.", vo:"b5_q5_b", d:-4, safe:true, r:"Whoever made the video walks away clean, and can do it again any time."},
        {t:"Serves you right, you're all going to regret this!", vo:"b5_q5_c", d:-8, r:"A win that turns into a show of anger."}
      ],
      sulit:[
        {t:"I forgive them. Whoever paid for this video has to be investigated all the way.", vo:"b5_q5_sa", d:+10, e:+6, r:"That line is the top headline. This time, nobody twists it."},
        {t:"I don't hold a grudge. I just want to get back to work for the people.", vo:"b5_q5_sb", d:+4, r:"A mature attitude, even though the mastermind stays hidden."},
        {t:"Those buzzers were paid by the Round Table, and I'll prove it.", vo:"b5_q5_sc", d:+3, e:+15, promise:"bukti_pendengung", r:"A huge accusation. Now you have to prove it."}
      ]}
  ];
}
async function bab5(){
  chapterStart(5, "Smear", "kamar", "feedOn hot", "fitnah");
  await card({ vo:"bab5_buka", voFrom:2, mark:5, btn:"Face the Comment Section", parts:[
    {tag:"h2", text:"Chapter 5"}, {tag:"h1", text:"Smear"},
    {tag:"p", cls:"story", text:"At two in the morning, a video starts going around: you, in a parking lot, taking a thick envelope. Within an hour, #FakeRepresentative is the top trending topic."}],
    after: brief("New Mechanic", "Typos Become Twisted Headlines", "Comments come faster and you have less time. From this chapter on, a sentence with typos can be cut up and turned into a headline that brings you down.",
      [S.relaxed ? "No time limit" : "Tighter time limits", "Check every letter", "Hoaxes spread fast"]) });
  await say("Narrator", "Your phone won't stop buzzing. Thousands of new accounts with blank profile pictures swarm your comments.", null, {vo:"b5_n1"});
  feedNoise(NOISE, true);
  S.rec = true;
  const F = {...FORUMS.sosmed2, who:"Netizens", folder:"warga", hero:"heroK", prompt:"Reply before the hoax spreads",
    timeout:{line:"You replied too late. The clip has already been shared a hundred thousand times.", d:-8}};
  const data = bab5Data();
  await runForum(data.slice(0, 3), F);
  await say("Nadia · Private Message", "I'm checking that video. Something's off with the shadows. Don't say anything careless yet.", null, {vo:"b5_nadia1", folder:"nadia"});
  await runForum(data.slice(3, 4), F);
  await say("Nadia · Private Message", "Confirmed. The video was edited: your shadow falls to the left, but the shadow of the car next to you falls to the right. I've got the original footage.", null, {vo:"b5_nadia2", folder:"nadia"});
  S.ev.add("video");
  feedNoise(null, false);
  addPost("@nadia.prameswari", "The original footage from that parking lot. No envelope. Compare them yourself.");
  await runForum(data.slice(4), F);
  await chapterEnd(5, {
    tinggi:["Smear Video Exposed, Support Grows Stronger", "Nadia's original footage spreads faster than the smear. The Round Table is getting nervous."],
    sedang:["Video Proven Fake, but Doubts Remain", "Some people already believed the first clip."],
    rendah:["Smear Debunked, but the Name Is Already Stained", "Your messy sentences became a joke too."]
  }, "National Debate");
}

// ---------------------------------------------------------------------
// CHAPTER 6: NATIONAL DEBATE (new forum: TV Debate; new mechanic: answers from evidence)
// ---------------------------------------------------------------------
function bab6Data(){
  return [
    { who:"Document from Ms. Laras", q:"Land Certificate Data, North Sendaru Coast. Which part matters most?", silent:true, noTimer:true, node:null,
      prompt:"Mark the most important part of the document", hint:"Type the line you think matters most, then press Enter.",
      opts:[
        {t:"Building rights certificates: 263 plots, all of them in the sea.", d:+6, ev:"sertifikat", r:"Land certificates for the sea. The owner is the same company that holds the palm oil concession."},
        {t:"Fence length: 30 kilometers, made of bamboo.", d:0, r:"Everyone already knows that from the news."},
        {t:"Affected fishermen: about 3,000 households.", d:+2, r:"Worth remembering, but it doesn't show who's behind it."}
      ],
      sulit:[
        {t:"A total of 263 certificates were issued for plots that lie entirely in the sea.", d:+6, ev:"sertifikat", r:"Land certificates for the sea. The owner is the same company that holds the palm oil concession."},
        {t:"The bamboo fence went up in less than two months.", d:0, r:"Very fast for a community effort, but it's not proof yet."},
        {t:"Fishermen who lost their fishing routes number 3,000 families.", d:+2, r:"Worth remembering, but it doesn't show who's behind it."}
      ]},
    { q:"This revision requires the Supervisory Board to approve any wiretap. What's the problem with that?", vo:"b6_q1",
      opts:[
        {t:"Corrupt officials won't wait for a permit before they hide the evidence.", vo:"b6_q1_a", d:+10, e:+5, r:"The studio audience applauds. Rina has to ask them to settle down."},
        {t:"Maybe it's not a bad thing, so wiretaps don't get abused.", vo:"b6_q1_b", d:-6, safe:true, r:"Hendra smiles. You just used his argument."},
        {t:"This revision was written by the corrupt officials themselves!", vo:"b6_q1_c", d:+2, e:+12, r:"Hendra asks the moderator to warn you. An accusation with no proof, on national TV."}
      ],
      sulit:[
        {t:"If every wiretap has to wait for a permit, we'll always be one step behind.", vo:"b6_q1_sa", d:+10, e:+5, r:"The studio audience applauds. Rina has to ask them to settle down."},
        {t:"A Supervisory Board is needed, as long as it doesn't slow investigations.", vo:"b6_q1_sb", d:0, safe:true, r:"A balanced answer, and exactly the gap Hendra was looking for."},
        {t:"Anyone backing this revision is protecting themselves.", vo:"b6_q1_sc", d:+3, e:+12, r:"A sharp line. A few members of the house watching start to squirm."}
      ]},
    { who:"Hendra · Coalition Spokesperson", node:"hendra", folder:"hendra", q:"You're being dramatic. This revision actually improves the agency. Do you have any proof that it's being weakened?", vo:"b6_q2",
      opts:[
        {t:"The article that limits wiretapping. That's the proof.", vo:"b6_q2_a", d:+8, r:"Hendra opens the draft on his desk, then closes it again."},
        {t:"I don't have proof yet, but my gut tells me so.", vo:"b6_q2_b", d:-8, r:"Hendra laughs. \"You can't write a law based on a gut feeling.\""},
        {t:"You're just a spokesperson, so of course you'll defend it.", vo:"b6_q2_c", d:-2, e:+5, r:"A personal attack. The audience thinks you're dodging the question."}
      ],
      sulit:[
        {t:"The proof is in the draft itself. Read the article on wiretap permits.", vo:"b6_q2_sa", d:+8, r:"Hendra opens the draft on his desk, then closes it again."},
        {t:"In the past year, sting operations have dropped sharply.", vo:"b6_q2_sb", d:+4, r:"The number is right, but Hendra calls it proof that corruption has gone down."},
        {t:"People aren't stupid. They can read the draft for themselves.", vo:"b6_q2_sc", d:+2, r:"The audience claps, but Hendra's question still hasn't been answered."}
      ]},
    { q:"Let's move on to the sea fence. The government says fishermen built it themselves. What's your response?", vo:"b6_q3",
      opts:[
        {t:"No way fishermen built a 30 kilometer fence that blocks their own routes.", vo:"b6_q3_a", d:+8, r:"Simple logic. The broadcast chat fills with one word: exactly."},
        {t:"Let's just wait for the official investigation.", vo:"b6_q3_b", d:-4, safe:true, r:"Hendra nods along. That's not a good sign."},
        {t:"That's a huge lie, and everyone knows it!", vo:"b6_q3_c", d:-2, r:"Your emotion reaches the audience, but your argument doesn't."}
      ],
      sulit:[
        {t:"The fishermen are the ones who lost their routes because of that fence.", vo:"b6_q3_sa", d:+6, r:"A moving fact. But Hendra already has an answer ready."},
        {t:"If they built it themselves, who paid for 30 kilometers of bamboo?", vo:"b6_q3_sb", d:+8, r:"A simple question. Hendra doesn't answer it."},
        {t:"There has to be an open investigation so everything is clear.", vo:"b6_q3_sc", d:-2, safe:true, r:"True, but too vague for a debate."}
      ],
      extra:[
        {need:"sertifikat", t:"There are 263 certificates for plots in the sea. The owner isn't a fisherman.", vo:"b6_q3_x", d:+15, e:+6, r:"The studio goes silent. Hendra flips through his files, but finds no answer."}
      ]},
    { who:"Hendra · Coalition Spokesperson", node:"hendra", folder:"hendra", q:"You're always attacking the government. What have you actually achieved, apart from making noise?", vo:"b6_q4",
      opts:[
        {t:"I bring the voices of people who have never been heard.", vo:"b6_q4_a", d:+8, r:"The camera pans across the nodding faces in the audience."},
        {t:"I'll show you the results later, after I get re-elected.", vo:"b6_q4_b", d:-6, r:"A campaign answer. Hendra doesn't even need to reply."},
        {t:"Better to make noise than stay quiet while people get robbed.", vo:"b6_q4_c", d:+4, e:+8, r:"A rousing line. Students watching start quoting it."}
      ],
      sulit:[
        {t:"The social aid data they kept hidden, I'm the one who opened it up.", vo:"b6_q4_sa", d:+6, r:"A real result, though Hendra calls it luck."},
        {t:"The results might not show yet. I'm going to keep going.", vo:"b6_q4_sb", d:+2, r:"Honest, but it sounds weak on TV."},
        {t:"The noise is happening because the truth is bothering someone.", vo:"b6_q4_sc", d:+4, e:+5, r:"A sharp line. Hendra goes quiet for a moment."}
      ],
      extra:[
        {need:"satelit", t:"Look at this satellite image. It shows who's been burning our forests.", vo:"b6_q4_x1", d:+12, e:+6, r:"The satellite image goes up on the screen. Hendra asks for a commercial break."},
        {need:"kayu", t:"The numbers on the flood logs match that palm oil company's logging permit.", vo:"b6_q4_x2", d:+12, e:+6, r:"The photo of the numbered logs fills the screen. Hendra asks for a commercial break."}
      ]},
    { q:"Closing statement, one sentence only.", vo:"b6_q5",
      opts:[
        {t:"The Anti-Corruption Agency belongs to the people. The people have the right to protect it.", vo:"b6_q5_a", d:+10, r:"The studio lights dim. That line closes tonight's debate."},
        {t:"I respect every opinion we heard tonight.", vo:"b6_q5_b", d:-2, safe:true, r:"Polite, but easy to forget."},
        {t:"If this revision passes, I'll resign from the house!", vo:"b6_q5_c", d:+2, promise:"mundur", r:"The audience applauds. But that promise could turn into a trap."}
      ],
      sulit:[
        {t:"If this agency gets weakened, the ones cheering will be the corrupt, not us.", vo:"b6_q5_sa", d:+10, r:"The studio lights dim. That line closes tonight's debate."},
        {t:"Let's watch over this revision together, with cool heads.", vo:"b6_q5_sb", d:-2, safe:true, r:"It sounds mature, but cool heads help Hendra most of all."},
        {t:"This revision won't pass as long as I'm still in the house.", vo:"b6_q5_sc", d:+3, promise:"rev_gagal", r:"A bold line. But one vote is rarely enough to kill a law."}
      ]}
  ];
}
async function bab6(){
  chapterStart(6, "National Debate", "tv", "", "debat");
  await card({ vo:"bab6_buka", voFrom:2, mark:6, btn:"Enter the Studio", parts:[
    {tag:"h2", text:"Chapter 6"}, {tag:"h1", text:"National Debate"},
    {tag:"p", cls:"story", text:"The house is quietly discussing a revision that would weaken the Anti-Corruption Agency. Off Sendaru's north coast, a 30 kilometer bamboo fence appears, complete with land certificates. You're invited to a national debate."}],
    after: brief("New Forum", "TV Debate", "Your opponent will cut you off if you take too long. Evidence from earlier chapters unlocks a fourth answer, the strongest one.",
      ["New mechanic: answers from evidence", `Evidence collected: ${S.ev.size}`, S.relaxed ? "No time limit" : "Cut off if you're late"]) });
  await say("Ms. Laras", "Here's the certificate data for the north coast. It might help you in tonight's debate.", null, {vo:"b6_laras1", folder:"laras"});
  S.rec = true;
  const F = {...FORUMS.debat, who:"Rina · Moderator", node:"rina", folder:"moderator", hero:"heroTV", prompt:"Answer before you're cut off",
    timeout:{who:"Hendra · Coalition Spokesperson", node:"hendra", folder:"hendra", vo:"b6_potong",
      text:"Sorry, I have to cut in. You're out of time, and the viewers can judge for themselves.", line:"Hendra cuts you off. Your chance to answer is gone.", d:-8}};
  const data = bab6Data();
  await runForum(data.slice(0, 1), F);
  await say("Rina · Moderator", "Good evening, Sendaru. Tonight we're discussing the revision of the Anti-Corruption Agency Law. Answer time is limited.", $("rina"), {vo:"b6_rina0", folder:"moderator"});
  await runForum(data.slice(1), F);
  await say("Narrator", "That same night, thousands of students gather in front of the house.", null, {vo:"b6_n1"});
  await chapterEnd(6, {
    tinggi:["Last Night's Debate Sparks a Wave of Student Protests", "Thousands of students take to the streets against the revision. In his office, Mr. Darsono starts to panic."],
    sedang:["Heated Debate, Revision Still on the Table", "Some viewers take your side. Students are starting to gather, though not many yet."],
    rendah:["Coalition Spokesperson Wins the Debate", "Hendra won on TV. But a few students still wrote down what you said."]
  }, "Open Session");
}

// ---------------------------------------------------------------------
// CHAPTER 7: OPEN SESSION (new forum: House Session)
// ---------------------------------------------------------------------
function bab7Data(){
  return [
    { q:"You've accused the government of harboring a corruption network. State the basis of your accusation.", vo:"b7_q1",
      opts:[
        {t:"The levee funds were released three years ago. The levee never existed, and people got flooded.", vo:"b7_q1_a", d:+8, e:+4, r:"The chamber suddenly goes quiet. A few members look down."},
        {t:"The basis is the public unrest I hear about everywhere.", vo:"b7_q1_b", d:-4, r:"Jeers come from the coalition benches: \"Unrest isn't evidence!\""},
        {t:"Everyone in this room already knows. They just pretend they don't.", vo:"b7_q1_c", d:0, e:+10, r:"The coalition benches erupt. The Chair bangs the gavel."}
      ],
      sulit:[
        {t:"The budget came three years ago. At the site there's only a project sign and standing water.", vo:"b7_q1_sa", d:+8, e:+4, r:"The chamber suddenly goes quiet. A few members look down."},
        {t:"Public unrest in so many regions is reason enough to investigate.", vo:"b7_q1_sb", d:-2, r:"Jeers come from the coalition benches: \"Unrest isn't evidence!\""},
        {t:"I leave it all to law enforcement to judge.", vo:"b7_q1_sc", d:-2, safe:true, r:"The Chair looks relieved. You just gave away your own stage."}
      ],
      extra:[
        {need:"kayu", t:"The numbers on the flood logs match the logging permit of the same company behind the fake levee project.", vo:"b7_q1_x", d:+14, e:+6, r:"The photo of the logs is passed from desk to desk. The chamber turns tense."}
      ]},
    { who:"Coalition Member", node:"anggota", folder:"anggota", q:"What evidence do you have about the social aid? Stop just talking!", vo:"b7_q2",
      opts:[
        {t:"The report says one hundred percent was delivered. The shelters I visited got nothing.", vo:"b7_q2_a", d:+8, r:"A few members from flooded districts nod slowly."},
        {t:"I'll hand over the evidence after this session is over.", vo:"b7_q2_b", d:-6, safe:true, r:"The coalition benches cheer. \"Later, later, later!\""},
        {t:"You enjoyed some of that money yourself, didn't you?", vo:"b7_q2_c", d:-4, e:+10, r:"The chamber erupts. The Chair threatens to throw you out."}
      ],
      sulit:[
        {t:"On paper, the aid was one hundred percent delivered. The shelters I visited were empty.", vo:"b7_q2_sa", d:+8, r:"A few members from flooded districts nod slowly."},
        {t:"The evidence is being verified. I'll hand it to the leadership later.", vo:"b7_q2_sb", d:-2, safe:true, r:"Procedural and safe. The coalition benches don't feel threatened."},
        {t:"The Social Affairs Minister was dismissed, and that's evidence in itself.", vo:"b7_q2_sc", d:+2, r:"A coalition member fires back: a dismissal isn't proof of corruption."}
      ],
      extra:[
        {need:"bansos", t:"The distribution report lists 4,200 recipient families. Every signature box is empty.", vo:"b7_q2_x", d:+14, e:+6, r:"Copies of the report are handed out. The coalition members who were cheering go quiet."}
      ]},
    { who:"Mr. Darsono", node:"darsonoS", folder:"darsono", q:"My young friend, I admire your spirit. But accusing my family of controlling imports is a serious slander.", vo:"b7_q3",
      opts:[
        {t:"It's not an accusation, sir. The permit data is public, anyone can check it.", vo:"b7_q3_a", d:+8, e:+8, r:"Mr. Darsono gives a thin smile, but his hand crushes the folder on his desk."},
        {t:"I'm sorry if I offended you, that wasn't my intention.", vo:"b7_q3_b", d:-8, safe:true, r:"Mr. Darsono nods warmly. He knows you just took a step back."},
        {t:"If you're innocent, why do you look so nervous?", vo:"b7_q3_c", d:+2, e:+12, r:"A few members laugh. Mr. Darsono doesn't."}
      ],
      sulit:[
        {t:"I'm not accusing anyone, sir. I'm just reading out the permit data.", vo:"b7_q3_sa", d:+6, e:+6, r:"Mr. Darsono gives a thin smile, but his hand crushes the folder on his desk."},
        {t:"I respect you, sir, and I'm ready to be corrected if I'm wrong.", vo:"b7_q3_sb", d:-4, safe:true, r:"Mr. Darsono nods warmly. He knows you just took a step back."},
        {t:"Let law enforcement decide whether this is slander or not.", vo:"b7_q3_sc", d:+2, e:+4, r:"A safe answer. Mr. Darsono looks a little calmer."}
      ],
      extra:[
        {need:"impor", t:"The commissioner of the sole import permit holder is Haryo Darsono. Your own younger brother.", vo:"b7_q3_x", d:+14, e:+10, r:"Mr. Darsono's smile disappears. For the first time, he has no answer."}
      ]},
    { q:"Your time is almost up. What are you asking of this session?", vo:"b7_q4",
      opts:[
        {t:"Form a special committee to investigate all of these cases in the open.", vo:"b7_q4_a", d:+10, e:+6, r:"The proposal goes into the official record. Now nobody can erase it."},
        {t:"I just want everyone to reflect on what has happened.", vo:"b7_q4_b", d:-6, safe:true, r:"A request that asks for nothing. The session moves on to the next item."},
        {t:"Arrest Mr. Darsono today!", vo:"b7_q4_c", d:+2, e:+15, r:"The shout gets cheers, but the house has no power to arrest anyone."}
      ],
      sulit:[
        {t:"Form an open special committee, and let the public help keep watch.", vo:"b7_q4_sa", d:+10, e:+6, r:"The proposal goes into the official record. Now nobody can erase it."},
        {t:"I'm submitting this file to the leadership for follow-up.", vo:"b7_q4_sb", d:-2, safe:true, r:"The file is accepted, then put away in the leadership's drawer."},
        {t:"Stop the debate on the revision until all these cases are resolved.", vo:"b7_q4_sc", d:+4, e:+8, r:"A brave demand. The coalition benches start whispering."}
      ],
      extra:[
        {need:"satelit", t:"I want a special committee, starting with the fire satellite images from the PT Cakrawala Sawit Sendaru concession.", vo:"b7_q4_x", d:+12, e:+6, r:"The satellite images are projected onto the chamber screen. Nobody jeers."}
      ]}
  ];
}
function bab7Pers(){
  return { q:"An impeachment motion was just filed. What's your answer?", vo:"b7_q5", who:"Nadia · Reporter", node:"nadiaS", folder:"nadia",
    opts:[
      {t:"Take my seat if you want. What's been exposed can't be covered up again.", vo:"b7_q5_a", d:+10, r:"Nadia lowers her camera. \"That's tomorrow morning's headline.\""},
      {t:"I'll follow every procedure that applies.", vo:"b7_q5_b", d:-2, safe:true, r:"A safe answer. Too safe for a night like this."},
      {t:"I'm not going anywhere. I'll fight to the end!", vo:"b7_q5_c", d:+4, e:+5, r:"Your fire spreads to the reporters, and to your enemies too."}
    ],
    sulit:[
      {t:"They can take this seat any time. The public has already read the evidence.", vo:"b7_q5_sa", d:+10, r:"Nadia lowers her camera. \"That's tomorrow morning's headline.\""},
      {t:"I respect the process and I'll defend myself by the rules.", vo:"b7_q5_sb", d:0, safe:true, r:"A mature answer, though the public wanted to hear more."},
      {t:"If they remove me, the people will take to the streets.", vo:"b7_q5_sc", d:+2, e:+8, r:"The line gets clipped and called a threat to incite the masses."}
    ]};
}
async function bab7(){
  chapterStart(7, "Open Session", "sidang", "", "sidang");
  await card({ vo:"bab7_buka", voFrom:2, mark:7, btn:"Enter the Chamber", parts:[
    {tag:"h2", text:"Chapter 7"}, {tag:"h1", text:"Open Session"},
    {tag:"p", cls:"story", text:"A plenary session. Every piece of evidence you've gathered is in one folder: the levee, the social aid, the rice imports, the land fires, and the sea fence. Today you read it out in front of the whole house."}],
    after: brief("New Forum", "House Session", "The sentences are long and every word goes on the record. Other members will jeer and interrupt. The evidence you've gathered unlocks the strongest answers.",
      ["Longer sentences", `Evidence collected: ${S.ev.size}`, S.relaxed ? "No time limit" : "Cut off if you're late"]) });
  gavel(3);
  await say("Chair of the Session", "The plenary session is open. The member who raised the point of order may now speak.", $("ketua"), {vo:"b7_ketua0", folder:"ketua"});
  S.rec = true;
  const F = {...FORUMS.sidang, who:"Chair of the Session", node:"ketua", folder:"ketua", hero:"heroS", prompt:"Speak before the house",
    timeout:{who:"Coalition Member", node:"anggota", folder:"anggota", vo:"b7_potong", text:"Point of order, Chair! Their time is up!",
      line:"Jeers from the coalition benches drown out your voice.", d:-8}};
  const data = bab7Data();
  await runForum(data.slice(0, 1), F);
  await say("Coalition Member", "Point of order, Chair! This member is just grandstanding!", $("anggota"), {vo:"b7_anggota1", folder:"anggota"});
  await runForum(data.slice(1), F);
  // how many members dare to stand with the player
  S.allies = Math.max(0, Math.min(48, 2 + S.ev.size * 5 + Math.floor(S.trust / 10) - S.promises.length * 2));
  standUp(S.allies);
  const tier = S.allies >= 25 ? "banyak" : S.allies >= 10 ? "sedang" : "sedikit";
  const lines = {
    banyak:"One by one, members rise. Almost half the room is now standing with you.",
    sedang:"A dozen or so members stand with you. Not many, but enough to be heard.",
    sedikit:"Only a handful of members dare to stand. The rest stare down at their phones."
  };
  await say("Narrator", lines[tier], null, {vo:`b7_n_${tier}`});
  await wait(600);
  gavel(2);
  await say("Chair of the Session", "The leadership accepts a motion from the coalition faction: impeachment of the member for fabricating evidence. The session is adjourned.", $("ketua"), {vo:"b7_ketua_mosi", folder:"ketua"});
  await runForum([bab7Pers()], {...F, timeout:undefined});
  await chapterEnd(7, {
    tinggi:["Evidence Read Out, Young Representative Impeached Anyway", "The public is furious. Tonight, thousands gather outside the house."],
    sedang:["Impeachment Motion Filed, Public Divided", "Some believe your evidence, others believe it was fabricated."],
    rendah:["Accused of Fabricating Evidence, Young Representative Cornered", "Only a few defend you. By tomorrow morning, an arrest warrant will be issued."]
  }, "The Last Voice");
}

// ---------------------------------------------------------------------
// CHAPTER 8: THE LAST VOICE (every forum in one broadcast)
// ---------------------------------------------------------------------
const B8_PIDATO = [
  {t:"Tonight I am speaking as an ordinary citizen, not as a member of the house.", vo:"b8_pidato_1"},
  {t:"All the evidence I have is now open to the public.", vo:"b8_pidato_2"},
  {t:"If I am arrested tomorrow, remember: your voices cannot be arrested with me.", vo:"b8_pidato_3"}
];
function bab8Sosmed(){
  return [
    { who:"@sendaru.students", q:"We're outside the house now. What should we do tonight?", vo:"b8_q1",
      opts:[
        {t:"Stay peaceful and don't take the bait. Record everything that happens.", vo:"b8_q1_a", d:+10, r:"The message is read out over a loudspeaker in front of the house."},
        {t:"Go home, it's too dangerous for you.", vo:"b8_q1_b", d:-4, safe:true, r:"The students feel abandoned by the person they came to defend."},
        {t:"Occupy that building until they hear us!", vo:"b8_q1_c", d:-2, e:+10, r:"The call gets used to accuse you of inciting a riot."}
      ],
      sulit:[
        {t:"Look out for each other and stay peaceful. If anyone provokes you, ignore them.", vo:"b8_q1_sa", d:+10, r:"The message is read out over a loudspeaker in front of the house."},
        {t:"You have every right to speak up. Just stay safe, and head home before it gets late.", vo:"b8_q1_sb", d:+4, r:"A caring message. Some students go home, others stay."},
        {t:"Hold your ground there until our demands are met.", vo:"b8_q1_sc", d:+2, e:+8, r:"They hold their ground. The night gets longer, and the police keep coming."}
      ]},
    { who:"@no_name_account", hot:true, q:"This broadcast is staged! They just want to look like a hero before getting arrested.", vo:"b8_q2",
      opts:[
        {t:"All my evidence is public. Go check it and judge for yourself.", vo:"b8_q2_a", d:+8, r:"Links to every document are shared thousands of times in five minutes."},
        {t:"Just ignore accounts like that.", vo:"b8_q2_b", d:-2, r:"Ignored, the account only gets louder."},
        {t:"How much do they pay a fake account like you?", vo:"b8_q2_c", d:-4, r:"The reply gets screenshotted with the caption: losing it on the last broadcast."}
      ],
      sulit:[
        {t:"I'm not asking you to trust me. I'm asking you to read the evidence.", vo:"b8_q2_sa", d:+8, r:"Links to every document are shared thousands of times in five minutes."},
        {t:"Everyone is free to have an opinion, including people who disagree with me.", vo:"b8_q2_sb", d:+4, r:"Calm and mature. The account runs out of material."},
        {t:"We'll see who was right once all of this is over.", vo:"b8_q2_sc", d:0, safe:true, r:"Sounds resigned for a final broadcast."}
      ]}
  ];
}
// a caller reminds the player of an old promise
function tagihItem(id){
  return { who:"Caller", folder:"warga", node:null, promiseId:id, q:TAGIH[id], vo:`b8_tagih_${id}`, prompt:"Answer the caller",
    opts:[
      {t:"I haven't kept it. I'm sorry, I made that promise without doing the math.", vo:"b8_tagih_a", d:-2, admit:true, r:`The caller goes quiet for a moment. "At least you're honest."`},
      {t:"Everything takes time. It's not that simple.", vo:"b8_tagih_b", d:-6, safe:true, r:"The caller hangs up. The comments fill with one word: liar."},
      {t:"That promise still stands, just wait a little longer.", vo:"b8_tagih_c", d:-4, r:"The promise is written down again, and the people will come back to collect."}
    ],
    sulit:[
      {t:"I haven't kept it yet. I'm not going to make excuses.", vo:"b8_tagih_sa", d:-2, admit:true, r:`The caller goes quiet for a moment. "At least you're honest."`},
      {t:"I tried, but a lot of people stood in my way.", vo:"b8_tagih_sb", d:-4, safe:true, r:"It might be true, but it sounds like an excuse."},
      {t:"Give me one more year to keep it.", vo:"b8_tagih_sc", d:-3, r:"One more year, from someone who gets arrested tomorrow."}
    ]};
}
const B8_TERIMA_KASIH = { who:"Caller", folder:"warga", node:null, prompt:"Answer the caller",
  q:"I'm the woman who stood by the river that night. Last week, they started building our levee. Thank you for not lying to us.", vo:"b8_terima_kasih",
  opts:[
    {t:"Thank you for believing in me. That levee is yours, not mine.", vo:"b8_tk_a", d:+6, r:"In the studio, Nadia quietly wipes her eyes."},
    {t:"That's just my job as your representative.", vo:"b8_tk_b", d:+4, r:"Simple and humble."},
    {t:"Don't forget my name at the next election.", vo:"b8_tk_c", d:-6, r:"The woman goes quiet. She called to say thank you, not to hear a campaign pitch."}
  ],
  sulit:[
    {t:"That levee is standing because you dared to speak up. Not because of me.", vo:"b8_tk_sa", d:+6, r:"In the studio, Nadia quietly wipes her eyes."},
    {t:"I'm so glad to hear that. I hope it's finished soon.", vo:"b8_tk_sb", d:+4, r:"Warm and sincere."},
    {t:"That's only the start. Soon there will be a levee on every river.", vo:"b8_tk_sc", d:+1, r:"She smiles, but you just made another promise."}
  ]};
function darsonoTawar(){
  return { who:"Mr. Darsono", folder:"darsono", node:null, prompt:"Answer Mr. Darsono", q:"Answer me now, in front of everyone. Do you accept or not?", vo:"b8_darsono_tanya",
    opts:[
      {t:"All right, sir. I'll end this broadcast now.", vo:"b8_dt_a", d:0, sold:true, r:"Nadia stares at you in disbelief. The studio lights go dark."},
      {t:"That seat can't buy my voice.", vo:"b8_dt_b", d:+10, e:+10, r:"Millions of people hear you turn him down live."},
      {t:"I'll think about it after this broadcast is over.", vo:"b8_dt_c", d:-10, r:"Millions of viewers hear you hesitate."}
    ],
    sulit:[
      {t:"I'm turning down your offer, sir, in front of all of Sendaru.", vo:"b8_dt_sa", d:+10, e:+10, r:"Millions of people hear you turn him down live."},
      {t:"I need some time to think about it, sir.", vo:"b8_dt_sb", d:-10, r:"Millions of viewers hear you hesitate."},
      {t:"All right, sir. I'm ending the broadcast now.", vo:"b8_dt_sc", d:0, sold:true, r:"Nadia stares at you in disbelief. The studio lights go dark."}
    ]};
}
function darsonoAncam(){
  return { who:"Mr. Darsono", folder:"darsono", node:null, prompt:"Answer Mr. Darsono", q:"There's still time to keep quiet. What's your answer?", vo:"b8_darsono_tanya2",
    opts:[
      {t:"If I disappear, millions of people will carry this voice on.", vo:"b8_da_a", d:+10, e:+10, r:"The line goes dead. Outside the studio, the cheering carries all the way inside."},
      {t:"I'm not afraid of you, sir.", vo:"b8_da_b", d:+4, e:+5, r:"Brave, even if your voice shakes a little."},
      {t:"Fine. I'll stop talking.", vo:"b8_da_c", d:-15, safe:true, r:"Nadia stares at you in disbelief. Thousands of people outside fall silent."}
    ],
    sulit:[
      {t:"You were right, sir. Loud voices disappear fast. The voice of the many doesn't.", vo:"b8_da_sa", d:+10, e:+10, r:"The line goes dead. Outside the studio, the cheering carries all the way inside."},
      {t:"Go ahead and arrest me, sir. The evidence won't be arrested with me.", vo:"b8_da_sb", d:+8, e:+10, r:"The line goes dead without an answer."},
      {t:"I just want all of this to end peacefully.", vo:"b8_da_sc", d:-4, safe:true, r:"A gentle line, but it sounds like giving up."}
    ]};
}
const B8_PENUTUP = { who:"Nadia · Reporter", node:"nadiaSi", folder:"nadia", prompt:"Your last words", q:"One minute left. Say your last words.", vo:"b8_nadia_akhir",
  opts:[
    {t:"Don't stop speaking up. This country belongs to all of us.", vo:"b8_akhir_a", d:+10, r:"The camera's red light goes off. Outside, thousands repeat your words."},
    {t:"Thank you, and forgive me for any mistakes I made.", vo:"b8_akhir_b", d:0, r:"A simple goodbye."},
    {t:"Remember my name, because I'm the only honest one.", vo:"b8_akhir_c", d:-6, r:"That line sounds more like arrogance than a goodbye."}
  ],
  sulit:[
    {t:"This might be my last voice tonight. Yours is only just starting.", vo:"b8_akhir_sa", d:+10, r:"The camera's red light goes off. Outside, thousands repeat your words."},
    {t:"I have to go now. I'm leaving this country in your hands.", vo:"b8_akhir_sb", d:+5, r:"A warm goodbye. Many people cry in front of their screens."},
    {t:"Don't trust anyone, including me. Trust only the evidence.", vo:"b8_akhir_sc", d:+6, r:"A strange thing to say goodbye with, but the students paint it on their banners."}
  ]};
async function bab8(){
  chapterStart(8, "The Last Voice", "siaran", "", "siaran");
  await card({ vo:"bab8_buka", voFrom:2, mark:8, btn:"Turn On the Camera", parts:[
    {tag:"h2", text:"Chapter 8"}, {tag:"h1", text:"The Last Voice"},
    {tag:"p", cls:"story", text:"Your arrest warrant comes out tomorrow morning. Tonight, Nadia has managed to get one live national broadcast. Outside, thousands of people are waiting to hear your voice."}],
    after: brief("Final Chapter", "National Live Broadcast", "Every forum comes together in one night: a speech, the comment section, calls from the public, and one call you never saw coming. Your old promises will be collected on.",
      ["The speech must be exact", "Promises will be collected", "Every word decides the ending"]) });
  await say("Nadia · Reporter", "We're live in three, two, one. Sendaru is listening.", $("nadiaSi"), {vo:"b8_nadia0", folder:"nadia"});
  S.rec = true;
  await speech(B8_PIDATO, "heroSi", "Opening speech of the broadcast");
  // social media explodes
  $("scene").classList.add("feedOn");
  await say("Narrator", "The broadcast comments explode. Hundreds of thousands of people are watching at once.", null, {vo:"b8_n1"});
  const F = {...FORUMS.siaran, who:"Netizens", folder:"warga", hero:"heroSi", prompt:"Reply to this comment"};
  await runForum(bab8Sosmed(), {...F, feed:true});
  $("scene").classList.remove("feedOn");
  // callers: old promises come back
  await say("Narrator", "The studio phone lines open for the public.", null, {vo:"b8_n2"});
  if (S.promises.length) await runForum(S.promises.slice(0, 3).map(tagihItem), F);
  else await runForum([B8_TERIMA_KASIH], F);
  // the call nobody expected
  await say("Narrator", "The studio phone rings one more time. The number on the screen makes Nadia go pale.", null, {vo:"b8_n3"});
  if (S.safe >= SAFE_OFFER){
    await say("Mr. Darsono", "Well, kid, turns out you're someone I can talk to. The deputy minister's seat is still empty. End this broadcast, and every charge goes away.", null, {vo:"b8_darsono_tawar", folder:"darsono"});
    await runForum([darsonoTawar()], F);
  } else {
    await say("Mr. Darsono", "Kid, I warned you on your very first day. The loudest voice is usually the first to disappear.", null, {vo:"b8_darsono_ancam", folder:"darsono"});
    await runForum([darsonoAncam()], F);
  }
  if (S.sold){
    await say("Narrator", "The broadcast cuts out. Screens all over Sendaru go black.", null, {vo:"b8_n_putus"});
    S.done.add(8);
    return;
  }
  await runForum([B8_PENUTUP], F);
  S.rec = false;
  S.done.add(8);
}

// ---------------------------------------------------------------------
// CHAPTER 9: THE SECOND SEAT (only opens on the "Fajar Sendaru" path)
// The vice president resigns and the player is tested as a replacement. Soft answers (lunak_* flags)
// smooth the way, but two or more make the seat meaningless (the "Ban Serep" ending).
// ---------------------------------------------------------------------
function bab9Data(){
  return [
    { q:"A petition from two million citizens has put your name forward for vice president. Why do you think you deserve it?", vo:"b9_q1",
      opts:[
        {t:"I don't think I deserve it. I only know that seat must not go back to the Round Table.", vo:"b9_q1_a", d:+8, e:+4, r:"The public gallery applauds. The Chair bangs the gavel for quiet."},
        {t:"Because the people asked, and I have never turned the people down.", vo:"b9_q1_b", d:+1, r:"It sounds like a campaign billboard."},
        {t:"Whether I deserve it or not is for this honorable house to decide.", vo:"b9_q1_c", d:-3, safe:true, r:"The coalition benches nod, pleased. You just handed them the judgment."}
      ],
      sulit:[
        {t:"Deserving can wait. What matters is that seat must not go back to the Round Table.", vo:"b9_q1_sa", d:+8, e:+4, r:"The public gallery applauds. The Chair bangs the gavel for quiet."},
        {t:"Two million signatures are a mandate, and I cannot refuse a mandate.", vo:"b9_q1_sb", d:+2, r:"It sounds noble, but also like someone who already wants the seat."},
        {t:"I leave that judgment entirely to the wisdom of this house.", vo:"b9_q1_sc", d:-3, safe:true, r:"The coalition benches nod, pleased. You just handed them the judgment."}
      ]},
    { who:"Coalition Member", node:"anggota", folder:"anggota", q:"Our faction is ready to back you. There's just one condition: the Round Table special committee stops, for the sake of stability.", vo:"b9_q2",
      opts:[
        {t:"The special committee keeps going. Support with conditions isn't support, it's a price.", vo:"b9_q2_a", d:+10, e:+8, r:"The coalition member sits back down without a word."},
        {t:"We could put the special committee on hold until things calm down.", vo:"b9_q2_b", d:-8, safe:true, flag:"lunak_pansus", r:"The coalition benches applaud. Outside the building, the crowd stops cheering."},
        {t:"You're scared because your own names are in that file!", vo:"b9_q2_c", d:+2, e:+12, r:"The chamber erupts. The accusation may be true, but you haven't proven it."}
      ],
      sulit:[
        {t:"I won't trade the special committee for any vote, including your faction's.", vo:"b9_q2_sa", d:+10, e:+8, r:"The coalition member sits back down without a word."},
        {t:"Stability does matter. We can reschedule the special committee together.", vo:"b9_q2_sb", d:-8, safe:true, flag:"lunak_pansus", r:"The coalition benches applaud. Outside the building, the crowd stops cheering."},
        {t:"The special committee isn't mine. Ask the people waiting for its results.", vo:"b9_q2_sc", d:+6, e:+4, r:"A clever answer. The coalition gets no promise from you."}
      ]},
    { who:"Bram Satria", node:null, folder:"bram", q:"I'm a candidate too. I'm promising a cash allowance for every family, starting next month. What's your promise?", vo:"b9_q3",
      opts:[
        {t:"I'm not promising a number. I'm promising a budget anyone can read.", vo:"b9_q3_a", d:+8, r:"No cheering, but the reporters write the line down word for word."},
        {t:"I'll give an allowance too, even bigger than what Bram is offering.", vo:"b9_q3_b", d:-6, flag:"lunak_janji", r:"Bram grins. You just joined his auction."},
        {t:"Bram's promises never come with any math, and everyone knows it.", vo:"b9_q3_c", d:+2, e:+4, r:"Bram's supporters in the gallery jeer."}
      ],
      sulit:[
        {t:"My one promise: every rupiah of the budget can be checked by citizens on their phones.", vo:"b9_q3_sa", d:+8, r:"No cheering, but the reporters write the line down word for word."},
        {t:"That allowance is a good idea. I'll raise the amount if I'm elected.", vo:"b9_q3_sb", d:-6, flag:"lunak_janji", r:"Bram grins. You just joined his auction."},
        {t:"I won't promise anything today, so there's nothing to collect on later.", vo:"b9_q3_sc", d:-2, safe:true, r:"Safe, but people came to hear a plan, not caution."}
      ]},
    { q:"The leadership reads a message from the Palace: the vice president does not give speeches without a script approved by the President. Do you agree?", vo:"b9_q4",
      opts:[
        {t:"I'll be loyal to the office, but I'll still write my own speeches.", vo:"b9_q4_a", d:+8, e:+6, r:"The Palace envoy in the gallery closes his folder and leaves the room."},
        {t:"Of course, I'll follow the President's direction completely.", vo:"b9_q4_b", d:-8, safe:true, flag:"lunak_naskah", r:"The Palace envoy smiles. Nadia stops taking notes."},
        {t:"In that case, the President wants a loudspeaker, not a deputy.", vo:"b9_q4_c", d:+4, e:+10, r:"The gallery laughs. At the Palace, nobody finds it funny."}
      ],
      sulit:[
        {t:"I will respect the President, and still write what I say myself.", vo:"b9_q4_sa", d:+8, e:+6, r:"The Palace envoy in the gallery closes his folder and leaves the room."},
        {t:"I'd of course accept scripts from the Palace as part of working together.", vo:"b9_q4_sb", d:-8, safe:true, flag:"lunak_naskah", r:"The Palace envoy smiles. Nadia stops taking notes."},
        {t:"I'm willing to consult, as long as I can still answer for what I say.", vo:"b9_q4_sc", d:+4, e:+2, r:"A middle answer. The Palace isn't happy, but has no reason to be angry either."}
      ]},
    { who:"Nadia · Reporter", node:"nadiaS", folder:"nadia", q:"Three months ago, you said a voice can't be bought with a seat. How is this seat any different?", vo:"b9_q5",
      opts:[
        {t:"This one was offered by the people. If I change, come after me like you did with the promises.", vo:"b9_q5_a", d:+8, r:"Nadia nods. \"We will.\""},
        {t:"Maybe it isn't different. That's why I need you all to keep watching.", vo:"b9_q5_b", d:+6, r:"An honest answer. Not everyone likes hearing it."},
        {t:"That's an inappropriate question for such an important day.", vo:"b9_q5_c", d:-8, safe:true, flag:"lunak_pers", r:"Nadia lowers her recorder. You never used to turn down her questions."}
      ],
      sulit:[
        {t:"This seat came from a citizens' petition. If I change, you know how to hold me to it.", vo:"b9_q5_sa", d:+8, r:"Nadia nods. \"We will.\""},
        {t:"I don't know the difference yet. Watch me, and don't just take my word for it.", vo:"b9_q5_sb", d:+6, r:"An honest answer. Not everyone likes hearing it."},
        {t:"That question is better asked after the vote is over.", vo:"b9_q5_sc", d:-8, safe:true, flag:"lunak_pers", r:"Nadia lowers her recorder. You never used to turn down her questions."}
      ]}
  ];
}
function bab9Putusan(){
  return { q:"The house is ready to vote. Do you accept this nomination or not?", vo:"b9_q6", prompt:"Your decision",
    opts:[
      {t:"I accept, and I will keep speaking up from the inside.", vo:"b9_q6_a", d:+4, flag:"vp_terima", r:"The Chair bangs the gavel. The vote begins."},
      {t:"I decline. My voice is more useful outside the Palace fence.", vo:"b9_q6_b", d:+6, flag:"vp_tolak", r:"The chamber falls silent, then the public gallery stands up and applauds."},
      {t:"I accept whatever this honorable house decides.", vo:"b9_q6_c", d:-4, safe:true, flag:"vp_pasrah", r:"The Chair bangs the gavel. The coalition benches trade smiles."}
    ],
    sulit:[
      {t:"I accept this nomination. That evidence folder comes with me to the Palace.", vo:"b9_q6_sa", d:+4, flag:"vp_terima", r:"The Chair bangs the gavel. The vote begins."},
      {t:"I do not accept it. I am more useful as the one who collects on promises.", vo:"b9_q6_sb", d:+6, flag:"vp_tolak", r:"The chamber falls silent, then the public gallery stands up and applauds."},
      {t:"I accept, and I am ready to adjust to the direction of the house.", vo:"b9_q6_sc", d:-4, safe:true, flag:"vp_pasrah", r:"The Chair bangs the gavel. The coalition benches trade smiles."}
    ]};
}
async function bab9(){
  // only the best path reaches this chapter; every other path ends after the broadcast
  if (endingKey() !== "fajar") return;
  chapterStart(9, "The Second Voice", "sidang", "", "sidang");
  $("darsonoS").style.visibility = "hidden"; // he is in custody on this path
  await card({ vo:"bab9_buka", voFrom:2, mark:9, btn:"Enter the Chamber", parts:[
    {tag:"h2", text:"Chapter 9"}, {tag:"h1", text:"The Second Voice"},
    {tag:"p", cls:"story", text:"Three months after the broadcast, your arrest warrant is canceled and Mr. Darsono is in custody. This morning, the Vice President of Sendaru resigned after his name turned up in the Round Table files. The house has to choose a replacement, and one name keeps coming up on the streets: yours."}],
    after: brief("Bonus Chapter", "Public Hearing for Vice President", "The house tests you on camera. Every side offers its support, and every bit of support has a price. Soft answers make your path smoother, but they decide what kind of seat you end up with.",
      ["Longer sentences", "Support has a price", "The final decision is yours"], false) });
  gavel(3);
  await say("Chair of the Session", "The plenary session is open with one item on the agenda: the public hearing for vice presidential candidates. The candidate may come forward.", $("ketua"), {vo:"b9_ketua0", folder:"ketua"});
  S.rec = true;
  const F = {...FORUMS.sidang, who:"Chair of the Session", node:"ketua", folder:"ketua", hero:"heroS", prompt:"Answer before the house",
    timeout:{who:"Coalition Member", node:"anggota", folder:"anggota", vo:"b9_potong", text:"Chair, this candidate has no answer!",
      line:"Staying silent too long at a public hearing sounds like doubt.", d:-8}};
  const data = bab9Data();
  await runForum(data.slice(0, 2), F);
  await say("Narrator", "The coalition's candidate gets a turn to ask a question. Bram Satria stands up and waves at the camera.", null, {vo:"b9_n1"});
  await runForum(data.slice(2), F);
  await wait(400);
  gavel(2);
  await runForum([bab9Putusan()], {...F, timeout:undefined});
  S.vp = S.flags.vp_tolak ? "tolak" : "terima";
  S.rec = false;
}

// ---------------------------------------------------------------------
// ENDINGS
// lb = the Indonesian title, which the leaderboard (LB_BONUS, validRow) and the feedback form key on
// ---------------------------------------------------------------------
const ENDINGS = {
  kursi: { kicker:"Hidden Ending", title:"The Soft Seat", lb:"Kursi Empuk",
    p1:"A week later, you're sworn in as deputy minister. Every charge disappears, and so does every piece of evidence in that folder. In the Round Table's meeting room, there's now a new chair with your name on it.",
    p2:"By the river in Muara, the levee still never gets built." },
  janji: { kicker:"The End", title:"Empty Promises", lb:"Janji Kosong",
    p1:"People got tired of collecting on your promises. At the next election, they voted for Bram Satria, whose promises were sweeter. A new face, but the same Round Table.",
    p2:"Five years later, rice never did cost five thousand rupiah." },
  fajar: { kicker:"The End", title:"Sendaru Dawn", lb:"Fajar Sendaru",
    p1:"You turn down the seat in front of the whole house. From outside the Palace fence, you lead the special committee that tears the Round Table out by the roots. The vice president's seat finally goes to someone who knows they're being watched.",
    p2:"Ten years later, the levee in Muara stands strong, rice prices are steady, and the sky over West Sendaru is blue again." },
  wapres: { kicker:"The End", title:"The Second Seat", lb:"Kursi Kedua",
    p1:"The house elects you by seven votes. On inauguration day, you carry the same folder into the Palace and set it on the cabinet table. The special committee keeps working, and this time its files can't be shoved in a drawer.",
    p2:"Five years later, the people of Muara still call you to collect on your word. You still pick up the phone yourself." },
  serep: { kicker:"The End", title:"The Spare Tire", lb:"Ban Serep",
    p1:"The house elects you with almost no resistance. Your speeches arrive from the Palace every morning, and the special committee is postponed indefinitely. You cut ribbons, open seminars, and smile from billboards.",
    p2:"In the newsroom, Nadia crosses your name off her list of sources." },
  martir: { kicker:"The End", title:"Martyr", lb:"Martir",
    p1:"That morning, you're arrested anyway. But the recording of your last broadcast is played on campuses, in markets, and at night watch posts. The people carry on what you started.",
    p2:"Seven years later, you're released. At the prison gate, Nadia and thousands of citizens are waiting." },
  tenggelam: { kicker:"The End", title:"The Drowned Voice", lb:"Suara yang Tenggelam",
    p1:"That morning, you're arrested and hardly anyone cares. People watched your broadcast, but didn't trust your words enough to do anything about them.",
    p2:"The Round Table still stands. But in a small newsroom, Nadia still keeps all your evidence." }
};
function endingKey(){
  if (S.sold) return "kursi";
  // Chapter 9 was played: the decision there settles the ending
  if (S.vp === "tolak") return "fajar";
  if (S.vp === "terima") return Object.keys(S.flags).filter(k => k.startsWith("lunak_")).length + (S.flags.vp_pasrah ? 1 : 0) >= 2 ? "serep" : "wapres";
  if (S.promises.length >= 3) return "janji";
  if (S.trust >= 70 && S.elite < 80) return "fajar";
  if (S.trust >= 45) return "martir";
  return "tenggelam";
}
async function ending(){
  const key = endingKey(), E = ENDINGS[key];
  S.rec = false;
  clearSave();
  feedNoise(null, false);
  $("bubble").classList.remove("show");
  $("chap").innerHTML = `<b>Ending</b>${E.title}`;
  music(key === "fajar" || key === "martir" || key === "wapres" ? "akhir_baik" : "akhir_buruk");
  statsReset();
  // leaderboard: sent now (ALL holds the whole game), shown after the summary; index.html owns the rest
  const lb = submitScore(E.lb);
  const board = lb ? `<div class="myscore"><div><div class="lbl">Final score · ${LB_MODE_NAME[S.mode]}</div><div class="big">${lb.row.skor}</div>
    <p id="myScoreSt" role="status">Saving to the leaderboard</p></div><button type="button" id="myBoardBtn">View leaderboard</button></div>` : "";
  const summary = `<ul class="rules end-sum"><li>Evidence: ${S.ev.size} of ${Object.keys(EVIDENCE).length}</li><li>Pending promises: ${S.promises.length}</li><li>Safe answers: ${S.safe}</li></ul>`;
  // suggestion box; index.html sends it (see SARAN_URL)
  const saran = `<form class="saran" data-akhir="${E.lb}"><label for="saranTeks">Feedback</label>
    <textarea id="saranTeks" maxlength="1000" placeholder="What did you like, and what should be better?" aria-describedby="saranInfo"></textarea>
    <div class="saran-foot"><span class="saran-status" id="saranInfo" role="status">Your character's name and ending are sent too.</span><button type="submit">Send</button></div></form>`;
  // the card writes its extra HTML a little later, so wait for the status line to exist
  if (lb) lb.sent.then(t => { const put = () => { const e = $("myScoreSt"); e ? e.textContent = t : setTimeout(put, 300); }; put(); });
  await card({ vo:`akhir_${key}`, voFrom:1, btn:"Play Again", parts:[
    {tag:"h2", text:E.kicker}, {tag:"h1", text:E.title}, {tag:"p", cls:"story", text:E.p1}, {tag:"p", cls:"story", text:E.p2}],
    after: metersHTML() + summary + board + statsHTML(ALL, "Typing stats for the whole game") + saran });
  location.reload();
}

const CHAPTERS = [bab1, bab2, bab3, bab4, bab5, bab6, bab7, bab8, bab9];
