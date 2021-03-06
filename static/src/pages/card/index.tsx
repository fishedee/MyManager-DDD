import MyPageContainer from '@/components/MyPageContainer';
import {
    Table,
    SpaceDivider,
    useQueryTableBoost,
    useRequest,
    useForm,
} from 'antd-formily-boost';
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
import Link from '@/components/Link';
import { Field, onFieldReact } from '@formily/core';
import ProCard from '@ant-design/pro-card';
import { useHistory } from 'react-router-dom';

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

    const { form, fetch, loading, resetFilter } = useQueryTableBoost(
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
                    title="??????"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="bank"
                    title="??????"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="remark"
                    title="??????"
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
                    paginaction: 'paginaction',
                    paginationProps: {
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: true,
                    },
                }}
            >
                <SchemaField.Void>
                    <SchemaField.Void
                        title="?????????ID"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'id',
                        }}
                    />
                    <SchemaField.Void
                        title="??????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'name',
                        }}
                    />
                    <SchemaField.Void
                        title="??????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'bank',
                        }}
                    />
                    <SchemaField.Void
                        title="??????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'card',
                        }}
                    />
                    <SchemaField.Void
                        title="????????????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'money',
                        }}
                    />
                    <SchemaField.String
                        title="??????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'remark',
                        }}
                    />
                    <SchemaField.String
                        title="????????????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'createTime',
                        }}
                    />
                    <SchemaField.Void title="??????" x-component="Table.Column">
                        <SchemaField.Void
                            name="operatorion"
                            title="??????"
                            x-component="SpaceDivider"
                        >
                            <SchemaField.Void
                                name="edit"
                                title="??????"
                                x-component="Link"
                            />
                            <SchemaField.Void
                                name="del"
                                title="??????"
                                x-component="Link"
                                x-component-props={{
                                    danger: true,
                                    dangerTitle: '?????????????????????????',
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
                title={'???????????????'}
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
                                <Button onClick={resetFilter}>??????</Button>
                            </Space>
                        </Space>
                    </ProCard>
                    <ProCard
                        title="???????????????"
                        extra={
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        history.push('/card/detail');
                                    }}
                                >
                                    ???????????????
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
