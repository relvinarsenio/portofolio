import { getEnrichedProjects } from '$lib/server/github';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const projects = await getEnrichedProjects();

	return {
		projects
	};
};
