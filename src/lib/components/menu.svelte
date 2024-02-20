<script lang="ts">
	import Icon from '@iconify/svelte';
	import BrandImage from '$lib/images/brand.png';
	import { EDomain } from '$lib/helpers/session-storage';
	import { browser } from '$app/environment';
	import { plateList } from '$stores/plate.store';

	export let route: string;

	let isExpanded = false;

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

	const handleClickMenu = () => {
		isExpanded = !isExpanded;
	};

	const handleClickNav = () => {
		isExpanded = false;
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
		<div class="flex flex-col gap-7 px-10">
			<a
				href={active !== '/found' ? '/found' : undefined}
				on:click={handleClickNav}
				class={`${
					active === '/found' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'
				} flex justify-end gap-4 items-center text-neutral-700`}
			>
				<p class="font-medium text-xl">buscar</p>
				<Icon icon="ph:magnifying-glass-bold" width="20" height="20" />
			</a>

			<a
				href={active !== '/plates' ? '/plates' : undefined}
				on:click={handleClickNav}
				class={`${
					active === '/plates' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'
				} flex justify-end gap-4 items-center text-neutral-700`}
			>
				<p class="font-medium text-xl">receita</p>
				<Icon icon="ph:hamburger-bold" width="20" height="20" />
			</a>
		</div>
	{/if}
</div>

<div class="w-24 h-full hidden md:flex flex-col items-center gap-7 p-4 bg-kitchen-utensils">
	<div class="w-16">
		<a href="/">
			<img src={BrandImage} alt="Brand chef" />
		</a>
	</div>

	<nav class="flex flex-col gap-7">
		<a
			href={active !== '/found' ? '/found' : undefined}
			class={`${
				active === '/found' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'
			} ease-linear`}
		>
			<Icon icon="ph:magnifying-glass-bold" width="35" height="35" />
		</a>

		<a
			href={getPlateLink(active).get('name')}
			class={`${getPlateLink(active).get('classes')} ease-linear`}
		>
			<Icon icon="ph:bowl-food-bold" width="35" height="35" />
		</a>
	</nav>
</div>
