import request from '../utils/request';

export default function getLyric(id: number): Promise<any> {
  return request(`/lyric?id=${id}`);
};