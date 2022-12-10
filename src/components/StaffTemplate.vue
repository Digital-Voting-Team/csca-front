<template>
  <h1>Staff list:</h1>
  <div id="staff_list" v-for="staff in staff_" :key="staff.id">
    <div class="single">
      <div class="info">
        <h3>{{ staff.name }}</h3>
        <p>Employment date: {{ staff.employment_date }}</p>
      </div>
      <div class="song-number">
        <p>salary {{ staff.salary }}$</p>
      </div>
    </div>
  </div>
</template>

<!--    <router-link :to="{ name: 'StaffDetails', params: { id: staff.id } }">-->
<!--      -->
<!--    </router-link>-->

<script>
export default {
  props: ["staff_"],
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.song-number {
  margin-left: auto;
}
</style>
