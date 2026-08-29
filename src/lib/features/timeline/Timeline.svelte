<script lang="ts">
	import type { ExperienceItem, EducationItem } from '$lib/types';
	import Icon from '$lib/components/ui/Icon.svelte';

	interface Props {
		items: (ExperienceItem | EducationItem)[];
		type?: 'work' | 'education';
	}

	let { items, type = 'work' }: Props = $props();
</script>

<div class="relative pl-6 sm:pl-8">
	<!-- Continuous Timeline Line -->
	<div
		class="absolute top-2.5 bottom-2 left-2 w-px bg-border/80 sm:left-2.5"
		aria-hidden="true"
	></div>

	<ol class="m-0 flex list-none flex-col gap-y-9 p-0 sm:gap-y-10">
		{#each items as item (item.title + item.date)}
			<li class="group relative flex flex-col gap-y-2">
				<!-- Timeline Node Dot -->
				<span
					aria-hidden="true"
					class="absolute top-0.5 -left-6 flex size-4 items-center justify-center rounded-full border-2 border-border bg-background transition-all duration-200 group-hover:scale-125 group-hover:border-primary group-hover:bg-primary/20 sm:-left-8 sm:size-5"
				>
					<span class="size-1.5 rounded-full bg-muted-foreground group-hover:bg-primary"></span>
				</span>

				<!-- Header: Title, Role/Company, Date -->
				<header
					class="flex flex-col justify-between gap-y-1 sm:flex-row sm:items-baseline sm:gap-x-4"
				>
					<div class="flex flex-col gap-y-1">
						<h3
							class="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-base"
						>
							{item.title}
						</h3>
						{#if item.role}
							<p class="flex items-center gap-x-1.5 text-xs text-muted-foreground sm:text-sm">
								<Icon name={type === 'work' ? 'briefcase' : 'graduation'} size={13} />
								<span>{item.role}</span>
							</p>
						{/if}
					</div>

					{#if item.date}
						<time class="w-fit shrink-0 font-mono text-[11px] text-muted-foreground sm:text-xs">
							{item.date}
						</time>
					{/if}
				</header>

				<!-- Description / Bullet Points -->
				{#if item.description && item.description.length > 0}
					<ul class="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
						{#each item.description as desc, dIdx (dIdx)}
							<li class="flex items-start gap-x-2">
								<span
									aria-hidden="true"
									class="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60"
								></span>
								<span>{desc}</span>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ol>
</div>
