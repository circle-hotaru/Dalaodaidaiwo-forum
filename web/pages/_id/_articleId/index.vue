<template>
  <div class="w-screen flex justify-center">
    <div
      class="w-full md:mx-8 max-w-screen-xl flex flex-col items-center lg:flex-row lg:justify-between lg:items-start lg:space-x-4"
    >
      <div class="w-full lg:w-3/4 flex justify-center space-x-2">
        <!-- left -->
        <div class="hidden md:block w-16 flex-none">
          <div class="pt-4 flex flex-col space-y-2 justify-center items-center">
            <div
              class="flex flex-col items-center cursor-pointer"
              @click="action('like', 'isLike')"
            >
              <fa
                :icon="['far', 'heart']"
                class="fa-2x hover:text-red-700"
                :class="{ 'text-red-700': status.isLike }"
              />
              <p>{{ article.like }}</p>
            </div>
            <div
              class="flex flex-col items-center cursor-pointer"
              @click="action('collect', 'isCollect')"
            >
              <fa
                :icon="['far', 'star']"
                class="fa-2x hover:text-red-700"
                :class="{ 'text-red-700': status.isCollect }"
              />
              <p>{{ article.collect }}</p>
            </div>
          </div>
        </div>

        <div class="flex-auto">
          <div class="border border-gray-200 rounded-lg bg-white">
            <article>
              <div class="px-6 py-8">
                <h1
                  class="md:text-5xl text-2xl font-bold tracking-wide leading-tight mb-2"
                >
                  {{ article.title }}
                </h1>
                <div class="mt-2 space-y-2 text-gray-600">
                  <ul class="flex space-x-1 mt-2">
                    <li
                      v-for="tag in article.tags"
                      :key="tag.name"
                      class="px-1 rounded-md"
                    >
                      <nuxt-link
                        :to="{ name: 'tags-tag', params: { tag: tag.name } }"
                        >#{{ tag.name }}</nuxt-link
                      >
                    </li>
                  </ul>
                  <div class="flex items-center space-x-2">
                    <nuxt-link
                      :to="{
                        name: 'id',
                        params: { id: user._id },
                      }"
                      v-if="article.user"
                      class="flex items-center"
                    >
                      <img
                        :src="user.avatar"
                        :alt="user.username"
                        class="w-10 h-10 bg-gray-300 rounded-full mr-3"
                      />
                      <p class="font-semibold text-gray-800">
                        {{ user.username }}
                      </p>
                    </nuxt-link>
                    <nuxt-link
                      v-if="status.isOwn"
                      :to="{
                        name: 'id-articleId-edit',
                        params: { id: user._id, articleId: article._id },
                      }"
                      class="text-blue-700"
                      >编辑</nuxt-link
                    >
                    <button
                      v-if="status.isOwn"
                      @click="delArticle(article._id)"
                      class="text-red-500"
                    >
                      删除
                    </button>
                  </div>
                  <p class="text-gray-500 text-sm">
                    {{ article.createDate | formatTime }}・3 min read
                  </p>
                </div>
                <div class="mt-4" v-html="article.content_html"></div>
              </div>
            </article>
          </div>
          <!-- <div class="p-4 bg-white shadow mt-4">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold">
                Discussion {{ article.comments_count }}
              </h3>
            </div>
            <div class="flex mt-4">
              <img src="" alt="" class="w-6 h-6 rounded-full flex-none mr-3" />
              <textarea
                class="border w-full rounded-md p-2 placeholder-gray-500 resize-none"
                name="comment"
                id="comment"
                rows="3"
              >
Add to the discussion</textarea
              >
            </div>
          </div>
          <comments-block class="comments-block" /> -->
        </div>
      </div>

      <!-- right -->
      <div
        class="hidden lg:flex lg:flex-auto lg:flex-col lg:items-start space-x-2"
      >
        <!-- user info -->
        <div
          class="w-full flex flex-col justify-center p-4 border space-y-4 border-gray-200 rounded-lg bg-white"
        >
          <nuxt-link :to="{ name: 'id', params: { id: user._id } }">
            <div class="flex items-end space-x-2">
              <img
                :src="user.avatar"
                :alt="user.username"
                class="h-12 w-12 object-cover rounded-full"
              />
              <h2 class="font-bold text-lg hover:text-blue-700">
                {{ user.username }}
              </h2>
            </div>
          </nuxt-link>
          <button
            v-if="!user.isOwn && !user.isFollow"
            class="w-full bg-blue-700 text-white p-2 rounded-lg font-medium focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
          >
            关注TA
          </button>
          <button
            v-if="!user.isOwn && user.isFollow"
            class="w-full bg-blue-700 text-white p-2 rounded-lg font-medium focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
          >
            取消关注
          </button>
          <div v-if="user.summary">
            <div class="font-medium text-gray-500">关于</div>
            <div>{{ user.summary }}</div>
          </div>
          <div v-if="user.location">
            <div class="font-medium text-gray-500">location</div>
            <div>{{ user.location }}</div>
          </div>
          <div>
            <div class="font-medium text-gray-500">加入时间</div>
            <div>{{ user.createDate | formatTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      user: {},
      article: {},
      status: {},
    };
  },
  head() {
    return {
      title: this.article.title,
    };
  },

  async fetch() {
    await this.getArticle();
    await this.getStatus();
  },

  methods: {
    async getArticle() {
      const res = await this.$axios.$get(
        `/article/${this.$route.params.articleId}`
      );
      if (res.code === 0) {
        this.article = res.data.article;
        this.user = res.data.article.user;
      }
    },

    // 获取登录用户的操作状态
    async getStatus() {
      const res = await this.$axios.$get(
        `/status/${this.$route.params.articleId}`,
        { params: { object: "Article" } }
      );
      if (res.code === 0) {
        this.status = res.data.status;
      }
    },

    // 用户行为操作（一个函数包含6种操作）
    async action(type, isType) {
      const data = { object: "Article", type };
      let res;
      if (!this.status[isType]) {
        res = await this.$axios.$post(
          `/action/${this.$route.params.articleId}`,
          data
        );
      } else {
        res = await this.$axios.$put(
          `/action/${this.$route.params.articleId}`,
          data
        );
      }
      if (res.code === 0) {
        // 重新获取文章详情和用户操作状态
        this.getArticle();
        this.getStatus();
      }
    },

    async delArticle(id) {
      const res = await this.$axios.$delete(`/article/${id}`);
      if (res.code === 0) {
        const { redirect } = this.$route.query;
        redirect ? this.$router.push(redirect) : this.$router.push("/");
      }
    },
  },
  filters: {
    formatTime: function (value) {
      return moment(value, "YYYY-MM-DD").endOf("day").fromNow();
    },
  },
};
</script>
