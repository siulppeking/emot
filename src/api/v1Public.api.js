import axios from "axios";

export const v1PublicApi = axios.create({
    baseURL: `${import.meta.env.VITE_RESTAPI_SEGURIDAD}/api/v1`
});

v1PublicApi.interceptors.request.use(async config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
})