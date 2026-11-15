// =====================================================================
// SUARA TERAKHIR: isi cerita (Prolog sampai Bab 9)
// Bahasa baku sesuai KBBI/PUEBI. Semua tokoh, tempat, dan perusahaan rekaan.
//
// Placeholder: {P} = Bapak/Ibu, {p} = Pak/Bu, {N} = nama depan pemain.
// vo = id file suara. Kalimat NPC yang memuat {P}/{p} otomatis memakai id_l / id_p.
// Kalimat pemain (t) tidak memuat sapaan atau nama, supaya cukup direkam sekali per suara.
// d = perubahan Kepercayaan, e = perubahan Tekanan Elit, r = reaksi (tidak disuarakan).
// =====================================================================

const EVIDENCE = {
  kayu:       { tag:"Kayu bernomor",   text:"Foto kayu gelondongan bernomor." },
  bansos:     { tag:"Laporan bantuan", text:"Laporan bantuan sosial tanpa tanda tangan penerima." },
  impor:      { tag:"Izin impor",      text:"Data izin impor milik adik kandung Pak Darsono." },
  satelit:    { tag:"Citra satelit",   text:"Citra satelit titik api di lahan konsesi sawit." },
  video:      { tag:"Rekaman asli",    text:"Rekaman asli yang membuktikan video fitnah itu palsu." },
  sertifikat: { tag:"Sertifikat laut", text:"Sebanyak 263 sertifikat tanah di atas laut." }
};

// Janji yang belum bisa ditepati. Rakyat menagihnya di Bab 8.
const PROMISES = {
  tanggul_sebulan:  "membangun tanggul dalam satu bulan",
  nama_kayu:        "menyebut nama pemilik kayu besok",
  penjara_sawit:    "memenjarakan perusahaan sawit",
  rumah_warga:      "mengganti semua rumah warga",
  bansos_besok:     "semua bantuan sampai ke posko besok pagi",
  uang_tunai:       "memberi uang tunai kepada setiap keluarga di posko",
  cair_12jam:       "mencairkan bantuan dalam dua belas jam",
  cair_minggu_ini:  "mencairkan bantuan minggu ini",
  beras_turun:      "harga beras turun bulan depan",
  beras_murah:      "harga beras lebih murah daripada janji Bram",
  politik_bersih:   "membersihkan politik dalam lima tahun",
  biaya_anak:       "membiayai pengobatan semua anak yang sakit",
  langit_biru:      "langit biru lagi minggu depan",
  bukti_pendengung: "membuktikan siapa yang membayar para pendengung",
  mundur:           "mundur dari dewan jika revisi disahkan",
  rev_gagal:        "menggagalkan revisi undang-undang"
};
// Kalimat penelepon yang menagih setiap janji (Bab 8). VO: b8_tagih_<id>_l / _p
const TAGIH = {
  tanggul_sebulan:  "{P} dulu berjanji tanggul berdiri dalam satu bulan. Sudah berbulan-bulan, yang ada hanya papan proyek.",
  nama_kayu:        "{P} dulu berjanji menyebut nama pemilik kayu gelondongan keesokan harinya. Kami masih menunggu sampai sekarang.",
  penjara_sawit:    "{P} pernah berjanji memenjarakan perusahaan sawit keesokan harinya. Mengapa mereka masih bebas?",
  rumah_warga:      "{P} berjanji semua rumah kami yang rusak akan diganti. Sampai hari ini, kami masih tinggal di tenda.",
  bansos_besok:     "{P} berjanji semua bantuan sampai ke posko keesokan paginya. Kami menunggu berhari-hari.",
  uang_tunai:       "{P} berjanji memberi uang tunai kepada setiap keluarga di posko. Uang itu tidak pernah datang.",
  cair_12jam:       "{P} berjanji bantuan cair dalam dua belas jam. Kenyataannya, kami menunggu dua minggu lagi.",
  cair_minggu_ini:  "{P} berjanji bantuan cair minggu itu juga. Kenyataannya, kami menunggu sebulan.",
  beras_turun:      "{P} berjanji harga beras turun bulan depan. Sekarang harganya justru naik lagi.",
  beras_murah:      "{P} berjanji harga beras lebih murah daripada janji Bram. Di pasar, harganya tidak berubah.",
  politik_bersih:   "{P} berjanji membersihkan politik dalam lima tahun. Malam ini justru {P} yang akan ditangkap.",
  biaya_anak:       "{P} berjanji membiayai pengobatan anak-anak yang sakit karena asap. Tagihan rumah sakit anak saya belum lunas.",
  langit_biru:      "{P} berjanji langit kami biru lagi dalam seminggu. Asapnya baru hilang dua bulan kemudian.",
  bukti_pendengung: "{P} berjanji membuktikan siapa yang membayar para pendengung. Mana buktinya?",
  mundur:           "{P} berjanji mundur jika revisi itu disahkan. Revisinya disahkan minggu lalu, tetapi {P} masih duduk di dewan.",
  rev_gagal:        "{P} berjanji revisi itu tidak akan lolos. Minggu lalu, revisinya disahkan."
};
const SAFE_OFFER = 10; // jawaban aman sebanyak ini membuat Pak Darsono menawarkan kursi (akhir tersembunyi)

// ---------------------------------------------------------------------
// PROLOG
// ---------------------------------------------------------------------
const PROLOG_LINES = [
  {t:"Saya bersumpah akan bekerja demi rakyat.", vo:"sumpah_1"},
  {t:"Saya tidak akan diam ketika ada yang salah.", vo:"sumpah_2"},
  {t:"Suara rakyat adalah suara yang saya bawa ke gedung ini.", vo:"sumpah_3"}
];
async function prolog(){
  chapterStart(0, "Sumpah Jabatan", "hall", "", "aula");
  const pick = await card({ vo:"prolog_buka", voFrom:2, btn:"Naik ke Podium", alt:"Lewati Tutorial", parts:[
    {tag:"h2", text:"Prolog"}, {tag:"h1", text:"Sumpah Jabatan"},
    {tag:"p", cls:"story", text:"Gedung dewan, pagi hari. Hari pertamamu sebagai wakil rakyat."}],
    after: brief("Cara Bermain", "", "Ketik pidatomu dengan tepat. Tidak ada batas waktu.", ["Huruf kapital harus sama", "Tanda baca harus sama"], false) });
  // skipping the tutorial also skips speed calibration: assume ~36 words per minute (same as the name-card checkbox)
  if (pick === "alt"){ S.cps = 3; return; }
  await say("Pembawa Acara", "Kepada anggota dewan termuda, dipersilakan naik ke podium untuk mengucapkan sumpah jabatan.", null, {vo:"mc_panggil"});
  flashes(3);
  await wait(400);
  await say("Pembawa Acara", "Hadirin dipersilakan berdiri.", null, {vo:"mc_berdiri"});
  await wait(500);
  const {chars, secs} = await speech(PROLOG_LINES, "hero", "Sumpah jabatan");
  // calibrate: characters per second, clamped so very slow or very fast typists still get a fair game
  S.cps = Math.max(1.2, Math.min(8, chars / secs));
  await say("Pembawa Acara", "Terima kasih. Hadirin dipersilakan memberikan tepuk tangan.", null, {vo:"mc_tepuk_tangan"});
  applause(3.5); flashes(5);
  await wait(2000);
  await say("Pejabat Lain", "(tertawa kecil) Politik yang jujur? Lucu sekali.", null, {vo:"tertawa", folder:"pejabat"});
  await wait(1400);
  await say("Pak Darsono", "Di sini, yang bersuara paling keras biasanya paling cepat hilang. Saya hanya mengingatkan, Nak. Politik itu bukan soal benar atau salah, tetapi soal siapa yang bertahan.", null, {vo:"prolog", folder:"darsono"});
  await wait(1800);
  const wpm = Math.round(S.cps * 60 / 5);
  await card({ btn:"Lanjut ke Bab 1", parts:[{tag:"h2", text:"Pidato Selesai"}],
    after:`<div class="bignum"><b>${wpm}</b><span>kata per menit</span></div><p class="story">Itulah kecepatan mengetikmu. Batas waktu pada bab-bab berikutnya disesuaikan dengan kecepatan ini.</p>` });
}

// ---------------------------------------------------------------------
// BAB 1: AIR NAIK (forum: Wawancara Cegat)
// ---------------------------------------------------------------------
function bab1Data(){
  return [
    { q:"Tanggul ini dijanjikan sejak tiga tahun lalu. Mengapa belum dibangun juga? Warga di sini sudah kehilangan rumah mereka, dan kami butuh jawaban yang jujur, bukan janji.", vo:"b1_q1",
      opts:[
        {t:"Anggarannya sudah cair. Saya mau cari tahu uangnya lari ke mana.", vo:"b1_q1_a", d:+12, r:"Nadia mengangguk pelan. Warga di belakangnya mulai merekam."},
        {t:"Hujannya memang ekstrem, ini murni faktor alam.", vo:"b1_q1_b", d:-10, r:`Seorang ibu berteriak, "Hujan turun setiap tahun, {p}!"`},
        {t:"Itu urusan dinas, bukan urusan saya.", vo:"b1_q1_c", d:-15, r:`Nadia menurunkan mikrofonnya. "{P} wakil kami, bukan?"`}
      ],
      sulit:[
        {t:"Uangnya cair tiga tahun lalu, tanggulnya tidak ada. Saya akan telusuri ke mana uang itu pergi.", vo:"b1_q1_sa", d:+12, r:"Nadia mengangguk pelan. Warga di belakangnya mulai merekam."},
        {t:"Semua anggaran sedang kami evaluasi supaya kejadian ini tidak terulang.", vo:"b1_q1_sb", d:-4, safe:true, r:"Terdengar rapi, tetapi warga sudah terlalu sering mendengar kalimat seperti itu."},
        {t:"Satu bulan lagi tanggul ini berdiri, saya jamin!", vo:"b1_q1_sc", d:+2, promise:"tanggul_sebulan", r:"Warga bersorak. Namun, satu bulan adalah janji yang sangat berani."}
      ]},
    { q:"Apa yang akan {P} lakukan untuk warga malam ini?", vo:"b1_q2",
      opts:[
        {t:"Rumah saya jadi posko mulai malam ini, dan saya ikut tidur di sini.", vo:"b1_q2_a", d:+10, r:"Beberapa warga mulai mengangkut kasur ke posko itu."},
        {t:"Nanti kami bahas di rapat minggu depan.", vo:"b1_q2_b", d:-8, safe:true, r:`"Minggu depan rumah kami sudah hanyut, {p}."`},
        {t:"Bantuan sudah cukup, warga jangan terlalu manja.", vo:"b1_q2_c", d:-20, r:"Potongan video itu langsung menyebar di grup-grup percakapan warga."}
      ],
      sulit:[
        {t:"Malam ini posko saya buka, dan tiap keluarga harus dapat tempat tidur.", vo:"b1_q2_sa", d:+10, r:"Beberapa warga mulai mengangkut kasur ke posko itu."},
        {t:"Dinas sosial sudah saya telepon, bantuannya sedang dikirim ke sini.", vo:"b1_q2_sb", d:+2, r:"Langkah yang benar, tetapi warga ingin melihat {P} sendiri turun tangan."},
        {t:"Apa pun yang terjadi, saya tidak pulang sampai air surut.", vo:"b1_q2_sc", d:+3, r:"Kalimat yang heroik, tetapi warga butuh bantuan nyata, bukan sekadar kehadiran."}
      ]},
    { q:"Menteri Pekerjaan Umum mengatakan bahwa banjir ini salah warga yang membuang sampah sembarangan. Apa tanggapan {P}?", vo:"b1_q3",
      opts:[
        {t:"Sampah itu memang masalah. Masalah yang lebih besar, tanggulnya tidak pernah dibangun.", vo:"b1_q3_a", d:+12, r:`Nadia mencatat dengan cepat. "Boleh saya kutip?"`},
        {t:"Saya setuju dengan Pak Menteri.", vo:"b1_q3_b", d:-10, safe:true, r:`Warga saling berpandangan. "Ternyata sama saja."`},
        {t:"Pak Menteri itu tidak tahu apa-apa.", vo:"b1_q3_c", d:-4, r:"Benar atau tidak, nadanya kasar. Potongan videonya menjadi meme."}
      ],
      sulit:[
        {t:"Sampah itu memang masalah. Masalah yang lebih besar, tanggulnya tidak pernah dibangun.", vo:"b1_q3_sa", d:+12, r:`Nadia mencatat dengan cepat. "Boleh saya kutip?"`},
        {t:"Pemerintah dan warga sama-sama punya andil di sini.", vo:"b1_q3_sb", d:-3, safe:true, r:"Terdengar bijak, tetapi juga terdengar seperti membela Pak Menteri."},
        {t:"Silakan Pak Menteri datang ke sini dan lihat sendiri.", vo:"b1_q3_sc", d:+5, r:"Sindiran yang halus. Namun, publik masih menunggu sikapmu sendiri."}
      ]},
    { q:"Ada kayu gelondongan yang terpotong rapi hanyut di sungai. {P} tahu dari mana asalnya?", vo:"b1_q4",
      opts:[
        {t:"Saya belum tahu. Yang jelas, bukti ini saya bawa ke dewan.", vo:"b1_q4_a", d:+12, ev:"kayu", r:"Nadia memotret nomor yang tercetak di ujung kayu itu."},
        {t:"Itu kayu tumbang biasa karena hujan deras.", vo:"b1_q4_b", d:-10, r:"Seorang warga menunjuk bekas gergaji mesin pada kayu itu."},
        {t:"Ini pasti ulah perusahaan sawit. Besok mereka saya penjarakan!", vo:"b1_q4_c", d:+3, promise:"penjara_sawit", r:"Warga bersorak. Namun, janji sebesar itu pasti akan ditagih."}
      ],
      sulit:[
        {t:"Saya belum tahu. Yang jelas, bukti ini saya bawa ke dewan.", vo:"b1_q4_sa", d:+12, ev:"kayu", r:"Nadia memotret nomor yang tercetak di ujung kayu itu."},
        {t:"Kelihatannya dari pembalakan liar. Kami akan selidiki.", vo:"b1_q4_sb", d:+4, r:"Masuk akal, tetapi tanpa bukti, kalimat itu mudah dibantah."},
        {t:"Saya tahu siapa pemiliknya. Besok namanya saya sebut.", vo:"b1_q4_sc", d:+2, promise:"nama_kayu", r:"Wartawan lain langsung mengerubungi. Kalau besok tidak ada nama, kamu akan dicap pembohong."}
      ]},
    { q:"Apa pesan {P} untuk warga yang kehilangan rumah malam ini?", vo:"b1_q5",
      opts:[
        {t:"Saya tidak akan berhenti sampai kalian punya rumah lagi.", vo:"b1_q5_a", d:+12, r:"Hening sejenak. Kemudian seseorang mulai bertepuk tangan."},
        {t:"Sabar, ya, semua pasti ada hikmahnya.", vo:"b1_q5_b", d:-5, r:"Kalimat itu terdengar hampa di tengah hujan."},
        {t:"Jangan lupa pilih saya lagi pada pemilu nanti.", vo:"b1_q5_c", d:-15, r:`Nadia mematikan kameranya. "Saya kira {P} berbeda."`}
      ],
      sulit:[
        {t:"Saya tidak akan berhenti sampai kalian punya rumah lagi.", vo:"b1_q5_sa", d:+12, r:"Hening sejenak. Kemudian seseorang mulai bertepuk tangan."},
        {t:"Pemerintah akan mengganti semua rumah yang rusak.", vo:"b1_q5_sb", d:+2, promise:"rumah_warga", r:"Warga bertepuk tangan, tetapi kamu belum punya wewenang untuk menjanjikan itu."},
        {t:"Saya ikut berduka. Ini pasti berat sekali buat kalian.", vo:"b1_q5_sc", d:+3, r:"Tulus, tetapi tidak menjawab apa yang akan {P} lakukan."}
      ]}
  ];
}
async function bab1(){
  chapterStart(1, "Air Naik", "flood", "", "banjir");
  await card({ vo:"bab1_buka", voFrom:2, mark:1, btn:"Turun ke Lokasi", parts:[
    {tag:"h2", text:"Bab 1"}, {tag:"h1", text:"Air Naik"},
    {tag:"p", cls:"story", text:"Tiga hari setelah pelantikan, banjir merendam daerah pemilihanmu. Seorang wartawan muda menunggumu di tepi air."}],
    after: brief("Forum Baru", "Wawancara Cegat", "Wartawan bertanya dan kamu punya tiga pilihan jawaban. Ketik jawaban yang ingin kamu ucapkan.",
      ["Awali dengan huruf kapital", "Perhatikan tanda baca", S.relaxed ? "Tanpa batas waktu" : "Ada batas waktu"]) });
  S.rec = true; // record typing stats for this chapter
  await runForum(bab1Data(), {...FORUMS.cegat, who:"Nadia · Wartawan", node:"nadia", folder:"nadia", hero:"heroF", prompt:"Jawab pertanyaan Nadia"});
  await chapterEnd(1, {
    tinggi:["Satu-satunya Pejabat yang Turun ke Air", "Artikel Nadia dibaca jutaan orang. Namamu mulai dikenal, tetapi juga mulai dicatat oleh Meja Bundar."],
    sedang:["Wakil Rakyat Baru: Harapan atau Basa-basi?", "Publik masih ragu. Kesempatanmu belum habis."],
    rendah:["Sama Saja dengan yang Lain", "Warga kecewa. Kepercayaan yang hilang akan sulit kembali."]
  }, "Bantuan Sosial yang Hilang");
}

