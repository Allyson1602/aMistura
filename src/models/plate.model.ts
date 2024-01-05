import type { ERatingValues } from '$lib/enums';
import type { ICategory } from './category.model';
import type { IIngredient } from './ingredient.model';
import type { IInstruction } from './instruction.model';

export interface IPlate {
	id: number;
	name: string;
	image: string;
	ingredients: IIngredient[];
	categories: ICategory[];
	rating: ERatingValues;
	description: string;
	instructions: IInstruction[];
}

export interface IBasicPlate {
	id: number;
	name: string;
	image: string;
}
