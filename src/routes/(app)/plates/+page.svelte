<script lang="ts">
	import Chip from '$lib/components/chip.svelte';
	import '@splidejs/svelte-splide/css';
	import '@splidejs/svelte-splide/css';
	import Carousel from './carousel.svelte';
	import type { MoveEventDetail } from '@splidejs/svelte-splide/types';
	import Categories from './categories.svelte';
	import Recipe from './recipe.svelte';
	import Button from '$lib/components/app/button.svelte';
	import { getBreakpoint } from '$lib/helpers/tailwind-breakpoint';
	import { EBreakpoints } from '$lib/enums';
	import { EDomain } from '$lib/helpers/session-storage';
	import type { IIngredient } from '$models/ingredient.model';
	import { browser } from '$app/environment';
	import { plateList } from '$stores/plate.store';

	const breakpointMd = getBreakpoint(EBreakpoints.MD);
	let currentPlate = 0;
	let showRecipe = true;
	let innerWidth: number;
	let selectedIngredients: IIngredient[] = [];

	$: if (browser) {
		const sessionStoragePlates = sessionStorage.getItem(EDomain.LIST_PLATE);
		if (sessionStoragePlates) {
			plateList.set(JSON.parse(sessionStoragePlates));
		}

		const sessionStorageIngredients = sessionStorage.getItem(EDomain.SELECTED_INGREDIENTS);
		if (sessionStorageIngredients) {
			selectedIngredients = JSON.parse(sessionStorageIngredients);
		}
	}

	$: ingredientsNotSelected = $plateList[currentPlate]?.ingredientPlates.filter(
		(ingredientPlateItem) => {
			let notSelected = true;

			selectedIngredients.forEach(({ name }) => {
				if (ingredientPlateItem.name === name) {
					notSelected = false;
				}
			});

			return notSelected;
		}
	);

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
	<div class="flex flex-col justify-between gap-7 w-full h-full p-5 pt-9 max-w-4xl">
		<div>
			<Carousel onMove={handleMoveCarousel} />

			<div class="flex flex-col gap-4 items-center mt-4 mx-auto max-w-sm">
				<p class="text-xl">{plate?.name}</p>

				<div class="flex justify-center flex-wrap gap-1">
					{#each selectedIngredients as ingredient, index}
						<Chip size="small" text={ingredient.name} {index} />
					{/each}
				</div>

				{#if ingredientsNotSelected?.length > 0}
					<div class="flex justify-center flex-wrap gap-1 border-t border-t-orange-200 pt-4">
						{#each ingredientsNotSelected as ingredient}
							<Chip size="small" text={ingredient.name} isdisabled />
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

		<!-- {#if plate.categories.length > 0}
			<Categories categories={plate.categories} />
		{/if} -->
	</div>

	{#if showRecipe}
		<div
			class="w-screen h-[calc(100%-99px)] absolute left-0 top-[99px] z-20 bg-lemonChiffon md:max-w-lg md:w-auto md:static md:h-full"
		>
			<Recipe bind:show={showRecipe} {plate} />
		</div>
	{/if}
</div>
