interface ErrorPresentation {
	readonly title: string;
	readonly message: string;
	readonly code: string;
}

type KnownErrorStatus = 403 | 404 | 500 | 502 | 503 | 504;

const fallbackErrorPresentation = {
	title: 'Terjadi Kesalahan',
	message: 'Permintaan belum dapat diproses. Silakan coba lagi nanti.',
	code: 'UNKNOWN_ERROR'
} satisfies ErrorPresentation;

const clientErrorPresentation = {
	title: 'Permintaan Tidak Dapat Diproses',
	message: 'Permintaan tidak dapat diproses. Periksa kembali alamat atau data yang dikirim.',
	code: 'CLIENT_ERROR'
} satisfies ErrorPresentation;

const serverErrorPresentation = {
	title: 'Kesalahan Server',
	message: 'Server sedang mengalami kendala. Silakan coba beberapa saat lagi.',
	code: 'SERVER_FAULT'
} satisfies ErrorPresentation;

const errorCatalog = {
	403: {
		title: 'Akses Ditolak',
		message: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
		code: 'FORBIDDEN'
	},
	404: {
		title: 'Halaman Tidak Ditemukan',
		message: 'Halaman yang Anda cari tidak ditemukan atau telah berpindah alamat.',
		code: 'NOT_FOUND'
	},
	500: serverErrorPresentation,
	502: {
		title: 'Gateway Bermasalah',
		message: 'Server perantara menerima respons yang tidak valid. Silakan coba lagi.',
		code: 'BAD_GATEWAY'
	},
	503: {
		title: 'Layanan Tidak Tersedia',
		message: 'Layanan sedang tidak tersedia. Silakan coba beberapa saat lagi.',
		code: 'SERVICE_UNAVAILABLE'
	},
	504: {
		title: 'Waktu Respons Habis',
		message: 'Server tidak merespons dalam batas waktu yang ditentukan. Silakan coba lagi.',
		code: 'GATEWAY_TIMEOUT'
	}
} satisfies Record<KnownErrorStatus, ErrorPresentation>;

function isKnownErrorStatus(status: number): status is KnownErrorStatus {
	return Object.prototype.hasOwnProperty.call(errorCatalog, status);
}

export function getErrorPresentation(status: number): ErrorPresentation {
	if (!Number.isInteger(status) || status < 400 || status > 599) {
		return fallbackErrorPresentation;
	}

	if (isKnownErrorStatus(status)) {
		return errorCatalog[status];
	}

	return status >= 500 ? serverErrorPresentation : clientErrorPresentation;
}
