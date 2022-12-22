<template>
  <div class="container py-4" v-if="staff.length && orders.length">
    <h2 class="text-center mb-4">Effectiveness of staff members</h2>
    <div>
      <BarChart :dict="GetDataDict(staff, orders)" />
    </div>
  </div>
  <div v-else>
    <loader />
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";
import { GetOrderList } from "@/requestsBackend/orderRequests/order";
import { OrderRecord } from "@/js/records/orderRecords/order.record";
import { ErrorHandler } from "@/js/helpers/error-handler";
import { GetStaffList } from "@/requestsBackend/staffRequests/staff";
import { StaffRecord } from "@/js/records/staffRecords/staff.record";
import GetDataDict from "@/requestsBackend/analyticalRequests/staffEffectiveness";
import BarChart from "@/components/charts/Bar";
import Loader from "@/vue/common/Loader";

export default {
  name: "StaffEffectiveness",
  components: { BarChart, Loader },
  setup() {
    const userStorage = useAuthUserStore()
    const orders = ref([])
    const staff = ref([])

    const loadOrders = async () => {
      try {
        let response = await GetOrderList(userStorage.token)

        if (response !== undefined) {
          orders.value = response.data.map((el) => {
            return new OrderRecord(el, response.included)
          })
        }
      } catch (err) {
        ErrorHandler.processWithoutFeedback(error)
      }
    }
    loadOrders()

    const loadStaff = async () => {
      try {
        let response = await GetStaffList(userStorage.token)

        if (response !== undefined) {
          staff.value = response.data.map((el) => {
            return new StaffRecord(el, response.included)
          })
        }
      } catch (err) {
        ErrorHandler.processWithoutFeedback(error)
      }
    }
    loadStaff()

    return { staff, orders, GetDataDict }
  }
}
</script>

<style scoped>

</style>
