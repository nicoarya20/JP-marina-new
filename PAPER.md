# Task Manager Kantor — Paper Riset & Arah Desain (2026)

> Dokumen riset & keputusan desain. Disusun sebelum wireframe/flow di Penpot.
> Basis: riset web ber-tanggal 2024–2026 + verifikasi rasio kontras dihitung sendiri (formula luminance WCAG).
> Status: **draft untuk diskusi**. Angka & sumber di bagian akhir.

---

## 1. Ringkasan Eksekutif

Kita membangun **task manager kantor** dengan pembeda utama: **mengutamakan aksesibilitas & kemudahan pakai** dan **berbasis AI penuh**. Pengalaman utama ada **di dalam aplikasi (in-app)**; notifikasi & interaksi tersedia lewat **beberapa kanal setara — in-app, email, dan Telegram** — dan pengguna memilih kanalnya. Prinsip pemandunya:

1. **AI mengurangi input manual, manusia tetap melihat & menyetujui** — pengguna cukup "ngobrol" (teks atau suara), AI mengisi detail; ada satu langkah konfirmasi sederhana.
2. **Aksesibilitas bukan tambahan, tapi fondasi** — target sentuh besar (48–60px), font besar (18px), kontras tinggi (kejar AAA 7:1 untuk teks penting).
3. **Estetika vintage hangat yang modern & interaktif** — palet *warm neutral + earth tone* ("Oatmeal & Espresso") sejalan tren 2026 "digital vintage / elevated neutrals", dipadu bahasa interaksi **"calm design"**: taktil, responsif, dan hidup — modern tanpa membosankan, tenang tanpa membingungkan (lihat Bag. 11).
4. **Multi-channel, in-app dulu** — antarmuka utama adalah aplikasi (PWA) dengan tombol besar + voice; notifikasi & aksi ringan bisa lewat in-app, email, atau Telegram sesuai pilihan pengguna. **Telegram salah satu kanal opsional yang menyenangkan, bukan syarat & bukan fitur utama.**
5. **AI melawan pengabaian ("mau gak mau dipakai")** — kebanyakan task manager ditinggalkan karena malas mengisi & tak ada yang mengurus. AI mengambil alih beban itu: capture nol-usaha **dipasangkan** dengan perawatan backlog otomatis, pengingat proaktif bernada hangat, dan daftar yang selalu kecil — bukan lewat paksaan, tapi lewat kehadiran yang menolong (lihat Bag. 9).
6. **AI berperan seperti project manager sekaligus sekretaris pribadi** — mengoreksi kewajaran task, mengawal perjalanannya, menandai yang janggal/molor, dan mendesak dengan lembut & bertingkat — semua sebagai tawaran ber-alasan, pengguna tetap pemutus (lihat Bag. 10).

Temuan penting yang mengubah asumsi awal: **pastel yang terlalu muda/low-contrast berbahaya** untuk keterbacaan (bisa menyatu/tertukar). Solusinya bukan membuang pastel, tapi **memakai pastel hanya untuk permukaan besar dan warna gelap pekat untuk teks/aksi** — perbedaan *lightness*, bukan hue, yang menjamin keterbacaan.

---

## 2. Visi Produk & Tujuan

**Visi:** Asisten tugas kantor yang terasa seperti "punya sekretaris pribadi yang sabar" — pengguna menyampaikan apa yang perlu dikerjakan dengan bahasa sehari-hari, dan sistem mengurus penjadwalan, pengingat, serta tindak lanjut.

**Tujuan produk:**
- **Mudah digunakan** untuk orang yang tidak tumbuh bersama teknologi: nol form rumit, alur linear, bahasa manusia.
- **Otomatis:** AI mengubah kalimat natural jadi task terstruktur (judul, tenggat, prioritas) dan menjadwalkannya.
- **Full fitur AI:** natural-language capture, voice-to-task, daily briefing, prioritisasi, ringkasan → task, pengingat proaktif.
- **Multi-channel & AI:** fungsi inti berjalan di aplikasi; notifikasi/aksi ringan dapat lewat in-app, email, atau Telegram (opsional) — pengguna memilih kanalnya, tak ada kanal wajib.
- **Visual bersih & menarik:** tema vintage hangat, tipografi besar, ruang lega.

**Non-tujuan (untuk menjaga fokus & anti over-engineering):**
- Bukan tool manajemen proyek kompleks (Gantt, dependency rumit) — itu menambah beban kognitif.
- Bukan otomatisasi total yang menyembunyikan keputusan dari pengguna.

---

## 3. Persona & Konteks Pengguna

**Persona utama — "Pak Budi / Bu Sri", 60 tahun, staf/manajer kantor.**
- Pakai smartphone untuk chat (Telegram/WhatsApp), telepon, foto. Jarang instal aplikasi baru.
- Penglihatan mulai menurun (butuh kacamata baca), kadang tremor/sendi kaku (target kecil sulit).
- Enggan mengetik panjang; nyaman dengan **pesan suara**.
- Takut "salah pencet" atau "merusak sesuatu" — butuh rasa aman, undo, konfirmasi.
- Termotivasi bila teknologi terasa **menolong**, bukan menguji.

**Konteks pemakaian:** tugas kantor harian — rapat, tenggat laporan, follow-up ke rekan, pengingat administratif. Sering sambil mengerjakan hal lain (butuh cepat & tidak menuntut fokus penuh).

**Fakta demografis pendukung:** populasi 60+ dunia ± 1,2 miliar (2024) menuju ± 1,4 miliar (2030) — kelompok tumbuh tercepat; pasar nyata dan underserved. Riset NN/g (123 partisipan 65+): pengguna 65+ **rata-rata ± 43% lebih lambat** dari usia 21–55, dan paling sering terhambat oleh teks kecil, target kecil, dan suara mengagetkan.

---

## 4. Temuan Riset (2026)

### 4.1 Aksesibilitas & Interaksi

- **Target sentuh:** WCAG 2.2 SC 2.5.8 (baru, Okt 2023, level AA) mewajibkan minimal **24×24px** — tapi ini hanya "lantai". Konsensus platform (Apple 44pt, Material 48dp, WCAG AAA 44px) + kondisi motorik (arthritis/tremor pada sebagian pengguna, error rate target kecil hingga +75%) → **aksi utama 48–60px, tombol lain ≥44px, jarak antar-target ≥8–12px**.
- **Kriteria WCAG 2.2 lain yang relevan:** 3.2.6 Consistent Help (bantuan di lokasi tetap), 3.3.7 Redundant Entry (jangan minta ketik ulang), 3.3.8 Accessible Authentication (hindari captcha/teka-teki memori), 2.4.13 Focus Appearance (fokus jelas).
- **Kepatuhan hukum:** Target Size kini wajib di bawah ADA, Section 508, dan **European Accessibility Act** (berlaku 28 Juni 2025).

### 4.2 Tipografi untuk Keterbacaan

- **Ukuran body: minimum 16px, ideal 18px.** 14px hanya batas darurat.
- **Line-height ≥ 1.5 (disarankan 1.6)**, letter/word-spacing sedikit dilonggarkan (kurangi *crowding*), panjang baris **± 60–68 karakter**.
- **Hierarki heading jelas:** mis. H1 ± 32–40px, H2 ± 24–28px.
- **Typeface aman:** sans-serif humanis, **x-height besar**, apertur terbuka, huruf saling maksimal berbeda (hindari I/l/1 dan O/0 mirip). **Hindari italic** (± 18% lebih sulit dibaca), skrip, dekoratif.
- **Kontrol perbesaran teks in-app** (A / A+ / A++) adalah rekomendasi paling konsisten lintas sumber — lebih penting daripada mengejar satu font "sempurna".
- **Catatan:** "dyslexia fonts" (OpenDyslexic) tidak terbukti unggul di uji — jangan diandalkan.

### 4.3 Sains Warna & Keterbacaan

| Perubahan fisiologis | Efek | Implikasi desain |
|---|---|---|
| Lensa menguning + pupil mengecil | Putih layar tampak kekuningan, seperti "kacamata hitam di dalam ruangan" | Jangan pakai `#FFFFFF` murni; pakai **warm off-white** |
| Jalur S-cone paling rentan | **Biru–ungu & biru–kuning sulit dibedakan** | Jangan bedakan info via biru vs ungu / biru vs kuning; merah & kuning lebih stabil |
| Contrast sensitivity turun (tajam >50) | Beda halus antar-hue "runtuh" | Jangan bedakan elemen hanya lewat pastel berdekatan; butuh separasi **lightness** kuat |
| Sensitivitas silau naik, transmisi cahaya turun | Layar terasa redup & silau menyakitkan | Hindari putih menyilaukan & kontras ekstrem hitam-putih; latar hangat teredam |
| Adaptasi terang↔gelap melambat | Sulit ikuti perubahan luminance mendadak | Jaga konsistensi tone antar-layar |
| Warna hangat di latar terang | Teks oranye/kuning (apalagi lemon) sulit dibaca | Warna hangat untuk **background/aksen**, **bukan teks** |

