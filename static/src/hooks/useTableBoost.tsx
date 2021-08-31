import useForm from './useForm';
import useQuery from './useQuery';
import { createForm, Form, IFormProps } from '@formily/core';
import { useMemo } from 'react';
import { clearQueryCache } from './useQuery';

type TableBoostProps = {
    filter: any;
    paginaction: { current: 1; pageSize: 10; total: 0 };
    list: any[];
};

type TableBoostOptions = {
    refreshOnFilterChange?: boolean;
};
function useTableBoost(
    ajaxUrl: string,
    form: IFormProps<TableBoostProps> = {},
    options?: TableBoostOptions,
) {
    useMemo(() => {
        //每个页面的queryCache都要清空
        clearQueryCache();
    }, []);
    const formInfo = useForm(
        {
            ...form,
            values: {
                filter: {},
                paginaction: { current: 1, pageSize: 10, total: 0 },
                list: [],
            },
        },
        { cacheKey: 'table.' + ajaxUrl },
    );
    const queryBoostInfo = useQuery(
        async (request) => {
            let result = await request({
                url: ajaxUrl,
                method: 'GET',
                data: {
                    ...formInfo.data.filter,
                    pageIndex:
                        (formInfo.data.paginaction.current - 1) *
                        formInfo.data.paginaction.pageSize,
                    pageSize: formInfo.data.paginaction.pageSize,
                },
            });
            if (result.status == 'fail') {
                return;
            }
            (formInfo.data.list = result.data.data),
                (formInfo.data.paginaction.total = result.data.count);
        },
        {
            refreshDeps: [
                formInfo.data.paginaction.current,
                formInfo.data.paginaction.pageSize,
                options?.refreshOnFilterChange
                    ? formInfo.data.filter
                    : undefined,
            ],
        },
    );
    return {
        ...formInfo,
        ...queryBoostInfo,
    };
}

export default useTableBoost;
