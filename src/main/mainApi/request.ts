import axios from "axios";
// const BASE_URL = process.env.NODE_ENV ==="production" ? "http://192.168.51.6:3000" : "http://116.62.205.126:3001"
const BASE_URL = "http://47.96.178.131:3001"
const TIME_OUT = 3000;
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {},
    withCredentials: true
});


export default instance;