<script lang="ts">
	import IconifyIcon from '@iconify/svelte';

	interface Props {
		name: string;
		class?: string;
		size?: number | string;
		colorful?: boolean;
	}

	let { name, class: className = 'size-5', size = 20, colorful = true }: Props = $props();

	const colorfulMap: Record<string, string> = {
		cpp: 'logos:c-plusplus',
		'c++': 'logos:c-plusplus',
		cplusplus: 'logos:c-plusplus',
		c: 'logos:c',
		kotlin: 'logos:kotlin-icon',
		bash: 'logos:bash-icon',
		shell: 'logos:bash-icon',
		android: 'logos:android-icon',
		vscode: 'logos:visual-studio-code',
		'vs-code': 'logos:visual-studio-code',
		neovim: 'devicon:neovim',
		bun: 'logos:bun',
		git: 'logos:git-icon',
		svelte: 'logos:svelte-icon',
		'svelte-5': 'logos:svelte-icon',
		sveltekit: 'logos:svelte-icon',
		tailwind: 'logos:tailwindcss-icon',
		tailwindcss: 'logos:tailwindcss-icon',
		vite: 'logos:vitejs',
		typescript: 'logos:typescript-icon',
		ts: 'logos:typescript-icon',
		javascript: 'logos:javascript',
		js: 'logos:javascript',
		html5: 'logos:html-5',
		html: 'logos:html-5',
		css3: 'logos:css-3',
		css: 'logos:css-3',
		python: 'logos:python',
		go: 'logos:go',
		golang: 'logos:go',
		rust: 'logos:rust',
		cloudflare: 'logos:cloudflare-icon',
		'cloudflare-workers': 'logos:cloudflare-icon',
		postgresql: 'logos:postgresql',
		postgres: 'logos:postgresql',
		docker: 'logos:docker-icon',
		linux: 'logos:linux-tux',
		redis: 'logos:redis',
		sqlite: 'logos:sqlite',
		react: 'logos:react',
		nextjs: 'logos:nextjs-icon',
		'next.js': 'logos:nextjs-icon',
		nodejs: 'logos:nodejs-icon',
		'node.js': 'logos:nodejs-icon',
		figma: 'logos:figma',
		postman: 'logos:postman-icon',
		githubactions: 'logos:github-actions',
		'github-actions': 'logos:github-actions',
		aws: 'logos:aws',
		meta: 'logos:meta-icon',
		clickhouse: 'logos:clickhouse-icon',
		npm: 'logos:npm-icon',
		whatsapp: 'logos:whatsapp-icon',
		linkedin: 'logos:linkedin-icon'
	};

	const monochromeMap: Record<string, string> = {
		cpp: 'simple-icons:cplusplus',
		'c++': 'simple-icons:cplusplus',
		cplusplus: 'simple-icons:cplusplus',
		c: 'simple-icons:c',
		kotlin: 'simple-icons:kotlin',
		bash: 'simple-icons:gnubash',
		shell: 'simple-icons:gnubash',
		android: 'simple-icons:android',
		github: 'simple-icons:github',
		'github-circle': 'simple-icons:github',
		twitter: 'simple-icons:x',
		'x-social': 'simple-icons:x',
		linkedin: 'simple-icons:linkedin',
		vscode: 'simple-icons:visualstudiocode',
		'vs-code': 'simple-icons:visualstudiocode',
		neovim: 'simple-icons:neovim',
		bun: 'simple-icons:bun',
		git: 'simple-icons:git',
		svelte: 'simple-icons:svelte',
		'svelte-5': 'simple-icons:svelte',
		sveltekit: 'simple-icons:svelte',
		tailwind: 'simple-icons:tailwindcss',
		tailwindcss: 'simple-icons:tailwindcss',
		vite: 'simple-icons:vite',
		typescript: 'simple-icons:typescript',
		ts: 'simple-icons:typescript',
		javascript: 'simple-icons:javascript',
		js: 'simple-icons:javascript',
		html5: 'simple-icons:html5',
		css3: 'simple-icons:css3',
		python: 'simple-icons:python',
		go: 'simple-icons:go',
		golang: 'simple-icons:go',
		rust: 'simple-icons:rust',
		cloudflare: 'simple-icons:cloudflare',
		'cloudflare-workers': 'simple-icons:cloudflare',
		postgresql: 'simple-icons:postgresql',
		postgres: 'simple-icons:postgresql',
		docker: 'simple-icons:docker',
		linux: 'simple-icons:linux',
		redis: 'simple-icons:redis',
		sqlite: 'simple-icons:sqlite',
		react: 'simple-icons:react',
		nextjs: 'simple-icons:nextdotjs',
		'next.js': 'simple-icons:nextdotjs',
		nodejs: 'simple-icons:nodedotjs',
		'node.js': 'simple-icons:nodedotjs',
		figma: 'simple-icons:figma',
		postman: 'simple-icons:postman',
		githubactions: 'simple-icons:githubactions',
		'github-actions': 'simple-icons:githubactions',
		aws: 'simple-icons:amazonwebservices',
		meta: 'simple-icons:meta',
		clickhouse: 'simple-icons:clickhouse',
		npm: 'simple-icons:npm',
		proxmox: 'simple-icons:proxmox',
		whatsapp: 'simple-icons:whatsapp'
	};

	const uiIconMap: Record<string, string> = {
		network: 'lucide:network',
		networking: 'lucide:network',
		bnsp: 'lucide:shield-check',
		mail: 'lucide:mail',
		phone: 'lucide:phone',
		location: 'lucide:map-pin',
		'map-pin': 'lucide:map-pin',
		certificate: 'lucide:award',
		award: 'lucide:award',
		badge: 'lucide:award',
		sun: 'lucide:sun',
		moon: 'lucide:moon',
		computer: 'lucide:monitor',
		monitor: 'lucide:monitor',
		menu: 'lucide:menu',
		close: 'lucide:x',
		x: 'lucide:x',
		check: 'lucide:check',
		loader: 'lucide:loader-2',
		search: 'lucide:search',
		external: 'lucide:arrow-up-right',
		'arrow-up-right': 'lucide:arrow-up-right',
		'arrow-left': 'lucide:arrow-left',
		back: 'lucide:arrow-left',
		'arrow-right': 'lucide:arrow-right',
		ahead: 'lucide:arrow-right',
		up: 'lucide:chevron-up',
		'chevron-up': 'lucide:chevron-up',
		down: 'lucide:chevron-down',
		'chevron-down': 'lucide:chevron-down',
		'arrow-up': 'lucide:arrow-up',
		briefcase: 'lucide:briefcase',
		work: 'lucide:briefcase',
		graduation: 'lucide:graduation-cap',
		education: 'lucide:graduation-cap',
		terminal: 'lucide:terminal',
		cli: 'lucide:terminal',
		code: 'lucide:code-2',
		dev: 'lucide:code-2',
		globe: 'lucide:globe',
		earth: 'lucide:globe',
		site: 'lucide:globe',
		package: 'lucide:package',
		release: 'lucide:package',
		document: 'lucide:file-text',
		doc: 'lucide:file-text',
		download: 'lucide:download',
		'download-cloud': 'lucide:download',
		heart: 'lucide:heart',
		sparkles: 'lucide:sparkles',
		'check-circle': 'lucide:check-circle-2',
		verified: 'lucide:check-circle-2',
		refresh: 'lucide:rotate-cw',
		rotate: 'lucide:rotate-cw',
		'git-branch': 'lucide:git-branch',
		'open-source': 'lucide:git-branch',
		palette: 'lucide:palette',
		design: 'lucide:palette',
		'ui-ux': 'lucide:palette',
		cpu: 'lucide:cpu',
		architecture: 'lucide:cpu',
		server: 'lucide:server',
		coffee: 'lucide:coffee',
		book: 'lucide:book-open',
		'book-open': 'lucide:book-open'
	};

	const iconName = $derived.by(() => {
		const key = name.toLowerCase();
		if (name.includes(':')) {
			return name;
		}
		if (colorful && colorfulMap[key]) {
			return colorfulMap[key];
		}
		if (monochromeMap[key]) {
			return monochromeMap[key];
		}
		if (uiIconMap[key]) {
			return uiIconMap[key];
		}
		return `lucide:${name}`;
	});
</script>

<IconifyIcon icon={iconName} width={size} height={size} class={className} />
