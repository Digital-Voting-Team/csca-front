import { ref } from "vue";
import { authReq } from "@/requestsBackend/auth";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await authReq("register", email, password);
    console.log(displayName);
    console.log(res);

    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Unable to sign up!";
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
