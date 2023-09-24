<script>
	import BrandImage from "$lib/images/brand.png";
</script>

<svelte:head>
	<meta name="description" content="Informações introdutórias sobre A Mistura" />
</svelte:head>

<div class="w-screen h-screen bg-kitchen-utensils bg-repeat bg-left-top">
	<div class="flex flex-col md:flex-row justify-between h-full p-6 max-w-6xl mx-auto">
		<div>
			<h4 class="text-neutral-700 text-3xl font-bold text-center pt-24 md:text-5xl">
				Pegue o que você tem<br/>
				<span class="text-orange-400">em casa</span><br/>
			</h4>
			<h4 class="text-neutral-700 text-3xl font-bold text-center pt-4 md:pt-8 md:text-5xl">
				e crie deliciosas<br/>
				<span class="text-orange-400">receitas</span>
			</h4>
		</div>

		<div class="flex flex-col items-center justify-between grow md:justify-start md:pt-16">
			<div class="w-32 pb-8 pt-8 md:pt-0">
				<img src={BrandImage} alt="Brand chef" />
			</div>

			<a href="/found" class="w-80 bg-orange-400 rounded-full md:self-center p-2 text-3xl mx-auto font-semibold text-white/80 text-center">começar</a>
		</div>
	</div>
</div>
