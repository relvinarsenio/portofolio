<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { siteConfig } from '$lib/data';

	const status = $derived(page.status || 404);
	const message = $derived(
		page.error?.message ||
			(status === 404
				? 'Halaman yang Anda cari tidak ditemukan atau telah berpindah alamat.'
				: status === 403
					? 'Anda tidak memiliki izin untuk mengakses halaman ini.'
					: 'Server sedang mengalami kendala. Silakan coba beberapa saat lagi.')
	);

	const statusTitle = $derived(
		status === 404
			? 'Halaman Tidak Ditemukan'
			: status === 403
				? 'Akses Ditolak'
				: status >= 500
					? 'Kesalahan Server'
					: 'Kesalahan Klien'
	);

	const statusBadge = $derived(
		status === 404
			? 'HTTP 404 // NOT_FOUND'
			: status === 403
				? 'HTTP 403 // FORBIDDEN'
				: status >= 500
					? `HTTP ${status} // SERVER_FAULT`
					: `HTTP ${status} // CLIENT_ERROR`
	);

	function reloadPage() {
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	}
</script>

<div class="animate flex min-h-[65vh] flex-col items-center justify-center py-10 text-center">
	<article class="flex w-full max-w-lg flex-col items-center gap-y-6">
		<header class="flex flex-col items-center gap-y-3">
			<span
				class="inline-flex items-center gap-x-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 font-mono text-xs font-semibold text-primary"
			>
				<span class="relative flex size-2 items-center justify-center" aria-hidden="true">
					<span
						class="absolute size-2.5 animate-ping rounded-full {status >= 500
							? 'bg-rose-500'
							: 'bg-amber-500'} opacity-75"
					></span>
					<span class="size-2 rounded-full {status >= 500 ? 'bg-rose-500' : 'bg-amber-500'}"></span>
				</span>
				<span>{statusBadge}</span>
			</span>

			<h1
				class="font-mono text-7xl font-bold tracking-tighter text-foreground sm:text-8xl"
				aria-label={`Error code ${status}`}
			>
				{status}
			</h1>

			<h2 class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
				{statusTitle}
			</h2>

			<p class="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
				{message}
			</p>
		</header>

		<aside
			aria-label="Diagnostik request"
			class="w-full rounded-xl border border-border/70 bg-muted/40 p-4 text-left font-mono text-xs text-muted-foreground"
		>
			<div class="mb-2.5 flex items-center justify-between border-b border-border/50 pb-2">
				<span class="text-[11px] font-semibold text-foreground/90">Diagnostik & Trace</span>
				<span class="text-[10px] text-muted-foreground">Edge Routing</span>
			</div>
			<div class="space-y-1.5 text-[11px]">
				<p><span class="font-semibold text-primary">route:</span> {page.url.pathname}</p>
				<p><span class="font-semibold text-primary">status:</span> {status}</p>
				<p><span class="font-semibold text-primary">host:</span> {siteConfig.title}</p>
			</div>
		</aside>

		<nav
			aria-label="Navigasi pemulihan error"
			class="flex flex-wrap items-center justify-center gap-2.5 pt-2"
		>
			<a
				href={resolve('/')}
				class="inline-flex items-center gap-x-1.5 rounded-lg border border-border/80 bg-muted/80 px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-foreground/25 hover:bg-muted sm:text-sm"
			>
				<Icon name="arrow-left" size={14} />
				<span>Kembali ke Beranda</span>
			</a>

			<button
				type="button"
				onclick={reloadPage}
				class="inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg border border-border/80 bg-transparent px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/25 hover:bg-muted hover:text-foreground sm:text-sm"
			>
				<Icon name="refresh" size={14} />
				<span>Coba Lagi</span>
			</button>

			<a
				href={resolve('/projects')}
				class="inline-flex items-center gap-x-1.5 rounded-lg border border-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground sm:text-sm"
			>
				<Icon name="package" size={14} />
				<span>Lihat Proyek</span>
			</a>
		</nav>
	</article>
</div>
