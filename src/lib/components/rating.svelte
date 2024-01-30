<script lang="ts">
	import { ERatingValues } from '$lib/enums';
	import Icon from '@iconify/svelte';

	export let rating: ERatingValues = ERatingValues.BAD;

	const iconProps = {
		width: '20',
		height: '20',
		class: 'text-yellow-500'
	};
</script>

<div class="flex">
	<Icon icon={rating >= ERatingValues.BAD ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />

	<Icon
		icon={rating >= ERatingValues.BAD_NORMAL ? 'ph:star-fill' : 'ph:star-light'}
		{...iconProps}
	/>

	<Icon icon={rating >= ERatingValues.NORMAL ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />

	<Icon
		icon={rating >= ERatingValues.NORMAL_GREAT ? 'ph:star-fill' : 'ph:star-light'}
		{...iconProps}
	/>

	<Icon icon={rating >= ERatingValues.GREAT ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />
</div>
