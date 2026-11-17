# Naskah Suara Pemain — Suara Terakhir (Prolog sampai Bab 6, ditambah satu bab tersembunyi)

Semua tokoh lain (pembawa acara, narator, wartawan, dan seterusnya) bersuara "nyinyinyi" sintetis buatan game, jadi tidak perlu direkam.
Hanya kalimat tokoh pemain yang bisa diganti rekaman. Simpan setiap rekaman sebagai `.mp3` (atau `.m4a`) dengan nama file persis seperti kolom **File**.
Selama file belum ada, pemain juga bersuara "nyinyinyi". Animasi teks yang sedang diketik otomatis menyesuaikan dengan panjang rekaman.

```
suara-terakhir/audio/vo/
  pemain_l/   ← tokoh pemain, suara laki-laki (sapaan "Bapak")
  pemain_p/   ← tokoh pemain, suara perempuan (sapaan "Ibu")
```

---

## 1. Tokoh Pemain → `audio/vo/pemain_l/` dan `audio/vo/pemain_p/`

Diputar setelah pemain mengetik kalimat lalu menekan Enter. Rekam dua versi dengan teks yang sama (laki-laki dan perempuan). Selama file belum ada, game memakai suara robot.

### Prolog

| File | Teks | Catatan |
|---|---|---|
| `sumpah_1` | Saya bersumpah akan bekerja demi rakyat. |  |
| `sumpah_2` | Saya tidak akan diam ketika ada yang salah. |  |
| `sumpah_3` | Suara rakyat adalah suara yang saya bawa ke gedung ini. |  |

### Bab 1

| File | Teks | Catatan |
|---|---|---|
| `b1_q1_a` | Anggarannya sudah cair. Saya mau cari tahu uangnya lari ke mana. |  |
| `b1_q1_b` | Hujannya memang ekstrem, ini murni faktor alam. |  |
| `b1_q1_c` | Itu urusan dinas, bukan urusan saya. |  |
| `b1_q1_sa` | Uangnya cair tiga tahun lalu, tanggulnya tidak ada. Saya akan telusuri ke mana uang itu pergi. | mode Sulit |
| `b1_q1_sb` | Semua anggaran sedang kami evaluasi supaya kejadian ini tidak terulang. | mode Sulit |
| `b1_q1_sc` | Satu bulan lagi tanggul ini berdiri, saya jamin! | mode Sulit |
| `b1_q2_a` | Rumah saya jadi posko mulai malam ini, dan saya ikut tidur di sini. |  |
| `b1_q2_b` | Nanti kami bahas di rapat minggu depan. |  |
| `b1_q2_c` | Bantuan sudah cukup, warga jangan terlalu manja. |  |
| `b1_q2_sa` | Malam ini posko saya buka, dan tiap keluarga harus dapat tempat tidur. | mode Sulit |
| `b1_q2_sb` | Dinas sosial sudah saya telepon, bantuannya sedang dikirim ke sini. | mode Sulit |
| `b1_q2_sc` | Apa pun yang terjadi, saya tidak pulang sampai air surut. | mode Sulit |
| `b1_q3_a` | Sampah itu memang masalah. Masalah yang lebih besar, tanggulnya tidak pernah dibangun. |  |
| `b1_q3_b` | Saya setuju dengan Pak Menteri. |  |
| `b1_q3_c` | Pak Menteri itu tidak tahu apa-apa. |  |
| `b1_q3_sa` | Sampah itu memang masalah. Masalah yang lebih besar, tanggulnya tidak pernah dibangun. | mode Sulit |
| `b1_q3_sb` | Pemerintah dan warga sama-sama punya andil di sini. | mode Sulit |
| `b1_q3_sc` | Silakan Pak Menteri datang ke sini dan lihat sendiri. | mode Sulit |
| `b1_q4_a` | Saya belum tahu. Yang jelas, bukti ini saya bawa ke dewan. |  |
| `b1_q4_b` | Itu kayu tumbang biasa karena hujan deras. |  |
| `b1_q4_c` | Ini pasti ulah perusahaan sawit. Besok mereka saya penjarakan! |  |
| `b1_q4_sa` | Saya belum tahu. Yang jelas, bukti ini saya bawa ke dewan. | mode Sulit |
| `b1_q4_sb` | Kelihatannya dari pembalakan liar. Kami akan selidiki. | mode Sulit |
| `b1_q4_sc` | Saya tahu siapa pemiliknya. Besok namanya saya sebut. | mode Sulit |
| `b1_q5_a` | Saya tidak akan berhenti sampai kalian punya rumah lagi. |  |
| `b1_q5_b` | Sabar, ya, semua pasti ada hikmahnya. |  |
| `b1_q5_c` | Jangan lupa pilih saya lagi pada pemilu nanti. |  |
| `b1_q5_sa` | Saya tidak akan berhenti sampai kalian punya rumah lagi. | mode Sulit |
| `b1_q5_sb` | Pemerintah akan mengganti semua rumah yang rusak. | mode Sulit |
| `b1_q5_sc` | Saya ikut berduka. Ini pasti berat sekali buat kalian. | mode Sulit |

