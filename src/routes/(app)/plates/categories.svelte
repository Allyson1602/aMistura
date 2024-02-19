<script lang="ts">
	import type { ICategory } from '$models/category.model';

	export let categories: ICategory[];

	let currentCategory = 0;

	const handleClickCategory = (index: number) => {
		currentCategory = index;
	};
</script>

<div class="md:max-w-lg hidden md:flex flex-col mx-auto mb-6">
	<div class="flex justify-center gap-6 px-2 mb-5 border-b border-neutral-300">
		{#each categories as category, index}
			<button on:click={() => handleClickCategory(index)} class="text-sm">{category.name}</button>
		{/each}
	</div>

	<div class="flex gap-4">
		{#each categories[currentCategory].plates as plate}
			<div class="flex flex-col items-center">
				<img
					src={plate.image.link}
					alt="Imagem de opção de prato"
					class="w-24 max-x-w-24 object-contain mb-1 rounded-md shadow-md"
				/>
				<p class="text-xs pl-2">{plate.name}</p>
			</div>
		{/each}
	</div>
</div>