### 4.4 Cognitive Load & Prinsip UX

- **Satu tugas utama per layar**, alur linear, hindari menu bertingkat dalam.
- **Konsistensi mutlak** posisi tombol/ikon/bahasa — pengguna sangat bergantung pada pola yang dipelajari.
- **Ikon SELALU + label teks** (jangan ikon telanjang). Bahasa sederhana, tanpa jargon.
- **Error prevention & recovery:** konfirmasi aksi destruktif, pesan error yang menjelaskan cara memperbaiki (bukan kode), **undo** mudah.
- **Feedback jelas & langsung** untuk tiap aksi (loading, sukses, gagal).
- **Hindari gesture kompleks** (long-press, swipe tersembunyi, double-tap) — utamakan tap tunggal & tombol eksplisit.
- **Hindari timeout / auto-dismiss** notifikasi penting.
- **Onboarding bertahap berbasis contoh nyata** ("begini caranya"), bisa diulang kapan saja — riset menunjukkan instruksi observasional meningkatkan self-efficacy pengguna.

---

## 5. Analisa Pewarnaan & Palet Vintage Final

Bagian ini menjawab langsung permintaan: **palet aman & mudah dibaca namun tidak berkesan kuno.** Kunci suksesnya adalah **memisahkan peran warna berdasarkan lightness**: permukaan pakai warna muted terang, teks & aksi pakai warna gelap pekat. Dengan begitu keterbacaan dijamin oleh perbedaan terang-gelap (yang tetap terbaca dalam kondisi kontras rendah & buta warna), sementara nuansa vintage tetap terasa lewat *hue* hangat.

### 5.1 Palet Rekomendasi Utama — "Oatmeal & Espresso"

Semua rasio kontras di bawah **dihitung & diverifikasi** dengan formula luminance WCAG.

| Token | Peran | Hex | Kontras (vs) | Lulus |
|---|---|---|---|---|
| `bg-base` | Latar utama aplikasi | `#F5F1E8` | — | — |
| `surface` | Kartu / panel | `#EBE4D6` | — | — |
| `surface-raised` | Kartu terangkat (warm off-white, ganti putih murni) | `#FBF8F1` | teks utama **14.0:1** | AAA |
| `text-primary` | Teks utama & judul | `#2E2620` | vs `bg-base` **13.17:1** | AAA |
| `text-secondary` | Teks sekunder / caption | `#6B5D50` | vs `bg-base` **5.63:1** | AA |
| `border-strong` | Border input & pembatas jelas | `#6B5D50` | vs `bg-base` **5.63:1** | UI ✓ (≥3:1) |
| `accent-primary` | Isi tombol utama (teks putih) | `#9E4E2C` | white **5.87:1** | AA |
| `accent-terracotta` | Aksen dekoratif / area besar | `#B0623F` | white **4.5:1**; vs bg **3.99:1** | AA / UI |
| `focus-ring` | Cincin fokus keyboard | `#9E4E2C` | vs `bg-base` **5.2:1** | ✓ (≥3:1) |

**Cara pakai:** latar & kartu pakai nuansa oatmeal hangat → nyaman, tak menyilaukan (menghormati sensitivitas silau & lensa menguning). Teks espresso gelap → kontras AAA. Aksi utama pakai terracotta pekat + teks putih → hangat, "vintage", tetap kontras cukup.

### 5.2 Struktur Design Token — Primitif → Semantik

Palet difinalkan sebagai **dua tier token** (praktik standar, mengikuti semangat W3C Design Tokens). **Primitif** = nilai warna mentah, tak pernah dirujuk langsung oleh komponen. **Semantik** = alias berbasis peran yang menunjuk ke primitif. Konsekuensi: mengganti tema/kontras cukup menukar primitif — seluruh UI ikut tanpa menyentuh komponen.

**Tier 1 — Token Primitif (nilai mentah):**

| Token | Hex |
|---|---|
| `--oatmeal-50` | `#FBF8F1` |
| `--oatmeal-100` | `#F5F1E8` |
| `--oatmeal-200` | `#EBE4D6` |
| `--espresso-500` | `#6B5D50` |
| `--espresso-900` | `#2E2620` |
| `--terracotta-500` | `#B0623F` |
| `--terracotta-600` | `#9E4E2C` |
| `--green-soft` / `--green-ink` / `--green-solid` | `#D6E6DC` / `#1B4D3E` / `#1E6B54` |
| `--amber-soft` / `--amber-ink` / `--amber-solid` | `#F4D58A` / `#6B4A12` / `#8A5A12` |
| `--red-soft` / `--red-ink` / `--red-solid` | `#F0D2CC` / `#8A2A20` / `#A62F22` |
| `--white` | `#FFFFFF` (hanya teks di atas fill pekat; **bukan** area besar) |

**Tier 2 — Token Semantik (peran → primitif):**

| Token semantik | → Primitif | Peran |
|---|---|---|
| `color.bg.base` | `--oatmeal-100` | Latar utama aplikasi |
| `color.bg.surface` | `--oatmeal-200` | Kartu / panel |
| `color.bg.raised` | `--oatmeal-50` | Kartu terangkat (pengganti putih) |
| `color.text.primary` | `--espresso-900` | Teks utama & judul (AAA) |
| `color.text.secondary` | `--espresso-500` | Caption / teks sekunder (AA) |
| `color.text.on-accent` | `--white` | Teks di atas aksi pekat |
| `color.border.strong` | `--espresso-500` | Border input & pembatas |
| `color.accent.primary` | `--terracotta-600` | Isi tombol utama |
| `color.accent.decorative` | `--terracotta-500` | Aksen dekoratif / area besar |
| `color.focus.ring` | `--terracotta-600` | Cincin fokus keyboard |
| `color.status.success.{bg,ink,solid}` | `--green-{soft,ink,solid}` | Selesai / berhasil |
| `color.status.warning.{bg,ink,solid}` | `--amber-{soft,ink,solid}` | Perlu perhatian |
| `color.status.danger.{bg,ink,solid}` | `--red-{soft,ink,solid}` | Error / kritis |

> **Aturan token:** komponen **hanya** memakai token semantik; status selalu pasangan `bg`+`ink` (soft) atau `solid`+`on-accent` (high-visibility), tak pernah warna sendirian (lihat 5.3). Kontras tiap pasangan sudah diverifikasi WCAG di 5.1 & 5.3.

### 5.3 Warna Status (CVD-safe, dipisah lewat lightness + wajib ikon & label)

Karena sensitivitas kontras rendah & buta warna dapat menukar merah↔hijau, **warna tidak pernah berdiri sendiri** — selalu disertai **ikon + label teks**. Dua gaya disediakan:

**Gaya default — Soft Tint** (permukaan terang + teks sewarna gelap; halus, sesuai estetika vintage):

| Status | Surface | Text | Kontras | Ikon+label |
|---|---|---|---|---|
| Success | `#D6E6DC` | `#1B4D3E` | **7.44:1** (AAA) | ✓ "Selesai" |
| Warning | `#F4D58A` | `#6B4A12` | **5.64:1** (AA) | ⚠ "Perlu perhatian" |
| Error | `#F0D2CC` | `#8A2A20` | **6.08:1** (AA) | ✕ "Error" |

**Gaya high-visibility — Solid Fill** (isi pekat + teks putih; untuk keadaan kritis/aksi penting):

| Status | Fill | Text | Kontras |
|---|---|---|---|
| Success | `#1E6B54` | white | **6.39:1** |
| Warning | `#8A5A12` | white | **5.91:1** |
| Error | `#A62F22` | white | **6.88:1** |

### 5.4 Arah Palet Alternatif (bila ingin membandingkan di Penpot)

- **Arah B — "Sage & Ink":** `bg #EDE9DD`, teks `#26302A` (12.9:1 AAA), aksen deep sage `#4E7A5E` (white **4.92:1**). Nuansa hijau menenangkan.
- **Arah C — "Dusty Teal & Sand":** `bg #F1ECE1`, teks `#22312E` (~12:1), aksen deep teal `#1F6F6B` (white **5.92:1**). Teal saturasi dalam relatif tahan efek lensa menguning.

### 5.5 Aturan Warna yang Wajib Dipatuhi

1. **Jangan** `#FFFFFF` murni untuk area besar — pakai warm off-white (`#FBF8F1`/`#F5F1E8`).
2. **Jangan** pastel-di-atas-pastel untuk membedakan elemen — beri separasi lightness.
3. **Jangan** teks warna hangat pucat (kuning/oranye/lemon) di latar terang.
4. **Jangan** bedakan status hanya via warna — selalu ikon + label; uji di grayscale.
5. **Kejar AAA (7:1)** untuk teks penting/body; minimal AA (4.5:1); border/UI ≥ 3:1.

