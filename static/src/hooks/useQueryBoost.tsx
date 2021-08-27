import useQuery, {
    UseQueryFetch,
    UseQueryRequest,
    UseQueryConcurrentError,
    UseQueryOptions,
} from './useQuery';
import { notification } from 'antd';
import { AxiosRequestConfig } from 'axios';
import Request from '@/util/request';

/*
 * 包装useQuery，自己项目可以参考这里来修改
 * 1. 在axios上面继续做手脚，自动检查code与msg，
 * 2. 当异常错误的时候，有自定义的错误展示方式
 */
function userQueryBoost(fetch: UseQueryFetch, options?: UseQueryOptions) {
    const newFetch = async (request: UseQueryRequest) => {
        try {
            const newRequest = (config: AxiosRequestConfig) => {
                return Request(request, config);
            };
            await fetch(newRequest);
        } catch (e) {
            if (e instanceof UseQueryConcurrentError) {
                //省略Conflit错误
                return;
            }
            notification.error({
                message: '请求失败',
                description: e.message,
            });
            console.error(e);
        }
    };
    return useQuery(newFetch, options);
}

export default userQueryBoost;
