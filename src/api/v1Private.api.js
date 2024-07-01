import axios from "axios";

export const v1PrivateApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASEAPI_EMOT}/api/v1`
});

v1PrivateApi.interceptors.request.use(async config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
})