import request from 'request';
export default async function getPersonalized(num: number = 10) {
  const { data } = await request(`/personalized?limit=${num}`);
  return data;
};
