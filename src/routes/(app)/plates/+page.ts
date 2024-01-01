import type { IPlate } from '$models/plate.model';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { EDomain } from '$lib/helpers/session-storage';
import { browser } from '$app/environment';

export const ssr = false;

export const load: PageLoad = () => {
	let plates: IPlate[] = [];

	if (browser) {
		const sessionStoragePlates = sessionStorage.getItem(EDomain.LIST_PLATE);
		if (sessionStoragePlates) {
			plates = JSON.parse(sessionStoragePlates);

			if (plates.length < 1) {
				throw redirect(307, '/found');
			}
		}
	}
};
