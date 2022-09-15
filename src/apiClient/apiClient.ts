import axios, {AxiosRequestConfig} from 'axios';
import {ToastTypes, ToastUtils} from '../utils/utils';

const BASE_ULR = 'https://my-json-server.typicode.com/tsevdos/epignosis-users/';

export const axiosInstance = axios.create({
    baseURL: BASE_ULR,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        ToastUtils.notifyToast(ToastTypes.ERROR, err.message);
        return Promise.reject(err);
    }
);

export const getService = async (url: string, config?: AxiosRequestConfig) =>
    axiosInstance
        .get(url, config)
        .then((res) => Promise.resolve(res))
        .catch((err) => Promise.reject(err));

export const putService = (url: string, data: any, config?: AxiosRequestConfig) =>
    axiosInstance
        .put(url, data, config)
        .then((res) => Promise.resolve(res))
        .catch((err) => Promise.reject(err));
