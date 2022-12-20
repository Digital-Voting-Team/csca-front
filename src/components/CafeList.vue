<template>
 <div v-for="cafe in cafes" :key="cafe.id">
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

</style>
