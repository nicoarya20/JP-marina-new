# Wireframe — Task Manager Lansia

Dokumen sinkronisasi untuk halaman **`wireframe`** di Penpot (file *task-manager*).
Semua screen & flow aplikasi dikumpulkan dalam satu halaman agar mudah dianalisa.

- **Sumber:** Penpot → file `task-manager` → page `wireframe`
- **Total board:** 59 (Beranda/Halaman Utama + 55 screen + Pengaturan 2-potong + Flow5 RBAC 2-potong)
- **Konsep produk:** lihat `PAPER.md` (persona lansia 55–75, tema "Oatmeal & Espresso", AI sebagai project-manager + sekretaris, multi-channel in-app · email · Telegram)
- **Peran (RBAC):** Admin · Manajer · Staf · Peninjau

Layout memakai grid berlabel: tiap bagian = satu baris horizontal, judul bagian di atasnya.
Screen ponsel 390 lebar (pitch 470), kartu flow 440 lebar (pitch 500), matriks RBAC 620 lebar.

---

## 0 · Beranda (Halaman Utama) — Dashboard Staf (y≈300, x≈3520)

Layar utama setelah login: pusat harian staf. Diletakkan sebagai **band 0** di kanan-atas kanvas agar menonjol. Board tunggal 390×1660 (dashboard vertikal, dapat digulir).

| Elemen | Fungsi |
|---|---|
| App bar | Judul "Beranda", tombol menu ☰, avatar pengguna, titik notifikasi merah (indikator peringatan) |
| Salam | "Selamat pagi, Budi" + tanggal lengkap |
| Sekretaris AI | Ringkasan naratif hari ini + tautan "Lihat rencana hari ini →" |
| Peringatan | Banner amber bila ada anomali (mis. tugas terlambat) + aksi "Tangani sekarang →" |
| Statistik cepat | 3 chip: Hari ini · Selesai · Terlambat (angka besar, Terlambat merah) |
| Saran AI | Rekomendasi urutan kerja + aksi "Terima" / "Nanti saja" |
| Tugas Hari Ini | 3 kartu tugas + meta + pill status (Mendesak/Berjalan/Antre) |
| Rapat Berikutnya | Kartu meeting terdekat (waktu, ruang, jumlah peserta) |
| Menu Cepat | Grid pintasan penunjang: Tugas · Laporan · Meeting · Papan Bersama · Pengaturan · Profil |
| Navigasi bawah | Beranda (aktif) · Tugas · Laporan · Meeting · Profil |

- **Peringatan & Saran AI bersifat kondisional** — hanya tampil bila ada; di wireframe ditampilkan sebagai contoh state "ada".

## 1 · Autentikasi — Login Google → Logout (y≈300)

Alur masuk memakai akun Google, dirancang berhuruf besar & tombol lebar untuk lansia.

| Screen | Ukuran | Posisi (x,y) | Fungsi |
|---|---|---|---|
| A1 · Splash | 390×844 | 120, 300 | Logo + loading saat aplikasi dibuka |
| A2 · Masuk | 390×844 | 590, 300 | Tombol besar "Masuk dengan Google" |
| A3 · Pilih akun | 390×844 | 1060, 300 | Pemilihan akun Google |
| A4 · Izin akses | 390×844 | 1530, 300 | Layar consent izin data |
| A5 · Lengkapi profil | 390×1050 | 2000, 300 | Isi nama, peran, foto profil |
| A6 · Akses ditolak | 390×844 | 2470, 300 | Error state bila izin ditolak |
| A7 · Keluar | 390×844 | 2940, 300 | Konfirmasi logout |

## 2 · Alur Harian Staf — Mobile (y≈1610)

Perjalanan inti pengguna staf sehari-hari (onboarding sampai konfirmasi).

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| 1 Onboarding | 390×844 | 120, 1610 | Perkenalan singkat aplikasi |
| 2 Hari Ini | 390×844 | 590, 1610 | Daftar tugas hari ini |
| 3 Buat Tugas | 390×844 | 1060, 1610 | Form buat tugas cepat |
| 4 Detail Tugas | 390×844 | 1530, 1610 | Rincian sebuah tugas |
| 5 Konfirmasi | 390×844 | 2000, 1610 | Konfirmasi aksi/selesai |
| 6 Telegram | 390×844 | 2470, 1610 | Contoh kanal opsional (Telegram) |

