<template>
  <div class="w-screen flex justify-center">
    <div
      class="w-full md:w-11/12 max-w-screen-lg flex justify-center md:justify-between md:space-x-4"
    >
      <slider-left />
      <div class="w-full md:w-2/3">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold md:text-3xl">
            {{ this.$route.params.tag }}
          </h2>
          <div>
            <button
              class="text-primary-500 font-semibold hover:bg-primary-500 hover:bg-opacity-10 hover:text-primary-500 rounded-md py-2 text-center px-4 focus:outline-none"
            >
              Follow
            </button>
          </div>
        </div>
        <template v-if="$fetchState.pengding">
          <skeleton-card-article v-for="index in 30" :key="index" />
        </template>
        <template v-else-if="$fetchState.error">
          <inline-error-block :error="$fetchState.error" />
        </template>
        <template v-else>
          <div class="flex flex-col space-y-2">
            <article-card-block
              v-for="(article, index) in articles"
              :key="article.id"
              :article="article"
              v-observe-visibility="
                index === articles.length - 1 ? lazyLoadArticles : false
              "
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
    };
  },
  head() {
    return {
      title: this.$route.params.tag,
    };
  },
  async fetch() {
    await this.getArticlesByTag();
  },
  methods: {
    async getArticlesByTag() {
      console.log(this.$route.params.tag);
      const res = await this.$axios.$get(
        `/articles/${this.$route.params.tag}`,
        {
          params: {
            page: this.page,
            pageSize: this.pageSize,
          },
        }
      );
      console.log(res);
      this.articles = this.articles.concat(res.data.articleList);
    },

    lazyLoadArticles(isVisible) {
      if (isVisible) {
        this.page++;
        this.getArticlesByTag();
      }
    },
  },
};
</script>

<style>
</style>
