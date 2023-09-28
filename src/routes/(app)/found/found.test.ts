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

		await act(() => userEvent.type(input, "Abo"));

		expect(container.querySelector("[data-testid='found-food-item']")).toBeTruthy();
	});
	
	// it('Check if has maximum twelve found foods', () => {
	// 	expect(true).toBe(true);
	// });
	
	// it('Check if each food is different of the all', () => {
	// 	expect(true).toBe(true);
	// });
	
	// it('Check if select a found food it go to selecteds list', () => {
	// 	expect(true).toBe(true);
	// });
	
	// it('Check if it is possible to remove a selected food', () => {
	// 	expect(true).toBe(true);
	// });
});
