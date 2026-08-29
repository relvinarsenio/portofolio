<script lang="ts">
	import type { CertificateItem } from '$lib/types';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { fade, fly, scale as scaleTransition } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface Props {
		certificate: CertificateItem;
		onclose: () => void;
	}

	let { certificate, onclose }: Props = $props();

	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);
	let isDragging = $state(false);
	let startX = $state(0);
	let startY = $state(0);
	let lastTouchDistance = $state<number | null>(null);
	let lastTapTime = $state(0);
	let canvasRef = $state<HTMLElement | null>(null);

	const downloadUrl = $derived(
		typeof certificate.image === 'string' ? certificate.image : (certificate.image?.img?.src ?? '')
	);

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return {
			destroy() {
				document.body.style.overflow = originalOverflow;
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		};
	}

	function zoomIn() {
		scale = Math.min(scale + 0.25, 3.5);
	}

	function zoomOut() {
		const newScale = Math.max(scale - 0.25, 0.5);
		scale = newScale;
		if (newScale <= 1) {
			translateX = 0;
			translateY = 0;
		}
	}

	function resetView() {
		scale = 1;
		translateX = 0;
		translateY = 0;
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const container = canvasRef?.getBoundingClientRect();
		const centerX = container ? container.left + container.width / 2 : window.innerWidth / 2;
		const centerY = container ? container.top + container.height / 2 : window.innerHeight / 2;

		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		const delta = -e.deltaY * 0.002;
		const oldScale = scale;
		const newScale = Math.min(Math.max(oldScale + delta, 0.5), 3.5);

		if (newScale <= 1) {
			scale = newScale;
			translateX = 0;
			translateY = 0;
			return;
		}

		translateX = mouseX - (mouseX - translateX) * (newScale / oldScale);
		translateY = mouseY - (mouseY - translateY) * (newScale / oldScale);
		scale = newScale;
	}

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		isDragging = true;
		startX = e.clientX - translateX;
		startY = e.clientY - translateY;
		try {
			(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
		} catch (err) {
			void err;
		}
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		translateX = e.clientX - startX;
		translateY = e.clientY - startY;
	}

	function handlePointerUp(e: PointerEvent) {
		isDragging = false;
		try {
			(e.currentTarget as HTMLElement)?.releasePointerCapture?.(e.pointerId);
		} catch (err) {
			void err;
		}
	}

	function handleDoubleClick(e?: MouseEvent | { clientX: number; clientY: number }) {
		if (scale > 1.2) {
			resetView();
			return;
		}

		const targetScale = 2.25;
		if (e && typeof e.clientX === 'number') {
			const container = canvasRef?.getBoundingClientRect();
			const centerX = container ? container.left + container.width / 2 : window.innerWidth / 2;
			const centerY = container ? container.top + container.height / 2 : window.innerHeight / 2;

			const clickX = e.clientX - centerX;
			const clickY = e.clientY - centerY;

			translateX = clickX * (1 - targetScale);
			translateY = clickY * (1 - targetScale);
		}
		scale = targetScale;
	}

	function handleTouchStart(e: TouchEvent) {
		if (e.touches.length === 2) {
			isDragging = false;
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			lastTouchDistance = Math.hypot(dx, dy);
			return;
		}

		if (e.touches.length !== 1) return;
		const touch = e.touches[0];
		const now = Date.now();
		if (now - lastTapTime < 300) {
			handleDoubleClick({ clientX: touch.clientX, clientY: touch.clientY });
		}
		lastTapTime = now;
	}

	function handleTouchMove(e: TouchEvent) {
		if (e.touches.length !== 2 || lastTouchDistance === null) return;
		e.preventDefault();

		const dx = e.touches[0].clientX - e.touches[1].clientX;
		const dy = e.touches[0].clientY - e.touches[1].clientY;
		const newDistance = Math.hypot(dx, dy);
		const factor = newDistance / lastTouchDistance;
		const newScale = Math.min(Math.max(scale * factor, 0.5), 3.5);

		scale = newScale;
		lastTouchDistance = newDistance;

		if (newScale <= 1) {
			translateX = 0;
			translateY = 0;
		}
	}

	function handleTouchEnd(e: TouchEvent) {
		if (e.touches.length < 2) {
			lastTouchDistance = null;
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') return onclose();
		if (e.key === '+' || e.key === '=') return zoomIn();
		if (e.key === '-' || e.key === '_') return zoomOut();
		if (e.key === '0' || e.key === 'r' || e.key === 'R') return resetView();
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div
	use:portal
	class="fixed inset-0 z-50 flex flex-col items-center justify-between p-3 select-none sm:p-6"
	role="dialog"
	aria-modal="true"
	aria-labelledby="cert-lightbox-title"
>
	<!-- Dark Glass Backdrop with Coordinated Fade Transition -->
	<button
		type="button"
		transition:fade={{ duration: 250 }}
		class="fixed inset-0 bg-black/85 backdrop-blur-lg"
		onclick={onclose}
		aria-label="Tutup pratinjau sertifikat"
	></button>

	<!-- Ambient Radial Glow Synchronized with Modal State -->
	<div
		transition:fade={{ duration: 250 }}
		class="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-60"
		aria-hidden="true"
	>
		<div
			class="size-150 animate-pulse rounded-full opacity-30 blur-3xl [background:radial-gradient(circle,var(--color-primary),transparent_70%)]"
		></div>
	</div>

	<!-- Top Bar Header with Synchronized Fly in/out -->
	<header
		in:fly={{ y: -24, duration: 300, easing: quintOut }}
		out:fly={{ y: -24, duration: 200 }}
		class="relative z-10 flex w-full max-w-4xl items-center justify-between rounded-xl border border-white/15 bg-zinc-950/75 px-4 py-2.5 text-white shadow-2xl backdrop-blur-xl"
	>
		<div class="flex items-center gap-x-3 truncate">
			<div
				class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary shadow-sm"
			>
				<Icon name={certificate.icon || 'certificate'} size={16} />
			</div>
			<div class="truncate">
				<h2 id="cert-lightbox-title" class="truncate text-xs font-semibold text-white sm:text-sm">
					{certificate.title}
				</h2>
				<p class="truncate text-[11px] text-zinc-400">
					{certificate.issuer}
					{#if certificate.credentialId}
						<span class="font-mono">&bull; {certificate.credentialId}</span>
					{/if}
				</p>
			</div>
		</div>

		<div class="flex items-center gap-1.5 sm:gap-2">
			{#if downloadUrl}
				<a
					href={downloadUrl}
					target="_blank"
					rel="external noopener noreferrer"
					download="sertifikat-lsp.png"
					class="inline-flex items-center gap-x-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-200 transition-all hover:border-primary/40 hover:bg-primary/20 hover:text-white"
					title="Buka / Unduh Gambar Asli"
				>
					<Icon name="download" size={13} />
					<span class="hidden sm:inline">Unduh</span>
				</a>
			{/if}
			<button
				type="button"
				onclick={onclose}
				class="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-300 transition-all hover:border-rose-500/50 hover:bg-rose-500/20 hover:text-white"
				aria-label="Tutup"
			>
				<Icon name="x" size={16} />
			</button>
		</div>
	</header>

	<!-- Interactive Image Canvas with Fully Synchronized Pop & Exit Scale -->
	<div
		bind:this={canvasRef}
		in:scaleTransition={{ duration: 350, start: 0.88, opacity: 0, easing: quintOut }}
		out:scaleTransition={{ duration: 200, start: 0.88, opacity: 0 }}
		class="relative z-10 flex size-full flex-1 touch-none items-center justify-center overflow-hidden py-3"
		onwheel={handleWheel}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		role="presentation"
	>
		{#if certificate.image}
			<div
				tabindex="0"
				role="button"
				aria-label="Kanvas sertifikat interaktif. Klik 2x pada bagian yang ingin dilihat detailnya."
				onpointerdown={handlePointerDown}
				onpointermove={handlePointerMove}
				onpointerup={handlePointerUp}
				onpointercancel={handlePointerUp}
				ondblclick={handleDoubleClick}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') handleDoubleClick();
				}}
				class="group relative touch-none transition-transform duration-200 ease-out outline-none"
				style:transform={`translate(${translateX}px, ${translateY}px) scale(${scale})`}
				style:cursor={isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'zoom-in'}
			>
				<!-- Holographic Sheen Sweep Overlay -->
				<div
					class="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl"
					aria-hidden="true"
				>
					<div
						class="animate-shimmer-sweep absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent"
					></div>
				</div>

				<enhanced:img
					src={certificate.image}
					alt={`Sertifikat ${certificate.title}`}
					class="pointer-events-none max-h-[72vh] w-auto max-w-[92vw] rounded-xl border border-white/20 object-contain shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_-5px_rgba(var(--color-primary),0.3)]"
					loading="eager"
					decoding="async"
					draggable="false"
				/>
			</div>
		{/if}
	</div>

	<!-- Bottom Interactive Floating Control Toolbar with Synchronized Fly in/out -->
	<footer
		in:fly={{ y: 24, duration: 300, easing: quintOut }}
		out:fly={{ y: 24, duration: 200 }}
		class="relative z-10 flex items-center gap-x-1.5 rounded-full border border-white/15 bg-zinc-950/75 px-3.5 py-1.5 text-zinc-300 shadow-2xl backdrop-blur-xl"
	>
		<button
			type="button"
			onclick={zoomOut}
			disabled={scale <= 0.5}
			class="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
			title="Zoom Out (-)"
			aria-label="Perkecil tampilan"
		>
			<Icon name="zoom-out" size={15} />
		</button>

		<span class="w-12 text-center font-mono text-[11px] font-semibold text-zinc-200 select-none">
			{Math.round(scale * 100)}%
		</span>

		<button
			type="button"
			onclick={zoomIn}
			disabled={scale >= 3.5}
			class="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
			title="Zoom In (+)"
			aria-label="Perbesar tampilan"
		>
			<Icon name="zoom-in" size={15} />
		</button>

		<div class="mx-1 h-3.5 w-px bg-white/20"></div>

		<button
			type="button"
			onclick={resetView}
			class="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-white/15 hover:text-white"
			title="Reset Tampilan (0 atau R)"
			aria-label="Reset zoom dan posisi"
		>
			<Icon name="refresh" size={14} />
		</button>
	</footer>
</div>

<style>
	@keyframes shimmer-sweep {
		0% {
			transform: translateX(-150%) skewX(-20deg);
			opacity: 0;
		}
		30% {
			opacity: 0.75;
		}
		100% {
			transform: translateX(250%) skewX(-20deg);
			opacity: 0;
		}
	}

	.animate-shimmer-sweep {
		animation: shimmer-sweep 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.25s forwards;
	}
</style>
