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

async function GetPositionList(token) {
  let endpoint = process.env.VUE_APP_GET_POSITION;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetPositionById(token, id) {
  let endpoint = process.env.VUE_APP_GET_POSITION + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeletePositionById(token, id) {
  let endpoint = process.env.VUE_APP_GET_POSITION + "/" + id;

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

async function AddPosition(position, token) {
  let endpoint = process.env.VUE_APP_GET_POSITION;

  const body = {
    data: {
      type: "position",
      attributes: {
        name: position.name,
        access_level: position.access_level,
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

async function UpdatePositionById(position, token, id) {
  let endpoint = process.env.VUE_APP_GET_POSITION + "/" + id;

  const body = {
    data: {
      type: "position",
      attributes: {
        name: position.name,
        access_level: position.access_level,
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
  GetPositionList,
  GetPositionById,
  DeletePositionById,
  AddPosition,
  UpdatePositionById,
};
