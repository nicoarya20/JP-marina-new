# Wireframe — Revisi Diskusi (per bagian)

Dokumen kerja terpisah dari `wireframe.md` (yang masih jadi sumber sinkronisasi Penpot saat ini).
Dipakai untuk membahas & mengunci detail satu bagian per satu bagian sebelum diterapkan balik
ke `wireframe.md` + board Penpot. Belum final sampai semua bagian selesai dibahas.

**Status:** Bagian 1 (Autentikasi) — Revisi 1 dikunci 2026-09-11, **direvisi lagi (Revisi 2)** hari yang sama
setelah review wireframe di Penpot. Bagian 2 (Struktur Navigasi Global) dikunci 2026-09-13, **direvisi
lagi (Revisi 2)** 2026-09-14 (nav + FAB "Tambah"). Bagian 3 (Beranda per-role) dikunci 2026-09-14 — board
Penpot 4 varian sudah dibuat, tabel Menu Cepat & Tombol aksi utama diperbarui menyesuaikan Revisi 2
Bagian 2. Bagian 4 (Menu Acara — struktur, alur & titik AI) dikunci 2026-09-14. Bagian 6 (Menu Profil —
struktur, alur & RBAC Laporan) dikunci 2026-09-14. Bagian 7 (Menu Project — list, filter AI "perlu
perhatian" & aksi kartu) dikunci 2026-09-14. Bagian 8 (Sub-tab Task dalam tab "Semua" — list, filter,
RBAC CRUD) dikunci 2026-09-14. Bagian 5 (alur lengkap Admin per-screen) — belum dibahas.

---

## 1 · Autentikasi — Login Google → Logout

Alur masuk **hanya** memakai akun Google (tidak ada jalur email/password terpisah — password
diketik di UI Google sendiri, di luar cakupan aplikasi ini, jadi kasus "salah password" tidak
relevan untuk didesain di sini).

### Perubahan vs `wireframe.md` saat ini

| # | Screen/Elemen | Sebelumnya | Jadi |
|---|---|---|---|
| 1 | A2 · Masuk | Ada 2 jalur: "Masuk dengan Google" **+** "Alamat email" / "Masuk dengan email" (jalan buntu, tak ada screen lanjutannya) | **Hapus jalur email.** Hanya tombol "Masuk dengan Google". |
| 2 | A5 · Lengkapi profil | Field "Peran Anda" berupa **pilihan radio** yang bisa diubah user (Admin/Manajer/Staf/Peninjau) | Field "Peran Anda" jadi **read-only** (badge/label) — menampilkan role yang **sudah di-set admin saat invite**, sebelum user pernah login. User hanya melengkapi nama & jabatan/divisi (opsional); foto tersinkron dari Google. |
| 3 | A6 · Akses ditolak | Deskripsi tabel: "Error state bila **izin ditolak**" (tidak cocok dengan isi teks & tidak disebut di flow diagram sama sekali) | Deskripsi diperbaiki: "Error state bila **email belum terdaftar/di-invite admin** di organisasi." Ditempatkan eksplisit di flow: setelah consent diberikan (A4 → Izinkan), sebelum A5. |
| 4 | A1 · Splash | Cek sesi: hanya biner (aktif → Beranda / belum masuk → layar masuk) | Tambah cabang ke-3: **sesi ada tapi tidak valid** (token kedaluwarsa/dicabut, atau akun dinonaktifkan admin) → tampilkan pesan singkat sebelum ke layar masuk, bukan silent redirect. |
| 5 | Flow 1 · Auth (diagram) | Consent ditolak → langsung "kembali ke Layar masuk"; tidak ada langkah cek pendaftaran/whitelist sama sekali | Langkah baru ditambahkan setelah consent diberikan: **cek apakah email sudah di-invite admin (whitelist)** → menentukan lanjut ke A5 atau ke A6. |

### Model registrasi user baru — **Revisi 1: Whitelist murni (admin invite dulu)** — *digantikan Revisi 2 di bawah*

Admin menambahkan calon user (email + role awal) di panel Admin → "Kelola pengguna" **sebelum**
orang tersebut pernah login. Tidak ada status "menunggu persetujuan" dan tidak perlu screen baru —
approval terjadi di muka, bukan setelah user mencoba masuk.

---

## Revisi 2 — hasil review wireframe di Penpot (2026-09-11)

Setelah wireframe Revisi 1 dibuat di Penpot (board A1–A7), muncul pertanyaan: A5 menampilkan badge
role read-only (mis. "Staf") — ini bisa disalahartikan sebagai "user baru otomatis jadi Staf". Nilai
itu sebenarnya cuma contoh placeholder, tapi kejadian ini membuka diskusi ulang: apakah field peran
perlu ditampilkan ke user sama sekali di A5, dan apakah whitelist murni (tanpa status pending) masih
sesuai. Hasilnya:

| # | Screen/Elemen | Revisi 1 (sebelumnya) | Revisi 2 (sekarang, final) |
|---|---|---|---|
| 1 | A5 · Lengkapi profil | Field "Peran Anda" read-only (badge, sudah di-set admin) | **Field peran dihapus dari A5.** Layar ini murni profil Google (foto, nama) + jabatan/divisi opsional — user tidak perlu tahu/lihat role-nya di layar ini. |
| 2 | Model registrasi | Whitelist murni: email yang belum di-invite admin → langsung ditolak | **Hybrid**: email yang sudah di-invite admin (role sudah di-set) → lanjut ke Beranda seperti biasa. Email yang **belum pernah** diinput admin sama sekali → **tidak langsung ditolak** — masuk ke screen baru **A8 "Menunggu konfirmasi admin"**. |
| 3 | A6 · Akses ditolak | Dipakai untuk kasus "email belum terdaftar/di-invite admin" | **Diganti fungsinya**: dipakai untuk akun yang **ditolak/dinonaktifkan eksplisit oleh admin** (mis. permintaan sudah ditinjau & ditolak) — bukan lagi untuk "belum terdaftar". |
| 4 | Jumlah screen | 7 board (A1–A7) | **8 board (A1–A8)** — tambah A8 "Menunggu konfirmasi admin". |
| 5 | Flow 1 (diagram) | Consent diberikan → cek whitelist di depan → TIDAK ke A6 / YA ke A5 | Consent diberikan → langsung ke A5 (tanpa gate whitelist di depan). Setelah A5 disimpan → baru dicek status admin: role sudah di-set → Beranda; belum ada keputusan → A8; ditolak eksplisit/dinonaktifkan → A6. |