## 3 · Tugas — Buat · Kelola · Hapus · Tunda · Desakan (y≈2714)

Semua kasus siklus hidup tugas termasuk tugas turunan, checklist, assign & lampiran (di T2), serta eskalasi pengingat 3 tingkat.

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| T1 Semua Tugas | 390×844 | 120, 2714 | Daftar seluruh tugas |
| T2 Detail Tugas | 390×2036 | 590, 2714 | Subtask, checklist, assign orang, lampiran file |
| T3 Buat Tugas | 390×1333 | 1060, 2714 | Form buat tugas lengkap |
| T4 Ubah Tugas | 390×813 | 1530, 2714 | Edit tugas |
| T5 Hapus Konfirmasi | 390×844 | 2000, 2714 | Dialog konfirmasi hapus |
| T6 Tunda Tugas | 390×1027 | 2470, 2714 | Menunda/menjadwalkan ulang |
| T7 Empty State | 390×844 | 2940, 2714 | Kondisi belum ada tugas |
| T8 Desakan L1 Lembut | 390×844 | 3410, 2714 | Pengingat tingkat 1 (lembut) |
| T9 Desakan L2 Tegas | 390×844 | 3880, 2714 | Pengingat tingkat 2 (tegas) |
| T10 Desakan L3 Mendesak | 390×844 | 4350, 2714 | Pengingat tingkat 3 (mendesak) |
| T11 Pusat Notifikasi | 390×975 | 4820, 2714 | Kumpulan notifikasi |

## 4 · Profil & Papan Bersama (y≈5010)

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| P1 Profil Saya | 390×844 | 120, 5010 | Tugas milik sendiri & detailnya |
| P2 Papan Bersama | 390×1072 | 590, 5010 | Semua tugas semua user — pengawasan bersama |

## 5 · Manajer — Kelola Tim (y≈6342)

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| G1 Dashboard Tim | 390×1029 | 120, 6342 | Ringkasan kinerja tim |
| G2 Tugaskan | 390×1019 | 590, 6342 | Menugaskan tugas ke anggota |
| G3 Detail Alihkan | 390×1024 | 1060, 6342 | Alihkan/reassign tugas |
| G4 Pantau Beban | 390×1186 | 1530, 6342 | Pantau beban kerja anggota |
| G5 Audit Anomali | 390×997 | 2000, 6342 | Deteksi anomali/keterlambatan |

## 6 · Laporan & Ekspor (y≈7788)

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| Laporan — Pusat | 390×1126 | 120, 7788 | Pusat laporan |
| Laporan — Harian | 390×829 | 590, 7788 | Laporan harian |
| Laporan — Mingguan | 390×814 | 1060, 7788 | Laporan mingguan |
| Laporan — Per anggota | 390×821 | 1530, 7788 | Laporan per anggota |
| Format & ekspor | 390×1541 | 2000, 7788 | Pilihan format ekspor (PDF/Excel/CSV) |
| Contoh dokumen | 390×936 | 2470, 7788 | Contoh dokumen laporan jadi |

## 7 · Pimpinan — Dashboard Eksekutif (y≈9589)

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| Dashboard eksekutif | 390×1188 | 120, 9589 | Ringkasan tingkat pimpinan |

## 8 · Pengaturan (y≈11037)

Tersalin sebagai 2 potong bertumpuk (title-bar + isi), tampil utuh sebagai satu layar.

| Elemen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| appBar | 390×76 | 120, 11037 | Judul "Pengaturan" |
| content | 390×1537 | 120, 11113 | Akun, Notifikasi (in-app/email/Telegram/jam tenang), Aksesibilitas (ukuran teks, kontras, kurangi animasi, baca layar), Keluar |

## 9 · Admin — Orkestrasi (y≈12910)

Peran admin mengorkestrasi tugas & pengguna, dibantu saran AI.

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| Panel | 390×1035 | 120, 12910 | Panel orkestrasi + saran Sekretaris AI |
| Kelola pengguna | 390×847 | 590, 12910 | Tambah/kelola pengguna |
| Peran & izin | 390×1073 | 1060, 12910 | Atur RBAC per peran |
| Aturan & kebijakan | 390×1290 | 1530, 12910 | Aturan otomatisasi & kebijakan |
| Tata kelola AI | 390×1176 | 2000, 12910 | Kontrol perilaku AI |
| Log aktivitas | 390×696 | 2470, 12910 | Audit trail aktivitas |

