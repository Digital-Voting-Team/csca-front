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

async function GetMealMenuList(token) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL_MENU;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetMealMenuById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL_MENU + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteMealMenuById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL_MENU + "/" + id;

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

async function AddMealMenu(receipt, token) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL_MENU;

  const body = {
    data: {
      type: "receipt",
      relationships: {
        meal: {
          data: {
            id: receipt.meal.id,
            type: "meal",
          },
        },
        ingredient: {
          data: {
            id: receipt.menu.id,
            type: "menu",
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

async function UpdateMealMenuById(receipt, token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL_MENU + "/" + id;

  const body = {
    data: {
      type: "receipt",
      relationships: {
        meal: {
          data: {
            id: receipt.meal.id,
            type: "meal",
          },
        },
        ingredient: {
          data: {
            id: receipt.menu.id,
            type: "menu",
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
  GetMealMenuList,
  GetMealMenuById,
  DeleteMealMenuById,
  AddMealMenu,
  UpdateMealMenuById,
};
