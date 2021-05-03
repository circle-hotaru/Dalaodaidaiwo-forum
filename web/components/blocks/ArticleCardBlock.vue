<template>
  <div class="px-2 py-4 shadow rounded-lg bg-white">
    <nuxt-link
      :to="{ name: 'id', params: { id: article.user._id } }"
      class="flex items-center"
    >
      <img
        class="w-8 h-8 bg-gray-500 rounded-full mr-2 flex-none object-cover"
        :src="article.user.avatar"
        alt=""
      />
      <div>
        <h3 class="text-gray-600 font-semibold text-sm">
          {{ article.user.username }}
        </h3>
        <p class="text-xs text-gray-500">
          {{ article.createDate | formatTime }}
        </p>
      </div>
    </nuxt-link>
    <div class="md:pl-10">
      <h2 class="text-xl md:text-3xl mt-4 font-bold hover:text-primary-500">
        <nuxt-link
          :to="{
            name: 'id-articleId',
            params: { id: article.user._id, articleId: article._id },
          }"
          >{{ article.title }}</nuxt-link
        >
      </h2>
      <ul class="flex mt-2">
        <li
          class="mr-2 text-sm flex-none text-gray-500 hover:text-gary-900"
          v-for="(tag, index) in article.tags"
          :key="index"
        >
          <nuxt-link :to="{ name: 'tags-tag', params: { tag: tag.name } }"
            >#{{ tag.name }}</nuxt-link
          >
        </li>
      </ul>
      <div class="flex justify-between mt-4 items-center text-gray-500">
        <div>
          <button
            class="px-4 py-1 mr-2 text-sm text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none"
          >
            <div class="flex items-center">
              <span>{{ article.positive_reactions_count }} </span>
              <div class="h-4 w-4 inline-block mx-1">
                <svg
                  class="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span class="hidden md:inline">喜欢</span>
            </div>
          </button>
          <button
            class="px-4 py-1 mr-2 text-sm text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none"
          >
            <div class="flex items-center">
              <span>{{ article.comments_count }} </span>
              <div class="h-4 w-4 inline-block mx-1">
                <svg
                  class="h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span class="hidden md:inline">评论</span>
            </div>
          </button>
        </div>
        <div>
          <span class="text-xs mr-2">5 min read</span>
          <button
            class="px-4 py-2 text-gray-700 hover:bg-gray-300 mr-2 text-sm rounded-md bg-gray-200 focus:outline-none"
          >
            收藏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    article: {
      type: Object,
    },
  },
  filters: {
    formatTime: function (value) {
      return moment(value, "YYYY-MM-DD").endOf("day").fromNow();
    },
  },
};
</script>