---

## 6. Sistem Tipografi & Token

### 6.1 Token Ukuran (skala pada tingkat "A" / 100%)

| Token | Elemen | Ukuran | Line-height | Bobot | Catatan |
|---|---|---|---|---|---|
| `text.body` | Body | **18px** | 1.6 | Regular/Medium | Minimum absolut 16px |
| `text.caption` | Body kecil / caption | 16px | 1.6 | Regular | Jangan < 16px |
| `text.button` | Tombol | 18–20px | 1.4 | Medium/Semibold | Target sentuh 48–60px |
| `text.h3` | Label seksi | 20–22px | 1.4 | Semibold | |
| `text.h2` | Sub-judul | 24–28px | 1.3 | Semibold | |
| `text.h1` | Judul | 32–40px | 1.2 | Bold | |

### 6.2 Token Family & Bobot

| Token | Nilai |
|---|---|
| `font.family.base` | **Atkinson Hyperlegible Next** → fallback `Lexend`, `system-ui`, sans-serif |
| `font.weight.regular` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| `font.weight.bold` | 700 |

- **Typeface:** Atkinson Hyperlegible Next (2025) — dirancang untuk low-vision, karakter maksimal terbeda, *variable* + 7 weight; pilihan paling *defensible*. Alternatif: **Lexend** (dioptimasi kecepatan baca) atau **Open Sans / Source Sans** (humanis, aman institusional).

### 6.3 Token Skala Aksesibilitas (A / A+ / A++)

Satu pengali global mengubah **seluruh** teks; ukuran efektif = ukuran token × pengali. Kontrol ini disediakan in-app.

| Token skala | Pengali | Body (18px) | H2 (26px) | H1 (36px) |
|---|---|---|---|---|
| `scale.font.a` | 1.00 (100%) | 18px | 26px | 36px |
| `scale.font.aa` | 1.15 (115%) | ~21px | ~30px | ~41px |
| `scale.font.aaa` | 1.30 (130%) | ~23px | ~34px | ~47px |

### 6.4 Token Ritme & Ukuran Baris

| Token | Nilai | Guna |
|---|---|---|
| `text.leading.tight` / `.snug` / `.normal` | 1.2 / 1.4 / 1.6 | LH judul / kontrol / body |
| `text.tracking.eyebrow` | +1.5 | Label kecil huruf-kapital pendek |
| `text.measure.max` | ~66ch | Lebar baris maksimal agar nyaman dibaca |

- **Hindari** italic, all-caps panjang, dan teks di atas gambar tanpa lapisan kontras.

---

## 7. Fitur AI

Prinsip: **AI mengurangi input manual; manusia melihat & menyetujui.** Riset adopsi teknologi (UTAUT, JMIR Aging 2025) menegaskan LLM+suara menurunkan *cognitive load*, TAPI over-automation tanpa transparansi justru membingungkan.

### 7.1 Fitur Inti (WAJIB di MVP)
- **Natural-language task capture** — "ingatkan saya kirim laporan Jumat jam 3" → task + tenggat + reminder ter-parse otomatis. **Jalur utama, tanpa form.**
- **Voice-to-task** — kirim pesan suara; AI transkripsi + parse. Krusial bagi yang enggan mengetik.
- **Konfirmasi satu langkah** — "Betul, ingatkan Jumat 15:00?" [Ya] [Ubah] sebelum commit.
- **Daily briefing** berbahasa manusia — "Hari ini ada 3 hal: …".
- **Pengingat proaktif** + follow-up otomatis; deteksi task ganda.
- **Undo selalu tersedia** + pesan error yang menawarkan solusi (bukan kode).

### 7.2 Fitur Lanjutan (Fase berikutnya)
- **Ringkasan → task** (email/rapat/dokumen jadi action item).
- **Prioritisasi cerdas** ("apa yang penting hari ini") — tampilkan sedikit, bukan semua.
- **Semi-auto scheduling** — AI mengusulkan jadwal, pengguna melihat & menyetujui (BUKAN auto penuh gaya Motion yang memindah jadwal diam-diam).
- **Peran project manager & sekretaris** (koreksi kewajaran task, audit perjalanan, deteksi anomali, desakan bertingkat) diuraikan tersendiri di **Bag. 10**.

### 7.3 Yang Dihindari
- Over-automation tak transparan; menyembunyikan aksi AI; multi-step wizard.
- Chat bebas tanpa saran/quick-reply — **selalu sediakan tombol besar** sebagai jalur alternatif.
- Sistem kredit/kuota yang membingungkan.

### 7.4 Model AI (2026)
- **Default workhorse: Claude Sonnet 5** (rasio biaya/kualitas terbaik untuk agent produksi; kuat function calling & structured output). **Haiku 4.5** untuk parsing ringan/murah. **Opus 5** hanya untuk reasoning terberat.
- Andalkan **tool calling + structured output** (mengisi field task otomatis) dan **input suara** (transkripsi via Whisper atau model yang memahami audio langsung).
- *Programmatic tool calling* menjaga data antar-tool di luar konteks model → hemat token signifikan untuk baca/tulis task berulang.

---

## 8. Kanal Interaksi & Notifikasi (In-app · Email · Telegram)

**Prinsip kanal:** pengalaman utama ada **di aplikasi (in-app/PWA)** — tempat semua fitur lengkap. Di atasnya, notifikasi & interaksi ringan mengalir lewat **beberapa kanal setara** yang dipilih pengguna:

- **In-app (utama):** pusat kerja penuh — buat/kelola tugas, papan, laporan, profil.
- **Email:** notifikasi formal & **pengiriman laporan** (lampiran PDF/Excel/CSV), cocok untuk arsip & audiens non-harian.
- **Telegram (opsional):** kenyamanan chat + voice + tombol besar bagi yang menyukainya. **Nice-to-have, bukan fitur utama** — aplikasi berfungsi penuh tanpanya.

Tak ada kanal wajib; pengguna mengatur kanal & intensitas per kategori di Profil (Bag. 9.5). Bagian di bawah merinci pemanfaatan **Telegram sebagai salah satu kanal** — dipertahankan karena teknisnya matang, bukan karena diistimewakan.

**Mengapa Telegram menarik (sebagai kanal opsional):** sebagian pengguna sudah familiar dengan chat — **tak perlu belajar aplikasi baru** untuk interaksi ringan. Bisa pakai suara. Terasa seperti mengirim pesan ke asisten.

### 8.1 Pola Interaksi
- **Buat task:** ketik/voice bahasa natural → AI parse → tersimpan, dengan konfirmasi tombol.
- **Reminder = pesan chat** dengan tombol besar **[Selesai] [Tunda 1 jam]**.
- **"Task hari ini"** via satu tombol *reply keyboard* → dibalas sebagai daftar / **checklist native** Telegram.
- **Reply keyboard tombol besar** (di bawah kolom chat) lebih ramah daripada inline button kecil.

### 8.2 Arsitektur
```
Telegram  →  Bot backend (webhook)  →  Layer AI (LLM)  →  Aksi task (DB)  →  balik ke chat
                                   ↘  Voice → transkripsi ↗
```
- **Transport:** **webhook untuk produksi** (latensi ~3× lebih rendah, CPU ~2× lebih hemat vs polling; butuh HTTPS/TLS publik). **Long polling** untuk dev lokal. Handler **stateless**, sesi di Redis bila multi-pod.
- **Pipeline pesan:** update → (bila voice) transkripsi → LLM ubah bahasa natural jadi **structured action** (intent: create/list/complete + entitas: judul, tenggat, prioritas) → eksekusi ke DB → balas.
- **Penautan akun (teraman):** **deep link token sekali-pakai** — `https://t.me/NamaBot?start=<token>`, cocokkan server-side, ikat `telegram_user_id` ke akun app. Setelah tertaut → bisa push notifikasi. Alternatif web: **Login Widget/OIDC** dengan **verifikasi hash HMAC-SHA-256 server-side** + cek `auth_date`.
- **Rate limit:** ± 30 pesan/detik global, ~1/detik per chat — antre & batasi burst reminder.

### 8.3 Kapabilitas Telegram terkini yang dimanfaatkan
- **Checklists native (Bot API v9.1)** — task-list bawaan, ideal MVP.
- **Rich Messages (akhir 2025)** — stream balasan AI dengan format rapi.
- **Telegram Mini Apps** — untuk fase lanjutan (kalender/dashboard visual). **Catatan:** mulai **20 Juli 2026** Telegram memblokir pemanggilan method Mini App dari origin berbeda → **siapkan domain sejak awal**.
- **Voice:** privacy mode bot **dimatikan** via @BotFather agar bisa membaca pesan suara.