// ---------------------------------------------------------------------
// BAB 2: BANTUAN SOSIAL YANG HILANG (forum baru: Kolom Komentar; meter baru: Tekanan Elit)
// ---------------------------------------------------------------------
function bab2Data(){
  return [
    { who:"@bunda_raisa", q:"{P}, sudah dua minggu kami tinggal di pengungsian. Bantuan sosial yang katanya sudah dikirim itu sebenarnya ke mana?", vo:"b2_q1",
      opts:[
        {t:"Datanya sedang saya telusuri. Hasilnya nanti saya umumkan di sini.", vo:"b2_q1_a", d:+10, r:"Komentarmu disukai ribuan orang. Beberapa warga membagikan foto posko yang kosong."},
        {t:"Bantuan sedang dalam proses, mohon bersabar.", vo:"b2_q1_b", d:-6, safe:true, r:`Balasan pertama di bawah komentarmu: "Sabar sampai kapan, {p}?"`},
        {t:"Tanyakan saja ke kementerian, itu bukan wewenang saya.", vo:"b2_q1_c", d:-12, r:"Tangkapan layar balasanmu menyebar dengan judul: wakil rakyat lempar tanggung jawab."}
      ],
      sulit:[
        {t:"Data penyalurannya sudah saya minta. Begitu keluar, saya umumkan di sini.", vo:"b2_q1_sa", d:+10, r:"Komentarmu disukai ribuan orang. Beberapa warga membagikan foto posko yang kosong."},
        {t:"Penyalurannya memang tertunda. Penyebabnya sedang kami cari.", vo:"b2_q1_sb", d:+2, safe:true, r:"Jujur, tetapi warga ingin tahu siapa yang menahan bantuan itu."},
        {t:"Besok pagi semua bantuan pasti sudah sampai ke posko.", vo:"b2_q1_sc", d:+2, promise:"bansos_besok", r:"Warga lega membacanya. Namun, kamu tidak punya kendali atas truk-truk bantuan itu."}
      ]},
    { who:"@kabar.sendaru", q:"Menteri Sosial menyatakan bahwa bantuan sudah disalurkan seratus persen. Apakah {P} punya data yang berbeda?", vo:"b2_q2",
      opts:[
        {t:"Data di posko lain ceritanya. Saya minta penyalurannya diaudit.", vo:"b2_q2_a", d:+10, e:+6, r:"Akun berita itu mengutip balasanmu. Di kementerian, beberapa telepon mulai berdering."},
        {t:"Saya percaya pada pernyataan Pak Menteri.", vo:"b2_q2_b", d:-10, safe:true, r:"Warga di posko membalas dengan foto piring-piring kosong."},
        {t:"Menteri Sosial berbohong dan harus mundur hari ini juga!", vo:"b2_q2_c", d:+3, e:+20, r:"Ribuan orang bersorak di kolom komentar. Di gedung kementerian, namamu mulai dicatat."}
      ],
      sulit:[
        {t:"Warga di posko ini belum terima apa-apa. Angka itu harus diaudit.", vo:"b2_q2_sa", d:+10, e:+6, r:"Akun berita itu mengutip balasanmu. Di kementerian, beberapa telepon mulai berdering."},
        {t:"Mungkin data pusat dan daerah belum cocok.", vo:"b2_q2_sb", d:-2, safe:true, r:"Terdengar masuk akal, tetapi juga terdengar seperti mencari alasan untuk kementerian."},
        {t:"Kalau angkanya benar, tunjukkan daftar penerimanya hari ini.", vo:"b2_q2_sc", d:+6, e:+12, r:"Tantangan yang tajam. Kementerian tidak menjawab, tetapi mereka mendengarnya."}
      ]},
    { who:"@infoviral_88", q:"Katanya bantuan tidak dibagikan karena warga di sini bukan pendukung partai penguasa. Benar begitu?", vo:"b2_q3",
      opts:[
        {t:"Saya belum pegang buktinya. Kita tunggu datanya jelas dulu.", vo:"b2_q3_a", d:+8, r:"Beberapa warganet memuji sikapmu yang tidak ikut menyebarkan kabar burung."},
        {t:"Benar sekali, ini jelas permainan politik!", vo:"b2_q3_b", d:-8, e:+10, r:"Kabar itu ternyata hoaks. Kini kamu dituduh ikut menyebarkannya."},
        {t:"Itu hoaks. Penyebarnya saya laporkan ke polisi.", vo:"b2_q3_c", d:-6, r:"Ancamanmu membuat orang takut bertanya. Kolom komentar mendadak sepi."}
      ],
      sulit:[
        {t:"Buktinya belum saya lihat, jadi saya tidak mau menebak-nebak.", vo:"b2_q3_sa", d:+8, r:"Beberapa warganet memuji sikapmu yang tidak ikut menyebarkan kabar burung."},
        {t:"Bisa jadi. Pola seperti ini sudah pernah terjadi.", vo:"b2_q3_sb", d:-6, e:+8, r:"Kalimatmu dijadikan pembenaran oleh penyebar hoaks."},
        {t:"Tidak mungkin, pemerintah tidak akan sejahat itu.", vo:"b2_q3_sc", d:-4, safe:true, r:"Warga yang sudah dua minggu kelaparan tidak percaya pada pembelaan itu."}
      ]},
    { who:"Dokumen dari Bu Laras", q:"Laporan Penyaluran Bantuan Sosial, Kecamatan Muara Hilir. Bagian mana yang paling penting?", silent:true, noTimer:true, feed:false, node:null,
      prompt:"Tandai bagian terpenting dari dokumen", hint:"Ketik baris yang menurutmu paling penting, lalu tekan Enter.",
      opts:[
        {t:"Penerima: 4.200 keluarga. Tanda tangan penerima: 0.", d:+6, ev:"bansos", r:"Ribuan nama penerima, tetapi tidak ada satu pun tanda tangan. Bantuan itu hanya ada di atas kertas."},
        {t:"Jadwal penyaluran: setiap Senin dan Kamis pukul 08.00.", d:0, r:"Hanya jadwal. Tidak ada yang mencurigakan di sana."},
        {t:"Catatan: gudang sementara berada di kompleks kementerian.", d:+2, r:"Menarik, tetapi belum membuktikan apa pun."}
      ],
      sulit:[
        {t:"Penerima tercatat 4.200 keluarga, tetapi kolom tanda tangan kosong.", d:+6, ev:"bansos", r:"Ribuan nama penerima, tetapi tidak ada satu pun tanda tangan. Bantuan itu hanya ada di atas kertas."},
        {t:"Rekanan penyalur: PT Bundar Logistik Sendaru.", d:+2, r:"Nama rekanan itu penting, tetapi tanpa bukti penyimpangan, nama saja belum cukup."},
        {t:"Anggaran penyaluran naik dua kali lipat dibanding tahun lalu.", d:+2, r:"Mencurigakan, tetapi kenaikan anggaran bisa saja punya alasan."}
      ]},
    { who:"@pak_rt_muara", q:"Saya ketua RT di sini. Kalau {P} memang peduli, apa yang bisa {P} bantu sekarang, bukan nanti?", vo:"b2_q4",
      opts:[
        {t:"Hari ini saya belikan beras untuk posko ini, pakai uang saya sendiri.", vo:"b2_q4_a", d:+8, r:"Foto karung beras di posko beredar. Bantuan kecil, tetapi nyata."},
        {t:"Tahun depan saya usulkan anggaran tambahan.", vo:"b2_q4_b", d:-6, safe:true, r:`"Tahun depan?" balas ketua RT itu. "Kami butuh makan hari ini."`},
        {t:"Saya juga korban sistem, jadi saya tidak bisa berbuat banyak.", vo:"b2_q4_c", d:-10, r:"Warganet menyebut balasanmu sebagai alasan paling malas minggu ini."}
      ],
      sulit:[
        {t:"Sore ini saya antar beras dan obat ke posko, lalu ikut membagikannya sendiri.", vo:"b2_q4_sa", d:+8, r:"Foto karung beras di posko beredar. Bantuan kecil, tetapi nyata."},
        {t:"Beberapa donatur sudah saya hubungi. Semoga cepat ada kabar.", vo:"b2_q4_sb", d:+2, r:"Baik, tetapi kata semoga tidak bisa dimakan."},
        {t:"Mulai besok, setiap keluarga di posko akan saya beri uang tunai.", vo:"b2_q4_sc", d:+2, promise:"uang_tunai", r:"Komentarmu dibanjiri ucapan terima kasih. Namun, dari mana uangnya?"}
      ]},
    { who:"@bramsatria", q:"Kalau saya yang jadi wakil rakyat, bantuan sosial cair dalam dua puluh empat jam. Rakyat butuh aksi, bukan audit.", vo:"b2_q5", folder:"bram",
      opts:[
        {t:"Bantuan cepat itu bagus. Lebih bagus lagi kalau bantuannya tidak dicuri di jalan.", vo:"b2_q5_a", d:+10, r:"Balasanmu dikutip ribuan kali. Bram tidak membalas lagi."},
        {t:"Silakan buktikan, kalau Anda bisa.", vo:"b2_q5_b", d:-3, r:"Pertengkaran kecil itu menjadi tontonan, bukan solusi."},
        {t:"Saya juga bisa mencairkannya dalam dua belas jam!", vo:"b2_q5_c", d:+2, promise:"cair_12jam", r:"Kini ada dua janji yang saling berlomba. Rakyat akan menagih keduanya."}
      ],
      sulit:[
        {t:"Justru dengan audit, bantuan berikutnya sampai ke orang yang tepat.", vo:"b2_q5_sa", d:+10, r:"Balasanmu dikutip ribuan kali. Bram tidak membalas lagi."},
        {t:"Sudahlah, kita kerja sama saja. Rakyat tidak butuh kita bertengkar.", vo:"b2_q5_sb", d:+3, safe:true, r:"Kalimat yang sejuk, tetapi Bram justru memakainya untuk berfoto bersama warga."},
        {t:"Saya setuju. Minggu ini bantuannya pasti cair.", vo:"b2_q5_sc", d:+3, promise:"cair_minggu_ini", r:"Warga senang membacanya. Namun, minggu ini tinggal empat hari lagi."}
      ]}
  ];
}
async function bab2(){
  chapterStart(2, "Bantuan Sosial yang Hilang", "posko", "feedOn", "posko");
  await card({ vo:"bab2_buka", voFrom:2, mark:2, btn:"Buka Kolom Komentar", parts:[
    {tag:"h2", text:"Bab 2"}, {tag:"h1", text:"Bantuan Sosial yang Hilang"},
    {tag:"p", cls:"story", text:"Dua minggu setelah banjir, bantuan sosial belum juga sampai. Di posko, warga mengantre dengan piring kosong, sementara namamu mulai ramai dibicarakan di media sosial."}],
    after: brief("Forum Baru", "Kolom Komentar", "Komentar warga muncul satu per satu di ponselmu. Balas dengan mengetik salah satu jawaban. Setiap balasan dibaca ribuan orang.",
      ["Meter baru: Tekanan Elit", "Menyerang pejabat menaikkan Tekanan Elit", S.relaxed ? "Tanpa batas waktu" : "Waktu tetap longgar"]) });
  await say("Narator", "Ponselmu bergetar. Video wawancaramu di tepi sungai sudah ditonton dua juta kali.", null, {vo:"b2_n1"});
  S.rec = true;
  const F = {...FORUMS.sosmed, who:"Warganet", folder:"warga", hero:"heroPk", prompt:"Balas komentar ini",
    timeout:{line:"Komentar itu tenggelam tanpa jawaban. Diammu dianggap sebagai jawaban.", d:-6}};
  const data = bab2Data();
  await runForum(data.slice(0, 3), F);
  await say("Narator", "Sebuah pesan masuk dari nomor yang tidak dikenal. Pengirimnya mengaku bernama Laras, pegawai Kementerian Sosial.", null, {vo:"b2_n2"});
  await say("Bu Laras", "Saya tidak bisa bicara lama. Saya kirimkan satu dokumen. Baca baik-baik, lalu tandai bagian yang paling penting.", null, {vo:"b2_laras1", folder:"laras"});
  await runForum(data.slice(3), F);
  await say("Narator", "Tiga hari kemudian, Menteri Sosial dicopot. Bantuan cair sebagian, tetapi tidak ada satu pun anggota Meja Bundar yang tersentuh.", null, {vo:"b2_n3"});
  await chapterEnd(2, {
    tinggi:["Data Bantuan Dibuka, Menteri Sosial Dicopot", "Warga mulai menerima bantuan. Namun, Menteri Sosial hanyalah tumbal, dan Meja Bundar tetap utuh."],
    sedang:["Menteri Sosial Dicopot, Warga Masih Menunggu", "Publik mulai memperhatikanmu, tetapi belum sepenuhnya percaya."],
    rendah:["Bantuan Cair Sebagian, Suara Wakil Rakyat Muda Tenggelam", "Warga merasa balasanmu hanya menambah ramai kolom komentar."]
  }, "Harga Naik");
}

