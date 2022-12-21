<template>
  <div class="some-component">
    <AddCafe v-if="accessLevel > 3"/>
    <div v-if="isLoaded">
      <div v-if="isLoadFailed">
        <p>Failed to load component</p>
      </div>
      <div v-else>
        <div v-if="cafes.length">
          <CafeList :cafes="cafes"/>
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
import CafeList from "@/components/lists/CafeList";
import Loader from "@/vue/common/Loader";
import {ref} from "vue";
import {useAuthUserStore} from "@/stores/auth-user";
import {GetCafeList} from "@/requestsBackend/cafeRequests/cafe";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {CafeRecord} from "@/js/records/cafeRecords/cafe.record";
import AddCafe from "@/components/forms/AddCafe";

export default {
  name: "CafeView",
  components: {CafeList, AddCafe, Loader},
  setup() {
    const userStorage = useAuthUserStore()
    const cafes = ref([])
    const error = ref(null)
    const isLoaded = ref(null)
    const isLoadFailed = ref(null)
    const accessLevel = ref(null)

    const load = async () => {
      try {
        let response = await GetCafeList(userStorage.token)

        if (response !== undefined) {
          cafes.value = response.data.map((el) => {
            return new CafeRecord(el, response.included)
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

    return {error, cafes, isLoaded, isLoadFailed, accessLevel}
  }
}
</script>

<style scoped>

</style>
