import type { ICategory } from "./category.model";
import type { IFood } from "./food.model";

export interface IPlate {
    id: number;
    name: string;
    image: string;
    includedFoods: IFood[];
    requiredFoods: IFood[];
    categories: ICategory[];
}

export interface IBasicPlate {
    id: number;
    name: string;
    image: string;
}