### Bab 2

| File | Teks | Catatan |
|---|---|---|
| `b2_q1_a` | Datanya sedang saya telusuri. Hasilnya nanti saya umumkan di sini. |  |
| `b2_q1_b` | Bantuan sedang dalam proses, mohon bersabar. |  |
| `b2_q1_c` | Tanyakan saja ke kementerian, itu bukan wewenang saya. |  |
| `b2_q1_sa` | Data penyalurannya sudah saya minta. Begitu keluar, saya umumkan di sini. | mode Sulit |
| `b2_q1_sb` | Penyalurannya memang tertunda. Penyebabnya sedang kami cari. | mode Sulit |
| `b2_q1_sc` | Besok pagi semua bantuan pasti sudah sampai ke posko. | mode Sulit |
| `b2_q2_a` | Data di posko lain ceritanya. Saya minta penyalurannya diaudit. |  |
| `b2_q2_b` | Saya percaya pada pernyataan Pak Menteri. |  |
| `b2_q2_c` | Menteri Sosial berbohong dan harus mundur hari ini juga! |  |
| `b2_q2_sa` | Warga di posko ini belum terima apa-apa. Angka itu harus diaudit. | mode Sulit |
| `b2_q2_sb` | Mungkin data pusat dan daerah belum cocok. | mode Sulit |
| `b2_q2_sc` | Kalau angkanya benar, tunjukkan daftar penerimanya hari ini. | mode Sulit |
| `b3_q1_a` | Ada yang sengaja menahan pasokan supaya harga naik. Itu yang harus kita bongkar. |  |
| `b3_q1_b` | Permintaan dunia sedang tinggi, jadi ini wajar. |  |
| `b3_q1_c` | Ini gara-gara pedagang pasar yang serakah. |  |
| `b3_q1_sa` | Barangnya ada, hanya tertahan di gudang. Saya ingin tahu siapa yang menahannya. | mode Sulit |
| `b3_q1_sb` | Harga dunia sedang naik, kita kena imbasnya. | mode Sulit |
| `b3_q1_sc` | Ini kegagalan pemerintah. Saya malu ikut jadi bagiannya. | mode Sulit |
| `b3_q3_a` | Janji manis itu gampang. Rakyat berhak tahu uangnya dari mana. |  |
| `b3_q3_b` | Saya bisa memberi harga yang lebih murah lagi! |  |
| `b3_q3_c` | Bram itu pembohong, jangan percaya dia. |  |
| `b3_q3_sa` | Coba tunjukkan hitungannya. Subsidi sebesar itu pasti ada yang membayar. | mode Sulit |
| `b3_q3_sb` | Kalau bisa, bagus. Asal hitungannya masuk akal, saya dukung. | mode Sulit |
| `b3_q3_sc` | Harga empat ribu pun bisa, asal mafia impornya kita sikat. | mode Sulit |
| `b3_q4_a` | Politik memang kotor. Justru karena itu orang baik jangan menjauh. |  |
| `b3_q4_b` | Jangan terlalu dipikirkan, nikmati saja hidup kalian. |  |
| `b3_q4_c` | Pilih saya, maka politik akan bersih dalam lima tahun. |  |
| `b3_q4_sa` | Kalau orang jujur pergi, kursinya diisi orang yang tidak jujur. | mode Sulit |
| `b3_q4_sb` | Tidak apa-apa kecewa, asal tetap datang ke tempat pemungutan suara. | mode Sulit |
| `b3_q4_sc` | Beri saya lima tahun, dan saya akan membersihkan politik negeri ini. | mode Sulit |

