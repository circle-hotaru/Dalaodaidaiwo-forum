<template>
  <div class="w-screen flex justify-center">
    <div
      class="w-full md:w-11/12 max-w-screen-lg flex flex-col items-center space-y-4"
    >
      <h1 class="w-full pl-2 text-2xl font-semibold text-left">搜索结果</h1>
      <div class="w-full flex justify-center md:justify-between md:space-x-4">
        <ul
          class="hidden md:flex md:flex-auto md:flex-col md:items-start space-y-2 md:pb-4"
        >
          <li
            @click="type = 0"
            class="w-full py-2 pl-2 rounded-lg hover:bg-gray-100 hover:text-blue-700"
            :class="{ 'bg-white shadow': !type }"
          >
            文章
          </li>
          <li
            @click="type = 1"
            class="w-full py-2 pl-2 rounded-lg hover:bg-gray-100 hover:text-blue-700"
            :class="{ 'bg-white shadow': type }"
          >
            用户
          </li>
        </ul>
        <div class="w-full md:w-2/3">
          <template v-if="$fetchState.pengding">
            <skeleton-card-article v-for="index in pageSize" :key="index" />
          </template>
          <template v-else-if="$fetchState.error">
            <inline-error-block :error="$fetchState.error" />
          </template>
          <template v-else>
            <div v-if="!type" class="flex flex-col space-y-2">
              <article-card-block
                v-for="(article, index) in articleList"
                :key="article._id"
                :article="article"
                v-observe-visibility="
                  index === articleList.length - 1 ? lazyLoad : false
                "
              />
            </div>
            <div v-if="type" class="flex flex-col space-y-2">
              <user-card
                v-for="(user, index) in userList"
                :key="user._id"
                :user="user"
                v-observe-visibility="
                  index === userList.length - 1 ? lazyLoad : false
                "
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonCardArticle from "@/components/placeholders/SkeletonCardArticle";
import SliderLeft from "@/components/SliderLeft";
import Tabs from "@/components/Tabs";
import ArticleCardBlock from "@/components/blocks/ArticleCardBlock";
import UserCard from "@/components/blocks/UserCard";
import InlineErrorBlock from "@/components/blocks/InlineErrorBlock";

export default {
  components: {
    SkeletonCardArticle,
    SliderLeft,
    Tabs,
    ArticleCardBlock,
    UserCard,
    InlineErrorBlock,
  },
  data() {
    return {
      type: 0,
      articleList: [],
      userList: [],
      page: 1,
      pageSize: 10,
      hasNext: false,
    };
  },
  head() {
    return {
      title: "搜索结果",
    };
  },
  async fetch() {
    await this.getSearch();
  },
  computed: {
    keyword: function () {
      return this.$route.query.q;
    },
  },
  watch: {
    type: function () {
      this.$fetch();
    },
    keyword: function () {
      this.initData();
      this.$fetch();
    },
  },
  methods: {
    async getSearch() {
      const res = await this.$axios.$get(`/search`, {
        params: {
          q: this.keyword,
          type: this.type,
          page: this.page,
          pageSize: this.pageSize,
        },
      });
      if (this.type === 0) {
        this.articleList = this.articleList.concat(res.data.searchList);
      } else {
        this.userList = this.userList.concat(res.data.searchList);
      }
      this.hasNext = res.data.hasNext;
    },

    lazyLoad(isVisible) {
      if (this.hasNext) {
        if (isVisible) {
          this.page++;
          this.$fetch();
        }
      }
    },

    initData() {
      this.type = 0;
      this.articleList = [];
      this.userList = [];
      this.page = 1;
      this.pageSize = 10;
      this.hasNext = false;
    },
  },
};
</script>
