import { createSchemaField } from '@formily/react';
import {
    Form,
    FormItem,
    Input,
    Password,
    Submit,
    FormTab,
    Checkbox,
    Space,
} from '@formily/antd';
import ProCard from '@ant-design/pro-card';
import useForm from '@/hooks/useForm';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useRequest from '@/hooks/useRequest';
import { useModel, history } from 'umi';
import useQuery from '@/hooks/useQuery';
import { useEffect, useMemo } from 'react';
import { clearFormCache } from '@/hooks/useForm';

const Tip = () => {
    return <span>{'七天免登录'}</span>;
};
const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Password,
        FormTab,
        Checkbox,
        Space,
        Tip,
    },
});

const formTab = FormTab.createFormTab();

export default function IndexPage() {
    const { user, setUser } = useModel('user');
    console.log(user, setUser);
    const { initialState, loading, error, refresh, setInitialState } = useModel(
        '@@initialState',
    );
    const { form, data } = useForm({
        values: {
            login: {},
        },
    });
    const request = useRequest();
    useEffect(() => {
        request({
            method: 'GET',
            url: '/login/islogin',
        });
    }, []);
    const submit = async () => {
        let result = await request({
            method: 'POST',
            url: '/login/login',
            params: data.login,
        });
        if (result.status == 'fail') {
            return;
        }
        setInitialState({
            ...initialState,
            currentUser: result.data,
        });
        clearFormCache();
        history.push('/user');
    };
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#eee',
                height: '100vh',
                padding: '40px 0',
            }}
        >
            <ProCard style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center' }}>个人管理系统</h2>
                <Form form={form} layout="vertical">
                    <SchemaField>
                        <SchemaField.Object name="login">
                            <SchemaField.Void
                                x-component="FormTab"
                                x-component-props={{ formTab }}
                            >
                                <SchemaField.Void
                                    name="tab1"
                                    x-component="FormTab.TabPane"
                                    x-component-props={{
                                        tab: '登录',
                                    }}
                                >
                                    <SchemaField.String
                                        name="user"
                                        title="用户名"
                                        required
                                        x-decorator="FormItem"
                                        x-component="Input"
                                        x-validator={{
                                            required: true,
                                        }}
                                        x-component-props={{
                                            prefix: <UserOutlined />,
                                        }}
                                    />
                                    <SchemaField.String
                                        name="password"
                                        title="密码"
                                        required
                                        x-decorator="FormItem"
                                        x-component="Password"
                                        x-component-props={{
                                            prefix: <LockOutlined />,
                                        }}
                                    />
                                    <SchemaField.Void
                                        x-decorator="Space"
                                        x-decorator-props={{
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'center',
                                            },
                                        }}
                                    >
                                        <SchemaField.String
                                            name="remember-me"
                                            x-component="Checkbox"
                                        />
                                        <SchemaField.Void x-component="Tip" />
                                    </SchemaField.Void>
                                </SchemaField.Void>
                            </SchemaField.Void>
                        </SchemaField.Object>
                    </SchemaField>
                    <Submit
                        block
                        onSubmit={submit}
                        size="large"
                        style={{ marginTop: '10px' }}
                    >
                        登录
                    </Submit>
                </Form>
            </ProCard>
        </div>
    );
}
