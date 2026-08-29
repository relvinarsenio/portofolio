<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	interface Props {
		title: string;
		href?: string;
		target?: string;
		class?: string;
		icon?: Snippet;
	}

	let { title, href, target, class: className = '', icon }: Props = $props();

	const isExternal = $derived(
		href
			? href.startsWith('http://') ||
					href.startsWith('https://') ||
					href.startsWith('mailto:') ||
					href.startsWith('//') ||
					href.startsWith('#')
			: false
	);

	const sharedClasses =
		'inline-flex items-center justify-center gap-x-1.5 text-sm font-medium transition-all duration-200';
</script>

{#snippet content()}
	{#if icon}
		{@render icon()}
	{/if}
	<span>{title}</span>
{/snippet}

{#if href && isExternal}
	<a
		{href}
		target={target ?? '_blank'}
		rel="external noopener noreferrer"
		class="{sharedClasses} text-muted-foreground hover:text-foreground {className}"
	>
		{@render content()}
	</a>
{:else if href}
	<a
		href={resolve(href as '/')}
		{target}
		class="{sharedClasses} text-muted-foreground hover:text-foreground {className}"
	>
		{@render content()}
	</a>
{:else}
	<div class="{sharedClasses} text-muted-foreground {className}">
		{@render content()}
	</div>
{/if}
