<template>
  <div class="container py-4" v-if="deliveries.length">
    <h2 class="text-center mb-4">Delivery count</h2>
    <div>
      <LineChart :dict="GetDataDict(deliveries)"></LineChart>
    </div>
  </div>
  <div v-else>
    <loader />
  </div>
</template>

<script>
import { useAuthUserStore } from "@/stores/auth-user";
import { ref } from "vue";
import { ErrorHandler } from "@/js/helpers/error-handler";
import GetDataDict from "@/requestsBackend/analyticalRequests/deliveryCount";
import LineChart from "@/components/charts/Line";
import { GetDeliveryList } from "@/requestsBackend/orderRequests/delivery";
import { DeliveryRecord } from "@/js/records/orderRecords/delivery.record";
import Loader from "@/vue/common/Loader";

export default {
  name: "DeliveryCount",
  components: { LineChart, Loader },
  setup() {
    const userStorage = useAuthUserStore()
    const deliveries = ref([])

    const loadDeliveries = async () => {
      try {
        let response = await GetDeliveryList(userStorage.token)

        if (response !== undefined) {
          deliveries.value = response.data.map((el) => {
            return new DeliveryRecord(el, response.included)
          })
        }
      } catch (err) {
        ErrorHandler.processWithoutFeedback(error)
      }
    }
    loadDeliveries()

    return { deliveries, GetDataDict }
  }
}
</script>

<style scoped>

</style>
