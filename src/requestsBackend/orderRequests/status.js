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

async function GetStatusList(token) {
  let endpoint = process.env.VUE_APP_GET_ORDER_STATUS;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetStatusById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_STATUS + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteStatusById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_STATUS + "/" + id;

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

async function AddStatus(status, token) {
  let endpoint = process.env.VUE_APP_GET_ORDER_STATUS;

  const body = {
    data: {
      attributes: {
        status_name: status.status_name,
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

async function UpdateStatusById(status, token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_STATUS + "/" + id;

  const body = {
    data: {
      attributes: {
        status_name: status.status_name,
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
  GetStatusList,
  GetStatusById,
  DeleteStatusById,
  AddStatus,
  UpdateStatusById,
};
