import type { IBasicPlate } from "./plate.model";

export interface ICategory {
    id: number;
    name: string;
    plates: IBasicPlate[];
}