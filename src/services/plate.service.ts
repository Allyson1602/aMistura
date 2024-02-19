import type { IReturnStatus } from '$lib/types';
import type { IPlate } from '$models/plate.model';
import { ApiBase } from './api';

interface IPlateService {
	listPlate(selectedIngredientsName: string[]): IReturnStatus<IPlate[]>;
	getPlateImage(descriptionImage: string): IReturnStatus<string>;
}

class PlateService extends ApiBase<any> implements IPlateService {
	public listPlate(selectedIngredientsName: string[]): IReturnStatus<IPlate[]> {
		return this.post('/openai', { ingredients: selectedIngredientsName });
	}

	public getPlateImage(descriptionImage: string): IReturnStatus<string> {
		return this.get('/openai/image?description=' + descriptionImage);
	}
}

export default new PlateService();
