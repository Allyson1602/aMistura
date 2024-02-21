import type { IReturnStatus } from '$lib/types';
import type { IIngredient } from '$models/ingredient.model';
import { ApiBase } from './api';

interface IIngredientService {
	listIngredient(value: string): IReturnStatus<IIngredient[]>;
}

class IngredientService extends ApiBase<IIngredient[]> implements IIngredientService {
	public listIngredient(value: string): IReturnStatus<IIngredient[]> {
		return this.get('/ingredients/' + value);
	}
}

export default new IngredientService();
