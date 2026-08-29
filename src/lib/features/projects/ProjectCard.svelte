<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { EnhancedImage } from '$lib/types';

	interface Props {
		heading: string;
		subheading: string;
		image?: EnhancedImage;
		href?: string;
		github?: string;
		release?: string;
		tags?: string[];
		variant?: 'card' | 'compact';
		class?: string;
	}

	let {
		heading,
		subheading,
		image,
		href,
		github,
		release,
		tags = [],
		variant = 'card',
		class: className = ''
	}: Props = $props();

	let isExpanded = $state(false);

	const isCompact = $derived(variant === 'compact');

	const repoPath = $derived(
		github ? github.replace(/^https:\/\/github\.com\//, '').replace(/\/$/, '') : null
	);

	const displayImageUrl = $derived(
		typeof image === 'string'
			? image
			: (image?.img?.src ??
					(repoPath ? `https://opengraph.githubassets.com/1/${repoPath}` : undefined))
	);

	function toggleExpand(e: MouseEvent) {
		e.stopPropagation();
		isExpanded = !isExpanded;
	}
</script>

<article
	class="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-muted/25 transition-all duration-200 hover:border-foreground/20 hover:bg-muted/45 {isCompact
		? 'p-4.5 sm:p-5'
		: 'overflow-hidden'} {className}"
>
	{#if !isCompact && displayImageUrl}
		<figure
			class="relative aspect-1200/630 w-full overflow-hidden border-b border-border/50 bg-muted/60 select-none"
			oncontextmenu={(e) => e.preventDefault()}
		>
			<img
				src={displayImageUrl}
				alt={heading}
				loading="lazy"
				decoding="async"
				draggable="false"
				class="pointer-events-none size-full object-cover opacity-85 transition-all duration-300 select-none group-hover:scale-105 group-hover:opacity-100 dark:opacity-75 dark:group-hover:opacity-95"
			/>
			<div
				class="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/25 to-transparent"
			></div>
		</figure>
	{/if}

	<div class="relative flex flex-1 flex-col justify-between {!isCompact ? 'p-4 sm:p-5' : ''}">
		<div class="flex flex-col gap-y-2">
			<!-- Header Title & External Link -->
			<header class="flex items-start justify-between gap-x-3">
				<div class="min-w-0 flex-1">
					{#if href}
						<a
							{href}
							target="_blank"
							rel="external noopener noreferrer"
							class="group/title inline-flex items-baseline gap-x-1 font-semibold text-foreground transition-colors hover:text-primary {isCompact
								? 'text-sm'
								: 'text-sm sm:text-base'}"
						>
							<span class="line-clamp-2">{heading}</span>
							{#if !github && !release}
								<span
									class="shrink-0 text-muted-foreground/60 transition-transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:text-primary"
								>
									<Icon name="arrow-up-right" size={13} />
								</span>
							{/if}
						</a>
					{:else}
						<h3
							class="line-clamp-2 font-semibold text-foreground {isCompact
								? 'text-sm'
								: 'text-sm sm:text-base'}"
						>
							{heading}
						</h3>
					{/if}
				</div>

				{#if github || release}
					<nav class="flex shrink-0 items-center pt-0.5" aria-label="Tautan proyek">
						{#if github}
							<a
								href={github}
								target="_blank"
								rel="external noopener noreferrer"
								class="text-muted-foreground/70 transition-colors hover:text-foreground"
								title="Buka Repositori GitHub"
								aria-label="Buka Repositori GitHub"
							>
								<Icon name="github" size={16} />
							</a>
						{:else if release}
							<a
								href={release}
								target="_blank"
								rel="external noopener noreferrer"
								class="text-muted-foreground/70 transition-colors hover:text-foreground"
								title="Lihat Rilis"
								aria-label="Lihat Rilis"
							>
								<Icon name="package" size={16} />
							</a>
						{/if}
					</nav>
				{/if}
			</header>

			<!-- Subheading / Description -->
			<button
				type="button"
				onclick={toggleExpand}
				class="cursor-pointer text-left text-xs leading-relaxed text-muted-foreground transition-colors hover:text-foreground/90 focus:outline-none"
				title={!isExpanded ? 'Klik untuk membaca selengkapnya' : 'Klik untuk meringkas'}
				aria-expanded={isExpanded}
			>
				<p class={!isExpanded ? 'line-clamp-3' : ''}>
					{subheading}
				</p>
			</button>
		</div>

		<!-- Tags -->
		{#if tags.length > 0}
			<ul
				class="m-0 mt-3.5 flex list-none flex-wrap items-center gap-1.5 p-0"
				aria-label="Teknologi yang digunakan"
			>
				{#each tags as tag (tag)}
					<li>
						<span
							class="inline-block rounded-md bg-muted/60 px-2 py-0.5 font-mono text-[11px] leading-tight text-muted-foreground/85 transition-colors group-hover:text-foreground"
						>
							{tag}
						</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</article>
