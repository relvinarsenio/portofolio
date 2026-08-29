import { parse } from 'node-html-parser';
import { projectsData } from '$lib/data';
import type { ProjectItem } from '$lib/types';

const ogImageCache = new Map<string, string>();

/**
 * Browser impersonation headers.
 */
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

/**
 * Fetches the real OpenGraph / Social Preview image for a given GitHub repository
 * using a robust CSS selector DOM query (No regex).
 * Falls back to GitHub's default opengraph asset generator if not found.
 */
export async function fetchGithubOgImage(githubUrl?: string): Promise<string | undefined> {
	if (!githubUrl) return undefined;
	if (ogImageCache.has(githubUrl)) {
		return ogImageCache.get(githubUrl);
	}

	try {
		const res = await fetch(githubUrl, {
			headers: BROWSER_SPOOF_HEADERS
		});

		if (res.ok) {
			const html = await res.text();
			const root = parse(html);

			const ogImage =
				root.querySelector('meta[property="og:image"]')?.getAttribute('content') ??
				root.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ??
				root.querySelector('meta[name="twitter:image:src"]')?.getAttribute('content');

			if (ogImage) {
				ogImageCache.set(githubUrl, ogImage);
				return ogImage;
			}
		}
	} catch {
		// Suppress network errors during offline or restricted builds
	}

	const repo = githubUrl.replace(/^https:\/\/github\.com\//, '').replace(/\/$/, '');
	const fallback = `https://opengraph.githubassets.com/1/${repo}`;
	ogImageCache.set(githubUrl, fallback);
	return fallback;
}

/**
 * Enriches project items by attaching live GitHub Social Preview images.
 */
export async function getEnrichedProjects(): Promise<ProjectItem[]> {
	return Promise.all(
		projectsData.map(async (project) => {
			if (project.image || !project.github) {
				return project;
			}

			const image = await fetchGithubOgImage(project.github);
			return {
				...project,
				image
			};
		})
	);
}
