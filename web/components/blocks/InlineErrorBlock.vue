<template>
  <div class="error-block">
    <warning-icon />
    <h2>{{ error.message }}</h2>
  </div>
</template>

<script>
import WarningIcon from "@/assets/icons/warning.svg?inline";
export default {
  components: {
    WarningIcon,
  },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
</style>
