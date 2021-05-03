<template>
  <div class="h-screen">
    <div class="lg:p-6">
      <h1 class="text-gray-900 text-left text-3xl font-bold py-4">Top tags</h1>
      <div class="flex flex-col md:flex-row md:flex-wrap">
        <template v-if="$fetchState.pending">
          <skeleton-tag v-for="index in 18" :key="index" />
        </template>

        <template v-else-if="$fetchState.error">
          <inline-error-block :error="$fetchState.error" />
        </template>

        <template v-else>
          <tag v-for="(tag, index) in tags" :key="index" :tag="tag" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonTag from "@/components/placeholders/SkeletonTag";
import Tag from "@/components/Tag";
import InlineErrorBlock from "@/components/blocks/InlineErrorBlock";

export default {
  components: {
    SkeletonTag,
    Tag,
    InlineErrorBlock,
  },

  data() {
    return {
      tags: [],
      page: 1,
      per_page: 10,
    };
  },

  head() {
    return {
      title: "Top tags",
    };
  },

  async fetch() {
    await this.getTags();
  },

  methods: {
    async getTags() {
      const res = await this.$axios.$get("/tag");
      console.log(res);
      this.tags = res.data.tagList;
    },

    lazyLoadTags(isVisible) {
      if (isVisible) {
        this.page++;
        this.$fetch();
      }
    },
  },
};
</script>

<style>
</style>
