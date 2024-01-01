<script lang="ts">
	import Chip from '$lib/components/chip.svelte';
	import ingredientService from '$services/ingredient.service';
	import { ingredientsList } from '$stores/ingredient.store';
	import Icon from '@iconify/svelte';
	import type { IIngredient } from '$models/ingredient.model';
	import plateService from '$services/plate.service';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/app/button.svelte';
	import { EDomain, hDefaultSessionStorage } from '$lib/helpers/session-storage';
	import { browser } from '$app/environment';

	let ingredientValue = '';
	let selectedIngredients: IIngredient[];

	$: if (browser) {
		const sessionStorageIngredients = sessionStorage.getItem(EDomain.SELECTED_INGREDIENTS);
		if (sessionStorageIngredients) {
			selectedIngredients = JSON.parse(sessionStorageIngredients);
		}
	}

	const cleanField = (): void => {
		ingredientValue = '';
		ingredientsList.set([]);
	};

	const getPlates = () => {
		plateService.listPlate().then((response) => {
			if (response.status === 200 && response.data) {
				const ingredientSStorage = hDefaultSessionStorage(EDomain.LIST_PLATE, '', [
					...new Set(response.data)
				]);
				sessionStorage.setItem(ingredientSStorage.identifier, ingredientSStorage.valueString);
			}
		});
	};

	const getIngredients = (): void => {
		ingredientService.listIngredient().then((response) => {
			let newIngredients: IIngredient[] = [];

			if (response.status === 200 && response.data) {
				newIngredients = [...new Set(response.data)];
			}

			if (newIngredients.length > 12) {
				newIngredients = newIngredients.slice(0, 12);
			}

			ingredientsList.set(newIngredients);
		});
	};

	const handleInputIngredientValue = (
		event: Event & { currentTarget: EventTarget & HTMLInputElement }
	) => {
		const value = event.currentTarget.value;

		if (/[^A-Za-z]/g.test(value)) {
			event.currentTarget.value = value.replace(/[^A-Za-z]/g, '');
			return;
		}

		if (value.length > 2) {
			getIngredients();
		}
	};

	const handleClickAddIngredient = (newIngredient: IIngredient) => {
		if (selectedIngredients.some((selectedItem) => selectedItem.id === newIngredient.id)) return;

		const selectedIngredientsStorage = hDefaultSessionStorage(EDomain.SELECTED_INGREDIENTS, '', [
			...new Set([...selectedIngredients, newIngredient])
		]);
		sessionStorage.setItem(
			selectedIngredientsStorage.identifier,
			selectedIngredientsStorage.valueString
		);
	};

	const handleClickRemoveChip = (newIngredient: IIngredient) => {
		ingredientsList.update((ingredients) => [...ingredients, newIngredient]); // deprecated

		const updateSelectedIngredients = selectedIngredients.filter(
			(plateItem) => plateItem !== newIngredient
		);

		const selectedIngredientsStorage = hDefaultSessionStorage(
			EDomain.SELECTED_INGREDIENTS,
			'',
			updateSelectedIngredients
		);
		sessionStorage.setItem(
			selectedIngredientsStorage.identifier,
			selectedIngredientsStorage.valueString
		);
	};

	const handleClickPlates = async () => {
		await getPlates();

		if (selectedIngredients.length > 0) {
			goto('/plates');
		}
	};
</script>

<svelte:head>
	<meta name="description" content="Seleção de ingredientes para buscar receitas" />
</svelte:head>

<div class="grid grid-cols-1 auto-rows-min md:grid-cols-2 md:gap-10 max-w-5xl p-5">
	<div>
		<div class="flex flex-col max-w-[400px] mx-auto mt-4">
			<label for="ingredients-field" class="mb-1 text-orange-400 font-semibold"
				>Busque seus alimentos aqui:</label
			>

			<div class="relative">
				<input
					id="ingredients-field"
					on:input={handleInputIngredientValue}
					bind:value={ingredientValue}
					class="w-full shadow-lg text-base p-2 rounded border border-neutral-200"
					placeholder="tomate, macarrão, leite..."
				/>

				{#if ingredientValue || $ingredientsList.length > 0}
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

		{#if $ingredientsList.length > 0}
			<div class="rounded shadow-lg mt-4">
				<ul class="grid grid-cols-2 gap-2 px-8 py-3">
					{#each $ingredientsList as ingredients}
						<li data-testid="found-ingredients-item" class="pb-1 border-b border-neutral-200">
							<button
								data-testid="add-ingredients"
								class="text-sm pl-1 border-l-2 border-l-transparent hover:border-orange-400"
								on:click={() => handleClickAddIngredient(ingredients)}>{ingredients.name}</button
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

			{#if selectedIngredients?.length > 0}
				<div
					data-testid="selected-ingredients"
					class="flex flex-wrap gap-x-2 gap-y-2 mt-4 md:justify-start"
				>
					{#each selectedIngredients as ingredients, index (ingredients)}
						<Chip
							text={ingredients.name}
							{index}
							onRemove={() => handleClickRemoveChip(ingredients)}
						/>
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
					class: selectedIngredients?.length === 0 ? '!bg-neutral-300' : undefined,
					disabled: !(selectedIngredients?.length > 0) ?? false
				}}
				handleClick={handleClickPlates}
			/>
		</div>
	</div>
</div>
