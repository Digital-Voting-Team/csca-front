<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/csca_logo.png" alt="Logo" />
      <h1><router-link :to="{ name: 'Home' }">CSCA</router-link></h1>
      <div class="links">
        <div v-if="userStorage?.isLoggedIn === true">
          <router-link :to="{ name: 'StaffView' }"> View staff </router-link>
          <span>Hi there, {{ userStorage?.displayName }}</span>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout";
import { useRouter } from "vue-router";
import { useAuthUserStore } from "@/stores/auth-user";

export default {
  setup() {
    const userStorage = useAuthUserStore();
    const { logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout(userStorage.username);
      userStorage.isLoggedIn = false;
      router.push({ name: "Login" });
    };

    return { userStorage, logout, handleClick, router };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>
