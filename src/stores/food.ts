import type { IFood } from 'src/models/food.model';
import { writable } from 'svelte/store';

export const foodList = writable<IFood[]>([]);

export const selectedFoods = writable<IFood[]>([]);