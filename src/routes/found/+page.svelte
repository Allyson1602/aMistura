<script lg="ts">
	import Menu from "$lib/components/menu.svelte";
	import Icon from "@iconify/svelte";

	let foodValue = "Abobrinha madura";
</script>

<div class="h-screen flex flex-col">
	<Menu />
	
	<div class="flex flex-col justify-between grow">
		<div class="grid grid-cols-1 md:grid-cols-2 p-5">
			<div>
				<div class="flex flex-col">
					<label for="food-field" class="text-sm text-neutral-700">O que tem pra comer?</label>
					<input id="food-field" bind:value={foodValue} class="shadow-lg text-base p-2 rounded border border-neutral-200" />
				</div>

				<div class="rounded shadow-lg mt-4">
					<ul class="px-8 py-3 flex flex-col gap-2">
						<li class="pb-1 border-b border-neutral-200">
							<button class="text-sm">Abobrinha</button>
						</li>
						<li class="pb-1 border-b border-neutral-200">
							<button class="text-sm">Abobrinha Abobrinha</button>
						</li>
						<li class="pb-1 border-b border-neutral-200">
							<button class="text-sm">Abobrinha</button>
						</li>
						<li class="pb-1 border-b border-neutral-200">
							<button class="text-sm">Abobrinha Abobrinha Abobrinha</button>
						</li>
						<li class="pb-1 border-b border-neutral-200">
							<button class="text-sm">Abobrinha Abobrinha</button>
						</li>
						<li class="pb-1">
							<button class="text-sm">Abobrinha</button>
						</li>
					</ul>
				</div>
			</div>
		
			<div class="mt-4">
				<h3 class="text-xl text-orange-400 font-bold">Selecionados:</h3>

				<div>

				</div>
			</div>
		</div>
		
		<div class="h-16 relative bg-blue-400 bg-kitchen-utensils">
			<div class="w-full flex justify-center mt-[-16px] absolute left-0 top-0">
				<button>
					<Icon icon="ph:hand-grabbing-fill" width="32" height="32" class="text-orange-400" />
				</button>
			</div>
		</div>
	</div>
</div>
