import type { Handle } from '@sveltejs/kit';
import { siteConfig } from '$lib/data';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%app.title%', `${siteConfig.title} \u2014 ${siteConfig.author}`);
		}
	});
};
