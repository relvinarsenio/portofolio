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
		role: 'Sarjana (S1) Teknik Informatika (IPK: 3.84)',
		date: 'September 2022 - Sekarang',
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
