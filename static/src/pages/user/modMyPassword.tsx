import MyPageContainer from '@/components/MyPageContainer';
import { createSchemaField, observer } from '@formily/react';
import { Button } from 'antd';
import {
    Input,
    Password,
    FormItem,
    Submit,
    Form,
    Space,
    FormLayout,
    FormButtonGroup,
    Reset,
} from '@formily/antd';
import { useRequest, useForm } from 'antd-formily-boost';
import { onFieldInputValueChange, Field } from '@formily/core';
import ProCard from '@ant-design/pro-card';
import { Modal } from 'antd';

const SchemaField = createSchemaField({
    components: {
        Input,
        FormItem,
        FormLayout,
        Space,
        Button,
        Submit,
        Password,
    },
});

const UsetDetail: React.FC<any> = observer((props) => {
    const request = useRequest();
    const { form, data } = useForm({
        values: { detail: {} },
        effects: () => {
            onFieldInputValueChange('detail.newPassword', (field) => {
                const newPasswordField: Field = field
                    .query('.newPassword2')
                    .take() as Field;
                if (
                    newPasswordField.value &&
                    newPasswordField.value != field.value
                ) {
                    field.setErrors(['新密码前后输入不对']);
                    newPasswordField.setErrors(['新密码前后输入不对']);
                } else {
                    field.setErrors([]);
                    newPasswordField.setErrors([]);
                }
            });
            onFieldInputValueChange('detail.newPassword2', (field) => {
                const newPasswordField: Field = field
                    .query('.newPassword')
                    .take() as Field;
                if (
                    newPasswordField.value &&
                    newPasswordField.value != field.value
                ) {
                    field.setErrors(['新密码前后输入不对']);
                    newPasswordField.setErrors(['新密码前后输入不对']);
                } else {
                    field.setErrors([]);
                    newPasswordField.setErrors([]);
                }
            });
        },
    });
    const modMyPassword = async () => {
        let result = await request({
            method: 'POST',
            url: '/loginUser/modMyPassword',
            data: {
                ...data.detail,
            },
        });
        if (result.status == 'fail') {
            return;
        }
        Modal.success({
            content: '修改密码成功',
            onOk: () => {
                data.detail = {};
            },
        });
    };
    const formSchema = (
        <SchemaField>
            <SchemaField.Object name="detail">
                <SchemaField.String
                    name="oldPassword"
                    title="旧密码"
                    required={true}
                    x-decorator="FormItem"
                    x-component="Password"
                    x-component-props={{
                        placeholder: '请输入',
                    }}
                />
                <SchemaField.String
                    name="newPassword"
                    title="新密码"
                    required={true}
                    x-decorator="FormItem"
                    x-component="Password"
                    x-component-props={{
                        placeholder: '新密码',
                    }}
                />
                <SchemaField.String
                    name="newPassword2"
                    title="新密码"
                    required={true}
                    x-decorator="FormItem"
                    x-component="Password"
                    x-component-props={{
                        placeholder: '重新输入一次新密码',
                    }}
                />
            </SchemaField.Object>
        </SchemaField>
    );
    return (
        <Form form={form} layout="vertical">
            <MyPageContainer
                title={'修改密码'}
                loading={false}
                hiddenBack={true}
            >
                <ProCard>
                    {formSchema}
                    <FormButtonGroup gutter={10}>
                        <Submit onSubmit={modMyPassword}>提交</Submit>
                        <Reset>重置</Reset>
                    </FormButtonGroup>
                </ProCard>
            </MyPageContainer>
        </Form>
    );
});

export default UsetDetail;
