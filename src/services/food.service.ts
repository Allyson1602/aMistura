import type { IReturnStatus } from "$lib/types";
import type { IFood } from "src/models/food.model";
import { ApiBase } from "./api";

interface IFoodService {
    listFood(): IReturnStatus<IFood[]>;
}

class FoodService extends ApiBase<IFood[]> implements IFoodService {
    public listFood(): IReturnStatus<IFood[]> {
        // return this.get("/food");
        return new Promise((resolve) => {
            resolve({
                status: 200,
                data: [
                    {
                        id: 1,
                        name: "manga",
                    }, 
                    {
                        id: 2,
                        name: "laranja",
                    }, 
                    {
                        id: 3,
                        name: "sal",
                    }, 
                    {
                        id: 4,
                        name: "macarrão",
                    }, 
                    {
                        id: 5,
                        name: "trigo",
                    }, 
                    {
                        id: 6,
                        name: "miojo",
                    }, 
                    {
                        id: 7,
                        name: "água",
                    }, 
                    {
                        id: 8,
                        name: "tomate",
                    }, 
                    {
                        id: 9,
                        name: "pêra",
                    }, 
                    {
                        id: 10,
                        name: "salsisha",
                    }, 
                    {
                        id: 11,
                        name: "alface",
                    }, 
                    {
                        id: 12,
                        name: "farinha",
                    }, 
                    {
                        id: 13,
                        name: "beterraba",
                    }, 
                    {
                        id: 14,
                        name: "batata",
                    },
                    {
                        id: 15,
                        name: "açafrão",
                    },
                ],
            } as unknown as IReturnStatus<IFood[]>);
        });
    }
}

export default new FoodService();