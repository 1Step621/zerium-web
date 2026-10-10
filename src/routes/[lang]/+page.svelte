<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from '$lib/i18n';
	import editorScreenshot from '$lib/assets/editor.webp';
	import pcbPattern from '$lib/assets/pcb.svg';
	import pcbPatternMobile from '$lib/assets/pcb-mobile.svg';
	import circuitSchematic from '$lib/assets/circuit.svg';
	import circuitSchematicMobile from '$lib/assets/circuit-mobile.svg';
	import {
		IconArrowDown,
		IconArrowRight,
		IconBrandApple,
		IconBrandGithub,
		IconBrandWindows,
		IconCode,
		IconCopy,
		IconCpu,
		IconDownload,
		IconExternalLink,
		IconPhoto,
		IconPlug,
		IconPlus,
		IconSquare,
		IconStack2,
		IconTerminal2,
		IconTypography,
		IconWorld
	} from '@tabler/icons-svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const i18n = get();
	const REPOSITORY = 'https://github.com/1Step621/zerium';
	const RELEASES_URL = `${REPOSITORY}/releases/latest`;
	const LINUX_INSTALL_COMMAND = `curl -fsSL ${RELEASES_URL}/download/install.sh | sh`;
	const platforms = [
		{
			id: 'windows',
			name: 'Windows',
			file: 'zerium-win-x86_64.msi',
			format: 'MSI',
			icon: IconBrandWindows
		},
		{
			id: 'macos',
			name: 'macOS',
			file: 'zerium-osx-aarch64-Setup.pkg',
			format: 'PKG',
			icon: IconBrandApple
		},
		{
			id: 'linux',
			name: 'Linux',
			file: 'zerium-linux-x86_64.AppImage',
			format: 'AppImage',
			icon: IconTerminal2
		}
	] as const;
	type Platform = (typeof platforms)[number]['id'];
	const qualityIcons = [IconCpu, IconPlug, IconWorld, IconCode];
	let selectedPlatform = $state<Platform>('linux');
	const selectedDownload = $derived(
		platforms.find((platform) => platform.id === selectedPlatform)!
	);
	const otherLocale = $derived(data.locale === 'ja' ? 'en' : 'ja');

	async function copyInstallCommand() {
		try {
			await navigator.clipboard.writeText(LINUX_INSTALL_COMMAND);
		} catch (error) {
			console.error(error);
		}
	}
	onMount(() => {
		const ua = navigator.userAgent;
		selectedPlatform = /Windows/i.test(ua)
			? 'windows'
			: /Macintosh|Mac OS X/i.test(ua) && !/iPhone|iPad/i.test(ua)
				? 'macos'
				: 'linux';
	});
</script>

<svelte:head>
	<title>{i18n.t('site.title')}</title>
	<meta name="description" content={i18n.t('site.description')} />
	<meta property="og:title" content={i18n.t('site.title')} />
	<meta property="og:description" content={i18n.t('site.description')} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={data.locale === 'ja' ? 'ja_JP' : 'en_US'} />
	<link rel="alternate" hreflang="ja" href="/ja" />
	<link rel="alternate" hreflang="en" href="/en" />
	<link rel="alternate" hreflang="x-default" href="/" />
