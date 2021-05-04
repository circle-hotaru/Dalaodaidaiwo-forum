<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full md:w-11/12 max-w-screen-lg">
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
        <div
          class="flex flex-col sm:flex-row space-y-2 justify-center items-center sm:justify-between bg-white p-4 sm:rounded"
        >
          <img
            alt="avatar"
            :src="userInfo.avatar"
            class="shadow-xl rounded-full sm:ml-6 h-auto border-none"
            style="max-width: 150px"
          />
          <div class="flex-grow sm:ml-4 text-center sm:text-left">
            <h3
              class="text-4xl font-semibold leading-normal text-gray-800 mb-2"
            >
              {{ userInfo.username }}
            </h3>
            <p class="mr-2 text-lg text-gray-500 mb-2">
              {{ userInfo.summary }}
            </p>
            <div class="flex justify-center sm:justify-start">
              <a
                v-if="userInfo.github_url"
                :href="userInfo.github_url"
                target="_blank"
                class="mx-1"
              >
                <fa
                  :icon="['fab', 'github']"
                  class="text-2xl hover:text-gray-800"
                />
              </a>
              <a
                v-if="userInfo.website_url"
                :href="userInfo.website_url"
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="mx-1"
              >
                <fa
                  :icon="['fas', 'link']"
                  class="text-2xl hover:text-gray-800"
                />
              </a>
            </div>
          </div>
          <nuxt-link
            :to="{ name: 'id-editProfile', params: { id: userInfo._id } }"
          >
            <button
              v-if="userInfo.isOwn"
              class="sm:mr-6 px-5 py-2 rounded-md bg-white text-green-500 border border-green-500 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-600 focus:outline-none"
            >
              编辑资料
            </button>
          </nuxt-link>
          <button
            v-if="!userInfo.isOwn && !userInfo.isFollow"
            class="sm:mr-6 px-5 py-2 rounded-md bg-white text-green-500 border border-green-500 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-600 focus:outline-none"
            @click="followUser"
          >
            关注TA
          </button>
          <button
            v-if="!userInfo.isOwn && userInfo.isFollow"
            class="sm:mr-6 px-5 py-2 rounded-md bg-white text-green-500 border border-green-500 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-600 focus:outline-none"
            @click="unfollowUser"
          >
            取消关注
          </button>
        </div>
      </template>
    </div>
    <div
      class="w-full md:w-11/12 max-w-screen-lg mt-4 flex justify-between space-x-4"
    >
      <div
        class="hidden md:flex h-36 md:flex-auto md:justify-around md:items-center text-lg md:p-4 md:space-x-2 border shadow rounded-lg bg-white"
      >
        <div
          @click="getFollowsList"
          class="flex flex-col items-center space-y-2 cursor-pointer"
        >
          <p>关注了</p>
          {{ userInfo.numFollows }}
        </div>
        <div
          @click="getFansList"
          class="flex flex-col items-center space-y-2 cursor-pointer"
        >
          <p>关注者</p>
          {{ userInfo.numFans }}
        </div>
      </div>

      <!-- 右侧 -->
      <div class="w-2/3">
        <div v-if="!type" class="flex flex-col space-y-2">
          <user-card
            v-for="(user, index) in followsList"
            :key="user._id"
            :user="user"
            v-observe-visibility="
              index === followsList.length - 1 ? lazyLoad : false
            "
          />
        </div>
        <div v-if="type" class="flex flex-col space-y-2">
          <user-card
            v-for="(user, index) in fansList"
            :key="user._id"
            :user="user"
            v-observe-visibility="
              index === fansList.length - 1 ? lazyLoad : false
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InlineErrorBlock from "@/components/blocks/InlineErrorBlock";
import UserCard from "@/components/blocks/UserCard";

export default {
  components: {
    InlineErrorBlock,
    UserCard,
  },
  data() {
    return {
      hasUser: true, // 用户是否存在
      userInfo: {},
      type: 0, // 0 关注列表， 1 粉丝列表
      followsList: [],
      fansList: [],
      page: 1,
      pageSize: 10,
      hasNext: false,
    };
  },
  head() {
    return {
      title: `${this.userInfo.username} 的个人主页`,
    };
  },
  async fetch() {
    await this.getUserInfo();
    await this.getFollowsList();
    await this.getFansList();
  },
  methods: {
    async getUserInfo() {
      const res = await this.$axios.$get(`/user/${this.$route.params.id}`);
      try {
        if (res.code === 0) {
          this.hasUser = true;
          this.userInfo = res.data.user;
        } else {
          // id合法, 但用户不存在
          this.hasUser = false;
          this.userInfo = {};
        }
      } catch (error) {
        this.hasUser = false;
        this.userInfo = {};
      }
    },

    // 获取粉丝列表
    async getFansList() {
      const { page, pageSize } = this;
      const res = await this.$axios.$get(
        `/${this.$route.params.id}/user-fans`,
        {
          params: { page, pageSize },
        }
      );
      if (res.code === 0) {
        this.fansList = res.data.fansList;
        this.hasNext = res.data.hasNext;
        this.type = 1;
      }
    },

    // 获取关注列表
    async getFollowsList() {
      const { page, pageSize } = this;
      const res = await this.$axios.$get(
        `/${this.$route.params.id}/user-follows`,
        {
          params: { page, pageSize },
        }
      );
      if (res.code === 0) {
        this.followsList = res.data.followsList;
        this.hasNext = res.data.hasNext;
        this.type = 0;
      }
    },

    // 关注用户
    async followUser() {
      const res = await this.$axios.$put(
        `/user-follow/${this.$route.params.id}`
      );
      if (res.code === 0) {
        this.getUserInfo();
      }
    },
    // 取关用户
    async unfollowUser() {
      const res = await this.$axios.$delete(
        `/user-follow/${this.$route.params.id}`
      );
      if (res.code === 0) {
        this.getUserInfo();
      }
    },

    lazyLoad(isVisible) {
      if (this.hasNext) {
        if (isVisible) {
          this.page++;
          this.$fetch();
        }
      }
    },
  },
};
</script>
