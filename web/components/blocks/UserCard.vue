<template>
  <div
    class="flex justify-between items-center bg-white p-4 border shadow rounded-lg"
  >
    <nuxt-link :to="{ name: 'id', params: { id: user._id } }">
      <img
        alt="user.username"
        :src="user.avatar"
        class="shadow-xl rounded-full sm:ml-6 h-auto border-none"
        style="max-width: 50px"
      />
    </nuxt-link>
    <div class="flex-grow sm:ml-4 text-left">
      <nuxt-link :to="{ name: 'id', params: { id: user._id } }">
        <h2 class="text-lg font-semibold leading-normal text-gray-800">
          {{ user.username }}
        </h2>
      </nuxt-link>
      <p class="text-gray-500">
        {{ user.summary }}
      </p>
    </div>
    <button
      v-if="!user.isOwn && !user.isFollow"
      class="sm:mr-6 px-5 py-2 rounded-md bg-white text-green-500 border border-green-500 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-600 focus:outline-none"
      @click="followUser"
    >
      关注TA
    </button>
    <button
      v-if="!user.isOwn && user.isFollow"
      class="sm:mr-6 px-5 py-2 rounded-md bg-white text-green-500 border border-green-500 focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-600 focus:outline-none"
      @click="unfollowUser"
    >
      取消关注
    </button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    async getUserInfo() {
      const res = await this.$axios.$get(`/user/${this.user._id}`);
      if (res.code === 0) {
        this.user = res.data.user;
      }
    },
    // 关注用户
    async followUser() {
      const res = await this.$axios.$put(`/user-follow/${this.user._id}`);
      if (res.code === 0) {
        this.getUserInfo();
      }
    },
    // 取关用户
    async unfollowUser() {
      const res = await this.$axios.$delete(`/user-follow/${this.user._id}`);
      if (res.code === 0) {
        this.getUserInfo();
      }
    },
  },
};
</script>
