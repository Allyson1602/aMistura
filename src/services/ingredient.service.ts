import type { IReturnStatus } from '$lib/types';
import type { IIngredient } from '$models/ingredient.model';
import { ApiBase } from './api';

interface IIngredientService {
	listIngredient(): IReturnStatus<IIngredient[]>;
}

class IngredientService extends ApiBase<IIngredient[]> implements IIngredientService {
	public listIngredient(): IReturnStatus<IIngredient[]> {
		// return this.get("/ingredient");
		return new Promise((resolve) => {
			resolve({
				status: 200,
				data: [
					{
						id: 1,
						name: 'manga'
					},
					{
						id: 2,
						name: 'laranja'
					},
					{
						id: 3,
						name: 'sal'
					},
					{
						id: 4,
						name: 'macarrão'
					},
					{
						id: 5,
						name: 'trigo'
					},
					{
						id: 6,
						name: 'miojo'
					},
					{
						id: 7,
						name: 'água'
					},
					{
						id: 8,
						name: 'tomate'
					},
					{
						id: 9,
						name: 'pêra'
					},
					{
						id: 10,
						name: 'salsisha'
					},
					{
						id: 11,
						name: 'alface'
					},
					{
						id: 12,
						name: 'farinha'
					},
					{
						id: 13,
						name: 'beterraba'
					},
					{
						id: 14,
						name: 'batata'
					},
					{
						id: 15,
						name: 'açafrão'
					}
				]
			} as unknown as IReturnStatus<IIngredient[]>);
		});
	}
}

export default new IngredientService();
