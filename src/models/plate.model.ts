import type { ICategory } from "./category.model";
import type { IFood } from "./food.model";
import type { IRecipe } from "./recipe.model";

export interface IPlate {
    id: number;
    name: string;
    image: string;
    includedFoods: IFood[];
    requiredFoods: IFood[];
    categories: ICategory[];
    recipe: IRecipe;
}

export interface IBasicPlate {
    id: number;
    name: string;
    image: string;
}