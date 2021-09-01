import MyPageContainer from '@/components/MyPageContainer';
import { Table, SpaceDivider, useRequest } from 'antd-formily-boost';
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
    NumberPicker,
} from '@formily/antd';
import Link from '@/components/Link';
import ProCard from '@ant-design/pro-card';
import useDetailBoost from '@/hooks/useDetailBoost';
import { Modal } from 'antd';

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
        SpaceDivider,
        NumberPicker,
        Link,
    },
});

const CardDetail: React.FC<any> = observer((props) => {
    const { save, form, loading } = useDetailBoost(
        '/category/get',
        {},
        {
            mod: '/category/mod',
            add: '/category/add',
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
            <MyPageContainer title={'分类详情'} loading={loading}>
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

export default CardDetail;
