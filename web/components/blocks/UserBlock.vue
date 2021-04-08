<template>
  <section>
    <template v-if="$fetchState.pending">
      <div class="image-wrapper loading">
        <content-placeholders>
          <content-placeholders-img />
        </content-placeholders>
      </div>
      <div class="content">
        <content-placeholders rounded>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders rounded>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="image-wrapper">
        <img :src="user.profile_image" :alt="user.name" />
      </div>
      <div class="content">
        <h1>{{ user.name }}</h1>
        <a
          :href="`https://dev.to/${user.username}`"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="f-button"
        >
          Follow
        </a>
        <div v-if="user.summary" class="summary">{{ user.summary }}</div>
        <div class="links">
          <a
            v-if="user.twitter_username"
            :href="`https://twitter.com/${user.twitter_username}`"
            target="_blank"
          >
            <twitter-icon />
          </a>
          <a
            v-if="user.github_username"
            :href="`https://github.com/${user.github_username}`"
            target="_blank"
          >
            <github-icon />
          </a>
          <a
            v-if="user.website_url"
            :href="user.website_url"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <external-link-icon />
          </a>
        </div>
      </div>

      <div class="info">
        <div v-if="user.location">
          <div class="title">location</div>
          <div class="content">{{ user.location }}</div>
        </div>
        <div v-if="user.joined_at">
          <div class="title">joined</div>
          <div class="content">{{ user.joined_at }}</div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import InlineErrorBlock from "@/components/blocks/InlineErrorBlock";
import TwitterIcon from "~/assets/icons/twitter.svg?inline";
import GithubIcon from "~/assets/icons/github.svg?inline";
import ExternalLinkIcon from "~/assets/icons/external-link.svg?inline";
export default {
  components: {
    TwitterIcon,
    GithubIcon,
    ExternalLinkIcon,
    InlineErrorBlock,
  },
  data() {
    return {
      user: {},
    };
  },
  head() {
    return {
      title: this.user.name,
    };
  },
  async fetch() {
    const res = await this.$axios.get(`/users/by_username`, {
      params: {
        url: this.$route.params.username,
      },
    });
    this.user = await res.data;
  },
};
</script>
