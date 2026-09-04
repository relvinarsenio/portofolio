# Portofolio — Rizky Juniardi

Website portofolio pribadi yang dibangun menggunakan **SvelteKit (Svelte 5 Runes)**, **Tailwind CSS v4**, dan ditargetkan untuk **Cloudflare Workers**.

---

## ✨ Fitur

- **⚡ Svelte 5 Native**: Menggunakan Svelte 5 Runes (`$state`, `$derived`, `$props`, `$effect`, `{#snippet}`) secara menyeluruh.
- **🎨 Tema Gelap/Terang/Sistem**: Pengaturan tema otomatis tersinkronisasi dengan preferensi browser/sistem dan localStorage tanpa flicker saat reload.
- **💼 Katalog & Filter Proyek**:
  - Filter kategori proyek (Program, Publikasi, dll).
  - Integrasi thumbnail otomatis OpenGraph GitHub repository.
  - Kartu proyek dengan deskripsi interaktif _expand/collapse_.
- **📜 Pratinjau Sertifikasi**:
  - Modal lightbox sertifikasi dengan fitur zoom (mouse wheel / shortcut keyboard / tombol), pan/drag, serta double-click/double-tap zoom.
- **📥 Tombol Unduh CV**:
  - Nama berkas otomatis menggunakan format `CV - Nama.pdf`.
- **🧭 Daftar Isi Dinamis (TOC)**:
  - Pelacakan posisi scroll heading secara real-time pada halaman Tentang (`/about`).
- **🎯 Back-to-Top**:
  - Tombol kembali ke atas dengan indikator persentase posisi scroll halaman secara dinamis.
- **🤖 LLM & SEO Ready**:
  - Endpoint `/llms.txt` berisi ringkasan profil, proyek, dan keahlian untuk agen AI.
  - Skema terstruktur Schema.org (`Person`) dan OpenGraph Meta Tags via `svelte-meta-tags`.
  - Generator `/sitemap.xml` dan `/robots.txt` berbasis endpoint server.

---

## 🛠️ Stack Teknologi

| Kategori              | Dependensi / Tool                                                                                     |
| :-------------------- | :---------------------------------------------------------------------------------------------------- |
| **Framework**         | SvelteKit (`@sveltejs/kit`), Svelte 5 (`svelte`)                                                      |
| **Adapter**           | Cloudflare Workers (`@sveltejs/adapter-cloudflare`)                                                   |
| **Styling**           | Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/typography`, `@tailwindcss/forms`) |
| **Icons**             | `@iconify/svelte` (Lucide, Simple Icons, Logos)                                                       |
| **Tipografi**         | Satoshi (Fontshare), `@fontsource-variable/inconsolata`                                               |
| **Optimasi Gambar**   | `@sveltejs/enhanced-img`                                                                              |
| **SEO**               | `svelte-meta-tags`                                                                                    |
| **HTML Parser**       | `node-html-parser` (untuk crawler GitHub OpenGraph)                                                   |
| **Runtime & Tooling** | Bun, TypeScript, ESLint, Prettier, Wrangler 4                                                         |

---

## 📂 Struktur Direktori (`src/`)

```
src/
├── app.d.ts                     # Deklarasi Cloudflare Platform bindings (env, ctx, caches, cf)
├── app.html                     # HTML root template dengan inline script inisialisasi tema
├── hooks.server.ts              # SvelteKit server handle hook untuk injeksi judul aplikasi
│
├── lib/
│   ├── types.ts                 # Definisi tipe data & antarmuka TypeScript
│   ├── config.ts & index.ts     # Barrel export module library
│   │
│   ├── data/                    # Sumber data utama website
│   │   ├── site.ts              # Konfigurasi situs (penulis, navigasi, footer social links)
│   │   ├── projects.ts          # Data proyek dan publikasi ilmiah
│   │   ├── experience.ts        # Data pengalaman riset dan riwayat pendidikan
│   │   ├── certificates.ts      # Data sertifikasi kompetensi (BNSP)
│   │   ├── tools.ts             # Data alat dan teknologi yang dikuasai
│   │   ├── profile.ts           # Data aktivitas terkini, learning track, dan milestone
│   │   └── quotes.ts            # Data kutipan teks lokal
│   │
│   ├── state/
│   │   └── theme.svelte.ts      # State reaktif manajemen tema Svelte 5
│   │
│   ├── server/
│   │   └── github.ts            # Logika server-side untuk parsing OpenGraph image GitHub
│   │
│   ├── components/
│   │   ├── ui/                  # Komponen UI dasar (Button, CvDownloadButton, Icon, Card, Label, Quote, dll)
│   │   └── layout/              # Komponen tata letak (Header, Footer, Section, TOC)
│   │
│   └── features/
│       ├── projects/            # Komponen ProjectCard
│       ├── certificates/        # Komponen CertificateList dan CertificateModal
│       ├── timeline/            # Komponen Timeline
│       └── tools/               # Komponen ToolSection
│
└── routes/
    ├── layout.css               # Definisi theme tokens Tailwind CSS v4 & custom CSS
    ├── +layout.svelte           # Root layout dengan Schema.org JSON-LD & Header/Footer
    ├── +layout.server.ts        # Server load function untuk enrich thumbnail proyek
    ├── +layout.ts               # Konfigurasi prerender = true
    ├── +error.svelte            # Halaman penanganan error (404/500)
    ├── +page.svelte             # Halaman Beranda
    ├── about/+page.svelte       # Halaman Tentang Saya
    ├── projects/+page.svelte    # Halaman Katalog Proyek
    ├── api/cv/+server.ts        # Endpoint pengunduhan berkas PDF CV
    ├── llms.txt/+server.ts      # Endpoint ringkasan untuk LLM/AI
    ├── robots.txt/+server.ts    # Endpoint robots.txt
    └── sitemap.xml/+server.ts   # Endpoint sitemap.xml
```

---

## 🚀 Menjalankan Proyek

### 1. Instalasi Dependensi

```bash
bun install
```

### 2. Development Server

```bash
bun run dev
```

### 3. Pemeriksaan Tipe & Linting

```bash
# Validasi tipe data TypeScript & Svelte
bun run check

# Linter & Formatter
bun run lint
bun run format
```

### 4. Build & Preview

```bash
# Kompilasi aplikasi untuk Cloudflare Workers
bun run build

# Uji hasil kompilasi produksi
bun run preview
```

### 5. Membersihkan Cache & Output Build

```bash
# Hapus cache .svelte-kit, .wrangler, build, dan output
bun run clean
```
