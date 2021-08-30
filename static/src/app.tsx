import { replaceErrorHandler, replaceRequestHandler } from './hooks/useRequest';
import request from './util/request';
import { notification } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import User from './util/user';
import Result from './hooks/Result';
import { history } from 'umi';

replaceRequestHandler(request);
replaceErrorHandler((resultFail) => {
    console.error(resultFail.error);
    //Ajax错误
    notification.error({
        message: '请求错误',
        description: resultFail.error.message,
    });
});

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    currentUser?: User;
    fetchUserInfo?: () => Promise<User | undefined>;
}> {
    const fetchUserInfo: () => Promise<User | undefined> = async () => {
        try {
            const result = await request({
                method: 'GET',
                url: '/login/islogin',
            });
            if (result.status == 'fail') {
                return undefined;
            }
            let data: User = result.data;
            return data;
        } catch (error) {
            history.push('/login');
            return undefined;
        }
    };
    // 如果是登录页面，不执行
    if (history.location.pathname !== '/login') {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
        };
    }
    return {
        fetchUserInfo,
    };
}
