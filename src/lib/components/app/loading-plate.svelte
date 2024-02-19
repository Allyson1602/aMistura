<script lang="ts">
	import LoadingPlatesImage from '$lib/images/loading-plate.gif';
	import { ELoadingStatus } from '$lib/types';

	export let status: ELoadingStatus;
</script>

{#if status === ELoadingStatus.getting}
	<div
		class="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-slate-500/60 z-40"
	>
		<img
			src={LoadingPlatesImage}
			alt="Loading Plates"
			class="rounded-full w-36 h-36 shadow-xl bg-orange-300"
		/>
	</div>
{/if}
