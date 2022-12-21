<template>
    <div v-if="staff.length && orders.length">
      <BarChart :dict="GetDataDict(staff, orders)"/>
    </div>
</template>

<script>
import {ref} from "vue";
import {useAuthUserStore} from "@/stores/auth-user";
import {GetOrderList} from "@/requestsBackend/orderRequests/order";
import {OrderRecord} from "@/js/records/orderRecords/order.record";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {GetStaffList} from "@/requestsBackend/staffRequests/staff";
import {StaffRecord} from "@/js/records/staffRecords/staff.record";
import GetDataDict from "@/requestsBackend/analyticalRequests/staffEffectiveness";
import BarChart from "@/components/charts/Bar";

export default {
  name: "StaffEffectiveness",
  components: {BarChart},
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

    return {staff, orders, GetDataDict}
  }
}
</script>

<style scoped>

</style>
