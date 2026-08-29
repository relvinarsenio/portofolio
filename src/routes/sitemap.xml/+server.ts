import type { RequestHandler } from './$types';

function escapeXml(value: string): string {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

class XmlBuilder {
	readonly #parts: string[] = [];
	readonly #rootName: string;

	constructor(rootName: string, attributes: Record<string, string> = {}) {
		this.#rootName = rootName;
		this.#parts.push('<?xml version="1.0" encoding="UTF-8"?>\n');
		this.openTag(rootName, attributes);
	}

	openTag(name: string, attributes: Record<string, string> = {}): this {
		const attrString = Object.entries(attributes)
			.map(([k, v]) => ` ${k}="${escapeXml(v)}"`)
			.join('');
		this.#parts.push(`<${name}${attrString}>\n`);
		return this;
	}

	closeTag(name: string): this {
		this.#parts.push(`</${name}>\n`);
		return this;
	}

	element(name: string, value: string | number): this {
		this.#parts.push(`    <${name}>${escapeXml(String(value))}</${name}>\n`);
		return this;
	}

	build(): string {
		return [...this.#parts, `</${this.#rootName}>\n`].join('');
	}
}

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;
	const lastmod = new Date().toISOString().split('T')[0];

	const pages = [
		{ path: '/', priority: '1.0', changefreq: 'weekly' },
		{ path: '/projects', priority: '0.9', changefreq: 'weekly' },
		{ path: '/about', priority: '0.8', changefreq: 'monthly' }
	];

	const builder = new XmlBuilder('urlset', {
		xmlns: 'https://www.sitemaps.org/schemas/sitemap/0.9'
	});

	for (const page of pages) {
		builder.openTag('url');
		builder.element('loc', `${origin}${page.path}`);
		builder.element('lastmod', lastmod);
		builder.element('changefreq', page.changefreq);
		builder.element('priority', page.priority);
		builder.closeTag('url');
	}

	const xml = builder.build();

	return new Response(xml.trim(), {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
