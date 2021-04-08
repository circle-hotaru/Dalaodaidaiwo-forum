<template>
  <div class="flex">
    <nuxt-link
      :to="{
        name: 'username',
        params: { username: comment.user.username },
      }"
      class="flex-shrink-0 mr-3"
    >
      <img
        :src="comment.user.profile_image_90"
        :alt="comment.user.name"
        class="mt-4 rounded-full w-8 h-8 sm:w-10 sm:h-10"
      />
    </nuxt-link>

    <div
      class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
    >
      <strong>{{ comment.user.name }}</strong>
      <span class="text-xs text-gray-400">3:34 PM</span>
      <div v-html="comment.body_html" class="text-sm"></div>

      <comment-block
        v-for="reply in comment.children"
        :key="reply.id_code"
        :comment="reply"
        :level="level + 1"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script>
import CommentBlock from "@/components/blocks/CommentBlock";
export default {
  name: "CommentBlock",
  components: {
    CommentBlock,
  },
  props: {
    comment: {
      type: Object,
      default: null,
    },
    level: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>
</style>
