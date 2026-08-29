<script lang="ts">
	import Icon from './Icon.svelte';
	import type { SpecialLinkItem } from '$lib/types';

	interface Props {
		link: SpecialLinkItem;
		class?: string;
	}

	let { link, class: className = '' }: Props = $props();
</script>

<a
	href={link.href}
	target="_blank"
	rel="external noopener noreferrer"
	class="group relative block h-full overflow-hidden rounded-2xl border border-border/80 bg-card/60 px-3.5 py-3 transition-colors hover:border-foreground/20 hover:bg-muted/70 sm:px-4 sm:py-3.5 {className}"
>
	<div class="relative z-10 flex h-full items-center gap-3.5">
		<div
			class="relative size-12 min-w-12 shrink-0 overflow-hidden rounded-full border border-border/70 bg-muted/80"
		>
			{#if link.avatar}
				<img
					src={link.avatar}
					alt={link.name}
					class="size-full object-cover"
					loading="lazy"
					decoding="async"
				/>
			{:else if link.icon}
				<div class="flex size-full items-center justify-center text-foreground">
					<Icon name={link.icon} size={22} />
				</div>
			{/if}

			<div
				class="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
				aria-hidden="true"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="stroke-background"
				>
					<line
						x1="5"
						y1="12"
						x2="19"
						y2="12"
						class="translate-x-3 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:scale-x-100"
					/>
					<polyline
						points="12 5 19 12 12 19"
						class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-0.5"
					/>
				</svg>
			</div>
		</div>

		<div class="flex min-w-0 flex-1 flex-col gap-y-0.5">
			<span
				class="truncate text-xs font-semibold text-foreground transition-colors group-hover:text-primary sm:text-sm"
			>
				{link.name}
			</span>
			<span class="truncate text-xs text-muted-foreground">
				{link.intro}
			</span>
		</div>
	</div>

	{#if link.avatar}
		<img
			src={link.avatar}
			alt=""
			aria-hidden="true"
			class="pointer-events-none absolute -inset-s-3 top-0 z-0 h-full w-2/3 object-cover opacity-15"
			loading="lazy"
			style="mask-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);"
		/>
	{:else if link.icon}
		<div
			aria-hidden="true"
			class="pointer-events-none absolute -inset-s-3 top-1/2 z-0 -translate-y-1/2 opacity-15"
			style="mask-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);"
		>
			<Icon name={link.icon} size={84} class="size-20" />
		</div>
	{/if}
</a>
