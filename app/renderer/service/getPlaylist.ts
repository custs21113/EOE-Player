import request from '../utils/request';

export default function getPlaylist(): Promise<any> {
  return request(`/toplist`);
};