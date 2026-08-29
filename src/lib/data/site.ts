import type { SiteConfig } from '$lib/types';

export const siteConfig: SiteConfig = {
	title: 'Portofolio',
	author: 'Rizky Juniardi',
	description: 'System Administrator & C++ Developer',
	location: 'Lampung, Indonesia',
	status: 'Menerima Peluang Kerja',
	statusUrl: 'https://github.com/relvinarsenio',
	cvUrl: '/api/cv',
	avatar: 'https://github.com/relvinarsenio.png',
	bio: [
		'Saya berfokus pada administrasi sistem berbasis Linux, mencakup pengelolaan server, virtual environment, dan pemrograman C++.',
		'Selain menguasai Git untuk version control, saya juga memegang sertifikasi BNSP sebagai Junior Network Administrator.',
		'Saat ini, saya aktif mendalami jaringan komputer, administrasi server Linux, dan system programming dengan pendekatan kerja yang disiplin serta terukur.'
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
			{ icon: 'mail', label: 'Email', href: 'mailto:rizky.juniardi@outlook.co.id' }
		],
		links: [
			{ title: 'Profil GitHub', link: 'https://github.com/relvinarsenio' },
			{ title: 'Tentang Saya', link: '/about' }
		]
	}
};
