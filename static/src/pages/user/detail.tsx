import MyPageContainer from '@/components/MyPageContainer';
import { Table, SpaceDivider } from 'antd-formily-boost';
import { createSchemaField, observer } from '@formily/react';
import { Button } from 'antd';
import {
    Input,
    Select,
    FormItem,
    Submit,
    Form,
    Space,
    FormLayout,
    FormButtonGroup,
    Reset,
} from '@formily/antd';
import useRequest from '@/hooks/useRequest';
import SelectIsEnabled from './SelectIsEnabled';
import SelectRole from './SelectRole';
import Link from '@/components/Link';
import ProCard from '@ant-design/pro-card';
import useForm from '@/hooks/useForm';
import { useHistory, useLocation } from 'umi';
import useQuery from '@/hooks/useQuery';
import useErrorCatch from '@/hooks/useErrorCatch';
import { createForm } from '@formily/core';

const SchemaField = createSchemaField({
    components: {
        Select,
        FormItem,
    },
});

const form = createForm();

const UsetDetail: React.FC<any> = observer((props) => {
    /*
    const location = useLocation();
    const history = useHistory();
    const id = location?.query?.id;
    let { form, data } = useForm(
        {
            values: { detail: {} },
        },
        {
            cacheKey: id ? undefined : 'form.user_' + id,
        },
    );
*/
    /*
    const { fetch, loading } = useQuery(
        async (request) => {
            console.log('id', id);
            let result = await request({
                method: 'GET',
                url: '/user/get',
                data: {
                    id: id,
                },
            });
            data.detail = result;
        },
        {
            firstDidNotRefresh: !id,
        },
    );
    const request = useRequest();
    const save = useErrorCatch(async () => {
        if (id) {
            await request({
                method: 'POST',
                url: '/user/mod',
                data: {
                    id: id,
                    ...data.detail,
                },
            });
            history.goBack();
        } else {
            await request({
                method: 'POST',
                url: '/user/add',
                data: {
                    ...data.detail,
                },
            });
            history.goBack();
        }
    });
    */
    const formSchema = (
        <SchemaField>
            <SchemaField.Object name="detail">
                <SchemaField.String
                    name="name"
                    title="名字"
                    required={true}
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="roles"
                    title="角色"
                    required={true}
                    x-decorator="FormItem"
                    x-component="Select"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="isEnabled"
                    title="是否可用"
                    required={true}
                    enum={[
                        { label: '可用', value: 'ENABLE' },
                        { label: '不可用', value: 'DISABLE' },
                    ]}
                    x-decorator="FormItem"
                    x-component="Select"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="remark"
                    title="备注"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{}}
                />
            </SchemaField.Object>
        </SchemaField>
    );
    return (
        <Form form={form}>
            <SchemaField>
                <SchemaField.Number
                    name="select"
                    title="选择框"
                    x-decorator="FormItem"
                    x-component="Select"
                    enum={[
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 },
                    ]}
                    x-component-props={{
                        style: {
                            width: 120,
                        },
                    }}
                />
            </SchemaField>
            <FormButtonGroup>
                <Submit onSubmit={console.log}>提交</Submit>
            </FormButtonGroup>
        </Form>
    );
});

export default UsetDetail;
