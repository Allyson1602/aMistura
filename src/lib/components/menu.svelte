<script lang="ts">
    import Icon from "@iconify/svelte";
	import BrandImage from "$lib/images/brand.png";
	import { onMount } from "svelte";

    export let route: string;

    let isExpanded = false;

    $: active = route.slice(route.lastIndexOf('/'));

    const handleClickMenu = () => {
        isExpanded = !isExpanded;
    };

    const handleClickNav = () => {
        isExpanded = false;
    };
</script>

<div class={`${isExpanded ? "h-screen" : "h-auto"}` + " p-4 bg-kitchen-utensils md:hidden"}>
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
            <a href={active !== "/found" ? "/found" : undefined} on:click={handleClickNav} class={`${active === '/found' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'} flex justify-end gap-4 items-center text-neutral-700`}>
                <p class="font-medium text-xl">home</p>
                <Icon icon="ph:house-bold" width="20" height="20" />
            </a>

            <a href={active !== "/plates" ? "/plates" : undefined} on:click={handleClickNav} class={`${active === '/plates' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'} flex justify-end gap-4 items-center text-neutral-700`}>
                <p class="font-medium text-xl">histórico</p>
                <Icon icon="ph:clock-counter-clockwise-bold" width="20" height="20" />
            </a>
        </div>
    {/if}
</div>

<div class="w-24 h-screen hidden md:flex flex-col items-center gap-7 p-4 bg-kitchen-utensils">
    <div class="w-16">
        <a href="/">
            <img src={BrandImage} alt="Brand chef" />
        </a>
    </div>

    <nav class="flex flex-col gap-7">
        <a href={active !== "/found" ? "/found" : undefined} class={`${active === '/found' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'} ease-linear`}>
            <Icon icon="ph:magnifying-glass-bold" width="35" height="35" />
        </a>

        <a href={active !== "/plates" ? "/plates" : undefined} class={`${active === '/plates' ? 'text-orange-600' : 'text-neutral-600 hover:text-orange-400'} ease-linear`}>
            <Icon icon="ph:bowl-food-bold" width="35" height="35" />
        </a>
    </nav>
</div>