// ---------------------------------------------------------------------
// BAB 3: HARGA NAIK (forum baru: Siniar; meter baru: Janji Tertunda)
// ---------------------------------------------------------------------
function bab3Data(){
  return [
    { q:"Langsung saja, {P}. Minyak goreng hilang dari pasar, padahal negeri kita penghasil sawit terbesar. Mengapa bisa begitu?", vo:"b3_q1",
      opts:[
        {t:"Ada yang sengaja menahan pasokan supaya harga naik. Itu yang harus kita bongkar.", vo:"b3_q1_a", d:+10, e:+5, r:`Dimas bersandar ke kursinya. "Wah, ini baru obrolan jujur."`},
        {t:"Permintaan dunia sedang tinggi, jadi ini wajar.", vo:"b3_q1_b", d:-8, safe:true, r:"Kolom komentar siaran langsung dipenuhi satu kata: wajar dari mana?"},
        {t:"Ini gara-gara pedagang pasar yang serakah.", vo:"b3_q1_c", d:-10, r:"Para pedagang kecil marah. Mereka sendiri kesulitan mendapat stok."}
      ],
      sulit:[
        {t:"Barangnya ada, hanya tertahan di gudang. Saya ingin tahu siapa yang menahannya.", vo:"b3_q1_sa", d:+10, e:+5, r:`Dimas bersandar ke kursinya. "Wah, ini baru obrolan jujur."`},
        {t:"Harga dunia sedang naik, kita kena imbasnya.", vo:"b3_q1_sb", d:-2, safe:true, r:"Benar sebagian, tetapi pendengar tahu gudang-gudang di Sendaru penuh."},
        {t:"Ini kegagalan pemerintah. Saya malu ikut jadi bagiannya.", vo:"b3_q1_sc", d:+3, e:+8, r:"Pengakuan yang berani, tetapi pendengar menunggu jalan keluarnya."}
      ]},
    { q:"Pendengar kami ingin kepastian. Bisakah {P} berjanji harga beras turun bulan depan?", vo:"b3_q2",
      opts:[
        {t:"Saya tidak mau menjanjikan hal yang belum bisa saya pastikan.", vo:"b3_q2_a", d:+8, r:"Dimas terdiam sejenak. Jawaban yang jarang ia dengar dari seorang politisi."},
        {t:"Bisa, bulan depan harga beras pasti turun.", vo:"b3_q2_b", d:+3, promise:"beras_turun", r:"Klip itu dipotong dan dibagikan. Bulan depan, semua orang akan mengecek harga."},
        {t:"Itu tergantung pemerintah pusat, bukan saya.", vo:"b3_q2_c", d:-6, safe:true, r:`"Lalu untuk apa kami memilih {P}?" tulis seorang pendengar.`}
      ],
      sulit:[
        {t:"Satu hal yang bisa saya janjikan: data stok beras saya buka ke publik.", vo:"b3_q2_sa", d:+10, r:"Janji yang kecil, tetapi bisa ditepati. Dimas mengangguk."},
        {t:"Saya usahakan sekuat tenaga supaya harga turun bulan depan.", vo:"b3_q2_sb", d:+3, promise:"beras_turun", r:"Terdengar hati-hati, tetapi pendengar tetap mencatatnya sebagai janji."},
        {t:"Kalau gudang-gudang itu dibuka, harga pasti turun dalam sebulan.", vo:"b3_q2_sc", d:+4, promise:"beras_turun", r:"Logikanya masuk akal, tetapi kata pasti akan ditagih."}
      ]},
    { q:"Bram Satria menjanjikan beras lima ribu rupiah per kilogram. Apa tanggapan {P}?", vo:"b3_q3",
      opts:[
        {t:"Janji manis itu gampang. Rakyat berhak tahu uangnya dari mana.", vo:"b3_q3_a", d:+10, r:"Seorang ekonom membagikan klipmu sambil menulis: akhirnya ada yang bertanya."},
        {t:"Saya bisa memberi harga yang lebih murah lagi!", vo:"b3_q3_b", d:+2, promise:"beras_murah", r:"Perang janji dimulai. Pendengar bersorak, tetapi tidak ada yang tahu caranya."},
        {t:"Bram itu pembohong, jangan percaya dia.", vo:"b3_q3_c", d:-6, r:"Pendukung Bram menyerbu kolom komentar. Obrolan berubah menjadi keributan."}
      ],
      sulit:[
        {t:"Coba tunjukkan hitungannya. Subsidi sebesar itu pasti ada yang membayar.", vo:"b3_q3_sa", d:+10, r:"Seorang ekonom membagikan klipmu sambil menulis: akhirnya ada yang bertanya."},
        {t:"Kalau bisa, bagus. Asal hitungannya masuk akal, saya dukung.", vo:"b3_q3_sb", d:+2, safe:true, r:"Sikap yang sopan. Namun, Bram memakainya sebagai dukungan untuk janjinya."},
        {t:"Harga empat ribu pun bisa, asal mafia impornya kita sikat.", vo:"b3_q3_sc", d:+3, e:+8, promise:"beras_murah", r:"Pendengar bersorak. Kamu baru saja ikut perang janji."}
      ]},
    { q:"Terakhir, {P}. Banyak anak muda bilang politik itu kotor dan percuma. Apa yang ingin {P} sampaikan kepada mereka?", vo:"b3_q4",
      opts:[
        {t:"Politik memang kotor. Justru karena itu orang baik jangan menjauh.", vo:"b3_q4_a", d:+10, r:"Kalimat itu menjadi kutipan yang paling banyak dibagikan minggu ini."},
        {t:"Jangan terlalu dipikirkan, nikmati saja hidup kalian.", vo:"b3_q4_b", d:-8, r:"Anak-anak muda yang mendengar merasa diremehkan."},
        {t:"Pilih saya, maka politik akan bersih dalam lima tahun.", vo:"b3_q4_c", d:+1, promise:"politik_bersih", r:"Kedengarannya seperti iklan kampanye. Janjinya besar sekali."}
      ],
      sulit:[
        {t:"Kalau orang jujur pergi, kursinya diisi orang yang tidak jujur.", vo:"b3_q4_sa", d:+10, r:"Kalimat itu menjadi kutipan yang paling banyak dibagikan minggu ini."},
        {t:"Tidak apa-apa kecewa, asal tetap datang ke tempat pemungutan suara.", vo:"b3_q4_sb", d:+4, r:"Pesan yang baik, meski terdengar seperti iklan layanan masyarakat."},
        {t:"Beri saya lima tahun, dan saya akan membersihkan politik negeri ini.", vo:"b3_q4_sc", d:+2, promise:"politik_bersih", r:"Kedengarannya gagah. Lima tahun lagi, kalimat ini akan diputar ulang."}
      ]},
    { who:"Dokumen dari Bu Laras", q:"Daftar Izin Impor Beras Tahun Ini. Bagian mana yang paling penting?", silent:true, noTimer:true, node:null,
      prompt:"Tandai bagian terpenting dari dokumen", hint:"Ketik baris yang menurutmu paling penting, lalu tekan Enter.",
      opts:[
        {t:"Pemegang izin tunggal: PT Bundar Pangan Sejahtera, komisaris Haryo Darsono.", d:+6, ev:"impor", r:"Komisaris pemegang izin impor tunggal itu ternyata adik kandung Pak Darsono."},
        {t:"Kuota impor tahun ini: 2 juta ton.", d:0, r:"Angka yang besar, tetapi belum menunjukkan siapa yang diuntungkan."},
        {t:"Pelabuhan bongkar muat: Tanjung Sendaru.", d:0, r:"Hanya lokasi. Tidak ada yang janggal."}
      ],
      sulit:[
        {t:"Komisaris PT Bundar Pangan Sejahtera: Haryo Darsono.", d:+6, ev:"impor", r:"Komisaris pemegang izin impor tunggal itu ternyata adik kandung Pak Darsono."},
        {t:"Izin impor diterbitkan dua hari sebelum harga mulai naik.", d:+3, r:"Waktunya mencurigakan, tetapi siapa yang diuntungkan?"},
        {t:"Kuota impor dibagi rata untuk tujuh perusahaan.", d:0, r:"Terlihat wajar di atas kertas. Masalahnya ada di baris lain."}
      ]}
  ];
}
async function bab3(){
  chapterStart(3, "Harga Naik", "pod", "", "siniar");
  await card({ vo:"bab3_buka", voFrom:2, mark:3, btn:"Masuk ke Studio", parts:[
    {tag:"h2", text:"Bab 3"}, {tag:"h1", text:"Harga Naik"},
    {tag:"p", cls:"story", text:"Minyak goreng menghilang dari pasar, dan harga beras naik tiga kali dalam sebulan. Sebuah siniar populer, Ngobrol Jujur, mengundangmu untuk bicara."}],
    after: brief("Forum Baru", "Siniar Ngobrol Jujur", "Obrolannya panjang dan santai. Waktumu lebih longgar, tetapi ketelitian lebih penting: kalimat yang berantakan terdengar tidak meyakinkan.",
      ["Meter baru: Janji Tertunda", "Ketelitian lebih penting daripada kecepatan", "Hati-hati dengan janji"]) });
  await say("Dimas · Ngobrol Jujur", "Selamat datang di Ngobrol Jujur. Hari ini kita kedatangan wakil rakyat yang videonya sedang ramai. Santai saja, ya. Di sini kita bicara jujur.", $("dimas"), {vo:"b3_dimas0", folder:"dimas"});
  S.rec = true;
  const F = {...FORUMS.siniar, who:"Dimas · Ngobrol Jujur", node:"dimas", folder:"dimas", hero:"heroPod", prompt:"Jawab pertanyaan Dimas",
    timeout:{line:"Hening terlalu lama. Dimas tertawa canggung dan mengganti topik.", d:-6}};
  const data = bab3Data();
  await runForum(data.slice(0, 2), F);
  await say("Narator", "Di siniar lain, Bram Satria berjanji harga beras akan menjadi lima ribu rupiah per kilogram. Klipnya ditonton sepuluh juta kali.", null, {vo:"b3_n1"});
  await say("Bram Satria", "Beras lima ribu! Itu janji saya. Rakyat tidak butuh hitungan, rakyat butuh keberanian!", null, {vo:"b3_bram1", folder:"bram"});
  await runForum(data.slice(2, 4), F);
  await say("Narator", "Selepas siaran, sebuah pesan masuk dari Bu Laras.", null, {vo:"b3_n2"});
  await say("Bu Laras", "Saya mendapat daftar pemegang izin impor beras. Ada satu nama yang mungkin Anda kenal.", null, {vo:"b3_laras1", folder:"laras"});
  await runForum(data.slice(4), F);
  await chapterEnd(3, {
    tinggi:["Menolak Janji Manis, Wakil Rakyat Muda Justru Didengar", "Klipmu dibagikan dengan satu kalimat sederhana: ternyata jujur itu menarik."],
    sedang:["Beras Lima Ribu atau Jujur Apa Adanya? Publik Terbelah", "Sebagian pendengar memujimu, sebagian lagi lebih percaya pada janji Bram."],
    rendah:["Bram Satria Melesat, Wakil Rakyat Muda Tertinggal", "Janji manis menyebar lebih cepat daripada penjelasan yang jujur."]
  }, "Langit Kuning");
}

