<script lang="ts">
	import Button from '$lib/components/app/button.svelte';
	import Rating from '$lib/components/rating.svelte';
	import { uRemoveItemArray } from '$lib/utils/remove-item-array';
	import type { IRecipe } from '$models/recipe.model';
	import Icon from '@iconify/svelte';

	export let title: string;
	export let recipe: IRecipe;
	export let show: boolean;

	let elementToScroll: HTMLDivElement;
	let instructionsCompleted: number[] = JSON.parse(
		sessionStorage.getItem('instructionsCompleted') || '[]'
	);
	let ingredientsChecked: number[] = JSON.parse(
		sessionStorage.getItem('ingredientsChecked') || '[]'
	);

	const toggleIngredientsChecked = (index: number): void => {
		if (ingredientsChecked?.includes(index)) {
			ingredientsChecked = uRemoveItemArray(ingredientsChecked, index) as number[];
		} else {
			ingredientsChecked.push(index);
		}

		sessionStorage.setItem('ingredientsChecked', JSON.stringify(ingredientsChecked));

		ingredientsChecked = JSON.parse(sessionStorage.getItem('ingredientsChecked')!);

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
		show = !show;
	};
</script>

<div bind:this={elementToScroll} class="pt-2 px-3 overflow-auto h-[calc(100vh-99px)]">
	<button on:click={handleGoBack} class="md:hidden text-orange-400 pl-2">voltar</button>

	<div class="flex flex-col gap-3">
		<div class="flex flex-col items-center gap-1">
			<p class="font-sans2 text-5xl underline decoration-2 underline-offset-4">Receita</p>
			<Rating rating={3} />
		</div>

		<div class="flex items-baseline gap-2">
			<p class="font-sans2 text-2xl underline decoration-1 underline-offset-2">nome:</p>
			<p>{title}</p>
		</div>

		<div>
			<span class="font-sans2 text-2xl underline decoration-1 underline-offset-2">descrição:</span>
			<span>{recipe.description}</span>
		</div>

		<div class="flex flex-col items-baseline">
			<p class="font-sans2 text-2xl underline decoration-1 underline-offset-2">ingredientes:</p>

			<div class="w-full grid grid-cols-2 gap-2 mt-2">
				{#each recipe.ingredients as ingredient, index}
					<div class="flex items-start gap-3">
						<div class="relative origin-center rotate-45">
							<input
								on:click={() => toggleIngredientsChecked(index)}
								class="w-5 h-5"
								type="checkbox"
								id={ingredient.id.toString()}
								checked={ingredientsChecked.includes(index)}
							/>
							{#if ingredientsChecked.includes(index)}
								<span
									class="w-5 h-5 absolute top-0 left-0 pointer-events-none rounded-sm border border-solid border-yellow-500 bg-lemonChiffon"
									><Icon icon="ph:knife" class="text-yellow-600" /></span
								>
							{/if}
						</div>
						<label for={ingredient.id.toString()}>{ingredient.name}</label>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col items-baseline">
			<p class="font-sans2 text-2xl underline decoration-1 underline-offset-2">instruções:</p>

			{#each recipe.instructions as instruction, index}
				<button
					on:click={() => toggleInstructionComplete(index)}
					class={'text-left mb-3'.concat(
						' ',
						instructionsCompleted?.includes(index) ? 'line-through' : 'no-underline'
					)}>{index + 1}. {instruction}</button
				>
			{/each}
		</div>
	</div>

	<div class="flex justify-center py-2">
		<Button
			text="subir"
			props={{
				class: '!w-24'
			}}
			handleClick={() => {
				elementToScroll.scroll({ top: 0, behavior: 'smooth' });
			}}
		/>
	</div>
</div>
