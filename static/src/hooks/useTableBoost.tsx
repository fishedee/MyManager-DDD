import useForm from './useForm';
import useQueryBoost from './useQueryBoost';
import { createForm, Form, IFormProps } from '@formily/core';

type TableBoostProps = {
    where: any;
    limit: { current: 1; pageSize: 10; total: 0 };
    data: any;
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
                data: {},
            },
        },
        { cacheKey: 'table.' + ajaxUrl },
    );
    const queryBoostInfo = useQueryBoost(
        async (request) => {
            let result: any = await request({
                url: ajaxUrl,
                method: 'GET',
                data: {
                    ...formInfo.data.where,
                    ...formInfo.data.limit,
                },
            });
            (formInfo.data.data = result.data),
                (formInfo.data.limit.total = result.count);
        },
        {
            refreshDeps: [
                formInfo.data.limit.current,
                formInfo.data.limit.pageSize,
                formInfo.data.where,
            ],
        },
    );
    return {
        ...formInfo,
        ...queryBoostInfo,
    };
}

export default useTableBoost;
