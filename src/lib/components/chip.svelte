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

    const rainbow: string[] = [
        'bg-orange-100',
        'bg-orange-200',
        'bg-orange-300',
        'bg-amber-100',
        'bg-amber-200',
        'bg-amber-300',
        'bg-yellow-100',
        'bg-yellow-200',
        'bg-yellow-300',
        'bg-lime-100',
        'bg-lime-200',
        'bg-lime-300',
        'bg-green-100',
        'bg-green-200',
        'bg-green-300',
        'bg-esmerald-100',
        'bg-esmerald-200',
        'bg-esmerald-300',
        'bg-teal-100',
        'bg-teal-200',
        'bg-teal-300',
        'bg-cyan-100',
        'bg-cyan-200',
        'bg-cyan-300',
        'bg-sky-100',
        'bg-sky-200',
        'bg-sky-300',
        'bg-blue-100',
        'bg-blue-200',
        'bg-blue-300',
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

<button on:click={handleRemoveChip} disabled={isdisabled}>
    <div class={getBgColor() + " inline-block relative py-1 px-3 rounded-2xl text-sm"}>
        {#if isRemoved}
            <span class="absolute right-[-5px] top-[-5px]">
                <Icon icon="ph:x-circle-fill" width="20" height="20" class="text-red-900" />
            </span>
        {/if}

        <p class={size === "default" ? "text-sm" : "text-xs"}>{text}</p>
    </div>
</button>
