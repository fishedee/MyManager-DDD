import { replaceErrorHandler, replaceRequestHandler } from './hooks/useRequest';
import request from './util/request';
import { notification, Modal } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import { history, useModel } from 'umi';
import 'antd/dist/antd.css';
import User from '@/models/User';

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
 * 不能在getInitialState使用其他的model
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    currentUser: User | undefined;
    fetchUserInfo: () => Promise<User | undefined>;
}> {
    const fetchUserInfo: () => Promise<User | undefined> = async () => {
        const result = await request({
            method: 'GET',
            url: '/login/islogin',
        });
        if (result.status == 'fail') {
            return undefined;
        }
        let data: User = result.data;
        return data;
    };
    const currentUser = await fetchUserInfo();
    return {
        fetchUserInfo,
        currentUser,
    };
}
