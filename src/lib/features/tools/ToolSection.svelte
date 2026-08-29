<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { ToolItem } from '$lib/types';

	interface Props {
		title: string;
		tools: ToolItem[];
		class?: string;
	}

	let { title, tools, class: className = '' }: Props = $props();
</script>

{#snippet toolContent(tool: ToolItem, isInteractive: boolean)}
	<div
		class="flex size-9 items-center justify-center rounded-lg bg-muted/80 {isInteractive
			? 'transition-colors group-hover:bg-card'
			: ''}"
		aria-hidden="true"
	>
		<Icon name={tool.icon || 'terminal'} size={20} colorful={true} />
	</div>
	<div class="flex flex-col">
		<span
			class="text-xs font-medium text-foreground {isInteractive
				? 'transition-colors group-hover:text-primary'
				: ''} sm:text-sm"
		>
			{tool.name}
		</span>
		<span class="text-[11px] text-muted-foreground">
			{tool.description}
		</span>
	</div>
{/snippet}

<div class="flex flex-col gap-y-2.5 {className}">
	<h3 class="text-xs font-semibold tracking-wider text-muted-foreground uppercase sm:text-sm">
		{title}
	</h3>

	<ul class="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
		{#each tools as tool (tool.name)}
			<li>
				{#if tool.href}
					<a
						href={tool.href}
						target="_blank"
						rel="external noopener noreferrer"
						class="group flex items-center gap-x-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-border/80 hover:bg-muted/50"
					>
						{@render toolContent(tool, true)}
					</a>
				{:else}
					<div class="group flex items-center gap-x-3 rounded-lg p-2">
						{@render toolContent(tool, false)}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>
