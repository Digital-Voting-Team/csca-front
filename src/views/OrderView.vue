<template>
    <div class="some-component">
        <div v-if="isLoaded">
            <div v-if="isLoadFailed">
                <p>Failed to load component</p>
            </div>
            <div v-else>
                <div v-if="orders.length">
                    <OrderList :orders="orders"/>
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
import OrderList from "@/components/lists/OrderList";
import Loader from "@/vue/common/Loader";
import {ref} from "vue";
import {useAuthUserStore} from "@/stores/auth-user";
import {GetOrderList} from "@/requestsBackend/orderRequests/order";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {OrderRecord} from "@/js/records/orderRecords/order.record";

export default {
    name: "OrderView",
    components: {OrderList, Loader},
    setup() {
        const userStorage = useAuthUserStore()
        const orders = ref([])
        const error = ref(null)
        const isLoaded = ref(null)
        const isLoadFailed = ref(null)

        const load = async () => {
            try {
                let response = await GetOrderList(userStorage.token)

                if (response !== undefined) {
                    orders.value = response.data.map((el) => {
                        return new OrderRecord(el, response.included)
                    })
                    isLoaded.value = true
                }
            } catch (err) {
                isLoadFailed.value = true
                ErrorHandler.processWithoutFeedback(error)
            }
        }

        load()

        return {error, orders, isLoaded, isLoadFailed}
    }
}
</script>

<style scoped>

</style>
