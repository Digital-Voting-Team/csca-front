<template>
  <h1 id="det_view">Detail View</h1>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="cafe_item !== undefined" class="list-details">
    <div class="list-info">
      <div class="cover">
        <img src="@/assets/img.png" alt=""/>
      </div>
      <h2>{{ cafe_item.cafe_name }}</h2>
    </div>

    <div class="staff-list">
        <div v-if="cafe_item.rating" class="single-cafe">
            <p>Rating: {{ cafe_item.rating }}</p>
        </div>
        <div v-else class="single-cafe">
            <p>Rating: 0</p>
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
import {DeleteCafeById, GetCafeById} from "@/requestsBackend/cafeRequests/cafe";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {CafeRecord} from "@/js/records/cafeRecords/cafe.record";

export default {
  name: "CafeDetails",
  props: ["id"],
  setup(props) {
    const router = useRouter();
    const userStorage = useAuthUserStore();
    const error = ref(false);
    const cafe_item = ref(undefined);
    const accessLevel = ref(null);

    const load = async () => {
      try {
        let response = await GetCafeById(userStorage.token, props.id)

        if (response !== undefined) {
          cafe_item.value = new CafeRecord(response.data, response.included)
        }
      } catch (err) {
        ErrorHandler.processWithoutFeedback(error)
      }
    }

    load()
    accessLevel.value = userStorage.position

    const handleDelete = async () => {
      await DeleteCafeById(userStorage.token, props.id);
      await router.push({name: "CafeView"});
    };

    return {error, handleDelete, userStorage, cafe_item, accessLevel};
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

.single-cafe {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
