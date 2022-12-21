<template>
  <div class="album py-5 bg-light">
    <h2 class="text-center mb-5">Menu List</h2>
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="meal in meals" :key="meal.id" class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                 preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>{{ meal.meal_name || "Name" }}</title>
              <rect width="100%" height="100%" fill="#55595c"/>
              <text x="50%" y="50%" fill="#eceeef"
                    dy=".3em">Thumbnail
              </text>
            </svg>

            <div class="card-body">
              <p class="card-text">Amount: {{ meal.amount || "amount" }} {{ meal.category.unit || "units" }}</p>
              <strong class="card-text">price {{ meal.price || "0" }}$</strong>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <router-link class="text-reset btn btn-sm btn-outline-secondary" :to="{
                                      name: 'MealDetails',
                                      params: { id: meal.id },
                                    }">View details
                  </router-link>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h2 class="text-center">Meal list:</h2>

<!--  <div id="meal_list" v-for="meal in meals" :key="meal.id">-->
<!--    <router-link class="text-reset" :to="{-->
<!--      name: 'MealDetails',-->
<!--      params: { id: meal.id },-->
<!--    }">-->
<!--      <div class="card text-white bg-dark mb-2">-->
<!--        <h2 class="card-header">-->
<!--          {{ meal.meal_name || "Name" }}-->
<!--        </h2>-->
<!--        <div class="card-body d-flex justify-content-between">-->
<!--          <p>Amount: {{ meal.amount || "amount" }} {{ meal.category.unit || "units" }}</p>-->
<!--          <strong>price {{ meal.price || "0" }}$</strong>-->
<!--        </div>-->
<!--      </div>-->
<!--    </router-link>-->
<!--  </div>-->
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
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>