### 8.4 Rekomendasi MVP vs Lanjutan
- **MVP:** antarmuka utama **in-app (PWA)** tombol besar + bahasa natural + voice; **email** untuk notifikasi & laporan. Telegram **opsional** di MVP (reply keyboard tombol besar + checklist native) — diaktifkan bagi yang mau, bukan jalur wajib.
- **Lanjutan:** Telegram Mini App saat butuh visual kaya di dalam chat, tetap dengan tombol besar & kontras tinggi; kanal tambahan lain (mis. SMS) hanya bila ada kebutuhan nyata.

---

## 9. Anti-Abandonment: AI sebagai "Pengurus" Task

Bagian ini menjawab tesis inti produk: **kebanyakan task manager ditinggalkan** — bukan karena fiturnya kurang, tapi karena *malas mengisi* dan *tidak ada yang mengurus*. Kita ingin AI mengambil alih beban itu (memperingatkan, mengingatkan, merawat task, memudahkan pembuatan) sehingga aplikasi "mau gak mau" dipakai — **bukan lewat paksaan, tapi lewat kehadiran yang menolong**.

### 9.1 Mengapa Task Manager Ditinggalkan (temuan riset)

Tiga akar penyebab yang konsisten di literatur retensi 2025–2026:

1. **Friksi capture (menambah task terasa seperti kerja).** Setiap detik & ketukan untuk mencatat adalah pajak. Jika mencatat lebih mahal daripada sekadar mengingat di kepala, orang berhenti mencatat. Bagi pengguna kita, friksi ini berlipat (technostress, mengetik lambat, takut salah).
2. **"Guilt pile" / tumpukan rasa bersalah.** Backlog yang menumpuk dan tak pernah surut berubah jadi sumber rasa bersalah, bukan alat bantu. Membuka app malah bikin cemas → pengguna menghindar.
3. **Decision fatigue.** Menatap daftar panjang lalu harus memutuskan "kerjakan yang mana duluan" melelahkan. Mayoritas pengguna melaporkan kelelahan memilih sebagai alasan berhenti.

Efek gabungannya keras: mayoritas pengguna produktivitas berhenti dalam **hitungan hari pertama**, dan retensi jangka-panjang (D30) untuk kategori ini secara umum **sangat rendah (satuan persen)**. Sinyal yang menjanjikan: app dengan **asisten AI aktif cenderung menahan pengguna jauh lebih lama** (indikasi ~2× lipat pada beberapa laporan industri).

> ⚠️ **Catatan kejujuran data:** angka persen retensi absolut & klaim "2×" berasal dari laporan industri/benchmark vendor yang metodologinya tidak selalu transparan — **perlakukan sebagai indikatif, bukan fakta pasti**. Yang kuat & konsisten adalah *arah*-nya: friksi capture, guilt pile, dan decision fatigue adalah pembunuh retensi, dan otomatisasi AI menekan ketiganya.

### 9.2 Prinsip Inti: Capture Nol-Usaha **Wajib** Dipasangkan dengan AI Grooming

Temuan paling penting untuk arsitektur kita: **memudahkan pembuatan task saja justru berbahaya bila berdiri sendiri.** Capture yang terlalu mudah tanpa perawatan hanya mempercepat pertumbuhan "guilt pile". Maka dua hal ini adalah **satu paket, tak boleh dipisah**:

- **Sisi masuk — capture nol-usaha:** bahasa natural + voice (lihat Bag. 7), tanpa form. AI mendeteksi komitmen ("nanti aku follow-up ke Pak Andi") dan menawarkannya jadi task. Menambah task tak boleh terasa seperti mengisi formulir.
- **Sisi rawat — AI grooming:** AI **secara aktif menyusutkan & merapikan** backlog supaya daftar tetap kecil, relevan, dan tidak menakutkan. Tanpa ini, kemudahan capture = bumerang.

Inilah yang membuat "mau gak mau dipakai": beban terberat (mengisi & mengurus) pindah dari pengguna ke AI.

### 9.3 AI Grooming — Merawat Backlog Otomatis

Peran AI sebagai "pengurus" yang bekerja di latar belakang (semua **dengan transparansi + undo**, lihat 9.7):

- **Tampilkan sedikit, bukan semua.** Batasi item terlihat ke **± 10–15 teratas** yang benar-benar relevan hari ini; sisanya disimpan rapi, bukan dipajang sebagai tumpukan.
- **Overdue-first, bukan daftar tak berujung.** Yang lewat tenggat dimunculkan lebih dulu dengan opsi cepat: [Selesai] [Jadwalkan ulang] [Batalkan].
- **Decay / auto-archive dengan hitung mundur terlihat.** Task yang tak disentuh lama meredup dan akan diarsipkan otomatis — **dengan pemberitahuan & tombol "Pertahankan"** sebelum benar-benar hilang (bukan menghapus diam-diam).
- **Deteksi & gabung duplikat.** AI menyatukan task kembar/serupa dan menawarkan penggabungan.
- **"Task bankruptcy" yang manusiawi.** Bila backlog membengkak, AI menawarkan reset terpandu ("Ada 40 hal lama menumpuk — mau kita bereskan bareng? Simpan yang ini, arsipkan sisanya?") — mengubah rasa bersalah jadi kelegaan.

Efeknya: daftar tak pernah tumbuh jadi monster; membuka app terasa **melegakan**, bukan menghakimi.

### 9.4 Nudge yang Terbukti (dan Batasnya)

Jurang sebenarnya bukan niat, tapi **intention–action gap**. Teknik nudge dengan bukti terkuat:

- **Reminders, defaults, decision-assistance** — tiga keluarga nudge paling efektif di *nudge megastudy* (PNAS) — persis peran yang bisa diambil AI kita.
- **Implementation intentions ("if-then"):** mengaitkan aksi ke pemicu konkret ("Jika rapat pagi selesai, maka kirim notulen") menaikkan *salience*. RCT mHealth menemukan pengingat pada target harian sangat kuat, dengan **interaksi timing × frequency** yang nyata (waktu & frekuensi harus pas, bukan sekadar banyak).

> ⚠️ **Batas ilmiah (jujur):** literatur nudge mengidap *publication bias* (Maier 2022, Szaszi 2022), efeknya bervariasi antar-individu, dan bukti implementation-intentions **masih inconclusive**. Konsekuensi desain: nudge harus **adaptif & selalu bisa dimatikan**, bukan asumsi satu-untuk-semua.

### 9.5 Anti Notification-Fatigue: Cadence

Yang menentukan retensi adalah **relevansi, bukan volume**. Over-notifikasi = technostress → app dimatikan. Aturan kita:

- **Global frequency cap lintas-channel.** App + Telegram **tidak boleh menembak dobel** — satu penghitung kuota bersama.
- **Digest pagi yang tenang > banyak ping seharian.** Satu ringkasan "Hari ini ada 3 hal…" jauh lebih ramah daripada tetesan notifikasi.
- **Batch berdasarkan urgensi**, tapi **jangan pernah batch alert genting** (tenggat kritis tetap langsung).
- **Kirim di waktu optimal tiap pengguna** (jam mereka biasa aktif) — bukan jam acak.
- **Preset mode ("tenang / normal / aktif") + kontrol per-kategori**, dan tombol **"matikan yang ini"** yang mudah dijangkau **tepat di titik frustrasi** — bukan terkubur di menu.

### 9.6 Nada AI: Hangat, Tanpa Menghakimi

Nada pengingat menentukan apakah AI terasa seperti *pendamping* atau *pengawas yang menyebalkan*. Aturan bahasa:

- **Asumsikan niat baik** — "sekadar terlewat", bukan "kamu gagal/lupa lagi". **Hindari** frasa yang menunjuk kelalaian ("sudah saya ingatkan 3×", "seperti biasa kamu…").
- **Fokus ke depan, bukan menyalahkan.** Hilangkan bahasa klinis/teknis.
- **Singkat & spesifik** (idealnya < 160 karakter, maks ~3 kalimat) untuk mengurangi *overwhelm*.
- **Tawarkan bantuan, bukan tuntutan.** "Mau saya jadwalkan ulang?" > "Kamu belum kerjakan ini."
- **Kehadiran, bukan tekanan.** Konsisten & ramah mengalahkan urgensi; nada tak sabar/pasif-agresif *backfire*.

Contoh pengingat yang benar: *"Selamat pagi Pak Budi 🙂 Laporan bulanan tenggatnya hari ini jam 3. Mau saya siapkan pengingat 1 jam sebelumnya, atau jadwalkan ulang?"* — hangat, spesifik, menawarkan jalan keluar.

### 9.7 Guardrail: Proaktif tapi Pengguna Tetap Pegang Kendali

