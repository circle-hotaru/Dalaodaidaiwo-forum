<template>
  <div class="bg-gray-50">
    <div
      class="px-6 py-4 bg-white shadow border-t-4 md:border-t-8 border-pink-600 lg:mx-28"
    >
      <div class="flex justify-between">
        <h2 class="text-2xl font-bold md:text-3xl">
          {{ this.$route.params.tag }}
        </h2>
        <div>
          <button
            class="text-primary-500 font-semibold hover:bg-primary-500 hover:bg-opacity-10 hover:text-primary-500 rounded-md py-2 text-center px-4 focus:outline-none"
          >
            Follow
          </button>
          <button
            class="text-gray-500 font-semibold hover:bg-gray-500 hover:bg-opacity-10 hover:text-gray-500 rounded-md py-2 text-center px-4 focus:outline-none"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
    <div class="md:flex pt-4">
      <!-- left -->
      <div class="hidden md:block lg:w-1/4 w-1/3 px-4 lg:px-8">
        <div class="space-y-4 divide-y divide-gray-200">
          <div>
            <h2 class="font-mono font-semibold my-4">submission guidelines</h2>
            <p class="leading-tight text-gray-800 mb-3">
              Be nice. <br />
              Be respectful. <br />
              Assume best intentions. <br />
              Be kind, rewind.
            </p>
            <button
              class="px-4 py-2 text-sm bg-primary-500 text-white rounded-md focus:outline-none hover:bg-primary-600"
            >
              Write a post
            </button>
          </div>
          <div class="text-gray-700 font-mono py-4 font-semibold">
            <p>{{ totalArticle }} Articles Published</p>
          </div>
        </div>
      </div>

      <!-- login -->
      <div class="md:w-2/3 lg:w-2/4 md:px-4">
        <div
          v-if="this.articles.length > 0"
          class="p-4 rounded-md mx-2 mb-4 md:mx-0 text-lg bg-primary-500 text-primary-500 bg-opacity-10"
        >
          <h3>
            <nuxt-link to="" class="text-xl font-semibold">Sign in</nuxt-link>
            for the ability sort posts by top and latest.
          </h3>
        </div>

        <template v-if="$fetchState.pengding">
          <skeleton-card-article v-for="index in 30" :key="index" />
        </template>
        <template v-else-if="$fetchState.error">
          <inline-error-block :error="$fetchState.error" />
        </template>
        <template v-else>
          <article-card-block
            v-for="(article, index) in articles"
            :key="article.id"
            :article="article"
            v-observe-visibility="
              index === articles.length - 1 ? lazyLoadArticles : false
            "
          />
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
      const res = await this.$axios.get("/articles", {
        params: { tag: this.$route.params.tag, page: this.page },
      });

      const newArticles = res.data.map((item, i) => {
        delete item.social_image;
        return {
          ...item,
        };
      });

      this.articles = this.articles.concat(newArticles);
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
