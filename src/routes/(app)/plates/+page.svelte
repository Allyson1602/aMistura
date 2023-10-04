<script lang="ts">
	import Chip from "$lib/components/chip.svelte";
	import "@splidejs/svelte-splide/css";
	import "@splidejs/svelte-splide/css";
	import { plateList } from "$stores/plate";
	import Carousel from "./carousel.svelte";
	import type { MoveEventDetail } from "@splidejs/svelte-splide/types";

	let currentPlate = 0;
	let currentCategory = 0;

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

<div class="h-full relative">
	<div class="flex flex-col justify-between gap-7 h-full mt-4 max-w-4xl">
		<div>
			<Carousel onMove={handleMoveCarousel} />
	
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