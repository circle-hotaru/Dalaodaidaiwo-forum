<template>
  <div class="w-screen flex justify-center">
    <div
      class="w-full md:w-11/12 max-w-screen-lg flex justify-center md:justify-between md:space-x-4"
    >
      <slider-left />

      <div class="w-full md:w-2/3">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl md:text-3xl font-bold p-4">文章</h1>
          <div class="hidden md:block">
            <tabs />
          </div>
        </div>

        <template v-if="$fetchState.pending">
          <skeleton-card-article v-for="index in this.pageSize" :key="index" />
        </template>

        <template v-else-if="$fetchState.error">
          <inline-error-block :error="$fetchState.error" />
        </template>

        <template v-else>
          <div class="flex flex-col space-y-2">
            <article-card-block
              v-for="(article, i) in articles"
              v-observe-visibility="
                i === articles.length - 1 ? lazyLoadArticles : false
              "
              :key="article._id"
              :article="article"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonCardArticle from "@/components/placeholders/SkeletonCardArticle";
import SliderLeft from "@/components/SliderLeft";
import Tabs from "@/components/Tabs";
import ArticleCardBlock from "@/components/blocks/ArticleCardBlock";
import InlineErrorBlock from "@/components/blocks/InlineErrorBlock";

export default {
  components: {
    SkeletonCardArticle,
    SliderLeft,
    Tabs,
    ArticleCardBlock,
    InlineErrorBlock,
  },

  data() {
    return {
      articles: [],
      page: 1,
      pageSize: 10,
      hasNext: false,
    };
  },

  head() {
    return {
      title: `Top articles in ${this.$route.params.top}`,
    };
  },

  async fetch() {
    await this.getArticlesByTop();
  },

  methods: {
    async getArticlesByTop() {
      const res = await this.$axios.$get("/articles", {
        params: {
          page: this.page,
          pageSize: this.pageSize,
          top: this.getTop(),
        },
      });
      if (res.code === 0) {
        const newArticles = res.data.articleList;
        this.articles = this.articles.concat(newArticles);
        this.hasNext = res.data.hasNext;
      }
    },

    getTop() {
      let top;
      switch (this.$route.params.top) {
        case "yesterday":
          top = 2;
          break;
        case "week":
          top = 7;
          break;
        case "month":
          top = 30;
          break;
        default:
          top = 0;
          break;
      }
      return top;
    },

    lazyLoadArticles(isVisible) {
      if (this.hasNext) {
        if (isVisible) {
          this.page++;
          this.$fetch();
        }
      }
    },
  },
};
</script>
