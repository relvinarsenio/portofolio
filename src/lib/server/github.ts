import { resolve } from '$app/paths';
import { projectsData } from '$lib/data';
import type { ProjectItem } from '$lib/types';

interface RepoRef {
	readonly owner: string;
	readonly name: string;
}

interface CacheEntry {
	readonly image: string;
	readonly checkedAt: string;
	readonly failed?: boolean;
	readonly retryAfterMs?: number;
}

interface PageResult {
	readonly html?: string;
	readonly status?: number;
	readonly blockedForMs?: number;
}

interface ScrapeResult {
	readonly image?: string;
	readonly blockedForMs?: number;
}

const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const FAILURE_TTL_MS = 10 * 60 * 1000;
const RATE_LIMIT_DEFAULT_WAIT_MS = 60 * 1000;
const MAX_BLOCK_MS = 24 * 60 * 60 * 1000;
const CLOCK_SKEW_MS = 5 * 60 * 1000;
const KV_EXPIRATION_SECONDS = 30 * 24 * 60 * 60;
const SCRAPE_BUDGET_MS = 10_000;
const REQUEST_TIMEOUT_MS = 5_000;
const ATTEMPTS = 2;
const BASE_DELAY_MS = 500;
const MAX_DELAY_MS = 3_000;
const MAX_HEAD_BYTES = 262_144;

const REPO_URL_PATTERN = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)\/?$/;
const META_TAG_PATTERN = /<meta\b[^>]*>/gi;
const ATTRIBUTE_PATTERN = /([a-z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
const IMAGE_LABELS = ['og:image', 'twitter:image', 'twitter:image:src'];
const RATE_LIMITED_STATUS = new Set([403, 429]);
const RETRYABLE_STATUS = new Set([500, 502, 503, 504]);
const ALLOWED_IMAGE_HOSTS = new Set([
	'repository-images.githubusercontent.com',
	'opengraph.githubassets.com'
]);
const BROWSER_SPOOF_HEADERS = {
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
	'sec-ch-ua': '"Not A;Brand";v="99", "Chromium";v="144", "Microsoft Edge";v="144"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"Windows"',
	dnt: '1',
	'sec-gpc': '1',
	'upgrade-insecure-requests': '1',
	'cache-control': 'no-cache',
	pragma: 'no-cache',
	accept:
		'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
	'accept-language': 'en-US,en;q=0.9'
};

function parseRepo(githubUrl: string): RepoRef | undefined {
	const match = REPO_URL_PATTERN.exec(githubUrl);
	return match ? { owner: match[1], name: match[2] } : undefined;
}

function repoKey({ owner, name }: RepoRef): string {
	return `${owner}/${name}`.toLowerCase();
}

function fallbackImage({ owner, name }: RepoRef): string {
	return `https://opengraph.githubassets.com/1/${owner}/${name}`;
}

function collectRepos(): Map<string, RepoRef> {
	const repos = new Map<string, RepoRef>();

	for (const project of projectsData) {
		const repo = !project.image && project.github ? parseRepo(project.github) : undefined;
		if (repo) repos.set(repoKey(repo), repo);
	}

	return repos;
}

const knownRepos = collectRepos();
const inflight = new Map<string, Promise<string>>();

function isFresh(entry: CacheEntry): boolean {
	const ttl = entry.failed ? (entry.retryAfterMs ?? FAILURE_TTL_MS) : CACHE_TTL_MS;
	return Date.now() - Date.parse(entry.checkedAt) < ttl;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeEntities(value: string): string {
	return value
		.replaceAll('&quot;', '"')
		.replaceAll('&#39;', "'")
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&');
}

function toSafeImageUrl(value: string | undefined): string | undefined {
	if (!value) return undefined;

	try {
		const url = new URL(value);
		const isAllowed = url.protocol === 'https:' && ALLOWED_IMAGE_HOSTS.has(url.hostname);
		return isAllowed ? url.href : undefined;
	} catch {
		return undefined;
	}
}

function parseAttributes(tag: string): Map<string, string> {
	const attributes = new Map<string, string>();

	for (const [, key, doubleQuoted, singleQuoted] of tag.matchAll(ATTRIBUTE_PATTERN)) {
		attributes.set(key.toLowerCase(), decodeEntities(doubleQuoted ?? singleQuoted ?? ''));
	}

	return attributes;
}

function extractOgImage(html: string): string | undefined {
	const contentByLabel = new Map<string, string>();

	for (const [tag] of html.matchAll(META_TAG_PATTERN)) {
		const attributes = parseAttributes(tag);
		const label = attributes.get('property') ?? attributes.get('name');
		const content = attributes.get('content');

		if (!label || !content || contentByLabel.has(label)) continue;
		contentByLabel.set(label, content);
	}

	return IMAGE_LABELS.map((label) => toSafeImageUrl(contentByLabel.get(label))).find(Boolean);
}

async function readHead(response: Response): Promise<string> {
	if (!response.body) return '';

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let html = '';
	let bytes = 0;

	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;

			bytes += value.byteLength;
			html += decoder.decode(value, { stream: true });
			if (html.includes('</head>') || bytes >= MAX_HEAD_BYTES) break;
		}
	} finally {
		await reader.cancel().catch(() => undefined);
	}

	return html;
}

function parseRetryAfterMs(retryAfter: string | null | undefined): number {
	if (!retryAfter) return Number.NaN;

	const seconds = Number(retryAfter);
	return Number.isFinite(seconds) ? seconds * 1000 : Date.parse(retryAfter) - Date.now();
}

function retryDelayMs(attempt: number): number {
	return Math.min(BASE_DELAY_MS * 2 ** attempt, MAX_DELAY_MS) + Math.random() * 250;
}

function rateLimitWaitMs(headers: Headers): number {
	const retryAfterMs = parseRetryAfterMs(headers.get('retry-after'));
	if (Number.isFinite(retryAfterMs)) return Math.min(Math.max(retryAfterMs, 0), MAX_BLOCK_MS);

	const resetMs = Number(headers.get('x-ratelimit-reset')) * 1000 - Date.now();
	if (Number.isFinite(resetMs) && resetMs > 0) return Math.min(resetMs, MAX_BLOCK_MS);

	return RATE_LIMIT_DEFAULT_WAIT_MS;
}

async function fetchPage({ owner, name }: RepoRef): Promise<PageResult> {
	const response = await fetch(`https://github.com/${owner}/${name}`, {
		headers: BROWSER_SPOOF_HEADERS,
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
	}).catch(() => undefined);

	if (!response) return {};

	if (!response.ok) {
		await response.body?.cancel().catch(() => undefined);
		const isRateLimited = RATE_LIMITED_STATUS.has(response.status);
		return {
			status: response.status,
			blockedForMs: isRateLimited ? rateLimitWaitMs(response.headers) : undefined
		};
	}

	return { html: await readHead(response).catch(() => '') };
}

async function scrapeOgImage(repo: RepoRef, deadline: number): Promise<ScrapeResult> {
	for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
		if (Date.now() >= deadline) return {};

		const page = await fetchPage(repo);
		if (page.html !== undefined) return { image: extractOgImage(page.html) };
		if (page.blockedForMs !== undefined) return { blockedForMs: page.blockedForMs };
		if (page.status !== undefined && !RETRYABLE_STATUS.has(page.status)) return {};
		if (attempt < ATTEMPTS - 1) await sleep(retryDelayMs(attempt));
	}

	return {};
}

