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

async function GetReceiptList(token) {
  let endpoint = process.env.VUE_APP_GET_MENU_RECEIPT;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetReceiptById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_RECEIPT + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteReceiptById(token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_RECEIPT + "/" + id;

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

async function AddReceipt(receipt, ingredient_id, token) {
  let endpoint = process.env.VUE_APP_GET_MENU_RECEIPT;

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
            id: ingredient_id,
            type: "ingredient_ref",
          },
        },
      },
      attributes: {
        quantity: receipt.quantity,
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

async function UpdateReceiptById(receipt, ingredient_id, token, id) {
  let endpoint = process.env.VUE_APP_GET_MENU_RECEIPT + "/" + id;

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
            id: ingredient_id,
            type: "ingredient_ref",
          },
        },
      },
      attributes: {
        quantity: receipt.quantity,
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
  GetReceiptList,
  GetReceiptById,
  DeleteReceiptById,
  AddReceipt,
  UpdateReceiptById,
};
