import type { ProjectItem } from '$lib/types';

export const projectsData: ProjectItem[] = [
	{
		title: 'Calyx — System Benchmarking & Diagnostic Tool',
		description:
			'Alternatif modern untuk bench.sh. CLI tool untuk benchmarking dan diagnostik sistem Linux berbasis C++23, pengukuran disk I/O asinkron (io_uring & O_DIRECT), serta latency/throughput server real-time.',
		href: 'https://calyx.pages.dev',
		github: 'https://github.com/relvinarsenio/calyx',
		category: 'Program',
		tags: ['C++23', 'Linux', 'io_uring', 'CLI', 'System'],
		featured: true
	},
	{
		title: 'Publikasi: Linux Asynchronous I/O Benchmarking',
		description:
			'Publikasi ilmiah pada Jurnal JUTI (Vol. 24, Issue 2, hlm. 286-307) berjudul "Evaluating deterministic asynchronous disk benchmarking using the Linux asynchronous I/O".',
		href: 'https://juti.if.its.ac.id/index.php/juti/article/view/1539',
		category: 'Publikasi',
		tags: ['JUTI Journal', 'Research Paper', 'SINTA 3', 'io_uring'],
		featured: true
	},
	{
		title: 'SecureChat Pro — RSA Encrypted Chat App',
		description:
			'Aplikasi Android dengan implementasi enkripsi RSA 512-bit untuk penyimpanan log pesan lokal yang aman, serta simulasi skenario eksfiltrasi data saat debugging untuk analisis forensik digital.',
		href: 'https://github.com/relvinarsenio/SecureChatPro',
		github: 'https://github.com/relvinarsenio/SecureChatPro',
		category: 'Program',
		tags: ['Android', 'Kotlin', 'RSA Encryption', 'Digital Forensics']
	},
	{
		title: 'dev-env — Localhost Development Dashboard',
		description:
			'Next-gen Localhost Dashboard dengan fitur auto-scan proyek, pemantauan statistik sistem real-time, dan zero dependencies. Dibangun dengan PHP 8 dan CSS Grid modern.',
		href: 'https://github.com/relvinarsenio/dev-env',
		github: 'https://github.com/relvinarsenio/dev-env',
		category: 'Program',
		tags: ['PHP 8', 'Dev Tools', 'Dashboard', 'CSS Grid']
	},
	{
		title: 'Internet Positif — Modern Block Page Simulation',
		description:
			'Rekreasi modern dan responsif untuk halaman blokir Internet Positif / Komdigi Trust+ berbasis Svelte 5, Tailwind CSS v4, dynamic domain detection, dan glassmorphism UI.',
		href: 'https://inetpositif.pages.dev/',
		github: 'https://github.com/relvinarsenio/inetpositif',
		category: 'Program',
		tags: ['Svelte 5', 'Tailwind CSS v4', 'Vite 7', 'Cloudflare Pages']
	}
];
