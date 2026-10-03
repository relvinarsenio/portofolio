<script lang="ts">
	import {
		siteConfig,
		experienceData,
		educationData,
		certificatesData,
		toolsData,
		interestsData,
		specialLinksData
	} from '$lib/data';
	import Button from '$lib/components/ui/Button.svelte';
	import CvDownloadButton from '$lib/components/ui/CvDownloadButton.svelte';
	import SpecialLinkCard from '$lib/components/ui/SpecialLinkCard.svelte';
	import Timeline from '$lib/features/timeline/Timeline.svelte';
	import CertificateList from '$lib/features/certificates/CertificateList.svelte';
	import ToolSection from '$lib/features/tools/ToolSection.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import TOC, { type TocHeadingItem } from '$lib/components/layout/TOC.svelte';

	const headings: TocHeadingItem[] = [
		{ title: 'Pengalaman Kerja', slug: 'work-experience' },
		{ title: 'Pendidikan', slug: 'education' },
		{ title: 'Sertifikasi', slug: 'certifications' },
		{ title: 'Alat & Stack', slug: 'tools-stack' },
		{ title: 'Minat & Fokus', slug: 'interests' },
		{ title: 'Hubungi Saya', slug: 'get-in-touch' }
	];
</script>

<div class="animate flex flex-col gap-y-[clamp(1.75rem,2.35vw,2.875rem)]">
	<header class="flex flex-col gap-y-3">
		<nav aria-label="Breadcrumb navigation" class="flex items-center gap-x-2">
			<Button href="/" variant="back" title="Beranda" />
		</nav>
		<div>
			<h1 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
				Tentang Saya
			</h1>
			<p class="mt-1 text-xs text-muted-foreground sm:text-sm">
				Mengenal latar belakang, fokus teknis sistem, dan perjalanan belajar saya.
			</p>
		</div>
	</header>

	<div class="items-start gap-x-10 md:flex lg:gap-x-14">
		<TOC {headings} class="md:order-2" />

		<div id="content" class="flex min-w-0 flex-1 flex-col gap-y-[clamp(1.75rem,2.35vw,2.875rem)]">
			<section
				aria-label="Biografi"
				class="flex flex-col gap-y-3 text-xs leading-relaxed text-muted-foreground sm:text-sm"
			>
				{#each siteConfig.bio as paragraph, i (i)}
					<p>{paragraph}</p>
				{/each}

				{#if siteConfig.cvUrl}
					<div class="pt-2">
						<CvDownloadButton url={siteConfig.cvUrl} label="Unduh CV (PDF)" />
					</div>
				{/if}
			</section>

			<section id="work-experience" class="flex flex-col gap-y-4">
				<h2 class="text-base font-semibold tracking-tight text-foreground sm:text-lg">
					Pengalaman Kerja
				</h2>
				<Timeline items={experienceData} type="work" />
			</section>

			<section id="education" class="flex flex-col gap-y-4">
				<h2 class="text-base font-semibold tracking-tight text-foreground sm:text-lg">
					Pendidikan
				</h2>
				<Timeline items={educationData} type="education" />
			</section>

			<section id="certifications" class="flex flex-col gap-y-4">
				<h2 class="text-base font-semibold tracking-tight text-foreground sm:text-lg">
					Sertifikasi
				</h2>
				<CertificateList certificates={certificatesData} />
			</section>

			<section id="tools-stack" class="flex flex-col gap-y-4">
				<h2 class="text-base font-semibold tracking-tight text-foreground sm:text-lg">
					Alat & Stack
				</h2>
				<div class="flex flex-col gap-y-5">
					{#each toolsData as toolGroup (toolGroup.title)}
						<ToolSection title={toolGroup.title} tools={toolGroup.tools} />
					{/each}
				</div>
			</section>

			<section id="interests" class="flex flex-col gap-y-4">
				<h2 class="text-base font-semibold tracking-tight text-foreground sm:text-lg">
					Minat & Fokus
				</h2>
				<ul class="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
					{#each interestsData as hobby (hobby.title)}
						<li>
							<div
								class="group flex items-start gap-x-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-border/80 hover:bg-muted/40"
							>
								<div
									class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
									aria-hidden="true"
								>
									<Icon name={hobby.icon} size={15} />
								</div>
								<div class="flex flex-col">
									<h3
										class="text-xs font-medium text-foreground transition-colors group-hover:text-primary sm:text-sm"
									>
										{hobby.title}
									</h3>
									<p class="text-[11px] leading-snug text-muted-foreground">{hobby.desc}</p>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</section>

			<section id="get-in-touch" class="flex flex-col gap-y-4">
				<h2 class="text-base font-semibold tracking-tight text-foreground sm:text-lg">
					Hubungi Saya
				</h2>
				<address class="flex flex-col gap-y-3.5 not-italic">
					<p class="text-xs text-muted-foreground sm:text-sm">
						Hubungi saya untuk mendiskusikan peluang kolaborasi, implementasi sistem, atau
						konsultasi teknis.
					</p>
					<nav aria-label="Tautan kontak dan media sosial">
						<ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
							{#each specialLinksData as link (link.name)}
								<li>
									<SpecialLinkCard {link} />
								</li>
							{/each}
						</ul>
					</nav>
				</address>
			</section>
		</div>
	</div>
</div>
