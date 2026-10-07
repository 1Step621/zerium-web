<script lang="ts">
	import './layout.css';
	import { use } from '$lib/i18n';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();
	use(() => data);
</script>

<svelte:head>
	<link rel="icon" href="/zerium.svg" type="image/svg+xml" />
	<meta name="theme-color" content="#282c34" />
</svelte:head>
{@render children()}
