<template>
  <header class="fixed top-0 left-0 w-full bg-white border-b">
    <nav class="container mx-auto flex items-center h-16">
      <!-- logo -->
      <nuxt-link :to="{ name: 'index' }">
        <svg
          width="50"
          height="40"
          viewBox="0 0 50 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="50" height="40" rx="3" style="fill: currentColor"></rect>
          <path
            d="M19.099 23.508c0 1.31-.423 2.388-1.27 3.234-.838.839-1.942 1.258-3.312 1.258h-4.403V12.277h4.492c1.31 0 2.385.423 3.224 1.27.846.838 1.269 1.912 1.269 3.223v6.738zm-2.808 0V16.77c0-.562-.187-.981-.562-1.258-.374-.285-.748-.427-1.122-.427h-1.685v10.107h1.684c.375 0 .75-.138 1.123-.415.375-.285.562-.708.562-1.27zM28.185 28h-5.896c-.562 0-1.03-.187-1.404-.561-.375-.375-.562-.843-.562-1.404V14.243c0-.562.187-1.03.562-1.404.374-.375.842-.562 1.404-.562h5.896v2.808H23.13v3.65h3.088v2.808h-3.088v3.65h5.054V28zm7.12 0c-.936 0-1.684-.655-2.246-1.965l-3.65-13.758h3.089l2.807 10.804 2.808-10.804H41.2l-3.65 13.758C36.99 27.345 36.241 28 35.305 28z"
            fill="white"
          ></path>
        </svg>
      </nuxt-link>

      <!-- 搜索框 -->
      <div class="mx-4 w-96">
        <input
          type="text"
          placeholder="搜索"
          v-model="keyword"
          @keyup.enter="submit"
          class="text-gray-600 placeholder-gray-600 rounded-md p-4 h-10 bg-gray-100 w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <!-- 登录/注册 || actions -->
      <div class="w-auto ml-auto">
        <!-- 未登录 -->
        <div v-if="!haslogin" class="flex items-center space-x-4 h-full">
          <nuxt-link :to="{ name: 'login' }">
            <button
              class="px-4 py-2 rounded-md bg-white hover:bg-gray-100 text-blue-700 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
            >
              登录
            </button>
          </nuxt-link>
          <nuxt-link :to="{ name: 'register' }">
            <button
              class="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
            >
              注册
            </button>
          </nuxt-link>
        </div>

        <!-- 已登录 -->
        <div v-if="haslogin" class="flex items-center space-x-4 h-full">
          <button
            @click="$router.push('/article-edit')"
            class="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
          >
            写文章
          </button>
          <button class="focus:outline-none rounded-full p-1 focus:bg-gray-200">
            <img
              src="https://s.svgbox.net/hero-outline.svg?ic=bell&fill=grey-700"
              class="h-6 w-6"
            />
          </button>
          <profile />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Profile from "@/components/Profile";

export default {
  components: {
    Profile,
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    submit() {
      this.$router.push({ path: "/search", query: { q: this.keyword } });
    },
  },
  computed: {
    haslogin() {
      return this.$store.state.hasLogin;
    },
  },
};
</script>
