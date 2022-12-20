<template>
  <div class="form-container mt-3">
    <form class="needs-validation" @submit.prevent="handleSubmit">
      <h3 class="text-center">Sign up</h3>
      <div class="mb-3">
        <label class="form-label" for="displayName">Display name</label>
        <input class="form-control" id="displayName" type="text" placeholder="Display name" v-model="displayName"
          required />
      </div>
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
      <button class="btn btn-primary" v-if="!isPending">Sign up</button>
      <button class="btn btn-primary" v-if="isPending" disabled>Loading</button>
    </form>
  </div>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { onMounted, onUnmounted, ref } from "vue";
import { useAuthUserStore } from "@/stores/auth-user";
import { addValidationListeners } from "@/js/forms/validation"

export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const userStorage = useAuthUserStore();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);

      if (!error.value) {
        userStorage.setUsername(email.value);
        userStorage.displayName = "Some name";
        userStorage.isLoggedIn = true;
      }
    }

    onMounted(function () {
      addValidationListeners()
    })

    return { error, signup, isPending, email, password, displayName, handleSubmit }
  }
}
</script>
