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

async function GetDeliveryList(token) {
  let endpoint = process.env.VUE_APP_GET_ORDER_DELIVERY;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetDeliveryById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_DELIVERY + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteDeliveryById(token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_DELIVERY + "/" + id;

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

async function AddDelivery(delivery, staff_id, token) {
  let endpoint = process.env.VUE_APP_GET_ORDER_DELIVERY;

  const body = {
    data: {
      id: "1",
      type: "delivery",
      relationships: {
        status: {
          data: {
            id: delivery.order.id,
            type: "order",
          },
        },
        address: {
          data: {
            id: delivery.address.id,
            type: "address",
          },
        },
        staff: {
          data: {
            id: staff_id,
            type: "staff_ref",
          },
        },
      },
      attributes: {
        delivery_price: delivery.delivery_price,
        delivery_date: delivery.delivery_date,
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

async function UpdateDeliveryById(delivery, staff_id, token, id) {
  let endpoint = process.env.VUE_APP_GET_ORDER_DELIVERY + "/" + id;

  const body = {
    data: {
      id: "1",
      type: "delivery",
      relationships: {
        status: {
          data: {
            id: delivery.order.id,
            type: "order",
          },
        },
        address: {
          data: {
            id: delivery.address.id,
            type: "address",
          },
        },
        staff: {
          data: {
            id: staff_id,
            type: "staff_ref",
          },
        },
      },
      attributes: {
        delivery_price: delivery.delivery_price,
        delivery_date: delivery.delivery_date,
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
  GetDeliveryList,
  GetDeliveryById,
  DeleteDeliveryById,
  AddDelivery,
  UpdateDeliveryById,
};
