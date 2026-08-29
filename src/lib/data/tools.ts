import type { ToolGroup } from '$lib/types';

export const toolsData: ToolGroup[] = [
	{
		title: 'Bahasa Pemrograman',
		tools: [
			{
				name: 'C++',
				description: 'System Programming & C++23',
				href: 'https://isocpp.org',
				icon: 'cpp'
			},
			{
				name: 'Kotlin',
				description: 'Pengembangan Aplikasi Android',
				href: 'https://kotlinlang.org',
				icon: 'kotlin'
			},
			{
				name: 'Bash Shell',
				description: 'Otomasi & Scripting Linux',
				href: 'https://www.gnu.org/software/bash/',
				icon: 'bash'
			},
			{
				name: 'Git',
				description: 'Version Control System',
				href: 'https://git-scm.com',
				icon: 'git'
			}
		]
	},
	{
		title: 'Sistem & Infrastruktur',
		tools: [
			{
				name: 'Linux',
				description: 'Administrasi Server & Kernel I/O',
				href: 'https://kernel.org',
				icon: 'linux'
			},
			{
				name: 'Virtual Environment',
				description: 'Virtualisasi & Isolasi Server',
				href: 'https://github.com/relvinarsenio',
				icon: 'server'
			},
			{
				name: 'Networking',
				description: 'Administrasi Jaringan & Routing',
				href: 'https://github.com/relvinarsenio',
				icon: 'network'
			},
			{
				name: 'Neovim',
				description: 'Terminal Text Editor',
				href: 'https://neovim.io',
				icon: 'neovim'
			}
		]
	}
];
