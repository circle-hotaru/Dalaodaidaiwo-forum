<template>
  <div
    class="hidden md:flex md:flex-auto md:flex-col md:items-start space-y-2 md:p-4 rounded-lg"
  >
    <!-- <div class="md:border border-b md:rounded-md bg-white p-4 hidden md:block">
      <h2 class="text-lg font-bold">
        <span class="text-primary-500">DEV Community</span> is a community of
        573,072 amazing developers
      </h2>
      <p class="mt-4 text-gray-500 leading-tight">
        We're a place where coders share, stay up-to-date and grow their
        careers.
      </p>
      <button
        class="block bg-primary-600 py-2 hover:text-primary-600 text-white rounded-md text-center font-semibold w-full mt-2"
      >
        Create new account
      </button>
      <button
        class="block py-2 text-primary-500 hover:bg-gray-100 rounded-md text-center font-semibold w-full mt-2"
      >
        Log in
      </button>
    </div> -->
    <nav-left />
    <nav-tag-left />
  </div>
</template>

<script>
import NavLeft from "@/components/NavLeft";
import NavTagLeft from "@/components/NavTagLeft";
export default {
  components: {
    NavLeft,
    NavTagLeft,
  },
};
</script>

<style>
</style>
