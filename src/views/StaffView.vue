<template>
  <div class="some-component">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <p>Failed to load component</p>
      </template>
      <template v-else>
        <template v-if="list.length">
          <!--          <div class="some-component__list">-->
          <!--            <StaffTemplate :staff_="list" />-->
          <!--          </div>-->
          <StaffTemplate :staff_="list" />
        </template>
        <template v-else>
          <p>Could not load component</p>
        </template>
      </template>
    </template>
    <template v-else>
      <loader />
    </template>
    <collection-loader
      v-show="list.length"
      :first-page-loader="loadList"
      @first-page-load="setList"
      @next-page-load="concatList"
    />
  </div>
</template>

<script>
import Loader from "@/vue/common/Loader";
import CollectionLoader from "@/vue/common/CollectionLoader";

import { ErrorHandler } from "@/js/helpers/error-handler";

import { useAuthUserStore } from "@/stores/auth-user";
import { staffReq } from "@/requestsBackend/staff";
import { StaffRecord } from "@/js/records/staff.record";
import StaffTemplate from "@/components/StaffTemplate.vue";

export default {
  name: "StaffView",
  components: {
    StaffTemplate,
    CollectionLoader,
    Loader,
  },
  data() {
    return {
      isLoaded: false,
      isLoadFailed: false,
      list: [],
    };
  },
  methods: {
    async loadList() {
      const userStorage = useAuthUserStore();
      let response;
      try {
        response = await staffReq(userStorage.token);
      } catch (error) {
        this.isLoadFailed = true;
        ErrorHandler.processWithoutFeedback(error);
      }
      this.isLoaded = true;
      console.log(response);
      return response;
    },
    setList(data) {
      console.log(data);
      if (data !== undefined) {
        this.list = data.map((el) => {
          return new StaffRecord(el);
        });
      }
    },
    concatList(chunk) {
      if (chunk !== undefined) {
        this.list = this.list.concat(chunk.map((el) => new StaffRecord(el)));
      }
    },
  },
};
</script>
