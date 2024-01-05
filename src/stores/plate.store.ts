import type { IPlate } from '$models/plate.model';
import { writable } from 'svelte/store';

export const plateList = writable<IPlate[]>([]);
