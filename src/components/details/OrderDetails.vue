<template>
  <h1 id="det_view">Detail View</h1>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="order_item !== undefined" class="list-details">
    <div class="list-info">
      <div class="cover">
        <img src="@/assets/img.png" alt=""/>
      </div>
      <h2>Total price: {{ order_item.total_price }}</h2>
    </div>

    <div class="order-list">
      <div class="single-order">
        <h4>Status: {{ order_item.status.status_name }}</h4>
      </div>
      <div class="single-order">
        <p>Customer ID: {{ order_item.customer_id }}</p>
      </div>
      <div class="single-order">
        <p>Staff ID: {{ order_item.staff_id }}</p>
      </div>
      <div class="single-order">
        <p>Cafe ID: {{ order_item.cafe_id }}</p>
      </div>
      <div class="single-order">
        <p>Payment method: {{ order_item.payment_method }}</p>
      </div>
      <div class="single-order">
        <p>Is take away: {{ order_item.is_take_away }}</p>
      </div>
      <div class="single-order">
        <p>Order date: {{ order_item.order_date }}</p>
      </div>
      <button v-if="accessLevel > 3" @click="handleDelete">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useAuthUserStore} from "@/stores/auth-user";
import {ref} from "vue";
import {DeleteOrderById, GetOrderById} from "@/requestsBackend/orderRequests/order";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {OrderRecord} from "@/js/records/orderRecords/order.record";

export default {
  name: "OrderDetails",
  props: ["id"],
  setup(props) {
    const router = useRouter();
    const userStorage = useAuthUserStore();
    const error = ref(false);
    const order_item = ref(undefined);
    const accessLevel = ref(null);

    const load = async () => {
      try {
        let response = await GetOrderById(userStorage.token, props.id)

        if (response !== undefined) {
          order_item.value = new OrderRecord(response.data, response.included)
        }
      } catch (err) {
        ErrorHandler.processWithoutFeedback(error)
      }
    }

    load()
    accessLevel.value = userStorage.position

    const handleDelete = async () => {
      await DeleteOrderById(userStorage.token, props.id);
      await router.push({name: "OrderView"});
    };

    return {error, handleDelete, userStorage, order_item, accessLevel};
  }
}
</script>

<style scoped>
#det_view {
  margin-bottom: 20px;
}

.list-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  margin-bottom: 100px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}

.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}

.list-info {
  text-align: center;
}

.list-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.list-info p {
  margin-bottom: 20px;
}

.property {
  color: #999;
  padding: 2px;
}

.description {
  text-align: left;
}

.single-order {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
