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

async function GetCategoryList(token) {
  let endpoint = process.env.VUE_APP_GET_MENU_CATEGORY;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetCategoryById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_CATEGORY + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteCategoryById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_CATEGORY + "/" + id;

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

async function AddCategory(category, token) {
  let endpoint = process.env.VUE_APP_GET_MENU_CATEGORY;

  const body = {
    data: {
      attributes: {
        category_name: category.category_name,
        unit: category.unit,
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

async function UpdateCategoryById(category, token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_CATEGORY + "/" + id;

  const body = {
    data: {
      attributes: {
        category_name: category.category_name,
        unit: category.unit,
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
  GetCategoryList,
  GetCategoryById,
  DeleteCategoryById,
  AddCategory,
  UpdateCategoryById,
};
