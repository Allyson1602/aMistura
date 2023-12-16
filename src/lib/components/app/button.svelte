<script lang="ts">
	import type { IMouseEvent } from '$lib/types';

	export const classProps: string = '';
	export const handleClick: ((ev: IMouseEvent) => void) | undefined = undefined;
</script>

<button
	on:click={handleClick}
	class={'w-80 rounded-full md:self-center p-1 text-xl mx-auto font-semibold text-white text-center bg-orange-400 '.concat(
		' ',
		classProps
	)}>pegar receitas</button
>
