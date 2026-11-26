export interface GitHubRepoRef {
	readonly owner: string;
	readonly name: string;
}

const REPO_URL_PATTERN = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)\/?$/;

export function parseGitHubRepoUrl(githubUrl: string): GitHubRepoRef | undefined {
	const match = REPO_URL_PATTERN.exec(githubUrl);

	return match ? { owner: match[1], name: match[2] } : undefined;
}

export function getGitHubOgImageUrl({ owner, name }: GitHubRepoRef): string {
	return `https://opengraph.githubassets.com/1/${owner}/${name}`;
}

export function getGitHubOgImageUrlFromUrl(githubUrl: string): string | undefined {
	const repo = parseGitHubRepoUrl(githubUrl);

	return repo ? getGitHubOgImageUrl(repo) : undefined;
}
