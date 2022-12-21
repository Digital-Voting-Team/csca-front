<template>
  <h2>Popularity of meals</h2>
  <div v-if="orderItems.length && meals.length">
    <DoughnutChart :dict="GetDataDict(orderItems, meals)"></DoughnutChart>
  </div>
  <div v-else>
    <loader/>
  </div>
</template>

<script>
import {useAuthUserStore} from "@/stores/auth-user";
import {ref} from "vue";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {GetMealList} from "@/requestsBackend/menuRequest/meal";
import {MealRecord} from "@/js/records/menuRecords/meal.record";
import {GetOrderItemList} from "@/requestsBackend/orderRequests/order_item";
import {OrderItemRecord} from "@/js/records/orderRecords/order_item.record";
import GetDataDict from "@/requestsBackend/analyticalRequests/mealPopularity";
import DoughnutChart from "@/components/charts/Doughnut";
import Loader from "@/vue/common/Loader";

export default {
  name: "MealPopularity",
  components: {DoughnutChart, Loader},
  setup() {
    const userStorage = useAuthUserStore()
    const meals = ref([])
    const orderItems = ref([])

    const loadMeals = async () => {
      try {
        let response = await GetMealList(userStorage.token)

        if (response !== undefined) {
          meals.value = response.data.map((el) => {
            return new MealRecord(el, response.included)
          })
        }
      } catch (err) {
        ErrorHandler.processWithoutFeedback(error)
      }
    }
    loadMeals()

    const loadOrderItem = async () => {
      try {
        let response = await GetOrderItemList(userStorage.token)

        if (response !== undefined) {
          orderItems.value = response.data.map((el) => {
            return new OrderItemRecord(el, response.included)
          })
        }
      } catch (err) {
        ErrorHandler.processWithoutFeedback(error)
      }
    }
    loadOrderItem()

    return {orderItems, meals, GetDataDict}
  }
}
</script>

<style scoped>

</style>
