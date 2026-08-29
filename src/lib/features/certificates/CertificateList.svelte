<script lang="ts">
	import type { CertificateItem } from '$lib/types';
	import Icon from '$lib/components/ui/Icon.svelte';
	import CertificateModal from './CertificateModal.svelte';

	interface Props {
		certificates: CertificateItem[];
		class?: string;
	}

	let { certificates, class: className = '' }: Props = $props();

	let selectedCert: CertificateItem | null = $state(null);

	function openModal(cert: CertificateItem) {
		if (cert.image) {
			selectedCert = cert;
		}
	}

	function closeModal() {
		selectedCert = null;
	}
</script>

{#snippet certBody(cert: CertificateItem, isInteractive: boolean)}
	<div class="flex items-start gap-x-3">
		<div
			class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-primary transition-colors group-hover:bg-primary/15"
			aria-hidden="true"
		>
			<Icon name={cert.icon || 'certificate'} size={18} colorful={true} />
		</div>

		<div class="flex min-w-0 flex-1 flex-col gap-y-1">
			<header class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
				<h3
					class="text-sm font-semibold tracking-tight text-foreground {isInteractive
						? 'transition-colors group-hover:text-primary'
						: ''}"
				>
					{cert.title}
				</h3>
				<time class="font-mono text-xs font-semibold whitespace-nowrap text-primary">
					{cert.date}
				</time>
			</header>

			<p class="text-xs text-muted-foreground">
				<span>{cert.issuer}</span>
				{#if cert.credentialId}
					<span class="font-mono text-[11px] text-muted-foreground/80">
						&bull; ID: {cert.credentialId}
					</span>
				{/if}
			</p>

			{#if cert.description}
				<p class="mt-0.5 text-xs leading-relaxed text-muted-foreground">
					{cert.description}
				</p>
			{/if}

			<div class="mt-2 flex flex-wrap items-center gap-2">
				{#if isInteractive}
					<span
						class="inline-flex items-center gap-x-1.5 rounded-lg border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-background"
					>
						<Icon name="certificate" size={13} />
						<span>Lihat Sertifikat</span>
					</span>
				{/if}

				{#if cert.href}
					<a
						href={cert.href}
						target="_blank"
						rel="external noopener noreferrer"
						onclick={(e) => e.stopPropagation()}
						class="inline-flex items-center gap-x-1 rounded-lg border border-border/80 bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:bg-muted hover:text-foreground"
						aria-label={`Tautan eksternal ${cert.title}`}
					>
						<span>Verifikasi</span>
						<Icon name="arrow-up-right" size={12} />
					</a>
				{/if}
			</div>
		</div>
	</div>
{/snippet}

<ul class="m-0 flex list-none flex-col divide-y divide-border/60 p-0 {className}">
	{#each certificates as cert (cert.title)}
		<li class="group py-3.5 transition-colors first:pt-0 last:pb-0">
			{#if cert.image}
				<div
					role="button"
					tabindex="0"
					onclick={() => openModal(cert)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							openModal(cert);
						}
					}}
					class="-m-2.5 flex w-full cursor-pointer flex-col gap-y-2 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-muted/40"
					aria-label={`Lihat sertifikat ${cert.title}`}
				>
					{@render certBody(cert, true)}
				</div>
			{:else}
				<article class="flex flex-col gap-y-2 py-1">
					{@render certBody(cert, false)}
				</article>
			{/if}
		</li>
	{/each}
</ul>

{#if selectedCert}
	<CertificateModal certificate={selectedCert} onclose={closeModal} />
{/if}
