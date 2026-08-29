<script lang="ts">
	import '@fontsource-variable/inconsolata';
	import './layout.css';
	import { page } from '$app/state';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';
	import { siteConfig, toolsData } from '$lib/data';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';

	let { children } = $props();

	const pageUrl = $derived(page.url.href);
	const origin = $derived(page.url.origin);

	const pageTitle = $derived(
		page.url.pathname === '/about'
			? `Tentang \u2014 ${siteConfig.author}`
			: page.url.pathname === '/projects'
				? `Proyek \u2014 ${siteConfig.author}`
				: `${siteConfig.title} \u2014 ${siteConfig.author}`
	);

	const avatarUrl = $derived(
		siteConfig.avatar.startsWith('http') ? siteConfig.avatar : `${origin}${siteConfig.avatar}`
	);

	const socialLinks = $derived(siteConfig.footer.social.map((s) => s.href));
	const knowsAbout = $derived([
		...toolsData.flatMap((g) => g.tools.map((t) => t.name)),
		'Linux Server Administration',
		'Network Administration',
		'BNSP Junior Network Administrator'
	]);
</script>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteConfig.author,
		url: origin,
		image: avatarUrl,
		jobTitle: 'System Administrator & C++ Developer',
		description: siteConfig.description,
		sameAs: socialLinks,
		knowsAbout
	}}
/>

<MetaTags
	title={pageTitle}
	description={siteConfig.description}
	canonical={pageUrl}
	openGraph={{
		type: 'website',
		url: pageUrl,
		title: pageTitle,
		description: siteConfig.description,
		siteName: siteConfig.title,
		images: [
			{
				url: avatarUrl,
				alt: `${siteConfig.author} \u2014 Portofolio`
			}
		]
	}}
	twitter={{
		cardType: 'summary',
		title: pageTitle,
		description: siteConfig.description,
		image: avatarUrl,
		imageAlt: `${siteConfig.author} \u2014 Portofolio`
	}}
	additionalLinkTags={[
		{
			rel: 'icon',
			sizes: 'any',
			href: '/favicon.ico'
		}
	]}
/>

<div
	class="relative flex min-h-screen justify-center selection:bg-primary/20 selection:text-primary"
>
	<div
		class="pointer-events-none absolute inset-x-0 top-0 z-0 h-96 opacity-25 [background:radial-gradient(ellipse_at_top,var(--color-primary),transparent_70%)]"
	></div>

	<div
		class="relative z-10 flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-6 md:px-10 lg:px-12"
	>
		<Header />
		<main class="w-full flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>

	<BackToTop />
</div>
