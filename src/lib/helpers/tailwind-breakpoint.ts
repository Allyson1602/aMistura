import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '$tailwind';
import type { EBreakpoints, IBreakpoints } from '$lib/types';

export const getBreakpoint = (size: EBreakpoints): number => {
	const breakpoints = resolveConfig(tailwindConfig).theme?.screens as IBreakpoints | undefined;

	return parseInt(breakpoints![size].replace('px', ''));
};
