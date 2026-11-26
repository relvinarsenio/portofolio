import jutiBanner from '$lib/assets/publication-juti.svg';
import type { ProjectItem, TimelineItem } from '$lib/types';

export const projectsData: readonly ProjectItem[] = [
	{
		title: 'Calyx — System Benchmarking & Diagnostic Tool',
		description:
			'Alternatif modern untuk bench.sh. CLI tool untuk benchmarking dan diagnostik sistem Linux berbasis C++23, pengukuran disk I/O asinkron (io_uring & O_DIRECT), serta latency/throughput server real-time.',
		href: 'https://calyx.pages.dev',
		github: 'https://github.com/relvinarsenio/calyx',
		category: 'Program',
		tags: ['C++23', 'Linux', 'io_uring', 'CLI', 'System'],
		featured: true,
		milestone: {
			year: '2024',
			icon: 'cpp',
			detail: 'Membangun CLI benchmarking disk I/O io_uring dan pengujian latency/throughput jaringan server real-time.'
		},
		timeline: {
			role: 'Tugas Akhir & Publikasi Jurnal',
			date: '2024',
			order: 1,
			highlights: [
				'Merancang dan membangun CLI tool untuk benchmarking dan diagnostik sistem Linux berbasis C++23.',
				'Implementasi pengukuran kecepatan disk I/O menggunakan io_uring dan flag O_DIRECT.',
				'Pengujian performa koneksi server real-time mencakup download/upload speed, latency, dan packet loss.'
			]
		}
	},
	{
		title: 'whereis for Windows — Native File Lookup Utility',
		description:
			'Port Windows dari utilitas whereis berbasis C++23 menggunakan Win32 API. Mencari executable, file manual, dan direktori source melalui PATH, PATHEXT, serta Registry App Paths. Dilengkapi preset CMake dan test suite CTest.',
		href: 'https://github.com/relvinarsenio/whereis-windows',
		github: 'https://github.com/relvinarsenio/whereis-windows',
		category: 'Program',
		tags: ['C++23', 'Windows', 'Win32 API', 'CMake', 'CTest', 'CLI'],
		timeline: {
			role: 'Windows Application Development',
			date: '2026',
			order: 2,
			highlights: [
				'Memporting utilitas whereis ke Windows menggunakan C++23 dan Win32 API untuk mencari executable, file manual, dan direktori source.',
				'Mengimplementasikan pencarian melalui PATH, PATHEXT, dan Registry App Paths.',
				'Menyusun preset CMake dan test suite CTest untuk menguji opsi command-line, path berspasi, serta nama file Unicode.'
			]
		}
	},
	{
		title: 'Publikasi: Linux Asynchronous I/O Benchmarking',
		description:
			'Publikasi ilmiah pada Jurnal JUTI (Vol. 24, Issue 2, hlm. 286-307) berjudul "Evaluating deterministic asynchronous disk benchmarking using the Linux asynchronous I/O".',
		href: 'https://juti.if.its.ac.id/index.php/juti/article/view/1539',
		category: 'Publikasi',
		tags: ['JUTI Journal', 'Research Paper', 'SINTA 3', 'io_uring'],
		image: jutiBanner,
		featured: true,
		milestone: {
			year: '2024',
			icon: 'document',
			detail: 'Mempublikasikan riset ilmiah pada Jurnal JUTI (Vol. 24, Issue 2).'
		}
	},
	{
		title: 'SecureChat Pro — RSA Encrypted Chat App',
		description:
			'Aplikasi Android dengan implementasi enkripsi RSA 512-bit untuk penyimpanan log pesan lokal yang aman, serta simulasi skenario eksfiltrasi data saat debugging untuk analisis forensik digital.',
		href: 'https://github.com/relvinarsenio/SecureChatPro',
		github: 'https://github.com/relvinarsenio/SecureChatPro',
		category: 'Program',
		tags: ['Android', 'Kotlin', 'RSA Encryption', 'Digital Forensics'],
		timeline: {
			role: 'Mobile & Digital Forensic Project',
			date: '2023 - 2024',
			order: 5,
			highlights: [
				'Mengembangkan aplikasi Android untuk demonstrasi enkripsi RSA 512-bit pada penyimpanan log pesan lokal.',
				'Simulasi eksfiltrasi data saat mode debugging untuk keperluan analisis investigasi forensik digital.'
			]
		}
	},
	{
		title: 'dev-env — Localhost Development Dashboard',
		description:
			'Next-gen Localhost Dashboard dengan fitur auto-scan proyek, pemantauan statistik sistem real-time, dan zero dependencies. Dibangun dengan PHP 8 dan CSS Grid modern.',
		href: 'https://github.com/relvinarsenio/dev-env',
		github: 'https://github.com/relvinarsenio/dev-env',
		category: 'Program',
		tags: ['PHP 8', 'Dev Tools', 'Dashboard', 'CSS Grid'],
		timeline: {
			role: 'Backend & Linux Development',
			date: '2025',
			order: 3,
			highlights: [
				'Mengembangkan dashboard berbasis PHP untuk memantau load average, penggunaan memori dan disk Linux, serta konektivitas MySQL/MariaDB.',
				'Menambahkan deteksi otomatis direktori project dan custom HTTP error pages untuk Nginx.',
				'Mengintegrasikan dashboard dengan lingkungan Linux menggunakan PHP, Nginx, dan MySQL.'
			]
		}
	},
	{
		title: 'Internet Positif — Modern Block Page Simulation',
		description:
			'Rekreasi modern dan responsif untuk halaman blokir Internet Positif / Komdigi Trust+ berbasis Svelte 5, Tailwind CSS v4, dynamic domain detection, dan glassmorphism UI.',
		href: 'https://inetpositif.pages.dev/',
		github: 'https://github.com/relvinarsenio/inetpositif',
		category: 'Program',
		tags: ['Svelte 5', 'Tailwind CSS v4', 'Vite 7', 'Cloudflare Pages'],
		timeline: {
			role: 'Web Application Development',
			date: '2024',
			order: 4,
			highlights: [
				'Mengembangkan simulasi halaman blokir Internet Positif / Komdigi Trust+ menggunakan Svelte 5 dan Tailwind CSS v4.',
				'Mengimplementasikan dynamic domain detection dan responsive interface.',
				'Menggunakan Vite 7 sebagai build tooling dan Cloudflare Pages untuk deployment.'
			]
		}
	}
];

export const projectTimelineData: readonly TimelineItem[] = projectsData
	.filter((project): project is ProjectItem & { readonly timeline: NonNullable<ProjectItem['timeline']> } => Boolean(project.timeline))
	.sort((left, right) => left.timeline.order - right.timeline.order)
	.map((project) => ({
		title: project.title,
		role: project.timeline.role,
		date: project.timeline.date,
		description: project.timeline.highlights
	}));
