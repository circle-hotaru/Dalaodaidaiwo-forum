<template>
  <div class="md:flex">
    <div class="hidden md:block w-1/3 lg:w-1/4 px-4">
      <slider-left />
    </div>

    <div class="md:w-2/3 lg:w-2/4 md:px-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl md:text-3xl font-bold p-4">文章</h1>
        <div class="hidden md:block">
          <tabs />
        </div>
      </div>

      <template v-if="$fetchState.pending">
        <skeleton-card-article v-for="index in 30" :key="index" />
      </template>

      <template v-else-if="$fetchState.error">
        <inline-error-block :error="$fetchState.error" />
      </template>

      <template v-else>
        <article-card-block
          v-for="(article, i) in articles"
          v-observe-visibility="
            i === articles.length - 1 ? lazyLoadArticles : false
          "
          :key="article.id"
          :article="article"
        />
      </template>
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
      const res = await this.$axios.get("/articles", {
        params: {
          state: "rising",
          tag: "vue",
          page: this.page,
          top: this.getTop(),
        },
      });

      const newArticles = res.data.map((item, i) => {
        if (i === 0) {
          return {
            ...item,
          };
        } else {
          delete item.social_image;
          return {
            ...item,
          };
        }
      });

      this.articles = this.articles.concat(newArticles);
    },

    getTop() {
      let top = null;
      switch (this.$route.params.top) {
        case "yesterday":
          top = 1;
          break;
        case "week":
          top = 7;
          break;
        default:
          top = 30;
          break;
      }
      return top;
    },

    lazyLoadArticles(isVisible) {
      if (isVisible) {
        this.page++;
        this.$fetch();
      }
    },
  },
};
</script>
