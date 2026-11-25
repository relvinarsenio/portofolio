import type { Handle, HandleServerError } from '@sveltejs/kit';
import { getErrorPresentation } from '$lib/errors';
import { siteConfig } from '$lib/data';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%app.title%', `${siteConfig.title} \u2014 ${siteConfig.author}`);
		}
	});
};

export const handleError: HandleServerError = ({ error, event, status }) => {
	console.error('Kesalahan server tidak tertangani', error, {
		status,
		method: event.request.method,
		path: event.url.pathname
	});

	return {
		message: getErrorPresentation(status).message
	};
};
