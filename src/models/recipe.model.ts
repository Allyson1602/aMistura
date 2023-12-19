import type { RateValues } from '$lib/enums';
import type { IFood } from './food.model';

export interface IRecipe {
	id: number;
	rate: RateValues;
	description: string;
	ingredients: IFood[];
	instructions: string[];
}