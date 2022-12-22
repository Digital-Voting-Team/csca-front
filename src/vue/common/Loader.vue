<template>
  <div class="spinner d-flex flex-column">
    <div class="spinner-border text-primary mx-auto mb-3" style="width: 3rem; height: 3rem;" role="status">
    </div>

    <div class="alert alert-warning" role="alert" v-if="messageId">
      {{ messageId }}
    </div>
  </div>
</template>

<script>
export default {
  name: "loader",
  props: {
    messageId: { type: String, default: "" },
    positionCenter: { type: Boolean, default: false },
  },
};
</script>

<style>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