### Model registrasi user baru — **Hybrid (invite dulu ATAU daftar sendiri lalu menunggu)**

Admin tetap bisa pre-invite user (email + role) seperti Revisi 1 — jalur cepat, begitu user login
pertama kali langsung lanjut ke Beranda tanpa hambatan. Tapi user yang login dengan akun Google yang
**belum pernah diinput admin sama sekali** tidak langsung ditolak: mereka melengkapi profil dulu (A5),
lalu melihat status "Menunggu konfirmasi admin" (A8) sampai admin meninjau & menetapkan role dari
panel Admin → "Kelola pengguna". A6 "Akses ditolak" dipakai kalau admin secara eksplisit menolak atau
menonaktifkan permintaan/akun tersebut.

### Screen (8 board)

| Screen | Ukuran | Posisi (x,y) | Fungsi |
|---|---|---|---|
| A1 · Splash | 390×844 | 120, 300 | Logo + loading; cek sesi tersimpan (aktif / tidak valid / belum ada) |
| A2 · Masuk | 390×844 | 590, 300 | Tombol besar "Masuk dengan Google" (satu-satunya jalur masuk) |
| A3 · Pilih akun | 390×844 | 1060, 300 | Pemilihan akun Google |
| A4 · Izin akses | 390×844 | 1530, 300 | Layar consent izin data (Batal → kembali ke A2; Izinkan → lanjut ke A5) |
| A5 · Lengkapi profil | 390×844 | 2000, 300 | Foto & nama tersinkron dari Google, jabatan/divisi opsional. **Tidak ada info role di sini.** |
| A6 · Akses ditolak | 390×844 | 2470, 300 | Error state: akun **ditolak/dinonaktifkan eksplisit** oleh admin |
| A7 · Keluar | 390×844 | 2940, 300 | Konfirmasi logout |
| A8 · Menunggu konfirmasi | 390×844 | 3410, 300 | Profil tersimpan; menunggu admin meninjau & menetapkan role |

### Alur (Flow 1 revisi 2)

```
A1 Splash → Cek sesi tersimpan?
   ├─ Aktif & valid                          → langsung ke Beranda
   ├─ Aktif tapi tidak valid (kedaluwarsa/     → pesan singkat "Sesi berakhir,
   │  dicabut/akun dinonaktifkan admin)          silakan masuk lagi" → A2
   └─ Belum ada sesi                          → A2 Layar Masuk

A2 Layar Masuk → tombol "Masuk dengan Google" (satu-satunya jalur)
   ↓
A3 Pilih akun Google
   ↓
A4 Setujui izin
   ├─ Batal / tolak  → kembali ke A2 (tanpa pesan error tambahan)
   └─ Izinkan        → lanjut langsung ke A5 (tanpa gate whitelist di depan)
        ↓
A5 Lengkapi profil (foto & nama dari Google, jabatan/divisi opsional — tanpa info role)
   ↓ Simpan & Lanjutkan
Cek status akun di sistem admin
   ├─ Role sudah di-set admin (di-invite / dikonfirmasi)   → Beranda sesuai peran
   ├─ Belum ada keputusan admin (baru pertama kali login)  → A8 "Menunggu konfirmasi admin"
   └─ Ditolak eksplisit / akun dinonaktifkan admin         → A6 "Akses ditolak"
```

**Logout** (tidak berubah): Profil → Keluar → A7 konfirmasi → token dicabut di perangkat →
kembali ke A2 Layar Masuk.

### Belum diterapkan ke `wireframe.md`

Perubahan di atas (Revisi 1 + Revisi 2) sudah diterapkan ke board Penpot (page "Login", project
JP-ATLAS-PM) tapi **belum** diterapkan ke `wireframe.md` (file "task-manager", page "wireframe") —
menunggu bagian-bagian lain selesai dibahas, atau instruksi eksplisit untuk apply sebagian.

---

## 2 · Struktur Navigasi Global — Beranda · Project · Task · Profile

**Status:** Dikunci 2026-09-13.

Landasan struktur sebelum breakdown alur per-role (dimulai dari Admin di Bagian 3). Ganti mental
model dari **fitur-sentris** (nav lama: Beranda·Tugas·Laporan·Meeting·Profil, 5 item) ke
**entitas-sentris** berbasis Project, menyusul entitas `Project` baru di backend (lihat memori
`project-entity-decision`: Project = folder pemilik task, `Task.projectId` NOT NULL + Inbox default
per-user).

### Perubahan vs `wireframe.md` saat ini

| # | Elemen | Sebelumnya | Jadi |
|---|---|---|---|
| 1 | Navigasi bawah | 5 item: Beranda · Tugas · Laporan · Meeting · Profil | **4 item, stabil**: Beranda · Project · Task · Profile |
| 2 | Entitas Project | Tidak ada di UI sama sekali | **Top-level baru** — folder pemilik task |
| 3 | Papan Bersama (P2) | Entry Menu Cepat + screen sendiri (semua tugas semua user) | **Melebur ke menu Project** — browsing semua project = overview semua kerja, entry Menu Cepat dihapus |
| 4 | Pengaturan (section 8) | Entry Menu Cepat + screen sendiri | **Pindah jadi sub-menu di dalam Profile** |
| 5 | Laporan (section 6) & Meeting (section 10) | Top-level nav (bagian dari 5 item lama) | **Turun jadi pintasan sekunder** di grid Menu Cepat pada Beranda — kapabilitas tetap ada, bukan tab nav utama |

**Kenapa Laporan & Meeting tidak dihapus, hanya diturunkan:** keduanya fitur yang cukup "berat" (beda
dari Papan Bersama/Pengaturan yang murni organisasi ulang) — mempertahankan aksesnya lewat Menu Cepat
lebih fleksibel (kapabilitas tak hilang, gampang di-upgrade jadi tab sendiri nanti kalau data
pemakaian membuktikan perlu) dan tetap sejalan dengan prioritas nav minimal untuk persona lansia
55–75 (`PAPER.md`) — makin sedikit tab utama, makin rendah beban kognitif.

### Aturan Project (baru)

