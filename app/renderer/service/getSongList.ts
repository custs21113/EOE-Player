import request from '../utils/request';

export default async function getSongList(id: number = 19723756, limit: number = 0) {
  const result = await request(`/playlist/track/all?id=${id}${limit === 0 ? "" : `&limit=${limit}`}`);
  return result.data;
};