<script lang="ts">
	import Menu from '$lib/components/menu.svelte';
	import '../styles.css';
	import GrabBottom from '$lib/components/grab-bottom.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { getBreakpoint } from '$lib/helpers/tailwind-breakpoint';
	import { EBreakpoints } from '$lib/enums';

	export let data;

	const breakpointSm = getBreakpoint(EBreakpoints.SM);
	let innerWidth: number;
</script>

<Toaster position={innerWidth <= breakpointSm ? 'top-center' : 'bottom-left'} />

<svelte:window bind:innerWidth />

<div class="app h-full">
	<div class="h-full flex flex-col justify-between">
		<div class="grow flex flex-col md:flex-row">
			<Menu route={data.route.id} />

			<div class="grow">
				<slot />
			</div>
		</div>

		<!-- only mobile -->
		<GrabBottom />
	</div>
</div>
