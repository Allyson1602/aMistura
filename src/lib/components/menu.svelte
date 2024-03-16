<script lang="ts">
	import Icon from '@iconify/svelte';
	import BrandImage from '$lib/images/brand.png';
	import PixQRCodeImage from '$lib/images/pix.jpeg';
	import { EDomain } from '$lib/helpers/session-storage';
	import { browser } from '$app/environment';
	import { plateList } from '$stores/plate.store';
	import SimpleDialog from './app/simple-dialog.svelte';

	export let route: string;

	let isExpanded = false;
	let openPatch: boolean = false;
	let openPix: boolean = false;

	$: active = route.slice(route.lastIndexOf('/'));

	$: if (browser) {
		const sessionStoragePlates = sessionStorage.getItem(EDomain.LIST_PLATE);
		if (sessionStoragePlates) {
			plateList.set(JSON.parse(sessionStoragePlates));
		}
	}

	const getPlateLink = (linkName: string): Map<string, string | undefined> => {
		const plateLink = new Map<'name' | 'classes', string | undefined>();

		plateLink.set('name', undefined);

		if (linkName === '/plates') {
			plateLink.set('classes', 'text-orange-600');

			return plateLink;
		} else if ($plateList.length < 1) {
			plateLink.set('classes', 'text-neutral-600/30');

			return plateLink;
		}

		plateLink.set('name', '/plates');
		plateLink.set('classes', 'text-neutral-600 hover:text-orange-400');
		return plateLink;
	};

	const setOpenPix = (status: boolean) => {
		openPix = status;
	};

	const setOpenPatch = (status: boolean) => {
		openPatch = status;
	};

	const handleClickMenu = () => {
		isExpanded = !isExpanded;
	};

	const handleClickNav = () => {
		if ($plateList.length > 0) {
			isExpanded = false;
		}
	};
</script>

<div
	class={`${isExpanded ? 'md:h-full' : 'md:h-auto'}` + ' p-4 bg-kitchen-utensils md:hidden z-40'}
