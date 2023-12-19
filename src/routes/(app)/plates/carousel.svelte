<script lang="ts">
	import { getBreakpoint } from '$lib/helpers/tailwind-breakpoint';
	import { EBreakpoints } from '$lib/types';
	import { plateList } from '$stores/plate.store';
	import Icon from '@iconify/svelte';
	import { Splide, SplideTrack, SplideSlide } from '@splidejs/svelte-splide';
	import type { MoveEventDetail } from '@splidejs/svelte-splide/types';

	export let onMove: ((event: CustomEvent<MoveEventDetail> | undefined) => void) | undefined;

	const breakpointMd = getBreakpoint(EBreakpoints.MD);
	let screenSize: number;
</script>

<svelte:window bind:innerWidth={screenSize} />

<Splide hasTrack={false} on:move={onMove}>
	<SplideTrack style="min-height: 15rem">
		{#each $plateList as plate}
			<SplideSlide>
				<img
					src={plate.image}
					alt={plate.name}
					class="max-h-60 object-contain mx-auto my-2 rounded-xl shadow-md min-h-[200px] min-w-[200px] max-w-full md:max-w-lg w-full"
				/>
			</SplideSlide>
		{/each}
	</SplideTrack>

	<ul class="splide__pagination invisible" />

	<div class="splide__arrows">
		<button class="splide__arrow splide__arrow--prev !bg-transparent -mt-36 md:-mt-0">
			{#if breakpointMd >= screenSize}
				<p class="text-orange-400 font-semibold">anterior</p>
			{:else}
				<button class="text-3xl !left-[0.5em] !lg:left-[1em] bg-orange-400 rounded text-white">
					<Icon icon="ph:caret-double-right" />
				</button>
			{/if}
		</button>

		<button class="splide__arrow splide__arrow--next !bg-transparent -mt-36 md:-mt-0">
			{#if breakpointMd >= screenSize}
				<p class="text-orange-400 font-semibold">próximo</p>
			{:else}
				<button class="text-3xl !left-[0.5em] !lg:left-[1em] bg-orange-400 rounded text-white">
					<Icon icon="ph:caret-double-right" />
				</button>
			{/if}
		</button>
	</div>
</Splide>
