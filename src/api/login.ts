import axios from "axios";
import request from "../utils/request";
function getQrKey() {
  return request(
    `/login/qr/key?timerstamp=${Date.now()}`
  );
}
function login(key: string) {
  return request(
    `/login/qr/create?key=${key}&qrimg=true?timerstamp=${Date.now()}`
  );
}
async function checkStatus(key: string) {
  const res = await request({
    url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
  });
  return res.data;
}
export { login, getQrKey, checkStatus };
