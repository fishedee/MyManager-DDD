import React from 'react';
import { connect, mapReadPretty, mapProps } from '@formily/react';
import { Select as AntdSelect } from 'antd';
import { PreviewText } from '@formily/antd';
import { Field } from '@formily/core';
import { LoadingOutlined } from '@ant-design/icons';
const DoubleSelect: React.FC<any> = (props) => {
    const onChange = (value: any, options: any) => {
        props.onChange([options.value, options.label]);
    };
    const value = props.value ? props.value[0] : undefined;
    return <AntdSelect {...props} onChange={onChange} value={value} />;
};
export const Select = connect(
    DoubleSelect,
    mapProps(
        {
            dataSource: 'options',
            loading: true,
        },
        (props, field2) => {
            const field = field2 as Field;
            return {
                ...props,
                suffixIcon:
                    field?.['loading'] || field?.['validating'] ? (
                        <LoadingOutlined />
                    ) : (
                        props.suffixIcon
                    ),
            };
        },
    ),
    mapReadPretty(PreviewText.Select),
);

export default Select;
