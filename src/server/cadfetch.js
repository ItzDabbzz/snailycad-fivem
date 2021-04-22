const axios = require("axios").default;

async function cadfetch(path, data) {
  const url = GetConvar("snailycad_url");
  return await axios({
    method: "POST",
    data,
    url: `${url}${path}`,
  });
};

module.exports = cadfetch;