// ---------------------------------------------------------------------
// BAB 4: LANGIT KUNING (karhutla; Wawancara Cegat, pilihan mulai bernuansa)
// ---------------------------------------------------------------------
function bab4Data(){
  return [
    { q:"Pemerintah daerah menyebut kebakaran ini akibat petani yang membuka lahan dengan cara dibakar. {P} setuju?", vo:"b4_q1",
      opts:[
        {t:"Petani kecil tidak mungkin membakar ribuan hektare sendirian.", vo:"b4_q1_a", d:+10, e:+5, r:"Para petani yang menonton mengangguk. Nadia mencatat kata ribuan hektare."},
        {t:"Kita perlu membina petani agar tidak membakar lahan lagi.", vo:"b4_q1_b", d:-2, safe:true, r:"Tidak salah, tetapi kalimat itu ikut menyalahkan pihak yang paling lemah."},
        {t:"Itu fitnah, petani kita tidak pernah membakar apa pun.", vo:"b4_q1_c", d:-4, r:"Sebagian petani memang membakar lahan kecil. Kalimatmu mudah dibantah."}
      ],
      sulit:[
        {t:"Sebelum menyalahkan siapa pun, cocokkan dulu titik apinya dengan peta izin lahan.", vo:"b4_q1_sa", d:+10, e:+5, r:"Nadia menurunkan maskernya sejenak. \"Itu pertanyaan yang tepat.\""},
        {t:"Semua pihak, termasuk petani, harus berhenti membakar lahan.", vo:"b4_q1_sb", d:0, safe:true, r:"Kalimat yang adil di atas kertas, tetapi korporasi besar ikut bersembunyi di baliknya."},
        {t:"Ini ulah korporasi, petani hanya dijadikan kambing hitam.", vo:"b4_q1_sc", d:+5, e:+12, r:"Warga bersorak. Namun, tanpa data, tuduhan itu mudah dipatahkan."}
      ]},
    { who:"Bu Sumi · Warga", node:"sumi", folder:"warga", q:"Anak saya batuk sudah seminggu. Sekolah libur, puskesmas penuh. Kami harus ke mana, {P}?", vo:"b4_q2",
      opts:[
        {t:"Mulai malam ini saya buka rumah singgah, lengkap dengan penjernih udara.", vo:"b4_q2_a", d:+10, r:"Bu Sumi menggenggam tanganmu. Malam itu, tiga puluh anak tidur di rumah singgah."},
        {t:"Gunakan masker dan sebisa mungkin tetap di dalam rumah.", vo:"b4_q2_b", d:-3, safe:true, r:"Saran yang benar, tetapi rumah Bu Sumi pun sudah penuh asap."},
        {t:"Bersabarlah, hujan pasti segera turun.", vo:"b4_q2_c", d:-8, r:"Bu Sumi memalingkan wajah. Langit masih kuning dan tidak ada tanda hujan."}
      ],
      sulit:[
        {t:"Malam ini saya buka rumah singgah dengan penjernih udara, khusus untuk anak-anak.", vo:"b4_q2_sa", d:+10, r:"Bu Sumi menggenggam tanganmu. Malam itu, tiga puluh anak tidur di rumah singgah."},
        {t:"Dinas kesehatan sudah saya minta menambah tenaga di puskesmas.", vo:"b4_q2_sb", d:+4, r:"Langkah yang tepat, meski Bu Sumi masih harus mengantre berjam-jam."},
        {t:"Saya akan membiayai pengobatan semua anak yang sakit di sini.", vo:"b4_q2_sc", d:+3, promise:"biaya_anak", r:"Para ibu menangis lega. Namun, jumlah anak yang sakit terus bertambah."}
      ]},
    { who:"Dokumen dari Bu Laras", q:"Citra Satelit Titik Api, Sendaru Barat, Minggu Ini. Bagian mana yang paling penting?", silent:true, noTimer:true, node:null,
      prompt:"Tandai bagian terpenting dari dokumen", hint:"Ketik baris yang menurutmu paling penting, lalu tekan Enter.",
      opts:[
        {t:"Titik api: 287 dari 312 titik berada di konsesi PT Cakrawala Sawit Sendaru.", d:+6, ev:"satelit", r:"Hampir semua titik api berada di lahan satu perusahaan. Pemilik sahamnya anggota Meja Bundar."},
        {t:"Lahan warga: 25 titik api, sebagian besar berupa kebun kecil.", d:0, r:"Benar, tetapi itu hanya sebagian kecil dari seluruh titik api."},
        {t:"Arah angin: barat daya, 20 kilometer per jam.", d:0, r:"Berguna untuk memperkirakan arah asap, tetapi tidak menunjukkan siapa pelakunya."}
      ],
      sulit:[
        {t:"Sebanyak 287 dari 312 titik api berada di dalam konsesi PT Cakrawala Sawit Sendaru.", d:+6, ev:"satelit", r:"Hampir semua titik api berada di lahan satu perusahaan. Pemilik sahamnya anggota Meja Bundar."},
        {t:"Lahan warga mencatat 25 titik api, sebagian besar berupa kebun kecil.", d:0, r:"Benar, tetapi itu hanya sebagian kecil dari seluruh titik api."},
        {t:"Gambut yang terbakar mencapai 40.000 hektare, dua kali lipat dari tahun lalu.", d:+2, r:"Angka yang mengerikan, tetapi belum menunjukkan siapa pelakunya."}
      ]},
    { q:"Kalau {P} punya bukti, apakah {P} berani menyebut nama perusahaannya di depan kamera?", vo:"b4_q3",
      opts:[
        {t:"Nama perusahaannya saya serahkan ke penegak hukum, sekalian dengan datanya.", vo:"b4_q3_a", d:+6, e:+5, r:"Langkah yang hati-hati. Datamu kini aman di tangan yang berwenang, tetapi publik belum tahu namanya."},
        {t:"Saya akan menyebutnya sekarang: PT Cakrawala Sawit Sendaru.", vo:"b4_q3_b", d:+10, e:+25, flag:"sebut", r:"Kamera-kamera langsung mendekat. Nama itu menjadi berita utama malam ini, dan Meja Bundar mendengarnya."},
        {t:"Belum saatnya. Saya tidak mau sebut nama dulu.", vo:"b4_q3_c", d:-4, safe:true, r:`Nadia menghela napas. "Asapnya tidak akan menunggu, {p}."`}
      ],
      sulit:[
        {t:"Datanya saya serahkan dulu ke penegak hukum. Setelah itu kami umumkan bersama.", vo:"b4_q3_sa", d:+6, e:+5, r:"Langkah yang hati-hati. Datamu kini aman di tangan yang berwenang, tetapi publik belum tahu namanya."},
        {t:"Perusahaannya PT Cakrawala Sawit Sendaru, dan saya punya datanya.", vo:"b4_q3_sb", d:+10, e:+25, flag:"sebut", r:"Kamera-kamera langsung mendekat. Nama itu menjadi berita utama malam ini, dan Meja Bundar mendengarnya."},
        {t:"Biarkan hukum yang bekerja, saya tidak mau mendahului.", vo:"b4_q3_sc", d:-3, safe:true, r:`Nadia menghela napas. "Asapnya tidak akan menunggu, {p}."`}
      ]},
    { who:"Pak Bupati", node:"bupati", folder:"bupati", q:"Jangan membuat gaduh, {p}. Investor sawit itu yang menghidupi daerah ini. Kalau mereka pergi, warga makan apa?", vo:"b4_q4",
      opts:[
        {t:"Warga juga harus bisa bernapas supaya bisa bekerja dan makan.", vo:"b4_q4_a", d:+10, e:+6, r:"Pak Bupati tidak menjawab. Ia berjalan pergi sambil menelepon seseorang."},
        {t:"Benar juga, investasi memang harus kita jaga bersama.", vo:"b4_q4_b", d:-8, safe:true, r:"Pak Bupati tersenyum puas. Warga yang menonton tidak ikut tersenyum."},
        {t:"Bapak dibayar berapa oleh perusahaan itu?", vo:"b4_q4_c", d:-2, e:+12, r:"Pertanyaan itu memancing tawa wartawan, tetapi Pak Bupati tidak akan melupakannya."}
      ],
      sulit:[
        {t:"Investasi boleh, tetapi bukan dengan membakar paru-paru anak-anak kita.", vo:"b4_q4_sa", d:+10, e:+6, r:"Pak Bupati tidak menjawab. Ia berjalan pergi sambil menelepon seseorang."},
        {t:"Kita cari jalan tengah, supaya investasi jalan dan hutan tetap ada.", vo:"b4_q4_sb", d:0, safe:true, r:"Jalan tengah yang terdengar bijak, tetapi asap tidak mengenal jalan tengah."},
        {t:"Kalau investor itu melanggar hukum, izinnya harus dicabut hari ini.", vo:"b4_q4_sc", d:+5, e:+14, r:"Tegas dan tepat sasaran. Di ibu kota, seseorang mencatat namamu."}
      ]},
    { q:"Apa pesan {P} untuk warga yang malam ini tidur dengan masker?", vo:"b4_q5",
      opts:[
        {t:"Kalian tidak sendirian. Asap ini ada pelakunya, dan kita akan kejar dia.", vo:"b4_q5_a", d:+10, r:"Nadia menurunkan kameranya pelan-pelan. Tidak ada yang bersorak, tetapi semua orang mendengar."},
        {t:"Tetap jaga kesehatan dan perbanyak minum air putih.", vo:"b4_q5_b", d:-2, safe:true, r:"Pesan kesehatan yang baik, tetapi terdengar seperti pengumuman puskesmas."},
        {t:"Saya berjanji langit kalian akan biru lagi minggu depan.", vo:"b4_q5_c", d:+2, promise:"langit_biru", r:"Warga ingin percaya. Namun, kebakaran gambut bisa berlangsung berbulan-bulan."}
      ],
      sulit:[
        {t:"Bisa bernapas itu hak kalian. Bukan pemberian siapa-siapa.", vo:"b4_q5_sa", d:+10, r:"Nadia menurunkan kameranya pelan-pelan. Tidak ada yang bersorak, tetapi semua orang mendengar."},
        {t:"Tetap di dalam rumah dulu, jaga anak-anak sampai udaranya membaik.", vo:"b4_q5_sb", d:+2, safe:true, r:"Pesan yang peduli, tetapi tidak menjawab kapan semua ini berakhir."},
        {t:"Minggu depan langit kalian akan biru lagi, saya jamin.", vo:"b4_q5_sc", d:+2, promise:"langit_biru", r:"Warga ingin percaya. Namun, kebakaran gambut bisa berlangsung berbulan-bulan."}
      ]}
  ];
}
async function bab4(){
  chapterStart(4, "Langit Kuning", "asap", "", "asap");
  await card({ vo:"bab4_buka", voFrom:2, mark:4, btn:"Turun ke Lokasi", parts:[
    {tag:"h2", text:"Bab 4"}, {tag:"h1", text:"Langit Kuning"},
    {tag:"p", cls:"story", text:"Kemarau panjang. Langit Sendaru Barat berubah kuning, sekolah diliburkan, dan rumah sakit penuh pasien sesak napas. Para pejabat menyebutnya kemarau biasa."}],
    after: brief("Forum", "Wawancara Cegat di Lokasi Kebakaran", "Mulai bab ini, tidak ada jawaban yang benar-benar salah. Setiap jawaban punya harga.",
      ["Pilihan lebih bernuansa", "Tekanan Elit makin menentukan", S.relaxed ? "Tanpa batas waktu" : "Ada batas waktu"], false) });
  await say("Nadia · Wartawan", "Kita bertemu lagi. Kali ini airnya diganti asap.", $("nadiaA"), {vo:"b4_nadia0", folder:"nadia"});
  S.rec = true;
  const F = {...FORUMS.cegat, who:"Nadia · Wartawan", node:"nadiaA", folder:"nadia", hero:"heroA", prompt:"Jawab pertanyaan ini"};
  const data = bab4Data();
  await runForum(data.slice(0, 2), F);
  await say("Bu Laras", "Saya mendapat citra satelit titik api minggu ini. Cocokkan dengan peta izin lahan.", null, {vo:"b4_laras1", folder:"laras"});
  await runForum(data.slice(2), F);
  await chapterEnd(4, {
    sebut:["Wakil Rakyat Muda Sebut Nama Pembakar Lahan", "Malam itu namamu menjadi berita utama. Di sebuah ruang rapat, Meja Bundar memutuskan untuk membalas."],
    tinggi:["Di Tengah Asap, Satu Suara Menolak Menyalahkan Petani", "Warga mendengarmu. Namun, nama pembakar lahan masih tersimpan rapi di laci Meja Bundar."],
    sedang:["Asap Belum Hilang, Jawaban Belum Jelas", "Publik masih menunggu keberanianmu."],
    rendah:["Kabut Asap, Kabut Janji", "Warga mulai lelah mendengar kalimat yang aman."]
  }, "Fitnah", S.flags.sebut ? "sebut" : null);
}

// ---------------------------------------------------------------------
// BAB 5: FITNAH (Kolom Komentar versi cepat; mekanik baru: salah ketik jadi plintiran)
// ---------------------------------------------------------------------
const NOISE = [
  ["@akun_baru_812", "Sudah kuduga, semua wakil rakyat sama saja."],
  ["@rakyat_lelah", "#WakilRakyatPalsu"],
  ["@bebas_bicara99", "Kembalikan uang rakyat!"],
  ["@pengamat_netral", "Tunggu klarifikasinya dulu, jangan langsung menghakimi."],
  ["@akun_4471", "Mundur saja!"],
  ["@warga_muara", "Saya masih percaya, tetapi tolong jelaskan."],
  ["@sendaru_bersih", "Videonya terlalu rapi untuk disebut kebetulan."],
  ["@anon_23019", "#WakilRakyatPalsu #WakilRakyatPalsu"]
];
function bab5Data(){
  return [
    { who:"@rakyat_waras01", hot:true, q:"Ternyata sama saja! Berapa isi amplopnya, {p}?", vo:"b5_q1",
      opts:[
        {t:"Video itu tidak benar. Saya akan buktikan pakai data.", vo:"b5_q1_a", d:+8, r:"Sebagian warganet menahan diri. Mereka menunggu buktimu."},
        {t:"Saya tidak perlu menjawab tuduhan murahan seperti ini.", vo:"b5_q1_b", d:-8, r:"Diam yang angkuh dibaca sebagai pengakuan."},
        {t:"Silakan laporkan saya, saya tidak takut!", vo:"b5_q1_c", d:-2, r:"Berani, tetapi tidak membantah apa pun."}
      ],
      sulit:[
        {t:"Amplop itu tidak pernah saya terima. Saya minta rekaman lengkapnya dibuka.", vo:"b5_q1_sa", d:+8, r:"Sebagian warganet menahan diri. Mereka menunggu buktimu."},
        {t:"Ini fitnah. Saya bawa ke jalur hukum.", vo:"b5_q1_sb", d:+2, r:"Langkah yang sah, tetapi proses hukum terlalu lambat untuk melawan video yang viral."},
        {t:"Kalian boleh memeriksa rekening saya kapan saja.", vo:"b5_q1_sc", d:+5, r:"Berani, tetapi pendengung langsung mencari celah di rekening keluargamu."}
      ]},
    { who:"@kabar.sendaru", q:"Pak Darsono meminta Badan Kehormatan memeriksa {P}. Apakah {P} siap mundur sementara?", vo:"b5_q2",
      opts:[
        {t:"Silakan periksa saya. Mundur karena fitnah, itu yang tidak akan saya lakukan.", vo:"b5_q2_a", d:+10, e:+5, r:"Sikap yang tegas. Akun berita itu menjadikannya judul."},
        {t:"Kalau itu keputusan partai, saya ikut saja.", vo:"b5_q2_b", d:-6, safe:true, r:"Warganet menyimpulkan: kamu bisa disetir."},
        {t:"Darsono yang seharusnya diperiksa, bukan saya!", vo:"b5_q2_c", d:+2, e:+18, r:"Serangan balik yang keras. Tekanan dari atas makin terasa."}
      ],
      sulit:[
        {t:"Silakan periksa. Setiap sidangnya saya datangi sendiri.", vo:"b5_q2_sa", d:+8, e:+3, r:"Tenang dan terbuka. Beberapa akun netral mulai membelamu."},
        {t:"Demi kebaikan bersama, saya bersedia mundur sementara.", vo:"b5_q2_sb", d:-4, safe:true, r:"Terdengar dewasa, tetapi pendengung menyebutnya pengakuan bersalah."},
        {t:"Pak Darsono juga harus diperiksa soal impor beras.", vo:"b5_q2_sc", d:+4, e:+15, r:"Kamu menyerang balik. Meja Bundar kini benar-benar menganggapmu ancaman."}
      ]},
    { who:"@infoterkini.id", hot:true, q:"TERKINI: keluarga {P} ternyata pemilik tambang ilegal di Sendaru Timur!", vo:"b5_q3",
      opts:[
        {t:"Itu hoaks. Ini data harta keluarga saya, silakan diperiksa.", vo:"b5_q3_a", d:+10, r:"Data yang terbuka membuat hoaks itu kehilangan tenaga."},
        {t:"Keluarga saya tidak ada hubungannya dengan politik.", vo:"b5_q3_b", d:-2, r:"Benar, tetapi tanpa bantahan yang jelas, hoaks itu terus menyebar."},
        {t:"Penyebar hoaks ini akan saya penjarakan semua!", vo:"b5_q3_c", d:-6, r:"Ancaman itu dijadikan bahan olok-olok: wakil rakyat antikritik."}
      ],
      sulit:[
        {t:"Ini laporan harta keluarga saya. Siapa saja boleh memeriksanya.", vo:"b5_q3_sa", d:+10, r:"Data yang terbuka membuat hoaks itu kehilangan tenaga."},
        {t:"Mohon jangan libatkan keluarga saya dalam urusan politik.", vo:"b5_q3_sb", d:0, r:"Permintaan yang manusiawi, tetapi hoaksnya tetap beredar."},
        {t:"Akun penyebar hoaks ini sudah saya laporkan ke polisi siber.", vo:"b5_q3_sc", d:+2, r:"Langkah yang sah, tetapi warganet menyebutmu membungkam kritik."}
      ]},
    { who:"@ibu_muara", q:"Saya warga Muara yang dulu {P} temani di tepi sungai. Saya masih mau percaya. Tolong katakan yang sebenarnya.", vo:"b5_q4",
      opts:[
        {t:"Terima kasih sudah percaya. Uang itu tidak saya terima, nanti juga terbukti.", vo:"b5_q4_a", d:+10, r:"Balasanmu dibagikan oleh warga Muara. Mereka masih ingat malam banjir itu."},
        {t:"Percayalah pada saya, itu saja yang bisa saya katakan.", vo:"b5_q4_b", d:-2, r:"Tulus, tetapi tidak memberi alasan untuk percaya."},
        {t:"Kalau tidak percaya, silakan pilih orang lain nanti.", vo:"b5_q4_c", d:-10, r:"Kalimat itu menyakiti orang yang paling setia kepadamu."}
      ],
      sulit:[
        {t:"Terima kasih masih percaya. Bukti kalau video itu palsu sedang diperiksa.", vo:"b5_q4_sa", d:+10, r:"Balasanmu dibagikan oleh warga Muara. Mereka masih ingat malam banjir itu."},
        {t:"Wajar kalau Ibu ragu. Saya tidak akan memaksa.", vo:"b5_q4_sb", d:+3, r:"Rendah hati, tetapi warga butuh lebih dari pengertian."},
        {t:"Doakan saja, semoga semua cepat selesai.", vo:"b5_q4_sc", d:-3, safe:true, r:"Terdengar pasrah, seolah kamu sendiri tidak yakin."}
      ]},
    { who:"@kabar.sendaru", q:"Rekaman asli sudah beredar. Apa yang ingin {P} katakan kepada para penyebar fitnah?", vo:"b5_q5",
      opts:[
        {t:"Mereka saya maafkan. Dalang videonya yang harus diusut.", vo:"b5_q5_a", d:+10, e:+6, r:"Kalimat itu menjadi judul utama. Kali ini tanpa plintiran."},
        {t:"Sudahlah, mari kita lupakan saja masalah ini.", vo:"b5_q5_b", d:-4, safe:true, r:"Pembuat video itu lolos begitu saja, dan bisa mengulanginya kapan pun."},
        {t:"Rasakan sekarang, kalian semua akan menyesal!", vo:"b5_q5_c", d:-8, r:"Kemenangan yang berubah menjadi tontonan amarah."}
      ],
      sulit:[
        {t:"Saya maafkan. Yang membayar video ini, itu yang harus diusut sampai tuntas.", vo:"b5_q5_sa", d:+10, e:+6, r:"Kalimat itu menjadi judul utama. Kali ini tanpa plintiran."},
        {t:"Saya tidak dendam. Saya hanya ingin kembali bekerja untuk warga.", vo:"b5_q5_sb", d:+4, r:"Sikap yang dewasa, meski dalangnya tetap tersembunyi."},
        {t:"Para pendengung itu dibayar Meja Bundar, nanti saya buktikan.", vo:"b5_q5_sc", d:+3, e:+15, promise:"bukti_pendengung", r:"Tuduhan yang besar. Kini kamu harus membuktikannya."}
      ]}
  ];
}
async function bab5(){
  chapterStart(5, "Fitnah", "kamar", "feedOn hot", "fitnah");
  await card({ vo:"bab5_buka", voFrom:2, mark:5, btn:"Hadapi Kolom Komentar", parts:[
    {tag:"h2", text:"Bab 5"}, {tag:"h1", text:"Fitnah"},
    {tag:"p", cls:"story", text:"Pukul dua dini hari, sebuah video beredar: kamu terlihat menerima amplop tebal di sebuah parkiran. Dalam satu jam, tagar #WakilRakyatPalsu menduduki puncak percakapan."}],
    after: brief("Mekanik Baru", "Salah Ketik Jadi Plintiran", "Komentar datang lebih cepat dan waktumu lebih sempit. Mulai bab ini, kalimat yang salah ketik bisa dipotong dan dijadikan judul berita yang menjatuhkanmu.",
      [S.relaxed ? "Tanpa batas waktu" : "Waktu lebih ketat", "Teliti setiap huruf", "Hoaks menyebar cepat"]) });
  await say("Narator", "Ponselmu tidak berhenti bergetar. Ribuan akun baru dengan foto profil kosong menyerbu kolom komentarmu.", null, {vo:"b5_n1"});
  feedNoise(NOISE, true);
  S.rec = true;
  const F = {...FORUMS.sosmed2, who:"Warganet", folder:"warga", hero:"heroK", prompt:"Balas sebelum hoaksnya menyebar",
    timeout:{line:"Kamu terlambat membalas. Potongan video itu sudah dibagikan seratus ribu kali.", d:-8}};
  const data = bab5Data();
  await runForum(data.slice(0, 3), F);
  await say("Nadia · Pesan Pribadi", "Saya sedang memeriksa video itu. Ada yang aneh dengan bayangannya. Jangan bicara sembarangan dulu.", null, {vo:"b5_nadia1", folder:"nadia"});
  await runForum(data.slice(3, 4), F);
  await say("Nadia · Pesan Pribadi", "Sudah saya pastikan. Video itu hasil sunting: bayanganmu jatuh ke kiri, tetapi bayangan mobil di sebelahmu jatuh ke kanan. Rekaman aslinya sudah saya dapatkan.", null, {vo:"b5_nadia2", folder:"nadia"});
  S.ev.add("video");
  feedNoise(null, false);
  addPost("@nadia.prameswari", "Rekaman asli dari parkiran itu. Tidak ada amplop. Silakan bandingkan sendiri.");
  await runForum(data.slice(4), F);
  await chapterEnd(5, {
    tinggi:["Video Fitnah Terbongkar, Dukungan Justru Menguat", "Rekaman asli dari Nadia menyebar lebih cepat daripada fitnahnya. Meja Bundar mulai cemas."],
    sedang:["Video Terbukti Palsu, tetapi Keraguan Tersisa", "Sebagian warga sudah telanjur percaya pada potongan pertama."],
    rendah:["Fitnah Terbantah, Nama Telanjur Tercoreng", "Kalimat-kalimatmu yang berantakan ikut dijadikan bahan olok-olok."]
  }, "Debat Nasional");
}

