<template>
  <h2 class="text-center">Meal list:</h2>

  <div id="meal_list" v-for="meal in meals" :key="meal.id">
    <router-link class="text-reset" :to="{
      name: 'MealDetails',
      params: { id: meal.id },
    }">
      <div class="card text-white bg-dark mb-2">
        <h2 class="card-header">
          {{ meal.meal_name || "Name" }}
        </h2>
        <div class="card-body d-flex justify-content-between">
          <p>Amount: {{ meal.amount || "amount" }} {{ meal.category.unit || "units" }}</p>
          <strong>price {{ meal.price || "0" }}$</strong>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: "MealList",
  props: ['meals'],
  setup(props) {

  }
}
</script>

<style scoped>

</style>
