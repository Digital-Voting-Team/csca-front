<template>
  <div class="add-item">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addStaff">
      Add Staff
    </button>

    <div class="modal fade" id="addStaff" tabindex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addStaffLabel">Add a New Staff member</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label" for="name">Name</label>
              <input class="form-control" id="name" type="text" placeholder="Name" v-model="name" required />
            </div>
            <div class="mb-3">
              <label class="form-label" for="salary">Salary</label>
              <input class="form-control" id="salary" type="number" placeholder="Salary" v-model="salary" required />
            </div>
            <div class="mb-3">
              <label class="form-label" for="username">Username</label>
              <input class="form-control" id="username" type="text" placeholder="Username" v-model="username"
                required />
            </div>
            <div class="mb-3">
              <label class="form-label" for="password">Password</label>
              <input class="form-control" id="password" type="password" placeholder="Password" v-model="password"
                required />
            </div>
            <div class="alert alert-danger" role="alert" v-if="isError">
              A simple danger alert—check it out!
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleSubmit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";
import { AddAddress } from "@/requestsBackend/staffRequests/staff_address";
import { AddPerson } from "@/requestsBackend/person";
import { AddPosition } from "@/requestsBackend/staffRequests/position";
import { fullStaffRegistration } from "@/requestsBackend/auth";


export default {
  setup() {
    const addStaffRef = ref(null)

    const name = ref("");
    const salary = ref("");
    const username = ref("");
    const password = ref("");
    const showForm = ref(false);
    const isError = ref(false);
    const userStorage = useAuthUserStore();

    const handleSubmit = async () => {
      console.log("alskjf")
      const address = {
        building_number: 1,
        street: "string",
        city: "string",
        district: "string",
        region: "string",
        postal_code: "1",
      };
      const newAddress = await AddAddress(address, userStorage.token);

      const person = {
        address: {
          id: newAddress.data.id,
        },
        name: name.value,
        phone: "string",
        email: "string",
        birthday: "2006-01-02T15:00:00Z",
      };
      const newPerson = await AddPerson(person, userStorage.token);

      const position = {
        name: "New member",
        access_level: 1,
      };
      const newPosition = await AddPosition(position, userStorage.token);

      const staffRecord = {
        person: {
          id: newPerson.data.id,
        },
        position: {
          id: newPosition.data !== undefined ? newPosition.data.id : "2",
        },
        employment_date: "2006-01-02T15:00:00Z",
        salary: Number(salary.value),
        status: "busy",
      };
      await fullStaffRegistration(
        staffRecord,
        userStorage.token,
        username.value,
        password.value
      );
      showForm.value = false;
    };

    return {
      name,
      salary,
      username,
      password,
      showForm,
      isError,
      handleSubmit,
    };

  },
};
</script> 
