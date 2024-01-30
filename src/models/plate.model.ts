import type { ERatingValues } from '$lib/enums';
import type { ICategory } from './category.model';
import type { IIngredientPlate } from './ingredient-plate.model';
import type { IInstruction } from './instruction.model';
import type { IPlateImage } from './plate-image.model';

export interface IPlate {
	id: number;
	name: string;
	image: IPlateImage;
	ingredientPlates: IIngredientPlate[];
	categories: ICategory[];
	rating: ERatingValues;
	description: string;
	instructions: IInstruction[];
}

export interface IBasicPlate {
	id: number;
	name: string;
	image: IPlateImage;
}
