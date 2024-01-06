import { ERatingValues } from '$lib/enums';
import type { IReturnStatus } from '$lib/types';
import type { IIngredient } from '$models/ingredient.model';
import type { IPlate } from '$models/plate.model';
import { ApiBase } from './api';

interface IPlateService {
	listPlate(selectedIngredients: IIngredient[]): IReturnStatus<IPlate[]>;
	getPlateImage(descriptionImage: string): IReturnStatus<string>;
}

class PlateService extends ApiBase<any> implements IPlateService {
	public listPlate(selectedIngredients: IIngredient[]): IReturnStatus<IPlate[]> {
		return this.post('/openai', { ingredients: selectedIngredients });
	}

	public getPlateImage(descriptionImage: string): IReturnStatus<string> {
		return this.get('/openai/image?description=' + descriptionImage);
	}
}

export default new PlateService();
