<script lang="ts">
	import Menu from '$lib/components/menu.svelte';
	import '../styles.css';
	import GrabBottom from '$lib/components/grab-bottom.svelte';

	export let data;
</script>

<div class="app">
	<div class="h-screen flex flex-col justify-between">
		<main class="grow flex flex-col md:flex-row">
			<Menu route={data.route.id} />

			<div class="grow">
				<slot />
			</div>
		</main>

		<!-- only mobile -->
		<GrabBottom />
	</div>
</div>
