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

<div class="">
	<div class="flex justify-between">
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
				{ #each ["https://picsum.photos/200/300", "https://picsum.photos/200/300"] as slide }
					<SplideSlide>
						<img src={ slide } alt={ slide } class="w-full h-60 max-h-60 object-contain">
					</SplideSlide>
				{ /each }
			</SplideTrack>

			<ul class="splide__pagination !hidden"></ul>

			<div class="splide__arrows">
				<button class="splide__arrow splide__arrow--prev !hidden">
					<Icon icon="ph:caret-double-right" />
				</button>

				<button class="splide__arrow splide__arrow--next !hidden">
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
				<Chip text="Mexirica" />
				<Chip text="Mexirica" />
				<Chip text="Mexirica" />
				<Chip text="Mexirica" />
			</div>
		</div>
	</div>
</div>
<!-- Alterar Chip para ter tamanhos diferentes (small, default). Definir uma cor de fundo padrão. Opção desabilitado. Opção sem ação e botão de remover -->