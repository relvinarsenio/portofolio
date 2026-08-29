<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		id?: string;
		class?: string;
		children?: Snippet;
	}

	let { title, id, class: className = '', children }: Props = $props();

	const sectionId = $derived(
		id ||
			title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '')
	);
</script>

<section
	id={sectionId}
	class="flex flex-col gap-y-5 md:flex-row md:gap-x-5 md:gap-y-0 lg:gap-x-6 {className}"
>
	<div class="shrink-0 text-xl font-medium md:w-40 lg:w-44">
		<h2 id={`heading-${sectionId}`}>{title}</h2>
	</div>
	<div class="flex min-w-0 flex-1 flex-col gap-y-3">
		{#if children}
			{@render children()}
		{/if}
	</div>
</section>
