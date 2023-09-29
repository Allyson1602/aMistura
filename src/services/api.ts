import type { AxiosResponse } from "axios";
import axiosInstance from "src/configs/axios.config";

export type IReturnStatus<T> = Promise<AxiosResponse<T>>;

export class ApiBase<T> {
    protected get(url: string, queryParams?: object): IReturnStatus<T> {
        return axiosInstance.get<T>(url, { params: queryParams });
    }

    protected post(url: string, body: object, queryParams?: object): IReturnStatus<T> {
        return axiosInstance.post<T>(url, body, { params: queryParams });
    }

    protected put(url: string, body: object, queryParams?: object): IReturnStatus<T> {
        return axiosInstance.put<T>(url, body, { params: queryParams });
    }

    protected patch(url: string, body: object, queryParams?: object): IReturnStatus<T> {
        return axiosInstance.patch<T>(url, body, { params: queryParams });
    }

    protected delete(url: string, id: number): IReturnStatus<T> {
        return axiosInstance.delete<T>(`${url}/${id}`);
    }
}