<script>
	import Menu from '$lib/components/menu.svelte';
	import Icon from '@iconify/svelte';
	import '../styles.css';

	export let data;
</script>

<div class="app">
	<div class="h-screen flex flex-col justify-between">
		<main class="grow flex flex-col md:flex-row">
			<Menu route={data.route.id} />
	
			<div class="p-5 grow">
				<slot />
			</div>
		</main>
		
		<div class="h-16 relative bg-blue-400 bg-kitchen-utensils md:hidden">
			<div class="w-full flex justify-center mt-[-16px] absolute left-0 top-0">
				<button>
					<Icon icon="ph:hand-grabbing-bold" width="32" height="32" class="text-orange-400" />
				</button>
			</div>
		</div>
	</div>
</div>