### Bab 3

| File | Teks | Catatan |
|---|---|---|
| `b4_q3_a` | Nama perusahaannya saya serahkan ke penegak hukum, sekalian dengan datanya. |  |
| `b4_q3_b` | Saya akan menyebutnya sekarang: PT Cakrawala Sawit Sendaru. |  |
| `b4_q3_c` | Belum saatnya. Saya tidak mau sebut nama dulu. |  |
| `b4_q3_sa` | Datanya saya serahkan dulu ke penegak hukum. Setelah itu kami umumkan bersama. | mode Sulit |
| `b4_q3_sb` | Perusahaannya PT Cakrawala Sawit Sendaru, dan saya punya datanya. | mode Sulit |
| `b4_q3_sc` | Biarkan hukum yang bekerja, saya tidak mau mendahului. | mode Sulit |
| `b4_q4_a` | Warga juga harus bisa bernapas supaya bisa bekerja dan makan. |  |
| `b4_q4_b` | Benar juga, investasi memang harus kita jaga bersama. |  |
| `b4_q4_c` | Bapak dibayar berapa oleh perusahaan itu? |  |
| `b4_q4_sa` | Investasi boleh, tetapi bukan dengan membakar paru-paru anak-anak kita. | mode Sulit |
| `b4_q4_sb` | Kita cari jalan tengah, supaya investasi jalan dan hutan tetap ada. | mode Sulit |
| `b4_q4_sc` | Kalau investor itu melanggar hukum, izinnya harus dicabut hari ini. | mode Sulit |
| `b5_q1_a` | Video itu tidak benar. Saya akan buktikan pakai data. |  |
| `b5_q1_b` | Saya tidak perlu menjawab tuduhan murahan seperti ini. |  |
| `b5_q1_c` | Silakan laporkan saya, saya tidak takut! |  |
| `b5_q1_sa` | Amplop itu tidak pernah saya terima. Saya minta rekaman lengkapnya dibuka. | mode Sulit |
| `b5_q1_sb` | Ini fitnah. Saya bawa ke jalur hukum. | mode Sulit |
| `b5_q1_sc` | Kalian boleh memeriksa rekening saya kapan saja. | mode Sulit |
| `b5_q2_a` | Silakan periksa saya. Mundur karena fitnah, itu yang tidak akan saya lakukan. |  |
| `b5_q2_b` | Kalau itu keputusan partai, saya ikut saja. |  |
| `b5_q2_c` | Darsono yang seharusnya diperiksa, bukan saya! |  |
| `b5_q2_sa` | Silakan periksa. Setiap sidangnya saya datangi sendiri. | mode Sulit |
| `b5_q2_sb` | Demi kebaikan bersama, saya bersedia mundur sementara. | mode Sulit |
| `b5_q2_sc` | Pak Darsono juga harus diperiksa soal impor beras. | mode Sulit |
| `b5_q4_a` | Terima kasih sudah percaya. Uang itu tidak saya terima, nanti juga terbukti. |  |
| `b5_q4_b` | Percayalah pada saya, itu saja yang bisa saya katakan. |  |
| `b5_q4_c` | Kalau tidak percaya, silakan pilih orang lain nanti. |  |
| `b5_q4_sa` | Terima kasih masih percaya. Bukti kalau video itu palsu sedang diperiksa. | mode Sulit |
| `b5_q4_sb` | Wajar kalau Ibu ragu. Saya tidak akan memaksa. | mode Sulit |
| `b5_q4_sc` | Doakan saja, semoga semua cepat selesai. | mode Sulit |
| `b5_q5_a` | Mereka saya maafkan. Dalang videonya yang harus diusut. |  |
| `b5_q5_b` | Sudahlah, mari kita lupakan saja masalah ini. |  |
| `b5_q5_c` | Rasakan sekarang, kalian semua akan menyesal! |  |
| `b5_q5_sa` | Saya maafkan. Yang membayar video ini, itu yang harus diusut sampai tuntas. | mode Sulit |
| `b5_q5_sb` | Saya tidak dendam. Saya hanya ingin kembali bekerja untuk warga. | mode Sulit |
| `b5_q5_sc` | Para pendengung itu dibayar Meja Bundar, nanti saya buktikan. | mode Sulit |

