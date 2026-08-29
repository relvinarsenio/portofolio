import type { CertificateItem } from '$lib/types';
import lspTmjkImg from '$lib/assets/lsp-tmjk.png?enhanced';

export const certificatesData: CertificateItem[] = [
	{
		title: 'Junior Network Administrator',
		issuer: 'BNSP & LSP IIB Darmajaya',
		date: '2023',
		icon: 'bnsp',
		credentialId: 'LSP-DJ/0016/08/2026',
		image: lspTmjkImg,
		description:
			'Sertifikasi kompetensi nasional dalam administrasi dan konfigurasi perangkat routing, switching, dan infrastruktur jaringan komputer (Teknisi Madya Jaringan Komputer).'
	}
];
