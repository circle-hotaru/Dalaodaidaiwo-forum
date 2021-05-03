<template>
  <div class="mb-4 full-width md:w-1/2 p-1 lg:w-1/3">
    <article class="shadow border-l-8 bg-white">
      <div class="px-4 py-2" style="">
        <h2 class="text-lg font-bold leading-tight md:text-2xl">
          <nuxt-link :to="{ name: 'tags-tag', params: { tag: tag.name } }"
            >#{{ tag.name }}</nuxt-link
          >
        </h2>
        <div class="mt-2 md:flex justify-end">
          <div>
            <button
              class="text-primary-500 font-semibold hover:bg-primary-500 hover:bg-opacity-10 hover:text-primary-500 rounded-md py-2 text-center px-4 focus:outline-none"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
    },
  },
};
</script>
