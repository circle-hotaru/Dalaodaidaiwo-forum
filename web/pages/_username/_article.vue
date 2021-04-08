<template>
  <div>
    <div class="flex flex-col lg:flex-row justify-between lg:mt-4">
      <!-- left -->
      <div class="hidden md:block w-1/4 lg:w-1/5 lg:mx-2">
        <left-func-block
          :positive_reactions_count="article.positive_reactions_count"
          :comments_count="article.comments_count"
        />
      </div>

      <div class="lg:w-3/5 w-full mb-10">
        <div class="bg-white border">
          <article>
            <img
              class="h-52 lg:h-72 bg-gray-500 w-full object-cover"
              :src="article.social_image"
              alt=""
            />
            <div class="px-6 py-8">
              <h1
                class="md:text-5xl text-2xl font-bold tracking-wide leading-tight mb-2"
              >
                {{ article.title }}
              </h1>
              <div class="mt-2 text-gray-600">
                <ul class="flex space-x-1 mt-2">
                  <li
                    v-for="tag in article.tags"
                    :key="tag"
                    class="px-1 rounded-md"
                  >
                    <nuxt-link :to="{ name: 'tags-tag', params: { tag: tag } }"
                      >#{{ tag }}</nuxt-link
                    >
                  </li>
                </ul>
                <nuxt-link
                  :to="{
                    name: 'username',
                    params: { username: article.user.username },
                  }"
                  v-if="article.user"
                  class="mt-4 flex items-center"
                >
                  <img
                    :src="article.user.profile_image"
                    :alt="article.user.name"
                    class="w-10 h-10 bg-gray-300 rounded-full mr-3"
                  />
                  <p class="text-gray-800">{{ article.user.name }}</p>
                </nuxt-link>
                <div class="my-4">
                  <p class="text-gray-500 text-sm">
                    {{ article.readable_publish_date }}・3 min read
                  </p>
                </div>
              </div>
              <div class="" v-html="article.body_html"></div>
            </div>
          </article>
        </div>
        <div class="p-4 bg-white shadow mt-4">
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
        <comments-block class="comments-block" />
      </div>

      <!-- right -->
      <div class="lg:w-1/4 w-full lg:mx-2">
        <div class="shadow bg-white">
          <nuxt-link
            :to="{ name: 'username', params: { username: user.username } }"
            class="relative mb-8"
          >
            <div class="h-10 bg-primary-300 rounded-t-md"></div>
            <div class="flex items-end absolute top-3 left-4">
              <img
                :src="user.profile_image"
                alt=""
                class="h-12 w-12 object-cover rounded-full mr-3"
              />
              <h2 class="font-bold text-lg">{{ user.name }}</h2>
            </div>
          </nuxt-link>
          <div class="p-4 text-gray-800">
            <button
              class="block bg-primary-600 py-2 text-white rounded-md text-center font-semibold w-full my-4"
            >
              Follow
            </button>
            <div class="info">
              <div v-if="user.summary">
                <div class="title">about</div>
                <div class="content">{{ user.summary }}</div>
              </div>
              <div v-if="user.location">
                <div class="title">location</div>
                <div class="content">{{ user.location }}</div>
              </div>
              <div v-if="user.joined_at">
                <div class="title">joined</div>
                <div class="content">{{ user.joined_at }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 mb-8 bg-white border shadow">
          <h3 v-if="article.user" class="text-lg font-bold border-b p-4">
            More from
            <span class="text-primary-500">{{ article.user.name }}</span>
          </h3>

          <div
            class="space-y-4 border-b py-4"
            v-for="(article, index) in articles"
            :key="index"
          >
            <div class="px-4">
              <p class="text-gray-800">
                <router-link
                  :to="{
                    name: 'username-article',
                    params: {
                      username: article.user.username,
                      article: article.id,
                    },
                  }"
                >
                  {{ article.title }}
                </router-link>
              </p>
              <ul class="text-gray-500 flex text-sm mt-2 space-x-2">
                <li v-for="(tag, index) in article.tag_list" :key="index">
                  <p>
                    <router-link
                      :to="{ name: 'tags-tag', params: { tag: tag } }"
                    >
                      #{{ tag }}
                    </router-link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsBlock from "@/components/blocks/CommentsBlock";
import LeftFuncBlock from "@/components/blocks/LeftFuncBlock";

export default {
  components: {
    CommentsBlock,
    LeftFuncBlock,
  },
  data() {
    return {
      user: {},
      article: {},
      articles: [],
    };
  },
  head() {
    return {
      title: this.article.title,
    };
  },
  "$route.query": "$fetch",

  async fetch() {
    await this.getUser();
    await this.getArticleById();
    await this.getArticleByUser();
  },

  methods: {
    async getUser() {
      const res = await this.$axios.get(`/users/by_username`, {
        params: { url: this.$route.params.username },
      });
      this.user = res.data;
    },
    async getArticleById() {
      const res = await this.$axios.get(
        `/articles/${this.$route.params.article}`
      );
      this.article = res.data;
    },
    async getArticleByUser() {
      const res = await this.$axios.get(`/articles`, {
        params: {
          state: "rising",
          username: this.$route.params.username,
          per_page: 4,
        },
      });
      this.articles = res.data;
    },
  },
};
</script>
