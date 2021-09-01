import { replaceErrorHandler, replaceRequestHandler } from './hooks/useRequest';
import request from './util/request';
import { notification, Modal } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import { history, useModel } from 'umi';
import 'antd/dist/antd.css';

replaceRequestHandler(request);
replaceErrorHandler((resultFail) => {
    console.error(resultFail.error);
    if (resultFail.code == 403) {
        //权限错误
        Modal.error({
            content: '你没有权限执行此操作',
        });
    } else {
        //Ajax错误
        notification.error({
            message: '请求错误',
            description: resultFail.error.message,
        });
    }
});

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    data: string;
}> {
    const { checkLogin } = useModel('login');
    await checkLogin();
    return {
        data: '',
    };
}
