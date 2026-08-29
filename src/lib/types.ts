export interface NavItem {
	title: string;
	link: `/${string}` | string;
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
	avatar: string;
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

export type ProjectCategory = 'Program' | 'Publikasi' | 'Alat' | 'Open Source' | (string & {});

export interface ProjectItem {
	title: string;
	description: string;
	href?: string;
	github?: string;
	release?: string;
	category?: ProjectCategory;
	tags?: string[];
	stars?: number;
	image?: EnhancedImage;
	featured?: boolean;
}

export interface ExperienceItem {
	title: string;
	role: string;
	date: string;
	location?: string;
	description?: string[];
	link?: string;
}

export type EducationItem = ExperienceItem;

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
