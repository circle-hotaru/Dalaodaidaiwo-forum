<template>
  <div
    class="h-screen w-screen mx-auto flex justify-center items-center bg-gray-50"
  >
    <form
      class="shadow-lg w-full sm:w-96 p-4 flex flex-col bg-white rounded-lg"
    >
      <h1 class="text-3xl text-gray-800 text-center font-bold mb-4">
        Welcome to DLDDW
      </h1>
      <input
        type="text"
        placeholder="用户名"
        class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-bule-500"
      />
      <input
        type="text"
        placeholder="密码"
        class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-blue-500"
      />
      <button
        class="w-full bg-blue-700 text-white p-3 rounded-lg font-semibold text-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
      >
        登录
      </button>
      <a class="text-blue-400 text-center my-2">忘记密码？</a>
      <hr />
      <div class="mt-6 mx-auto mb-4">
        <p class="inline">没有账号？立即</p>
        <nuxt-link :to="{ name: 'signup' }" class="text-green-400">
          注册
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
