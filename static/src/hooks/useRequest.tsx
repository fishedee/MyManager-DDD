import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import useErrorCatch from './useErrorCatch';

type AxoisFetch = (config: AxiosRequestConfig) => AxiosPromise;

export type RequestType = (
    fetch: AxoisFetch,
    options: AxiosRequestConfig,
) => Promise<any>;

let requestBoostRequest: RequestType = (
    fetch: AxoisFetch,
    options: AxiosRequestConfig,
) => {
    return fetch(options);
};

export function replaceRequest(request: RequestType) {
    requestBoostRequest = request;
}
export type UseRequestOptions = {};

/*
 * 设计目标，这个是所有请求的基础
 * 统一ajax输出，
 * 默认的全局错误捕捉
 */
function useRequest(options?: UseRequestOptions) {
    const requestManual = useErrorCatch(async (config: AxiosRequestConfig) => {
        return await requestBoostRequest(axios, config);
    });
    return requestManual;
}

export default useRequest;
