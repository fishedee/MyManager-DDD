import MyPageContainer from '@/components/MyPageContainer';
import { SpaceDivider, useRequest } from 'antd-formily-boost';
import { createSchemaField, observer, FormConsumer } from '@formily/react';
import { Button } from 'antd';
import {
    Input,
    Select,
    FormItem,
    Submit,
    Form,
    Space,
    FormGrid,
} from '@formily/antd';
import useTableBoost from '@/hooks/useTableBoost';
import Link from '@/components/Link';
import { Field, onFieldReact, onFieldInputValueChange } from '@formily/core';
import ProCard from '@ant-design/pro-card';
import { useHistory } from 'react-router-dom';
import SelectType from './SelectType';
import SelectCard from '@/pages/card/SelectCard';
import SelectCategory from '@/pages/category/SelectCategory';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        Space,
        Button,
        Submit,
        SpaceDivider,
        Link,
        FormGrid,
        SelectType,
        SelectCard,
        SelectCategory,
    },
});

type MyTableProps = {
    dataSource: any;
    columns: any;
};
const MyTable: React.FC<MyTableProps> = (data) => {
    const headers = data.columns.map((single: any) => {
        return <td key={single.key}>{single.title}</td>;
    });
    const body = data.dataSource.map((singleRow: any, index: number) => {
        const row = data.columns.map((single: any) => {
            return <td key={single.key}>{singleRow[single.dataIndex]}</td>;
        });
        return <tr key={index}>{row}</tr>;
    });
    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{body}</tbody>
        </table>
    );
};
const CardList: React.FC<any> = observer((props) => {
    const history = useHistory();
    const request = useRequest();
    const { form, data, fetch, loading, resetFilter } = useTableBoost(
        '/account/search',
        {
            effects: () => {
                onFieldReact('list.*.operatorion.del', (f) => {
                    const field = f as Field;
                    const id = field.query('..id').value();
                    field.componentProps.onClick = async () => {
                        let result = await request({
                            url: '/account/del',
                            method: 'POST',
                            data: {
                                id: id,
                            },
                        });
                        if (result.status == 'fail') {
                            return;
                        }
                        fetch();
                    };
                });
                onFieldReact('list.*.operatorion.edit', (f) => {
                    const field = f as Field;
                    const id = field.query('..id').value();
                    field.componentProps.to = {
                        pathname: '/account/detail',
                        query: {
                            id: id,
                        },
                    };
                });
            },
        },
        {
            refreshOnFilterChange: true,
        },
    );
    const querySchema = (
        <SchemaField>
            <SchemaField.Object
                name="filter"
                x-decorator="FormGrid"
                x-decorator-props={{
                    minColumns: 3,
                    maxColumns: 3,
                    columnGap: 20,
                }}
            >
                <SchemaField.String
                    name="name"
                    title="名字"
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
                <SchemaField.String
                    name="type"
                    title="类型"
                    x-decorator="FormItem"
                    x-component="SelectType"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="[cardId,cardName]"
                    title="银行卡"
                    x-decorator="FormItem"
                    x-component="SelectCard"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="[categoryId,categoryName]"
                    title="分类"
                    x-decorator="FormItem"
                    x-component="SelectCategory"
                    x-component-props={{}}
                />
            </SchemaField.Object>
        </SchemaField>
    );
    const columns = [
        {
            title: '账务ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '金额',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '银行卡',
            dataIndex: 'cardName',
            key: 'cardName',
        },
        {
            title: '分类',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
    ];
    const listSchema = (
        <MyTable
            //默认就有分页控件的
            columns={columns}
            dataSource={data.list}
        />
    );
    return (
        <Form form={form} feedbackLayout={'none'} layout={'vertical'}>
            <MyPageContainer
                title={'账务列表'}
                hiddenBack={true}
                loading={loading}
            >
                <Space
                    direction="vertical"
                    style={{ display: 'flex' }}
                    size={20}
                >
                    <ProCard>
                        <Space style={{ display: 'flex' }} direction="vertical">
                            {querySchema}
                            <Space
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Button onClick={resetFilter}>重置</Button>
                            </Space>
                        </Space>
                    </ProCard>
                    <ProCard
                        title="账务列表"
                        extra={
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        history.push('/account/detail');
                                    }}
                                >
                                    添加账务
                                </Button>
                            </Space>
                        }
                    >
                        {listSchema}
                    </ProCard>
                </Space>
            </MyPageContainer>
        </Form>
    );
});

export default CardList;
