<template>
  <div class="w-full flex flex-col items-center">
    <user-banner-block />
    <div
      class="w-full md:w-11/12 max-w-screen-lg mt-4 flex justify-between space-x-2"
    >
      <user-info-block />
      <user-articles-block />
    </div>
  </div>
</template>

<script>
import UserBannerBlock from "@/components/blocks/UserBannerBlock";
import UserInfoBlock from "@/components/blocks/UserInfoBlock";
import UserArticlesBlock from "@/components/blocks/UserArticlesBlock";

export default {
  components: {
    UserBannerBlock,
    UserInfoBlock,
    UserArticlesBlock,
  },
};
</script>

<style>
</style>
