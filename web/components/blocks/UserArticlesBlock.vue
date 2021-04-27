<template>
  <div class="w-2/3">
    <template v-if="$fetchState.pending">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="flex flex-col space-y-2">
        <article-card-block
          v-for="article in articles"
          :key="article._id"
          :article="article"
        />
      </div>
    </template>
  </div>
</template>

<script>
import ArticleCardBlock from "@/components/blocks/ArticleCardBlock";
import InlineErrorBlock from "@/components/blocks/InlineErrorBlock";
export default {
  components: {
    ArticleCardBlock,
    InlineErrorBlock,
  },
  data() {
    return {
      page: 1, // 页数
      articles: null,
    };
  },
  async fetch() {
    this.getUserArticleList();
  },

  methods: {
    // 获取文章列表
    async getUserArticleList() {
      const page = this.page;
      const res = await this.$axios.$get(
        `/${this.$route.params.id}/user-article`,
        {
          params: { page, pageSize: 5 },
        }
      );
      console.log(res);
      if (res.code === 0) {
        this.articles = res.data.articleList;
      }
    },
  },
};
</script>