// ---------------------------------------------------------------------
// BAB 6: DEBAT NASIONAL (forum baru: Debat Televisi; mekanik baru: jawaban dari bukti)
// ---------------------------------------------------------------------
function bab6Data(){
  return [
    { who:"Dokumen dari Bu Laras", q:"Data Sertifikat Tanah, Pesisir Utara Sendaru. Bagian mana yang paling penting?", silent:true, noTimer:true, node:null,
      prompt:"Tandai bagian terpenting dari dokumen", hint:"Ketik baris yang menurutmu paling penting, lalu tekan Enter.",
      opts:[
        {t:"Sertifikat hak guna bangunan: 263 bidang, semuanya di atas laut.", d:+6, ev:"sertifikat", r:"Sertifikat tanah untuk wilayah laut. Pemiliknya perusahaan yang sama dengan pemilik konsesi sawit."},
        {t:"Panjang pagar: 30 kilometer, terbuat dari bambu.", d:0, r:"Semua orang sudah tahu itu dari berita."},
        {t:"Nelayan terdampak: sekitar 3.000 kepala keluarga.", d:+2, r:"Penting untuk diingat, tetapi belum menunjukkan siapa dalangnya."}
      ],
      sulit:[
        {t:"Sebanyak 263 sertifikat diterbitkan untuk bidang yang seluruhnya berada di laut.", d:+6, ev:"sertifikat", r:"Sertifikat tanah untuk wilayah laut. Pemiliknya perusahaan yang sama dengan pemilik konsesi sawit."},
        {t:"Pagar bambu itu dipasang dalam waktu kurang dari dua bulan.", d:0, r:"Cepat sekali untuk ukuran swadaya, tetapi belum menjadi bukti."},
        {t:"Nelayan yang kehilangan jalur melaut mencapai 3.000 keluarga.", d:+2, r:"Penting untuk diingat, tetapi belum menunjukkan siapa dalangnya."}
      ]},
    { q:"{P}, revisi ini mewajibkan penyadapan seizin Dewan Pengawas. Apa masalahnya?", vo:"b6_q1",
      opts:[
        {t:"Koruptor tidak akan menunggu izin untuk menyembunyikan buktinya.", vo:"b6_q1_a", d:+10, e:+5, r:"Penonton di studio bertepuk tangan. Rina harus meminta mereka tenang."},
        {t:"Mungkin ada baiknya juga, supaya penyadapan tidak disalahgunakan.", vo:"b6_q1_b", d:-6, safe:true, r:"Hendra tersenyum. Kamu baru saja memakai argumennya."},
        {t:"Revisi ini dibuat oleh para koruptor itu sendiri!", vo:"b6_q1_c", d:+2, e:+12, r:"Hendra meminta moderator menegurmu. Tuduhan tanpa bukti di siaran nasional."}
      ],
      sulit:[
        {t:"Kalau menyadap harus menunggu izin, kita akan selalu terlambat satu langkah.", vo:"b6_q1_sa", d:+10, e:+5, r:"Penonton di studio bertepuk tangan. Rina harus meminta mereka tenang."},
        {t:"Dewan Pengawas itu perlu, asal tidak memperlambat penyidikan.", vo:"b6_q1_sb", d:0, safe:true, r:"Jawaban yang seimbang, tetapi justru itulah celah yang dicari Hendra."},
        {t:"Siapa pun yang mendukung revisi ini sedang melindungi dirinya sendiri.", vo:"b6_q1_sc", d:+3, e:+12, r:"Kalimat yang tajam. Beberapa anggota dewan yang menonton mulai gelisah."}
      ]},
    { who:"Hendra · Juru Bicara Koalisi", node:"hendra", folder:"hendra", q:"Saudara terlalu dramatis. Revisi ini justru menyempurnakan lembaga itu. Apakah Saudara punya bukti bahwa lembaga itu dilemahkan?", vo:"b6_q2",
      opts:[
        {t:"Pasal yang membatasi penyadapan itu, itulah buktinya.", vo:"b6_q2_a", d:+8, r:"Hendra membuka draf di mejanya, lalu menutupnya lagi."},
        {t:"Saya memang belum punya bukti, tetapi perasaan saya mengatakan begitu.", vo:"b6_q2_b", d:-8, r:"Hendra tertawa. \"Perasaan tidak bisa dijadikan dasar undang-undang.\""},
        {t:"Anda hanya juru bicara, jadi wajar kalau Anda membelanya.", vo:"b6_q2_c", d:-2, e:+5, r:"Serangan pribadi. Penonton menganggapmu menghindari pertanyaan."}
      ],
      sulit:[
        {t:"Buktinya ada di drafnya sendiri. Baca pasal soal izin penyadapan.", vo:"b6_q2_sa", d:+8, r:"Hendra membuka draf di mejanya, lalu menutupnya lagi."},
        {t:"Dalam setahun terakhir, operasi tangkap tangan turun drastis.", vo:"b6_q2_sb", d:+4, r:"Angka itu benar, tetapi Hendra menyebutnya bukti bahwa korupsi sudah berkurang."},
        {t:"Rakyat tidak bodoh. Mereka bisa baca drafnya sendiri.", vo:"b6_q2_sc", d:+2, r:"Penonton bertepuk tangan, tetapi pertanyaan Hendra belum terjawab."}
      ]},
    { q:"Kita beralih ke pagar laut. Pemerintah menyebut pagar itu dibangun secara swadaya oleh nelayan. Apa tanggapan {P}?", vo:"b6_q3",
      opts:[
        {t:"Mana mungkin nelayan membangun pagar 30 kilometer yang menutup jalur melaut mereka sendiri.", vo:"b6_q3_a", d:+8, r:"Logika yang sederhana. Kolom komentar siaran dipenuhi kata: masuk akal."},
        {t:"Kita tunggu hasil penyelidikan resmi saja.", vo:"b6_q3_b", d:-4, safe:true, r:"Hendra mengangguk setuju. Itu bukan pertanda baik."},
        {t:"Itu bohong besar, dan semua orang tahu itu!", vo:"b6_q3_c", d:-2, r:"Emosimu sampai ke penonton, tetapi argumenmu tidak."}
      ],
      sulit:[
        {t:"Nelayan justru kehilangan jalur melaut karena pagar itu.", vo:"b6_q3_sa", d:+6, r:"Fakta yang menyentuh. Namun, Hendra punya jawaban yang sudah disiapkan."},
        {t:"Kalau memang swadaya, dari mana uang untuk 30 kilometer bambu?", vo:"b6_q3_sb", d:+8, r:"Pertanyaan yang sederhana. Hendra tidak menjawabnya."},
        {t:"Penyelidikan harus dibuka agar semuanya jelas.", vo:"b6_q3_sc", d:-2, safe:true, r:"Benar, tetapi terlalu umum untuk sebuah debat."}
      ],
      extra:[
        {need:"sertifikat", t:"Ada 263 sertifikat untuk bidang di atas laut. Pemiliknya bukan nelayan.", vo:"b6_q3_x", d:+15, e:+6, r:"Studio mendadak hening. Hendra membuka berkasnya, tetapi tidak menemukan jawaban."}
      ]},
    { who:"Hendra · Juru Bicara Koalisi", node:"hendra", folder:"hendra", q:"Saudara selalu menyerang pemerintah. Apa yang sudah Saudara hasilkan, selain keributan?", vo:"b6_q4",
      opts:[
        {t:"Saya membawa suara warga yang selama ini tidak pernah didengar.", vo:"b6_q4_a", d:+8, r:"Kamera menyorot wajah-wajah penonton yang mengangguk."},
        {t:"Hasilnya akan saya tunjukkan nanti, setelah saya terpilih lagi.", vo:"b6_q4_b", d:-6, r:"Jawaban kampanye. Hendra tidak perlu membalas."},
        {t:"Lebih baik ribut daripada diam melihat rakyat dirampok.", vo:"b6_q4_c", d:+4, e:+8, r:"Kalimat yang membakar semangat. Mahasiswa yang menonton mulai mengutipnya."}
      ],
      sulit:[
        {t:"Data bantuan sosial yang selama ini disembunyikan, saya yang membukanya.", vo:"b6_q4_sa", d:+6, r:"Hasil yang nyata, meski Hendra menyebutnya kebetulan."},
        {t:"Hasilnya mungkin belum kelihatan. Saya tetap jalan terus.", vo:"b6_q4_sb", d:+2, r:"Jujur, tetapi terdengar lemah di layar kaca."},
        {t:"Keributan ini terjadi karena ada yang terganggu oleh kebenaran.", vo:"b6_q4_sc", d:+4, e:+5, r:"Kalimat yang tajam. Hendra terdiam sejenak."}
      ],
      extra:[
        {need:"satelit", t:"Lihat citra satelit ini. Di situ kelihatan siapa yang membakar hutan kita.", vo:"b6_q4_x1", d:+12, e:+6, r:"Citra satelit itu ditampilkan di layar. Hendra meminta jeda iklan."},
        {need:"kayu", t:"Nomor di kayu banjir itu cocok dengan izin tebang perusahaan sawit tadi.", vo:"b6_q4_x2", d:+12, e:+6, r:"Foto kayu bernomor itu memenuhi layar. Hendra meminta jeda iklan."}
      ]},
    { q:"Pernyataan penutup, satu kalimat saja, {P}.", vo:"b6_q5",
      opts:[
        {t:"Lembaga Antikorupsi itu milik rakyat. Rakyat berhak menjaganya.", vo:"b6_q5_a", d:+10, r:"Lampu studio meredup. Kalimat itu menutup debat malam ini."},
        {t:"Saya menghormati semua pendapat yang ada malam ini.", vo:"b6_q5_b", d:-2, safe:true, r:"Sopan, tetapi mudah dilupakan."},
        {t:"Jika revisi ini disahkan, saya akan mundur dari dewan!", vo:"b6_q5_c", d:+2, promise:"mundur", r:"Penonton bertepuk tangan. Namun, janji itu bisa menjadi jebakan."}
      ],
      sulit:[
        {t:"Kalau lembaga ini dilemahkan, yang bersorak para koruptor, bukan kita.", vo:"b6_q5_sa", d:+10, r:"Lampu studio meredup. Kalimat itu menutup debat malam ini."},
        {t:"Kita kawal revisi ini sama-sama, dengan kepala dingin.", vo:"b6_q5_sb", d:-2, safe:true, r:"Terdengar dewasa, tetapi Hendra yang paling diuntungkan oleh kepala dingin."},
        {t:"Revisi ini tidak akan lolos selama saya masih duduk di dewan.", vo:"b6_q5_sc", d:+3, promise:"rev_gagal", r:"Kalimat yang gagah. Namun, satu suara jarang cukup untuk menggagalkan undang-undang."}
      ]}
  ];
}
async function bab6(){
  chapterStart(6, "Debat Nasional", "tv", "", "debat");
  await card({ vo:"bab6_buka", voFrom:2, mark:6, btn:"Masuk ke Studio", parts:[
    {tag:"h2", text:"Bab 6"}, {tag:"h1", text:"Debat Nasional"},
    {tag:"p", cls:"story", text:"Dewan diam-diam membahas revisi undang-undang yang melemahkan Lembaga Antikorupsi. Di laut utara Sendaru, pagar bambu sepanjang 30 kilometer muncul lengkap dengan sertifikat tanahnya. Kamu diundang ke debat nasional."}],
    after: brief("Forum Baru", "Debat Televisi", "Lawan debatmu akan memotong jika kamu terlalu lama menjawab. Bukti dari bab-bab sebelumnya membuka pilihan jawaban keempat yang paling kuat.",
      ["Mekanik baru: jawaban dari bukti", `Bukti terkumpul: ${S.ev.size}`, S.relaxed ? "Tanpa batas waktu" : "Disela jika terlambat"]) });
  await say("Bu Laras", "Ini data sertifikat di pesisir utara. Mungkin berguna untuk debat malam ini.", null, {vo:"b6_laras1", folder:"laras"});
  S.rec = true;
  const F = {...FORUMS.debat, who:"Rina · Moderator", node:"rina", folder:"moderator", hero:"heroTV", prompt:"Jawab sebelum disela",
    timeout:{who:"Hendra · Juru Bicara Koalisi", node:"hendra", folder:"hendra", vo:"b6_potong",
      text:"Maaf, saya potong. Waktu Saudara habis, dan pemirsa bisa menilai sendiri.", line:"Hendra memotong ucapanmu. Kesempatan menjawab hilang.", d:-8}};
  const data = bab6Data();
  await runForum(data.slice(0, 1), F);
  await say("Rina · Moderator", "Selamat malam, Sendaru. Malam ini kita membahas revisi Undang-Undang Lembaga Antikorupsi. Waktu menjawab terbatas.", $("rina"), {vo:"b6_rina0", folder:"moderator"});
  await runForum(data.slice(1), F);
  await say("Narator", "Malam itu juga, ribuan mahasiswa berkumpul di depan gedung dewan.", null, {vo:"b6_n1"});
  await chapterEnd(6, {
    tinggi:["Debat Semalam Memicu Gelombang Mahasiswa", "Ribuan mahasiswa turun ke jalan menolak revisi. Di ruang kerjanya, Pak Darsono mulai panik."],
    sedang:["Debat Panas, Revisi Tetap Dibahas", "Sebagian penonton memihakmu. Mahasiswa mulai berkumpul, meski belum banyak."],
    rendah:["Juru Bicara Koalisi Unggul dalam Debat", "Hendra menang di layar kaca. Namun, beberapa mahasiswa tetap mencatat kata-katamu."]
  }, "Sidang Terbuka");
}

