import { Select } from '@formily/antd';
import { Field } from '@formily/core';
import { useField } from '@formily/react';
import { useLayoutEffect, useMemo } from 'react';

const isEnabledSelect: React.FC<any> = (props) => {
    const field = useField() as Field;
    useLayoutEffect(() => {
        field.dataSource = [
            { label: '收入', value: 'IN' },
            { label: '支出', value: 'OUT' },
            { label: '转账收入', value: 'TRANSFER_IN' },
            { label: '转账支出', value: 'TRANSFER_OUT' },
        ];
    }, []);
    return <Select {...props} />;
};

export default isEnabledSelect;
