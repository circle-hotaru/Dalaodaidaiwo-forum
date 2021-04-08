<template>
  <div class="space-x-1.5">
    <div
      @click="$router.push('/')"
      class="px-2 py-2 text-gray-500 text-center hover:bg-primary-500 hover:bg-opacity-10 hover:text-primary-500 rounded-md focus:outline-none inline-block"
    >
      <span>
        <nuxt-link
          to="/"
          active-class="text-primary-500 border-b-2 border-primary-500"
          exact
          >推荐</nuxt-link
        >
      </span>
    </div>
    <div
      @click="$router.push({ name: 't-top', params: { top: tab.to } })"
      class="px-2 py-2 text-gray-500 text-center hover:bg-primary-500 hover:bg-opacity-10 hover:text-primary-500 rounded-md focus:outline-none inline-block"
      v-for="(tab, index) in tabs"
      :key="index"
    >
      <span>
        <nuxt-link
          :to="{ name: 't-top', params: { top: tab.to } }"
          active-class="text-primary-500 border-b-2 border-primary-500"
          exact
          >{{ tab.title }}
        </nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "昨日", to: "yesterday" },
        { title: "周榜", to: "week" },
        { title: "月榜", to: "month" },
      ],
    };
  },
};
</script>
