import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

type AxoisFetch = (config: AxiosRequestConfig) => AxiosPromise;

const codeMessage = new Map<number, string>([
    [200, '服务器成功返回请求的数。'],
    [201, '新建或修改数据成功。'],
    [202, '一个请求已经进入后台排队（异步任务）。'],
    [204, '删除数据成功。'],
    [400, '发出的请求有错误，服务器没有进行新建或修改数据的操作。'],
    [401, '用户没有权限（令牌、用户名、密码错误）。'],
    [403, '用户得到授权，但是访问是被禁止的。'],
    [404, '发出的请求针对的是不存在的记录，服务器没有进行操作。'],
    [406, '请求的格式不可得。'],
    [410, '请求的资源被永久删除，且不会再得到的。'],
    [422, '当创建一个对象时，发生一个验证错误。'],
    [500, '服务器发生错误，请检查服务器。'],
    [502, '网关错误。'],
    [503, '服务不可用，服务器暂时过载或维护。'],
    [504, '网关超时。'],
]);

function checkStatus(response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    const errortext: string =
        codeMessage.get(response.status) || response.statusText;
    const error: any = new Error(
        `请求错误 ${response.status}: ${response.request}：${errortext}`,
    );
    throw error;
}

function checkBody(response: ResponseDataType) {
    if (response.code == 0) {
        return;
    }
    const error: any = new Error(response.msg);
    throw error;
}

function getCookie(name: string) {
    var strcookie = document.cookie; //获取cookie字符串
    var arrcookie = strcookie.split('; '); //分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=');
        if (arr[0] == name) {
            return arr[1];
        }
    }
    return '';
}

export type ResponseDataType = {
    code: number;
    msg: string;
    data: any;
};

type AxiosExtendRequestConfig = AxiosRequestConfig;

export default async function request(
    fetch: AxoisFetch,
    options: AxiosExtendRequestConfig,
) {
    //添加csrf头部
    if (!options.headers) {
        options.headers = {};
    }
    options.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');

    //添加url随机数，以避免缓存
    if (!options.params) {
        options.params = {};
    }
    options.params['_t'] = new Date().valueOf();

    //转换GET请求的data参数
    if (options.method == 'GET' && options.data) {
        let queryStr = JSON.stringify(options.data);
        options.params['data'] = queryStr;
        options.data = undefined;
    }

    let response = await fetch(options);
    checkStatus(response);

    let data: ResponseDataType = response.data;
    checkBody(data);

    return data.data;
}