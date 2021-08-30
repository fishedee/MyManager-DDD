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
import useErrorCatch from '@/hooks/Result';
import useDetailBoost from '@/hooks/useDetailBoost';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        FormLayout,
        Space,
        Button,
        Submit,
        Table,
        SelectIsEnabled,
        SelectRole,
        SpaceDivider,
        Link,
    },
});

const UsetDetail: React.FC<any> = observer((props) => {
    const { save, form, loading } = useDetailBoost(
        '/user/get',
        {},
        {
            add: '/user/add',
            mod: '/user/mod',
        },
    );
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
                    x-component="SelectRole"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="isEnabled"
                    title="是否可用"
                    required={true}
                    x-decorator="FormItem"
                    x-component="SelectIsEnabled"
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
        <Form form={form} layout="vertical">
            <MyPageContainer title={'用户详情'} loading={loading}>
                <ProCard>
                    {formSchema}
                    <FormButtonGroup gutter={10}>
                        <Submit onSubmit={save}>提交</Submit>
                        <Reset>重置</Reset>
                    </FormButtonGroup>
                </ProCard>
            </MyPageContainer>
        </Form>
    );
});

export default UsetDetail;
