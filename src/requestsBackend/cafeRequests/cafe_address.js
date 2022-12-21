async function FetchWithTokenAsync(url, token) {
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

async function GetAddressList(token) {
  let endpoint = process.env.VUE_APP_GET_CAFE_ADDRESS;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetAddressById(token, id) {
  let endpoint = process.env.VUE_APP_GET_CAFE_ADDRESS + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteAddressById(token, id) {
  let endpoint = process.env.VUE_APP_GET_CAFE_ADDRESS + "/" + id;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return await response.json();
}

async function AddAddress(address, token) {
  let endpoint = process.env.VUE_APP_GET_CAFE_ADDRESS;

  const body = {
    data: {
      attributes: {
        building_number: address.building_number,
        street: address.street,
        city: address.city,
        district: address.district,
        region: address.region,
        postal_code: address.postal_code,
      },
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body, null, 2),
  });

  return response.json();
}

async function UpdateAddressById(address, token, id) {
  let endpoint = process.env.VUE_APP_GET_CAFE_ADDRESS + "/" + id;

  const body = {
    data: {
      attributes: {
        building_number: address.building_number,
        street: address.street,
        city: address.city,
        district: address.district,
        region: address.region,
        postal_code: address.postal_code,
      },
    },
  };

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body, null, 2),
  });

  return response.json();
}

module.exports = {
  GetAddressList,
  GetAddressById,
  DeleteAddressById,
  AddAddress,
  UpdateAddressById,
};
