<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	interface Props {
		heading?: string;
		subheading?: string;
		date?: string;
		href?: string;
		class?: string;
		children?: Snippet;
	}

	let { heading, subheading, date, href, class: className = '', children }: Props = $props();

	const isExternal = $derived(
		href
			? href.startsWith('http://') ||
					href.startsWith('https://') ||
					href.startsWith('mailto:') ||
					href.startsWith('//') ||
					href.startsWith('#')
			: false
	);

	const linkClasses =
		'group relative block rounded-xl border border-border/80 bg-muted/50 p-3.5 transition-all duration-200 hover:border-foreground/25 hover:bg-muted/80 hover:shadow-xs sm:p-4';
	const staticClasses = 'relative rounded-xl border border-border/80 bg-muted/50 p-3.5 sm:p-4';
</script>

{#snippet cardBody(isInteractive: boolean)}
	<div class="flex flex-col gap-y-1">
		<div class="flex items-baseline justify-between gap-x-3">
			{#if heading}
				<h3
					class="text-sm font-medium text-foreground {isInteractive
						? 'transition-colors group-hover:text-primary'
						: ''} sm:text-base"
				>
					{heading}
				</h3>
			{/if}
			{#if date}
				<span class="shrink-0 font-mono text-xs text-muted-foreground">{date}</span>
			{/if}
		</div>
		{#if subheading}
			<p class="text-xs text-muted-foreground sm:text-sm">{subheading}</p>
		{/if}
		{#if children}
			<div class="mt-1 text-xs text-muted-foreground sm:text-sm">
				{@render children()}
			</div>
		{/if}
	</div>
{/snippet}

{#if href && isExternal}
	<a {href} target="_blank" rel="external noopener noreferrer" class="{linkClasses} {className}">
		{@render cardBody(true)}
	</a>
{:else if href}
	<a href={resolve(href as '/')} class="{linkClasses} {className}">
		{@render cardBody(true)}
	</a>
{:else}
	<div class="{staticClasses} {className}">
		{@render cardBody(false)}
	</div>
{/if}
