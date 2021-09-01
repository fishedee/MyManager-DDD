import MyPageContainer from '@/components/MyPageContainer';
import {
    Table,
    SpaceDivider,
    useTableBoost,
    useRequest,
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
import SelectIsEnabled from './SelectIsEnabled';
import SelectRole from './SelectRole';
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
        SelectIsEnabled,
        SelectRole,
        SpaceDivider,
        Link,
        FormGrid,
    },
});

const UserList: React.FC<any> = observer((props) => {
    const history = useHistory();
    const request = useRequest();
    const { form, data, fetch, loading } = useTableBoost(
        '/user/search',
        {
            effects: () => {
                onFieldReact('list.*.operatorion.del', (f) => {
                    const field = f as Field;
                    const id = field.query('..id').value();
                    field.componentProps.onClick = async () => {
                        let result = await request({
                            url: '/user/del',
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
                        pathname: '/user/detail',
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
                        title="用户ID"
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
                    <SchemaField.Void title="角色" x-component="Table.Column">
                        <SchemaField.String
                            x-read-pretty={true}
                            x-editable={false}
                            name="roles"
                            x-component={'SelectRole'}
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        title="是否可用"
                        x-component="Table.Column"
                    >
                        <SchemaField.String
                            x-editable={false}
                            name="isEnabled"
                            x-component={'SelectIsEnabled'}
                        />
                    </SchemaField.Void>
                    <SchemaField.String
                        title="创建时间"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'createTime',
                        }}
                    />
                    <SchemaField.String
                        title="备注"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'remark',
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
                                    dangerTitle: '确定删除该用户?',
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
                title={'用户列表'}
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
                        title="用户列表"
                        extra={
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        history.push('/user/detail');
                                    }}
                                >
                                    添加用户
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

export default UserList;