- `Task.projectId` NOT NULL + Inbox default per-user (keputusan backend, lihat memori `project-entity-decision`).
- **Project picker di form Buat Tugas**: filter hanya status **ACTIVE** (sejalan dengan gating backend "add task hanya saat ACTIVE").
- **Menu Project** (list utama, tab nav): dikelompokkan 2 tab — **"Berjalan"** (ACTIVE + ON_HOLD + DRAFT) sebagai default, dan **"Arsip"** (COMPLETED + CANCELLED) terpisah, supaya jejak project tuntas/batal tetap bisa ditelusuri (selaras keputusan backend "tanpa cascade").
- **Visibilitas list project per role**: **Admin** melihat **semua project di organisasi** (orkestrasi penuh); **Manajer/Staf/Peninjau** hanya melihat project yang mereka **ikuti** (owner atau anggota).

### RBAC Project (CRUD) — Dikunci 2026-09-13

Beda dari matriks task lama (PAPER §16.2: Staf dapat "sendiri" untuk buat tugas) — Project adalah
wadah tim, bukan tugas personal disposable, jadi Staf **tidak** dapat hak "sendiri" di sini (staf yang
butuh wadah pribadi sudah difasilitasi Inbox default per user, lihat memori `project-entity-decision`).

| Aksi | Admin | Manajer | Staf | Peninjau |
|---|---|---|---|---|
| Lihat list project | Semua project | Yang diikuti (owner/anggota) | Yang diikuti | Yang diikuti |
| **Buat project** | ✓ (tim manapun) | ✓ — **hanya tim yang dia `managerId`-nya** | — (view-only) | — (view-only) |
| **Edit project** (nama/status/anggota) | ✓ (semua project) | ✓ — **hanya project milik tim yang dia `managerId`-nya** | — | — |
| **Batalkan project** (soft → status `CANCELLED`, **tanpa hard delete**) | ✓ (semua project) | ✓ — **hanya project milik tim yang dia `managerId`-nya** | — | — |
| Tambah task ke project | ✓ | ✓ | sendiri (ke project yang bisa dia lihat, project harus ACTIVE) | — |

**Kenapa scope Manajer dari `Team.managerId`, bukan keanggotaan tim:** konsisten dengan keputusan
[[team-scoping-multi-team-global-role]] — cakupan kelola datang dari `managerId`, bukan dari role atau
membership biasa. Manajer yang cuma jadi anggota bantu di tim lain (bukan pengelolanya) tidak bisa
buat/edit project atas nama tim itu.

### Detail lanjutan — Dikunci 2026-09-14

- **Definisi "anggota" project (untuk aturan visibilitas di atas)**: **derived**, bukan field baru —
  "ikut" project = anggota `Team` yang jadi `teamId` project itu, **atau** siapa saja yang pernah
  di-assign/membuat task di dalam project tsb (menangkap kasus lintas-tim). Tidak ada tabel member
  Project terpisah — konsisten dengan `project-entity-decision` ("tunggu pemicu nyata" sebelum tambah
  entitas).
- **Status default saat create: `ACTIVE`** — project baru langsung bisa diisi task tanpa langkah
  aktivasi manual (gate backend "add task hanya saat ACTIVE" jadi tidak menghambat pemakaian pertama).
- **Reassign `teamId` setelah project dibuat: boleh, oleh Admin ATAU Manajer pemilik (managerId tim
  project itu).** ⚠️ Risiko yang disadari & diterima: karena `teamId` menentukan scope kelola Manajer
  + visibilitas project, memindahkan project ke tim lain bisa membuatnya tiba-tiba di luar jangkauan
  Manajer yang tadinya mengelolanya (tanpa approval Admin). Belum ada mitigasi tambahan (mis. notifikasi
  ke Manajer lama) — dicatat sebagai keputusan sadar, bisa direvisi kalau jadi masalah nyata.

### Belum diterapkan ke `wireframe.md`

Struktur nav & aturan Project di atas baru didiskusikan di sini — belum diterapkan ke board Penpot
maupun `wireframe.md` master. Menunggu alur per-role (dimulai Admin) selesai dibahas.

---

## Revisi 2 — Bottom nav + FAB "Tambah" (2026-09-14)

Setelah Bagian 2 Revisi 1 & Bagian 3 dikunci, muncul proposal nav yang lebih hemat slot dengan pola
FAB tengah (rujukan pola umum: ikon kiri-kanan + tombol bulat tambah di tengah). Hasil diskusi ulang:

### Perubahan vs Revisi 1

| # | Elemen | Revisi 1 (2026-09-13) | Revisi 2 (sekarang) |
|---|---|---|---|
| 1 | Bottom nav | 4 item: Beranda · Project · Task · Profile | **4 tab + 1 FAB tengah**: Hari Ini · Semua · **[+ Tambah]** · Acara · Profil |
| 2 | Project & Task | 2 tab nav terpisah | Digabung jadi 1 tab **"Semua"** dengan 2 sub-tab (Project / Task) di dalamnya |
| 3 | Meeting/Acara | Diturunkan ke Menu Cepat (alasan: minim tab demi lansia) | **Naik lagi jadi tab utama "Acara"** — revisi sadar terhadap Revisi 1, dinilai cukup sering dipakai untuk layak jadi tab sendiri |
| 4 | Laporan | Diturunkan ke Menu Cepat | **Pindah ke sub-menu di dalam Profil**, sejajar Pengaturan — bukan top-level, bukan di Menu Cepat (RBAC Staf/Peninjau cuma "sendiri"/"lihat", bukan aksi primer) |
| 5 | Tombol "+" | Tidak ada elemen global — cuma "Tombol aksi utama" per role di konten Beranda | **FAB "Tambah"** ditambahkan sebagai elemen nav baru, global di semua tab (lihat detail di bawah); "Tombol aksi utama" tetap dipertahankan sebagai elemen terpisah di Beranda |

**Kenapa Acara boleh naik lagi padahal Revisi 1 sengaja menurunkannya:** setelah Project+Task dihemat
jadi 1 slot ("Semua"), ada slot nav yang lebih bermanfaat dipakai Acara daripada dibiarkan kosong.
Total item utama tetap terkendali (4 tab + 1 FAB), jadi prinsip minim beban kognitif Revisi 1 tetap
terjaga secara jumlah, walau komposisinya beda.

### FAB "Tambah" — per role

