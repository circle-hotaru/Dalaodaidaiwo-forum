<template>
  <div>
    <user-block />
    <user-articles-block />
  </div>
</template>

<script>
import UserBlock from "@/components/blocks/UserBlock";
import UserArticlesBlock from "@/components/blocks/UserArticlesBlock";

export default {
  components: {
    UserBlock,
    UserArticlesBlock,
  },
};
</script>

<style>
</style>
