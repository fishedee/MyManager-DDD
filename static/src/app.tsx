import { replaceErrorHandler, replaceRequestHandler } from './hooks/useRequest';
import request from './util/request';
import { notification } from 'antd';

replaceRequestHandler(request);
replaceErrorHandler((resultFail) => {
    console.error(resultFail.error);
    //Ajax错误
    notification.error({
        message: '请求错误',
        description: resultFail.error.message,
    });
});