### Bab 4

| File | Teks | Catatan |
|---|---|---|
| `b6_q1_a` | Koruptor tidak akan menunggu izin untuk menyembunyikan buktinya. |  |
| `b6_q1_b` | Mungkin ada baiknya juga, supaya penyadapan tidak disalahgunakan. |  |
| `b6_q1_c` | Revisi ini dibuat oleh para koruptor itu sendiri! |  |
| `b6_q1_sa` | Kalau menyadap harus menunggu izin, kita akan selalu terlambat satu langkah. | mode Sulit |
| `b6_q1_sb` | Dewan Pengawas itu perlu, asal tidak memperlambat penyidikan. | mode Sulit |
| `b6_q1_sc` | Siapa pun yang mendukung revisi ini sedang melindungi dirinya sendiri. | mode Sulit |
| `b6_q2_a` | Pasal yang membatasi penyadapan itu, itulah buktinya. |  |
| `b6_q2_b` | Saya memang belum punya bukti, tetapi perasaan saya mengatakan begitu. |  |
| `b6_q2_c` | Anda hanya juru bicara, jadi wajar kalau Anda membelanya. |  |
| `b6_q2_sa` | Buktinya ada di drafnya sendiri. Baca pasal soal izin penyadapan. | mode Sulit |
| `b6_q2_sb` | Dalam setahun terakhir, operasi tangkap tangan turun drastis. | mode Sulit |
| `b6_q2_sc` | Rakyat tidak bodoh. Mereka bisa baca drafnya sendiri. | mode Sulit |
| `b6_q3_a` | Mana mungkin nelayan membangun pagar 30 kilometer yang menutup jalur melaut mereka sendiri. |  |
| `b6_q3_b` | Kita tunggu hasil penyelidikan resmi saja. |  |
| `b6_q3_c` | Itu bohong besar, dan semua orang tahu itu! |  |
| `b6_q3_sa` | Nelayan justru kehilangan jalur melaut karena pagar itu. | mode Sulit |
| `b6_q3_sb` | Kalau memang swadaya, dari mana uang untuk 30 kilometer bambu? | mode Sulit |
| `b6_q3_sc` | Penyelidikan harus dibuka agar semuanya jelas. | mode Sulit |
| `b6_q3_x` | Ada 263 sertifikat untuk bidang di atas laut. Pemiliknya bukan nelayan. | bukti: sertifikat |
| `b6_q4_a` | Saya membawa suara warga yang selama ini tidak pernah didengar. |  |
| `b6_q4_b` | Hasilnya akan saya tunjukkan nanti, setelah saya terpilih lagi. |  |
| `b6_q4_c` | Lebih baik ribut daripada diam melihat rakyat dirampok. |  |
| `b6_q4_sa` | Data bantuan sosial yang selama ini disembunyikan, saya yang membukanya. | mode Sulit |
| `b6_q4_sb` | Hasilnya mungkin belum kelihatan. Saya tetap jalan terus. | mode Sulit |
| `b6_q4_sc` | Keributan ini terjadi karena ada yang terganggu oleh kebenaran. | mode Sulit |
| `b6_q4_x1` | Lihat citra satelit ini. Di situ kelihatan siapa yang membakar hutan kita. | bukti: satelit |
| `b6_q4_x2` | Nomor di kayu banjir itu cocok dengan izin tebang perusahaan sawit tadi. | bukti: kayu |
| `b6_q5_a` | Lembaga Antikorupsi itu milik rakyat. Rakyat berhak menjaganya. |  |
| `b6_q5_b` | Saya menghormati semua pendapat yang ada malam ini. |  |
| `b6_q5_c` | Jika revisi ini disahkan, saya akan mundur dari dewan! |  |
| `b6_q5_sa` | Kalau lembaga ini dilemahkan, yang bersorak para koruptor, bukan kita. | mode Sulit |
| `b6_q5_sb` | Kita kawal revisi ini sama-sama, dengan kepala dingin. | mode Sulit |
| `b6_q5_sc` | Revisi ini tidak akan lolos selama saya masih duduk di dewan. | mode Sulit |