// ---------------------------------------------------------------------
// BAB 7: SIDANG TERBUKA (forum baru: Sidang Dewan)
// ---------------------------------------------------------------------
function bab7Data(){
  return [
    { q:"Saudara menuduh ada jaringan korupsi di pemerintahan. Sampaikan dasar tuduhan Saudara.", vo:"b7_q1",
      opts:[
        {t:"Dana tanggul cair tiga tahun lalu. Tanggulnya tidak pernah ada, dan warga yang kebanjiran.", vo:"b7_q1_a", d:+8, e:+4, r:"Ruang sidang mendadak sunyi. Beberapa anggota dewan menunduk."},
        {t:"Dasarnya adalah keresahan masyarakat yang saya dengar di mana-mana.", vo:"b7_q1_b", d:-4, r:"Sorakan terdengar dari kursi koalisi: \"Keresahan bukan bukti!\""},
        {t:"Semua orang di ruangan ini sudah tahu, hanya pura-pura tidak tahu.", vo:"b7_q1_c", d:0, e:+10, r:"Sorakan pecah dari kursi koalisi. Ketua mengetuk palu."}
      ],
      sulit:[
        {t:"Anggarannya cair tiga tahun lalu. Di lokasi hanya ada papan proyek dan genangan air.", vo:"b7_q1_sa", d:+8, e:+4, r:"Ruang sidang mendadak sunyi. Beberapa anggota dewan menunduk."},
        {t:"Keresahan warga di banyak daerah sudah cukup menjadi dasar untuk menyelidiki.", vo:"b7_q1_sb", d:-2, r:"Sorakan terdengar dari kursi koalisi: \"Keresahan bukan bukti!\""},
        {t:"Saya serahkan semuanya kepada lembaga penegak hukum untuk menilai.", vo:"b7_q1_sc", d:-2, safe:true, r:"Ketua sidang tampak lega. Kamu baru saja melepaskan panggungmu sendiri."}
      ],
      extra:[
        {need:"kayu", t:"Nomor di kayu banjir itu cocok dengan izin tebang perusahaan yang juga memegang proyek tanggul fiktif.", vo:"b7_q1_x", d:+14, e:+6, r:"Foto kayu itu diedarkan dari meja ke meja. Ruang sidang berubah tegang."}
      ]},
    { who:"Anggota Koalisi", node:"anggota", folder:"anggota", q:"Bukti apa yang Saudara punya soal bantuan sosial? Jangan hanya bicara!", vo:"b7_q2",
      opts:[
        {t:"Di laporan tertulis seratus persen tersalurkan. Warga di posko yang saya datangi tidak menerima apa-apa.", vo:"b7_q2_a", d:+8, r:"Beberapa anggota dewan dari daerah banjir mengangguk pelan."},
        {t:"Nanti akan saya serahkan buktinya setelah sidang ini selesai.", vo:"b7_q2_b", d:-6, safe:true, r:"Kursi koalisi bersorak. \"Nanti, nanti, nanti!\""},
        {t:"Saudara sendiri ikut menikmati uangnya, bukan?", vo:"b7_q2_c", d:-4, e:+10, r:"Ruang sidang ricuh. Ketua mengancam akan mengeluarkanmu."}
      ],
      sulit:[
        {t:"Di atas kertas, bantuan tersalurkan seratus persen. Posko-posko yang saya datangi kosong.", vo:"b7_q2_sa", d:+8, r:"Beberapa anggota dewan dari daerah banjir mengangguk pelan."},
        {t:"Buktinya sedang diverifikasi. Nanti saya serahkan ke pimpinan.", vo:"b7_q2_sb", d:-2, safe:true, r:"Prosedural dan aman. Kursi koalisi tidak merasa terancam."},
        {t:"Menteri Sosial sudah dicopot, dan itu sudah menjadi bukti tersendiri.", vo:"b7_q2_sc", d:+2, r:"Anggota koalisi membalas: pencopotan bukan bukti korupsi."}
      ],
      extra:[
        {need:"bansos", t:"Laporan penyaluran mencatat 4.200 keluarga penerima. Kolom tanda tangannya kosong semua.", vo:"b7_q2_x", d:+14, e:+6, r:"Salinan laporan itu dibagikan. Anggota koalisi yang tadi bersorak kini terdiam."}
      ]},
    { who:"Pak Darsono", node:"darsonoS", folder:"darsono", q:"Anak muda, saya menghargai semangatmu. Namun, menuduh keluarga saya mengendalikan impor adalah fitnah yang serius.", vo:"b7_q3",
      opts:[
        {t:"Ini bukan tuduhan, Pak. Data perizinannya terbuka, siapa saja bisa memeriksa.", vo:"b7_q3_a", d:+8, e:+8, r:"Pak Darsono tersenyum tipis, tetapi tangannya meremas map di mejanya."},
        {t:"Mohon maaf kalau saya menyinggung, saya tidak bermaksud begitu.", vo:"b7_q3_b", d:-8, safe:true, r:"Pak Darsono mengangguk ramah. Ia tahu kamu baru saja mundur selangkah."},
        {t:"Kalau tidak bersalah, mengapa Bapak terlihat begitu gugup?", vo:"b7_q3_c", d:+2, e:+12, r:"Beberapa anggota dewan tertawa. Pak Darsono tidak."}
      ],
      sulit:[
        {t:"Saya tidak menuduh, Pak. Saya hanya membacakan data perizinannya.", vo:"b7_q3_sa", d:+6, e:+6, r:"Pak Darsono tersenyum tipis, tetapi tangannya meremas map di mejanya."},
        {t:"Saya menghormati Bapak, dan saya siap dikoreksi jika salah.", vo:"b7_q3_sb", d:-4, safe:true, r:"Pak Darsono mengangguk ramah. Ia tahu kamu baru saja mundur selangkah."},
        {t:"Biarkan penegak hukum yang menilai apakah ini fitnah atau bukan.", vo:"b7_q3_sc", d:+2, e:+4, r:"Jawaban yang aman. Pak Darsono tampak sedikit lebih tenang."}
      ],
      extra:[
        {need:"impor", t:"Komisaris pemegang izin impor tunggal itu Haryo Darsono. Adik kandung Bapak sendiri.", vo:"b7_q3_x", d:+14, e:+10, r:"Senyum Pak Darsono menghilang. Untuk pertama kalinya, ia tidak punya jawaban."}
      ]},
    { q:"Waktu Saudara hampir habis. Apa yang Saudara minta dari sidang ini?", vo:"b7_q4",
      opts:[
        {t:"Bentuk panitia khusus untuk menyelidiki semua kasus ini secara terbuka.", vo:"b7_q4_a", d:+10, e:+6, r:"Usulan itu dicatat dalam risalah. Kini tidak ada yang bisa menghapusnya."},
        {t:"Saya hanya ingin semua pihak merenungkan apa yang terjadi.", vo:"b7_q4_b", d:-6, safe:true, r:"Permintaan yang tidak meminta apa pun. Sidang bergerak ke agenda berikutnya."},
        {t:"Tangkap Pak Darsono hari ini juga!", vo:"b7_q4_c", d:+2, e:+15, r:"Teriakan itu disambut sorakan, tetapi dewan tidak punya wewenang untuk menangkap siapa pun."}
      ],
      sulit:[
        {t:"Bentuk panitia khusus yang terbuka, dan biarkan publik ikut mengawasi.", vo:"b7_q4_sa", d:+10, e:+6, r:"Usulan itu dicatat dalam risalah. Kini tidak ada yang bisa menghapusnya."},
        {t:"Saya menyerahkan berkas ini kepada pimpinan untuk ditindaklanjuti.", vo:"b7_q4_sb", d:-2, safe:true, r:"Berkas itu diterima, lalu disimpan di laci pimpinan."},
        {t:"Hentikan pembahasan revisi undang-undang sampai semua kasus ini tuntas.", vo:"b7_q4_sc", d:+4, e:+8, r:"Permintaan yang berani. Kursi koalisi langsung berbisik-bisik."}
      ],
      extra:[
        {need:"satelit", t:"Saya minta panitia khusus, mulai dari citra satelit kebakaran di konsesi PT Cakrawala Sawit Sendaru.", vo:"b7_q4_x", d:+12, e:+6, r:"Citra satelit itu diproyeksikan ke layar sidang. Tidak ada yang bersorak."}
      ]}
  ];
}
function bab7Pers(){
  return { q:"Mosi pemakzulan baru saja diajukan. Apa jawaban {P}?", vo:"b7_q5", who:"Nadia · Wartawan", node:"nadiaS", folder:"nadia",
    opts:[
      {t:"Silakan copot kursi saya. Apa yang sudah terbuka tidak bisa ditutup lagi.", vo:"b7_q5_a", d:+10, r:"Nadia menurunkan kameranya. \"Itu akan menjadi judul besok pagi.\""},
      {t:"Saya akan mengikuti semua prosedur yang berlaku.", vo:"b7_q5_b", d:-2, safe:true, r:"Jawaban yang aman. Terlalu aman untuk malam seperti ini."},
      {t:"Saya tidak akan pergi. Saya lawan sampai akhir!", vo:"b7_q5_c", d:+4, e:+5, r:"Semangatmu menular ke para wartawan, tetapi juga ke lawan-lawanmu."}
    ],
    sulit:[
      {t:"Kursi ini bisa diambil kapan saja. Bukti-bukti itu sudah telanjur dibaca publik.", vo:"b7_q5_sa", d:+10, r:"Nadia menurunkan kameranya. \"Itu akan menjadi judul besok pagi.\""},
      {t:"Saya menghormati proses dan akan membela diri sesuai aturan.", vo:"b7_q5_sb", d:0, safe:true, r:"Jawaban yang dewasa, meski publik ingin mendengar lebih."},
      {t:"Kalau saya dicopot, rakyat yang akan turun ke jalan.", vo:"b7_q5_sc", d:+2, e:+8, r:"Kalimat itu dipotong dan disebut sebagai ancaman menghasut massa."}
    ]};
}
async function bab7(){
  chapterStart(7, "Sidang Terbuka", "sidang", "", "sidang");
  await card({ vo:"bab7_buka", voFrom:2, mark:7, btn:"Masuk ke Ruang Sidang", parts:[
    {tag:"h2", text:"Bab 7"}, {tag:"h1", text:"Sidang Terbuka"},
    {tag:"p", cls:"story", text:"Rapat paripurna. Semua bukti yang kamu kumpulkan ada di dalam satu map: tanggul, bantuan sosial, impor beras, kebakaran lahan, dan pagar laut. Hari ini kamu membacanya di depan seluruh dewan."}],
    after: brief("Forum Baru", "Sidang Dewan", "Kalimatnya panjang dan setiap kata dicatat dalam risalah. Anggota dewan lain akan bersorak dan memotong. Bukti yang kamu kumpulkan membuka jawaban terkuat.",
      ["Kalimat lebih panjang", `Bukti terkumpul: ${S.ev.size}`, S.relaxed ? "Tanpa batas waktu" : "Disela jika terlambat"]) });
  gavel(3);
  await say("Ketua Sidang", "Rapat paripurna dibuka. Saudara anggota yang mengajukan interupsi, silakan menyampaikan pandangan.", $("ketua"), {vo:"b7_ketua0", folder:"ketua"});
  S.rec = true;
  const F = {...FORUMS.sidang, who:"Ketua Sidang", node:"ketua", folder:"ketua", hero:"heroS", prompt:"Sampaikan di depan sidang",
    timeout:{who:"Anggota Koalisi", node:"anggota", folder:"anggota", vo:"b7_potong", text:"Interupsi, Ketua! Waktunya sudah habis!",
      line:"Sorakan dari kursi koalisi menenggelamkan suaramu.", d:-8}};
  const data = bab7Data();
  await runForum(data.slice(0, 1), F);
  await say("Anggota Koalisi", "Interupsi, Ketua! Saudara ini hanya mencari panggung!", $("anggota"), {vo:"b7_anggota1", folder:"anggota"});
  await runForum(data.slice(1), F);
  // how many members dare to stand with the player
  S.allies = Math.max(0, Math.min(48, 2 + S.ev.size * 5 + Math.floor(S.trust / 10) - S.promises.length * 2));
  standUp(S.allies);
  const tier = S.allies >= 25 ? "banyak" : S.allies >= 10 ? "sedang" : "sedikit";
  const lines = {
    banyak:"Satu per satu, anggota dewan berdiri. Hampir separuh ruangan kini berdiri bersamamu.",
    sedang:"Belasan anggota dewan berdiri bersamamu. Tidak banyak, tetapi cukup untuk didengar.",
    sedikit:"Hanya beberapa anggota dewan yang berani berdiri. Sisanya menunduk ke ponsel mereka."
  };
  await say("Narator", lines[tier], null, {vo:`b7_n_${tier}`});
  await wait(600);
  gavel(2);
  await say("Ketua Sidang", "Pimpinan menerima mosi dari fraksi koalisi: pemakzulan terhadap Saudara atas tuduhan merekayasa bukti. Rapat diskors.", $("ketua"), {vo:"b7_ketua_mosi", folder:"ketua"});
  await runForum([bab7Pers()], {...F, timeout:undefined});
  await chapterEnd(7, {
    tinggi:["Bukti Dibacakan, Wakil Rakyat Muda Justru Dimakzulkan", "Publik marah. Malam ini, ribuan orang berkumpul di depan gedung dewan."],
    sedang:["Mosi Pemakzulan Diajukan, Publik Terbelah", "Sebagian percaya pada buktimu, sebagian lagi pada tuduhan rekayasa."],
    rendah:["Dituduh Merekayasa Bukti, Wakil Rakyat Muda Terpojok", "Hanya sedikit yang membelamu. Besok pagi, surat penangkapan akan terbit."]
  }, "Suara Terakhir");
}

