import { replaceRequest } from './hooks/useRequest';
import { replaceErrorHandler } from './hooks/useErrorCatch';
import request, { RequestError } from './util/request';
import { notification } from 'antd';
import { UseQueryConcurrentError } from './hooks/useQuery';

replaceRequest(request);
replaceErrorHandler((e) => {
    if (e instanceof RequestError) {
        //Ajax错误
        notification.error({
            message: '请求错误',
            description: e.message,
        });
    } else if (e instanceof UseQueryConcurrentError) {
        //可忽略错误
    } else {
        //其他错误
        if (e instanceof Error) {
            notification.error({
                message: '错误',
                description: e.message,
            });
        } else {
            notification.error({
                message: '错误',
                description: e,
            });
        }
    }
    console.error(e);
});
