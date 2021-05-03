<template>
  <div class="w-screen flex justify-center">
    <div
      class="w-full md:w-11/12 max-w-screen-lg flex flex-col items-center space-y-4"
    >
      <header class="w-full text-2xl font-semibold text-left">个人设置</header>
      <main class="w-full flex flex-col items-center">
        <div class="w-3/4 flex flex-col items-center space-y-8">
          <!-- 基本信息 -->
          <div
            class="w-full flex flex-col items-center border rounded shadow p-4 space-y-4"
          >
            <h2 class="w-full text-xl font-semibold">基本信息</h2>
            <div class="w-full flex flex-col space-y-2">
              <label for="userInfo[username]" class="font-semibold"
                >用户名</label
              >
              <input
                type="text"
                maxlength="30"
                v-model="userInfo.username"
                placeholder="用户名"
                id="userInfo[username]"
                class="w-full py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-bule-500"
              />
            </div>
            <div class="w-full flex flex-col space-y-2">
              <label for="userInfo[email]">邮箱</label>
              <input
                type="email"
                maxlength="30"
                v-model="userInfo.email"
                placeholder="邮箱"
                id="userInfo[email]"
                class="w-full py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-blue-500"
              />
            </div>
            <div class="w-full flex flex-col space-y-2">
              <label for="userInfo[avatar]">头像</label>
              <div class="flex items-center space-x-2">
                <span class="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    :src="userInfo.avatar"
                    class="w-full h-full rounded-full"
                    alt="avatar"
                  />
                </span>
                <input
                  accept="image/*"
                  type="file"
                  @change="imgAdd($event)"
                  name="userInfo[avatar]"
                  id="userInfo[avatar]"
                  class="w-full p-3 border border-gray-400 flex-1 rounded-md"
                />
              </div>
            </div>
          </div>

          <!-- 保存 -->
          <div
            class="w-full mb-6 p-4 flex justify-center border rounded shadow"
          >
            <button
              @click="saveProfile"
              class="w-full px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
            >
              保存
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 深拷贝一份用户信息, 用于修改
      userInfo: JSON.parse(JSON.stringify(this.$store.state.userInfo)),
    };
  },
  head() {
    return {
      title: `${this.userInfo.username} 的资料设置`,
    };
  },
  methods: {
    // 上传图片
    async imgAdd(event) {
      let file = event.target.files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      const res = await this.$axios.$post("/upload/images/web_user", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.userInfo.avatar = res.data.url;
    },

    // 保存用户信息
    async saveProfile() {
      const data = this.userInfo;
      const res = await this.$axios.$put(`/user`, data);
      if (res.code === 0) {
        // 更新数据
        this.$store.commit("userInfo", res.data.user);
        this.userInfo = res.data.user;
        const { redirect } = this.$route.query;
        redirect ? this.$router.push(redirect) : this.$router.push("/");
      }
    },
  },
};
</script>
