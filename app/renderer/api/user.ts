import axios from "axios";
function account() {
  return axios.get(
    `http://localhost:3000/user/cloud?cookie=${encodeURIComponent(document.cookie)}`, {
      withCredentials: true
    }
  );
}
export { account };
