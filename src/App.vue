<template>
  <Navbar />
  <main class="constainer-fluid bg-light">
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
