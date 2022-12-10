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

async function GetPersonList(token) {
  let endpoint = process.env.VUE_APP_GET_PERSON;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetPersonById(token, id) {
  let endpoint = process.env.VUE_APP_GET_PERSON + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeletePersonById(token, id) {
  let endpoint = process.env.VUE_APP_GET_PERSON + "/" + id;

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

async function AddPerson(person, token) {
  let endpoint = process.env.VUE_APP_GET_PERSON;

  const body = {
    data: {
      id: "1",
      type: "person",
      relationships: {
        address: {
          data: {
            id: person.address.id,
            type: "address",
          },
        },
      },
      attributes: {
        name: person.name,
        phone: person.phone,
        email: person.email,
        birthday: person.birthday,
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

async function UpdatePersonById(person, token, id) {
  let endpoint = process.env.VUE_APP_GET_PERSON + "/" + id;

  const body = {
    data: {
      id: "1",
      type: "person",
      relationships: {
        address: {
          data: {
            id: person.address.id,
            type: "address",
          },
        },
      },
      attributes: {
        name: person.name,
        phone: person.phone,
        email: person.email,
        birthday: person.birthday,
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
  GetPersonList,
  GetPersonById,
  DeletePersonById,
  AddPerson,
  UpdatePersonById,
};
