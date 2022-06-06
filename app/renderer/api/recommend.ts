function getPersonalized(): any {
  const url = "http://localhost:3000/personalized?limit=10";
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.response.toString(),
            headers: xhr.getAllResponseHeaders(),
            request: xhr,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject(new Error(`请求失败，状态码为${xhr.status}`));
        }
      }
    };
  });
}
export { getPersonalized };