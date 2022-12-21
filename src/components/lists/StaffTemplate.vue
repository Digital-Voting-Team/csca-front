<template>
  <AddStaff v-if="accessLevel > 3" />
  <h2 class="text-center">Staff list:</h2>

  <div id="staff_list" v-for="staff in staff_" :key="staff.id">
    <router-link class="text-reset" :to="{
      name: 'StaffDetails',
      params: { id: staff.id },
    }">
      <div class="card text-white bg-dark mb-2">
        <h2 class="card-header">
          {{ staff.person.name || "Name" }}
        </h2>
        <div class="card-body d-flex justify-content-between">
          <p>Employment date: {{ staff.employment_date || "date" }}</p>
          <strong>salary {{ staff.salary || "0" }}$</strong>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import AddStaff from "@/components/forms/AddStaff.vue";
import { useAuthUserStore } from "@/stores/auth-user";

export default {
  props: ["staff_"],
  components: { AddStaff },
  setup() {
    const userStorage = useAuthUserStore();
    const accessLevel = userStorage.position;
    return { accessLevel };
  },
};
</script>

<style>

</style>
