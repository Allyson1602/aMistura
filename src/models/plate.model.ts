import type { ERatingValues } from '$lib/enums';
import type { ICategory } from './category.model';
import type { IIngredient } from './ingredient.model';

export interface IPlate {
	id: number;
	name: string;
	image: string;
	ingredients: IIngredient[];
	categories: ICategory[];
	rating: ERatingValues;
	description: string;
	instructions: string[];
}

export interface IBasicPlate {
	id: number;
	name: string;
	image: string;
}
