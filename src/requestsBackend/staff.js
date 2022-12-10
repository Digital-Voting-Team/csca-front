async function FetchWithTokenAsync(url, token) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  return await response.json();
}

async function GetStaffList(token) {
  let endpoint = process.env.VUE_APP_GET_STAFF;

  return await FetchWithTokenAsync(endpoint, token);
}

async function GetStaffById(token, id) {
  let endpoint = process.env.VUE_APP_GET_STAFF + "/" + id;

  return await FetchWithTokenAsync(endpoint, token);
}

async function DeleteStaffById(token, id) {
  let endpoint = process.env.VUE_APP_GET_STAFF + "/" + id;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token
    }
  });

  return await response.json();
}

async function AddStaff(staff, cafe_id, user_id, token) {
  let endpoint = process.env.VUE_APP_GET_STAFF;

  const body = {
    data: {
      type: "staff",
      relationships: {
        person: {
          data: {
            id: staff.person.id,
            type: "person"
          }
        },
        position: {
          data: {
            id: staff.position.id,
            type: "position"
          }
        },
        cafe: {
          data: {
            id: cafe_id,
            type: "cafe_ref"
          }
        },
        user: {
          data: {
            id: user_id,
            type: "user_ref"
          }
        }
      },
      attributes: {
        employment_date: staff.employment_date,
        salary: staff.salary,
        status: staff.status
      }
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(body, null, 2)
  });

  return response.json();
}

async function UpdateStaffById(staff, cafe_id, user_id, token, id) {
  let endpoint = process.env.VUE_APP_GET_STAFF + "/" + id;

  const body = {
    data: {
      type: "staff",
      relationships: {
        person: {
          data: {
            id: staff.person.id,
            type: "person"
          }
        },
        position: {
          data: {
            id: staff.position.id,
            type: "position"
          }
        },
        cafe: {
          data: {
            id: cafe_id,
            type: "cafe_ref"
          }
        },
        user: {
          data: {
            id: user_id,
            type: "user_ref"
          }
        }
      },
      attributes: {
        employment_date: staff.employment_date,
        salary: staff.salary,
        status: staff.status
      }
    }
  };

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(body, null, 2)
  });

  return response.json();
}

module.exports = {
  FetchWithTokenAsync,
  GetStaffList,
  GetStaffById,
  DeleteStaffById,
  AddStaff,
  UpdateStaffById
};
