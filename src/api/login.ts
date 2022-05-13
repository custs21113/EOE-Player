import axios from "axios";
function getQrKey() {
  return axios.get(
    `http://localhost:3000/login/qr/key?timerstamp=${Date.now()}`
  );
}
function login(key: string) {
  return axios.get(
    `http://localhost:3000/login/qr/create?key=${key}&qrimg=true?timerstamp=${Date.now()}`
  );
}
async function checkStatus(key: string) {
  const res = await axios({
    url: `http://localhost:3000/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
  });
  return res.data;
}
export { login, getQrKey, checkStatus };