Pergeseran 2026 adalah dari AI **reaktif** (kamu tanya, AI jawab) ke **proaktif** (AI bertindak, kamu menyetujui) — pola Motion (morning brief + peringatan jadwal mustahil), Asana/Monday AI (menandai overdue relatif dependensi, surfacing otomatis), Lindy (draft & tunggu persetujuan). Agar pengguna tetap merasa **memegang kendali** (menghindari over-automation yang bikin cemas), AI kita jalan di dalam **approval guardrails**:

- **Mulai dari low-stakes** (draft, reminder, saran) sebelum high-stakes (memindah jadwal, mengarsip massal).
- **Aksi sensitif = konfirmasi dulu.** Arsip, hapus, jadwal ulang → tawarkan, jangan eksekusi diam-diam.
- **Transparansi + undo di mana-mana.** Setiap tindakan AI terlihat & bisa dibatalkan (sejalan Bag. 7.3 & 10).
- **Selalu bisa dimatikan / diturunkan intensitasnya** per kategori.

### 9.8 Ringkasan Actionable (untuk Wireframe)

1. **Capture nol-usaha (voice/natural language) + AI grooming = satu paket**, tak boleh dipisah.
2. **Daftar selalu kecil** (± 10–15 terlihat), **overdue-first**, sisanya diarsipkan rapi dengan hitung-mundur + tombol "Pertahankan".
3. **Digest pagi tenang** sebagai denyut utama; **frequency cap global** app+Telegram; kirim di jam aktif pengguna.
4. **Nada hangat tanpa rasa bersalah**, singkat, selalu menawarkan bantuan.
5. **Kontrol cadence & matikan-notifikasi selalu satu ketukan jauhnya.**
6. **Deteksi komitmen** ("aku follow-up nanti" → tawarkan jadi task) & **gabung duplikat** otomatis.
7. **Task bankruptcy manusiawi** saat backlog membengkak — reset terpandu, bukan rasa bersalah.
8. Semua otomatisasi **transparan + bisa di-undo**; aksi sensitif butuh konfirmasi.

---

## 10. AI sebagai Project Manager & Sekretaris Pribadi

Selain menangkap & merawat task (Bag. 9), AI mengambil dua peran aktif: **project manager** (mengawal jalannya pekerjaan, menandai yang janggal/molor) dan **sekretaris pribadi** (mengingatkan, menyiapkan, menindaklanjuti). Bedanya dengan tool PM klasik: perannya **menemani & menyarankan**, bukan memaksa proses rumit — tetap patuh pada non-tujuan di Bag. 2.

> **Catatan kejujuran (Rule 20):** angka akurasi vendor (mis. Motion "variance 23%→8%", "risk detection" Asana) bersifat **indikatif/marketing**, bukan studi tinjauan-sejawat. ML prediksi-keterlambatan memang terbukti (~83% pada domain berdata rapi seperti konstruksi), TAPI hanya dengan **data historis yang kaya** — aplikasi baru mengalami *cold-start*. Karena itu MVP memakai **heuristik transparan yang bisa dijelaskan**, bukan ML *black-box*; naik ke ML hanya bila data sudah cukup.

### 10.1 Mengoreksi Task Saat Dibuat (estimasi & kewajaran)
- **Cek kewajaran target waktu.** Saat task dibuat, AI membandingkan estimasi dengan **rata-rata task serupa milik pengguna** dan menandai bila janggal: *"Kamu beri 30 menit, tapi tugas serupamu biasanya ±2 jam — mau saya sesuaikan?"*
- **Deteksi target terlalu lama / tidak wajar.** Tenggat tak masuk akal (task kecil dijadwalkan 3 minggu, atau terlalu banyak menumpuk di satu hari) → AI menawarkan pembagian / penjadwalan ulang.
- **Selalu sebagai tawaran, bukan koreksi paksa.** Sertakan alasan + tombol [Sesuaikan] [Biarkan]. Manusia tetap pemutus.

### 10.2 Mengawal "Alur Perjalanan" Task (lifecycle & audit)
- Tiap task punya **jejak perjalanan** transparan: dibuat → dijadwalkan → dikerjakan → selesai (atau ditunda / di-*reschedule*), lengkap kapan & oleh siapa.
- **Deteksi anomali berbasis aturan yang bisa dijelaskan** (bukan tebakan AI misterius): molor > X hari, **di-*reschedule* ≥ 3×**, dibuka-tutup berulang, macet tanpa progres, estimasi meleset jauh dari rata-rata.
- Setiap anomali disertai **alasan yang bisa dibaca** ("Task ini sudah 3× dijadwal ulang"), bukan skor buram.

### 10.3 Pandangan per-Individu (beban & pola)
- Untuk konteks kantor (beberapa staf), AI menampilkan **beban kerja per orang** sebagai agregasi sederhana & jujur: jumlah task aktif + total jam estimasi — menandai siapa **kelebihan beban**.
- **Pola keterlambatan personal** (sering molor di jenis task tertentu) jadi bahan saran, bukan penilaian.
- **Bukan pengawasan (*surveillance*).** Visibilitas ke atasan/rekan bersifat **hormat & terbatas** — fokus "butuh bantuan?", bukan "siapa yang salah". Pengguna tahu apa yang terlihat oleh siapa.

### 10.4 Memberi Pendapat Saat Janggal / Tak Masuk Akal
- AI menyuarakan bila menemukan: dependensi mustahil (B sebelum A selesai), deadline bentrok, scope tak jelas, atau beban satu hari tak realistis.
- Disampaikan sebagai **pertanyaan/tawaran ber-alasan**, singkat, selalu bisa ditolak — mengikuti nada hangat tanpa menghakimi di Bag. 9.6.

### 10.5 Peringatan & "Desakan" Bertingkat (escalation)
Untuk task yang molor/anomali, desakan **naik bertahap**, bukan langsung keras — dan tunduk penuh pada cadence & *frequency-cap* di Bag. 9.5:
1. **Pengingat lembut ke diri sendiri** — *progress-framed* ("Tinggal 1 langkah lagi"), bukan *deficit-framed*.
2. **Tawaran bantuan** — jadwalkan ulang, pecah jadi lebih kecil, atau delegasikan.
3. **Eskalasi ke manusia lain** (rekan/atasan) **hanya** untuk yang benar-benar tertahan — dengan sepengetahuan pengguna.
- **Threshold** ("berapa lama baru dianggap molor & dieskalasi") **tidak dikarang** — literatur belum menyorotnya; harus ditetapkan lewat *co-design*/uji pengguna, dan **pengguna bisa mengaturnya sendiri**.

### 10.6 Guardrail (peran aktif ≠ kehilangan kendali)
- **Transparansi alasan** di tiap saran/anomali; **approval** untuk aksi sensitif; **undo** selalu ada. Prinsipnya, **dapat-dijelaskan > akurasi mentah** — kepercayaan lahir dari paham, bukan dari angka.
- AI menyarankan & mendesak **dalam batas yang pengguna izinkan**; pengguna tetap pegang kendali (lihat Bag. 9.7).

### 10.7 Ringkasan Actionable (untuk Wireframe)
1. Kartu **"Perjalanan Task"** — timeline sederhana + badge anomali ber-alasan.
2. Saat buat task: **cek-kewajaran inline** ("±2 jam biasanya — sesuaikan?") dengan [Sesuaikan] / [Biarkan].
3. **Ringkasan beban per orang** (angka jujur, bukan skor) untuk tampilan tim.
4. **Bubble "pendapat AI"** memakai pola tombol besar Bag. 9.6 — tawaran, bukan perintah.
5. **Kontrol eskalasi & threshold molor** yang bisa diatur pengguna; default aman & lembut.

---

## 11. Bahasa Interaksi & Motion: Modern tapi Tenang

Permintaan: UI **jangan membosankan** — modern & interaktif. Kabar baiknya, tren desain 2026 justru sejalan dengan kebutuhan ini: arah dominannya **"calm design / motion minimalism"** — animasi harus bertujuan, bukan pamer. Jadi **modern 2026 = taktil, responsif, cerdas, tenang** — bukan ramai. Ini menyelesaikan ketegangan "modern vs aman": kita bisa keduanya sekaligus.

> **Kejujuran (Rule 20):** `prefers-reduced-motion` & aturan WCAG (jangan andalkan gerak sebagai satu-satunya sinyal) adalah **standar mapan**. Sisanya (durasi animasi, tren *glassmorphism*, dll.) adalah **opini/tren desain** — perlakukan angka dari blog sebagai ancar-ancar, validasi lewat uji pengguna.

### 11.1 Filosofi: Augmentasi, Bukan Penyederhanaan
Pengguna **tidak** diberi UI "diturunkan/dikunci". Mereka diberi UI modern yang **kebetulan juga paling tenang, taktil, dan bebas cemas** — yang justru disukai semua umur. Prinsipnya: **"bukan menyederhanakan, tapi mengaugmentasi."**