| Role | Perilaku tap FAB | Alasan |
|---|---|---|
| Admin | Action sheet 4 opsi: Tugas Baru · Project Baru · Acara Baru · Undang Pengguna | RBAC ✓ di semua kolom "buat" (`wireframe.md` §11) |
| Manajer | Action sheet 3 opsi: Tugas Baru · Project Baru (scoped ke tim `managerId`-nya) · Acara Baru | RBAC ✓ di 3 kolom; Project dibatasi scope tim yang dia kelola (lihat RBAC Project di atas) |
| Staf | **Langsung buka form Tugas Baru** (tanpa action sheet) | RBAC Staf cuma "sendiri" untuk task; Project view-only, Meeting cuma "ikut" — 1 opsi valid saja, action sheet jadi friksi tak perlu |
| Peninjau | **FAB disembunyikan** | RBAC nihil di semua kolom "buat" — tidak ada satupun hal valid untuk dibuat |

**Form Tugas Baru — field Project picker:** berlaku di semua entry point (FAB maupun Tombol aksi
utama), dropdown difilter status **ACTIVE** + visibilitas sesuai role (aturan ini sudah ada di "Aturan
Project" di atas, ditegaskan ulang berlaku juga di sini) — bukan input manual, termasuk Inbox default
milik sendiri untuk Staf.

### Status penerapan

Revisi nav di atas **sudah diterapkan ke board Penpot** (page "Beranda", project JP-ATLAS-PM) pada
2026-09-14 — lihat tabel board di Bagian 3. Belum diterapkan ke `wireframe.md` master.

---

## 3 · Beranda per-role

**Status:** Dikunci 2026-09-14. Board Penpot 4 varian (Admin/Manajer/Staf/Peninjau) sudah dibuat —
lihat tabel board di bawah.

Kerangka Beranda dipertahankan **sama** untuk semua role — App bar, Salam, Sekretaris AI, Banner
peringatan, Statistik, Saran AI, Kartu utama, Kartu sekunder, Menu Cepat, Tombol aksi utama — supaya
konsisten & tidak membingungkan persona lansia 55–75 (`PAPER.md`). Yang beda hanya **isi tiap elemen**,
mengikuti RBAC masing-masing role (`wireframe.md` §11 Flow 5).

Dua elemen di antaranya berasal dari kapabilitas AI, dengan peran berbeda:
- **Sekretaris AI** = ringkasan situasi terkini (apa yang terjadi)
- **Saran AI** = rekomendasi tindakan konkret (apa yang sebaiknya dilakukan)

### Isi per elemen per role

| Elemen | Admin | Manajer | Staf | Peninjau |
|---|---|---|---|---|
| Sekretaris AI | "3 pengguna menunggu konfirmasi Anda, dan 1 anomali kebijakan baru saja terdeteksi." | "2 anggota tim Anda kelebihan beban kerja, dan 1 tugas tim terlambat." | "Anda punya 2 tugas hari ini, 1 di antaranya sudah terlambat." | "4 hasil kerja sedang menunggu persetujuan Anda saat ini." |
| Banner peringatan | 🔴 Danger — "2 akun bermasalah & 1 pelanggaran kebijakan terdeteksi di organisasi." → *Lihat detail* | 🟡 Warning — "Beban kerja tim timpang — 2 anggota kelebihan tugas dibanding rata-rata tim." → *Audit anomali* | 🟡 Warning — "1 tugas Anda sudah melewati tenggat waktu." → *Lihat tugas* | 🟡 Warning — "2 item review sudah mengendap lebih dari 3 hari." → *Lihat antrean* |
| Statistik chip (3) | Project Aktif (12) · User Menunggu (3) · Anomali (1) | *Tugas Tim:* Hari Ini (8) · Selesai (5) · Terlambat (2) | Hari Ini (2) · Selesai (5) · Terlambat (1) — milik sendiri | Menunggu Review (4) · Disetujui (9) · Dikembalikan (1) |
| Saran AI | Project "Renovasi Gudang" mandek Draft 7 hari → pertimbangkan tindak lanjut | Redistribusi 3 tugas dari Andi ke anggota yang bebannya lebih longgar | Kerjakan "Laporan Mingguan" dulu — tenggat paling dekat | Prioritaskan review "Desain Kemasan v2" — sudah menunggu 3 hari |
| Kartu utama | "Pengguna menunggu konfirmasi" — 3 akun baru menunggu persetujuan → *Kelola pengguna* | "Ringkasan Tim" — 7 anggota aktif · 8 tugas tim berjalan → *Dashboard tim* | **Diganti**: 3 kartu "Tugas Hari Ini" (judul + label Project + waktu/status terlambat) | "Menunggu Persetujuan" — 4 hasil kerja perlu ditinjau → *Tinjau sekarang* |
| Kartu sekunder | "Aktivitas terbaru" — ringkasan log audit 24 jam → *Lihat log aktivitas* | "Anggota beban tinggi" — 2 anggota melebihi kapasitas → *Pantau beban* | "Rapat Berikutnya" — Sinkronisasi Tim · Besok 09.00 → *Lihat detail* | *(tidak ada)* |
| Menu Cepat | Kelola pengguna · Peran & izin · Aturan & kebijakan · Tata kelola AI · Log aktivitas | Tugaskan · Pantau Beban · Audit Anomali | *(dihapus — lihat Revisi 2 Bagian 2)* | *(dihapus — lihat Revisi 2 Bagian 2)* |
| Tombol aksi utama | "+ Project Baru" | "+ Tugaskan tugas" | "+ Buat Tugas" | *(tidak ada)* |

### Poin kunci

1. **Admin** — Beranda bukan soal tugas pribadi Admin, tapi **kesehatan sistem**. Kartu utama
   "Pengguna menunggu konfirmasi" nyambung ke flow **A8** yang sudah dikunci di Bagian 1 — Beranda
   Admin jadi pusat aksi approval user baru.
2. **Manajer** — Beranda **tim-sentris**, bukan personal-sentris, meski RBAC-nya tetap boleh
   mengerjakan tugas sendiri (bisa jadi kartu sekunder terpisah kalau perlu, belum digambar di sini).
3. **Peninjau** — paling beda strukturnya: RBAC-nya **tidak** mengerjakan/membuat tugas sama sekali
   (hanya approve/kembalikan + lihat). Karena itu: tidak ada "Tugas Hari Ini", tidak ada tombol "+ Buat",
   tidak ada kartu sekunder Meeting, **tanpa Menu Cepat & tanpa FAB "Tambah"** (lihat Revisi 2 Bagian 2
   — Peninjau nihil hak "buat" di semua kolom RBAC).
4. **Staf** — paling minim berubah karena memang basis desain lama; perubahan meliputi penambahan
   label Project di tiap kartu tugas (menyusul entitas Project baru, lihat Bagian 2), **serta Menu
   Cepat dihapus** (isinya dulu Laporan & Meeting, keduanya pindah ke lokasi lain — lihat Revisi 2
   Bagian 2). FAB "Tambah" untuk Staf langsung buka form Tugas Baru tanpa action sheet.

### Board Penpot (4 varian, page "Beranda", project JP-ATLAS-PM)

| Board | Ukuran | Posisi (x,y) | Catatan |
|---|---|---|---|
| Beranda · Admin | 390×1206 | 0, 0 | Kartu utama tunggal + menu cepat 6 item (2 baris) |
| Beranda · Manajer | 390×1195 | 460, 0 | Label "Tugas Tim" di atas statistik + menu cepat 5 item |
| Beranda · Staf | 390×1208 | 920, 0 | 3 kartu "Tugas Hari Ini" menggantikan kartu utama tunggal |
| Beranda · Peninjau | 390×881 | 1380, 0 | Tanpa kartu sekunder & tanpa tombol aksi; menu cepat 1 item |

Semua board sudah diperbarui ke bottom nav **Revisi 2** (Bagian 2): **Hari Ini · Semua · [+ Tambah,
FAB tengah] · Acara · Profil**. FAB tampil untuk Admin/Manajer/Staf, disembunyikan untuk Peninjau
(sesuai RBAC). Gaya visual mengikuti page "Login" — primer `#2f6fed`, font Source Sans Pro, radius
kartu 12–14, border `#e5e7eb`.

### Belum diterapkan ke `wireframe.md`

Board di atas sudah dibuat di Penpot (project JP-ATLAS-PM, page "Beranda"), termasuk nav Revisi 2,
tapi **belum** diterapkan ke `wireframe.md` master — menunggu Bagian 5 (alur lengkap Admin per-screen)
selesai dibahas.

---

## 4 · Menu Acara — Struktur, Alur & Titik AI

**Status:** Dikunci 2026-09-14. Menyusul tab "Acara" naik jadi bottom nav utama di Bagian 2 Revisi 2.
Detail di bawah melengkapi 6 screen (M1–M6) yang sudah ada di `wireframe.md` §10 "Meeting & Acara" —
belum ada screen baru, hanya penambahan elemen & aturan di dalamnya.

### Struktur & alur

```
Tab "Acara" (landing)
└─ M1 Agenda — list acara, flat kronologis + header (Hari ini/Besok/Minggu ini/Lewat)
   ├─ banner ringkas Sekretaris AI di atas list
   ↓ tap kartu acara
   M3 Detail Acara (info + peserta + status hadir)
        ├─→ M4 Notulen (catatan rapat, dibantu Sekretaris AI)
        └─→ M5 Pengingat (reminder manual per-acara, tanpa AI)
   [list kosong] → M6 Empty (CTA "Buat Acara" untuk role berhak)

FAB "Tambah" (Admin/Manajer) → M2 Buat Acara (dibantu Saran AI — deteksi bentrok jadwal)
```

**Kenapa list flat, bukan sub-tab Mendatang/Riwayat:** beda dari Project (ACTIVE/ON_HOLD/DRAFT vs
COMPLETED/CANCELLED — axis status backend nyata), Acara tidak punya axis status seperti itu — bedanya
cuma waktu. Sub-tab di sini cuma nambah lapis navigasi tanpa manfaat nyata, bertentangan dengan minim
beban kognitif persona lansia 55–75 (`PAPER.md`). Header kronologis kasih pemisahan visual tanpa perlu
tap pindah tab.

### Visibilitas list acara per role

Disamakan dengan pola visibilitas Project (bukan "semua role lihat semua acara org") — supaya mental
model konsisten antar entitas, dan Peninjau tidak kebanjiran info rapat internal yang tak relevan
buatnya.

| Role | Visibilitas |
|---|---|
| Admin | Semua acara di organisasi |
| Manajer | Acara milik tim yang dia `managerId`-nya, ditambah acara di tim lain yang dia diundang |
| Staf | Hanya acara yang dia diundang |
| Peninjau | Hanya acara yang dia diundang |

### RBAC baru — Notulen

Beda dari RBAC "Kelola meeting & event" (create/edit acara) di `wireframe.md` §11, menulis draft
catatan notulen dibuka lebih luas karena sekadar dokumentasi, bukan wewenang kelola:

| Aksi | Admin | Manajer | Staf | Peninjau |
|---|---|---|---|---|
| Tulis draft catatan mentah | ✓ | ✓ | ✓ (kalau peserta) | ✓ (kalau peserta) |
| Minta Sekretaris AI rapikan jadi notulen | ✓ | ✓ | ✓ (kalau peserta) | ✓ (kalau peserta) |
| Finalisasi/kunci notulen resmi | ✓ | ✓ (acara timnya) | — | — |

### Titik AI — 3 lokasi, dikunci

| Titik | Peran AI | Keputusan |
|---|---|---|
| **M1 Agenda** | Sekretaris AI — ringkasan situasi | Banner ringkas di atas list, mis. *"2 rapat mendatang minggu ini, 1 belum ada agenda."* Mengisi gap karena Sekretaris AI di Beranda tidak menyebut acara sama sekali (lihat tabel Bagian 3). |
| **M2 Buat Acara** | Saran AI — rekomendasi tindakan | Deteksi bentrok jadwal peserta terpilih saat isi form → suggestion box dengan alternatif waktu, mis. *"3 dari 5 peserta sudah ada acara jam ini, sarankan waktu lain: [opsi]."* Tidak diterapkan di M5 — M5 murni setting manual. |
| **M4 Notulen** | Sekretaris AI — rapikan catatan | User ketik catatan kasar (bukan rekam audio — hindari beban infra & risiko privasi rapat sensitif) → AI merapikan jadi format terstruktur: Ringkasan · Keputusan · Item Tindak Lanjut. |

**Ditahan (belum ada pemicu nyata):** item tindak lanjut di notulen **tidak** otomatis jadi Task baru —
relasi baru Event↔Task belum punya kebutuhan konkret (prinsip yang sama dipakai di
[[project-entity-decision]] — tunggu pemicu nyata sebelum tambah entitas/relasi). Tetap teks biasa di
notulen; convert-to-task manual bisa ditambah nanti kalau dibutuhkan.

### Relasi ke Project

**Standalone** — Acara tidak terhubung ke Project (tidak ada `projectId`). Sama alasan seperti di atas:
belum ada pemicu nyata yang butuh relasi ini; mudah ditambah kalau kebutuhan konkret muncul (mis.
"lihat riwayat rapat dari halaman detail Project").

### Belum diterapkan ke `wireframe.md`

Struktur, RBAC notulen, dan titik AI di atas baru didiskusikan di sini — belum diterapkan ke
`wireframe.md` master §10 "Meeting & Acara" maupun board Penpot. §10 saat ini baru berisi 6 screen
(M1–M6) tanpa detail elemen AI atau aturan visibilitas per role di atas.

---

## 6 · Menu Profil — Struktur, Alur & RBAC Laporan

**Status:** Dikunci 2026-09-14. Menyusul keputusan Bagian 2 (Pengaturan & Laporan pindah jadi sub-menu
di dalam Profile) — bagian ini mengunci struktur & alur layar Profil sendiri, yang sebelumnya cuma
disinggung sambil lalu di diskusi nav, belum pernah dibedah detail.

### Perubahan vs `wireframe.md` saat ini

| # | Elemen | Sebelumnya | Jadi |
|---|---|---|---|
| 1 | P1 · Profil Saya | Fungsi: "Tugas milik sendiri & detailnya" | **Usang, dihapus.** Fungsi tugas pribadi pindah total ke tab **Semua → sub-tab Task** (lihat Bagian 2). Profil tidak lagi menampilkan daftar tugas. |
| 2 | Pengaturan (§8) | Screen sendiri di top-level: Akun, Notifikasi, Aksesibilitas, **Keluar** (satu paket) | **Keluar dikeluarkan** dari Pengaturan, naik jadi item terpisah di layar Profil utama (lihat struktur di bawah). Pengaturan sisa: Akun, Notifikasi, Aksesibilitas. |
| 3 | Laporan (§6) | Top-level nav (5 item lama) → diturunkan ke Menu Cepat (Revisi 2 Bagian 2) | **Pindah lagi**, jadi sub-menu di dalam Profil (bukan Menu Cepat) — sejajar Pengaturan. |
| 4 | Isi menu Profil | Belum ada spek | **Baru**: Laporan · Pengaturan · Bantuan/FAQ · Tentang aplikasi · Keluar |

### Struktur layar Profil

Sama untuk semua role — yang beda hanya isi tiap item (RBAC), bukan strukturnya.

**Header:** Foto + Nama + Jabatan/Divisi (tersinkron dari A5) + **role/badge ditampilkan di sini** —
sengaja beda dari A5 "Lengkapi profil" yang justru menyembunyikan info role saat user baru pertama
login (lihat Bagian 1 Revisi 2, poin field peran dihapus dari A5). Di Profil, setelah akun aktif,
menampilkan role tidak lagi berisiko disalahartikan sebagai "role default" seperti kejadian di A5.

**List menu (urutan tetap, isi beda per role):**

| # | Item | Fungsi |
|---|---|---|
| 1 | Laporan | Buka §6 "Laporan & Ekspor" — akses beda per role (lihat RBAC di bawah) |
| 2 | Pengaturan | Akun, Notifikasi, Aksesibilitas (Keluar sudah dikeluarkan dari sini) |
| 3 | Bantuan/FAQ | Baru — belum ada screen-nya, perlu didesain terpisah |
| 4 | Tentang aplikasi | Baru — belum ada screen-nya, perlu didesain terpisah |
| 5 | Keluar | Item terpisah, dipisah dari Pengaturan → tap → tetap ke A7 konfirmasi keluar (flow tidak berubah, lihat Bagian 1) |

**Kenapa Keluar dipisah dari Pengaturan, dan kenapa bukan ditaruh di app bar dekat titik notifikasi:**
sempat dipertimbangkan taruh di app bar Beranda (dekat titik notifikasi), tapi ditolak — app bar
Beranda sudah padat (Judul, menu ☰, avatar, titik notifikasi merah), dan Keluar adalah aksi destruktif
yang berisiko ke-tap gak sengaja kalau cuma jadi ikon tanpa label di situ, apalagi untuk persona lansia
55–75 (`PAPER.md`) yang butuh label jelas, bukan ikon ambigu. Ditaruh sebagai baris berlabel jelas di
layar Profil, dipisah dari Pengaturan supaya cepat dijangkau tanpa masuk 2 layar dulu, tapi tetap lewat
A7 konfirmasi sebagai pengaman dari ke-tap tidak sengaja.

### RBAC Laporan — Dikunci 2026-09-14

| Role | Akses Laporan |
|---|---|
| Admin | Full — semua jenis laporan (Pusat/Harian/Mingguan/Per-anggota) + ekspor, org-wide |
| Manajer | Full, **scoped ke tim yang dia `managerId`-nya** (konsisten [[team-scoping-multi-team-global-role]]) |
| Staf | Cuma laporan miliknya sendiri, tanpa akses laporan tim/org |
| Peninjau | Lihat-saja, tanpa ekspor |

### Kelola pengguna / Kelola Tim — tetap di Menu Cepat, tidak dobel di Profil

Sempat dipertimbangkan taruh "Kelola pengguna" (Admin, §9) & "Kelola Tim" (Manajer, §5) juga sebagai
entry point di Profil, tapi diputuskan **tidak** — keduanya tetap murni lewat Menu Cepat Beranda + FAB
"Tambah" (lihat Bagian 2 & 3). Profil dikunci sebagai menu **murni personal**; tools manajemen
org/tim tidak digandakan ke sini. Dipertegas juga: Manajer memang **tidak** punya kemampuan kelola
keanggotaan tim (tambah/hapus/ubah role anggota) — itu murni domain Admin (`Team` di-manage di level
org, bukan per-manajer, konsisten [[team-scoping-multi-team-global-role]]); "Kelola Tim" milik Manajer
cuma soal tugas & beban kerja (Tugaskan/Alihkan/Pantau Beban/Audit Anomali), bukan soal akun.

### Belum diterapkan ke `wireframe.md`

Struktur & keputusan di atas baru dikunci di sini — belum diterapkan ke board Penpot maupun
`wireframe.md` master. Screen baru "Bantuan/FAQ" dan "Tentang aplikasi" juga belum pernah didesain
sama sekali (belum ada di Penpot). §8 "Pengaturan" & §6 "Laporan & Ekspor" di `wireframe.md` juga perlu
disesuaikan (Keluar dipindah keluar dari §8; RBAC per role di atas belum tercermin di §6).

---

## 7 · Menu Project — List, Filter AI "Perlu Perhatian" & Aksi Kartu

**Status:** Dikunci 2026-09-14. Melengkapi "Aturan Project" & "RBAC Project (CRUD)" di Bagian 2 dengan
detail layar list project itu sendiri (tab **Semua** → sub-tab **Project** → sub-tab **Berjalan**/
**Arsip**, sudah dikunci di Bagian 2) — sebelumnya baru aturan data, belum ada spek tampilan & aksi.

### Tampilan awal — card list + tombol create

- Card project ditampilkan di sub-tab **Berjalan** (default) & **Arsip**, mengikuti visibilitas per
  role yang sudah dikunci (Admin: semua project org; Manajer/Staf/Peninjau: yang diikuti).
- **Tombol "+ Project Baru" di header list** — redundant dengan FAB "Tambah" global (Bagian 2 Revisi
  2), tapi sengaja dipertahankan dua-duanya: FAB = akses cepat dari tab manapun, tombol header = jelas
  konteksnya "nambah ke sini" saat user memang sedang di layar Project. Sama seperti pola FAB +
  Tombol aksi utama di Beranda (Bagian 2 poin 3) — dua entry point, beda peran, bukan duplikasi sia-sia.
- Muncul untuk **Admin** (tim manapun) & **Manajer** (scoped tim `managerId`-nya) — mengikuti RBAC
  "Buat project" yang sudah dikunci di Bagian 2. **Staf/Peninjau tidak melihat tombol ini** (view-only).

### Banner AI "Perlu Perhatian" (hanya sub-tab Berjalan)

Menerapkan filosofi deteksi anomali `PAPER.md` §10.2 (**heuristik berbasis aturan yang bisa
dijelaskan, bukan skor AI buram** — Rule 20 anti-klaim ML berlebihan) ke level Project, memakai sinyal
yang sudah ada di data — bukan mekanisme AI baru:

| Kriteria | Sinyal | Sumber data |
|---|---|---|
| **Mandek** | Status `DRAFT`/`ON_HOLD` lebih dari **N hari** tanpa perubahan | `Project.status` + timestamp transisi terakhir |
| **Overdue menumpuk** | Rasio task overdue tinggi di dalam project | Task anak dengan deadline lewat, `deletedAt IS NULL` |
| **Banyak terhambat** | Banyak task anak dengan `blockedAt` aktif | Sumbu `blockedAt` — [[state-machine-lifecycle-decision]] |

- Tampil sebagai **banner ringkas di atas list** (pola sama seperti banner Sekretaris AI di M1 Agenda,
  Bagian 4), mis. *"2 project butuh perhatian: 1 mandek Draft 7 hari, 1 overdue task-nya menumpuk"* →
  tap untuk filter list ke project yang di-flag. **Bukan** filter chip statis — banner cuma muncul
  kalau ada yang perlu di-flag, konsisten pola "tawaran/tanda, bukan skor" di PAPER §10.2 & §10.6.
- **Threshold N hari TIDAK dikarang di sini** — mengikuti PAPER §10.5 (threshold molor harus bisa
  diatur pengguna, bukan angka tetap dari desain). Rumahnya: Menu Cepat **"Aturan & kebijakan"** milik
  Admin (Bagian 3), yang memang sudah ada sebagai tempat pengaturan kebijakan org-wide.
- **Setiap flag wajib disertai alasan terbaca** (nama project + kriteria yang kena), tidak pernah cuma
  angka/skor — konsisten §10.2 "anomali disertai alasan yang bisa dibaca".
- **Visibilitas banner**: muncul untuk role manapun yang bisa melihat project itu (transparansi, bukan
  fitur eksklusif Admin/Manajer) — tapi CTA-nya beda: Admin/Manajer dapat *"Tindak lanjut"* (buka
  project, bisa reaktivasi/edit); Staf/Peninjau cuma *"Lihat detail"* (non-actionable, konsisten RBAC
  view-only mereka di Bagian 2 — melihat sinyal boleh, bertindak tidak).

### Aksi per card — Edit & Batalkan (bukan "Hapus")

- Affordance: menu **"⋯"** di tiap card, isi **Edit** & **Batalkan Project** — hanya muncul untuk role
  yang RBAC-nya mengizinkan (Admin: semua card; Manajer: hanya card project tim `managerId`-nya). Staf/
  Peninjau **tidak melihat menu "⋯" sama sekali** (view-only, tidak ada satu pun aksi valid untuk
  mereka di sini — sejalan prinsip FAB Peninjau di Bagian 2: nihil opsi valid → elemen disembunyikan,
  bukan ditampilkan lalu ditolak).
- **"Batalkan Project" = soft, bukan hard delete.** Aksi ini men-set `Project.status = CANCELLED`,
  **tidak** menghapus record atau cascade ke task di dalamnya — konsisten alasan lahirnya entitas
  Project itu sendiri ([[project-entity-decision]]: Project = rumah permanen buat record tuntas/batal;
  menghapusnya beneran justru menghapus tujuan Project ada). Sengaja dilabeli **"Batalkan"**, bukan
  "Hapus", supaya bahasa UI jujur ke user bahwa ini bukan aksi destruktif/hilang-permanen.
- **Konfirmasi wajib sebelum eksekusi** (dialog "Batalkan project ini? Task di dalamnya tetap
  tersimpan.") — aksi sensitif tidak boleh diam-diam, pola sama dengan konfirmasi Keluar (A7, Bagian 1)
  & prinsip PAPER "aksi sensitif → approval, bukan otomatis".
- Project yang sudah `CANCELLED` pindah tampil di sub-tab **Arsip** (Bagian 2). **Tidak ada hard
  delete di UI mana pun** untuk Project — beda dari Task yang punya pola sampah 30-hari
  ([[state-machine-lifecycle-decision]]), Project memang sengaja tanpa jalur hilang permanen.

### Open question (belum dibahas)

- **Transisi balik dari `CANCELLED`** (mis. Admin/Manajer sadar salah batal, mau aktifkan lagi) —
  apakah legal & lewat tombol apa, belum didefinisikan di `LEGAL_TRANSITIONS` backend maupun di sini.
  Dicatat sebagai edge case terbuka, bukan diasumsikan otomatis boleh.

### Belum diterapkan ke `wireframe.md`

Struktur di atas baru dikunci di sini — belum ada screen Project sama sekali di board Penpot maupun
`wireframe.md` master (entitas Project memang baru, lihat Bagian 2). Menunggu Bagian 5 (alur lengkap
Admin per-screen) atau instruksi eksplisit untuk mulai desain board Penpot-nya.

---

## 8 · Sub-tab Task (dalam tab "Semua") — List, Filter & RBAC CRUD

**Status:** Dikunci 2026-09-14. Melengkapi tab **Semua** → sub-tab **Task** (pasangan sub-tab Project
yang sudah dikunci di Bagian 2 & 7) — sebelumnya baru struktur nav, belum ada spek tampilan, filter,
maupun RBAC create/edit/delete. Sub-tab ini juga jadi **pewaris fungsi Papan Bersama** (`PAPER.md`
§16.6 — "semua tugas semua user", filter per orang/status/prioritas) yang sempat disebut melebur ke
menu Project di Bagian 2 sebelum nav direvisi ulang jadi tab "Semua" dengan 2 sub-tab.

### Tampilan awal — list & filter

- Card task lintas project (judul, label Project, status, tenggat), mengikuti visibilitas per role
  (lihat tabel di bawah).
- **Search**: judul task.
- **Filter**: Status (`OPEN`/`IN_PROGRESS`/`IN_REVIEW`/`REOPENED`/`DONE`) · Project · Assignee/PJ
  (khusus Admin/Manajer) · rentang tenggat.
- **Filter "⚠️ Perlu Perhatian"** — bukan kolom/flag baru, translate langsung dari deteksi anomali
  on-the-fly yang sudah ada di [[taskevent-audit-log-decision]] (overdue, `blockedAt` aktif,
  `rescheduleCount≥3`, stalled/mangkrak) — konsisten prinsip "hitung on-the-fly, jangan simpan
  verdict". Nama sengaja "Perlu Perhatian" bukan "Danger", selaras nada §16.6 "bukan surveillance,
  fokus butuh-bantuan bukan siapa-salah" — sama prinsip dengan banner AI Bagian 7 (Project).
- **Filter/tab "Sampah"** — list task ber-`deletedAt` dalam window restore 30 hari (lihat CRUD di
  bawah), ditaruh di sub-tab Task ini sendiri (bukan di Profil/Pengaturan) supaya dekat konteks dan
  semua role yang berhak hapus tak perlu pindah layar buat restore.

### Visibilitas list — Dikunci

Pola sama persis dengan visibilitas Project ([[project-entity-decision]], Bagian 2) — konsisten
[[team-scoping-multi-team-global-role]]:

| Role | Visibilitas |
|---|---|
| Admin | Semua task di organisasi |
| Manajer | Task dalam tim yang dia `managerId`-nya |
| Staf | Task terkait dia saja (creator atau assignee) |
| Peninjau | Task yang perlu dia-review (`reviewerId`) |

### Create task dari sub-tab ini

Entry point baru — tombol "+" di header list, sama pola dengan tombol header Bagian 7 (Project):
redundant dengan FAB "Tambah" global (Bagian 2 Revisi 2) & Tombol aksi utama di Beranda, tapi sengaja
dipertahankan (FAB/Tombol aksi = akses cepat dari tab manapun; tombol di sini = jelas konteksnya
"nambah ke sini" saat user memang sedang di layar Task). **Bukan form baru** — buka form "Tugas Baru"
yang sama (Project picker filter status `ACTIVE` + visibilitas sesuai role, lihat "Aturan Project" di
Bagian 2). Beda dari FAB Admin/Manajer: di sini konteks sudah pasti Task, jadi langsung buka form
tanpa action sheet. Peninjau tidak melihat tombol ini (nihil RBAC "buat").

### RBAC CRUD Task — Dikunci

| Aksi | Admin | Manajer | Staf | Peninjau |
|---|---|---|---|---|
| Lihat list task | Semua task org | Task tim yang dia `managerId`-nya | Task terkait dia (creator/assignee) | Task yang perlu dia-review |
| Buat task | ✓ | ✓ | ✓ (sendiri) | — |
| Edit/update task | ✓ (semua yang terlihat) | ✓ (scope tim) | ✓ (task sendiri) | — |
| Hapus task (soft-delete) | ✓ (semua yang terlihat) | ✓ (scope tim) | ✓ (task sendiri) | — |

**Kenapa Edit = kapabilitas "Kerjakan & update tugas" yang sudah ada (`PAPER.md` §16.2), bukan
kapabilitas baru:** update dan edit secara konsep sama — matriks lama sudah beri ✓ ke Admin/Manajer/
Staf; yang baru dikunci di sini cuma scope ownership eksplisit per role (matriks lama tak
memisahkannya). Reschedule (ganti tenggat) tetap event backend terpisah (`RESCHEDULED`, nambah
`rescheduleCount`) di dalam alur Edit yang sama — beda di level backend, bukan beda kapabilitas RBAC.

**Kenapa Delete perlu dikunci baru:** `PAPER.md` §16.2 tidak punya baris delete task sama sekali —
gap yang baru disadari di diskusi ini (beda dari Project yang pakai "Batalkan"/soft-status, Task
sudah punya mekanisme sendiri di backend). Backend-nya sudah siap: soft-delete `deletedAt`, restore
30 hari, wajib konfirmasi dulu sebagai aksi sensitif (lihat [[state-machine-lifecycle-decision]]).
Scope hak hapus ikut pola visibilitas/edit di atas — bukan role terpisah.

### Belum diterapkan ke `wireframe.md`

Struktur, filter, dan RBAC CRUD Task di atas baru dikunci di sini — belum diterapkan ke board Penpot
maupun `wireframe.md` master. Filter "Perlu Perhatian" & "Sampah" belum pernah didesain sama sekali
di Penpot.
