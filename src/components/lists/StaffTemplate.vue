<template>
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

export default {
  props: ["staff_"],
  setup(props) {
  },
};
</script>

<style>

</style>
