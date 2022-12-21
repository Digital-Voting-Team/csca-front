<template>
  <div class="some-component">
    <AddMeal v-if="accessLevel > 3"/>
    <div v-if="isLoaded">
      <div v-if="isLoadFailed">
        <p>Failed to load component</p>
      </div>
      <div v-else>
        <div v-if="meals.length">
          <MealList :meals="meals"/>
        </div>
        <div v-else>
          <p>Could not load component</p>
        </div>
      </div>
    </div>
    <div v-else>
      <loader/>
    </div>
  </div>
</template>

<script>
import MealList from "@/components/lists/MealList";
import Loader from "@/vue/common/Loader";
import {ref} from "vue";
import {useAuthUserStore} from "@/stores/auth-user";
import {GetMealList} from "@/requestsBackend/menuRequest/meal";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {MealRecord} from "@/js/records/menuRecords/meal.record";
import AddMeal from "@/components/forms/AddMeal";

export default {
  name: "MealView",
  components: {MealList, AddMeal, Loader},
  setup() {
    const userStorage = useAuthUserStore()
    const meals = ref([])
    const error = ref(null)
    const isLoaded = ref(null)
    const isLoadFailed = ref(null)
    const accessLevel = ref(null)

    const load = async () => {
      try {
        let response = await GetMealList(userStorage.token)
        if (response !== undefined) {
          meals.value = response.data.map((el) => {
            return new MealRecord(el, response.included)
          })
          isLoaded.value = true
        }
      } catch (err) {
        isLoadFailed.value = true
        ErrorHandler.processWithoutFeedback(error)
      }
    }

    load()
    accessLevel.value = userStorage.position

    return {error, meals, isLoaded, isLoadFailed, accessLevel}
  }
}
</script>

<style scoped>

</style>
