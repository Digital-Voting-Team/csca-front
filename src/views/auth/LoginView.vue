<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script setup>
// using @ means start at the project src root
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";

const { error, login, isPending } = useLogin();
const userStorage = useAuthUserStore();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  const res = await login(email.value, password.value);

  if (!error.value) {
    userStorage.setUsername(email.value);
    userStorage.displayName = "Some name";
    userStorage.isLoggedIn = true;
    userStorage.token = res.data.attributes.jwt;
  }
};
</script>
