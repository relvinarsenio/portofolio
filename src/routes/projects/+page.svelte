<script lang="ts">
	import { projectsData } from '$lib/data';
	import type { ProjectCategory } from '$lib/types';
	import ProjectCard from '$lib/features/projects/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { LayoutData } from '../$types';

	interface Props {
		data: LayoutData;
	}

	let { data }: Props = $props();

	type FilterCategory = 'Semua' | ProjectCategory;
	let selectedCategory = $state<FilterCategory>('Semua');

	const projects = $derived(data.projects ?? projectsData);

	const availableCategories = $derived.by(() =>
		Array.from(
			new Set(projects.map((p) => p.category).filter((c): c is ProjectCategory => Boolean(c)))
		)
	);

	const categories = $derived.by(() => [
		{ id: 'Semua' as const, label: 'Semua', count: projects.length },
		...availableCategories.map((category) => ({
			id: category,
			label: category,
			count: projects.filter((p) => p.category === category).length
		}))
	]);

	const projectSections = $derived.by(() => {
		if (selectedCategory !== 'Semua') {
			return [
				{
					category: selectedCategory,
					showHeader: false,
					items: projects.filter((p) => p.category === selectedCategory)
				}
			];
		}

		return availableCategories
			.map((cat) => ({
				category: cat,
				showHeader: true,
				items: projects.filter((p) => p.category === cat)
			}))
			.filter((group) => group.items.length > 0);
	});
</script>

<div class="animate flex flex-col gap-y-10 sm:gap-y-12">
	<header class="flex flex-col gap-y-3">
		<nav aria-label="Breadcrumb navigation" class="flex items-center gap-x-2">
			<Button href="/" variant="back" title="Beranda" />
		</nav>
		<div>
			<h1 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Proyek</h1>
			<p class="mt-1 text-xs text-muted-foreground sm:text-sm">
				Menampilkan CLI tools, program sistem, dan publikasi ilmiah yang saya kembangkan.
			</p>
		</div>
	</header>

	<nav aria-label="Filter kategori proyek">
		<ul
			class="m-0 flex list-none flex-wrap items-center gap-1.5 border-b border-border/70 p-0 pb-3"
		>
			{#each categories as category (category.id)}
				<li>
					<button
						type="button"
						onclick={() => (selectedCategory = category.id)}
						class="flex cursor-pointer items-center gap-x-1.5 rounded-lg px-3 py-1.5 text-xs transition-all {selectedCategory ===
						category.id
							? 'bg-primary/10 font-semibold text-primary'
							: 'font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground'}"
					>
						<span>{category.label}</span>
						<span
							class="text-[11px] font-normal transition-colors {selectedCategory === category.id
								? 'text-primary/80'
								: 'text-muted-foreground/60'}"
						>
							({category.count})
						</span>
					</button>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="flex flex-col gap-y-10 sm:gap-y-12">
		{#each projectSections as section (section.category)}
			<section
				aria-labelledby={section.showHeader ? `section-${section.category}` : undefined}
				class="flex flex-col gap-y-4"
			>
				{#if section.showHeader}
					<h2
						id={`section-${section.category}`}
						class="text-base font-semibold tracking-tight text-foreground sm:text-lg"
					>
						{section.category}
					</h2>
				{/if}

				<ul class="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
					{#each section.items as project (project.title)}
						<li>
							<ProjectCard
								variant="card"
								heading={project.title}
								subheading={project.description}
								image={project.image}
								href={project.href}
								github={project.github}
								release={project.release}
								tags={project.tags}
							/>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>

	<aside
		aria-label="Kolaborasi callout"
		class="mt-4 flex flex-col items-center justify-between gap-y-3 rounded-xl border border-dashed border-border/80 p-5 text-center sm:flex-row sm:text-left"
	>
		<div class="flex flex-col gap-y-0.5">
			<h2 class="text-xs font-semibold text-foreground sm:text-sm">
				Punya ide proyek atau peluang kolaborasi?
			</h2>
			<p class="text-xs text-muted-foreground">
				Saya siap berdiskusi seputar implementasi sistem, pengembangan tools, atau peluang
				kolaborasi.
			</p>
		</div>
		<Button href="/about#get-in-touch" title="Hubungi Saya" variant="ahead" />
	</aside>
</div>
