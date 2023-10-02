import type { IFood } from "./food.model";

export interface ICategory {
    id: number;
    name: string;
    foods: IFood[];
}