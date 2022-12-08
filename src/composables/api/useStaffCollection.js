import { ref } from "vue";
import { staffReq } from "@/requestsBackend/staff";

const useStaffCollection = () => {
  const error = ref(null);
  const isPending = ref(null);

  const getStaffList = async (token) => {
    error.value = null;

    try {
      const res = await staffReq(token);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, getStaffList, isPending };
};

export default useStaffCollection;
