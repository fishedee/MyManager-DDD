import { useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { observe } from '@formily/reactive';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export type UseQueryRequest = (config: AxiosRequestConfig) => AxiosPromise;

export type UseQueryFetch = (data: UseQueryRequest) => Promise<void> | void;

export type UseQueryOptions = {
    refreshDeps?: any[];
    firstDidNotRefresh?: boolean;
};

export class UseQueryConcurrentError extends Error {}

interface IDispose {
    (): void;
}

/*
 * 设计目标：
 * loading，加载展示，不能以loading直接写入到外部data字段，这样侵入性太大了。目前只能以全刷新的react方式提供useState方式
 * 冲突，同一个请求，分两次触发，先触发的请求可能后到达，从而造成并发冲突，这是能useRef的来解决。
 *       同时，我们为用户提供了axios的接口，在axios的封装接口中做了手脚，当数据返回以后，检查ref的返回值来决定是否产生了冲突。
 * 局部刷新，与ahooks，react-query等普通hook库不同的是，我们拿到ajax的数据以后，不希望以react的方式刷新页面（全页刷新），而是通过赋值到响应式数据到刷新页面（局部刷新）。
 *      与此同时，我们不希望用户传入具体的响应式数据来帮他赋值，所以，目前的接口设计是让用户传入闭包，自己拉了数据以后，自己去赋值到响应式数据。但是由于要配合冲突检查，所以ajax接口必须是useQuery提供axios接口
 * 首次刷新，我们可以通过传入firstDidNotRefresh，来控制首次是否触发refresh
 * 数据变更自动刷新，页码变化，左侧树选择时，我们需要重新拉ajax。这种场景下，直接传数据自身，会自动检查数据是否变更了，来触发refresh。
 *      与react的不同，这里的数据检查同时支持了基础数据检查，与复杂数据检查，而不是简单的引用检查，这样性能更好，也更使用。我们可以深度侦听整个filter数据是否变化来触发refresh
 * 按钮刷新，其他场景，通过onClick等方式的刷新，所以我们对外提供了fetch接口，onClick直接绑定到这个fetch接口上就可以了
 * 不缓存，useQuery不提供缓存，缓存有useForm来提供，原因看useForm
 * 全局异常捕捉，当fetch中发生了错误以后，会自动捕捉错误
 */

function useQuery(fetch: UseQueryFetch, options?: UseQueryOptions) {
    const [loading, setLoading] = useState(false);

    const ref = useRef(0);

    const firstRender = useRef(true);

    const deps = (function () {
        let basicDeps = [];
        let otherDeps = [];
        if (options?.refreshDeps) {
            for (let i = 0; i != options.refreshDeps.length; i++) {
                let singleDep = options.refreshDeps[i];
                if (
                    typeof singleDep == 'number' ||
                    typeof singleDep == 'string' ||
                    typeof singleDep == 'boolean'
                ) {
                    basicDeps.push(singleDep);
                } else {
                    otherDeps.push(singleDep);
                }
            }
        }
        return { basicDeps, otherDeps };
    })();

    const request: UseQueryRequest = async (config: AxiosRequestConfig) => {
        //当页面手动触发的时候，标记以前请求失败
        ref.current++;
        let current = ref.current;
        setLoading(true);
        let data = await axios(config);
        setLoading(false);
        if (current != ref.current) {
            //发生了冲突
            throw new UseQueryConcurrentError();
        }
        return data;
    };

    let manualFetch = useCallback(async () => {
        try {
            await fetch(request);
        } catch (e) {
            if (e instanceof UseQueryConcurrentError) {
                //省略Conflit错误
                return;
            }
            console.error(e);
        }
    }, []);

    useEffect(() => {
        //对于复杂对象，使用observe来做监听
        let observeDispose: IDispose[] = [];
        for (let i = 0; i != deps.otherDeps.length; i++) {
            let dispose = observe(deps.otherDeps[i], manualFetch);
            observeDispose.push(dispose);
        }

        return () => {
            //退出的时候进行
            for (let i = 0; i != observeDispose.length; i++) {
                observeDispose[i]();
            }
        };
    }, deps.otherDeps);

    useEffect(() => {
        if (firstRender.current) {
            //第一次渲染
            if (options?.firstDidNotRefresh === true) {
                //首次不fetch
            } else {
                //其他情况fetch
                manualFetch();
            }
            firstRender.current = false;
        } else {
            //非第一次渲染
            manualFetch();
        }
        return () => {
            //当页面重刷的时候，标记以前请求失败
            ref.current++;
        };
        //基础对象，使用React的方法来监听
    }, deps.basicDeps);

    return { fetch: manualFetch, loading };
}

export default useQuery;
