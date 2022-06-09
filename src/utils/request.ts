import axios from 'axios';
// const BASE_URL = process.env.NODE_ENV === "producation" ? "http://116.62.205.126:3001" : "http://192.168.51.6:3000";
const BASE_URL = "http://116.62.205.126:3001";
const TIME_OUT = 3000;
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {},
    withCredentials: true
});


export default instance;