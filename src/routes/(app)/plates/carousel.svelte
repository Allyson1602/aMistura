<script lang="ts">
	import { EBreakpoints } from '$lib/enums';
	import { getBreakpoint } from '$lib/helpers/tailwind-breakpoint';
	import Icon from '@iconify/svelte';
	import { Splide, SplideTrack, SplideSlide } from '@splidejs/svelte-splide';
	import type { MoveEventDetail } from '@splidejs/svelte-splide/types';
	import WithoutImagePlate from '$lib/images/without-image-food.jpg';
	import { EDomain } from '$lib/helpers/session-storage';
	import { browser } from '$app/environment';
	import { plateList } from '$stores/plate.store';

	export let onMove: ((event: CustomEvent<MoveEventDetail> | undefined) => void) | undefined;

	const breakpointMd = getBreakpoint(EBreakpoints.MD);
	let screenSize: number;

	$: if (browser) {
		const sessionStoragePlates = sessionStorage.getItem(EDomain.LIST_PLATE);
		if (sessionStoragePlates) {
			plateList.set(JSON.parse(sessionStoragePlates));
		}
	}
</script>

<svelte:window bind:innerWidth={screenSize} />

<Splide hasTrack={false} on:move={onMove}>
	<SplideTrack style="min-height: 15rem">
		{#each $plateList as plate}
			<SplideSlide>
				<img
					src={plate.image?.link || WithoutImagePlate}
					alt={plate.name}
					class={`max-h-60 object-contain mx-auto my-2 rounded-xl shadow-md min-h-[200px] max-w-full md:max-w-lg w-full ${
						!plate.image?.link ? 'animate-pulse' : ''
					}`}
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
