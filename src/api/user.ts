import axios from "axios";
import request from "../utils/request";
function account() {
  return request(
    `/user/cloud?cookie=${encodeURIComponent(document.cookie)}`, {
      withCredentials: true
    }
  );
}
export { account };
