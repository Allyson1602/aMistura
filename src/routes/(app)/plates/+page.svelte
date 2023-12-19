<script lang="ts">
	import Chip from '$lib/components/chip.svelte';
	import '@splidejs/svelte-splide/css';
	import '@splidejs/svelte-splide/css';
	import { plateList } from '$stores/plate.store';
	import Carousel from './carousel.svelte';
	import type { MoveEventDetail } from '@splidejs/svelte-splide/types';
	import Categories from './categories.svelte';
	import Recipe from './recipe.svelte';
	import Button from '$lib/components/app/button.svelte';
	import { getBreakpoint } from '$lib/helpers/tailwind-breakpoint';
	import { EBreakpoints } from '$lib/types';

	let currentPlate = 0;
	let showRecipe = true;
	let innerWidth: number;
	const breakpointMd = getBreakpoint(EBreakpoints.MD);

	$: plate = $plateList[currentPlate];

	$: if (innerWidth < breakpointMd) {
		showRecipe = false;
	} else {
		showRecipe = true;
	}

	const handleMoveCarousel = (event: CustomEvent<MoveEventDetail> | undefined) => {
		if (event) {
			currentPlate = event.detail.index;
		}
	};

	const handleClickShowRecipe = () => {
		showRecipe = !showRecipe;
	};
</script>

<svelte:head>
	<title>(10) A Mistura</title>
	<meta name="description" content="Listagem de pratos com ingredientes informados" />
</svelte:head>

<svelte:window bind:innerWidth />

<div class="h-full flex justify-between">
	<div class="flex flex-col justify-between gap-7 h-full p-5 pt-9 max-w-4xl">
		<div>
			<Carousel onMove={handleMoveCarousel} />

			<div class="flex flex-col gap-4 items-center mt-4">
				<p class="text-xl">{plate.name}</p>

				<div class="flex gap-1">
					{#each plate.includedFoods as chip, index}
						<Chip size="small" text={chip.name} {index} />
					{/each}
				</div>

				{#if plate.requiredFoods.length > 0}
					<div class="flex gap-1 border-t border-t-orange-200 pt-4">
						{#each plate.requiredFoods as chip}
							<Chip size="small" text={chip.name} isdisabled />
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="flex pb-6">
			<Button
				text="ver receita"
				handleClick={handleClickShowRecipe}
				props={{ class: 'md:hidden' }}
			/>
		</div>

		{#if plate.categories.length > 0}
			<Categories categories={plate.categories} />
		{/if}
	</div>

	{#if showRecipe}
		<div
			class="w-screen absolute left-0 top-[99px] z-20 bg-lemonChiffon max-w-lg md:w-auto md:static"
		>
			<Recipe bind:show={showRecipe} {plate} />
		</div>
	{/if}
</div>
