export const uRemoveItemArray = (array: string[] | number[], itemRemove: string | number) => {
	return array.filter((arrayItem) => arrayItem !== itemRemove);
};
