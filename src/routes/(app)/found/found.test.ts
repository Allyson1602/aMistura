import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import {act, render, screen} from "@testing-library/svelte";
import FoundPage from "./+page.svelte";
import userEvent from "@testing-library/user-event";

describe('Page found test', () => {
	it('Check if click at clean input, it is cleaned and the found list', async () => {
		const { container } = render(FoundPage);

		const input: HTMLInputElement = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "Abobrinha"));
		
		const addFoodText = container.querySelectorAll("[data-testid='add-food']")!.item(0)?.textContent;

		await act(() => userEvent.click(container.querySelectorAll("[data-testid='add-food']")!.item(0)));
		await act(() => userEvent.click(container.querySelectorAll("[data-testid='add-food']")!.item(0)));

		expect(container.querySelectorAll("[data-testid='selected-foods'] button").item(0).textContent?.trim()).toBe(addFoodText);

		const cleanInputButton = container.querySelector("[data-testid='selected-foods'] button");

		expect(cleanInputButton).not.toBeNull();

		await act(() => userEvent.click(cleanInputButton!));

		const selectedFoodDiv = container.querySelector("[data-testid='selected-foods']");

		expect(selectedFoodDiv).not.toContain(cleanInputButton!);
	});
	
	it('Check if it is possible to remove a selected food', async () => {
		const { container } = render(FoundPage);

		const input: HTMLInputElement = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "Abobrinha"));

		expect(container.querySelectorAll("[data-testid='add-food']")).not.toBeNull();
		const addFoodText = container.querySelectorAll("[data-testid='add-food']")!.item(0)?.textContent;

		await act(() => userEvent.click(container.querySelectorAll("[data-testid='add-food']")!.item(0)));
		await act(() => userEvent.click(container.querySelectorAll("[data-testid='add-food']")!.item(0)));

		expect(container.querySelectorAll("[data-testid='selected-foods'] button").item(0).textContent?.trim()).toBe(addFoodText);

		const removeFoodButton: HTMLButtonElement | null = container.querySelector("[data-testid='remove-food']");
		
		expect(removeFoodButton).not.toBeNull();

		await act(() => userEvent.click(removeFoodButton!));

		const addFoodButtons = container.querySelectorAll("[data-testid='add-food']");
		expect(removeFoodButton!.textContent?.trim()).toBe(addFoodButtons!.item(addFoodButtons.length-1)?.textContent);

		expect(container.querySelectorAll("[data-testid='selected-foods'] button").item(0).textContent?.trim()).not.toContain(removeFoodButton?.textContent);
	});
	
	it('Check if to select a found food it goes to selecteds list', async () => {
		const { container } = render(FoundPage);

		const input: HTMLInputElement = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "Abobrinha"));

		const addFoodButton = container.querySelector("[data-testid='add-food']");
		const addFoodText = addFoodButton?.textContent;

		expect(addFoodButton).not.toBeNull();
		expect(addFoodText).not.toBeNull();

		await act(() => userEvent.click(addFoodButton!));

		const selectedFoodsDiv = container.querySelectorAll('[data-testid="selected-foods"]');
		const selectedFoodTexts: string[] = [];
		
		for (const selectedFood of selectedFoodsDiv.values()) {
			if (selectedFood.textContent) selectedFoodTexts.push(selectedFood.textContent.trim());
		}

		expect(selectedFoodTexts).toContain(addFoodText);
	});
	
	it('Check if each food is different of the all', async () => {
		const { container } = render(FoundPage);
		const input = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "Abobrinha"));

		const foundFoodsLi = container.querySelectorAll("[data-testid='found-food-item']");
		const foundFoodTexts: string[] = [];

		for (const foodText of foundFoodsLi.values()) {
			if (foodText.textContent) foundFoodTexts.push(foodText.textContent);
		}

		// use (new Set) to remove duplicates
		expect(foundFoodsLi).toHaveLength([...new Set(foundFoodTexts)].length);
	});
	
	it('Check if has minimum one and maximum twelve found foods', async () => {
		const { container } = render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "Abobrinha"));

		const foundFoodsLi = container.querySelectorAll("[data-testid='found-food-item']");

		expect(foundFoodsLi.length).toBeGreaterThan(0);
		expect(foundFoodsLi.length).toBeLessThanOrEqual(12);
	});
	
	it('Check if has at least three letters to get foods', async () => {
		const { container } = render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "Ab"));
		
		const foundFoodLi = container.querySelector("[data-testid='found-food-item']");

		expect(foundFoodLi).toBeFalsy();
	});
	
	it('Check if input has special character', async () => {
		render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "@Abobr_inha!"));

		expect(input.value).toBe('Abobrinha');
	});

	it('Check if input has not number', async () => {
		render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText("Busque seus alimentos aqui:");

		await act(() => userEvent.type(input, "Abobrinha123"));

		expect(input.value).toBe('Abobrinha');
	});
});
