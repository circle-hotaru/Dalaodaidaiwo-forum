<template>
  <div>
    <ul v-if="comments.length" id="comments">
      <comment-block
        v-for="comment in comments"
        :key="comment.id_code"
        :comment="comment"
        :level="0"
        class="space-y-4"
      />
    </ul>
  </div>
</template>

<script>
import CommentBlock from "@/components/blocks/CommentBlock";
export default {
  components: {
    CommentBlock,
  },
  async fetch() {
    await this.getComments();
  },
  fetchOnServer: false,
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    async getComments() {
      const res = await this.$axios.get(`/comments`, {
        params: { a_id: this.$route.params.article },
      });
      this.comments = res.data;
    },
  },
};
</script>
