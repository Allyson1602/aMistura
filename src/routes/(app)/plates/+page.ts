import type { IPlate } from "$models/plate.model";
import { plateList } from "$stores/plate.store";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = () => {
    let plates: IPlate[] = [];

    plateList.subscribe(platesItem => {
        plates = platesItem;
    });

    if (plates.length < 1) {
        throw redirect(307, '/found');
    }
};