import useForm from './useForm';
import useQuery from './useQuery';
import { createForm, Form, IFormProps } from '@formily/core';

type TableBoostProps = {
    where: any;
    limit: { current: 1; pageSize: 10; total: 0 };
    list: any[];
};
function useTableBoost(
    ajaxUrl: string,
    form: IFormProps<TableBoostProps> = {},
) {
    const formInfo = useForm(
        {
            ...form,
            values: {
                where: {},
                limit: { current: 1, pageSize: 10, total: 0 },
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
                    ...formInfo.data.where,
                    pageIndex:
                        (formInfo.data.limit.current - 1) *
                        formInfo.data.limit.pageSize,
                    pageSize: formInfo.data.limit.pageSize,
                },
            });
            if (result.status == 'fail') {
                return;
            }
            (formInfo.data.list = result.data.data),
                (formInfo.data.limit.total = result.data.count);
        },
        {
            refreshDeps: [
                formInfo.data.limit.current,
                formInfo.data.limit.pageSize,
            ],
        },
    );
    return {
        ...formInfo,
        ...queryBoostInfo,
    };
}

export default useTableBoost;
