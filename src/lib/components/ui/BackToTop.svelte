<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	interface Props {
		threshold?: number;
		class?: string;
	}

	let { threshold = 80, class: className = '' }: Props = $props();

	let show = $state(false);
	let percent = $state(0);
	let isEnded = $derived(percent >= 99);

	function calculateScroll() {
		if (typeof window === 'undefined') return;
		const scrollTop = Math.max(0, window.scrollY || document.documentElement.scrollTop);
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const maxScrollable = scrollHeight - clientHeight;

		show = scrollTop > threshold;

		if (maxScrollable <= 0) {
			percent = 100;
		} else {
			const progress = Math.min(Math.max(0, scrollTop), maxScrollable);
			percent = Math.round((progress / maxScrollable) * 100);
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		calculateScroll();
		let ticking = false;

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					calculateScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<div
	class="group fixed inset-e-4 bottom-8 z-50 flex flex-col gap-y-4 transition-all duration-300 sm:inset-e-8 {show
		? 'translate-y-0 opacity-100'
		: 'pointer-events-none translate-y-16 opacity-0'} {className}"
	id="action-buttons"
	class:ended={isEnded}
>
	<button
		type="button"
		onclick={scrollToTop}
		aria-label="Back to Top"
		class="relative flex size-10 items-center justify-center rounded-full border-2 border-transparent bg-muted text-muted-foreground transition-all duration-300 hover:border-border/75 hover:text-foreground sm:size-12"
		id="to-top-btn"
	>
		<!-- Scroll Percentage Text -->
		<span
			class="top-text absolute inset-0 flex items-center justify-center font-mono text-xs sm:text-sm"
		>
			<span class="text">{percent}</span>
			<span class="text-[10px] sm:text-xs">%</span>
		</span>

		<!-- Up Arrow / Chevron Icon -->
		<span class="top-icon flex items-center justify-center">
			<Icon name="up" size={18} class="size-4.5 sm:size-5" />
		</span>
	</button>
</div>
