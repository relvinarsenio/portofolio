<script lang="ts">
	import { onMount } from 'svelte';
	import { quotesData } from '$lib/data';
	import type { QuoteItem } from '$lib/types';
	import Icon from './Icon.svelte';

	let quote = $state<QuoteItem>(quotesData[0]);
	let isLoading = $state<boolean>(false);

	async function fetchRandomQuote() {
		isLoading = true;
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 4000);

			const res = await fetch('https://dummyjson.com/quotes/random', {
				signal: controller.signal
			});
			clearTimeout(timeoutId);

			if (res.ok) {
				const data = (await res.json()) as { quote: string; author: string };
				quote = {
					content: data.quote,
					author: data.author
				};
				return;
			}
		} catch {
			const randomIndex = Math.floor(Math.random() * quotesData.length);
			quote = quotesData[randomIndex];
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		const randomIndex = Math.floor(Math.random() * quotesData.length);
		quote = quotesData[randomIndex];
	});
</script>

<section
	id="quote-section"
	aria-label="Inspirational quote"
	class="animate mt-[clamp(2rem,4vw,4rem)] w-full max-w-[clamp(20rem,55vw,52rem)] text-center"
>
	<figure class="m-0 flex flex-col items-center gap-y-2.5">
		<blockquote
			class="text-xs leading-relaxed text-muted-foreground italic transition-opacity duration-300 sm:text-sm {isLoading
				? 'opacity-40'
				: 'opacity-100'}"
		>
			&ldquo;{quote.content}&rdquo;
		</blockquote>

		<figcaption class="flex items-center gap-x-2">
			<cite
				class="font-mono text-[11px] font-medium tracking-wide text-muted-foreground/90 uppercase not-italic sm:text-xs"
			>
				&mdash; {quote.author}
			</cite>
			<button
				type="button"
				onclick={fetchRandomQuote}
				disabled={isLoading}
				aria-label="Refresh quote"
				title="Get another quote"
				class="cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground active:scale-95 disabled:opacity-50"
			>
				<span class={isLoading ? 'inline-block animate-spin' : ''}>
					<Icon name="refresh" size={12} />
				</span>
			</button>
		</figcaption>
	</figure>
</section>
