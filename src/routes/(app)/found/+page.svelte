<script lang="ts">
	import Chip from "$lib/components/chip.svelte";
	import Icon from "@iconify/svelte";

	let foodValue = "";
	let foundFoods: string[] = [];
	let selectedFoods: string[] = [];

	const cleanField = (): void => {
		foodValue = "";
		foundFoods = [];
	};

	const getFoods = () => {
		let foodsMock = [...new Set(["manga", "laranja", "sal", "macarrão", "trigo", "miojo", "água", "tomate", "pêra", "salsisha", "alface", "farinha", "beterraba", "batata", "açafrão"])];
		
		if (foodsMock.length > 12) {
			foundFoods = foodsMock.slice(0, 12);
			return;
		}

		foundFoods = foodsMock;
	};

	const handleInputFoodValue = (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {
		const value = event.currentTarget.value;

		if (/[^A-Za-z]/g.test(value)) {
			event.currentTarget.value = value.replace(/[^A-Za-z]/g, "");
			return;
		}
		
		if (value.length > 2) {
			getFoods();
		}
	};

	const handleClickAddFood = (selectedFood: string) => {
		if (selectedFoods.some(selectedItem => selectedItem === selectedFood)) return;

		selectedFoods = [...selectedFoods, selectedFood];
		foundFoods = foundFoods.filter(foodItem => foodItem !== selectedFood);
	};

	const handleClickRemoveChip = (foodName: string) => {
		foundFoods = [...foundFoods, foodName];
		selectedFoods = selectedFoods.filter(selectedItem => selectedItem !== foodName);
	};
</script>

<svelte:head>
	<meta name="description" content="Seleção de ingredientes para buscar receitas" />
</svelte:head>

<div class="grid grid-cols-1 auto-rows-min md:grid-cols-2 md:gap-10 max-w-5xl">
	<div>
		<div class="flex flex-col max-w-[400px] mx-auto">
			<label for="food-field" class="text-neutral-700 mb-1">O que tem pra comer?</label>

			<div class="relative">
				<input
					id="food-field"
					on:input={handleInputFoodValue}
					bind:value={foodValue}
					class="w-full shadow-lg text-base p-2 rounded border border-neutral-200"
					placeholder="tomate, macarrão, leite..."
				/>

				{#if foodValue}
					<button on:click={cleanField} class="h-full flex items-center absolute top-0 right-2">
						<Icon icon="ph:x-circle-bold" class="text-neutral-400 hover:text-neutral-600 cursor-pointer" width="20" height="20" />
					</button>
				{/if}
			</div>
		</div>

		{#if foundFoods.length > 0}
			<div class="rounded shadow-lg mt-4">
				<ul class="grid grid-cols-2 gap-2 px-8 py-3">
					{#each foundFoods as food}
						<li data-testid="found-food-item" class="pb-1 border-b border-neutral-200">
							<button data-testid="add-food" class="text-sm pl-1 border-l-2 border-l-transparent hover:border-orange-400" on:click={() => handleClickAddFood(food)}>{food}</button>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<div class="flex flex-col mt-4">
		<div>
			<h3 class="text-xl text-orange-400 font-bold">Selecionados:</h3>

			{#if selectedFoods.length > 0}
				<div data-testid="selected-foods" class="flex flex-wrap gap-x-2 gap-y-2 mt-4 md:justify-start">
					{#each selectedFoods as food, index (food)}
						<Chip text={food} index={index} onRemove={() => handleClickRemoveChip(food)} />
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex justify-center mt-3">
			<a
				href={selectedFoods.length > 0 ? "/plates" : undefined}
				class={`w-80 rounded-full md:self-center p-1 text-xl mx-auto font-semibold text-white text-center bg-orange-400 ${selectedFoods.length === 0 && "!bg-neutral-300"}`}
			>pegar receitas</a>
		</div>
	</div>
</div>
