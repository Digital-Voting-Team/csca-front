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

async function GetMenuList(token) {
  let endpoint = process.env.VUE_APP_GET_MENU;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetMenuById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteMenuById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU + "/" + id;

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

async function AddMenu(menu, cafe_id, token) {
  let endpoint = process.env.VUE_APP_GET_MENU;

  const body = {
    data: {
      type: "menu",
      relationships: {
        cafe: {
          data: {
            id: cafe_id,
            type: "cafe_ref",
          },
        },
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

async function UpdateMenuById(menu, cafe_id, token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU + "/" + id;

  const body = {
    data: {
      type: "menu",
      relationships: {
        cafe: {
          data: {
            id: cafe_id,
            type: "cafe_ref",
          },
        },
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
  GetMenuList,
  GetMenuById,
  DeleteMenuById,
  AddMenu,
  UpdateMenuById,
};
