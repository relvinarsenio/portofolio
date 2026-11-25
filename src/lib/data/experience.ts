import type { ExperienceItem, EducationItem } from '$lib/types';

export const experienceData: ExperienceItem[] = [
	{
		title: 'Calyx \u2014 Lightweight System Benchmarking & Diagnostic Tool',
		role: 'Tugas Akhir & Publikasi Jurnal',
		date: '2024',
		description: [
			'Merancang dan membangun CLI tool untuk benchmarking dan diagnostik sistem Linux berbasis C++23.',
			'Implementasi pengukuran kecepatan disk I/O menggunakan io_uring dan flag O_DIRECT.',
			'Pengujian performa koneksi server real-time mencakup download/upload speed, latency, dan packet loss.'
		]
	},
	{
		title: 'whereis for Windows \u2014 Native File Lookup Utility',
		role: 'Windows Application Development',
		date: '2026',
		description: [
			'Memporting utilitas whereis ke Windows menggunakan C++23 dan Win32 API untuk mencari executable, file manual, dan direktori source.',
			'Mengimplementasikan pencarian melalui PATH, PATHEXT, dan Registry App Paths.',
			'Menyusun preset CMake dan test suite CTest untuk menguji opsi command-line, path berspasi, serta nama file Unicode.'
		]
	},
	{
		title: 'dev-env \u2014 Localhost Development Dashboard',
		role: 'Backend & Linux Development',
		date: '2025',
		description: [
			'Mengembangkan dashboard berbasis PHP untuk memantau load average, penggunaan memori dan disk Linux, serta konektivitas MySQL/MariaDB.',
			'Menambahkan deteksi otomatis direktori project dan custom HTTP error pages untuk Nginx.',
			'Mengintegrasikan dashboard dengan lingkungan Linux menggunakan PHP, Nginx, dan MySQL.'
		]
	},
	{
		title: 'Internet Positif \u2014 Modern Block Page Simulation',
		role: 'Web Application Development',
		date: '2024',
		description: [
			'Mengembangkan simulasi halaman blokir Internet Positif / Komdigi Trust+ menggunakan Svelte 5 dan Tailwind CSS v4.',
			'Mengimplementasikan dynamic domain detection dan responsive interface.',
			'Menggunakan Vite 7 sebagai build tooling dan Cloudflare Pages untuk deployment.'
		]
	},
	{
		title: 'SecureChat Pro \u2014 Aplikasi Chat dengan Enkripsi RSA',
		role: 'Mobile & Digital Forensic Project',
		date: '2023 - 2024',
		description: [
			'Mengembangkan aplikasi Android untuk demonstrasi enkripsi RSA 512-bit pada penyimpanan log pesan lokal.',
			'Simulasi eksfiltrasi data saat mode debugging untuk keperluan analisis investigasi forensik digital.'
		]
	}
];

export const educationData: EducationItem[] = [
	{
		title: 'Institut Informatika & Bisnis Darmajaya',
		role: 'Sarjana (S1) Teknik Informatika (IPK: 3.85)',
		date: 'September 2022 - November 2026',
		location: 'Labuhan Ratu, Bandar Lampung',
		description: [
			'Fokus studi pada administrasi server Linux, pemrograman sistem C++, arsitektur jaringan komputer, dan keamanan sistem.'
		]
	},
	{
		title: 'SMK Negeri 1 Gedong Tataan',
		role: 'Rekayasa Perangkat Lunak',
		date: 'Juni 2019 - Juni 2022',
		location: 'Pesawaran, Lampung',
		description: [
			'Mempelajari dasar pemrograman, logika algoritma, basis data, dan infrastruktur jaringan komputer dasar.'
		]
	}
];
