import type { AxiosResponse } from 'axios';

export type IReturnStatus<T> = Promise<AxiosResponse<T>>;

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

export enum EBreakpoints {
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl',
	'2XL' = '2xl'
}
