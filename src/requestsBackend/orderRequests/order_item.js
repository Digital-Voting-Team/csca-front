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

async function GetOrderItemList(token) {
  let endpoint = process.env.VUE_APP_GET_ORDER_ITEM;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetOrderItemById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_ITEM + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteOrderItemById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_ITEM + "/" + id;

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

async function AddOrderItem(orderItem, meal_id, token) {
  let endpoint = process.env.VUE_APP_GET_ORDER_ITEM;

  const body = {
    data: {
      id: "1",
      type: "order_item",
      relationships: {
        order: {
          data: {
            id: orderItem.order.id,
            type: "order",
          },
        },
        meal: {
          data: {
            id: meal_id,
            type: "meal_ref",
          },
        },
      },
      attributes: {
        quantity: orderItem.quantity,
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

async function UpdateOrderItemById(orderItem, meal_id, token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_ITEM + "/" + id;

  const body = {
    data: {
      id: "1",
      type: "order_item",
      relationships: {
        order: {
          data: {
            id: orderItem.order.id,
            type: "order",
          },
        },
        meal: {
          data: {
            id: meal_id,
            type: "meal_ref",
          },
        },
      },
      attributes: {
        quantity: orderItem.quantity,
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
  GetOrderItemList,
  GetOrderItemById,
  DeleteOrderItemById,
  AddOrderItem,
  UpdateOrderItemById,
};
