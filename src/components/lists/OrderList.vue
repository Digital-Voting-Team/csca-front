<template>
    <h2 class="text-center">Order list:</h2>

    <div id="order_list" v-for="order in orders" :key="order.id">
        <router-link class="text-reset" :to="{
      name: 'OrderDetails',
      params: { id: order.id },
    }">
            <div class="card text-white bg-dark mb-2">
                <h2 class="card-header">
                    {{ order.total_price || "total_price" }}
                </h2>
                <div class="card-body d-flex justify-content-between">
                    <p>Payment method: {{ order.payment_method || "payment_method" }}</p>
                    <p>Is take away: {{ order.is_take_away || "is_take_away" }}</p>
                    <strong>Status: {{ order.status.status_name || "status" }}</strong>
                    <p>Order date: {{ order.order_date || "order_date" }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    name: "OrderList",
    props: ['orders'],
    setup(props) {

    }
}
</script>

<style scoped>

</style>
