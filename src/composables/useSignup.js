import { ref } from "vue";
import { authReq } from "@/requestsBackend/auth";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;

  try {
    console.log(displayName);
    const res = await authReq("register", email, password);
    if (res.data === undefined) {
      throw new Error("Could not complete signup");
    }
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
