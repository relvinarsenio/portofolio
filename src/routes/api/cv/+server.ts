import type { RequestHandler } from './$types';
import cvUrl from '$lib/assets/cv.pdf';
import { siteConfig } from '$lib/data';

export const prerender = false;

export const GET: RequestHandler = async ({ fetch, url }) => {
	const res = await fetch(cvUrl);
	const disposition = url.searchParams.has('uuid') ? 'attachment' : 'inline';
	const filename = `CV - ${siteConfig.author}.pdf`;

	return new Response(res.body, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `${disposition}; filename="${filename}"`
		}
	});
};
