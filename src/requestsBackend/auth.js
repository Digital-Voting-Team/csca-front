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

const { AuthRecord } = require("@/js/records/auth.record");
const { AddStaff } = require("@/requestsBackend/staff");
const { StaffRecord } = require("@/js/records/staff.record");
const { CustomerRecord } = require("@/js/records/customer.record");
const { AddCustomer } = require("@/requestsBackend/customer");

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
      endpoint = process.env.VUE_APP_LOGIN;
      break;
    case "register":
      endpoint = process.env.VUE_APP_REGISTER;
      break;
    case "logout":
      endpoint = process.env.VUE_APP_LOGOUT;
      break;
    default:
      break;
  }

  return await fetchAsync(endpoint, body);
}

async function fullStaffRegistration(
  staff,
  token,
  username = "AlexDef2",
  password = "string"
) {
  try {
    const authResp = new AuthRecord(
      (await authReq("register", username, password)).data
    );
    console.log(authResp);
    const staffResp = await AddStaff(staff, "0", authResp.user_id, token);
    console.log(staffResp);
    return new StaffRecord(staffResp.data);
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function fullCustomerRegistration(
  customer,
  username = "AlexDef2",
  password = "string"
) {
  try {
    const authResp = new AuthRecord(
      (await authReq("register", username, password)).data
    );
    const customerResp = await AddCustomer(
      customer,
      authResp.user_id,
      authResp.token
    );
    return new CustomerRecord(customerResp.data);
  } catch (e) {
    console.log(e);
  }
  return null;
}

module.exports = {
  authReq,
  fullStaffRegistration,
  fetchAsync,
};
