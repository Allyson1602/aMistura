import type { IReturnStatus } from '$lib/types';
import type { IPlate } from '$models/plate.model';
import axios from 'axios';
import { ApiBase } from './api';

interface IPlateService {
	listPlate(selectedIngredientsName: string[]): IReturnStatus<IPlate[]>;
	generatePlateImage(plateId: number, description: string): IReturnStatus<IPlate>;
}

class PlateService extends ApiBase<any> implements IPlateService {
	public listPlate(selectedIngredientsName: string[]): IReturnStatus<IPlate[]> {
		return this.post('/plates/ai', { ingredients: selectedIngredientsName });
	}

	public async generatePlateImage(
		plateId: number,
		imageDescription: string
	): IReturnStatus<IPlate> {
		// return this.post('/plates/image', { plateId, imageDescription });

		const options = {
			method: 'POST',
			url: 'https://api.edenai.run/v2/image/generation',
			headers: {
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTcwZDY2MTctYTFkMy00NGNmLWJlOTktYThjYzJjODU3ODc0IiwidHlwZSI6ImFwaV90b2tlbiJ9.STgJndRRkiJolQ_1GWTMH770J-RIueP_haDcP9rqnMw'
			},
			data: {
				providers: 'openai',
				text: 'a red flying balloon.',
				resolution: '1024x1024',
				fallback_providers: ''
			}
		};

		let response: any = null;
		try {
			response = await axios.request(options);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		return response.data.data;
	}
}

export default new PlateService();
