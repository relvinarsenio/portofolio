<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import Icon from './Icon.svelte';

	interface Props {
		title?: string;
		href?: string;
		download?: boolean | string;
		type?: 'button' | 'submit' | 'reset';
		variant?: 'button' | 'pill' | 'back' | 'ahead';
		target?: string;
		class?: string;
		children?: Snippet;
		onclick?: () => void;
	}

	let {
		title,
		href,
		download,
		type = 'button',
		variant = 'button',
		target,
		class: className = '',
		children,
		onclick
	}: Props = $props();

	const isExternal = $derived(
		href
			? href.startsWith('http://') ||
					href.startsWith('https://') ||
					href.startsWith('mailto:') ||
					href.startsWith('//') ||
					href.startsWith('#')
			: false
	);

	const baseClasses =
		'group inline-flex items-center gap-x-1.5 rounded-lg border border-border/80 bg-muted/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground no-underline transition-all hover:border-foreground/25 hover:bg-muted';
	const pillClasses =
		'group inline-flex items-center gap-x-1 rounded-lg border border-border/80 bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground no-underline transition-all hover:border-foreground/20 hover:bg-card hover:text-foreground cursor-default';

	const computedClasses = $derived(variant === 'pill' ? pillClasses : baseClasses);
</script>

{#snippet content()}
	{#if variant === 'back'}
		<Icon
			name="back"
			size={14}
			class="transition-transform duration-200 group-hover:-translate-x-0.5"
		/>
	{/if}

	{#if children}
		{@render children()}
	{:else if title}
		<span>{title}</span>
	{/if}

	{#if variant === 'ahead'}
		<Icon
			name="ahead"
			size={14}
			class="transition-transform duration-200 group-hover:translate-x-0.5"
		/>
	{/if}
{/snippet}

{#if href && isExternal}
	<a
		{href}
		target={target ?? '_blank'}
		{download}
		rel="external noopener noreferrer"
		class="{computedClasses} {className}"
	>
		{@render content()}
	</a>
{:else if href}
	<a href={resolve(href as '/')} {target} {download} class="{computedClasses} {className}">
		{@render content()}
	</a>
{:else}
	<button {type} {onclick} class="{computedClasses} {className}">
		{@render content()}
	</button>
{/if}
