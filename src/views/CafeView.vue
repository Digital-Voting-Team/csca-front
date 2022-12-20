<template>
  <div class="some-component">
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
  </div>
</template>

<script>
import CafeList from "@/components/CafeList";
import {ref} from "vue";
import {useAuthUserStore} from "@/stores/auth-user";
import {GetCafeList} from "@/requestsBackend/cafe";
import {ErrorHandler} from "@/js/helpers/error-handler";
import {CafeRecord} from "@/js/records/cafe.record";

export default {
  name: "CafeView",
  components: {CafeList},
  setup() {
    const userStorage = useAuthUserStore()
    const cafes = ref([])
    const error = ref(null)
    const isLoaded = ref(null)
    const isLoadFailed = ref(null)

    const load = async () => {
      try {
        let response = await GetCafeList(userStorage.token)
        console.log(response)
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

    return {error, cafes, isLoaded, isLoadFailed}
  }
}
</script>

<style scoped>

</style>