// ---------------------------------------------------------------------
// BAB 8: SUARA TERAKHIR (semua forum dalam satu siaran)
// ---------------------------------------------------------------------
const B8_PIDATO = [
  {t:"Malam ini saya bicara sebagai warga biasa, bukan sebagai anggota dewan.", vo:"b8_pidato_1"},
  {t:"Semua bukti yang saya pegang sudah saya buka ke publik.", vo:"b8_pidato_2"},
  {t:"Kalau besok saya ditangkap, ingat: suara kalian tidak bisa ikut ditangkap.", vo:"b8_pidato_3"}
];
function bab8Sosmed(){
  return [
    { who:"@mahasiswa.sendaru", q:"Kami sudah di depan gedung dewan. Apa yang harus kami lakukan malam ini?", vo:"b8_q1",
      opts:[
        {t:"Tetap damai, jangan mau dipancing. Rekam semua yang terjadi.", vo:"b8_q1_a", d:+10, r:"Pesan itu dibacakan lewat pengeras suara di depan gedung dewan."},
        {t:"Pulanglah, ini terlalu berbahaya untuk kalian.", vo:"b8_q1_b", d:-4, safe:true, r:"Para mahasiswa merasa ditinggalkan oleh orang yang mereka bela."},
        {t:"Duduki gedung itu sampai mereka mendengar kita!", vo:"b8_q1_c", d:-2, e:+10, r:"Seruan itu dipakai untuk menuduhmu menghasut kerusuhan."}
      ],
      sulit:[
        {t:"Saling jaga, tetap damai. Kalau ada yang memancing, jangan diladeni.", vo:"b8_q1_sa", d:+10, r:"Pesan itu dibacakan lewat pengeras suara di depan gedung dewan."},
        {t:"Kalian berhak bersuara. Asal tetap selamat, dan pulang sebelum terlalu malam.", vo:"b8_q1_sb", d:+4, r:"Pesan yang peduli. Sebagian mahasiswa pulang, sebagian bertahan."},
        {t:"Bertahanlah di sana sampai tuntutan kita dipenuhi.", vo:"b8_q1_sc", d:+2, e:+8, r:"Mereka bertahan. Malam makin panjang, dan aparat makin banyak."}
      ]},
    { who:"@akun_tanpa_nama", hot:true, q:"Siaran ini rekayasa! Dia hanya ingin terlihat seperti pahlawan sebelum ditangkap.", vo:"b8_q2",
      opts:[
        {t:"Semua bukti saya terbuka. Silakan periksa, nilai sendiri.", vo:"b8_q2_a", d:+8, r:"Tautan ke semua dokumen dibagikan ribuan kali dalam lima menit."},
        {t:"Abaikan saja akun-akun seperti itu.", vo:"b8_q2_b", d:-2, r:"Diabaikan, akun itu justru makin ramai."},
        {t:"Akun palsu seperti kamu dibayar berapa?", vo:"b8_q2_c", d:-4, r:"Balasan itu dijadikan tangkapan layar dengan judul: emosi di siaran terakhir."}
      ],
      sulit:[
        {t:"Saya tidak minta dipercaya, saya minta semua bukti itu dibaca.", vo:"b8_q2_sa", d:+8, r:"Tautan ke semua dokumen dibagikan ribuan kali dalam lima menit."},
        {t:"Setiap orang bebas berpendapat, termasuk yang tidak setuju dengan saya.", vo:"b8_q2_sb", d:+4, r:"Tenang dan dewasa. Akun itu kehabisan bahan."},
        {t:"Kita lihat saja siapa yang benar setelah semua ini selesai.", vo:"b8_q2_sc", d:0, safe:true, r:"Terdengar pasrah untuk sebuah siaran terakhir."}
      ]}
  ];
}
// a caller reminds the player of an old promise
function tagihItem(id){
  return { who:"Penelepon", folder:"warga", node:null, promiseId:id, q:TAGIH[id], vo:`b8_tagih_${id}`, prompt:"Jawab penelepon",
    opts:[
      {t:"Saya belum menepatinya. Maaf, waktu itu saya berjanji tanpa hitungan.", vo:"b8_tagih_a", d:-2, admit:true, r:`Penelepon terdiam sejenak. "Setidaknya {P} jujur."`},
      {t:"Semua butuh proses. Situasinya tidak semudah itu.", vo:"b8_tagih_b", d:-6, safe:true, r:"Penelepon menutup telepon. Kolom komentar dipenuhi satu kata: pembohong."},
      {t:"Janji itu tetap berlaku, tunggu saja sebentar lagi.", vo:"b8_tagih_c", d:-4, r:"Janji itu dicatat lagi, dan rakyat akan kembali menagih."}
    ],
    sulit:[
      {t:"Belum saya tepati. Saya tidak mau cari-cari alasan.", vo:"b8_tagih_sa", d:-2, admit:true, r:`Penelepon terdiam sejenak. "Setidaknya {P} jujur."`},
      {t:"Saya sudah berusaha, tetapi banyak pihak yang menghalangi.", vo:"b8_tagih_sb", d:-4, safe:true, r:"Alasan yang mungkin benar, tetapi terdengar seperti alasan."},
      {t:"Beri saya waktu satu tahun lagi untuk menepatinya.", vo:"b8_tagih_sc", d:-3, r:"Satu tahun lagi, dari orang yang besok akan ditangkap."}
    ]};
}
const B8_TERIMA_KASIH = { who:"Penelepon", folder:"warga", node:null, prompt:"Jawab penelepon",
  q:"Saya ibu yang dulu berdiri di tepi sungai. Minggu lalu, tanggul kami mulai dibangun. Terima kasih sudah tidak berbohong kepada kami.", vo:"b8_terima_kasih",
  opts:[
    {t:"Terima kasih sudah percaya. Tanggul itu punya kalian, bukan punya saya.", vo:"b8_tk_a", d:+6, r:"Di studio, Nadia mengusap matanya diam-diam."},
    {t:"Itu memang tugas saya sebagai wakil kalian.", vo:"b8_tk_b", d:+4, r:"Sederhana dan rendah hati."},
    {t:"Jangan lupakan nama saya pada pemilu nanti.", vo:"b8_tk_c", d:-6, r:"Ibu itu terdiam. Ia menelepon untuk berterima kasih, bukan untuk berkampanye."}
  ],
  sulit:[
    {t:"Tanggul itu berdiri karena kalian berani bersuara. Bukan karena saya.", vo:"b8_tk_sa", d:+6, r:"Di studio, Nadia mengusap matanya diam-diam."},
    {t:"Senang sekali mendengarnya. Semoga tanggulnya cepat selesai.", vo:"b8_tk_sb", d:+4, r:"Hangat dan tulus."},
    {t:"Itu baru awal, nanti akan ada tanggul di setiap sungai.", vo:"b8_tk_sc", d:+1, r:"Ibu itu tersenyum, tetapi kamu baru saja berjanji lagi."}
  ]};
function darsonoTawar(){
  return { who:"Pak Darsono", folder:"darsono", node:null, prompt:"Jawab Pak Darsono", q:"Jawab sekarang, di depan semua orang. Kamu terima atau tidak?", vo:"b8_darsono_tanya",
    opts:[
      {t:"Baik, Pak, siaran ini saya tutup sekarang.", vo:"b8_dt_a", d:0, sold:true, r:"Nadia menatapmu tidak percaya. Lampu studio padam."},
      {t:"Kursi itu tidak bisa membeli suara saya.", vo:"b8_dt_b", d:+10, e:+10, r:"Jutaan orang mendengar penolakanmu secara langsung."},
      {t:"Saya akan memikirkannya setelah siaran ini selesai.", vo:"b8_dt_c", d:-10, r:"Jutaan penonton mendengar keraguanmu."}
    ],
    sulit:[
      {t:"Tawaran Bapak saya tolak di depan seluruh Sendaru.", vo:"b8_dt_sa", d:+10, e:+10, r:"Jutaan orang mendengar penolakanmu secara langsung."},
      {t:"Saya butuh waktu untuk memikirkannya, Pak.", vo:"b8_dt_sb", d:-10, r:"Jutaan penonton mendengar keraguanmu."},
      {t:"Baik, Pak, saya tutup siarannya sekarang.", vo:"b8_dt_sc", d:0, sold:true, r:"Nadia menatapmu tidak percaya. Lampu studio padam."}
    ]};
}
function darsonoAncam(){
  return { who:"Pak Darsono", folder:"darsono", node:null, prompt:"Jawab Pak Darsono", q:"Masih ada waktu untuk diam. Apa jawabanmu?", vo:"b8_darsono_tanya2",
    opts:[
      {t:"Kalau saya hilang, jutaan orang yang akan meneruskan suara ini.", vo:"b8_da_a", d:+10, e:+10, r:"Telepon terputus. Di luar studio, sorakan terdengar sampai ke dalam."},
      {t:"Saya tidak takut pada Bapak.", vo:"b8_da_b", d:+4, e:+5, r:"Berani, meski suaramu sedikit bergetar."},
      {t:"Baiklah, saya akan berhenti bicara.", vo:"b8_da_c", d:-15, safe:true, r:"Nadia menatapmu tidak percaya. Ribuan orang di luar terdiam."}
    ],
    sulit:[
      {t:"Bapak benar, suara yang keras cepat hilang. Suara orang banyak tidak.", vo:"b8_da_sa", d:+10, e:+10, r:"Telepon terputus. Di luar studio, sorakan terdengar sampai ke dalam."},
      {t:"Silakan tangkap saya, Pak. Bukti-bukti itu tidak ikut tertangkap.", vo:"b8_da_sb", d:+8, e:+10, r:"Telepon terputus tanpa jawaban."},
      {t:"Saya hanya ingin semua ini berakhir dengan damai.", vo:"b8_da_sc", d:-4, safe:true, r:"Kalimat yang lembut, tetapi terdengar seperti menyerah."}
    ]};
}
const B8_PENUTUP = { who:"Nadia · Wartawan", node:"nadiaSi", folder:"nadia", prompt:"Kalimat terakhirmu", q:"Satu menit lagi. Ucapkan kalimat terakhirmu.", vo:"b8_nadia_akhir",
  opts:[
    {t:"Jangan berhenti bersuara. Negeri ini punya kita semua.", vo:"b8_akhir_a", d:+10, r:"Lampu merah kamera padam. Di luar, ribuan orang mengulang kalimatmu."},
    {t:"Terima kasih, dan maafkan saya kalau ada salah.", vo:"b8_akhir_b", d:0, r:"Kalimat perpisahan yang sederhana."},
    {t:"Ingat nama saya, karena sayalah satu-satunya yang jujur.", vo:"b8_akhir_c", d:-6, r:"Kalimat itu terdengar lebih seperti kesombongan daripada perpisahan."}
  ],
  sulit:[
    {t:"Mungkin ini suara terakhir saya malam ini. Suara kalian baru mulai.", vo:"b8_akhir_sa", d:+10, r:"Lampu merah kamera padam. Di luar, ribuan orang mengulang kalimatmu."},
    {t:"Saya pamit. Negeri ini saya titipkan ke kalian.", vo:"b8_akhir_sb", d:+5, r:"Perpisahan yang hangat. Banyak yang menangis di depan layar."},
    {t:"Jangan percaya siapa pun, termasuk saya, kecuali pada bukti.", vo:"b8_akhir_sc", d:+6, r:"Pesan yang aneh untuk sebuah perpisahan, tetapi para mahasiswa menuliskannya di spanduk."}
  ]};
async function bab8(){
  chapterStart(8, "Suara Terakhir", "siaran", "", "siaran");
  await card({ vo:"bab8_buka", voFrom:2, mark:8, btn:"Nyalakan Kamera", parts:[
    {tag:"h2", text:"Bab 8"}, {tag:"h1", text:"Suara Terakhir"},
    {tag:"p", cls:"story", text:"Surat penangkapanmu terbit besok pagi. Malam ini, Nadia berhasil mendapatkan satu siaran langsung nasional. Di luar, ribuan orang menunggu suaramu."}],
    after: brief("Bab Terakhir", "Siaran Langsung Nasional", "Semua forum bercampur dalam satu malam: pidato, kolom komentar, telepon warga, dan satu panggilan yang tidak kamu duga. Janji-janji lamamu akan ditagih.",
      ["Pidato harus tepat", "Janji akan ditagih", "Setiap kata menentukan akhir cerita"]) });
  await say("Nadia · Wartawan", "Kamera menyala dalam tiga, dua, satu. Sendaru mendengarkanmu.", $("nadiaSi"), {vo:"b8_nadia0", folder:"nadia"});
  S.rec = true;
  await speech(B8_PIDATO, "heroSi", "Pidato pembuka siaran");
  // social media explodes
  $("scene").classList.add("feedOn");
  await say("Narator", "Kolom komentar siaran meledak. Ratusan ribu orang menonton bersamaan.", null, {vo:"b8_n1"});
  const F = {...FORUMS.siaran, who:"Warganet", folder:"warga", hero:"heroSi", prompt:"Balas komentar ini"};
  await runForum(bab8Sosmed(), {...F, feed:true});
  $("scene").classList.remove("feedOn");
  // callers: old promises come back
  await say("Narator", "Telepon studio dibuka untuk warga.", null, {vo:"b8_n2"});
  if (S.promises.length) await runForum(S.promises.slice(0, 3).map(tagihItem), F);
  else await runForum([B8_TERIMA_KASIH], F);
  // the call nobody expected
  await say("Narator", "Telepon studio berdering sekali lagi. Nomor yang muncul di layar membuat Nadia pucat.", null, {vo:"b8_n3"});
  if (S.safe >= SAFE_OFFER){
    await say("Pak Darsono", "Nak, kamu ternyata orang yang bisa diajak bicara. Kursi wakil menteri masih kosong. Tutup siaran ini, dan semua tuduhan akan hilang.", null, {vo:"b8_darsono_tawar", folder:"darsono"});
    await runForum([darsonoTawar()], F);
  } else {
    await say("Pak Darsono", "Nak, saya sudah mengingatkanmu sejak hari pertama. Yang bersuara paling keras biasanya paling cepat hilang.", null, {vo:"b8_darsono_ancam", folder:"darsono"});
    await runForum([darsonoAncam()], F);
  }
  if (S.sold){
    await say("Narator", "Siaran terputus. Layar di seluruh Sendaru berubah hitam.", null, {vo:"b8_n_putus"});
    S.done.add(8);
    return;
  }
  await runForum([B8_PENUTUP], F);
  S.rec = false;
  S.done.add(8);
}

