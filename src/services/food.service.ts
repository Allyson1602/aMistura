import type { IFood } from "src/models/food.model";
import { ApiBase, type IReturnStatus } from "./api";

interface IFoodService {
    getFood(): IReturnStatus<IFood>;
}

class FoodService extends ApiBase<IFood> implements IFoodService {
    public getFood(): IReturnStatus<IFood> {
        return this.get("/food");
    }
}

export default new FoodService();