### Bab 5

| File | Teks | Catatan |
|---|---|---|
| `b7_q1_a` | Dana tanggul cair tiga tahun lalu. Tanggulnya tidak pernah ada, dan warga yang kebanjiran. |  |
| `b7_q1_b` | Dasarnya adalah keresahan masyarakat yang saya dengar di mana-mana. |  |
| `b7_q1_c` | Semua orang di ruangan ini sudah tahu, hanya pura-pura tidak tahu. |  |
| `b7_q1_sa` | Anggarannya cair tiga tahun lalu. Di lokasi hanya ada papan proyek dan genangan air. | mode Sulit |
| `b7_q1_sb` | Keresahan warga di banyak daerah sudah cukup menjadi dasar untuk menyelidiki. | mode Sulit |
| `b7_q1_sc` | Saya serahkan semuanya kepada lembaga penegak hukum untuk menilai. | mode Sulit |
| `b7_q1_x` | Nomor di kayu banjir itu cocok dengan izin tebang perusahaan yang juga memegang proyek tanggul fiktif. | bukti: kayu |
| `b7_q2_a` | Di laporan tertulis seratus persen tersalurkan. Warga di posko yang saya datangi tidak menerima apa-apa. |  |
| `b7_q2_b` | Nanti akan saya serahkan buktinya setelah sidang ini selesai. |  |
| `b7_q2_c` | Saudara sendiri ikut menikmati uangnya, bukan? |  |
| `b7_q2_sa` | Di atas kertas, bantuan tersalurkan seratus persen. Posko-posko yang saya datangi kosong. | mode Sulit |
| `b7_q2_sb` | Buktinya sedang diverifikasi. Nanti saya serahkan ke pimpinan. | mode Sulit |
| `b7_q2_sc` | Menteri Sosial sudah dicopot, dan itu sudah menjadi bukti tersendiri. | mode Sulit |
| `b7_q2_x` | Laporan penyaluran mencatat 4.200 keluarga penerima. Kolom tanda tangannya kosong semua. | bukti: bansos |
| `b7_q3_a` | Ini bukan tuduhan, Pak. Data perizinannya terbuka, siapa saja bisa memeriksa. |  |
| `b7_q3_b` | Mohon maaf kalau saya menyinggung, saya tidak bermaksud begitu. |  |
| `b7_q3_c` | Kalau tidak bersalah, mengapa Bapak terlihat begitu gugup? |  |
| `b7_q3_sa` | Saya tidak menuduh, Pak. Saya hanya membacakan data perizinannya. | mode Sulit |
| `b7_q3_sb` | Saya menghormati Bapak, dan saya siap dikoreksi jika salah. | mode Sulit |
| `b7_q3_sc` | Biarkan penegak hukum yang menilai apakah ini fitnah atau bukan. | mode Sulit |
| `b7_q3_x` | Komisaris pemegang izin impor tunggal itu Haryo Darsono. Adik kandung Bapak sendiri. | bukti: impor |
| `b7_q4_a` | Bentuk panitia khusus untuk menyelidiki semua kasus ini secara terbuka. |  |
| `b7_q4_b` | Saya hanya ingin semua pihak merenungkan apa yang terjadi. |  |
| `b7_q4_c` | Tangkap Pak Darsono hari ini juga! |  |
| `b7_q4_sa` | Bentuk panitia khusus yang terbuka, dan biarkan publik ikut mengawasi. | mode Sulit |
| `b7_q4_sb` | Saya menyerahkan berkas ini kepada pimpinan untuk ditindaklanjuti. | mode Sulit |
| `b7_q4_sc` | Hentikan pembahasan revisi undang-undang sampai semua kasus ini tuntas. | mode Sulit |
| `b7_q4_x` | Saya minta panitia khusus, mulai dari citra satelit kebakaran di konsesi PT Cakrawala Sawit Sendaru. | bukti: satelit |
| `b7_q5_a` | Silakan copot kursi saya. Apa yang sudah terbuka tidak bisa ditutup lagi. |  |
| `b7_q5_b` | Saya akan mengikuti semua prosedur yang berlaku. |  |
| `b7_q5_c` | Saya tidak akan pergi. Saya lawan sampai akhir! |  |
| `b7_q5_sa` | Kursi ini bisa diambil kapan saja. Bukti-bukti itu sudah telanjur dibaca publik. | mode Sulit |
| `b7_q5_sb` | Saya menghormati proses dan akan membela diri sesuai aturan. | mode Sulit |
| `b7_q5_sc` | Kalau saya dicopot, rakyat yang akan turun ke jalan. | mode Sulit |

