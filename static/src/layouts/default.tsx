import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { useHistory, useLocation } from 'umi';
import { Fragment, useState } from 'react';
import route from './route';
import { PageActionContext } from '@/components/MyPageContainer';

export default (props) => {
    const history = useHistory();
    const location = useLocation();
    const mixModeSetting = {
        fixSiderbar: true, //可调的左侧群
        navTheme: 'dark', //light的主题模式
        layout: 'side',
        primaryColor: '#1890ff', //菜单主题色
        contentWidth: 'Fluid', //流式内容布局，宽度总是会自动调整
        splitMenus: false, //分割菜单，一级菜单在顶部，其他菜单在左侧
        fixedHeader: true,
    };
    const [state, setState] = useState(0);
    return (
        <PageActionContext.Provider
            value={{
                refresh: () => {
                    setState(state + 1);
                },
            }}
        >
            <div
                id="test-pro-layout"
                style={{
                    height: '100vh',
                }}
            >
                <ProLayout
                    headerContentRender={false}
                    rightContentRender={false}
                    //使用location来active对应的menu
                    route={route}
                    location={{
                        pathname: location.pathname,
                    }}
                    //顶部标题
                    title="MyManager"
                    //顶部logo
                    logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
                    //左侧菜单栏底部的footer
                    menuFooterRender={(props) => {
                        return (
                            <a
                                style={{
                                    lineHeight: '48rpx',
                                    display: 'flex',
                                    height: 48,
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    alignItems: 'center',
                                }}
                                href="https://preview.pro.ant.design/dashboard/analysis"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    alt="pro-logo"
                                    src="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
                                    style={{
                                        width: 16,
                                        height: 16,
                                        margin: '0 16px',
                                        marginRight: 10,
                                    }}
                                />
                                {!props?.collapsed && //根据是否折叠来显示Preview Remax
                                    '个人管理系统'}
                            </a>
                        );
                    }}
                    //左侧菜单栏的每个菜单项的渲染
                    menuItemRender={(item, dom) => (
                        //每个表单项的包装器，可以设置点击时的触发行为
                        <a
                            onClick={() => {
                                history.push(item.path || '/welcome');
                            }}
                        >
                            {dom}
                        </a>
                    )}
                    //关闭breadCrumb
                    breadcrumbRender={(route) => {
                        return [];
                    }}
                    //内容的页脚
                    footerRender={() => (
                        <DefaultFooter
                            links={[
                                {
                                    key: 'test',
                                    title: 'Github地址',
                                    href:
                                        'https://github.com/fishedee/MyManager-DDD',
                                },
                                {
                                    key: 'test2',
                                    title: '个人博客',
                                    href: 'https://blog.fishedee.com',
                                },
                            ]}
                            copyright="个人管理系统"
                        />
                    )}
                    //是否有菜单的可选收缩按钮
                    {...mixModeSetting}
                >
                    <Fragment key={state}>{props.children}</Fragment>
                </ProLayout>
            </div>
        </PageActionContext.Provider>
    );
};
