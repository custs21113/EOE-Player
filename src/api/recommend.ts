import { ipcRenderer } from "../utils/bridge";
import request from "../utils/request";

// import { ipcRenderer } from '../utils/bridge';
async function getPersonalized(num: number = 10): Promise<any> {
  // return ipcRenderer.invoke('getPersonalized')
  if(process.env.NODE_ENV === "development") {
    const { data } = await request(`/personalized?limit=${num}`);
    return data;
  } else {
    return await ipcRenderer.invoke('getPersonalized')
  }
  
  // return new Promise((resolve, reject) => {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open("GET", url);
  //   xhr.send();
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status >= 200 && xhr.status < 300) {
  //         resolve({
  //           data: xhr.response.toString(),
  //           headers: xhr.getAllResponseHeaders(),
  //           request: xhr,
  //           status: xhr.status,
  //           statusText: xhr.statusText,
  //         });
  //       } else {
  //         reject(new Error(`请求失败，状态码为${xhr.status}`));
  //       }
  //     }
  //   };
  // });
}
export { getPersonalized };