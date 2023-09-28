import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import {act, render, screen} from "@testing-library/svelte";
import FoundPage from "./+page.svelte";
import userEvent from "@testing-library/user-event";

describe('Page found test', () => {
	it('Check if input has not number', async () => {
		render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("O que tem pra comer?");

		await act(() => userEvent.type(input, "Abobrinha123"));

		expect(input.value).toBe('Abobrinha');
	});
	
	it('Check if input has special character', async () => {
		render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("O que tem pra comer?");

		await act(() => userEvent.type(input, "@Abobr_inha!"));

		expect(input.value).toBe('Abobrinha');
	});
	
	it('Check if has at least three letters to get foods', async () => {
		const { container } = render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("O que tem pra comer?");

		await act(() => userEvent.type(input, "Ab"));
		
		const foundFoodLi = container.querySelector("[data-testid='found-food-item']");

		expect(foundFoodLi).toBeFalsy();
	});
	
	it('Check if has minimum one and maximum twelve found foods', async () => {
		const { container } = render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("O que tem pra comer?");

		await act(() => userEvent.type(input, "Abobrinha"));

		const foundFoodsLi = container.querySelectorAll("[data-testid='found-food-item']");

		expect(foundFoodsLi.length).toBeGreaterThan(0);
		expect(foundFoodsLi.length).toBeLessThanOrEqual(12);
	});
	
	it('Check if each food is different of the all', async () => {
		const { container } = render(FoundPage);
		const input = screen.getByLabelText("O que tem pra comer?");

		await act(() => userEvent.type(input, "Abobrinha"));

		const foundFoodsLi = container.querySelectorAll("[data-testid='found-food-item']");
		const foundFoodTexts: string[] = [];

		for (const foodText of foundFoodsLi.values()) {
			if (foodText.textContent) foundFoodTexts.push(foodText.textContent);
		}

		// use (new Set) to remove duplicates
		expect(foundFoodsLi).toHaveLength([...new Set(foundFoodTexts)].length);
	});
	
	it('Check if to select a found food it goes to selecteds list', () => {
		// expect(true).toBe(true);
	});
	
	// it('Check if it is possible to remove a selected food', () => {
	// 	expect(true).toBe(true);
	// });
	
	// it('Check if click at clean input, it's cleaned and the found list', () => {
	// 	expect(true).toBe(true);
	// });
	
	// it('Check if it's possible add two equals foods', () => {
	// 	expect(true).toBe(true);
	// });
});
