import { Select } from '@formily/antd';
import { Field } from '@formily/core';
import { useField } from '@formily/react';
import { useEffect, useMemo } from 'react';

const isEnabledSelect: React.FC<any> = (props) => {
    const field = useField() as Field;
    useEffect(() => {
        field.dataSource = [
            { label: '超级管理员', value: 'ADMIN' },
            { label: '普通管理员', value: 'USER' },
        ];
    }, []);
    return <Select {...props} />;
};

export default isEnabledSelect;
