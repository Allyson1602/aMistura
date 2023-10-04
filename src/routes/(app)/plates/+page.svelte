<script lang="ts">
	import Chip from "$lib/components/chip.svelte";
	import Icon from "@iconify/svelte";
	import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
	import "@splidejs/svelte-splide/css";
	import "@splidejs/svelte-splide/css";
	import type { MoveEventDetail } from "@splidejs/svelte-splide/types";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../../../tailwind.config";
	import { plateList } from "$stores/plate";

	const breakpoints = resolveConfig(tailwindConfig).theme?.screens as any;
	const breakPointMd = parseInt(breakpoints.md.replace('px', ''));

	let currentPlate = 0;
	let currentCategory = 0;

    let screenSize: number;

	const handleMoveCarousel = (event: CustomEvent<MoveEventDetail> | undefined) => {
		if (event) {
			currentPlate = event.detail.index;
		}
	};

	const handleClickCategory = (index: number) => {
		currentCategory = index;
	};
</script>

<svelte:head>
	<title>(10) A Mistura</title>
	<meta name="description" content="Listagem de pratos com ingredientes informados" />
</svelte:head>

<svelte:window bind:innerWidth={screenSize} />

<div class="h-full relative">
	<div class="flex flex-col justify-between gap-7 h-full mt-4 max-w-4xl">
		<div>
			<Splide hasTrack={false} on:move={handleMoveCarousel}>
				<SplideTrack style="min-height: 15rem">
					{#each $plateList as plate}
						<SplideSlide>
							<img src={plate.image} alt={plate.name} class="max-h-60 object-contain mx-auto my-2 rounded-xl shadow-md max-w-full md:max-w-lg" />
						</SplideSlide>
					{/each}
				</SplideTrack>
	
				<ul class="splide__pagination invisible"></ul>
	
				<div class="splide__arrows">
					<button class="splide__arrow splide__arrow--prev !bg-transparent -mt-36 md:-mt-0">
						{#if breakPointMd >= screenSize}
							<p class="text-orange-400 font-semibold">anterior</p>
						{:else}
							<button class="text-3xl !left-[0.5em] !lg:left-[1em]">
								<Icon icon="ph:caret-double-right" />
							</button>
						{/if}
					</button>

					<button class="splide__arrow splide__arrow--next !bg-transparent -mt-36 md:-mt-0">
						{#if breakPointMd >= screenSize}
							<p class="text-orange-400 font-semibold">próximo</p>
						{:else}
							<button class="text-3xl !left-[0.5em] !lg:left-[1em]">
								<Icon icon="ph:caret-double-right" />
							</button>
						{/if}
					</button>
				</div>
			</Splide>
	
			<div class="flex flex-col gap-4 items-center mt-4">
				<p class="text-xl">{$plateList[currentPlate].name}</p>
	
				<div class="flex gap-1">
					{#each $plateList[currentPlate].includedFoods as chip, index}
						<Chip size="small" text={chip.name} index={index} />
					{/each}
				</div>
				
				{#if $plateList[currentPlate].requiredFoods.length > 0}
					<div class="flex gap-1 border-t border-t-orange-200 pt-4">
						{#each $plateList[currentPlate].requiredFoods as chip}
							<Chip size="small" text={chip.name} isdisabled />
						{/each}
					</div>
				{/if}
			</div>
		</div>

		{#if $plateList[currentPlate].categories.length > 0}
			<div class="md:max-w-lg hidden md:flex flex-col mx-auto mb-6">
				<div class="flex justify-center gap-6 px-2 mb-5 border-b border-neutral-300">
					{#each $plateList[currentPlate].categories as category, index}
						<button on:click={() => handleClickCategory(index)} class="text-sm">{category.name}</button>
					{/each}
				</div>

				<div class="flex gap-4">
					{#each $plateList[currentPlate].categories[currentCategory].plates as plate}
						<div class="flex flex-col items-center">
							<img src={plate.image} alt="Imagem de opção de prato" class="w-24 max-x-w-24 object-contain mb-1 rounded-md shadow-md" />
							<p class="text-xs pl-2">{plate.name}</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>