# 🌐 Muhammad Rossi Satria Fitrah — Portfolio Website

Selamat datang di repositori portofolio profesional saya. Website ini dirancang sebagai platform interaktif untuk menampilkan profil, keahlian teknis (*tech stack*), sertifikasi terverifikasi, riwayat pengalaman, dan studi kasus proyek (*projects*) saya.

Aplikasi ini dibangun menggunakan **HTML5 semantik**, **CSS3 vanilla** (dengan CSS Custom Properties, Grid, Flexbox, dan Glassmorphism), serta **JavaScript ES6+ vanilla**.

> 💡 **Live Demo:** [satria563.github.io/Portofolio_RossiSatria](https://satria563.github.io/Portofolio_RossiSatria/)

---

## 🚀 Fitur Utama & Keunggulan

Website ini dilengkapi dengan berbagai fitur interaktif modern untuk menjamin kenyamanan pengguna (*user experience*):

- **Premium Dark Mode & Glassmorphism UI** — Tampilan visual modern dengan palet warna terkurasi, efek blur latar belakang (*glassmorphism*), dan gradasi warna dinamis.
- **Interactive Spotlight (Card Glow Effect)** — Efek sorotan lampu (*spotlight glow*) interaktif pada kartu proyek dan skill yang mengikuti pergerakan kursor mouse (dioptimalkan untuk performa dengan penonaktifan otomatis pada layar sentuh/mobile).
- **Project Filter** — Menyaring daftar proyek secara dinamik berdasarkan kategori: *Semua*, *Teknologi & IoT*, atau *Manajerial & Acara* dengan animasi transisi yang mulus.
- **Project Detail Modal (Pop-up)** — Modal interaktif lengkap dengan galeri foto (mendukung navigasi tombol, *dots indicator*, *swipe touch* di mobile, dan navigasi keyboard) untuk menyajikan penjelasan proyek menggunakan kerangka **Problem — Action — Result (PAR)** serta tantangan dan solusinya.
- **Scroll Reveal Animation** — Elemen halaman muncul secara dinamis saat di-scroll ke dalam viewport menggunakan **IntersectionObserver API** yang efisien.
- **Typing Effect** — Animasi mengetik teks deskriptif pada hero section untuk menyajikan berbagai keahlian utama.
- **Active Navigation Highlight** — Menyorot menu navigasi secara otomatis sesuai dengan section aktif di viewport, termasuk penanganan khusus untuk langsung menyorot menu *Contact* saat pengguna mencapai bagian paling bawah halaman.
- **Direct WhatsApp Contact Form** — Formulir kontak yang secara otomatis memformat pesan teks terstruktur dan mengarahkan pengguna untuk mengirim pesan langsung ke WhatsApp saya dalam satu klik.
- **Dynamic Local Time Widget** — Widget waktu lokal interaktif di bagian footer yang menampilkan jam Waktu Indonesia Barat (WIB) secara real-time.
- **Responsive Layout** — Dioptimalkan penuh untuk kenyamanan akses pada perangkat mobile, tablet, hingga layar desktop lebar.

---

## 🛠️ Tech Stack & Library

- **Struktur & Semantik:** HTML5
- **Desain & Animasi:** CSS3 (Custom CSS Variables, CSS Grid, Flexbox, Keyframe Animations)
- **Logika & Interaktivitas:** Vanilla JavaScript (ES6+, IntersectionObserver API)
- **Library Ikon:** [Lucide Icons](https://lucide.dev/) (dimuat secara dinamis)
- **Tipografi:** Google Fonts (Inter, Space Grotesk, JetBrains Mono)
- **Optimasi Gambar:** Format Next-Gen WebP untuk waktu muat (*loading*) super cepat

---

## 📁 Struktur Direktori Proyek

```text
Portofolio_RossiSatria/
├── index.html                  # Halaman utama (Single Page Application)
├── css/
│   └── style.css               # Desain sistem lengkap (Layout, Variabel, Komponen)
├── js/
│   └── main.js                 # Skrip utama interaktivitas & logika modal
├── assets/
│   ├── images/
│   │   ├── logos/              # Favicon & logo media sosial
│   │   ├── projects/           # Gambar thumbnail & aset proyek KaryaSpace & LDR
│   │   ├── k3/                 # Galeri foto kegiatan pelatihan K3
│   │   ├── binamuda/           # Galeri foto kegiatan organisasi Binamuda
│   │   └── profile.webp        # Foto profil utama (format WebP terkompresi)
│   └── docs/
│       └── CV_RossiSatria.pdf  # Curriculum Vitae profesional (format PDF)
├── .gitignore                  # Konfigurasi file/folder yang diabaikan Git
└── README.md                   # Dokumentasi repositori ini
```

---

## 👨‍💻 Mengenai Muhammad Rossi Satria Fitrah

Saya adalah mahasiswa aktif program studi **Informatika (Semester 7)** di **Universitas Bina Sarana Informatika**. Saya memiliki minat besar pada integrasi sistem IoT, pengembangan web, administrasi jaringan, serta kepemimpinan tim.

### Keahlian Utama (Skill Set)
- **Teknis:** IoT & Sensor Development (Arduino, LDR Sensor, ESP8266), Integrasi Web, Jaringan Komputer (Cisco Network Administration, Subnetting, Packet Tracer), Pemrograman Python (OOP & Otomasi).
- **Non-Teknis/Manajerial:** Problem Solving Analitis, Manajemen Waktu & Kerja Tim, Komunikasi Efektif, Operasional Pelatihan K3.

### Sertifikasi Terverifikasi
- **CCNA: Introduction to Networks** — Cisco Networking Academy (Credly Verified)
- **PCAP: Programming Essentials in Python** — Cisco Networking Academy Program
- **Sertifikasi Kompetensi & Pelatihan Mahasiswa** — Universitas Bina Sarana Informatika

---

## 📦 Menjalankan Proyek Secara Lokal

Karena proyek ini menggunakan teknologi vanilla murni (tanpa bundler), Anda dapat menjalankannya dengan sangat mudah:

1. **Kloning Repositori:**
   ```bash
   git clone https://github.com/satria563/Portofolio_RossiSatria.git
   ```
2. **Buka Halaman:**
   - Cukup klik ganda (double click) file `index.html` untuk membukanya di browser favorit Anda.
   - *Rekomendasi:* Gunakan ekstensi seperti **Live Server** di VS Code untuk pengalaman pengembangan lokal yang lebih baik dengan fitur *auto-reload*.

---

## 🚀 Deployment

Repositori ini siap di-deploy langsung menggunakan **GitHub Pages**:

1. Pastikan seluruh berkas telah di-push ke repositori GitHub Anda.
2. Masuk ke **Settings** → **Pages** pada repositori GitHub Anda.
3. Pada bagian **Build and deployment**, atur Source ke **Deploy from a branch**.
4. Pilih branch `main` (atau `master`) dan folder `/ (root)`.
5. Klik **Save**. Halaman portofolio Anda akan aktif dalam beberapa menit.

---

## 📨 Kontak & Kolaborasi

Saya sangat terbuka untuk peluang magang, proyek kolaboratif, maupun diskusi teknis. Jangan ragu untuk menghubungi saya melalui saluran berikut:

- **Email:** [ocicuyot@gmail.com](mailto:ocicuyot@gmail.com)
- **WhatsApp:** [+62 857-8226-5046](https://wa.me/6285782265046)
- **LinkedIn:** [Rossi Satria](https://linkedin.com/in/muhammad-rossi-satria-fitrah-6a04492ab)
- **Instagram:** [@satria.563](https://instagram.com/satria.563)

---

© 2026 Muhammad Rossi Satria Fitrah. All rights reserved.
