<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script setup>
// using @ means start at the project src root
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";

const { error, signup, isPending } = useSignup();
const userStorage = useAuthUserStore();

const email = ref("");
const password = ref("");
const displayName = ref("");

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value);

  if (!error.value) {
    userStorage.setUsername(this.email.value);
    userStorage.displayName = "Some name";
    userStorage.isLoggedIn = true;
  }
};
</script>
