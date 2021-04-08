<template>
  <div class="relative">
    <div v-if="showNav" class="fixed z-50 pt-6 w-full">
      <div
        class="h-screen md:hidden w-10/12 z-50 md:bg-none border-r border-gray-200 pt-10"
      >
        <slider-left class="h-screen bg-white" />
      </div>
    </div>

    <nav
      class="bg-white border-b flex justify-between px-2 items-center py-3 fixed w-full z-50"
    >
      <div class="flex items-center">
        <div class="md:hidden">
          <div
            @click="showNav = !showNav"
            class="h-10 w-10 hover:bg-gray-200 rounded-full flex justify-center items-center"
          >
            <svg
              v-if="!showNav"
              class="h-8 w-8 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-8 w-8 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div
          class="bg-gray-900 text-gray-200 rounded text-lg px-2 py-1.5 lg:py-2 font-bold ml-2 tracking-tight"
        >
          <nuxt-link :to="{ name: 'index' }">DEV</nuxt-link>
        </div>
      </div>

      <search />

      <div class="flex-none">
        <button
          class="hidden md:inline py-2 text-primary-500 px-4 hover:bg-gray-100 rounded-md text-center font-semibold w-auto mr-1"
        >
          登录
        </button>
        <button
          class="bg-primary-600 inline py-2 text-white rounded-md text-center font-semibold w-auto px-3"
        >
          注册
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import SliderLeft from "@/components/SliderLeft";
import Search from "@/components/Search";
export default {
  components: {
    SliderLeft,
    Search,
  },
  data() {
    return {
      showNav: false,
    };
  },
};
</script>
