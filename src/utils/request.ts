import axios from 'axios';
const BASE_URL = process.env.NODE_ENV === "producation" ? "http://www.nougat.online:3001" : "http://www.nougat.online:3001";
// const BASE_URL = "http://116.62.205.126:3001";
const TIME_OUT = 3000;
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {},
    withCredentials: true
});


export default instance;