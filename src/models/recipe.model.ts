import type { ERatingValues } from '$lib/enums';
import type { IFood } from './food.model';

export interface IRecipe {
	rating: ERatingValues;
	description: string;
	ingredients: IFood[];
	instructions: string[];
}