### 11.2 Arah Desain Konkret (modern + vintage hangat + aksesibel)
- **Kedalaman & tactility, bukan flat kaku.** Kartu dengan bayangan lembut, sudut membulat, aksen "glass" halus — modern tanpa mengorbankan kontras. Warna tetap dari **Oatmeal & Espresso**.
- **Optimistic UI + microinteraction bermakna.** Aksi terasa instan: centang "Selesai" langsung memantul halus sebelum server membalas → app terasa hidup, bukan kaku.
- **Perayaan ringan saat selesai** (*checkmark bounce* + denyut haptic) — memberi rasa capaian; penting untuk motivasi ("teknologi menolong, bukan menguji").
- **Haptic sebagai konfirmasi taktil** pada aksi besar (Selesai / Tunda / Kirim), bertipe semantik (success/warning/error) — menenangkan yang takut salah pencet.
- **Glanceable cards** ala *Dynamic Island*: "Task hari ini" tampil ringkas sekali-lihat, tap untuk buka — tanpa menu dalam.
- **Lapisan percakapan di *samping* UI, bukan pengganti.** Pengguna bisa **tap tombol besar ATAU ngobrol dengan AI**; menyatu dengan visi multi-channel + AI-PM.
- **Visualisasi progres yang tenang.** *Ring*/bar lembut; status = warna + ikon + label (glanceable tanpa data ramai).

### 11.3 Pola yang BOLEH (modern & aman)
- Transisi **200–300ms**, hanya properti `transform`/`opacity`, 60fps — **jangan** `transition: all`.
- Animasi hanya bila **bermakna** (memandu perhatian, menegaskan state, orientasi antar-layar).
- **Skeleton/loading yang menenangkan** + feedback optimistik <100ms.
- **Haptic** pada aksi utama; alternatif **fade lembut / instan** saat *reduced-motion*.
- Gestur **sederhana** (tap tunggal, swipe 1 jari) yang **selalu** punya padanan tombol besar.
- **Dark mode sebagai permukaan setara** (bukan afterthought), kontras tetap AAA.

### 11.4 Pola yang HARUS Dihindari / Dikontrol
- **Gerak sebagai satu-satunya sinyal** (langgar WCAG) — selalu sertai teks/ikon.
- Parallax berat, autoplay, *infinite scroll*, animasi dekoratif tanpa fungsi.
- **Gestur kompleks** (≥2 jari, gerak cepat/presisi tinggi), *hover-only*, menu bersarang dalam.
- Animasi >500ms (lamban) atau <100ms (mengagetkan).

### 11.5 Kontrol Pengguna (wajib)
- Hormati OS `prefers-reduced-motion` **+** toggle in-app sendiri.
- **"Mode Sederhana"** satu ketuk: kurangi animasi & elemen sekunder.
- Kontrol perbesaran teks A/A+/A++ (Bag. 6) tetap dipertahankan.

**Rujukan *delight*:** Things 3 (polish animasi *completion*), Todoist (natural-language capture), Any.do (voice + *daily planning*), TickTick (integrasi tenang).

---

## 12. Arsitektur Teknis & Pertimbangan Stack (2026)

> Arah arsitektur untuk diskusi. Divisualkan lengkap di Penpot halaman **`diagram-arsitektur`** (8 lapisan L0–L7 + alur "Desakan Task Molor"). Bagian ini merangkum keputusan & alasannya.

> **Catatan kejujuran (Rule 20):** pilihan produk di bawah (BullMQ vs Temporal, LLM Gateway, SSE vs WebSocket) adalah **trade-off beralasan — bukan satu-satunya jalan**; angka performa/penghematan vendor bersifat **indikatif**. Yang **mapan & konsisten** lintas sumber: pisahkan *scheduler* dari eksekusi *worker*, **webhook** untuk produksi, **Postgres cukup tanpa vector DB** untuk data task terstruktur, dan target sentuh ≥44px (aksi utama 48–60px) + kontras ≥4.5:1 (kejar AAA untuk teks penting) (Bag. 4).

### 12.1 Bentuk Sistem — Modular Monolith Dulu
Untuk tim kecil & MVP, **modular monolith** (satu deployable, modul terpisah rapi: Auth, Tasks, Users/Team, Notifications, AI-PM Facade, SSE) mengalahkan microservices — lebih murah dioperasikan, mudah di-refactor jadi service terpisah bila skala menuntut. Postgres sebagai **sumber kebenaran** tunggal.

### 12.2 Lapisan (ringkas, detail di diagram Penpot)
- **L0 Pengguna & Kanal:** **PWA (installable, offline-first) sebagai antarmuka utama**; **Email** (notifikasi & pengiriman laporan); **Telegram Bot & Mini App sebagai kanal opsional** (WebView, fase lanjutan). Perangkat: HP & desktop.
- **L1 Edge/Gateway:** CDN + TLS, API Gateway (rate-limit & routing), **Telegram Webhook Receiver** (terima Update JSON, validasi `initData` HMAC-SHA-256).
- **L2 Backend (Modular Monolith):** modul Auth/Identity, Tasks (CRUD + lifecycle + audit), Users/Team, Notifications (susun & fan-out), **AI-PM Facade** (gerbang tunggal ke lapisan AI), **SSE Endpoint** (push realtime ke klien).
- **L3 AI Orchestration:** **LLM Gateway** (routing model / kontrol biaya / cache), **Agent Orchestrator** (loop think–act–observe), **Tool Layer (MCP)** — `readTask` · `writeTask` · `scheduleNudge` · `flagAnomaly` — dan **Memory/Context Store** (riwayat task per pengguna).
- **L4 Async Workers & Scheduler:** **Scheduler (cron)** hanya meng-*enqueue* jadwal (TERPISAH dari eksekusi), **Queue (BullMQ/Redis)** untuk delayed job & retry backoff, plus worker: Anomaly Detector, Escalation Engine, Reminder Sender, dan **Dead-letter Queue** untuk job gagal.
- **L5 Data Stores:** **PostgreSQL** (tasks · users · `task_events` audit · escalations), **Redis** (queue + pub/sub + cache), **LISTEN/NOTIFY → Pub/Sub → SSE** (fan-out realtime), **Vector Store** *opsional* (hanya bila kelak butuh RAG dokumen — **non-MVP**).
- **L6 Integrasi Eksternal:** Telegram Bot API (`sendMessage`, inline keyboard, Stars), LLM Provider API (Claude/GPT sesuai Bag. 7.4), Email/SMS (fallback eskalasi ke manusia).
- **L7 Observability & Ops (lintas-lapisan):** OpenTelemetry (trace lintas layer), Sentry (error tracking), Structured Logs (**tanpa PII** — pakai ID/masked, sejalan privasi Bag. 14), BullBoard (kesehatan antrean).

### 12.3 Layer AI — Tool Calling sebagai Inti
LLM dengan **tool/function calling (standar MCP)** + **structured output** mengisi field task otomatis; *programmatic tool calling* menjaga data antar-tool di luar konteks model → hemat token untuk baca/tulis task berulang. **RAG & vector DB tidak diperlukan** untuk data task terstruktur; hanya relevan bila kelak mengindeks dokumen bebas. Transkripsi suara: Whisper atau model audio-native.

### 12.4 Realtime & Reminder
- **Push ke klien = SSE**, bukan WebSocket — arus data satu arah (server→klien) cukup, lebih sederhana & tahan proxy. Sumbernya Postgres **LISTEN/NOTIFY** → Redis Pub/Sub → SSE.
- **Reminder terjadwal:** Scheduler cron meng-*enqueue* ke BullMQ; worker terpisah yang mengeksekusi kirim — pemisahan ini mencegah satu cron macet menahan seluruh eksekusi.

### 12.5 Alur Rujukan — "Desakan Task Molor" (lihat diagram)
Scheduler → Queue → **Anomaly Detector** (baca `task_events`) → deteksi molor → **Escalation Engine** → **AI Orchestrator** (susun pesan lembut & ber-alasan, Bag. 9.6/10.5) → Notifications → Telegram/SSE → Pengguna. Bila diabaikan N× → naik tingkat → notifikasi ke manusia lain (email/Telegram). Ambang & nada desakan ditetapkan lewat *co-design* (Bag. 10.5); **pengguna tetap pemutus**.

### 12.6 Guardrails Teknis
Konfirmasi sebelum aksi destruktif, batasi otonomi AI (approval untuk aksi sensitif), **undo** selalu ada, penautan akun via **deep-link token sekali-pakai** (Bag. 8.2), tanpa PII di log, hormati rate-limit Telegram (~30 msg/detik global, ~1/detik per chat).

Pertimbangan ini akan diselaraskan dengan preferensi stack yang ada di project (cek `package.json`/manifest saat mulai implementasi).

---

## 13. Prinsip Desain (Ringkasan Actionable untuk Wireframe)

