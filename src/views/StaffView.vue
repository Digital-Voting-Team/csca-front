<template>
  <div class="container">
    <div class="d-flex justify-content-between my-2">
      <h2 class="m-0">Staff list</h2>
      <AddStaff v-if="accessLevel > 3" />
    </div>
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <p>Failed to load component</p>
      </template>
      <template v-else>
        <template v-if="list.length">
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
    <collection-loader v-show="list.length" :first-page-loader="loadList" @first-page-load="setList"
      @next-page-load="concatList" />
  </div>
</template>

<script>
import Loader from "@/vue/common/Loader";
import CollectionLoader from "@/vue/common/CollectionLoader";

import { ErrorHandler } from "@/js/helpers/error-handler";

import { useAuthUserStore } from "@/stores/auth-user";
import { GetStaffList } from "@/requestsBackend/staffRequests/staff";
import { StaffRecord } from "@/js/records/staffRecords/staff.record";
import StaffTemplate from "@/components/lists/StaffTemplate.vue";
import AddStaff from "@/components/forms/AddStaff";

export default {
  name: "StaffView",
  components: {
    StaffTemplate,
    CollectionLoader,
    Loader,
    AddStaff,
  },
  data() {
    return {
      isLoaded: false,
      isLoadFailed: false,
      list: [],
      accessLevel: 0,
    };
  },
  methods: {
    async loadList() {
      const userStorage = useAuthUserStore();
      this.accessLevel = userStorage.position;
      let response;
      try {
        response = await GetStaffList(userStorage.token);
      } catch (error) {
        this.isLoadFailed = true;
        ErrorHandler.processWithoutFeedback(error);
      }
      this.isLoaded = true;
      // console.log(response);
      return response;
    },
    setList(data) {
      // console.log("set");
      // console.log(data);
      if (data !== undefined) {
        this.list = data.data.map((el) => {
          return new StaffRecord(el, data.included);
        });
      }
    },
    concatList(chunk) {
      if (chunk !== undefined) {
        this.list = this.list.concat(
          chunk.data.map((el) => new StaffRecord(el, chunk.included))
        );
      }
    },
  },
};
</script>
