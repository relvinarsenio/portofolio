import type { SiteConfig } from '$lib/types';

export const siteConfig: SiteConfig = {
	title: 'Portofolio',
	author: 'Rizky Juniardi',
	description: 'System Administrator & C++ Developer',
	location: 'Lampung, Indonesia',
	status: 'Menerima Peluang Kerja',
	statusUrl: 'https://github.com/relvinarsenio',
	cvUrl: '/api/cv',
	avatar: '/photo-profile.jpeg',
	bio: [
		'Saya memiliki pengalaman mengelola sistem Linux, administrasi server, dan virtualisasi menggunakan Hyper-V.',
		'Dalam pengembangan perangkat lunak, saya menggunakan C++ dan Git, dengan beberapa proyek yang berfokus pada system programming dan utilitas Linux maupun Windows.',
		'Saya memiliki sertifikasi BNSP Junior Network Administrator dan tertarik pada administrasi sistem, jaringan komputer, serta pengembangan perangkat lunak.'
	],
	header: {
		menu: [
			{ title: 'Beranda', link: '/' },
			{ title: 'Proyek', link: '/projects' },
			{ title: 'Tentang', link: '/about' }
		]
	},
	footer: {
		year: new Date().getFullYear(),
		credits: true,
		social: [
			{ icon: 'github', label: 'GitHub', href: 'https://github.com/relvinarsenio' },
			{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rizky-juniardi' },
			{ icon: 'mail', label: 'Email', href: 'mailto:work.rizkyjuniardi@gmail.com' }
		],
		links: [
			{ title: 'Profil GitHub', link: 'https://github.com/relvinarsenio' },
			{ title: 'Tentang Saya', link: '/about' }
		]
	}
};
