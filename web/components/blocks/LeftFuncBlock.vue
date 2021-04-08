<template>
  <div class="space-y-1 z-50 flex flex-col">
    <div
      class="text-gray-900 hover:text-primary-500 hover:bg-gray-200 md:rounded py-1 lg:px-2 px-8 ml-auto"
    >
      <heart-icon />
      {{ positive_reactions_count }}
    </div>
    <div
      class="text-gray-900 hover:text-primary-500 hover:bg-gray-200 md:rounded py-1 lg:px-2 px-8 ml-auto"
      @click="scrollToComments"
    >
      <comments-icon />
      {{ comments_count }}
    </div>
  </div>
</template>

<script>
import HeartIcon from "@/assets/icons/heart.svg?inline";
import CommentsIcon from "@/assets/icons/comments.svg?inline";

export default {
  components: {
    HeartIcon,
    CommentsIcon,
  },
  props: {
    positive_reactions_count: {
      type: Number,
      default: 0,
    },
    comments_count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    scrollToComments() {
      const el = document.querySelector("#comments");
      if (el) {
        const scrollTo = el.getBoundingClientRect().top;
        window.scrollBy({ top: scrollTo - 20, left: 0, behavior: "smooth" });
      }
    },
  },
};
</script>
