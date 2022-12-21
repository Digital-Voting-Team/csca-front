<template>
  <section class="bg-light" v-if="staff_item !== undefined">
    <div class="container pt-3 pb-5">
      
      <div v-if="error">
        <div class="error alert alert-danger" role="alert"> {{ error }}</div>
      </div>

      <h2 class="text-center mb-3">Detail View</h2>

      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4 shadow">
            <div class="card-body text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                class="rounded-circle img-fluid" style="width: 150px;">
              <h5 class="my-3">{{ staff_item.person.name }}</h5>
              <p class="text-muted mb-3">{{ staff_item.position.name }}</p>
              <div class="d-flex justify-content-center mb-2">
                <button class="btn btn-outline-warning px-4 me-md-2 fw-bold"
                  v-if="userStorage.position > 3">Modify</button>
                <button class="btn btn-outline-danger px-4 me-md-2 fw-bold" v-if="userStorage.position > 3"
                  @click="handleDelete">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4 shadow">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ staff_item.person.name }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ staff_item.person.email }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Phone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ staff_item.person.phone }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Salary</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ staff_item.salary }} $</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Employment date</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ new Date(staff_item.employment_date).toISOString().slice(0, 10) }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Status</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ staff_item.status }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <h3 class="text-center mb-4">Assignments</h3>
            <div class="col-md-6">
              <div class="card mb-4 mb-md-0 shadow">
                <div class="card-body">
                  <p class="mb-2 text-center"><span class="text-primary font-italic me-1">Active assigment</span></p>
                  <p class="mb-4 text-center">Project Status: pending</p>
                  <p class="mb-1" style="font-size: .77rem;">Progress</p>
                  <div class="progress rounded" style="height: 5px;">
                    <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card mb-4 mb-md-0 shadow">
                <div class="card-body">
                  <p class="mb-4 text-center">Project Status: done</p>
                  <p class="mb-1" style="font-size: .77rem;">Progress</p>
                  <div class="progress rounded" style="height: 5px;">
                    <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100"
                      aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuthUserStore } from "@/stores/auth-user";
import { DeleteStaffById, GetStaffById } from "@/requestsBackend/staffRequests/staff";
import { ref } from "vue";
import { StaffRecord } from "@/js/records/staffRecords/staff.record";

export default {
  props: ["id"],
  data() {
    return {
      staff_item: undefined,
    };
  },
  setup(props) {
    const router = useRouter();
    const userStorage = useAuthUserStore();
    const error = ref(false);

    const handleDelete = async () => {
      await DeleteStaffById(userStorage.token, props.id);
      await router.push({ name: "Home" });
    };

    return { error, handleDelete, userStorage };
  },
  async created() {
    try {
      await this.loadList(this.userStorage.token, this.$props.id);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async loadList(token, id) {
      // console.log(token);
      const { data, included } = await GetStaffById(token, id);
      // console.log(data);
      this.staff_item = new StaffRecord(data, included);
    },
  },
};
</script>

<style>

</style>