>
	<div class="flex justify-between items-center">
		<div class="w-16">
			<a href="/">
				<img src={BrandImage} alt="Brand chef" />
			</a>
		</div>

		<button on:click={handleClickMenu}>
			{#if isExpanded}
				<Icon icon="ph:x-bold" width="32" height="32" class="text-neutral-700" />
			{:else}
				<Icon icon="ph:hamburger-bold" width="32" height="32" class="text-neutral-700" />
			{/if}
		</button>
	</div>

	{#if isExpanded}
		<div class="flex justify-between items-end">
			<div class="flex">
				<div class="flex flex-col justify-center">
					<button
						on:click={() => {
							openPatch = true;
						}}
						class="self-center hover:bg-orange-400/30 rounded-full ease-out duration-300 p-1 border border-orange-400 border-solid"
					>
						<p class="w-[35px] h-[35px] rounded-full bg-orange-400 p-1 leading-relaxed">
							✨
						</p></button
					>

					<p class="text-black/70 text-sm">alpha 0.0.2</p>
				</div>
				<button
					on:click={() => {
						openPix = true;
					}}
					class="self-baseline hover:bg-orange-400/30 rounded-full ease-out duration-300 p-1 border border-orange-400 border-solid"
				>
					<Icon
						icon="ph:hand-heart-duotone"
						width="35"
						height="35"
						class="rounded-full bg-orange-400 text-white/60 p-1"
					/>
				</button>
			</div>

			<div class="flex flex-col gap-4 px-10">
				<a
					href="/found"
					on:click={handleClickNav}
					class={`${
						active === '/found' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'
					} flex justify-end gap-4 items-center text-neutral-700`}
				>
					<p class="font-medium text-xl">buscar</p>
					<Icon icon="ph:magnifying-glass-bold" width="20" height="20" />
				</a>

				<a
					on:click={handleClickNav}
					href={getPlateLink(active).get('name')}
					class={`${getPlateLink(active).get('classes')} flex justify-end gap-4 items-center`}
				>
					<p class="font-medium text-xl">receita</p>
					<Icon icon="ph:hamburger-bold" width="20" height="20" />
				</a>
			</div>
		</div>
	{/if}
</div>

<div
	class="w-24 h-full hidden md:flex flex-col items-center justify-between p-4 bg-kitchen-utensils"
>
	<div class="flex gap-7 flex-col items-center">
		<div class="w-16">
			<a href="/">
				<img src={BrandImage} alt="Brand chef" />
			</a>
		</div>

		<nav class="flex flex-col gap-7">
			<a
				href={'/found'}
				class={`${
					active === '/found' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'
				} ease-linear`}
			>
				<Icon icon="ph:magnifying-glass-bold" width="35" height="35" />
			</a>

			<a
				href={getPlateLink(active).get('name')}
				class={`${getPlateLink(active).get('classes')} ease-linear relative`}
			>
				{#if $plateList.length > 0}
					<div
						class="w-5 h-5 rounded-full bg-orange-400 text-center text-white leading-relaxed absolute -right-2 -top-2 text-xs"
					>
						{$plateList.length}
					</div>
				{/if}
				<Icon icon="ph:bowl-food-bold" width="35" height="35" />
			</a>
		</nav>
	</div>

	<div class="flex flex-col items-center gap-5">
		<button
			on:click={() => {
				openPix = true;
			}}
			class="hover:bg-orange-400/30 rounded-full ease-out duration-300 p-1 border border-orange-400 border-solid"
		>
			<Icon
				icon="ph:hand-heart-duotone"
				width="35"
				height="35"
				class="rounded-full bg-orange-400 text-white/60 p-1"
			/>
		</button>

		<div class="flex flex-col justify-center">
			<button
				on:click={() => {
					openPatch = true;
				}}
				class="self-center hover:bg-orange-400/30 rounded-full ease-out duration-300 p-1 border border-orange-400 border-solid"
			>
				<p class="w-[35px] h-[35px] rounded-full bg-orange-400 p-1 leading-relaxed">✨</p></button
			>

			<p class="text-black/70 text-sm text-center">alpha 0.0.2</p>
		</div>
	</div>
</div>

{#if openPix}
	<SimpleDialog setOpenPatch={setOpenPix}>
		<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div class="sm:flex sm:items-start">
				<div class="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
					<h3 class="text-xl font-semibold leading-6 text-gray-900 text-center" id="modal-title">
						✨ Chaves Pix ✨
					</h3>

					<div class="mt-4">
						<div class="w-80 text-center text-sm mx-auto pt-1 pb-4 text-neutral-600">
							<p>Sua doação me incentiva a continuar melhorando e mantendo o projeto.</p>
							<p>
								Para manter A Mistura, preciso investir na hospedagem do site, hospedagem do
								servidor, o uso da OpenAI e do GeminiAi.
							</p>
							<p>Muito obrigado pelo seu apoio ;)</p>
						</div>

						<div class="flex justify-center flex-col items-center">
							<p class="">Envie para:</p>
							<p class="text-neutral-500 font-medium text-center">52436034 Allyson</p>
						</div>

						<div class="py-5">
							<h4 class="text-xl font-semibold text-center pb-2">QR code</h4>
							<img src={PixQRCodeImage} alt="pix qr code" class="w-1/2 mx-auto" />
						</div>

						<div>
							<h4 class="text-xl font-semibold text-center">CNPJ</h4>
							<p class="text-center">52.436.034/0001-27</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</SimpleDialog>
{/if}

{#if openPatch}
	<SimpleDialog {setOpenPatch}>
		<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div class="sm:flex sm:items-start">
				<div class="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
					<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
						✨ Patches de atualização ✨
					</h3>

					<div class="mt-4">
						<p class="text-xs text-gray-400">21/02/2024 - v0.0.2</p>
						<ol class="list-decimal list-inside">
							<li class="text-sm text-gray-500">Correção de erro ao gerar receitas.</li>
							<li class="text-sm text-gray-500 py-1">Mensagem para erros ao buscar receitas.</li>
							<li class="text-sm text-gray-500">
								Ajuste com a altura máxima da tela em smartphones.
							</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	</SimpleDialog>
{/if}
