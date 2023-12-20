import type { IIngredient } from '$models/ingredient.model';
import { writable } from 'svelte/store';

export const ingredientsList = writable<IIngredient[]>([]);

export const selectedIngredients = writable<IIngredient[]>([]);
