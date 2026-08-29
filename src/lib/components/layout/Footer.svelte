<script lang="ts">
	import { siteConfig } from '$lib/data';
	import Icon from '$lib/components/ui/Icon.svelte';
</script>

<footer
	class="mx-auto mt-8 w-full border-t border-border/80 pt-5 pb-8 text-xs text-muted-foreground sm:mt-10 sm:text-sm"
>
	<div class="flex flex-col items-center justify-between gap-y-3 sm:flex-row">
		<!-- Left: Copyright & Credits -->
		<small
			class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs text-muted-foreground sm:justify-start"
		>
			<span>&copy; {siteConfig.footer.year} {siteConfig.author}</span>
			{#if siteConfig.footer.credits}
				<span aria-hidden="true">&bull;</span>
				<span>
					Powered by
					<a
						href="https://svelte.dev"
						target="_blank"
						rel="external noopener noreferrer"
						class="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
					>
						Svelte 5
					</a>
					&amp;
					<a
						href="https://workers.cloudflare.com"
						target="_blank"
						rel="external noopener noreferrer"
						class="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
					>
						Cloudflare
					</a>
				</span>
			{/if}
		</small>

		<!-- Right: Social Links Navigation -->
		<nav aria-label="Social media links">
			<ul class="flex items-center gap-x-2">
				{#each siteConfig.footer.social as item (item.label)}
					<li>
						<a
							href={item.href}
							target="_blank"
							rel="external noopener noreferrer"
							aria-label={item.label}
							title={item.label}
							class="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						>
							<Icon name={item.icon} size={15} colorful={false} />
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