1. **Satu tugas utama per layar.** Alur linear, tanpa cabang tersembunyi.
2. **Target sentuh 48–60px** untuk aksi utama; jarak antar-target lega.
3. **Font 18px, line-height 1.6, typeface hyperlegible.** Sediakan A/A+/A++.
4. **Palet "Oatmeal & Espresso":** permukaan hangat muted, teks/aksi gelap pekat, kontras AAA untuk teks penting.
5. **Ikon + label teks selalu bersama.** Tak pernah mengandalkan warna saja.
6. **Bahasa manusia.** Konfirmasi & pesan error menjelaskan, menawarkan solusi.
7. **Undo di mana-mana.** Tanpa timeout pada aksi penting.
8. **Jalur ganda:** setiap aksi AI (chat) punya padanan tombol besar.
9. **Konsistensi mutlak** posisi & pola antar-layar.
10. **Feedback jelas** untuk setiap aksi (loading/sukses/gagal).

---

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Over-automation membingungkan pengguna | Ditinggalkan pengguna | Mode semi-auto transparan + konfirmasi + undo |
| AI salah parse bahasa natural | Task salah/hilang | Konfirmasi satu langkah sebelum commit; koreksi mudah |
| Pastel terlalu lembut → kontras kurang | Teks tak terbaca | Sudah dimitigasi lewat separasi lightness & verifikasi kontras (Bag. 5) |
| Ketergantungan Telegram (kebijakan/rate limit) | Terbatas — Telegram hanya kanal opsional | In-app & email tetap jalan penuh bila Telegram bermasalah; hormati rate limit; fallback polling untuk dev |
| Literasi digital rendah tetap jadi hambatan | Adopsi lambat | Onboarding contoh nyata, dapat diulang; pelatihan minimal |
| Kebijakan Mini App origin (20 Juli 2026) | Fitur rusak | Siapkan domain tetap sejak awal |
| Privasi data (voice, konteks pribadi) | Kepercayaan & kepatuhan | Minimalkan data; jangan log PII; enkripsi; transparansi |

---

## 15. Langkah Berikutnya — Menuju Wireframe & Flow (Penpot)

Setelah paper ini disepakati, usulan urutan kerja di Penpot:

1. ✅ **Finalisasi arah palet** (Oatmeal & Espresso) → **color tokens** dua-tier (Bag. 5.2) — **selesai** di poster Penpot halaman `paper`.
2. ✅ **Typography tokens** (skala Bag. 6) — **selesai** di poster Penpot halaman `paper`.
3. ✅ **Diagram arsitektur** 8-lapisan (Bag. 12) — **selesai** di halaman Penpot `diagram-arsitektur`.
4. ✅ **Wireframe** layar inti & lanjutan — **selesai** di Penpot (auth Google→logout, buat/kelola/selesai/hapus task, Staf/Manajer/Pimpinan, laporan + format & contoh dokumen, settings, admin, meeting/event, profil, papan bersama, tugas kaya).
5. ✅ **User flow** end-to-end — **selesai** di halaman `flow-detail` (Flow 1 Auth, Flow 2 Desakan task molor, Flow 3 Manajer tugaskan & pantau, Flow 4 Laporan buat & distribusi multi-channel, Flow 5 Peta akses RBAC).
6. **High-fidelity** dengan palet & tipografi final; uji kontras & ukuran target langsung di Penpot (berikutnya).

Design yang sudah ada di Penpot saat ini: file **task-manager** dengan halaman `paper`, `diagram-arsitektur`, `wireframe`, `user-flow`, `wf-auth`, `wf-manajer`, `wf-laporan`, `wf-pimpinan`, `wf-settings`, `flow-detail`, `wf-admin`, `wf-meeting`, `wf-tugas`, `wf-kolaborasi` — seluruhnya selaras dengan sistem token & prinsip di paper ini.

---

## 16. Peran, Kolaborasi & Fitur Kerja Tim

Bagian ini merangkum kapabilitas kolaborasi kantor yang dibangun setelah paper awal & divisualkan di Penpot: **model peran (RBAC)**, **orkestrasi Admin**, **pengingat rapat & catatan acara**, **halaman profil**, **papan bersama**, dan **tugas kaya** (subtask, checklist, kolaborator, lampiran). Semua tunduk pada prinsip aksesibilitas (Bag. 4–6), nada hangat tanpa menghakimi (Bag. 9.6), dan guardrail kendali-pengguna (Bag. 9.7 & 10.6).

### 16.1 Beranda / Halaman Utama (Dashboard Harian)
Layar utama setelah login — pusat harian yang dirancang *glanceable* untuk lansia (halaman Penpot `wireframe`, board *Beranda*). Isi berurut dari atas:
- **App bar:** salam + tanggal, tombol menu, avatar, titik notifikasi (indikator peringatan).
- **Sekretaris AI:** ringkasan naratif hari ini + tautan "Lihat rencana hari ini" (Bag. 10 — tawaran ber-alasan).
- **Peringatan (kondisional):** banner untuk anomali/keterlambatan + aksi cepat "Tangani sekarang" (Bag. 9.6 — nada membantu, bukan menghakimi).
- **Statistik cepat:** Hari ini · Selesai · Terlambat (angka besar, bukan skor — Bag. 10.3).
- **Saran AI (kondisional):** rekomendasi urutan kerja + aksi **Terima / Nanti saja** (approval guardrails, Bag. 10.6).
- **Tugas Hari Ini:** kartu ringkas + status; **Rapat Berikutnya**; **Menu Cepat** (Tugas · Laporan · Meeting · Papan Bersama · Pengaturan · Profil) & navigasi bawah.

### 16.2 Model Peran (RBAC) — 4 peran
Empat peran dengan hak berjenjang; peta akses lengkap divisualkan di Penpot halaman `flow-detail` (Flow 5).

| Kemampuan | Admin | Manajer | Staf | Peninjau |
|---|---|---|---|---|
| Kelola user & peran | ✓ | — | — | — |
| Atur aturan & kebijakan | ✓ | — | — | — |
| Buat & tugaskan tugas | ✓ | ✓ | sendiri | — |
| Assign kolaborator | ✓ | ✓ | — | — |
| Kerjakan & update tugas | ✓ | ✓ | ✓ | — |
| Setujui / kembalikan hasil | ✓ | ✓ | — | ✓ |
| Lihat papan bersama | ✓ | ✓ | ✓ | ✓ |
| Buat & bagikan laporan | ✓ | ✓ | sendiri | lihat |
| Kelola meeting & event | ✓ | ✓ | ikut | — |

- **Least privilege:** default peran paling rendah; hak naik hanya bila perlu.
- **Transparansi hak:** tombol yang tak diizinkan **dinonaktifkan dengan penjelasan**, bukan hilang misterius — pengguna paham batasnya.
- **Peninjau = quality gate manusia:** perannya **menyetujui / mengembalikan hasil** kerja (+ lihat papan bersama & laporan), tanpa mengeksekusi tugas, menugaskan, atau mengelola sistem — gerbang mutu di atas orkestrasi AI, sejalan guardrail kendali-pengguna (Bag. 10.6).

### 16.3 Admin & Orkestrasi
Admin mengorkestrasi orang & pekerjaan (halaman Penpot `wf-admin`):
- **Kelola user & peran:** undang, nonaktifkan, ubah peran; audit aktivitas ringkas (tanpa PII di log — Bag. 12/13).
- **Buat & tugaskan tugas lintas-tim,** atur prioritas & tenggat, pilih penerima + kolaborator (AI mengusulkan berdasarkan beban & keahlian — tawaran ber-alasan, bukan paksaan).
- **Aturan & kebijakan:** ambang "molor", batas beban per orang, jam kerja, kebijakan eskalasi & notifikasi default — semua dapat diatur, sejalan Bag. 10.5.
- **Bantuan AI untuk Admin:** ringkasan kesehatan tim, deteksi beban tak seimbang, saran redistribusi — dapat-dijelaskan & butuh konfirmasi.

### 16.4 Pengingat Rapat & Catatan Acara (Meeting/Event)
Fitur penting untuk konteks kantor (halaman `wf-meeting`). Alur: buat acara → agenda → undang peserta → pengingat berjenjang → catatan/notulen → tindak lanjut jadi task.
- **Pengingat berjenjang** (mis. H-1, 1 jam, 10 menit) — hormati *frequency-cap* global (Bag. 9.5) & jam aktif pengguna.
- **Catatan acara & notulen:** templat sederhana; **AI merangkum notulen → action item** (dengan persetujuan — Bag. 7.2/9.7).
- **Tindak lanjut otomatis:** keputusan rapat langsung jadi task ber-assignee & tenggat.
- **Integrasi kalender:** sinkron dua-arah (Google/Microsoft) via standar iCalendar; RSVP peserta.

