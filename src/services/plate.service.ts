import type { IReturnStatus } from '$lib/types';
import type { IPlate } from '$models/plate.model';
import { ApiBase } from './api';

interface IPlateService {
	listPlate(selectedIngredientsName: string[]): IReturnStatus<IPlate[]>;
	generatePlateImage(plateId: number, description: string): IReturnStatus<IPlate>;
}

class PlateService extends ApiBase<any> implements IPlateService {
	public listPlate(selectedIngredientsName: string[]): IReturnStatus<IPlate[]> {
		return this.post('/plates/ai', { ingredients: selectedIngredientsName });
	}

	public generatePlateImage(plateId: number, description: string): IReturnStatus<IPlate> {
		return this.post('/openai/image', { plateId, description });
	}
}

export default new PlateService();
