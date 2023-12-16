<script lang="ts">
	import Button from '$lib/components/app/button.svelte';
	import type { IRecipe } from '$models/recipe.model';

	export let title: string;
	export let recipe: IRecipe;
</script>

<div class="relative">
	<a href="" class="md:hidden">voltar</a>

	<div class="">
		<div>
			<p>Receita</p>
			<p>rate</p>
		</div>

		<div>
			<p>nome:</p>
			<p>{title}</p>
		</div>

		<div>
			<p>descrição:</p>
			<p>{recipe.description}</p>
		</div>

		<div>
			<p>ingredientes:</p>
			<p>{recipe.ingredients}</p>
		</div>

		<div>
			<p>instruções:</p>
			<p>{recipe.instructions}</p>
		</div>
	</div>

	<Button text="subir" />
</div>
