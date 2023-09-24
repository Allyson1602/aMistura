<script lang="ts">
    import Icon from "@iconify/svelte";
	import BrandImage from "$lib/images/brand.png";

    let isExpanded = false;

    const handleClickMenu = () => {
        isExpanded = !isExpanded;
    };
</script>

<div class={`${isExpanded ? "h-screen" : "h-auto"}` + " p-4 bg-kitchen-utensils md:hidden"}>
    <div class="flex justify-between items-center">
        <div class="w-16 ">
            <img src={BrandImage} alt="Brand chef" />
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
            <button on:click={() => {}} class="flex justify-end gap-4 items-center text-neutral-700">
                <p class="font-medium text-xl">home</p>
                <Icon icon="ph:house-bold" width="20" height="20" />
            </button>

            <button on:click={() => {}} class="flex justify-end gap-4 items-center text-neutral-700">
                <p class="font-medium text-xl">histórico</p>
                <Icon icon="ph:clock-counter-clockwise-bold" width="20" height="20" class="text-neutral-700" />
            </button>
        </div>
    {/if}
</div>

<div class="w-24 h-screen hidden md:flex flex-col items-center gap-7 p-4 bg-kitchen-utensils">
    <div class="w-16">
        <img src={BrandImage} alt="Brand chef" />
    </div>

    <div class="flex flex-col gap-7">
        <button on:click={() => {}} class="text-neutral-700">
            <Icon icon="ph:house-bold" width="40" height="40" />
        </button>

        <button on:click={() => {}} class="text-neutral-700">
            <Icon icon="ph:clock-counter-clockwise-bold" width="40" height="40" />
        </button>
    </div>
</div>