<script lang="ts">
	import type { IMouseEvent } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { HTMLProps } from 'svelte/svelte-html';

	export let text: string;
	export let handleClick: ((ev: IMouseEvent) => void) | undefined = undefined;
	export let props: HTMLProps<'button', HTMLAttributes<any>> | undefined = undefined;
</script>

<button
	{...props}
	on:click={handleClick}
	class={'w-80 rounded-full md:self-center p-1 text-xl mx-auto font-semibold text-white text-center bg-orange-400'.concat(
		' ',
		props?.class ?? ''
	)}>{text}</button
>
