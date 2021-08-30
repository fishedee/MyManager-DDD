import 'zone.js';

type CallbackType = (...args: any[]) => Promise<any> | any;

type ErrorCatchHandler = (e: any) => void;

let errorZone = Zone.current.fork({
    name: 'errorZone',
    properties: {
        hasGlobalCatch: true,
    },
});

let globalErrorCatchHandler: ErrorCatchHandler = (e: any) => {
    console.error(e);
};

export function replaceErrorHandler(handler: ErrorCatchHandler) {
    globalErrorCatchHandler = handler;
}

/*
 * 设计目标：
 * 以异常为基础，当其中一个流程抛出异常以后，其他流程自动忽略掉，避免运行
 * 自动捕捉并输出错误，当useErrorCatch包装过的方法，方法出现错误以后，会在自动catch异常，并输出错误
 * 可组合（难点），useErrorCatch的返回的方法A，可以放在另外一个useErrorCatch包装的方法B的流程中，那么异常就会在方法B的顶层中捕捉，而不是在方法A中捕捉
 * 误区：
 * 非异常用返回值Error来判断，能用而且简单，就是麻烦一点，没有Zone.js支持的时候这是最好的方法。
 * 使用全局变量代替Zone，这种方法是错误的，因为js是响应式单线程模型，不同处理链的请求都可能会交叉触发，只用一个全局变量来标注hasGlobalCatch会出问题的。
 * 使用uncaught库，侵入性大，捕捉了所有请求，而且即使捕捉了，在开发模式依然会自动捕捉这类错误，还是会报错
 * 缺点：
 * 调试很乱，代码栈难看
 * 与Antd的Select不兼容!!!!!!!，崩溃了
 */

function useErrorCatch<T extends CallbackType>(callback: T): T {
    let result = async (...args: any[]) => {
        let hasGlobalCatch = Zone.current.get('hasGlobalCatch');
        if (hasGlobalCatch) {
            return await callback(...args);
        } else {
            return new Promise((resolve, reject) => {
                errorZone.run(async () => {
                    try {
                        let result = await callback(...args);
                        resolve(result);
                    } catch (e) {
                        globalErrorCatchHandler(e);
                    }
                });
            });
        }
    };
    return result as T;
}

export default useErrorCatch;
