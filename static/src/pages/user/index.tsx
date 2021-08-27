import MyPageContainer from '@/components/MyPageContainer';
import { Table } from 'antd-formily-boost';
import { createSchemaField, observer, FormConsumer } from '@formily/react';
import { Button } from 'antd';
import { Input, Select, FormItem, Submit, Form, Space } from '@formily/antd';
import useTableBoost from '@/hooks/useTableBoost';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        Space,
        Button,
        Submit,
        Table,
    },
});

const UserList: React.FC<any> = observer((props) => {
    const { form, data, fetch, loading } = useTableBoost('/user/search');
    const querySchema = (
        <SchemaField>
            <SchemaField.Object name="where">
                <SchemaField.Void
                    x-component="Space"
                    x-component-props={{
                        size: [20, 20],
                        wrap: true,
                    }}
                >
                    <SchemaField.String
                        name="name"
                        title="名字"
                        x-decorator="FormItem"
                        x-component="Input"
                        x-component-props={{}}
                    />
                    <SchemaField.Void
                        x-component="Space"
                        x-component-props={{
                            size: 10,
                            wrap: true,
                        }}
                    >
                        <SchemaField.Void
                            x-component="Submit"
                            x-component-props={{
                                onSubmit: fetch,
                                children: '查询',
                            }}
                        />
                        <SchemaField.Void
                            x-component="Button"
                            x-component-props={{
                                onClick: () => {
                                    data.where = {};
                                    fetch();
                                },
                                children: '重置',
                            }}
                        />
                    </SchemaField.Void>
                </SchemaField.Void>
            </SchemaField.Object>
        </SchemaField>
    );
    const listSchema = (
        <SchemaField>
            <SchemaField.Array
                name="data"
                x-component="Table"
                x-component-props={{
                    paginaction: data.limit,
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

                    <SchemaField.Void
                        title="角色"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'roles',
                        }}
                    />
                </SchemaField.Void>
            </SchemaField.Array>
        </SchemaField>
    );
    return (
        <Form form={form} feedbackLayout={'none'}>
            <MyPageContainer
                title={'用户管理'}
                hiddenBack={true}
                content={querySchema}
                loading={loading}
            >
                {listSchema}
            </MyPageContainer>

            <FormConsumer>{(data) => JSON.stringify(data.values)}</FormConsumer>
        </Form>
    );
});

export default UserList;
