<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/app/button.svelte';
	import Rating from '$lib/components/rating.svelte';
	import { EDomain, hDefaultSessionStorage } from '$lib/helpers/session-storage';
	import { uRemoveItemArray } from '$lib/utils/remove-item-array';
	import type { IPlate } from '$models/plate.model';
	import Icon from '@iconify/svelte';

	export let plate: IPlate;
	export let show: boolean;

	let elementToScroll: HTMLDivElement;
	let ingredientsChecked: number[] = [];
	let instructionsCompleted: number[] = [];

	$: if (browser) {
		const sessionStorageIngredients = sessionStorage.getItem(EDomain.INGREDIENT_RECIPE);
		if (sessionStorageIngredients) {
			ingredientsChecked = JSON.parse(sessionStorageIngredients);
		}

		const sessionStorageInstructions = sessionStorage.getItem(EDomain.INSTRUCTION_RECIPE);
		if (sessionStorageInstructions) {
			instructionsCompleted = JSON.parse(sessionStorageInstructions);
		}
	}

	const toggleIngredientsChecked = (index: number): void => {
		if (ingredientsChecked?.includes(index)) {
			ingredientsChecked = uRemoveItemArray(ingredientsChecked, index) as number[];
		} else {
			ingredientsChecked.push(index);
		}

		const ingredientSStorage = hDefaultSessionStorage(
			EDomain.INGREDIENT_RECIPE,
			plate.id.toString(),
			ingredientsChecked
		);
		sessionStorage.setItem(ingredientSStorage.identifier, ingredientSStorage.valueString);

		ingredientsChecked = JSON.parse(sessionStorage.getItem(ingredientSStorage.identifier)!);

		ingredientsChecked = ingredientsChecked;
	};

	const toggleInstructionComplete = (index: number): void => {
		if (instructionsCompleted?.includes(index)) {
			instructionsCompleted = uRemoveItemArray(instructionsCompleted, index) as number[];
			return;
		}

		instructionsCompleted.push(index);
		sessionStorage.setItem('instructionsCompleted', JSON.stringify(instructionsCompleted));

		instructionsCompleted = JSON.parse(sessionStorage.getItem('instructionsCompleted')!);
	};

	const handleGoBack = () => {
		show = false;
	};
</script>

<div bind:this={elementToScroll} class="pt-2 px-3 overflow-auto md:h-full">
	<button on:click={handleGoBack} class="md:hidden text-orange-400 pl-2">voltar</button>

	<div class="flex flex-col gap-3 h-dvh">
		<div class="flex flex-col items-center gap-1">
			<p class="font-sans2 text-5xl underline decoration-2 underline-offset-4">Receita</p>
			<Rating rating={plate?.rating} />
		</div>

		<div class="flex items-baseline gap-2">
			<p class="font-sans2 text-2xl underline decoration-1 underline-offset-2">nome:</p>
			<p>{plate?.name}</p>
		</div>

		<div>
			<span class="font-sans2 text-2xl underline decoration-1 underline-offset-2">descrição:</span>
			<span>{plate?.description}</span>
		</div>

		<div class="flex flex-col items-baseline">
			<p class="font-sans2 text-2xl underline decoration-1 underline-offset-2">ingredientes:</p>

			<div class="w-full grid grid-cols-2 gap-2 mt-2">
				{#if plate?.ingredientPlates.length > 0}
					{#each plate.ingredientPlates as ingredient, index}
						<div class="flex items-center gap-3">
							<div class="relative origin-center rotate-45">
								<input
									on:click={() => toggleIngredientsChecked(index)}
									class="w-5 h-5 cursor-pointer"
									type="checkbox"
									id={ingredient.id.toString()}
									checked={ingredientsChecked.includes(index)}
								/>
								{#if ingredientsChecked.includes(index)}
									<span
										class="w-5 h-5 absolute top-0 left-0 pointer-events-none rounded-sm border border-solid border-yellow-500 bg-lemonChiffon"
										><Icon icon="ph:knife" class="text-yellow-600 cursor-pointer" /></span
									>
								{/if}
							</div>
							<label for={ingredient.id.toString()} class="cursor-pointer flex flex-col">
								<span>{ingredient.name}</span>
								<span class="text-xs text-neutral-800">({ingredient.quantity})</span>
							</label>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<div class="flex flex-col items-baseline">
			<p class="font-sans2 text-2xl underline decoration-1 underline-offset-2">instruções:</p>

			{#if plate?.instructions.length > 0}
				{#each plate.instructions as instruction, index}
					<button
						on:click={() => toggleInstructionComplete(index)}
						class={'text-left mb-3'.concat(
							' ',
							instructionsCompleted?.includes(index) ? 'line-through' : 'no-underline'
						)}>{index + 1}. {instruction.description}</button
					>
				{/each}
			{/if}
		</div>
	</div>
</div>
