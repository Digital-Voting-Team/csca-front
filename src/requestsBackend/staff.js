async function fetchWithTokenAsync(url, token) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return await response.json();
}

async function staffReq(token) {
  let endpoint = process.env.VUE_APP_GET_STAFF;

  return await fetchWithTokenAsync(endpoint, token);
}

module.exports = {
  staffReq,
  fetchWithTokenAsync,
};
