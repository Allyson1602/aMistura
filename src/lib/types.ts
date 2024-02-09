import type { AxiosResponse } from 'axios';
import type { ChatCompletion } from 'openai/resources';

export type IMouseEvent = MouseEvent & {
	currentTarget: EventTarget & HTMLButtonElement;
};

export interface IBreakpoints {
	sm: string;
	md: string;
	lg: string;
	xl: string;
	'2xl': string;
}

export enum ELoadingStatus {
	notStarted,
	getting,
	finished
}

export type IResponseAi = {
	responseAi: ChatCompletion;
};

export interface IResponse<T> {
	statusCode: number;
	success: boolean;
	data: T;
}

export type IReturnStatus<T> = Promise<AxiosResponse<IResponse<T>>>;
