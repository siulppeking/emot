import axios from "axios";

export const v1PublicApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASEAPI_EMOT}/api/v1`
});

v1PublicApi.interceptors.request.use(async config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
})