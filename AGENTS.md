## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: prettier, eslint, tailwindcss, sveltekit-adapter, ai-tools

---

## Code Quality & Commenting Guidelines (Zero-Waste & Zero-Comment Policy)

- **MUTLAK: Dilarang Menulis Komentar Perubahan / Narasi Percakapan**:
  - Dilarang keras menyisipkan komentar di atas atau di sekitar kode yang diedit hanya untuk menjelaskan apa yang baru saja diubah atau merujuk perintah user (contoh yang dilarang: `// Spotlight top 2 standout projects`, `// SSOT: ...`, `// Pengelompokan dinamis ...`, `// Added based on user request`, `<!-- Clean natural ... -->`, dll.).
  - Langsung tulis kode murni yang bersih tanpa komentar pengantar, ringkasan fitur, atau label seksi redundan.
- **Self-Documenting Code**: Logika, struktur kode, penamaan variabel/fungsi, dan tipe TypeScript harus jelas dan ekspresif dengan sendirinya.
- **Strictly No Comment Pollution**: File kode bukan tempat mencatat riwayat percakapan (_conversation log_) atau changelog.
- **Minimal & Essential**: Komentar HANYA diizinkan jika menjelaskan workaround bug compiler/runtime non-obvious atau spesifikasi RFC/protokol tingkat rendah yang kritis.
- **Clean & Flat**: Utamakan guard clauses / early returns, arsitektur SOLID, DRY, dan SSOT murni dalam struktur kode tanpa komentar naratif.

---

## MCP Usage Guidelines (Mandatory)

Selalu gunakan MCP server yang tersedia untuk segala hal yang berkaitan dengan **Svelte / SvelteKit**, **GitHub**, dan **Cloudflare**.

---

### 1. Svelte MCP Server (`svelte`)

Akses dokumentasi resmi Svelte 5 / SvelteKit dan verifikasi kode secara otomatis:

- **`list-sections`**: Panggil pertama kali untuk menemukan section dokumentasi yang relevan berdasarkan topik/use case.
- **`get-documentation`**: Ambil konten dokumentasi lengkap untuk section yang dibutuhkan sebelum menulis kode atau memberi solusi.
- **`svelte-autofixer`**: **Wajib dipanggil** setiap kali menulis atau mengubah kode Svelte sebelum mengembalikan respon ke user untuk memastikan tidak ada issue sintaks/runes.
- **`playground-link`**: Buat link Svelte Playground jika user meminta testing/sharing interaktif (hanya atas konfirmasi user).

---

### 2. GitHub MCP Server (`github`)

Gunakan tool MCP GitHub untuk segala interaksi dengan repository dan ekosistem GitHub:

- **Repository & Code**: `get_repo_info`, `get_repo_contents`, `list_branches`, `list_commits`, `search_code`, `search_repos`.
- **Issues & PRs**: `list_issues`, `create_issue`, `edit_issue`, `list_prs`, `create_pull_request`, `get_pr_details`, `list_pr_files`.
- **Workflows & CI/CD**: `list_workflows`, `list_workflow_runs`, `get_workflow_run_details`, `trigger_workflow`.
- **Management & Insights**: `get_repo_stats`, `dependency_analysis`, `code_quality_checks`, `release_management`.

---

### 3. Cloudflare MCP Server (`cloudflare-api`)

Gunakan tool Cloudflare MCP untuk integrasi, migrasi, dan panduan dokumentasi Cloudflare:

- **`search_cloudflare_documentation`**: Mencari referensi teknis, Workers, Pages, Bindings (KV, D1, R2), dan fitur platform Cloudflare.
- **`migrate_pages_to_workers_guide`**: Panduan best practice migrasi atau deployment Cloudflare Pages ke Cloudflare Workers.

---

### 4. IntelliJ / IDEA MCP Server (`idea`)

Gunakan untuk navigasi simbol, analisis call hierarchy, problem file, dan inspect project jika diperlukan.
