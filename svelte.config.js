import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			"$services": "src/services/*",
			"$models": "src/models/*",
			"$configs": "src/configs/*",
			"$stores": "src/stores/*",
			"$tailwind": "tailwind.config.js",
		},
	}
};

export default config;
