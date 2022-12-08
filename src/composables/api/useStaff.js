// import { ref } from "vue";
//
// const useDocument = (token, id) => {
//   let error = ref(null);
//   let isPending = ref(false);
//
//   // const deleteStaff = async () => {
//   //   isPending.value = true;
//   //   error.value = null;
//   //
//   //   try {
//   //     const res = await docRef.delete();
//   //     isPending.value = false;
//   //     return res;
//   //   } catch (err) {
//   //     console.log(err.message);
//   //     isPending.value = false;
//   //     error.value = "could not delete the document";
//   //   }
//   // };
//   //
//   // const updateStaff = async (updates) => {
//   //   isPending.value = true;
//   //   error.value = null;
//   //
//   //   try {
//   //     const res = await docRef.update(updates);
//   //     isPending.value = false;
//   //     return res;
//   //   } catch (err) {
//   //     console.log(err.message);
//   //     isPending.value = false;
//   //     error.value = "could not update the document";
//   //   }
//   // };
//
//   return { error, isPending, deleteStaff, updateStaff };
// };
//
// export default useDocument;
