# Portofolio — Rizky Juniardi

> Situs portofolio pribadi yang menampilkan pengalaman, keahlian, proyek, publikasi, serta perjalanan belajar dalam bidang administrasi sistem, jaringan komputer, dan pengembangan perangkat lunak.

Portofolio ini dirancang dengan tampilan yang responsif, ringan, dan nyaman digunakan pada berbagai ukuran layar. Situs mendukung tema terang, tema gelap, dan tema yang mengikuti preferensi sistem.

[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.70.3-ff3e00?logo=svelte&logoColor=white)](https://svelte.dev/docs/kit)
[![Svelte](https://img.shields.io/badge/Svelte-5.57.1-ff3e00?logo=svelte&logoColor=white)](https://svelte.dev/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f38020?logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/)
[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue)](./LICENSE)

<p align="center">
  <a href="#fitur">Fitur</a> ·
  <a href="#teknologi">Teknologi</a> ·
  <a href="#menjalankan-proyek">Menjalankan Proyek</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#lisensi">Lisensi</a>
</p>

| Status            | Keterangan                                            |
| ----------------- | ----------------------------------------------------- |
| Tahap             | Aktif dikembangkan                                    |
| Target deployment | Cloudflare Workers                                    |
| Fokus             | Portofolio, proyek, publikasi, dan profil profesional |

---

## Fitur

### Pengalaman dan proyek

- Halaman beranda dengan ringkasan profil, aktivitas utama, alur belajar, dan pencapaian terbaru.
- Katalog proyek dan publikasi dengan filter berdasarkan kategori.
- Kartu proyek yang menampilkan deskripsi, teknologi, tautan repository, dan tautan rilis jika tersedia.
- Thumbnail proyek yang dapat diambil dari informasi Open Graph repository GitHub.

### Informasi profesional

- Halaman Tentang Saya dengan riwayat pengalaman, pendidikan, sertifikasi, alat, minat, dan informasi kontak.
- Daftar isi interaktif yang mengikuti posisi pembaca pada halaman.
- Pratinjau sertifikasi melalui modal dengan dukungan zoom dan navigasi yang nyaman.
- Tombol unduh CV dengan nama berkas yang disusun secara otomatis.

### Pengalaman pengguna

- Tema terang, gelap, dan sistem.
- Layout fluid yang menyesuaikan ukuran layar, kepadatan tampilan, serta resolusi perangkat.
- Tombol Back to Top dengan indikator persentase posisi halaman.
- Animasi transisi yang ringan dan tidak mengganggu navigasi.

### SEO dan akses informasi

- Metadata halaman, Open Graph, dan data terstruktur Schema.org.
- Sitemap dan robots file yang dihasilkan dari endpoint aplikasi.
- Ringkasan profil dan proyek melalui endpoint `/llms.txt` agar informasi situs lebih mudah dipahami oleh agen AI.

---

## Teknologi

| Kategori               | Teknologi                                                                 |
| ---------------------- | ------------------------------------------------------------------------- |
| Framework              | [SvelteKit](https://svelte.dev/docs/kit), [Svelte 5](https://svelte.dev/) |
| Styling                | [Tailwind CSS v4](https://tailwindcss.com/)                               |
| Deployment             | [Cloudflare Workers](https://workers.cloudflare.com/)                     |
| Ikon                   | [Iconify](https://iconify.design/)                                        |
| Tipografi              | Satoshi dan Inconsolata                                                   |
| Optimasi gambar        | `@sveltejs/enhanced-img`                                                  |
| Metadata               | `svelte-meta-tags`                                                        |
| Pengolahan HTML        | `node-html-parser`                                                        |
| Peralatan pengembangan | Bun, TypeScript, ESLint, Prettier, Wrangler                               |

---

## Menjalankan Proyek

### Prasyarat

Pastikan perangkat telah memiliki:

- [Bun](https://bun.sh/)
- Node.js yang kompatibel dengan versi SvelteKit yang digunakan
- Akun Cloudflare jika ingin melakukan deployment

### Instalasi

```bash
bun install
```

### Menjalankan server pengembangan

```bash
bun run dev
```

Setelah server berjalan, buka alamat yang ditampilkan di terminal, biasanya `http://localhost:5173`.

### Pemeriksaan kode

```bash
# Pemeriksaan tipe TypeScript dan Svelte
bun run check

# Menjalankan linter
bun run lint

# Memformat kode
bun run format
```

### Build dan preview

```bash
# Membuat build produksi
bun run build

# Menjalankan hasil build secara lokal
bun run preview
```

### Membersihkan output

```bash
bun run clean
```

Perintah ini digunakan untuk membersihkan cache dan output pengembangan seperti `.svelte-kit`, `.wrangler`, dan `build`.

---

## Deployment

Build proyek ini menggunakan adapter Cloudflare sehingga hasil produksinya dapat dijalankan sebagai Worker.

```bash
# Membuat build produksi
bun run build

# Menjalankan Worker secara lokal
bun run preview
```

Untuk mengunggah hasil build ke akun Cloudflare, gunakan Wrangler setelah autentikasi:

```bash
bunx wrangler login
bunx wrangler deploy
```

> [!NOTE]
> Pastikan konfigurasi Worker dan akun Cloudflare sudah siap sebelum menjalankan `wrangler deploy`. Lihat [dokumentasi deployment SvelteKit ke Cloudflare](https://developers.cloudflare.com/workers/framework-guides/web-apps/sveltekit/) untuk konfigurasi yang lebih lengkap.

---

## Struktur Proyek

Struktur utama berada di dalam direktori `src/`:

```text
src/
├── app.d.ts
├── app.html
├── hooks.server.ts
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── data/
│   ├── features/
│   ├── server/
│   ├── state/
│   └── types.ts
└── routes/
    ├── +layout.svelte
    ├── +layout.server.ts
    ├── +layout.ts
    ├── +page.svelte
    ├── about/
    ├── api/cv/
    ├── projects/
    ├── llms.txt/
    ├── robots.txt/
    └── sitemap.xml/
```

<details>
<summary>Ringkasan direktori</summary>

| Direktori                    | Kegunaan                                                          |
| ---------------------------- | ----------------------------------------------------------------- |
| `src/lib/data/`              | Data profil, proyek, pengalaman, sertifikasi, alat, dan aktivitas |
| `src/lib/components/layout/` | Komponen navigasi dan tata letak halaman                          |
| `src/lib/components/ui/`     | Komponen antarmuka yang dapat digunakan kembali                   |
| `src/lib/features/`          | Fitur khusus seperti proyek, sertifikasi, timeline, dan alat      |
| `src/lib/server/`            | Logika yang hanya dijalankan di sisi server                       |
| `src/lib/state/`             | State aplikasi, termasuk pengaturan tema                          |
| `src/routes/`                | Halaman, endpoint, dan konfigurasi routing                        |

</details>

---

## Lisensi

Project ini dirilis di bawah [BSD 3-Clause License](./LICENSE).
