<script lang="ts">
	export interface TocHeadingItem {
		title: string;
		slug: string;
		depth?: number;
	}

	interface Props {
		headings: TocHeadingItem[];
		class?: string;
		id?: string;
	}

	interface HeadingProgress {
		inView: boolean;
		progress: number;
	}

	let { headings, class: className = '', id }: Props = $props();
	let headingProgress = $state<Record<string, HeadingProgress>>({});

	function handleNavigate(e: MouseEvent, slug: string) {
		e.preventDefault();
		const target = document.getElementById(slug);
		if (!target) return;

		history.pushState(null, target.textContent || '', `#${slug}`);
		target.scrollIntoView({ behavior: 'smooth' });
	}

	$effect(() => {
		let ticking = false;

		const updatePosition = () => {
			ticking = false;
			const windowHeight = window.innerHeight;
			const contentEl = document.querySelector('#content') as HTMLElement | null;
			const contentBottom = contentEl ? contentEl.getBoundingClientRect().bottom : windowHeight;

			const headingElements = headings
				.map((h) => document.getElementById(h.slug))
				.filter((el): el is HTMLElement => el !== null);

			const nextProgress: Record<string, HeadingProgress> = {};

			headingElements.forEach((el, index) => {
				const nextHeading = headingElements[index + 1];
				const elRect = el.getBoundingClientRect();
				const nextHeadingTop = nextHeading
					? nextHeading.getBoundingClientRect().top
					: contentBottom + 127;

				const headingEl = (el.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement | null) || el;
				const headingHeight = headingEl === el ? 28 : headingEl.offsetHeight;

				const range0 = elRect.top;
				const range1 = nextHeadingTop - headingHeight;
				const rawProgress = (windowHeight - range0) / (range1 - range0);

				nextProgress[el.id] = {
					inView: range0 < windowHeight && range1 > 0,
					progress: Math.max(0, Math.min(1, rawProgress))
				};
			});

			headingProgress = nextProgress;
		};

		const onScrollOrResize = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(updatePosition);
			}
		};

		updatePosition();

		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
		};
	});
</script>

<aside
	{id}
	class="top-24 hidden min-w-48 shrink-0 basis-60 md:sticky md:block {className}"
	aria-label="Daftar isi"
>
	<h2 class="text-xs font-medium tracking-wider text-foreground/80 uppercase">DAFTAR ISI</h2>
	<ul class="mt-4 flex flex-col space-y-0.5">
		{#each headings as heading, index (heading.slug)}
			{@const current = headingProgress[heading.slug] ?? { inView: false, progress: 0 }}
			{@const prevSlug = headings[index - 1]?.slug}
			{@const nextSlug = headings[index + 1]?.slug}
			{@const isFirstInView = current.inView && (index === 0 || !headingProgress[prevSlug]?.inView)}
			{@const isLastInView =
				current.inView && (index === headings.length - 1 || !headingProgress[nextSlug]?.inView)}
			<li>
				<div class="relative">
					<span
						class="toc-bar absolute top-[5%] left-0 w-0.5 rounded transition-colors duration-300"
						class:is-read={!current.inView && current.progress === 1}
						class:highlight-bg={current.inView}
						style:height="{current.progress * 90}%"
					></span>
					<a
						aria-label={`Navigasi ke seksi: ${heading.title}`}
						class="toc-item ms-2 line-clamp-2 flow-root w-full px-3 py-1 text-xs text-foreground/75 transition-all hover:text-foreground"
						class:ps-7={(heading.depth ?? 2) > 2}
						class:highlight={current.inView}
						class:highlight-bg-translucent={current.inView}
						class:rounded-t-2xl={isFirstInView}
						class:rounded-b-2xl={isLastInView}
						href={`#${heading.slug}`}
						onclick={(e) => handleNavigate(e, heading.slug)}
					>
						{heading.title}
					</a>
				</div>
			</li>
		{/each}
	</ul>
</aside>
