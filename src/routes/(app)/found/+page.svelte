<script lang="ts">
	import Chip from '$lib/components/chip.svelte';
	import foodService from '$services/food.service';
	import { foodList, selectedFoods } from '$stores/food.store';
	import Icon from '@iconify/svelte';
	import type { IFood } from '$models/food.model';
	import { plateList } from '$stores/plate.store';
	import plateService from '$services/plate.service';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/app/button.svelte';

	let foodValue = '';

	const cleanField = (): void => {
		foodValue = '';
		foodList.set([]);
	};

	const getPlates = () => {
		plateService.listPlate().then((response) => {
			if (response.status === 200 && response.data) {
				plateList.set([...new Set(response.data)]);
			}
		});
	};

	const getFoods = (): void => {
		foodService.listFood().then((response) => {
			let newFoods: IFood[] = [];

			if (response.status === 200 && response.data) {
				newFoods = [...new Set(response.data)];
			}

			if (newFoods.length > 12) {
				newFoods = newFoods.slice(0, 12);
			}

			foodList.set(newFoods);
		});
	};

	const handleInputFoodValue = (
		event: Event & { currentTarget: EventTarget & HTMLInputElement }
	) => {
		const value = event.currentTarget.value;

		if (/[^A-Za-z]/g.test(value)) {
			event.currentTarget.value = value.replace(/[^A-Za-z]/g, '');
			return;
		}

		if (value.length > 2) {
			getFoods();
		}
	};

	const handleClickAddFood = (newFood: IFood) => {
		if ($selectedFoods.some((selectedItem) => selectedItem.id === newFood.id)) return;

		selectedFoods.update((foods) => [...foods, newFood]);
		foodList.update((foods) => foods.filter((foodItem) => foodItem.id !== newFood.id));
	};

	const handleClickRemoveChip = (newFood: IFood) => {
		foodList.update((foods) => [...foods, newFood]);
		selectedFoods.update((foods) => foods.filter((foodItem) => foodItem.id !== newFood.id));
	};

	const handleClickPlates = async () => {
		await getPlates();

		if ($selectedFoods.length > 0) {
			goto('/plates');
		}
	};
</script>

<svelte:head>
	<meta name="description" content="Seleção de ingredientes para buscar receitas" />
</svelte:head>

<div class="grid grid-cols-1 auto-rows-min md:grid-cols-2 md:gap-10 max-w-5xl">
	<div>
		<div class="flex flex-col max-w-[400px] mx-auto mt-4">
			<label for="food-field" class="mb-1 text-orange-400 font-semibold"
				>Busque seus alimentos aqui:</label
			>

			<div class="relative">
				<input
					id="food-field"
					on:input={handleInputFoodValue}
					bind:value={foodValue}
					class="w-full shadow-lg text-base p-2 rounded border border-neutral-200"
					placeholder="tomate, macarrão, leite..."
				/>

				{#if foodValue || $foodList.length > 0}
					<button on:click={cleanField} class="h-full flex items-center absolute top-0 right-2">
						<Icon
							icon="ph:x-circle-bold"
							class="text-neutral-400 hover:text-neutral-600 cursor-pointer"
							width="20"
							height="20"
						/>
					</button>
				{/if}
			</div>
		</div>

		{#if $foodList.length > 0}
			<div class="rounded shadow-lg mt-4">
				<ul class="grid grid-cols-2 gap-2 px-8 py-3">
					{#each $foodList as food}
						<li data-testid="found-food-item" class="pb-1 border-b border-neutral-200">
							<button
								data-testid="add-food"
								class="text-sm pl-1 border-l-2 border-l-transparent hover:border-orange-400"
								on:click={() => handleClickAddFood(food)}>{food.name}</button
							>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="mt-4">
				<p class="py-1 text-sm text-center font-light text-neutral-400">
					Alimentos buscados apareceram aqui
				</p>
			</div>
		{/if}
	</div>

	<div class="flex flex-col mt-4">
		<div>
			<h3 class="text-orange-400">Selecionados:</h3>

			{#if $selectedFoods.length > 0}
				<div
					data-testid="selected-foods"
					class="flex flex-wrap gap-x-2 gap-y-2 mt-4 md:justify-start"
				>
					{#each $selectedFoods as food, index (food)}
						<Chip text={food.name} {index} onRemove={() => handleClickRemoveChip(food)} />
					{/each}
				</div>
			{:else}
				<div class="mt-4 md:justify-start">
					<p class="py-1 text-sm text-center font-light text-neutral-400">
						Nenhum alimento selecionado
					</p>
				</div>
			{/if}
		</div>

		<div class="flex justify-center mt-3">
			<Button
				text="pegar receitas"
				props={{
					class: "{$selectedFoods.length === 0 && '!bg-neutral-300'}}"
				}}
				handleClick={handleClickPlates}
			/>
		</div>
	</div>
</div>
