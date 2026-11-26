import type { CertificateItem } from '$lib/types';
import lspTmjkImg from '$lib/assets/lsp-tmjk.png?enhanced';

export const certificatesData: [CertificateItem, ...CertificateItem[]] = [
	{
		title: 'Teknisi Madya Jaringan Komputer',
		issuer: 'LSP IIB Darmajaya',
		date: '2026',
		icon: 'bnsp',
		credentialId: 'LSP-DJ/0016/08/2026',
		image: lspTmjkImg,
		description:
			'Sertifikasi kompetensi nasional dalam administrasi dan konfigurasi perangkat routing, switching, dan infrastruktur jaringan komputer (Teknisi Madya Jaringan Komputer).'
	}
];
