// To use a default config to define a sessionStorage

const hDefaultSessionStorage = <T>(
	domain: EDomain,
	id: string,
	value: string | boolean | object | Array<T> | Date
) => {
	const identifier = id !== '' ? domain.concat('_', id) : domain;
	const valueString = JSON.stringify(value);

	return {
		identifier,
		valueString
	};
};

const enum EDomain {
	SELECTED_INGREDIENTS = 'SELECTED_INGREDIENTS',
	LIST_PLATE = 'LIST_PLATE',
	INGREDIENT_RECIPE = 'INGREDIENT_RECIPE',
	INSTRUCTION_RECIPE = 'INSTRUCTION_RECIPE'
}

export { EDomain, hDefaultSessionStorage };
