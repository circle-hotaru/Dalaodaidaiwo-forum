<template>
  <article class="bg-white shadow mb-2">
    <img
      v-if="post.social_image"
      class="h-60 w-full bg-gray-200"
      :src="post.social_image"
      alt=""
    />
    <div class="px-2 py-4">
      <div class="flex items-center">
        <img
          class="w-8 h-8 bg-gray-500 rounded-full mr-2 flex-none object-cover"
          :src="post.user.profile_image"
          alt=""
        />
        <div>
          <h3 class="text-gray-600 font-semibold text-sm">
            {{ post.user.name }}
          </h3>
          <p class="text-xs text-gray-500">{{ post.readable_publish_date }}</p>
        </div>
      </div>
      <div class="md:pl-10">
        <h2 class="text-xl md:text-3xl mt-4 font-bold hover:text-primary-500">
          <nuxt-link
            :to="{
              name: 'username-post',
              params: { username: post.user.username, post: post.id },
            }"
            >{{ post.title }}</nuxt-link
          >
        </h2>
        <ul class="flex mt-2">
          <li
            class="mr-2 text-sm flex-none text-gray-500 hover:text-gary-900"
            v-for="(tag, index) in post.tag_list"
            :key="index"
          >
            <nuxt-link :to="{ name: 'tags-tag', params: { tag: tag } }"
              >#{{ tag }}</nuxt-link
            >
          </li>
        </ul>
        <div class="flex justify-between mt-4 items-center text-gray-500">
          <div>
            <button
              class="px-4 py-1 mr-2 text-sm text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              <div class="flex items-center">
                <span>{{ post.positive_reactions_count }} </span>
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
                <span>{{ post.comments_count }} </span>
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
            <span class="text-xs mr-2"
              >{{ post.create_at | formatTime }} read</span
            >
            <button
              class="px-4 py-2 text-gray-700 hover:bg-gray-300 mr-2 text-sm rounded-md bg-gray-200 focus:outline-none"
            >
              收藏
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import moment from "moment";
export default {
  props: {
    post: {
      type: Object,
    },
  },
  filters: {
    formatTime: function (value) {
      return moment(value).endOf("day").fromNow();
    },
  },
};
</script>

<style>
</style>
