import type { RequestHandler } from './$types';
import cvUrl from '$lib/assets/cv.pdf';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch(cvUrl);

	return new Response(res.body, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename="cv.pdf"'
		}
	});
};
