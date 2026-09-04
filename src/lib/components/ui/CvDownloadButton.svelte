<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { siteConfig } from '$lib/data';

	interface Props {
		url?: string;
		filename?: string;
		label?: string;
		variant?: 'button' | 'pill' | 'back' | 'ahead';
		class?: string;
		children?: Snippet;
		ondownloadstart?: () => void;
		ondownloadsuccess?: (filename: string) => void;
		ondownloaderror?: (error: unknown) => void;
	}

	let {
		url,
		filename = `CV - ${siteConfig.author}.pdf`,
		label = 'Unduh CV',
		variant = 'button',
		class: className = '',
		children,
		ondownloadstart,
		ondownloadsuccess,
		ondownloaderror
	}: Props = $props();

	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

	const statusLabels = $derived({
		idle: label,
		loading: 'Menyimpan...',
		success: 'Tersimpan!',
		error: 'Gagal'
	});

	const config = $derived(
		{
			idle: {
				icon: 'download',
				iconClass: '',
				textClass: ''
			},
			loading: {
				icon: 'loader',
				iconClass: 'animate-spin text-primary',
				textClass: ''
			},
			success: {
				icon: 'check',
				iconClass: 'text-emerald-500',
				textClass: 'text-emerald-500'
			},
			error: {
				icon: 'close',
				iconClass: 'text-rose-500',
				textClass: 'text-rose-500'
			}
		}[status]
	);

	const activeLabel = $derived(statusLabels[status]);
	const pdfFilename = $derived(
		filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`
	);

	async function handleDownload() {
		if (status === 'loading' || !url) return;

		status = 'loading';
		ondownloadstart?.();

		try {
			const targetUrl = `${url}${url.includes('?') ? '&' : '?'}uuid=${crypto.randomUUID()}`;
			window.location.assign(targetUrl);

			status = 'success';
			ondownloadsuccess?.(pdfFilename);
			setTimeout(() => (status = 'idle'), 2000);
		} catch (error: unknown) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				status = 'idle';
				return;
			}
			status = 'error';
			ondownloaderror?.(error);
			setTimeout(() => (status = 'idle'), 2000);
		}
	}
</script>

<Button {variant} type="button" onclick={handleDownload} class={className}>
	{#if children}
		{@render children()}
	{:else}
		<span class="relative flex size-3.5 shrink-0 items-center justify-center leading-none">
			{#key status}
				<span
					in:scale={{ duration: 360, start: 0.7, easing: cubicOut }}
					out:fade={{ duration: 180, easing: cubicOut }}
					class="absolute inset-0 flex items-center justify-center {config.iconClass}"
				>
					<Icon name={config.icon} size={14} />
				</span>
			{/key}
		</span>

		<span
			class="relative inline-grid h-5 min-w-0 place-items-center overflow-hidden align-middle leading-none"
		>
			<span class="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
				{activeLabel}
			</span>
			{#key status}
				<span
					in:fly={{ y: -10, duration: 360, easing: cubicOut }}
					out:fly={{ y: 10, duration: 180, easing: cubicOut }}
					class="absolute inset-0 flex items-center justify-center whitespace-nowrap {config.textClass}"
				>
					{activeLabel}
				</span>
			{/key}
		</span>
	{/if}
</Button>
