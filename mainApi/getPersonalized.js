const request = require('./request');
async function getPersonalized() {
  const { data } = await request(`/personalized?limit=10`);
  return data;
};
module.exports = getPersonalized;