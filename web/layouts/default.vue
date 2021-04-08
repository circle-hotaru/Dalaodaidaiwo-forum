<template>
  <div class="bg-gray-50">
    <navigation />
    <div class="pt-8 md:pt-16">
      <Nuxt class="pt-5 md:pt-4" keep-alive />
    </div>
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
