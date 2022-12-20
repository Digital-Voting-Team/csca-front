<template>
 <div class="staff_list" v-for="cafe in cafes" :key="cafe.id">
     <router-link
             :to="{
        name: 'CafeDetails',
        params: { id: cafe.id },
      }"
     >
         <div class="single">
             <div class="info">
                 <h3>{{ cafe.cafe_name || "Name" }}</h3>
             </div>
         </div>
     </router-link>
 </div>
</template>

<script>

export default {
    name: "CafeList",
    props: ['cafes'],
    setup(props) {

    }
}
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

img {
    max-width: 150%;
    max-height: 150%;
    display: block;
}

.info {
    margin: 0 30px;
}
</style>
