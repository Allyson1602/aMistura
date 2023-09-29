import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    responseType: 'json',
    // xsrfCookieName: 'XSRF-TOKEN',
});

export default instance;