// To use a default config to define a sessionStorage

const hDefaultSessionStorage = <T>(
	domain: EDomain,
	id: string,
	value: string | boolean | object | Array<T> | Date
) => {
	const identifier = domain.concat('_', id);
	const valueString = JSON.stringify(value);

	return {
		identifier,
		valueString
	};
};

const enum EDomain {
	INGREDIENT_RECIPE = 'INGREDIENT_RECIPE',
	INSTRUCTION_RECIPE = 'INSTRUCTION_RECIPE'
}

export { EDomain, hDefaultSessionStorage };
