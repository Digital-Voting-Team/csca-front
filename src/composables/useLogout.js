import { ref } from "vue";
import { authReq } from "@/requestsBackend/auth";

// refs
const error = ref(null);
const isPending = ref(false);

// logout function
const logout = async (username) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await authReq("logout", username);
    if (res.status !== 200) {
      throw new Error("Could not logout!");
    }
    isPending.value = false;
  } catch (err) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
