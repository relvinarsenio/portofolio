import type { RequestHandler } from './$types';
import { siteConfig, projectsData, experienceData, toolsData } from '$lib/data';
import type { ToolGroup, ToolItem } from '$lib/types';

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;

	const allTools = toolsData
		.flatMap((g: ToolGroup) => g.tools.map((t: ToolItem) => t.name))
		.join(', ');

	const projectList = projectsData
		.map((p) => `- [${p.title}](${p.href || p.github || `${origin}/projects`}): ${p.description}`)
		.join('\n');

	const experienceList = experienceData
		.map(
			(e) =>
				`- **${e.role}** pada ${e.title} (${e.date})${e.description && e.description.length ? `: ${e.description.join(' ')}` : ''}`
		)
		.join('\n');

	const content = `# ${siteConfig.author} \u2014 Portofolio & Profil Pengembang

> ${siteConfig.description}

## Ringkasan Profil
${siteConfig.bio.join('\n\n')}

## Keahlian Teknis & Alat
${allTools}

## Proyek Unggulan
${projectList}

## Pengalaman & Riset
${experienceList}

## Tautan Navigasi
- [Beranda](${origin}/): Ringkasan portofolio dan fokus keahlian saat ini.
- [Proyek](${origin}/projects): Katalog lengkap program, alat, dan publikasi ilmiah.
- [Tentang Saya](${origin}/about): Perjalanan studi, sertifikasi BNSP, alat yang digunakan, dan kontak.
- [Peta Situs (Sitemap)](${origin}/sitemap.xml): Peta situs XML untuk pengindeksan mesin pencari.
`;

	return new Response(content.trim(), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
