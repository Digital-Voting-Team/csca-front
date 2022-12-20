<template>
  <div class="form-container mt-3">
    <form class="needs-validation" @submit.prevent="handleSubmit">
      <h3 class="text-center">Login</h3>
      <div class="mb-3">
        <label class="form-label" for="email">Email address</label>
        <input class="form-control" id="email" type="email" placeholder="Email" v-model="email" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="password">Password</label>
        <input class="form-control" id="password" type="password" placeholder="Password" v-model="password" required />
      </div>
      <div class="mb-3" v-if="error">
        <div class="error alert alert-danger" role="alert"> {{ error }}</div>
      </div>
      <button class="btn btn-primary" v-if="!isPending">Log in</button>
      <button class="btn btn-primary" v-if="isPending" disabled>Loading</button>
    </form>
  </div>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { onMounted, onUnmounted, ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";
import { addValidationListeners, removeValidationListeners } from "@/js/forms/validation"

export default {
  setup() {

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

    onMounted(function () {
      addValidationListeners()
    })

    return { error, login, isPending, handleSubmit, email, password }
  }
}
</script>

<style>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  background: #ccc;
  border-radius: 10px;
  padding: 15px 25px;
}
</style>
