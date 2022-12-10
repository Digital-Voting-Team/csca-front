import { FetchWithTokenAsync } from "@/requestsBackend/staff";

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
      Authorization: token
    }
  });

  return await response.json();
}

async function AddPosition(position, token) {
  let endpoint = process.env.VUE_APP_GET_POSITION;

  const body = {
    type: "position",
    attributes: {
      name: position.name,
      access_level: position.access_level
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

async function UpdatePositionById(position, token, id) {
  let endpoint = process.env.VUE_APP_GET_POSITION + "/" + id;

  const body = {
    type: "position",
    attributes: {
      name: position.name,
      access_level: position.access_level
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
  GetPositionList,
  GetPositionById,
  DeletePositionById,
  AddPosition,
  UpdatePositionById
};
