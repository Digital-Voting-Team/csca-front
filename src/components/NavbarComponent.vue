<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        <img class="nav-logo mr-3" src="@/assets/csca_logo.png" alt="Logo" />

        <span class="d-none d-sm-inline">CSCA</span>
      </router-link>
      <div class="d-flex">

        <ul class="navbar-nav d-flex me-2">

          <li class="d-flex d-lg-none" v-if="userStorage?.isLoggedIn === true">
            <a class="nav-link me-2" href="#">Hi there, {{ userStorage?.displayName }}</a>
            <button class="btn btn-danger" @click="handleClick">Logout</button>
          </li>

          <li class="nav-item d-lg-none" v-else>
            <router-link class="btn btn-primary me-2" :to="{ name: 'Signup' }">Signup</router-link>
            <router-link class="btn btn-secondary" :to="{ name: 'Login' }">Login</router-link>
          </li>
        </ul>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>


      <div class="navbar-collapse collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }">
              Home
            </router-link>
          </li>
          <li class="nav-item dropdown" v-if="userStorage?.isLoggedIn === true">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
              aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu">
              <li> <router-link class="dropdown-item" :to="{ name: 'StaffView' }">
                  View
                  staff
                </router-link></li>
              <li> <router-link class="dropdown-item" :to="{ name: 'CafeView' }">
                  View
                  cafes
                </router-link></li>
              <li> <router-link class="dropdown-item" :to="{ name: 'MealView' }">
                  View
                  meals
                </router-link></li>
            </ul>
          </li>
        </ul>
        <ul class="m-0">
          <li class="d-lg-flex d-none d-lg-block" v-if="userStorage?.isLoggedIn === true">
            <a class="nav-link">Hi there, {{ userStorage?.displayName }}</a>
            <button class="btn btn-danger" @click="handleClick">Logout</button>
          </li>

          <li class="nav-item d-none d-lg-block" v-else>
            <router-link class="btn btn-primary me-2" :to="{ name: 'Signup' }">Signup</router-link>
            <router-link class="btn btn-secondary" :to="{ name: 'Login' }">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
    userStorage.isLoggedIn = false
    return { userStorage, logout, handleClick, router };
  },
};
</script>

<style>
nav img {
  max-height: 40px;
}
</style>
