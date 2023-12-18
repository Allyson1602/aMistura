<script lang="ts">
	import Button from '$lib/components/app/button.svelte';
	import { uRemoveItemArray } from '$lib/utils/remove-item-array';
	import type { IRecipe } from '$models/recipe.model';

	export let title: string;
	export let recipe: IRecipe;
	let elementToScroll: HTMLDivElement;
	let instructionsCompleted: number[] = [];

	const toggleInstructionComplete = (index: number): void => {
		if (instructionsCompleted?.includes(index)) {
			instructionsCompleted = uRemoveItemArray(instructionsCompleted, index) as number[];
			return;
		}

		instructionsCompleted.push(index);
		sessionStorage.setItem('instructionsCompleted', JSON.stringify(instructionsCompleted));

		instructionsCompleted = JSON.parse(sessionStorage.getItem('instructionsCompleted')!);
	};
</script>

<div bind:this={elementToScroll} class="pt-4 px-3 overflow-auto h-[calc(100vh-99px)]">
	<button class="md:hidden text-orange-400">voltar</button>

	<div class="flex flex-col gap-3">
		<div class="flex flex-col items-center gap-1">
			<p class="font-sans2 text-5xl underline decoration-2 underline-offset-4">Receita</p>
			<p>rate</p>
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

			<div class="w-full grid grid-cols-2">
				{#each recipe.ingredients as ingredient}
					<div class="flex">
						<input type="checkbox" />
						<p>{ingredient.name}</p>
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
