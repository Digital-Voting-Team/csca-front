<template>
  <h2 class="text-center">Cafe list:</h2>

  <div class="staff_list" v-for="cafe in cafes" :key="cafe.id">
    <router-link class="text-reset" :to="{
        name: 'CafeDetails',
        params: { id: cafe.id },
      }"
    >
      <div class="card text-white bg-dark mb-2">
        <h3 class="card-header">
          {{ cafe.cafe_name || "Name" }}
        </h3>
        <div v-if="cafe.rating" class="card-body d-flex justify-content-between">
          <p>Rating: {{ cafe.rating || "rating" }}</p>
        </div>
        <div v-else class="card-body d-flex justify-content-between">
          <p>Rating: 0</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: "CafeList",
  props: ['cafes'],
  setup(props) {

  }
}
</script>

<style scoped>

</style>
