type CallbackType = (...args: any[]) => Promise<any> | any;

type ErrorCatchHandler = (e: Error) => void;

let globalHasCatch = false;

let globalErrorCatchHandler: ErrorCatchHandler = (e: Error) => {
    console.error(e);
};

export function replaceErrorHandler(handler: ErrorCatchHandler) {
    globalErrorCatchHandler = handler;
}

function useErrorCatch<T extends CallbackType>(callback: T): T {
    let result = async (...any: any[]) => {
        if (globalHasCatch == true) {
            return await callback(...any);
        } else {
            try {
                globalHasCatch = true;
                let result = await callback(...any);
                globalHasCatch = false;
                return result;
            } catch (e) {
                globalHasCatch = false;
                globalErrorCatchHandler(e);
            }
        }
    };
    return result as T;
}

export default useErrorCatch;
