import { certificatesData } from './certificates';
import { projectsData } from './projects';
import type {
	ActivityItem,
	LearningTrackItem,
	MilestoneItem,
	InterestItem,
	SpecialLinkItem
} from '$lib/types';

export const nowActivities: ActivityItem[] = [
	{
		icon: 'linux',
		title: 'Linux Server Administration',
		desc: 'Mengelola server Linux, virtual environment, dan otomasi shell script.'
	},
	{
		icon: 'cpp',
		title: 'System Benchmarking & C++',
		desc: 'Mengembangkan tools benchmarking disk I/O asinkron (io_uring) dan diagnostik sistem berbasis C++23.'
	},
	{
		icon: 'bnsp',
		title: 'Networking & Infrastructure',
		desc: `Memegang sertifikasi ${certificatesData[0].title} dari ${certificatesData[0].issuer} (${certificatesData[0].date}) dan mendalami konfigurasi routing, switching, serta jaringan komputer.`
	}
];

export const learningTracks: LearningTrackItem[] = [
	{
		step: '01',
		icon: 'linux',
		category: 'Sistem Inti',
		title: 'Asynchronous I/O & Kernel',
		desc: 'Mendalami io_uring, direct I/O (O_DIRECT), serta optimalisasi throughput disk dan performa jaringan Linux.'
	},
	{
		step: '02',
		icon: 'cpp',
		category: 'Performa Sistem',
		title: 'C++23 & System Programming',
		desc: 'Menerapkan standar C++23, manajemen memori tingkat rendah, multithreading, dan arsitektur CLI tools.'
	},
	{
		step: '03',
		icon: 'network',
		category: 'Infrastruktur',
		title: 'Network & Virtual Environment',
		desc: 'Mengelola administrasi jaringan terstruktur, TCP/IP protocol stack, dan isolasi lingkungan server virtual.'
	}
];

export const recentMilestones: MilestoneItem[] = [
	{
		year: certificatesData[0].date,
		icon: certificatesData[0].icon ?? 'certificate',
		title: certificatesData[0].title,
		detail: `${certificatesData[0].issuer} — ${certificatesData[0].description ?? ''}`
	},
	...projectsData.flatMap((project) =>
		project.milestone
			? [
					{
						year: project.milestone.year,
						icon: project.milestone.icon,
						title: project.title,
						detail: project.milestone.detail
					}
				]
			: []
	)
].sort((left, right) => Number(right.year) - Number(left.year));

export const interestsData: InterestItem[] = [
	{
		icon: 'linux',
		title: 'Linux & Kernel I/O',
		desc: 'Mendalami syscalls Linux, io_uring, O_DIRECT, dan arsitektur disk benchmarking asinkron.'
	},
	{
		icon: 'network',
		title: 'Networking & Homelab',
		desc: 'Mengeksplorasi konfigurasi routing, switching, virtual environment, dan administrasi server.'
	},
	{
		icon: 'code',
		title: 'C++ & System Tooling',
		desc: 'Menerapkan idiom modern C++23, multithreading efisien, dan pembuatan CLI tools.'
	}
];

export const specialLinksData: SpecialLinkItem[] = [
	{
		name: 'GitHub',
		intro: 'Repositori & Proyek Open Source',
		href: 'https://github.com/relvinarsenio',
		avatar: 'https://github.com/relvinarsenio.png'
	},
	{
		name: 'LinkedIn',
		intro: 'Jejaring Profesional & Karir',
		href: 'https://www.linkedin.com/in/rizky-juniardi',
		icon: 'linkedin'
	},
	{
		name: 'Email',
		intro: 'work.rizkyjuniardi@gmail.com',
		href: 'mailto:work.rizkyjuniardi@gmail.com',
		icon: 'mail'
	}
];
