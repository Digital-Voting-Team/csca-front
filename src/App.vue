<template>
  <Navbar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Navbar from "./components/NavbarComponent.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Navbar, Footer },
};
</script>

<style>

</style>
