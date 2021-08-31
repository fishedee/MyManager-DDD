import useQuery from '@/hooks/useQuery';
import DoubleSelect from '@/components/DoubleSelect';
import { Field } from '@formily/core';
import { useField } from '@formily/react';
import { useLayoutEffect, useMemo } from 'react';

const isEnabledSelect: React.FC<any> = (props) => {
    const field = useField() as Field;
    useQuery(
        async (request) => {
            let result = await request({
                method: 'GET',
                url: '/category/search',
                data: {
                    pageIndex: 0,
                    pageSize: 1000,
                },
            });
            if (result.status == 'fail') {
                return;
            }
            field.dataSource = result.data.data.map((single: any) => {
                return { label: single.name, value: single.id };
            });
        },
        {
            cacheKey: 'select.category',
        },
    );
    return <DoubleSelect {...props} />;
};

export default isEnabledSelect;
