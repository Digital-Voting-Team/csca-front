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

async function GetCustomerList(token) {
  let endpoint = process.env.VUE_APP_GET_CUSTOMER;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetCustomerById(token, id) {
  let endpoint = process.env.VUE_APP_GET_CUSTOMER + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteCustomerById(token, id) {
  let endpoint = process.env.VUE_APP_GET_CUSTOMER + "/" + id;

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

async function AddCustomer(customer, user_ref, token) {
  let endpoint = process.env.VUE_APP_GET_CUSTOMER;

  const body = {
    type: "customer",
    relationships: {
      person: {
        data: {
          id: customer.person.id,
          type: "person",
        },
      },
      user: {
        data: {
          id: user_ref,
          type: "user_ref",
        },
      },
    },
    attributes: {
      registration_date: customer.registration_date,
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

async function UpdateCustomerById(customer, user_ref, token, id) {
  let endpoint = process.env.VUE_APP_GET_CUSTOMER + "/" + id;

  const body = {
    type: "customer",
    relationships: {
      person: {
        data: {
          id: customer.person.id,
          type: "person",
        },
      },
      user: {
        data: {
          id: user_ref,
          type: "user_ref",
        },
      },
    },
    attributes: {
      registration_date: customer.registration_date,
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
  GetCustomerList,
  GetCustomerById,
  DeleteCustomerById,
  AddCustomer,
  UpdateCustomerById,
};
