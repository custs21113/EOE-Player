import request from '../utils/request';

export default function getSong(ids: string = "1941900423") {
  return request(`/song/detail?ids=${ids}`);
};