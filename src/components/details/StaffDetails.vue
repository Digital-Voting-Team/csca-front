<template>
  <h1 id="det_view">Detail View</h1>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="staff_item !== undefined" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img src="@/assets/img.png" alt="" />
      </div>
      <h2>Name {{ staff_item.person.name }}</h2>
      <p class="property">Phone: {{ staff_item.person.phone }}</p>
      <p class="property">Email: {{ staff_item.person.email }}</p>
    </div>

    <div class="song-list">
      <div class="single-song">
        <h3>Salary: {{ staff_item.salary }}</h3>
      </div>
      <div class="single-song">
        <p>Employment date: {{ staff_item.employment_date }}</p>
      </div>
      <div class="single-song">
        <p>Status: {{ staff_item.status }}</p>
      </div>
      <div class="single-song">
        <p>Position: {{ staff_item.position.name }}</p>
        <AddStaff
          v-if="staff_item.position.access_level > 3"
          :staff_="staff_item"
        />
      </div>
      <button v-if="staff_item.position.access_level < 4" @click="handleDelete">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import AddStaff from "@/components/forms/AddStaff.vue";
import { useRouter } from "vue-router";
import { useAuthUserStore } from "@/stores/auth-user";
import { DeleteStaffById, GetStaffById } from "@/requestsBackend/staff";
import { ref } from "vue";
import { StaffRecord } from "@/js/records/staff.record";

export default {
  props: ["id"],
  components: { AddStaff },
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
      console.log(token);
      const { data, included } = await GetStaffById(token, id);
      console.log(data);
      this.staff_item = new StaffRecord(data, included);
    },
  },
};
</script>

<style>
#det_view {
  margin-bottom: 20px;
}
.playlist-details {
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
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.property {
  color: #999;
  padding: 2px;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
