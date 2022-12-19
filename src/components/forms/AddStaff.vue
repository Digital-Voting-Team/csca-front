<template>
  <div class="add-item">
    <button v-if="!showForm" @click="showForm = true">Add Staff</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Staff member</h4>
      <input type="text" placeholder="Name" required v-model="name" />
      <input type="text" placeholder="Salary" required v-model="salary" />
      <input type="text" placeholder="Username" required v-model="username" />
      <input type="text" placeholder="Password" required v-model="password" />
      <button>Add</button>
      <p v-if="isError">Could not execute operation</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";
import { AddStaff } from "@/requestsBackend/staff";
import { StaffRecord } from "@/js/records/staff.record";
import { AddAddress } from "@/requestsBackend/address";
import { AddressRecord } from "@/js/records/address.record";
import { PersonRecord } from "@/js/records/person.record";
import { AddPerson } from "@/requestsBackend/person";
import { AddPosition } from "@/requestsBackend/position";
import { fullStaffRegistration } from "@/requestsBackend/auth";

export default {
  setup() {
    const name = ref("");
    const salary = ref("");
    const username = ref("");
    const password = ref("");
    const showForm = ref(false);
    const isError = ref(false);
    const userStorage = useAuthUserStore();

    const handleSubmit = async () => {
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

<style scoped>
.add-item {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
