<script lang="ts">
	import Icon from "@iconify/svelte";

    export let text: string;
    export let color: string;

    const handleRemoveChip = () => {
        //
    };
</script>

<button on:click={handleRemoveChip}>
    <div class={`${color}` + " inline-block relative py-1 px-3 rounded-2xl text-sm"}>
        <span class="absolute right-[-5px] top-[-5px]">
            <Icon icon="ph:x-circle-fill" width="20" height="20" class="text-red-900" />
        </span>
        
        <p>{text}</p>
    </div>
</button>
