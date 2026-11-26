import type { RouteId } from '$app/types';

export type PageRoute = Extract<RouteId, '/' | '/about' | '/projects'>;

export interface NavItem {
	title: string;
	link: PageRoute;
}

export interface SocialLink {
	icon: string;
	label: string;
	href: string;
}

export interface SpecialLinkItem {
	name: string;
	intro: string;
	href: string;
	avatar?: string;
	icon?: string;
}

export interface SiteConfig {
	title: string;
	author: string;
	description: string;
	location: string;
	status: string;
	statusUrl?: string;
	cvUrl?: string;
	avatar: EnhancedImage;
	bio: string[];
	header: {
		menu: NavItem[];
	};
	footer: {
		year: number;
		credits: boolean;
		social: SocialLink[];
		links?: { title: string; link: string }[];
	};
}

export type EnhancedImage =
	| string
	| {
			img: { src: string; w: number; h: number };
			sources: Record<string, string>;
	  };

export type ProjectCategory = 'Program' | 'Publikasi' | 'Alat' | 'Open Source';

export interface ProjectTimeline {
	readonly role: string;
	readonly date: string;
	readonly highlights: readonly string[];
	readonly order: number;
}

export interface ProjectItem {
	readonly title: string;
	readonly description: string;
	readonly href?: string;
	readonly github?: string;
	readonly release?: string;
	readonly category?: ProjectCategory;
	readonly tags?: readonly string[];
	readonly stars?: number;
	readonly image?: EnhancedImage;
	readonly featured?: boolean;
	readonly timeline?: ProjectTimeline;
}

export interface TimelineItem {
	readonly title: string;
	readonly role: string;
	readonly date: string;
	readonly location?: string;
	readonly description?: readonly string[];
	readonly link?: string;
}

export interface CertificateItem {
	title: string;
	issuer: string;
	date: string;
	href?: string;
	credentialId?: string;
	description?: string | string[];
	icon?: string;
	image?: EnhancedImage;
}

export interface ToolItem {
	name: string;
	description: string;
	href?: string;
	icon?: string;
}

export interface ToolGroup {
	title: string;
	tools: ToolItem[];
}

export interface ActivityItem {
	icon: string;
	title: string;
	desc: string;
}

export interface LearningTrackItem {
	step: string;
	icon: string;
	category: string;
	title: string;
	desc: string;
}

export interface MilestoneItem {
	year: string;
	icon: string;
	title: string;
	detail: string;
}

export interface InterestItem {
	icon: string;
	title: string;
	desc: string;
}

export interface QuoteItem {
	content: string;
	author: string;
	source?: string;
}
