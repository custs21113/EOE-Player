import request from '../utils/request';

export default async function getSong(id: string = "24381616") {
  const result = await request(`/playlist/track/all?id=${id}`);
  return result.data;
};