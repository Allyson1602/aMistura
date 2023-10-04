import type { IReturnStatus } from "$lib/types";
import type { IPlate } from "$models/plate.model";
import { ApiBase } from "./api";

interface IPlateService {
    listPlate(): IReturnStatus<IPlate[]>;
}

class PlateService extends ApiBase<IPlate[]> implements IPlateService {
    public listPlate(): IReturnStatus<IPlate[]> {
        // return this.get("/plate");
        return new Promise((resolve) => {
            resolve({
                status: 200,
                data: [
                    {
                        id: 1,
                        name: "Bolo de fubá",
                        image: "https://picsum.photos/600/300",
                        includedFoods: [],
                        requiredFoods: [],
                        categories: []
                    },
                    {
                        id: 2,
                        name: "Torta de limão",
                        image: "https://picsum.photos/200/300",
                        includedFoods: [
                            {
                                id: 1,
                                image: "",
                                name: "Limão"
                            },
                            {
                                id: 2,
                                image: "",
                                name: "Trigo"
                            },
                            {
                                id: 3,
                                image: "",
                                name: "Aveia"
                            },
                        ],
                        requiredFoods: [
                            {
                                id: 1,
                                image: "",
                                name: "Hortelã"
                            },
                            {
                                id: 2,
                                image: "",
                                name: "Tomate"
                            },
                            {
                                id: 3,
                                image: "",
                                name: "Sardinha"
                            },
                        ],
                        categories: [
                            {
                                id: 1,
                                name: "Carnes",
                                plates: [
                                    {
                                        id: 1,
                                        image: "https://picsum.photos/300/300",
                                        name: "Escondidinho de carne"
                                    },
                                    {
                                        id: 2,
                                        image: "https://picsum.photos/400/400",
                                        name: "Estrogonoffe"
                                    },
                                    {
                                        id: 3,
                                        image: "https://picsum.photos/500/500",
                                        name: "Hamburguer"
                                    },
                                ]
                            },
                            {
                                id: 2,
                                name: "Vegetais",
                                plates: [
                                    {
                                        id: 1,
                                        image: "https://picsum.photos/600/600",
                                        name: "Salada de tomate"
                                    },
                                    {
                                        id: 2,
                                        image: "https://picsum.photos/700/700",
                                        name: "Verduras no vapor"
                                    },
                                    {
                                        id: 3,
                                        image: "https://picsum.photos/800/800",
                                        name: "Verduras no churrasco"
                                    },
                                ]
                            }
                        ]
                    }
                ]
            } as unknown as IReturnStatus<IPlate[]>);
        });
    }
}

export default new PlateService();