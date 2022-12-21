<template>
  <Carousel />
  <MenuItems />
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import MenuItems from '@/components/MenuItems.vue'

export default {
  components: { Carousel, MenuItems },
  name: "HomeView",
};
</script>
