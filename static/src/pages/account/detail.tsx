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
    NumberPicker,
} from '@formily/antd';
import Link from '@/components/Link';
import ProCard from '@ant-design/pro-card';
import useDetailBoost from '@/hooks/useDetailBoost';
import SelectType from './SelectType';
import SelectCard from '@/pages/card/SelectCard';
import SelectCategory from '@/pages/category/SelectCategory';

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
        SelectType,
        SelectCard,
        SelectCategory,
    },
});

const AccountDetail: React.FC<any> = observer((props) => {
    const { save, form, loading } = useDetailBoost(
        '/account/get',
        {},
        {
            mod: '/account/mod',
            add: '/account/add',
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
                    name="type"
                    title="类型"
                    required={true}
                    x-decorator="FormItem"
                    x-component="SelectType"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="money"
                    title="金额"
                    required={true}
                    x-decorator="FormItem"
                    x-component="NumberPicker"
                    x-component-props={{
                        precision: 2,
                    }}
                />
                <SchemaField.String
                    name="[cardId,cardName]"
                    title="银行卡"
                    required={true}
                    x-decorator="FormItem"
                    x-component="SelectCard"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="[categoryId,categoryName]"
                    title="分类"
                    required={true}
                    x-decorator="FormItem"
                    x-component="SelectCategory"
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
            <MyPageContainer title={'账务详情'} loading={loading}>
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

export default AccountDetail;