</svelte:head>
<div class="relative isolate min-h-screen">
	<div
		class="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-accent"
		aria-hidden="true"
	>
		<div
			class="absolute -top-24 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl sm:left-1/2 sm:-translate-x-1/2 sm:scale-150"
		></div>
		<div
			class="absolute top-96 -right-32 h-80 w-96 -rotate-12 rounded-full bg-amber-400/10 blur-3xl sm:right-0 sm:scale-150"
		></div>
		<div
			class="absolute bottom-1/3 -left-32 h-96 w-96 rounded-full bg-accent-hover/10 blur-3xl sm:scale-150"
		></div>
		<div
			class="absolute -right-24 -bottom-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl sm:right-1/4 sm:scale-150"
		></div>
	</div>
	<a class="fixed -top-24 left-4 z-50 bg-accent p-3 text-accent-ink focus:top-3" href="#main">
		{i18n.t('site.skip')}
	</a>
	<header class="relative z-10 border-b border-line/30 bg-background/50 backdrop-blur-xl">
		<div
			class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2.5 px-5 sm:h-20 sm:gap-6 sm:px-6 lg:px-8"
		>
			<a
				class="inline-flex items-center text-2xl leading-normal font-bold tracking-tighter sm:text-3xl"
				href={`/${data.locale}`}
				aria-label="Zerium"
			>
				<img class="mr-2 size-8 sm:size-10" src="/zerium.svg" width="38" height="38" alt="" />
				Zerium
			</a>
			<nav
				class="flex items-center gap-4 text-sm text-muted sm:gap-4 lg:gap-8"
				aria-label={i18n.t('site.navigation')}
			>
				<a
					class="hidden sm:inline-flex sm:items-center sm:gap-2 sm:hover:text-accent-hover"
					href="#features"
				>
					{i18n.t('site.features')}
				</a>
				<a
					href={REPOSITORY}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 hover:text-accent-hover"
				>
					<IconBrandGithub size={20} stroke={1.6} aria-hidden="true" />
					<span class="hidden sm:inline">GitHub</span>
				</a>
				<a
					class="inline-flex items-center gap-2 border-l border-line pl-4 hover:text-accent-hover sm:pl-6"
					href={`/${otherLocale}`}
					data-sveltekit-reload
					data-sveltekit-preload-data="off"
					aria-label={`${i18n.t('site.language')}: ${otherLocale === 'ja' ? '日本語' : 'English'}`}
				>
					<IconWorld size={16} stroke={1.6} aria-hidden="true" />
					<span>{otherLocale === 'ja' ? '日本語' : 'EN'}</span>
				</a>
				<a
					class="hidden min-h-10 items-center justify-center gap-2.5 rounded-lg bg-accent px-4 py-2 text-sm leading-relaxed font-bold text-accent-ink transition duration-200 hover:-translate-y-0.5 hover:bg-accent-hover sm:inline-flex"
					href="#download"
				>
					{i18n.t('site.download')}
					<IconDownload size={16} stroke={1.6} aria-hidden="true" />
				</a>
			</nav>
		</div>
	</header>
	<main id="main">
		<section class="relative isolate overflow-hidden">
			<div
				class="mx-auto max-w-6xl px-5 pt-14 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-12 lg:px-8 2xl:pt-24"
			>
				<h1
					class="mt-6 mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-7xl lg:text-8xl"
				>
					A video editor
					<br />
					<span
						class="bg-linear-to-r from-orange-200 via-accent-hover to-accent bg-clip-text text-transparent"
					>
						with zero limits.
					</span>
				</h1>
				<p
					class="mx-auto max-w-sm text-base leading-8 text-pretty text-muted sm:max-w-xl sm:text-lg"
				>
					{i18n.t('site.intro')}
				</p>
				<div class="my-6 sm:mt-7 sm:mb-5">
					<a
						class="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 text-base leading-relaxed font-bold text-accent-ink transition duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
						href="#download"
					>
						<IconDownload size={20} stroke={1.6} aria-hidden="true" />
						{i18n.t('site.get')}
					</a>
				</div>
				<p class="flex items-center justify-center gap-2 text-xs text-muted sm:gap-3">
					<IconBrandWindows size={14} stroke={1.6} aria-hidden="true" />
					<IconBrandApple size={14} stroke={1.6} aria-hidden="true" />
					<IconTerminal2 size={14} stroke={1.6} aria-hidden="true" />
					<span class="ml-0.5">{i18n.t('site.platforms')}</span>
				</p>
			</div>
			<figure class="pointer-events-none relative mx-auto max-w-7xl">
				<img
					class="block h-auto w-full opacity-90"
					src={editorScreenshot}
					alt={i18n.t('site.screenshotAlt')}
					width="1920"
					height="1045"
					fetchpriority="high"
				/>
				<div
					class="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-background to-transparent sm:h-24"
				></div>
				<div
					class="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent sm:h-32"
				></div>
			</figure>
		</section>
		<div
			class="mx-auto grid max-w-6xl grid-cols-2 items-center justify-around gap-6 border-b border-line/50 px-5 py-6 sm:flex sm:gap-3 sm:px-6 sm:py-9 lg:gap-6 lg:px-8"
		>
			{#each [i18n.t('site.stripGpu'), i18n.t('site.stripPlugins'), i18n.t('site.stripPlatforms'), i18n.t('site.stripFree')] as label, i}
				{@const QualityIcon = qualityIcons[i]}
				<span
					class="flex items-center justify-center gap-3 text-sm text-muted sm:justify-start sm:gap-2 lg:gap-3"
				>
					<QualityIcon class="text-accent-hover" size={20} stroke={1.6} aria-hidden="true" />
					{label}
				</span>
			{/each}
		</div>
		<section id="features" class="relative isolate overflow-hidden">
			<div
				class="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-accent"
				aria-hidden="true"
			>
				<picture class="absolute top-0 right-0 block w-full sm:min-w-6xl">
					<source media="(min-width: 640px)" srcset={pcbPattern} width="1600" height="1080" />
					<img
						class="h-auto w-full opacity-20"
						src={pcbPatternMobile}
						alt=""
						width="480"
						height="2000"
						loading="lazy"
					/>
				</picture>
			</div>
			<div class="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8">
				<div class="mb-7 text-center sm:mb-10">
					<h2
						class="mt-4 mb-3 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl"
					>
						{i18n.t('site.featureTitle')}
					</h2>
					<p class="text-base leading-7 text-muted">{i18n.t('site.featureIntro')}</p>
				</div>
				<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
					<article
						class="relative overflow-hidden rounded-xl border border-line/50 bg-surface/70 p-6 backdrop-blur-xl sm:col-span-2 sm:p-8"
					>
						<div class="min-w-0 flex-1">
							<h3 class="mt-4 mb-2.5 text-xl leading-normal font-bold tracking-tight sm:text-2xl">
								{i18n.t('site.timelineTitle')}
							</h3>
							<p class="max-w-lg text-base leading-8 text-muted">
								{i18n.t('site.timelineBody')}
							</p>
						</div>
						<div
							class="relative -mx-px mt-6 -mb-6 h-40 overflow-hidden rounded-t-lg border border-line sm:-mb-8 sm:h-52"
						>
							<img
								class="absolute bottom-0 w-full max-w-none"
								src={editorScreenshot}
								alt=""
								width="1920"
								height="1045"
								loading="lazy"
							/>
						</div>
					</article>
					<article
						class="relative flex flex-col overflow-hidden rounded-xl border border-line/50 bg-surface/70 p-6 backdrop-blur-xl sm:col-start-2 sm:row-start-2 sm:p-8 lg:col-auto lg:row-auto"
					>
						<div
							class="relative isolate flex h-28 flex-col items-center justify-center gap-2.5 text-xs tracking-widest text-accent sm:h-40"
							aria-hidden="true"
						>
							<div
								class="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-2xl sm:size-32"
							></div>
							<IconCpu size={68} stroke={1.6} aria-hidden="true" />
						</div>
						<h3
							class="mt-2.5 mb-2.5 text-xl leading-normal font-bold tracking-tight sm:mt-0 sm:text-2xl"
						>
							{i18n.t('site.gpuTitle')}
						</h3>
						<p class="max-w-lg text-base leading-8 text-muted">{i18n.t('site.gpuBody')}</p>
					</article>
					<article
						class="relative overflow-hidden rounded-xl border border-line/50 bg-surface/70 p-6 backdrop-blur-xl sm:col-start-1 sm:row-start-2 sm:p-8 lg:col-auto lg:row-auto"
					>
						<span
							class="absolute top-4 right-4 inline-flex rounded-sm border border-accent/30 bg-accent-soft px-2 py-1 text-xs text-accent-hover sm:top-5 sm:right-5"
						>
							{i18n.t('site.pluginStatus')}
						</span>
						<div
							class="my-8 flex items-center gap-3 rounded-lg border border-line bg-raised p-4 font-mono text-sm text-accent-hover"
							aria-hidden="true"
						>
							<IconPlug size={32} stroke={1.6} aria-hidden="true" />
							<span>zerium.contrib</span>
							<IconPlus class="ml-auto" size={24} stroke={1.6} aria-hidden="true" />
						</div>
						<h3 class="mt-4 mb-2.5 text-xl leading-normal font-bold tracking-tight sm:text-2xl">
							{i18n.t('site.pluginTitle')}
						</h3>
						<p class="max-w-lg text-base leading-8 text-muted">{i18n.t('site.pluginBody')}</p>
						<a
							class="mt-5 inline-flex items-center gap-2.5 text-sm font-bold text-accent-hover transition-colors duration-200 hover:text-accent-hover"
							href={`${REPOSITORY}/blob/main/docs/plugin.md`}
							target="_blank"
							rel="noreferrer"
						>
							{i18n.t('site.pluginLink')}
							<IconExternalLink size={15} stroke={1.6} aria-hidden="true" />
						</a>
					</article>
					<article
						class="relative grid gap-6 overflow-hidden rounded-xl border border-line/50 bg-surface/70 p-6 backdrop-blur-xl sm:col-span-2 sm:grid-cols-2 sm:items-center sm:gap-8 sm:p-8"
					>
						<div class="min-w-0 flex-1">
							<h3 class="mb-2.5 text-xl leading-normal font-bold tracking-tight sm:text-2xl">
								{i18n.t('site.sceneTitle')}
							</h3>
							<p class="max-w-lg text-base leading-8 text-muted">
								{i18n.t('site.sceneBody')}
							</p>
						</div>
						<div
							class="relative isolate mx-auto w-full max-w-sm text-accent-hover"
							aria-hidden="true"
						>
							<div
								class="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-2xl"
							></div>
							<div class="mx-auto w-4/5 rounded-lg border border-line/70 bg-background/70 p-3">
								<div class="mb-3 flex items-center gap-2 text-xs font-medium">
									<IconStack2 size={15} stroke={1.6} />
									{i18n.t('site.sceneExample')}
								</div>
								<div class="grid grid-cols-2 items-center gap-3">
									<div class="space-y-1.5">
										{#each [IconPhoto, IconTypography, IconSquare] as LayerIcon, index}
											<div class="flex h-6 items-center gap-2 rounded-sm bg-raised/70 px-2">
												<LayerIcon size={12} stroke={1.6} />
												<div
													class={[
														'h-1.5 rounded-xs bg-accent/30',
														index === 0 ? 'w-full' : index === 1 ? 'w-3/4' : 'w-1/2'
													]}
												></div>
											</div>
										{/each}
									</div>
									<div class="flex h-20 items-center justify-center gap-2 rounded-sm bg-background">
										<img class="size-7" src="/zerium.svg" width="28" height="28" alt="" />
										<div class="space-y-1.5">
											<div class="h-1.5 w-8 rounded-xs bg-foreground/70"></div>
											<div class="h-1 w-5 rounded-xs bg-muted/40"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="flex h-8 items-center justify-center text-accent/60">
								<IconArrowDown size={18} stroke={1.6} />
							</div>
							<div
								class="relative overflow-hidden rounded-lg border border-line/70 bg-background/70 p-3"
							>
								<div class="mb-2 flex justify-between font-mono text-xs text-muted/70">
									<span>00:00</span>
									<span>00:05</span>
									<span>00:10</span>
								</div>
								<div class="mb-2 flex justify-between border-t border-line/60">
									{#each Array(13) as _}
										<div class="h-1.5 w-px bg-line/60"></div>
									{/each}
								</div>
								<div class="grid grid-cols-12 gap-1">
									{#each [0, 1] as copy}
										<div
											class="col-span-5 flex h-9 items-center gap-1.5 rounded-sm border border-accent/50 bg-accent/15 px-2 text-xs"
											class:col-start-8={copy === 1}
										>
											<IconStack2 size={14} stroke={1.6} />
											<span class="truncate">{i18n.t('site.sceneExample')}</span>
										</div>
									{/each}
									<div class="col-span-8 mt-1 h-3 rounded-sm bg-raised/70"></div>
								</div>
								<div class="absolute top-3 bottom-3 left-1/3 w-px bg-accent/70">
									<div class="size-1.5 -translate-x-1/2 rounded-xs bg-accent"></div>
								</div>
							</div>
						</div>
					</article>
				</div>
			</div>
		</section>
		<section
			id="download"
			class="relative overflow-hidden border-t border-line/50 pt-16 pb-11 sm:pt-20 sm:pb-16"
		>
			<picture
				class="pointer-events-none absolute top-0 right-0 block w-full sm:min-w-5xl"
				aria-hidden="true"
			>
				<source media="(min-width: 640px)" srcset={circuitSchematic} width="1600" height="800" />
				<img
					class="h-auto w-full opacity-25"
					src={circuitSchematicMobile}
					alt=""
					width="500"
					height="1100"
					loading="lazy"
				/>
			</picture>
			<div class="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
				<div class="mb-7 text-center sm:mb-10">
					<h2
						class="mt-4 mb-3 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl"
					>
						{i18n.t('site.downloadTitle')}
					</h2>
				</div>
				<div
					class="-mt-2.5 mb-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted sm:gap-5"
				>
					<a
						class="flex items-center gap-2 hover:text-accent-hover"
						href={RELEASES_URL}
						target="_blank"
						rel="noreferrer"
					>
						{i18n.t('site.releases')}
						<IconExternalLink size={14} stroke={1.6} aria-hidden="true" />
					</a>
				</div>
				<div
					class="mx-auto grid w-fit max-w-full grid-cols-3 gap-1 rounded-xl border border-line/50 bg-surface/70 p-1 backdrop-blur-xl"
				>
					{#each platforms as platform}
						{@const PlatformIcon = platform.icon}
						<button
							class={[
								'flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-sm',
								selectedPlatform === platform.id
									? 'bg-accent-soft text-accent-hover'
									: 'text-muted hover:bg-raised/50 hover:text-foreground'
							]}
							aria-pressed={selectedPlatform === platform.id}
							aria-controls="platform-download"
							onclick={() => (selectedPlatform = platform.id)}
						>
							<PlatformIcon class="shrink-0" size={18} stroke={1.6} aria-hidden="true" />
							<span>{platform.name}</span>
						</button>
					{/each}
				</div>
				<div
					id="platform-download"
					class="relative mx-auto mt-4 max-w-2xl overflow-hidden rounded-xl border border-line/50 bg-surface/70 p-6 backdrop-blur-xl sm:p-8"
				>
					<div class="flex flex-wrap items-center justify-between gap-4">
						<div>
							<h3 class="text-xl leading-normal font-bold tracking-tight sm:text-2xl">
								{selectedDownload.name}
							</h3>
							<p class="mt-1 text-sm text-muted">
								{selectedPlatform === 'macos' ? i18n.t('site.apple') : 'x86_64'}
								{#if selectedPlatform !== 'linux'}
									· {selectedDownload.format}
								{/if}
							</p>
						</div>
						{#if selectedPlatform === 'linux'}
							<a
								class="inline-flex items-center gap-2 text-sm text-accent-hover hover:text-accent"
								href={`${RELEASES_URL}/download/${selectedDownload.file}`}
							>
								{i18n.t('site.downloadAppImage')}
								<IconDownload size={16} stroke={1.6} aria-hidden="true" />
							</a>
						{:else}
							<a
								class="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-accent px-6 py-3 text-sm leading-relaxed font-bold text-accent-ink transition duration-200 hover:-translate-y-0.5 hover:bg-accent-hover sm:w-auto"
								href={`${RELEASES_URL}/download/${selectedDownload.file}`}
							>
								<IconDownload size={18} stroke={1.6} aria-hidden="true" />
								{i18n.t('site.download')}
							</a>
						{/if}
					</div>
					{#if selectedPlatform === 'linux'}
						<div class="mt-5 flex flex-col gap-3 sm:flex-row">
							<input
								class="block h-12 w-full min-w-0 rounded-lg border border-line/50 bg-background/70 px-3 font-mono text-xs text-foreground focus-visible:outline-2 focus-visible:outline-accent-hover sm:flex-1"
								type="text"
								readonly
								value={LINUX_INSTALL_COMMAND}
								aria-label={i18n.t('site.installCommand')}
								onfocus={(event) => event.currentTarget.select()}
							/>
							<button
								class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-lg bg-accent px-5 py-3 text-sm leading-relaxed font-bold text-accent-ink transition duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
								onclick={copyInstallCommand}
							>
								<IconCopy size={18} stroke={1.6} aria-hidden="true" />
								{i18n.t('site.copyCommand')}
							</button>
						</div>
					{/if}
				</div>
				<div
					class="mt-6 mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-muted"
				>
					<a
						class="inline-flex items-center gap-2.5 text-sm font-bold transition-colors duration-200 hover:text-accent-hover"
						href={RELEASES_URL}
						target="_blank"
						rel="noreferrer"
					>
						{i18n.t('site.allDownloads')}
						<IconArrowRight size={17} stroke={1.6} aria-hidden="true" />
					</a>
					<a
						class="inline-flex items-center gap-2.5 text-sm font-normal transition-colors duration-200 hover:text-accent-hover"
						href={`${REPOSITORY}#nix`}
						target="_blank"
						rel="noreferrer"
					>
						{i18n.t('site.nixGuide')}
						<IconExternalLink size={14} stroke={1.6} aria-hidden="true" />
					</a>
				</div>
				<aside class="mx-auto max-w-2xl text-sm leading-5 text-muted">
					<p class="font-bold">{i18n.t('site.development')}</p>
					<p class="mt-1">{i18n.t('site.developmentBody')}</p>
				</aside>
			</div>
		</section>
	</main>
	<footer
		class="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 py-8 sm:flex-row sm:gap-8 sm:px-6 sm:py-10 lg:px-8"
	>
		<div>
			<a
				class="inline-flex items-center text-2xl leading-normal font-bold tracking-tighter"
				href={`/${data.locale}`}
			>
				<img class="mr-2 size-8" src="/zerium.svg" width="30" height="30" alt="" />
				Zerium
			</a>
			<p class="mt-2 text-xs leading-6 text-muted">{i18n.t('site.footerLine')}</p>
		</div>
		<div
			class="flex max-w-md flex-wrap items-center justify-start gap-x-6 gap-y-2 text-left sm:justify-end sm:text-right"
		>
			<a
				class="flex items-center gap-2 text-sm text-muted hover:text-accent-hover"
				href={REPOSITORY}
				target="_blank"
				rel="noreferrer"
			>
				<IconBrandGithub size={16} stroke={1.6} aria-hidden="true" />
				{i18n.t('site.source')}
			</a>
			<a
				class="flex items-center gap-2 text-sm text-muted hover:text-accent-hover"
				href={`${REPOSITORY}/blob/main/LICENSE`}
				target="_blank"
				rel="noreferrer"
			>
				{i18n.t('site.license')}
			</a>
		</div>
	</footer>
</div>
