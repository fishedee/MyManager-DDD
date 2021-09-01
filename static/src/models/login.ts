import { useState, useCallback } from 'react';
import request from '@/util/request';
import Result from '@/hooks/Result';

type User = {
    id: number;
    name: string;
    roles: string;
};
export default function useLoginModel() {
    const [login, setLogin] = useState<User | undefined>(undefined);

    const checkLogin = async (): Promise<Result<User>> => {
        let result = await request({
            method: 'GET',
            url: '/login/islogin',
        });
        if (result.status == 'fail') {
            return result;
        }
        let data: User = result.data;
        setLogin(data);
        return {
            status: 'success',
            data: data,
        };
    };

    return {
        login,
        checkLogin,
    };
}
