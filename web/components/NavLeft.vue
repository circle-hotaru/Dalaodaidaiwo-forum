<template>
  <ul class="space-y-1 z-50">
    <li
      class="text-gray-900 hover:text-primary-500 hover:bg-gray-200 md:rounded py-1 lg:px-2 px-8"
      v-for="(link, index) in links"
      :key="index"
    >
      <router-link
        :to="{ name: link.to }"
        exact
        class="flex items-center flex-none"
      >
        {{ link.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "主页", to: "index", icon: "" },
        // { name: "登录 / 注册", to: "auth", icon: "" },
        { name: "标签", to: "tags", icon: "" },
        { name: "关于", to: "about", icon: "" },
        { name: "反馈", to: "contact", icon: "" },
      ],
    };
  },
};
</script>
