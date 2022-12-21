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

async function GetMealList(token) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL_MEAL;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetMealById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteMealById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL + "/" + id;

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

async function AddMeal(meal, token) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL;

  const body = {
    data: {
      id: "1",
      type: "meal",
      relationships: {
        category: {
          data: {
            id: meal.category.id,
            type: "category",
          },
        },
      },
      attributes: {
        meal_name: meal.meal_name,
        price: meal.price,
        amount: meal.amount,
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

async function UpdateMealById(meal, token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_MEAL + "/" + id;

  const body = {
    data: {
      id: "1",
      type: "meal",
      relationships: {
        category: {
          data: {
            id: meal.category.id,
            type: "category",
          },
        },
      },
      attributes: {
        meal_name: meal.meal_name,
        price: meal.price,
        amount: meal.amount,
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
  GetMealList,
  GetMealById,
  DeleteMealById,
  AddMeal,
  UpdateMealById,
};
