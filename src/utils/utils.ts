import {Theme, ToastOptions, toast} from 'react-toastify';

export enum ToastTypes {
    SUCCESS,
    ERROR,
    INFO,
    WARNING,
}

export namespace ToastUtils {
    const toastConfig: ToastOptions = {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored' as Theme,
    };

    export const notifyToast = (
        type: ToastTypes,
        message: string,
        customOptions?: ToastOptions
    ) => {
        let toastFn;

        const configs = {
            ...toastConfig,
            ...customOptions,
        };

        switch (type) {
            case ToastTypes.SUCCESS:
                toastFn = () => toast.success(message, configs);
                break;
            case ToastTypes.ERROR:
                toastFn = () => toast.error(message, configs);
                break;
            case ToastTypes.INFO:
                toastFn = () => toast.info(message, configs);
                break;
            case ToastTypes.WARNING:
                toastFn = () => toast.warn(message, configs);
                break;
            default:
                toastFn = () => {};
        }

        return toastFn();
    };
}