> **Kejujuran (Rule 20):** detail API kalender (Google Calendar API, Microsoft Graph) & kuotanya berubah cepat — validasi versi saat implementasi. Pola "notulen → action item via LLM" sudah lazim 2025–2026, tetapi akurasi bergantung kualitas audio/teks; **selalu sertakan langkah tinjau manusia** sebelum commit.

### 16.5 Halaman Profil (Diri Sendiri)
Ruang personal tiap pengguna (halaman Profil):
- **Tugas milik sendiri + detailnya,** progres, dan riwayat.
- **Preferensi kanal & notifikasi** (in-app/email/Telegram, mode tenang/normal/aktif — Bag. 9.5), skala teks A/A+/A++ (Bag. 6.3), reduced-motion (Bag. 11.5).
- **Beban kerja pribadi** (angka jujur, bukan skor — Bag. 10.3) & pola keterlambatan, sebagai bantuan diri, bukan penilaian.

### 16.6 Papan Bersama (Shared Board)
Tempat semua tugas semua orang berkumpul untuk **pengawasan bersama yang hormat** (halaman Papan Bersama):
- **Agregasi lintas-pengguna:** pantau kemajuan, sumbatan, dan beban tim sekilas.
- **Filter** per orang/status/prioritas; *glanceable cards* (Bag. 11.2).
- **Bukan surveillance** (Bag. 10.3): fokus "butuh bantuan?" bukan "siapa salah"; visibilitas mengikuti peran (16.2) & pengguna tahu apa yang terlihat oleh siapa.

### 16.7 Tugas Kaya (Subtask · Checklist · Kolaborator · Lampiran)
Tugas bukan sekadar baris teks (halaman detail tugas, `wf-tugas`):
- **Subtask / tugas turunan:** pecah pekerjaan besar; progres induk mengikuti anak.
- **Checklist:** langkah ringan di dalam satu tugas, dengan progres terlihat.
- **Invite / assign kolaborator:** satu tugas bisa punya beberapa orang; AI usul penerima (Bag. 10) — tetap tawaran.
- **Lampiran:** gambar, dokumen, dan berkas lain; pratinjau aman; hormati batas ukuran & privasi (jangan log PII — Bag. 12/13).
- Semua aksi punya **undo** & konfirmasi untuk yang destruktif (Bag. 13).

### 16.8 Ringkasan Actionable (untuk Wireframe)
1. Beranda/Halaman Utama: dashboard harian glanceable — ringkasan Sekretaris AI, peringatan & saran AI kondisional (Terima/Nanti), tugas hari ini, rapat berikutnya, menu cepat + navigasi bawah.
2. Empat peran RBAC dengan peta akses eksplisit; tombol terlarang dinonaktifkan + penjelasan, bukan hilang misterius. Peninjau = quality gate (setujui/kembalikan hasil).
3. Admin: kelola user/peran, assign lintas-tim, atur aturan, dibantu AI dapat-dijelaskan.
4. Meeting/Event: pengingat berjenjang (cap global), notulen → action item (tinjau manusia), sinkron kalender.
5. Profil: tugas sendiri + preferensi kanal/notifikasi/aksesibilitas terpusat.
6. Papan Bersama: agregasi hormat, filter, glanceable — bukan surveillance.
7. Tugas kaya: subtask, checklist, kolaborator, lampiran — semua dengan undo & konfirmasi.

---

## 17. Referensi

### Aksesibilitas & UX
- WCAG 2.5.8 Target Size (Minimum) Implementation Guide — AllAccessible (2024/2025)
- What Is WCAG 2.5.8 Target Size Minimum — TestParty (2025)
- WCAG 2.5.5 Target Size Enhanced 44×44 — accessibility.build (2024)
- Touch targets must be 24px large or leave sufficient space — AccessibilityChecker (2024)
- UX Design for Seniors, 3rd Edition — Nielsen Norman Group
- Usability for Older Adults: Challenges and Changes — NN/g (Des 2024)
- A Guide to Interface Design for Older Adults — Toptal (2024)

### Tipografi
- Typography for Older Adults — MyFonts Font Manual
- Vision Changes: Typography for Aging Audiences — Marketing Partners
- Atkinson Hyperlegible — Braille Institute (Next: 2025)
- Best Accessible Fonts 2026 — Webyes (2026)
- Typography in Inclusive Design Part 2 — Vision Australia
- Effect of Font Size on Reading in Older Adults — Frontiers in Psychology (2022)

### Sains Warna & Palet
- Age-Related Effects on the Color Discrimination Threshold — PMC (2025)
- Elderly-Centric Chromatics: Color Preferences of the Elderly in Smart APP Interfaces — Taylor & Francis (2024)
- Color Perception and the Aging Eye — Sherwin-Williams
- GerontoVis: Data Visualization at the Confluence of Aging — arXiv (2024)
- Preventing Ageism in Design: Digital Accessibility for Older Adults — Vispero
- Color Contrast and Readability — AFixt
- UI Color Trends to Watch in 2026 — Updivision
- 8 Sophisticated Muted Color Palettes for 2026 — Design Work Life
- Color Blind-Friendly Palette — Lyssna

### Fitur AI
- 5 Best AI Task Management Tools in 2026 — Morgen (2026)
- Motion vs Todoist (2026) — Morgen (2026)
- 7 Best AI task managers 2026 — monday.com (2026)
- Best AI Scheduling Agents — The AI Agent Index (2026)
- The best AI productivity tools in 2026 — Zapier (2026)
- Claude Opus 5 / Sonnet 5 pricing & benchmarks — Finout / Techjack / DataCamp (2026)
- Factors influencing older adults' adoption of AI voice assistants (UTAUT) — PMC (2025)
- GRACE: LLM-based Embodied Voice Assistant for Older Adults — JMIR Aging (2025)
- AI-powered voice assistants for older adults: literature review — Springer (2026)

### Telegram
- Telegram Bot API Changelog / Mini Apps / Login (OIDC) / Login Widget — core.telegram.org (2025)
- BotNews channel (Rich Messages, Checklists v9.1) — Telegram (2025)
- Long Polling vs Webhook — grammY / Hostman / Telegram Blog (2025)
- Deep Linking — aiogram docs (2025)
- Building a personal AI To-Do Assistant on Telegram — Medium (2025)
- Voice-enabled Telegram Bot with Gemini/GPT — DEV / n8n (2025)

### Anti-Abandonment, Nudging & Retensi
- The Rise of Agentic Personal Assistants (Rahi, Motion, Zapier AI) — AI Magicx (2026)
- AI Task Management: How Agents Prioritize & Complete To-Dos — cowork.ink (2026)
- Best Proactive AI Assistants in 2026 — Lifestack (2026)
- AI Agents at Work 2026 — ProductivityHub / productivity.design (2026)
- Nudge megastudy (reminders, defaults, decision-assistance) — PNAS
- No evidence for nudging after adjusting for publication bias — Maier et al., PNAS (2022)
- No reason to expect large & consistent nudge effects — Szaszi et al. (2022)
- Reminders & implementation intentions in mHealth (RCT, OR=7.52) — literatur mHealth
- How to Text Elderly Patients: Practical Guide — Curogram
- Best Reminder Apps for Elderly (2025 comparison) — yougot.ai
- 15 Gentle Reminder Email Templates — TextExpander (2025)
- Friendly Reminder Email That Gets Replies — Cleverly (2026)
- Notification fatigue & frequency capping best practices — (laporan industri push/retensi, 2025–2026)

### AI Project Management & Deteksi Anomali
- Motion AI Review 2026 — Rimo
- Is Motion Worth It? Honest Review 2026 — Alfred
- Best AI Project Management Software 2026 — Onplana
- Asana AI Features 2026 — BuyerSprint
- ClickUp Brain Review 2026 — Dupple
- The Role of Machine Learning in Predicting Project Delays — IJAIBDCMS
- Predicting Delays in IT Projects: A ML Approach — Springer
- Navigating Privacy and Trust: AI Assistants as Social Support for Older Adults — arXiv 2505.02975
- AI-Powered 'Nudges' for Engagement & Adherence — Prevounce

### UI Modern-Interaktif & Motion
- How Micro-Interactions & Motion Design Improve UX in 2026 — Acodez
- UI Motion and Accessibility for Inclusive Digital Experience — Skynet
- prefers-reduced-motion — MDN Web Docs
- A Guide to Interface Design for Older Adults — Toptal
- Optimizing Mobile App Design for Older Adults: Systematic Review (2025) — Springer
- 12 UI/UX Design Trends 2026 (Data-Backed) — Index.dev
- Mobile App Design Trends 2026 — Muzli

---

*Catatan metodologi: rasio kontras di Bagian 5 dihitung dengan formula luminance WCAG dan diverifikasi mandiri; verifikasi akhir tetap disarankan lewat contrast checker pada aset final. Klaim teknologi 2026 (model AI, Telegram API) berbasis sumber ber-tanggal di atas — validasi ulang saat implementasi karena ekosistem cepat berubah.*
