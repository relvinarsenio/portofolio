import { resolveOgImage } from '$lib/server/github';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ params, platform }) => {
	const image = await resolveOgImage(platform?.env.OG_CACHE, params.owner, params.repo);

	if (!image) return new Response('Not found', { status: 404 });

	return new Response(null, {
		status: 302,
		headers: {
			location: image,
			'cache-control': 'public, max-age=3600, s-maxage=3600'
		}
	});
};
