<template>
  <article class="bg-white shadow mb-2">
    <!-- <img class="h-60 w-full bg-primary-700" src="" alt=""> -->
    <div class="px-2 py-6">
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-gray-300 rounded-full animate-pulse mr-2 flex-none"
        ></div>
        <div>
          <h3 class="bg-gray-300 h-3 w-16 rounded-md animate-pulse mb-2"></h3>
          <p class="bg-gray-300 w-9 h-2 rounded-md animate-pulse"></p>
        </div>
      </div>
      <div class="md:pl-10">
        <div class="w-full h-3 bg-gray-300 rounded animate-pulse mt-4"></div>
        <div class="w-1/2 h-2 bg-gray-300 rounded animate-pulse mt-2"></div>
        <ul class="flex my-2">
          <li
            class="mr-2 text-sm flex-none text-gray-500 hover:text-gray-900"
            v-for="(tag, index) in [1, 2, 3, 4]"
            :key="index"
          >
            <div
              class="w-7 mt-1 h-2 bg-gray-300 rounded-md animate-pulse"
            ></div>
          </li>
        </ul>
     
      </div>
    </div>
  </article>
</template>
