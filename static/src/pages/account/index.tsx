import MyPageContainer from '@/components/MyPageContainer';
import {
    Table,
    SpaceDivider,
    useRequest,
    useQueryTableBoost,
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
    const { form, fetch, loading, resetFilter } = useQueryTableBoost(
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
                <SchemaField.String
                    name="type"
                    title="??????"
                    x-decorator="FormItem"
                    x-component="SelectType"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="[cardId,cardName]"
                    title="?????????"
                    x-decorator="FormItem"
                    x-component="SelectCard"
                    x-component-props={{}}
                />
                <SchemaField.String
                    name="[categoryId,categoryName]"
                    title="??????"
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
                        title="??????ID"
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
                        x-component-props={{}}
                    >
                        <SchemaField.String
                            name="type"
                            x-editable={false}
                            x-component={'SelectType'}
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        title="??????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'money',
                        }}
                    />
                    <SchemaField.Void
                        title="?????????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'cardName',
                        }}
                    />
                    <SchemaField.Void
                        title="??????"
                        x-component="Table.Column"
                        x-component-props={{
                            labelIndex: 'categoryName',
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
                                    dangerTitle: '??????????????????????',
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
                title={'????????????'}
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
                                <Button onClick={resetFilter}>??????</Button>
                            </Space>
                        </Space>
                    </ProCard>
                    <ProCard
                        title="????????????"
                        extra={
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        history.push('/account/detail');
                                    }}
                                >
                                    ????????????
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
