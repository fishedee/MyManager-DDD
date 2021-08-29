import { replaceRequest } from './hooks/useRequest';
import { replaceErrorHandler } from './hooks/useErrorCatch';
import request from './util/request';
import { notification } from 'antd';

replaceRequest(request);
replaceErrorHandler((e) => {
    notification.error({
        message: '请求错误',
        description: e.message,
    });
});
