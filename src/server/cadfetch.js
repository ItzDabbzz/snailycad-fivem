const axios = require("axios").default;

exports('cadfetch', async function (path, data) {
  const url = GetConvar("snailycad_url");
  console.log(data);
  return await axios({
    method: "POST",
    data,
    url: `${url}${path}`,
  });
});
