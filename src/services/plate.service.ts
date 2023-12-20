import { ERatingValues } from '$lib/enums';
import type { IReturnStatus } from '$lib/types';
import type { IPlate } from '$models/plate.model';
import { ApiBase } from './api';

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
						name: 'Bolo de fubá',
						image: 'https://picsum.photos/600/300',
						ingredients: [
							{
								id: 1,
								image: '',
								name: 'limão (3)'
							},
							{
								id: 2,
								image: '',
								name: 'açúcar (2)'
							},
							{
								id: 3,
								image: '',
								name: 'milho (2)'
							},
							{
								id: 4,
								image: '',
								name: 'leite (500ml)'
							},
							{
								id: 5,
								image: '',
								name: 'trigo (300g)'
							},
							{
								id: 6,
								image: '',
								name: 'ovo (3)'
							}
						],
						categories: [],
						rating: ERatingValues.BAD_NORMAL,
						description:
							'um delicioso bolo de milho, que está presente em qualquer casa brasileira',
						instructions: [
							'Pré-aqueça o forno a 180°C e unte uma forma com margarina e fubá ou farinha de trigo;',
							'Misture o fubá, a farinha de trigo e o açúcar em uma tigela grande;',
							'Bata os ovos em outra tigela e adicione à mistura seca. Misture bem;',
							'Acrescente o leite e o óleo à mistura e continue mexendo até obter uma massa homogênea. Se desejar, adicione a erva-doce;',
							'Adicione o fermento em pó e mexa delicadamente até incorporar na massa;',
							'Despeje a massa na forma untada e leve ao forno preaquecido por aproximadamente 40-45 minutos, ou até que o bolo esteja dourado e ao inserir um palito no centro, ele saia limpo;',
							'Retire do forno e deixe o bolo esfriar antes de desenformar; e',
							'Depois de esfriar, você pode polvilhar açúcar de confeiteiro por cima para decorar, se desejar;'
						]
					},
					{
						id: 2,
						name: 'Torta de limão',
						image: 'https://picsum.photos/200/300',
						ingredients: [
							{
								id: 1,
								image: '',
								name: 'Limão'
							},
							{
								id: 2,
								image: '',
								name: 'Trigo'
							},
							{
								id: 3,
								image: '',
								name: 'Aveia'
							}
						],
						categories: [
							{
								id: 1,
								name: 'Carnes',
								plates: [
									{
										id: 1,
										image: 'https://picsum.photos/300/300',
										name: 'Escondidinho de carne'
									},
									{
										id: 2,
										image: 'https://picsum.photos/400/400',
										name: 'Estrogonoffe'
									},
									{
										id: 3,
										image: 'https://picsum.photos/500/500',
										name: 'Hamburguer'
									}
								]
							},
							{
								id: 2,
								name: 'Vegetais',
								plates: [
									{
										id: 1,
										image: 'https://picsum.photos/600/600',
										name: 'Salada de tomate'
									},
									{
										id: 2,
										image: 'https://picsum.photos/700/700',
										name: 'Verduras no vapor'
									},
									{
										id: 3,
										image: 'https://picsum.photos/800/800',
										name: 'Verduras no churrasco'
									}
								]
							}
						],
						rating: ERatingValues.NORMAL_GREAT,
						description:
							'um delicioso bolo de milho, que está presente em qualquer casa brasileira',
						instructions: [
							'Pré-aqueça o forno a 180°C e unte uma forma com margarina e fubá ou farinha de trigo;',
							'Misture o fubá, a farinha de trigo e o açúcar em uma tigela grande;',
							'Bata os ovos em outra tigela e adicione à mistura seca. Misture bem;',
							'Acrescente o leite e o óleo à mistura e continue mexendo até obter uma massa homogênea. Se desejar, adicione a erva-doce;',
							'Adicione o fermento em pó e mexa delicadamente até incorporar na massa;',
							'Despeje a massa na forma untada e leve ao forno preaquecido por aproximadamente 40-45 minutos, ou até que o bolo esteja dourado e ao inserir um palito no centro, ele saia limpo;',
							'Retire do forno e deixe o bolo esfriar antes de desenformar; e',
							'Depois de esfriar, você pode polvilhar açúcar de confeiteiro por cima para decorar, se desejar;'
						]
					}
				]
			} as unknown as IReturnStatus<IPlate[]>);
		});
	}
}

export default new PlateService();
