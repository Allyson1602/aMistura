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
	import _ from 'lodash';
	import { plateList } from '$stores/plate.store';
	import { ELoadingStatus } from '$lib/types';
	import LoadingPlate from '$lib/components/app/loading-plate.svelte';
	import type { AxiosError } from 'axios';
	import { getRandomNumber } from '$lib/utils/get-random-number';
	import { errorMessages } from '$lib/resources/error-messages';
	import toast from 'svelte-french-toast';
	import type { IPlate } from '$models/plate.model';

	let inputElem: HTMLInputElement;
	let ingredientValue = '';
	let selectedIngredients: IIngredient[] = [];
	let loadingPlates = ELoadingStatus.notStarted;
	let loadingIngredients = ELoadingStatus.notStarted;

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

	const handlePlates = async () => {
		loadingPlates = ELoadingStatus.getting;

		const selectedIngredientsName = selectedIngredients.map((selectedItem) => selectedItem.name);

		await plateService
			.listPlate(selectedIngredientsName)
			.then((response) => {
				if (response.status === 201 && response.data) {
					let { data: platesData } = response.data;

					plateList.set([...new Set(platesData)]);
					const listPlateStorage = hDefaultSessionStorage(EDomain.LIST_PLATE, '', [
						...new Set(platesData)
					]);
					sessionStorage.setItem(listPlateStorage.identifier, listPlateStorage.valueString);
					loadingPlates = ELoadingStatus.finished;

					return goto('/plates');
				}
			})
			.catch((response: AxiosError) => {
				loadingPlates = ELoadingStatus.finished;

				const randomPhraseIndex = getRandomNumber(errorMessages.length - 1);
				toast.error(errorMessages[randomPhraseIndex]);

				plateList.set([]);
				const listPlateStorage = hDefaultSessionStorage(EDomain.LIST_PLATE, '', []);
				sessionStorage.setItem(listPlateStorage.identifier, listPlateStorage.valueString);
				loadingPlates = ELoadingStatus.finished;
			});

		generatePlateImage($plateList);
	};

	const generatePlateImage = (updatePlates: IPlate[]): void => {
		updatePlates.forEach(async (plateItem) => {
			const response = await plateService.generatePlateImage(
				plateItem.id,
				plateItem.image.description
			);

			plateList.update((currentPlates) => {
				const platesUpdated = currentPlates.map((currentPlateItem) => {
					if (currentPlateItem.id === response.data.data.id) {
						return {
							...currentPlateItem,
							image: {
								...currentPlateItem.image,
								link: response.data.data.image.link
							}
						};
					}

					return currentPlateItem;
				});

				const listPlateStorage = hDefaultSessionStorage(EDomain.LIST_PLATE, '', platesUpdated);
				sessionStorage.setItem(listPlateStorage.identifier, listPlateStorage.valueString);

				return platesUpdated;
			});
		});
	};

	const getIngredients = (value: string): void => {
		loadingIngredients = ELoadingStatus.getting;

		ingredientService
			.listIngredient(value)
			.then((response) => {
				let newIngredients: IIngredient[] = [];
				let { data: ingredientsData } = response.data;

				if (ingredientsData.length === 0) {
					toast('O cozinheiro não encontrou esse ingrediente.', {
						id: '1'
					});
				}

				newIngredients = [...new Set(ingredientsData)];
				loadingIngredients = ELoadingStatus.finished;

				if (newIngredients.length > 12) {
					newIngredients = newIngredients.slice(0, 12);
				}

				const sessionStorageIngredients =
					sessionStorage.getItem(EDomain.SELECTED_INGREDIENTS) || '[]';
				const selectedIngredientsArray: IIngredient[] = JSON.parse(sessionStorageIngredients);

				if (!sessionStorageIngredients || selectedIngredientsArray?.length === 0) {
					ingredientsList.set(newIngredients);
					loadingIngredients = ELoadingStatus.finished;

					return;
				}

				newIngredients = newIngredients.filter((ingredientItem) => {
					return selectedIngredientsArray.every((selectedItem) => {
						return selectedItem.id !== ingredientItem.id;
					});
				});

				loadingIngredients = ELoadingStatus.finished;
				ingredientsList.set(newIngredients);
			})
			.catch((response: AxiosError) => {
				toast.error('O cozinheiro não encontrou esse ingrediente.', {
					id: '1'
				});
				loadingIngredients = ELoadingStatus.finished;
			});
	};

	const handleIngredientInput = () => {
		let value = inputElem.value.toLowerCase();

		value = value.replace(/[^a-záàâãéèêíóôõúç\s]/g, '');

		if (value.length > 2) {
			getIngredients(value);
		}

		inputElem.value = value;
	};

	const handleClickAddIngredient = (newIngredient: IIngredient) => {
		if (selectedIngredients.some((selectedItem) => selectedItem.id === newIngredient.id)) return;

		ingredientsList.set(
			$ingredientsList.filter((ingredientItem) => ingredientItem.id !== newIngredient.id)
		);

		const selectedIngredientsStorage = hDefaultSessionStorage(EDomain.SELECTED_INGREDIENTS, '', [
			...new Set([...selectedIngredients, newIngredient])
		]);
		sessionStorage.setItem(
			selectedIngredientsStorage.identifier,
			selectedIngredientsStorage.valueString
		);

		selectedIngredients = [...selectedIngredients, newIngredient];
	};

	const handleClickRemoveChip = (removeIngredient: IIngredient) => {
		const updateSelectedIngredients = selectedIngredients.filter(
			(plateItem) => plateItem !== removeIngredient
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

		ingredientsList.update((ingredientItems) => [...ingredientItems, removeIngredient]);
		selectedIngredients = updateSelectedIngredients;
	};

	const handleClickPlates = async () => {
		if (selectedIngredients.length > 0) {
			await handlePlates();
		}
	};
</script>

<svelte:head>
	<meta name="description" content="Seleção de ingredientes para buscar receitas" />
</svelte:head>

<LoadingPlate status={loadingPlates} />

<div class="grid grid-cols-1 auto-rows-min md:grid-cols-2 md:gap-10 max-w-5xl p-5">
	<div>
		<div class="flex flex-col max-w-[400px] mt-4">
			<label for="ingredients-field" class="mb-1 text-orange-400 font-semibold"
				>Busque seus ingredientes aqui:</label
			>

			<div class="relative">
				<input
					id="ingredients-field"
					bind:this={inputElem}
					on:input={handleIngredientInput}
					class="w-full shadow-lg text-base p-2 rounded border border-neutral-200 placeholder:text-sm"
					placeholder="Digite um ingrediente"
				/>

				{#if loadingIngredients === ELoadingStatus.getting}
					<Icon
						icon="ph:circle-notch"
						class="h-full text-neutral-400 hover:text-neutral-600 absolute top-0 right-2 animate-spin"
						width="20"
						height="20"
					/>
				{:else if ingredientValue || $ingredientsList.length > 0}
					<button on:click={cleanField} class="h-full flex items-center absolute top-0 right-2">
						<Icon
							icon="ph:x-circle-bold"
							class="text-neutral-400 cursor-pointer"
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
		{/if}
	</div>

	<div class="flex flex-col mt-4">
		{#if selectedIngredients?.length > 0}
			<div>
				<h3 class="text-orange-400">Selecionados:</h3>

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
			</div>
		{/if}

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
