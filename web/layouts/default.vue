<template>
  <div class="bg-gray-50">
    <navigation />
    <Nuxt class="mt-16" keep-alive />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation,
  },
};
</script>
