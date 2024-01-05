import { ERatingValues } from '$lib/enums';
import type { IReturnStatus } from '$lib/types';
import type { IIngredient } from '$models/ingredient.model';
import type { IPlate } from '$models/plate.model';
import { ApiBase } from './api';

interface IPlateService {
	listPlate(selectedIngredients: IIngredient[]): IReturnStatus<IPlate[]>;
}

class PlateService extends ApiBase<IPlate[]> implements IPlateService {
	public listPlate(selectedIngredients: IIngredient[]): IReturnStatus<IPlate[]> {
		return this.post('/openai', { ingredients: selectedIngredients });
	}
}

export default new PlateService();