function parseCacheEntry(value: unknown): CacheEntry | undefined {
	if (!value || typeof value !== 'object') return undefined;

	const { image, checkedAt, failed, retryAfterMs } = value as Record<string, unknown>;
	const safeImage = typeof image === 'string' ? toSafeImageUrl(image) : undefined;
	const checkedAtMs = typeof checkedAt === 'string' ? Date.parse(checkedAt) : Number.NaN;
	const isValidTime = Number.isFinite(checkedAtMs) && checkedAtMs <= Date.now() + CLOCK_SKEW_MS;

	if (!safeImage || !isValidTime) return undefined;

	const hasWait = typeof retryAfterMs === 'number' && Number.isFinite(retryAfterMs);

	return {
		image: safeImage,
		checkedAt: new Date(checkedAtMs).toISOString(),
		failed: failed === true,
		retryAfterMs: hasWait ? Math.min(Math.max(retryAfterMs, 0), MAX_BLOCK_MS) : undefined
	};
}

async function readCache(
	kv: KVNamespace | undefined,
	key: string
): Promise<CacheEntry | undefined> {
	if (!kv) return undefined;

	const value = await kv.get(`og:${key}`, 'json').catch(() => null);
	return parseCacheEntry(value);
}

async function writeCache(
	kv: KVNamespace | undefined,
	key: string,
	entry: CacheEntry
): Promise<void> {
	if (!kv) return;

	await kv
		.put(`og:${key}`, JSON.stringify(entry), { expirationTtl: KV_EXPIRATION_SECONDS })
		.catch((error) => console.warn('Gagal menyimpan cache OpenGraph ke KV.', error));
}

async function loadOgImage(kv: KVNamespace | undefined, repo: RepoRef): Promise<string> {
	const key = repoKey(repo);
	const cached = await readCache(kv, key);
	if (cached && isFresh(cached)) return cached.image;

	const { image: scraped, blockedForMs } = await scrapeOgImage(repo, Date.now() + SCRAPE_BUDGET_MS);
	const image = scraped ?? cached?.image ?? fallbackImage(repo);
	const checkedAt = new Date().toISOString();
	const waitMs = Math.min(Math.max(FAILURE_TTL_MS, blockedForMs ?? 0), MAX_BLOCK_MS);

	await writeCache(
		kv,
		key,
		scraped ? { image, checkedAt } : { image, checkedAt, failed: true, retryAfterMs: waitMs }
	);

	return image;
}

export function resolveOgImage(
	kv: KVNamespace | undefined,
	owner: string,
	name: string
): Promise<string | undefined> {
	const repo = knownRepos.get(`${owner}/${name}`.toLowerCase());
	if (!repo) return Promise.resolve(undefined);

	const key = repoKey(repo);
	const pending = inflight.get(key);
	if (pending) return pending;

	const task = loadOgImage(kv, repo).finally(() => inflight.delete(key));
	inflight.set(key, task);

	return task;
}

export function getEnrichedProjects(): ProjectItem[] {
	return projectsData.map((project) => {
		if (project.image || !project.github) return project;

		const repo = parseRepo(project.github);
		if (!repo) return project;

		return {
			...project,
			image: resolve('/og/[owner]/[repo]', { owner: repo.owner, repo: repo.name })
		};
	});
}
