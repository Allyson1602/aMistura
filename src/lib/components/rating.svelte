<script lang="ts">
	import Icon from '@iconify/svelte';

	export let rating: 1 | 2 | 3 | 4 | 5;

	const iconProps = {
		width: '20',
		height: '20',
		class: 'text-yellow-500'
	};
</script>

<div class="flex">
	<Icon icon={rating >= 1 ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />

	<Icon icon={rating >= 2 ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />

	<Icon icon={rating >= 3 ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />

	<Icon icon={rating >= 4 ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />

	<Icon icon={rating >= 5 ? 'ph:star-fill' : 'ph:star-light'} {...iconProps} />
</div>