## 10 · Meeting & Acara (y≈14460)

Pengingat meeting & catatan acara untuk kebutuhan kantor.

| Screen | Ukuran | Posisi | Fungsi |
|---|---|---|---|
| M1 Agenda | 390×956 | 120, 14460 | Daftar agenda/acara |
| M2 Buat Acara | 390×1477 | 590, 14460 | Form buat acara |
| M3 Detail Acara | 390×1332 | 1060, 14460 | Rincian acara + peserta |
| M4 Notulen | 390×1280 | 1530, 14460 | Catatan notulen rapat |
| M5 Pengingat | 390×1072 | 2000, 14460 | Pengaturan pengingat meeting |
| M6 Empty | 390×731 | 2470, 14460 | Kondisi belum ada acara |

## 11 · Flow Diagram — Alur & RBAC (y≈16197)

Diagram alur antar-layar dan matriks hak akses.

| Kartu | Ukuran | Posisi | Isi |
|---|---|---|---|
| Flow 1 · Auth | 440×1033 | 120, 16197 | Alur login Google → profil → masuk |
| Flow 2 · Desakan | 440×834 | 620, 16197 | Eskalasi pengingat L1→L2→L3 |
| Flow 3 · Manajer | 440×925 | 1120, 16197 | Alur tugaskan → pantau → audit |
| Flow 4 · Laporan | 440×806 | 1620, 16197 | Alur laporan multi-channel (in-app/email/Telegram) |
| Flow 5 · RBAC | 620×(42+400) | 2140, 16197 | Matriks 9 kemampuan × 4 peran (Admin/Manajer/Staf/Peninjau) |

### Matriks RBAC — Hak per Peran (Flow 5)

**Legenda:** ✓ = penuh · `sendiri` = hanya milik sendiri · `ikut` = ikut serta/hadir · `lihat` = hanya baca · — = tidak ada

| Kemampuan | Admin | Manajer | Staf | Peninjau |
|---|:--:|:--:|:--:|:--:|
| Kelola user & peran | ✓ | — | — | — |
| Atur aturan & kebijakan | ✓ | — | — | — |
| Buat & tugaskan tugas | ✓ | ✓ | sendiri | — |
| Assign kolaborator | ✓ | ✓ | — | — |
| Kerjakan & update tugas | ✓ | ✓ | ✓ | — |
| Setujui / kembalikan hasil | ✓ | ✓ | — | ✓ |
| Lihat papan bersama | ✓ | ✓ | ✓ | ✓ |
| Buat & bagikan laporan | ✓ | ✓ | sendiri | lihat |
| Kelola meeting & event | ✓ | ✓ | ikut | — |

- **Admin** — orkestrator; kontrol penuh (satu-satunya pengelola user/peran, kebijakan, & tata kelola AI).
- **Manajer** — pemimpin tim; semua hak operasional kecuali kelola user/peran & kebijakan global.
- **Staf** — pelaksana; kerjakan tugas, buat tugas & laporan lingkup sendiri, ikut meeting.
- **Peninjau** — quality gate manusia; **menyetujui / mengembalikan hasil** kerja, serta lihat papan bersama & laporan (tanpa mengeksekusi tugas sendiri).

---

## Catatan sinkronisasi

- **Halaman lain di file Penpot yang dipertahankan:** `paper` (poster paper) dan `diagram-arsitektur` (poster arsitektur). Halaman sumber per-fitur sudah dikonsolidasi ke `wireframe`.
- **Beranda (band 0)** ditambahkan sebagai halaman utama/dashboard staf — belum ada sebelumnya. Ikon pada Menu Cepat & navigasi bawah masih placeholder kotak-warna; bisa diganti ikon nyata bila diperlukan.
- **Restrukturisasi minor saat copy:** *Screen Pengaturan* dan *Flow 5 RBAC* tersalin sebagai potongan isi tanpa frame pembungkus — konten tetap utuh; bila ingin rapi 100% bisa dibungkus ulang jadi satu frame bernama.
- **Tidak ikut dikonsolidasi (usang):** `login` & `profile` (placeholder desktop 1280×800 versi awal) dan `flow-frame` (container draft lama) — sudah digantikan desain mobile + kartu flow saat ini.
- **Duplikat & debris** yang sempat terbawa saat copy sudah dibersihkan (A1 ×2→1, A5 ×4→1, P2 ×3→1; board sampah `content`/`brow`/`btn`).