### Bab 6

| File | Teks | Catatan |
|---|---|---|
| `b8_pidato_1` | Malam ini saya bicara sebagai warga biasa, bukan sebagai anggota dewan. |  |
| `b8_pidato_2` | Semua bukti yang saya pegang sudah saya buka ke publik. |  |
| `b8_pidato_3` | Kalau besok saya ditangkap, ingat: suara kalian tidak bisa ikut ditangkap. |  |
| `b8_q1_a` | Tetap damai, jangan mau dipancing. Rekam semua yang terjadi. |  |
| `b8_q1_b` | Pulanglah, ini terlalu berbahaya untuk kalian. |  |
| `b8_q1_c` | Duduki gedung itu sampai mereka mendengar kita! |  |
| `b8_q1_sa` | Saling jaga, tetap damai. Kalau ada yang memancing, jangan diladeni. | mode Sulit |
| `b8_q1_sb` | Kalian berhak bersuara. Asal tetap selamat, dan pulang sebelum terlalu malam. | mode Sulit |
| `b8_q1_sc` | Bertahanlah di sana sampai tuntutan kita dipenuhi. | mode Sulit |
| `b8_q2_a` | Semua bukti saya terbuka. Silakan periksa, nilai sendiri. |  |
| `b8_q2_b` | Abaikan saja akun-akun seperti itu. |  |
| `b8_q2_c` | Akun palsu seperti kamu dibayar berapa? |  |
| `b8_q2_sa` | Saya tidak minta dipercaya, saya minta semua bukti itu dibaca. | mode Sulit |
| `b8_q2_sb` | Setiap orang bebas berpendapat, termasuk yang tidak setuju dengan saya. | mode Sulit |
| `b8_q2_sc` | Kita lihat saja siapa yang benar setelah semua ini selesai. | mode Sulit |
| `b8_tk_a` | Terima kasih sudah percaya. Tanggul itu punya kalian, bukan punya saya. |  |
| `b8_tk_b` | Itu memang tugas saya sebagai wakil kalian. |  |
| `b8_tk_c` | Jangan lupakan nama saya pada pemilu nanti. |  |
| `b8_tk_sa` | Tanggul itu berdiri karena kalian berani bersuara. Bukan karena saya. | mode Sulit |
| `b8_tk_sb` | Senang sekali mendengarnya. Semoga tanggulnya cepat selesai. | mode Sulit |
| `b8_tk_sc` | Itu baru awal, nanti akan ada tanggul di setiap sungai. | mode Sulit |
| `b8_da_a` | Kalau saya hilang, jutaan orang yang akan meneruskan suara ini. |  |
| `b8_da_b` | Saya tidak takut pada Bapak. |  |
| `b8_da_c` | Baiklah, saya akan berhenti bicara. |  |
| `b8_da_sa` | Bapak benar, suara yang keras cepat hilang. Suara orang banyak tidak. | mode Sulit |
| `b8_da_sb` | Silakan tangkap saya, Pak. Bukti-bukti itu tidak ikut tertangkap. | mode Sulit |
| `b8_da_sc` | Saya hanya ingin semua ini berakhir dengan damai. | mode Sulit |
| `b8_akhir_a` | Jangan berhenti bersuara. Negeri ini punya kita semua. |  |
| `b8_akhir_b` | Terima kasih, dan maafkan saya kalau ada salah. |  |
| `b8_akhir_c` | Ingat nama saya, karena sayalah satu-satunya yang jujur. |  |
| `b8_akhir_sa` | Mungkin ini suara terakhir saya malam ini. Suara kalian baru mulai. | mode Sulit |
| `b8_akhir_sb` | Saya pamit. Negeri ini saya titipkan ke kalian. | mode Sulit |
| `b8_akhir_sc` | Jangan percaya siapa pun, termasuk saya, kecuali pada bukti. | mode Sulit |
| `b8_dt_a` | Baik, Pak, siaran ini saya tutup sekarang. |  |
| `b8_dt_b` | Kursi itu tidak bisa membeli suara saya. |  |
| `b8_dt_c` | Saya akan memikirkannya setelah siaran ini selesai. |  |
| `b8_dt_sa` | Tawaran Bapak saya tolak di depan seluruh Sendaru. | mode Sulit |
| `b8_dt_sb` | Saya butuh waktu untuk memikirkannya, Pak. | mode Sulit |
| `b8_dt_sc` | Baik, Pak, saya tutup siarannya sekarang. | mode Sulit |
| `b8_tagih_a` | Saya belum menepatinya. Maaf, waktu itu saya berjanji tanpa hitungan. |  |
| `b8_tagih_b` | Semua butuh proses. Situasinya tidak semudah itu. |  |
| `b8_tagih_c` | Janji itu tetap berlaku, tunggu saja sebentar lagi. |  |
| `b8_tagih_sa` | Belum saya tepati. Saya tidak mau cari-cari alasan. | mode Sulit |
| `b8_tagih_sb` | Saya sudah berusaha, tetapi banyak pihak yang menghalangi. | mode Sulit |
| `b8_tagih_sc` | Beri saya waktu satu tahun lagi untuk menepatinya. | mode Sulit |

