<template>
  <div class="px-4 py-4 shadow rounded-lg bg-white">
    <nuxt-link
      :to="{ name: 'id', params: { id: article.user._id } }"
      class="flex items-center"
    >
      <img
        class="w-8 h-8 bg-gray-500 rounded-full mr-2 flex-none object-cover"
        :src="article.user.avatar"
        alt="article.user.username"
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
