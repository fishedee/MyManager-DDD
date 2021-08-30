import { useHistory, useLocation } from 'umi';
import useForm from './useForm';
import useQuery from './useQuery';
import { createForm, Form, IFormProps } from '@formily/core';
import useRequest from './useRequest';

type DetailBoostProps = {
    detail: any;
};

type DetailBoostOptions = {
    add?: string;
    mod?: string;
    del?: string;
};

function useDetailBoost(
    getUrl: string,
    form: IFormProps<DetailBoostProps> = {},
    options?: DetailBoostOptions,
) {
    const location: any = useLocation();
    const history = useHistory();
    const id = location?.query?.id;
    let formInfo = useForm(
        {
            ...form,
            values: { detail: {} },
        },
        {
            cacheKey: id ? undefined : 'form.' + getUrl,
        },
    );
    const queryInfo = useQuery(
        async (request) => {
            let result = await request({
                method: 'GET',
                url: getUrl,
                data: {
                    id: id,
                },
            });
            if (result.status == 'fail') {
                return;
            }
            formInfo.data.detail = result.data;
        },
        {
            firstDidNotRefresh: !id,
        },
    );
    const request = useRequest();
    const add = async () => {
        let result = await request({
            method: 'POST',
            url: options?.add,
            data: {
                ...formInfo.data.detail,
            },
        });
        if (result.status == 'fail') {
            return;
        }
        formInfo.data.detail = {};
        history.goBack();
    };
    const mod = async () => {
        let result = await request({
            method: 'POST',
            url: options?.mod,
            data: {
                id: id,
                ...formInfo.data.detail,
            },
        });
        if (result.status == 'fail') {
            return;
        }
        history.goBack();
    };
    const del = async () => {
        let result = await request({
            method: 'POST',
            url: options?.del,
            data: {
                id: id,
            },
        });
        if (result.status == 'fail') {
            return;
        }
        history.goBack();
    };
    const save = async () => {
        if (id) {
            mod();
        } else {
            add();
        }
    };
    return {
        ...formInfo,
        ...queryInfo,
        add,
        mod,
        del,
        save,
        id,
        history,
    };
}

export default useDetailBoost;
