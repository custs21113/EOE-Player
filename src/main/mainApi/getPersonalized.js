const request = require('./request');
async function getPersonalized(num = 10) {
  const { data } = await request(`/personalized?limit=${num}`);
  return data;
};
module.exports = getPersonalized;