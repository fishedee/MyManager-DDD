import { Select } from '@formily/antd';
import { Field } from '@formily/core';
import { useField } from '@formily/react';
import { useLayoutEffect, useMemo } from 'react';

const isEnabledSelect: React.FC<any> = (props) => {
    const field = useField() as Field;
    useLayoutEffect(() => {
        field.dataSource = [
            { label: '可用', value: 'ENABLE' },
            { label: '不可用', value: 'DISABLE' },
        ];
    }, []);
    return <Select {...props} />;
};

export default isEnabledSelect;
