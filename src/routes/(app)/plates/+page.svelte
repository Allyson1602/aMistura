<script lang="ts">
	import Chip from "$lib/components/chip.svelte";
import Icon from "@iconify/svelte";
	import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
	import "@splidejs/svelte-splide/css";
	import "@splidejs/svelte-splide/css";
</script>

<svelte:head>
	<title>(10) A Mistura</title>
	<meta name="description" content="Listagem de pratos com ingredientes informados" />
</svelte:head>

<div>
	<div class="flex justify-between md:hidden">
		<button class="text-orange-400 font-semibold">anterior</button>
		<button class="text-orange-400 font-semibold">próximo</button>
	</div>

	<div class="mt-4">
		<!-- <div class="flex justify-center gap-1 mb-3">
			<Icon icon="ph:star-fill" class="text-yellow-400" width="23" height="23" />
			<Icon icon="ph:star-fill" class="text-yellow-400" width="23" height="23" />
			<Icon icon="ph:star-fill" class="text-yellow-400" width="23" height="23" />
		</div> -->

		<Splide hasTrack={ false }>
			<SplideTrack style="min-height: 15rem">
				{ #each ["https://picsum.photos/600/300", "https://picsum.photos/200/300"] as slide }
					<SplideSlide>
						<img src={ slide } alt={ slide } class="max-h-60 object-contain mx-auto my-2 rounded-xl shadow-md max-w-full md:max-w-lg">
					</SplideSlide>
				{ /each }
			</SplideTrack>

			<ul class="splide__pagination invisible"></ul>

			<div class="splide__arrows">
				<button class="splide__arrow splide__arrow--prev invisible !bg-transparent text-3xl md:visible md:left-[0.5em]">
					<Icon icon="ph:caret-double-right" />
				</button>

				<button class="splide__arrow splide__arrow--next invisible !bg-transparent text-3xl md:visible md:right-[0.5em]">
					<Icon icon="ph:caret-double-right" />
				</button>
			</div>
		</Splide>

		<div class="flex flex-col gap-4 items-center mt-4">
			<p class="text-xl">Bolo de fubá</p>

			<div class="border-b border-b-orange-200 pb-4">
				<Chip size="small" text="Romã" index={0} />
				<Chip size="small" text="Romã" index={1} />
				<Chip size="small" text="Romã" index={2} />
				<Chip size="small" text="Romã" index={3} />
			</div>
			
			<div>
				<Chip size="small" text="Mexirica" isdisabled={true} />
				<Chip size="small" text="Mexirica" isdisabled={true} />
				<Chip size="small" text="Mexirica" isdisabled={true} />
				<Chip size="small" text="Mexirica" isdisabled={true} />
			</div>
		</div>
	</div>
</div>