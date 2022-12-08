// body example:
//  body: `{
//    "Id": 78912,
//    "Customer": "Jason Sweet",
//    "Quantity": 1,
//    "Price": 18.00
// //   }`,
// const SHA256 = require("crypto-js/sha256");
//
// function hash(string) {
//   return SHA256(string);
// }

async function fetchAsync(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body, null, 2),
  });

  return await response.json();
}

async function authReq(
  type = "login",
  username = "AlexDef2",
  password = "string"
) {
  const body = {
    data: {
      attributes: {
        username: username,
        password: password,
      },
    },
  };
  let endpoint;
  switch (type) {
    case "login":
      endpoint =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_LOGIN
          : process.env.VUE_APP_LOGIN_LOCAL;
      break;
    case "register":
      endpoint =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_REGISTER
          : process.env.VUE_APP_REGISTER_LOCAL;
      break;
    case "logout":
      endpoint =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_LOGOUT
          : process.env.VUE_APP_LOGOUT_LOCAL;
      break;
    default:
      break;
  }

  return await fetchAsync(endpoint, body);
}

module.exports = {
  authReq,
  fetchAsync,
};
