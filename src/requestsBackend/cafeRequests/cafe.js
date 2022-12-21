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

async function GetCafeList(token) {
  let endpoint = process.env.VUE_APP_GET_CAFE;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetCafeById(token, id) {
  let endpoint = process.env.VUE_APP_GET_CAFE + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteCafeById(token, id) {
  let endpoint = process.env.VUE_APP_GET_CAFE + "/" + id;

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

async function AddCafe(cafe, token) {
  let endpoint = process.env.VUE_APP_GET_CAFE;

  const body = {
    data: {
      id: "1",
      type: "cafe",
      relationships: {
        address: {
          data: {
            id: cafe.address.id,
            type: "address",
          },
        },
      },
      attributes: {
        cafe_name: cafe.cafe_name,
        rating: cafe.rating,
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

async function UpdateCafeById(cafe, token, id) {
  let endpoint = process.env.VUE_APP_GET_CAFE + "/" + id;

  const body = {
    data: {
      id: "1",
      type: "cafe",
      relationships: {
        address: {
          data: {
            id: cafe.address.id,
            type: "address",
          },
        },
      },
      attributes: {
        cafe_name: cafe.cafe_name,
        rating: cafe.rating,
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
  GetCafeList,
  GetCafeById,
  DeleteCafeById,
  AddCafe,
  UpdateCafeById,
};
