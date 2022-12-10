import { FetchWithTokenAsync } from "@/requestsBackend/staff";

async function GetAddressList(token) {
  let endpoint = process.env.VUE_APP_GET_ADDRESS;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetAddressById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ADDRESS + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteAddressById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ADDRESS + "/" + id;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token
    }
  });

  return await response.json();
}

async function AddAddress(address, token) {
  let endpoint = process.env.VUE_APP_GET_ADDRESS;

  const body = {
    type: "address",
    attributes: {
      building_number: address.building_number,
      street: address.street,
      city: address.city,
      district: address.district,
      region: address.region,
      postal_code: address.postal_code
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(body, null, 2)
  });

  return response.json();
}

async function UpdateAddressById(address, token, id) {
  let endpoint = process.env.VUE_APP_GET_ADDRESS + "/" + id;

  const body = {
    type: "address",
    attributes: {
      building_number: address.building_number,
      street: address.street,
      city: address.city,
      district: address.district,
      region: address.region,
      postal_code: address.postal_code
    }
  };

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(body, null, 2)
  });

  return response.json();
}

module.exports = {
  FetchWithTokenAsync,
  GetAddressList,
  GetAddressById,
  DeleteAddressById,
  AddAddress,
  UpdateAddressById
};
