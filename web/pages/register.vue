<template>
  <div
    class="h-screen w-screen mx-auto flex justify-center items-center bg-gray-50"
  >
    <div class="shadow-lg w-full sm:w-96 p-4 flex flex-col bg-white rounded-lg">
      <h1 class="text-3xl text-gray-800 text-center font-bold mb-4">
        Welcome to DLDDW
      </h1>
      <input
        type="text"
        v-model="user.username"
        placeholder="用户名"
        class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-bule-500"
      />
      <input
        type="email"
        v-model="user.email"
        placeholder="邮箱"
        class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-blue-500"
      />
      <input
        type="password"
        v-model="user.password"
        placeholder="密码"
        class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-blue-500"
      />
      <button
        @click="register"
        class="w-full bg-green-400 text-white p-3 rounded-lg font-semibold text-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-600 focus:outline-none"
      >
        注册
      </button>
      <hr class="my-4" />
      <div class="mt-6 mx-auto mb-4">
        <p class="inline">已有账号？立即</p>
        <nuxt-link :to="{ name: 'login' }" class="text-blue-700">
          登录
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    async register() {
      let data = this.user;
      const res = await this.$axios.$post("/register", data);

      // 注册成功
      if (res.code === 0) {
        // 跳转到登录页
        this.$router.push("/login");
      }
    },
  },
};
</script>
