<script lang="ts">
	import { resolve } from '$app/paths';
	import { siteConfig } from '$lib/data';
	import { themeStore } from '$lib/state';
	import Icon from '$lib/components/ui/Icon.svelte';

	let isNotTop = $state(false);
	let isExpanded = $state(false);
	let isShow = $state(true);
	let headerEl: HTMLElement | undefined = $state();

	let preScrollY = 0;
	let ticking = false;

	$effect(() => {
		preScrollY = window.scrollY;
		isNotTop = preScrollY > 20;
	});

	function handleScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			ticking = false;
			const currentY = window.scrollY;
			isNotTop = currentY > 20;
			isShow = currentY < 350 || currentY < preScrollY;
			preScrollY = currentY;
		});
	}

	function handleResize() {
		if (window.innerWidth >= 640 && isExpanded) {
			isExpanded = false;
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (!isExpanded || !headerEl || headerEl.contains(e.target as Node)) return;
		isExpanded = false;
	}

	function toggleTheme() {
		themeStore.cycleTheme();
	}
</script>

<svelte:window onscroll={handleScroll} onresize={handleResize} onclick={handleClickOutside} />

<header
	bind:this={headerEl}
	class="group sticky top-4 z-50 mb-[clamp(2rem,4vw,3rem)] flex items-center justify-between rounded-xl border border-transparent max-sm:py-1 sm:rounded-2xl"
	class:not-top={isNotTop}
	class:expanded={isExpanded}
	data-show={isShow}
>
	<a
		class="header-title z-30 text-xl font-medium transition-all duration-300"
		href={resolve('/')}
		aria-label="Beranda"
	>
		{siteConfig.title}
	</a>

	<div class="flex items-center gap-x-2">
		<div
			id="headerExpandContent"
			class="inset-x-0 top-12 grid border border-transparent group-[.expanded]:opacity-100 group-[.not-top]:rounded-xl max-sm:absolute max-sm:opacity-0 max-sm:group-[.expanded.not-top]:bg-background max-sm:group-[.not-top]:border-border max-sm:group-[.not-top]:px-4 max-sm:group-[.not-top]:py-2 sm:grid-rows-1 max-sm:group-[.expanded.not-top]:dark:bg-muted"
		>
			<div class="flex flex-col items-center justify-center overflow-hidden sm:flex-row">
				{#each siteConfig.header.menu as item (item.link)}
					<a
						href={resolve(item.link as '/')}
						onclick={() => (isExpanded = false)}
						class="w-full flex-none grow py-2 text-right font-medium text-foreground/90 transition-colors hover:text-primary sm:w-fit sm:px-3 sm:text-muted-foreground sm:hover:text-foreground"
						aria-label={`Menu ${item.title}`}
					>
						{item.title}
					</a>
				{/each}
			</div>
		</div>

		<div class="action-buttons z-30 flex items-center transition-all duration-300">
			<button
				type="button"
				onclick={toggleTheme}
				aria-label="Ganti tema warna"
				title={`Tema: ${themeStore.theme}`}
				class="box-content size-5 rounded-md border border-border/80 bg-background/50 p-1.5 transition-colors hover:bg-border sm:group-[.not-top]:rounded-xl dark:bg-muted/50"
			>
				{#if themeStore.theme === 'dark'}
					<Icon class="size-5 text-foreground" name="moon" />
				{:else if themeStore.theme === 'light'}
					<Icon class="size-5 text-foreground" name="sun" />
				{:else}
					<Icon class="size-5 text-foreground" name="computer" />
				{/if}
			</button>

			<button
				type="button"
				onclick={(e) => {
					e.stopPropagation();
					isExpanded = !isExpanded;
				}}
				aria-label="Buka menu navigasi"
				aria-expanded={isExpanded}
				class="rounded-md border border-border/80 bg-background/50 p-1.5 text-foreground transition-colors hover:bg-border sm:hidden sm:group-[.not-top]:rounded-xl dark:bg-muted/50"
			>
				<Icon class="size-5 text-foreground" name="menu" />
			</button>
		</div>
	</div>
</header>

<style>
	header {
		transition:
			padding 0.3s,
			transform 0.3s,
			margin-inline 0.3s,
			border 0.15s,
			background-color 0.15s;
	}

	header.not-top {
		border-color: hsl(var(--border));
		background-color: var(--header-bg, hsl(var(--background)));
		padding-left: 0.375rem;
		padding-right: 0.375rem;
		box-shadow:
			rgb(255, 255, 255) 0 0 0 0,
			rgba(24, 24, 27, 0.08) 0 0 0 1px,
			rgba(39, 39, 42, 0.08) 0 10px 15px -3px,
			rgba(39, 39, 42, 0.08) 0 4px 6px -4px;
	}

	header.not-top .header-title {
		margin-inline-start: 0.5rem;
	}

	@media (min-width: 640px) {
		header.not-top .header-title {
			margin-inline-start: 0.75rem;
		}
	}

	.action-buttons {
		gap: 1rem;
	}

	header.not-top .action-buttons {
		gap: 0.5rem;
	}

	header[data-show='false']:not(.expanded) {
		transform: translateY(-5rem);
	}

	@media (min-width: 800px) {
		header.not-top {
			margin-inline: clamp(0rem, 2vw, 2rem);
		}
	}

	@media (max-width: 640px) {
		#headerExpandContent {
			grid-template-rows: 0fr;
			transition:
				opacity 0.3s,
				padding 0.3s,
				border-color 0.15s,
				grid-template-rows 0.3s;
		}

		header.expanded #headerExpandContent {
			grid-template-rows: 1fr;
		}

		header.expanded.not-top #headerExpandContent {
			box-shadow:
				rgb(255, 255, 255) 0 0 0 0,
				rgba(24, 24, 27, 0.08) 0 0 0 1px,
				rgba(39, 39, 42, 0.08) 0 10px 15px -3px,
				rgba(39, 39, 42, 0.08) 0 4px 6px -4px;
		}

		header #headerExpandContent::after {
			box-sizing: content-box;
			content: '';
			position: absolute;
			inset-inline: calc(-1rem - 1px);
			bottom: 0;
			top: -5rem;
			z-index: -1;
			transition: 0.3s;
			visibility: hidden;
			opacity: 0;
			border-bottom: 1px solid transparent;
		}

		header:not(.not-top) #headerExpandContent::after {
			visibility: visible;
			bottom: -1rem;
			opacity: 1;
			background-color: hsl(var(--muted));
			border-bottom-color: hsl(var(--border));
		}
	}
</style>
