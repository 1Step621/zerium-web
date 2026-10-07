export const REPOSITORY = 'https://github.com/1Step621/zerium';
export const RELEASES_URL = `${REPOSITORY}/releases/latest`;

const formats = {
	windows: { msi: 'MSI' },
	macos: { pkg: 'PKG' },
	linux: {
		appimage: 'AppImage',
		deb: 'deb',
		rpm: 'rpm',
		'pkg.tar.zst': 'Arch Linux',
		'tar.xz': 'ELF binary'
	}
};
export type Platform = keyof typeof formats;
type Asset = { name: string; size: number };
type Download = Asset & { url: string; format: string };
export type Release = { tag: string; downloads: Record<Platform, Download[]> };

export async function getLatestRelease(): Promise<Release | null> {
	try {
		const response = await fetch('https://api.github.com/repos/1Step621/zerium/releases/latest', {
			signal: AbortSignal.timeout(5000)
		});
		if (!response.ok) return null;
		const { tag_name, assets } = (await response.json()) as { tag_name: string; assets: Asset[] };
		if (typeof tag_name !== 'string' || !Array.isArray(assets)) return null;

		const downloads = (platform: Platform) =>
			Object.entries(formats[platform]).flatMap(([extension, format]) =>
				assets
					.filter((asset) => asset.name.toLowerCase().endsWith(`.${extension}`))
					.map(({ name, size }) => ({
						name,
						size,
						format,
						url: `${RELEASES_URL}/download/${encodeURIComponent(name)}`
					}))
			);
		return {
			tag: tag_name,
			downloads: {
				windows: downloads('windows'),
				macos: downloads('macos'),
				linux: downloads('linux')
			}
		};
	} catch {
		return null;
	}
}

export function formatSize(bytes: number): string {
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
