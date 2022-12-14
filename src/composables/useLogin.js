import { ref } from "vue";
import { authReq } from "@/requestsBackend/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await authReq("login", email, password);
    if (res.data === undefined) {
      error.value = "Incorrect login credentials!";
    }
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Unable to login!";
    isPending.value = false;
  }
};

const useLogin = () => {
  return { error, login, isPending };
};

export default useLogin;
