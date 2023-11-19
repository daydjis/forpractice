import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const $api = axios.create({
    baseURL: "https://backend-mu-dun.vercel.app",
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials':true
    }
});

const url = "https://backend-mu-dun.vercel.app/users/login";

const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url
}

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
