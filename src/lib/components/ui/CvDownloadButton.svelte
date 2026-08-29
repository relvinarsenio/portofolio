<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

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
		filename = 'cv.pdf',
		label = 'Unduh CV',
		variant = 'button',
		class: className = '',
		children,
		ondownloadstart,
		ondownloadsuccess,
		ondownloaderror
	}: Props = $props();

	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

	const config = $derived(
		{
			idle: {
				icon: 'download',
				text: label,
				iconClass: '',
				textClass: ''
			},
			loading: {
				icon: 'loader',
				text: 'Menyimpan...',
				iconClass: 'animate-spin text-primary',
				textClass: ''
			},
			success: {
				icon: 'check',
				text: 'Tersimpan!',
				iconClass: 'text-emerald-500',
				textClass: 'text-emerald-500'
			},
			error: {
				icon: 'close',
				text: 'Gagal',
				iconClass: 'text-rose-500',
				textClass: 'text-rose-500'
			}
		}[status]
	);

	async function handleDownload() {
		if (status === 'loading' || !url) return;

		status = 'loading';
		ondownloadstart?.();

		try {
			const targetUrl = `${url}${url.includes('?') ? '&' : '?'}uuid=${crypto.randomUUID()}`;
			const response = await fetch(targetUrl);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const blob = await response.blob();

			if ('showSaveFilePicker' in window) {
				const picker = await (
					window as Window & {
						showSaveFilePicker: (options?: unknown) => Promise<FileSystemFileHandle>;
					}
				).showSaveFilePicker({ suggestedName: filename });
				const stream = await picker.createWritable();
				await stream.write(blob);
				await stream.close();
			} else {
				window.location.assign(targetUrl);
			}

			status = 'success';
			ondownloadsuccess?.(filename);
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
		<span class="relative flex size-3.5 shrink-0 items-center justify-center">
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

		<span class="relative inline-flex items-center overflow-hidden">
			{#key status}
				<span
					in:fly={{ y: 6, duration: 360, easing: cubicOut }}
					out:fly={{ y: -6, duration: 180, easing: cubicOut }}
					class="inline-block {config.textClass}"
				>
					{config.text}
				</span>
			{/key}
		</span>
	{/if}
</Button>
