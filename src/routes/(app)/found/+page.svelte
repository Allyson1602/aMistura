<script lang="ts">
	import Chip from "$lib/components/chip.svelte";

	let foodValue = "";
	let foundedFoods: string[] = [];
	let selectedFoods: string[] = ["manga", "laranja", "sal", "macarrão", "trigo", "miojo", "água", "tomate", "pêra", "salsisha", "alface", "farinha", "beterraba", "batata", "açafrão"];

	const handleInputFoodValue = (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {
		const value = event.currentTarget.value;
		if (/\d/g.test(value)) {
			event.currentTarget.value = value.replace(/[\d]/g, "");
			return;
		}

		foundedFoods = ["Abobrinha", "Abobrinha Abobrinha", "Abobrinha", "Abobrinha Abobrinha Abobrinha", "Abobrinha Abobrinha", "Abobrinha"];
	};

	const handleBlurFoodValue = (event: FocusEvent & {
		currentTarget: EventTarget & HTMLInputElement;
	}) => {
		foundedFoods = [];
	};
</script>

<svelte:head>
	<meta name="description" content="Seleção de ingredientes para buscar receitas" />
</svelte:head>

<div class="grid grid-cols-1 auto-rows-min md:grid-cols-2 md:gap-10 max-w-5xl">
	<div>
		<div class="flex flex-col max-w-[400px] mx-auto">
			<label for="food-field" class="text-neutral-700 mb-1">O que tem pra comer?</label>
			<input
				id="food-field"
				on:input={handleInputFoodValue}
				bind:value={foodValue}
				on:blur={handleBlurFoodValue}
				class="shadow-lg text-base p-2 rounded border border-neutral-200"
				placeholder="tomate, macarrão, leite..."
			/>
		</div>

		{#if foundedFoods.length > 0}
			<div class="rounded shadow-lg mt-4">
				<ul class="px-8 py-3 flex flex-col gap-2">
					{#each foundedFoods as food}
						<li class="pb-1 border-b border-neutral-200 last:border-b-0">
							<button class="text-sm">{food}</button>
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
				<div class="flex flex-wrap gap-x-2 gap-y-2 mt-4 md:justify-start">
					{#each selectedFoods as food, index (food)}
						<Chip text={food} index={index} />
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex justify-center mt-3">
			<a href="/plates" class="w-80 bg-orange-400 rounded-full md:self-center p-1 text-xl mx-auto font-semibold text-white text-center">pegar receitas</a>
		</div>
	</div>
</div>