### Bab 7 (tersembunyi)

| File | Teks | Catatan |
|---|---|---|
| `b9_q1_a` | Saya tidak merasa pantas. Saya hanya tahu kursi itu tidak boleh kembali ke Meja Bundar. |   |
| `b9_q1_b` | Karena rakyat yang meminta, dan saya tidak pernah menolak permintaan rakyat. |   |
| `b9_q1_c` | Pantas atau tidak, biarlah dewan yang terhormat yang menilai. |   |
| `b9_q1_sa` | Pantas itu urusan nanti. Yang jelas, kursi itu tidak boleh kembali ke Meja Bundar. |  mode Sulit |
| `b9_q1_sb` | Dua juta tanda tangan itu amanat, dan amanat tidak boleh saya tolak. |  mode Sulit |
| `b9_q1_sc` | Saya menyerahkan penilaian itu sepenuhnya kepada kebijaksanaan dewan. |  mode Sulit |
| `b9_q2_a` | Panitia khusus tetap berjalan. Dukungan yang bersyarat bukan dukungan, itu harga. |   |
| `b9_q2_b` | Kita bisa menunda panitia khusus sampai suasana lebih tenang. |   |
| `b9_q2_c` | Kalian takut karena nama kalian sendiri ada di berkas itu! |   |
| `b9_q2_sa` | Panitia khusus tidak saya tukar dengan suara mana pun, termasuk suara fraksi Saudara. |  mode Sulit |
| `b9_q2_sb` | Stabilitas memang penting. Jadwal panitia khusus bisa kita atur ulang bersama. |  mode Sulit |
| `b9_q2_sc` | Panitia khusus bukan milik saya. Tanyakan kepada warga yang menunggu hasilnya. |  mode Sulit |
| `b9_q3_a` | Saya tidak menjanjikan angka. Saya menjanjikan anggaran yang bisa dibaca siapa saja. |   |
| `b9_q3_b` | Saya juga akan memberi tunjangan, lebih besar daripada tawaran Saudara Bram. |   |
| `b9_q3_c` | Janji Saudara Bram tidak pernah punya hitungan, dan semua orang tahu itu. |   |
| `b9_q3_sa` | Janji saya satu: setiap rupiah anggaran bisa diperiksa warga dari ponsel mereka. |  mode Sulit |
| `b9_q3_sb` | Tunjangan itu gagasan bagus. Saya akan menambah jumlahnya kalau terpilih. |  mode Sulit |
| `b9_q3_sc` | Saya tidak akan berjanji apa pun hari ini, supaya tidak ada yang perlu ditagih. |  mode Sulit |
| `b9_q4_a` | Saya setia pada jabatan itu, tetapi naskah saya tetap saya tulis sendiri. |   |
| `b9_q4_b` | Tentu, saya akan mengikuti arahan Presiden sepenuhnya. |   |
| `b9_q4_c` | Kalau begitu, Presiden mencari pengeras suara, bukan wakil. |   |
| `b9_q4_sa` | Saya akan menghormati Presiden, dan tetap menulis sendiri apa yang saya ucapkan. |  mode Sulit |
| `b9_q4_sb` | Naskah dari Istana tentu saya terima sebagai bagian dari kerja sama. |  mode Sulit |
| `b9_q4_sc` | Saya bersedia berkonsultasi, selama yang saya ucapkan tetap bisa saya pertanggungjawabkan. |  mode Sulit |
| `b9_q5_a` | Yang ini ditawarkan warga. Kalau saya berubah, tagih saya seperti kalian menagih janji. |   |
| `b9_q5_b` | Mungkin tidak ada bedanya. Karena itu, saya butuh kalian tetap mengawasi. |   |
| `b9_q5_c` | Itu pertanyaan yang tidak pantas untuk hari sepenting ini. |   |
| `b9_q5_sa` | Kursi ini datang dari petisi warga. Kalau saya berubah, kalian tahu cara menagihnya. |  mode Sulit |
| `b9_q5_sb` | Saya belum tahu bedanya. Awasi saya, dan jangan percaya begitu saja. |  mode Sulit |
| `b9_q5_sc` | Pertanyaan itu sebaiknya diajukan setelah pemungutan suara selesai. |  mode Sulit |
| `b9_q6_a` | Saya terima, dan saya akan tetap bersuara dari dalam. |   |
| `b9_q6_b` | Saya menolak. Suara saya lebih berguna di luar pagar Istana. |   |
| `b9_q6_c` | Saya terima apa pun keputusan dewan yang terhormat. |   |
| `b9_q6_sa` | Saya terima pencalonan ini. Map bukti itu ikut saya bawa ke Istana. |  mode Sulit |
| `b9_q6_sb` | Saya tidak menerimanya. Saya lebih berguna sebagai orang yang menagih. |  mode Sulit |
| `b9_q6_sc` | Saya terima, dan saya siap menyesuaikan diri dengan arahan dewan. |  mode Sulit |

