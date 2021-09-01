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
import useForm from '@/hooks/useForm';

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
    },
});

const CardList: React.FC<any> = observer((props) => {
    const history = useHistory();
    const request = useRequest();
    const { form, data } = useForm({
        values: {
            paginaction: { current: 0, pageSize: 10 },
            list: [
                {
                    createTime: '2021-09-01 15:09:40',
                    modifyTime: '2021-09-01 15:09:40',
                    id: 10004,
                    userId: 10001,
                    userName: 'fish',
                    name: '理财卡',
                    bank: '工商银行卡',
                    card: '',
                    money: '0.00',
                    remark: '',
                },
                {
                    createTime: '2021-09-01 15:09:40',
                    modifyTime: '2021-09-01 15:09:40',
                    id: 10002,
                    userId: 10001,
                    userName: 'fish',
                    name: '消费卡',
                    bank: '工商银行卡',
                    card: '',
                    money: '0.00',
                    remark: '',
                },
                {
                    createTime: '2021-09-01 15:09:40',
                    modifyTime: '2021-09-01 15:09:40',
                    id: 10001,
                    userId: 10001,
                    userName: 'fish',
                    name: '工资卡',
                    bank: '农业银行卡',
                    card: '',
                    money: '0.00',
                    remark: '',
                },
            ],
            filter: {},
        },
    });
    /*
    const { form, data, fetch, loading } = useTableBoost(
        '/card/search',
        {
            effects: () => {
                onFieldReact('list.*.operatorion.del', (f) => {
                    const field = f as Field;
                    const id = field.query('..id').value();
                    field.componentProps.onClick = async () => {
                        let result = await request({
                            url: '/card/del',
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
                        pathname: '/card/detail',
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
    */
    const querySchema = (
        <SchemaField>
            <SchemaField.Object
                name="filter"
                x-decorator="FormGrid"
                x-decorator-props={{
                    maxColumns: 3,
                    minColumns: 3,
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
                    name="bank"
                    title="银行"
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
                        title="银行卡ID"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'id',
                        }}
                    />
                    <SchemaField.Void
                        title="名字"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'name',
                        }}
                    />
                    <SchemaField.Void
                        title="银行"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'bank',
                        }}
                    />
                    <SchemaField.Void
                        title="卡号"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'card',
                        }}
                    />
                    <SchemaField.Void
                        title="初始余额"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'money',
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
                                    dangerTitle: '确定删除该银行卡?',
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
                title={'银行卡列表'}
                hiddenBack={true}
                loading={false}
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
                                <Button
                                    onClick={() => {
                                        data.filter = {};
                                    }}
                                >
                                    重置
                                </Button>
                            </Space>
                        </Space>
                    </ProCard>
                    <ProCard
                        title="银行卡列表"
                        extra={
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        history.push('/card/detail');
                                    }}
                                >
                                    添加银行卡
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
