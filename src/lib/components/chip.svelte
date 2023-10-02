<script lang="ts">
	import Icon from "@iconify/svelte";

    export let size: "default" | "small" = "default";
    export let text: string;
    export let index: number = 0;
    export let onRemove: (() => void) | undefined = undefined;
    export let isdisabled: boolean = false;

    let isRemoved: boolean = false;

    $: if (onRemove) {
        isRemoved = true;
    }

    $: if (isdisabled) {
        onRemove = undefined;
    }
    
    const rainbow: string[] = [
        'bg-[#FFA500]', // Laranja
        'bg-[#FFB800]',
        'bg-[#FFCB00]',
        'bg-[#FFDE00]',
        'bg-[#FFF100]',
        'bg-[#F0FF00]',
        'bg-[#D7FF00]',
        'bg-[#BEFF00]',
        'bg-[#A5FF00]',
        'bg-[#8CFF00]',
        'bg-[#73FF00]',
        'bg-[#5AFF00]',
        'bg-[#41FF00]',
        'bg-[#28FF00]',
        'bg-[#0FFF00]',
        'bg-[#00FF11]',
        'bg-[#00FF2A]',
        'bg-[#00FF43]',
        'bg-[#00FF5C]',
        'bg-[#00FF75]', // Verde
        'bg-[#00FF8E]',
        'bg-[#00FFA7]',
        'bg-[#00FFC0]',
        'bg-[#00FFD9]',
        'bg-[#00FFF2]',
        'bg-[#00F9FF]',
        'bg-[#00E0FF]',
        'bg-[#00C7FF]',
        'bg-[#00AEFF]',
        'bg-[#0095FF]',
        'bg-[#007CFF]',
        'bg-[#0063FF]', // Azul
    ];

    const handleRemoveChip = (): void => {
        if (isRemoved) {
            onRemove?.();
        }
    };

	const getBgColor = (): string => {
        if (isdisabled) {
            return "bg-neutral-300";
        }

        if (index + 1 > rainbow.length) {
            index = 0;
        }

		return rainbow[index];
	};
</script>

<button
    data-testid="remove-food"
    on:click={handleRemoveChip}
    disabled={isdisabled}
    class={isRemoved ? "cursor-pointer" : "cursor-auto"}
>
    <div class={getBgColor() + " inline-block relative py-1 px-3 rounded-2xl text-sm"}>
        {#if isRemoved}
            <span class="absolute right-[-5px] top-[-5px]">
                <Icon icon="ph:x-circle-fill" width="20" height="20" class="text-red-900" />
            </span>
        {/if}

        <p class={size === "default" ? "text-sm" : "text-xs"}>{text}</p>
    </div>
</button>
