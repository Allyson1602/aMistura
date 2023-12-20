import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/svelte';
import FoundPage from './+page.svelte';
import userEvent from '@testing-library/user-event';

describe('Page found test', () => {
	it('Check if click at clean input, it is cleaned and the found list', async () => {
		const { container } = render(FoundPage);

		const input: HTMLInputElement = screen.getByLabelText('Busque seus alimentos aqui:');

		await act(() => userEvent.type(input, 'Abobrinha'));

		const addIngredientText = container
			.querySelectorAll("[data-testid='add-ingredient']")!
			.item(0)?.textContent;

		await act(() =>
			userEvent.click(container.querySelectorAll("[data-testid='add-ingredient']")!.item(0))
		);
		await act(() =>
			userEvent.click(container.querySelectorAll("[data-testid='add-ingredient']")!.item(0))
		);

		expect(
			container
				.querySelectorAll("[data-testid='selected-ingredients'] button")
				.item(0)
				.textContent?.trim()
		).toBe(addIngredientText);

		const cleanInputButton = container.querySelector("[data-testid='selected-ingredients'] button");

		expect(cleanInputButton).not.toBeNull();

		await act(() => userEvent.click(cleanInputButton!));

		const selectedIngredientDiv = container.querySelector("[data-testid='selected-ingredients']");

		expect(selectedIngredientDiv).not.toContain(cleanInputButton!);
	});

	it('Check if it is possible to remove a selected ingredient', async () => {
		render(FoundPage);

		const input: HTMLInputElement = screen.getByLabelText('Busque seus alimentos aqui:');

		await act(() => userEvent.type(input, 'Abobrinha'));

		let addIngredientButtons = screen.getAllByTestId('add-ingredient');

		await act(() => userEvent.click(addIngredientButtons[0]));
		await act(() => userEvent.click(addIngredientButtons[0]));

		expect(screen.getAllByTestId('chip-button')[0].textContent?.trim()).toBe('laranja');

		const chipButton = screen.getAllByTestId('chip-button')[0];

		expect(chipButton).not.toBeNull();

		await act(() => userEvent.click(chipButton!));

		addIngredientButtons = screen.getAllByTestId('add-ingredient');

		expect(chipButton!.textContent?.trim()).toBe(
			addIngredientButtons![addIngredientButtons.length - 1].textContent
		);
		expect(screen.queryAllByTestId('selected-ingredients')[0].textContent?.trim()).not.toContain(
			chipButton?.textContent
		);
	});

	it('Check if to select a found ingredient it goes to selecteds list', async () => {
		const { container } = render(FoundPage);

		const input: HTMLInputElement = screen.getByLabelText('Busque seus alimentos aqui:');

		await act(() => userEvent.type(input, 'Abobrinha'));

		const addIngredientButton = container.querySelector("[data-testid='add-ingredient']");
		const addIngredientText = addIngredientButton?.textContent;

		expect(addIngredientButton).not.toBeNull();
		expect(addIngredientText).not.toBeNull();

		await act(() => userEvent.click(addIngredientButton!));

		const selectedIngredientsDiv = container.querySelectorAll(
			'[data-testid="selected-ingredients"]'
		);
		const selectedIngredientTexts: string[] = [];

		for (const selectedIngredient of selectedIngredientsDiv.values()) {
			if (selectedIngredient.textContent)
				selectedIngredientTexts.push(selectedIngredient.textContent.trim());
		}

		expect(selectedIngredientTexts).toContain(addIngredientText);
	});

	it('Check if each ingredient is different of the all', async () => {
		const { container } = render(FoundPage);
		const input = screen.getByLabelText('Busque seus alimentos aqui:');

		await act(() => userEvent.type(input, 'Abobrinha'));

		const foundIngredientsLi = container.querySelectorAll("[data-testid='found-ingredient-item']");
		const foundIngredientTexts: string[] = [];

		for (const ingredientText of foundIngredientsLi.values()) {
			if (ingredientText.textContent) foundIngredientTexts.push(ingredientText.textContent);
		}

		// use (new Set) to remove duplicates
		expect(foundIngredientsLi).toHaveLength([...new Set(foundIngredientTexts)].length);
	});

	it('Check if has minimum one and maximum twelve found ingredients', async () => {
		const { container } = render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText('Busque seus alimentos aqui:');

		await act(() => userEvent.type(input, 'Abobrinha'));

		const foundIngredientsLi = container.querySelectorAll("[data-testid='found-ingredient-item']");

		expect(foundIngredientsLi.length).toBeGreaterThan(0);
		expect(foundIngredientsLi.length).toBeLessThanOrEqual(12);
	});

	it('Check if input has special character', async () => {
		render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText('Busque seus alimentos aqui:');

		await act(() => userEvent.type(input, '@Abobr_inha!'));

		expect(input.value).toBe('Abobrinha');
	});

	it('Check if input has not number', async () => {
		render(FoundPage);
		const input: HTMLInputElement = screen.getByLabelText('Busque seus alimentos aqui:');

		await act(() => userEvent.type(input, 'Abobrinha123'));

		expect(input.value).toBe('Abobrinha');
	});
});
