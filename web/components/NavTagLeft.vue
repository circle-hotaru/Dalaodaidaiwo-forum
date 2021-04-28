<template>
  <div>
    <h2 class="font-bold my-4 px-4 lg:px-2">热门标签</h2>
    <ul class="max-h-72 overflow-y-auto">
      <li
        class="text-gray-900 hover:text-primary-500 hover:bg-gray-200 rounded py-1 lg:px-2 px-4"
        v-for="(tag, index) in tagList"
        :key="index"
      >
        <nuxt-link :to="{ name: 'tags-tag', params: { tag: tag.name } }">
          <p>#{{ tag.name }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: [],
    };
  },
  async fetch() {
    await this.getTagList();
  },
  methods: {
    // 获取标签列表
    async getTagList() {
      const res = await this.$axios.get("/tag");
      console.log(res);
      if (res.data.code === 0) {
        this.tagList = res.data.data.tagList;
      }
    },
  },
};
</script>

<style>
</style>
