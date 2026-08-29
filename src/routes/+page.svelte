<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		siteConfig,
		projectsData,
		nowActivities,
		learningTracks,
		recentMilestones
	} from '$lib/data';
	import jutiBanner from '$lib/assets/publication-juti.svg';
	import Section from '$lib/components/layout/Section.svelte';
	import ProjectCard from '$lib/features/projects/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import CvDownloadButton from '$lib/components/ui/CvDownloadButton.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import Quote from '$lib/components/ui/Quote.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
	}

	let { data }: Props = $props();

	const projects = $derived(data.projects ?? projectsData);
	const spotlightProjects = $derived(projects.filter((p) => p.featured));
	const githubUrl = $derived(
		siteConfig.footer.social.find((s) => s.label.toLowerCase() === 'github')?.href ??
			siteConfig.statusUrl
	);
</script>

<div class="flex w-full flex-col items-center">
	<header
		id="content-header"
		class="animate mb-10 flex flex-col items-center gap-y-4 text-center sm:mb-14 sm:gap-y-5"
	>
		<figure class="m-0">
			<img
				src={siteConfig.avatar}
				alt={siteConfig.author}
				class="size-32 rounded-full border border-border/80 object-cover p-1.5 shadow-sm sm:size-36 md:size-40"
				loading="eager"
				decoding="async"
			/>
		</figure>

		<div class="flex flex-col items-center gap-y-2">
			<h1 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
				{siteConfig.author}
			</h1>

			<p class="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
				{siteConfig.description}
			</p>

			<div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-1">
				<Label title={siteConfig.location} class="text-xs sm:text-sm">
					{#snippet icon()}
						<Icon name="location" size={14} />
					{/snippet}
				</Label>

				{#if githubUrl}
					<Label title="GitHub" href={githubUrl} target="_blank" class="text-xs sm:text-sm">
						{#snippet icon()}
							<Icon name="github" size={14} />
						{/snippet}
					</Label>
				{/if}
			</div>
		</div>

		{#if siteConfig.status}
			<a
				href={siteConfig.statusUrl || '#'}
				target="_blank"
				rel="external noopener noreferrer"
				class="group mt-0.5 flex w-fit shrink-0 flex-row items-center gap-x-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 text-xs whitespace-nowrap text-muted-foreground shadow-xs transition-all hover:border-foreground/20 hover:bg-muted"
			>
				<span class="relative flex size-2 shrink-0 items-center justify-center" aria-hidden="true">
					<span class="absolute size-2.5 animate-ping rounded-full bg-emerald-500 opacity-75"
					></span>
					<span class="size-2 rounded-full bg-emerald-500"></span>
				</span>
				<span class="whitespace-nowrap">{siteConfig.status}</span>
			</a>
		{/if}

		<nav class="mt-2 flex flex-wrap items-center justify-center gap-2" aria-label="Aksi cepat">
			<a
				href={resolve('/projects')}
				class="inline-flex items-center gap-x-1.5 rounded-lg border border-border/80 bg-muted/70 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-foreground/25 hover:bg-muted sm:text-sm"
			>
				<Icon name="package" size={14} />
				<span>Lihat Proyek</span>
			</a>
			<a
				href={resolve('/about')}
				class="inline-flex items-center gap-x-1.5 rounded-lg border border-transparent px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground sm:text-sm"
			>
				<span>Tentang Saya</span>
				<Icon name="arrow-up-right" size={14} />
			</a>
			{#if siteConfig.cvUrl}
				<CvDownloadButton url={siteConfig.cvUrl} />
			{/if}
		</nav>
	</header>

	<div id="content" class="animate flex w-full flex-col gap-y-12 sm:gap-y-16">
		<Section title="Fokus Utama">
			<ul class="m-0 flex list-none flex-col gap-y-3.5 p-0">
				{#each nowActivities as item (item.title)}
					<li class="group flex items-start gap-x-3">
						<span
							class="mt-1 flex size-5 shrink-0 items-center justify-center text-muted-foreground transition-colors group-hover:text-foreground"
							aria-hidden="true"
						>
							<Icon name={item.icon} size={16} />
						</span>
						<div class="flex flex-col gap-y-0.5">
							<h3
								class="text-xs font-semibold text-foreground transition-colors group-hover:text-primary sm:text-sm"
							>
								{item.title}
							</h3>
							<p class="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
						</div>
					</li>
				{/each}
			</ul>
		</Section>

		<Section title="Karya Unggulan">
			<ul class="m-0 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
				{#each spotlightProjects as project (project.title)}
					<li>
						<ProjectCard
							variant="card"
							heading={project.title}
							subheading={project.description}
							image={project.image ?? (project.category === 'Publikasi' ? jutiBanner : undefined)}
							href={project.href}
							github={project.github}
							release={project.release}
							tags={project.tags}
						/>
					</li>
				{/each}
			</ul>
			<nav class="mt-1 flex justify-end" aria-label="Navigasi proyek">
				<Button
					title={`Jelajahi semua proyek & publikasi (${projects.length})`}
					href="/projects"
					variant="ahead"
				/>
			</nav>
		</Section>

		<Section title="Alur Belajar">
			<ol class="relative m-0 flex list-none flex-col gap-y-6 p-0">
				{#each learningTracks as track, idx (track.step)}
					<li class="group relative flex items-start gap-x-4">
						<div class="flex flex-col items-center self-stretch">
							<span
								class="font-mono text-xs font-bold text-muted-foreground transition-colors group-hover:text-primary"
							>
								{track.step}
							</span>
							{#if idx < learningTracks.length - 1}
								<span class="mt-2 w-px flex-1 bg-border/80" aria-hidden="true"></span>
							{/if}
						</div>

						<article class="flex-1 pb-1">
							<header class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
								<span
									class="flex size-5 items-center justify-center text-muted-foreground transition-colors group-hover:text-primary"
									aria-hidden="true"
								>
									<Icon name={track.icon} size={15} />
								</span>
								<h3
									class="text-xs font-semibold text-foreground transition-colors group-hover:text-primary sm:text-sm"
								>
									{track.title}
								</h3>
								<span
									class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
								>
									{track.category}
								</span>
							</header>
							<p class="mt-1 text-xs leading-relaxed text-muted-foreground">
								{track.desc}
							</p>
						</article>
					</li>
				{/each}
			</ol>
		</Section>

		<Section title="Pencapaian Terbaru">
			<ol class="m-0 flex list-none flex-col divide-y divide-border/60 p-0">
				{#each recentMilestones as item (item.title)}
					<li class="flex items-start justify-between gap-x-3 py-3 first:pt-0 last:pb-0 sm:gap-x-4">
						<div class="flex items-start gap-x-2.5">
							<div
								class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
								aria-hidden="true"
							>
								<Icon name={item.icon} size={14} />
							</div>
							<div>
								<h3 class="text-xs font-semibold text-foreground sm:text-sm">{item.title}</h3>
								<p class="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
							</div>
						</div>
						<time
							class="self-start font-mono text-xs font-semibold whitespace-nowrap text-primary sm:self-auto"
						>
							{item.year}
						</time>
					</li>
				{/each}
			</ol>
			<nav class="mt-1 flex justify-end" aria-label="Navigasi tentang">
				<Button title="Buka profil & riwayat lengkap" href="/about" variant="ahead" />
			</nav>
		</Section>
	</div>

	<Quote />
</div>
