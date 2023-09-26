<script lang="ts">
	import Chip from "$lib/components/chip.svelte";
	import Menu from "$lib/components/menu.svelte";
	import Icon from "@iconify/svelte";

	let foodValue = "";
	let foundedFoods: string[] = [];
	let selectedFoods: string[] = ["manga", "laranja", "sal", "macarrão", "trigo", "miojo", "água", "tomate", "pêra", "salsisha", "alface", "farinha", "beterraba", "batata", "açafrão"];

	let currentCodeColor = 100;
	let currentNameColor = "orange";

	const getRainbowColor = (): string => {
		let currentColor = `bg-${currentNameColor}-${currentCodeColor}`;

		if (currentCodeColor === 300 && currentNameColor === "orange") {
			currentNameColor = "amber";
		} else if (currentCodeColor === 100 && currentNameColor === "amber") {
			currentNameColor = "yellow";
		} else if (currentCodeColor === 300 && currentNameColor === "yellow") {
			currentNameColor = "lime";
		} else if (currentCodeColor === 100 && currentNameColor === "lime") {
			currentNameColor = "green";
		} else if (currentCodeColor === 300 && currentNameColor === "green") {
			currentNameColor = "esmerald";
		} else if (currentCodeColor === 100 && currentNameColor === "esmerald") {
			currentNameColor = "teal";
		} else if (currentCodeColor === 300 && currentNameColor === "teal") {
			currentNameColor = "cyan";
		} else if (currentCodeColor === 100 && currentNameColor === "cyan") {
			currentNameColor = "sky";
		} else if (currentCodeColor === 300 && currentNameColor === "sky") {
			currentNameColor = "blue";
		} else if (currentCodeColor === 100 && currentNameColor === "blue") {
			currentNameColor = "orange";
		} else {
			if (
				currentNameColor === "amber" ||
				currentNameColor === "lime" ||
				currentNameColor === "esmerald" ||
				currentNameColor === "cyan" ||
				currentNameColor === "blue"
			) {
				currentCodeColor -= 100;
			} else {
				currentCodeColor += 100;
			}
		}

		return currentColor;
	};

	const handleInputFoodValue = (event: Event & {
		currentTarget: EventTarget & HTMLInputElement;
	}) => {
		foundedFoods = ["Abobrinha", "Abobrinha Abobrinha", "Abobrinha", "Abobrinha Abobrinha Abobrinha", "Abobrinha Abobrinha", "Abobrinha"];
	};

	const handleBlurFoodValue = (event: FocusEvent & {
		currentTarget: EventTarget & HTMLInputElement;
	}) => {
		foundedFoods = [];
	};
</script>

<div class="h-screen flex flex-col md:flex-row">
	<Menu />
	
	<div class="flex flex-col justify-between grow">
		<div class="grid grid-cols-1 p-5 grow auto-rows-min md:grid-cols-2 md:gap-10">
			<div>
				<div class="flex flex-col max-w-[400px] mx-auto">
					<label for="food-field" class="text-sm text-neutral-700">O que tem pra comer?</label>
					<input
						id="food-field"
						bind:value={foodValue}
						on:blur={handleBlurFoodValue}
						on:input={handleInputFoodValue}
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
							{#each selectedFoods as food (food)}
								<Chip text={food} color={getRainbowColor()} />
							{/each}
						</div>
					{/if}
				</div>

				<div class="flex justify-center mt-3">
					<a href="/recipes" class="w-80 bg-orange-400 rounded-full md:self-center p-2 text-3xl mx-auto font-semibold text-white/80 text-center">pegar receitas</a>
				</div>
			</div>
		</div>
		
		<div class="h-16 relative bg-blue-400 bg-kitchen-utensils md:hidden">
			<div class="w-full flex justify-center mt-[-16px] absolute left-0 top-0">
				<button>
					<Icon icon="ph:hand-grabbing-fill" width="32" height="32" class="text-orange-400" />
				</button>
			</div>
		</div>
	</div>
</div>
