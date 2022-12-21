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

async function GetOrderList(token) {
  let endpoint = process.env.VUE_APP_GET_ORDER;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetOrderById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteOrderById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER + "/" + id;

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

async function AddOrder(order, staff_id, cafe_id, customer_id, token) {
  let endpoint = process.env.VUE_APP_GET_ORDER;

  const body = {
    data: {
      id: "1",
      type: "order",
      relationships: {
        status: {
          data: {
            id: order.status.id,
            type: "status",
          },
        },
        cafe: {
          data: {
            id: cafe_id,
            type: "cafe_ref",
          },
        },
        staff: {
          data: {
            id: staff_id,
            type: "staff_ref",
          },
        },
        customer: {
          data: {
            id: customer_id,
            type: "customer_ref",
          },
        },
      },
      attributes: {
        total_price: order.total_price,
        payment_method: order.payment_method,
        is_take_away: order.is_take_away,
        order_date: order.order_date,
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

async function UpdateOrderById(order, staff_id, cafe_id, customer_id, token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER + "/" + id;

  const body = {
    data: {
      id: "1",
      type: "order",
      relationships: {
        status: {
          data: {
            id: order.status.id,
            type: "status",
          },
        },
        cafe: {
          data: {
            id: cafe_id,
            type: "cafe_ref",
          },
        },
        staff: {
          data: {
            id: staff_id,
            type: "staff_ref",
          },
        },
        customer: {
          data: {
            id: customer_id,
            type: "customer_ref",
          },
        },
      },
      attributes: {
        total_price: order.total_price,
        payment_method: order.payment_method,
        is_take_away: order.is_take_away,
        order_date: order.order_date,
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
  GetOrderList,
  GetOrderById,
  DeleteOrderById,
  AddOrder,
  UpdateOrderById,
};