---

## 2. Musik latar → `audio/bgm/`

Semua lagu karya Kevin MacLeod (incompetech.com), lisensi CC BY 4.0. Timpa file dengan nama yang sama untuk mengganti lagu.

| File | Judul lagu | Dipakai di |
|---|---|---|
| `judul.mp3` | Heartbreaking | Layar judul |
| `aula.mp3` | Lord of the Land | Prolog · Sumpah Jabatan |
| `banjir.mp3` | Darkling | Bab 1 · Air Naik |
| `posko.mp3` | Lightless Dawn | Bab 2 · Bantuan dan Harga (bagian awal) |
| `siniar.mp3` | Lobby Time | Bab 2 · Bantuan dan Harga (setelah pindah ke siniar) |
| `asap.mp3` | Dark Fog | Bab 3 · Asap dan Fitnah (bagian awal) |
| `fitnah.mp3` | Hiding Your Reality | Bab 3 · Asap dan Fitnah (setelah pindah ke kamar) |
| `debat.mp3` | Volatile Reaction | Bab 4 · Debat Nasional |
| `sidang.mp3` | Five Armies | Bab 5 · Sidang Terbuka dan Bab 7 (tersembunyi) |
| `siaran.mp3` | Heroic Age | Bab 6 · Suara Terakhir |
| `akhir_baik.mp3` | Inspired | Kartu akhir bab dan akhir cerita yang baik |
| `akhir_buruk.mp3` | Sad Trio | Kartu akhir bab dan akhir cerita yang buruk |
