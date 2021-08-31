import MyPageContainer from '@/components/MyPageContainer';
import { Table, SpaceDivider } from 'antd-formily-boost';
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
import useRequest from '@/hooks/useRequest';
import Link from '@/components/Link';
import { Field, onFieldReact } from '@formily/core';
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
        Table,
        SpaceDivider,
        Link,
        FormGrid,
        SelectType,
        SelectCard,
        SelectCategory,
    },
});

const CardList: React.FC<any> = observer((props) => {
    const history = useHistory();
    const request = useRequest();
    const { form, data, fetch, loading } = useTableBoost(
        '/account/search',
        {
            effects: () => {
                onFieldReact('list.*.operatorion.del', (f) => {
                    const field = f as Field;
                    const id = field.query('..id').value();
                    /*
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
                    */
                });
                onFieldReact('list.*.operatorion.edit', (f) => {
                    const field = f as Field;
                    const id = field.query('..id').value();
                    /*
                    field.componentProps.to = {
                        pathname: '/account/detail',
                        query: {
                            id: id,
                        },
                    };
                    */
                });
            },
        },
        {
            refreshOnFilterChange: true,
        },
    );
    console.log('Account List Render');
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
                <SchemaField.String
                    name="[categoryId2,categoryName2]"
                    title="分类2"
                    x-decorator="FormItem"
                    x-component="SelectCategory"
                    x-component-props={{}}
                />
            </SchemaField.Object>
        </SchemaField>
    );
    const listSchema = (
        <SchemaField>
            <SchemaField.Array
                name="list"
                x-component="Table"
                x-component-props={{
                    paginaction: data.paginaction,
                    paginationProps: {
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: true,
                    },
                }}
            >
                <SchemaField.Void>
                    <SchemaField.Void
                        title="账务ID"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'id',
                        }}
                    />
                    <SchemaField.Void
                        title="名称"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'name',
                        }}
                    />
                    <SchemaField.Void
                        title="类型"
                        x-component="Table.Column"
                        x-component-props={{}}
                    >
                        <SchemaField.String
                            name="type"
                            x-editable={false}
                            x-component={'SelectType'}
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        title="金额"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'money',
                        }}
                    />
                    <SchemaField.Void
                        title="银行卡"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'cardName',
                        }}
                    />
                    <SchemaField.Void
                        title="分类"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'categoryName',
                        }}
                    />
                    <SchemaField.String
                        title="备注"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'remark',
                        }}
                    />
                    <SchemaField.String
                        title="创建时间"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'createTime',
                        }}
                    />
                    <SchemaField.Void title="操作" x-component="Table.Column">
                        <SchemaField.Void
                            name="operatorion"
                            title="操作"
                            x-component="SpaceDivider"
                        >
                            <SchemaField.Void
                                name="edit"
                                title="编辑"
                                x-component="Link"
                            />
                            <SchemaField.Void
                                name="del"
                                title="删除"
                                x-component="Link"
                                x-component-props={{
                                    danger: true,
                                    dangerTitle: '确定删除该分类?',
                                }}
                            />
                        </SchemaField.Void>
                    </SchemaField.Void>
                </SchemaField.Void>
            </SchemaField.Array>
        </SchemaField>
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
                                <Button type="primary" onClick={fetch}>
                                    查询
                                </Button>
                                <Button
                                    onClick={() => {
                                        data.filter = {};
                                        fetch();
                                    }}
                                >
                                    重置
                                </Button>
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
