import type { AxiosResponse } from "axios";

export type IReturnStatus<T> = Promise<AxiosResponse<T>>;