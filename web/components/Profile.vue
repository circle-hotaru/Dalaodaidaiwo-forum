<template>
  <div
    class="relative h-full flex items-center"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <button
      class="rounded-full overflow-hidden focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
    >
      <img :src="userInfo.avatar" class="h-8 w-8" alt="Profile" />
    </button>
    <transition
      enter-active-class="transition-all ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition-all ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="show"
        class="bg-white w-56 rounded-md border-2 border-gray-900 absolute top-12 right-0 mt-2 super-shadow overflow-hidden origin-top-right"
      >
        <div class="p-2 border-b">
          <p>{{ userInfo.username }}</p>
          <p class="text-sm text-gray-500">@{{ userInfo.username }}</p>
        </div>
        <ul class="border-b p-2">
          <nuxt-link
            :to="{
              name: 'id',
              params: { id: userInfo._id },
            }"
          >
            <li class="py-2 pl-1 rounded hover:bg-gray-100">个人主页</li>
          </nuxt-link>
          <nuxt-link :to="{ name: 'article-edit' }">
            <li class="py-2 pl-1 rounded hover:bg-gray-100">写文章</li>
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'id-editProfile', params: { id: userInfo._id } }"
            ><li class="py-2 pl-1 rounded hover:bg-gray-100">
              设置
            </li></nuxt-link
          >
        </ul>
        <div class="p-2">
          <p @click="logout" class="py-2 pl-1 rounded hover:bg-gray-100">
            登出
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    // 用户信息
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    // 退出登录
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.super-shadow {
  box-shadow: 4px 4px 0 #08090a;
}
</style>