// ---------------------------------------------------------------------
// BAB 9: KURSI KEDUA (hanya terbuka di jalur "Fajar Sendaru")
// Wakil presiden mundur dan pemain diuji sebagai calon pengganti. Jawaban lunak (flag lunak_*)
// memuluskan jalan, tetapi dua atau lebih membuat kursi itu kosong makna (akhir "Ban Serep").
// ---------------------------------------------------------------------
function bab9Data(){
  return [
    { q:"Petisi dua juta warga mengusulkan nama Saudara sebagai wakil presiden. Mengapa Saudara merasa pantas?", vo:"b9_q1",
      opts:[
        {t:"Saya tidak merasa pantas. Saya hanya tahu kursi itu tidak boleh kembali ke Meja Bundar.", vo:"b9_q1_a", d:+8, e:+4, r:"Balkon pengunjung bertepuk tangan. Ketua mengetuk palu meminta tenang."},
        {t:"Karena rakyat yang meminta, dan saya tidak pernah menolak permintaan rakyat.", vo:"b9_q1_b", d:+1, r:"Kalimat itu terdengar seperti baliho kampanye."},
        {t:"Pantas atau tidak, biarlah dewan yang terhormat yang menilai.", vo:"b9_q1_c", d:-3, safe:true, r:"Kursi koalisi mengangguk puas. Kamu baru saja menyerahkan penilaian kepada mereka."}
      ],
      sulit:[
        {t:"Pantas itu urusan nanti. Yang jelas, kursi itu tidak boleh kembali ke Meja Bundar.", vo:"b9_q1_sa", d:+8, e:+4, r:"Balkon pengunjung bertepuk tangan. Ketua mengetuk palu meminta tenang."},
        {t:"Dua juta tanda tangan itu amanat, dan amanat tidak boleh saya tolak.", vo:"b9_q1_sb", d:+2, r:"Terdengar mulia, tetapi juga terdengar seperti orang yang sudah menginginkan kursinya."},
        {t:"Saya menyerahkan penilaian itu sepenuhnya kepada kebijaksanaan dewan.", vo:"b9_q1_sc", d:-3, safe:true, r:"Kursi koalisi mengangguk puas. Kamu baru saja menyerahkan penilaian kepada mereka."}
      ]},
    { who:"Anggota Koalisi", node:"anggota", folder:"anggota", q:"Fraksi kami siap mendukung Saudara. Syaratnya satu: panitia khusus Meja Bundar dihentikan demi stabilitas.", vo:"b9_q2",
      opts:[
        {t:"Panitia khusus tetap berjalan. Dukungan yang bersyarat bukan dukungan, itu harga.", vo:"b9_q2_a", d:+10, e:+8, r:"Anggota koalisi itu duduk kembali tanpa berkata apa-apa."},
        {t:"Kita bisa menunda panitia khusus sampai suasana lebih tenang.", vo:"b9_q2_b", d:-8, safe:true, flag:"lunak_pansus", r:"Kursi koalisi bertepuk tangan. Di luar gedung, sorakan warga berhenti."},
        {t:"Kalian takut karena nama kalian sendiri ada di berkas itu!", vo:"b9_q2_c", d:+2, e:+12, r:"Ruang sidang ricuh. Tuduhan itu mungkin benar, tetapi kamu belum membuktikannya."}
      ],
      sulit:[
        {t:"Panitia khusus tidak saya tukar dengan suara mana pun, termasuk suara fraksi Saudara.", vo:"b9_q2_sa", d:+10, e:+8, r:"Anggota koalisi itu duduk kembali tanpa berkata apa-apa."},
        {t:"Stabilitas memang penting. Jadwal panitia khusus bisa kita atur ulang bersama.", vo:"b9_q2_sb", d:-8, safe:true, flag:"lunak_pansus", r:"Kursi koalisi bertepuk tangan. Di luar gedung, sorakan warga berhenti."},
        {t:"Panitia khusus bukan milik saya. Tanyakan kepada warga yang menunggu hasilnya.", vo:"b9_q2_sc", d:+6, e:+4, r:"Jawaban yang cerdik. Koalisi tidak mendapat janji apa pun darimu."}
      ]},
    { who:"Bram Satria", node:null, folder:"bram", q:"Saya juga calon. Saya menjanjikan tunjangan tunai untuk setiap keluarga, mulai bulan depan. Apa janji Saudara?", vo:"b9_q3",
      opts:[
        {t:"Saya tidak menjanjikan angka. Saya menjanjikan anggaran yang bisa dibaca siapa saja.", vo:"b9_q3_a", d:+8, r:"Tidak ada sorakan, tetapi para wartawan mencatat kalimat itu utuh."},
        {t:"Saya juga akan memberi tunjangan, lebih besar daripada tawaran Saudara Bram.", vo:"b9_q3_b", d:-6, flag:"lunak_janji", r:"Bram tersenyum lebar. Kamu baru saja ikut dalam lelangnya."},
        {t:"Janji Saudara Bram tidak pernah punya hitungan, dan semua orang tahu itu.", vo:"b9_q3_c", d:+2, e:+4, r:"Pendukung Bram di balkon bersorak mengejek."}
      ],
      sulit:[
        {t:"Janji saya satu: setiap rupiah anggaran bisa diperiksa warga dari ponsel mereka.", vo:"b9_q3_sa", d:+8, r:"Tidak ada sorakan, tetapi para wartawan mencatat kalimat itu utuh."},
        {t:"Tunjangan itu gagasan bagus. Saya akan menambah jumlahnya kalau terpilih.", vo:"b9_q3_sb", d:-6, flag:"lunak_janji", r:"Bram tersenyum lebar. Kamu baru saja ikut dalam lelangnya."},
        {t:"Saya tidak akan berjanji apa pun hari ini, supaya tidak ada yang perlu ditagih.", vo:"b9_q3_sc", d:-2, safe:true, r:"Aman, tetapi warga datang untuk mendengar rencana, bukan kehati-hatian."}
      ]},
    { q:"Pimpinan membacakan pesan dari Istana: wakil presiden tidak berpidato tanpa naskah yang disetujui Presiden. Saudara bersedia?", vo:"b9_q4",
      opts:[
        {t:"Saya setia pada jabatan itu, tetapi naskah saya tetap saya tulis sendiri.", vo:"b9_q4_a", d:+8, e:+6, r:"Utusan Istana di balkon menutup mapnya dan keluar ruangan."},
        {t:"Tentu, saya akan mengikuti arahan Presiden sepenuhnya.", vo:"b9_q4_b", d:-8, safe:true, flag:"lunak_naskah", r:"Utusan Istana tersenyum. Nadia berhenti mencatat."},
        {t:"Kalau begitu, Presiden mencari pengeras suara, bukan wakil.", vo:"b9_q4_c", d:+4, e:+10, r:"Balkon tertawa. Di Istana, kalimat itu tidak dianggap lucu."}
      ],
      sulit:[
        {t:"Saya akan menghormati Presiden, dan tetap menulis sendiri apa yang saya ucapkan.", vo:"b9_q4_sa", d:+8, e:+6, r:"Utusan Istana di balkon menutup mapnya dan keluar ruangan."},
        {t:"Naskah dari Istana tentu saya terima sebagai bagian dari kerja sama.", vo:"b9_q4_sb", d:-8, safe:true, flag:"lunak_naskah", r:"Utusan Istana tersenyum. Nadia berhenti mencatat."},
        {t:"Saya bersedia berkonsultasi, selama yang saya ucapkan tetap bisa saya pertanggungjawabkan.", vo:"b9_q4_sc", d:+4, e:+2, r:"Jawaban tengah. Istana tidak senang, tetapi juga tidak punya alasan untuk marah."}
      ]},
    { who:"Nadia · Wartawan", node:"nadiaS", folder:"nadia", q:"Tiga bulan lalu, {P} berkata bahwa suara tidak bisa dibeli dengan kursi. Apa bedanya dengan kursi yang ini?", vo:"b9_q5",
      opts:[
        {t:"Yang ini ditawarkan warga. Kalau saya berubah, tagih saya seperti kalian menagih janji.", vo:"b9_q5_a", d:+8, r:"Nadia mengangguk. \"Kami akan menagihnya.\""},
        {t:"Mungkin tidak ada bedanya. Karena itu, saya butuh kalian tetap mengawasi.", vo:"b9_q5_b", d:+6, r:"Jawaban yang jujur. Tidak semua orang suka mendengarnya."},
        {t:"Itu pertanyaan yang tidak pantas untuk hari sepenting ini.", vo:"b9_q5_c", d:-8, safe:true, flag:"lunak_pers", r:"Nadia menurunkan pengeras suaranya. Dulu kamu tidak pernah menolak pertanyaannya."}
      ],
      sulit:[
        {t:"Kursi ini datang dari petisi warga. Kalau saya berubah, kalian tahu cara menagihnya.", vo:"b9_q5_sa", d:+8, r:"Nadia mengangguk. \"Kami akan menagihnya.\""},
        {t:"Saya belum tahu bedanya. Awasi saya, dan jangan percaya begitu saja.", vo:"b9_q5_sb", d:+6, r:"Jawaban yang jujur. Tidak semua orang suka mendengarnya."},
        {t:"Pertanyaan itu sebaiknya diajukan setelah pemungutan suara selesai.", vo:"b9_q5_sc", d:-8, safe:true, flag:"lunak_pers", r:"Nadia menurunkan pengeras suaranya. Dulu kamu tidak pernah menolak pertanyaannya."}
      ]}
  ];
}
function bab9Putusan(){
  return { q:"Dewan siap memungut suara. Saudara menerima pencalonan ini atau tidak?", vo:"b9_q6", prompt:"Keputusanmu",
    opts:[
      {t:"Saya terima, dan saya akan tetap bersuara dari dalam.", vo:"b9_q6_a", d:+4, flag:"vp_terima", r:"Ketua mengetuk palu. Pemungutan suara dimulai."},
      {t:"Saya menolak. Suara saya lebih berguna di luar pagar Istana.", vo:"b9_q6_b", d:+6, flag:"vp_tolak", r:"Ruang sidang terdiam, lalu balkon pengunjung berdiri dan bertepuk tangan."},
      {t:"Saya terima apa pun keputusan dewan yang terhormat.", vo:"b9_q6_c", d:-4, safe:true, flag:"vp_pasrah", r:"Ketua mengetuk palu. Kursi koalisi saling melempar senyum."}
    ],
    sulit:[
      {t:"Saya terima pencalonan ini. Map bukti itu ikut saya bawa ke Istana.", vo:"b9_q6_sa", d:+4, flag:"vp_terima", r:"Ketua mengetuk palu. Pemungutan suara dimulai."},
      {t:"Saya tidak menerimanya. Saya lebih berguna sebagai orang yang menagih.", vo:"b9_q6_sb", d:+6, flag:"vp_tolak", r:"Ruang sidang terdiam, lalu balkon pengunjung berdiri dan bertepuk tangan."},
      {t:"Saya terima, dan saya siap menyesuaikan diri dengan arahan dewan.", vo:"b9_q6_sc", d:-4, safe:true, flag:"vp_pasrah", r:"Ketua mengetuk palu. Kursi koalisi saling melempar senyum."}
    ]};
}
async function bab9(){
  // only the best path reaches this chapter; every other path ends after the broadcast
  if (endingKey() !== "fajar") return;
  chapterStart(9, "Suara Kedua", "sidang", "", "sidang");
  $("darsonoS").style.visibility = "hidden"; // he is in custody on this path
  await card({ vo:"bab9_buka", voFrom:2, mark:9, btn:"Masuk ke Ruang Sidang", parts:[
    {tag:"h2", text:"Bab 9"}, {tag:"h1", text:"Suara Kedua"},
    {tag:"p", cls:"story", text:"Tiga bulan setelah siaran itu, surat penangkapanmu dibatalkan dan Pak Darsono ditahan. Pagi ini, Wakil Presiden Sendaru mengundurkan diri setelah namanya muncul dalam berkas Meja Bundar. Dewan harus memilih penggantinya, dan satu nama terus disebut di jalanan: namamu."}],
    after: brief("Bab Tambahan", "Uji Publik Calon Wakil Presiden", "Dewan mengujimu di depan kamera. Setiap pihak menawarkan dukungan, dan setiap dukungan punya harga. Jawaban yang lunak memuluskan jalanmu, tetapi menentukan kursi macam apa yang kamu dapat.",
      ["Kalimat lebih panjang", "Dukungan punya harga", "Keputusan terakhir di tanganmu"], false) });
  gavel(3);
  await say("Ketua Sidang", "Rapat paripurna dibuka dengan satu agenda: uji publik calon wakil presiden. Saudara calon, silakan maju.", $("ketua"), {vo:"b9_ketua0", folder:"ketua"});
  S.rec = true;
  const F = {...FORUMS.sidang, who:"Ketua Sidang", node:"ketua", folder:"ketua", hero:"heroS", prompt:"Jawab di depan sidang",
    timeout:{who:"Anggota Koalisi", node:"anggota", folder:"anggota", vo:"b9_potong", text:"Ketua, calon ini tidak punya jawaban!",
      line:"Diam terlalu lama di uji publik terdengar seperti keraguan.", d:-8}};
  const data = bab9Data();
  await runForum(data.slice(0, 2), F);
  await say("Narator", "Calon dari koalisi diberi kesempatan bertanya. Bram Satria berdiri sambil melambaikan tangan ke kamera.", null, {vo:"b9_n1"});
  await runForum(data.slice(2), F);
  await wait(400);
  gavel(2);
  await runForum([bab9Putusan()], {...F, timeout:undefined});
  S.vp = S.flags.vp_tolak ? "tolak" : "terima";
  S.rec = false;
}

// ---------------------------------------------------------------------
// AKHIR CERITA
// ---------------------------------------------------------------------
const ENDINGS = {
  kursi: { kicker:"Akhir Tersembunyi", title:"Kursi Empuk",
    p1:"Seminggu kemudian, kamu dilantik sebagai wakil menteri. Semua tuduhan menghilang, begitu juga bukti-bukti di dalam map itu. Di ruang rapat Meja Bundar, kini ada satu kursi baru dengan namamu.",
    p2:"Di tepi sungai Muara, tanggul itu tetap tidak pernah dibangun." },
  janji: { kicker:"Akhir Cerita", title:"Janji Kosong",
    p1:"Rakyat lelah menagih janji. Pada pemilu berikutnya, mereka memilih Bram Satria, yang janjinya lebih manis. Wajahnya baru, tetapi Meja Bundar tetap sama.",
    p2:"Lima tahun kemudian, harga beras tidak pernah menjadi lima ribu rupiah." },
  fajar: { kicker:"Akhir Cerita", title:"Fajar Sendaru",
    p1:"Kamu menolak kursi itu di depan seluruh dewan. Dari luar pagar Istana, kamu memimpin panitia khusus yang membongkar Meja Bundar sampai ke akarnya. Kursi wakil presiden akhirnya diisi orang yang tahu bahwa ia sedang diawasi.",
    p2:"Sepuluh tahun kemudian, tanggul di Muara berdiri kokoh, harga beras stabil, dan langit Sendaru Barat kembali biru." },
  wapres: { kicker:"Akhir Cerita", title:"Kursi Kedua",
    p1:"Dewan memilihmu dengan selisih tujuh suara. Pada hari pelantikan, kamu membawa map yang sama ke Istana dan menaruhnya di meja rapat kabinet. Panitia khusus tetap bekerja, dan kali ini berkasnya tidak bisa disimpan di laci.",
    p2:"Lima tahun kemudian, warga Muara masih meneleponmu untuk menagih. Kamu masih mengangkat teleponnya sendiri." },
  serep: { kicker:"Akhir Cerita", title:"Ban Serep",
    p1:"Dewan memilihmu hampir tanpa perlawanan. Naskah pidatomu datang dari Istana setiap pagi, dan panitia khusus ditunda sampai waktu yang tidak ditentukan. Kamu menggunting pita, membuka seminar, dan tersenyum di baliho.",
    p2:"Di ruang redaksi, Nadia mencoret namamu dari daftar narasumber." },
  martir: { kicker:"Akhir Cerita", title:"Martir",
    p1:"Pagi itu, kamu tetap ditangkap. Namun, rekaman siaran terakhirmu diputar di kampus, pasar, dan pos ronda. Rakyat melanjutkan apa yang kamu mulai.",
    p2:"Tujuh tahun kemudian, kamu dibebaskan. Di gerbang penjara, Nadia dan ribuan warga sudah menunggu." },
  tenggelam: { kicker:"Akhir Cerita", title:"Suara yang Tenggelam",
    p1:"Pagi itu, kamu ditangkap tanpa banyak yang peduli. Siaranmu ditonton, tetapi kata-katamu tidak cukup dipercaya untuk menggerakkan siapa pun.",
    p2:"Meja Bundar tetap berdiri. Namun, di sebuah ruang redaksi kecil, Nadia masih menyimpan semua buktimu." }
};
function endingKey(){
  if (S.sold) return "kursi";
  // Bab 9 was played: the decision there settles the ending
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
  $("chap").innerHTML = `<b>Akhir</b>${E.title}`;
  music(key === "fajar" || key === "martir" || key === "wapres" ? "akhir_baik" : "akhir_buruk");
  statsReset();
  // leaderboard: sent now (ALL holds the whole game), shown after the summary; index.html owns the rest
  const lb = submitScore(E.title);
  const board = lb ? `<div class="myscore"><div><div class="lbl">Skor akhir · ${LB_MODE_NAME[S.mode]}</div><div class="big">${lb.row.skor}</div>
    <p id="myScoreSt" role="status">Mencatat ke papan skor</p></div><button type="button" id="myBoardBtn">Lihat papan skor</button></div>` : "";
  const summary = `<ul class="rules end-sum"><li>Bukti: ${S.ev.size} dari ${Object.keys(EVIDENCE).length}</li><li>Janji tertunda: ${S.promises.length}</li><li>Jawaban aman: ${S.safe}</li></ul>`;
  // suggestion box; index.html sends it (see SARAN_URL)
  const saran = `<form class="saran" data-akhir="${E.title}"><label for="saranTeks">Saran dan kritik</label>
    <textarea id="saranTeks" maxlength="1000" placeholder="Apa yang kamu suka, dan apa yang perlu diperbaiki?" aria-describedby="saranInfo"></textarea>
    <div class="saran-foot"><span class="saran-status" id="saranInfo" role="status">Nama tokoh dan hasil akhirmu ikut terkirim.</span><button type="submit">Kirim</button></div></form>`;
  // the card writes its extra HTML a little later, so wait for the status line to exist
  if (lb) lb.sent.then(t => { const put = () => { const e = $("myScoreSt"); e ? e.textContent = t : setTimeout(put, 300); }; put(); });
  await card({ vo:`akhir_${key}`, voFrom:1, btn:"Main Lagi", parts:[
    {tag:"h2", text:E.kicker}, {tag:"h1", text:E.title}, {tag:"p", cls:"story", text:E.p1}, {tag:"p", cls:"story", text:E.p2}],
    after: metersHTML() + summary + board + statsHTML(ALL, "Statistik mengetik seluruh permainan") + saran });
  location.reload();
}

const CHAPTERS = [bab1, bab2, bab3, bab4, bab5, bab6, bab7, bab8, bab9];
