import axios from 'axios';
const BASE_URL = "http://localhost:3000";
const TIME_OUT = 3000;
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {},
    withCredentials: true
});


export default instance;