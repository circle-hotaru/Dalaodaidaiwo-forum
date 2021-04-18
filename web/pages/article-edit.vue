<template>
  <div class="flex flex-col items-center">
    <header class="fixed z-50 top-0 left-0 w-full bg-white border-b">
      <nav class="container mx-auto flex items-center justify-between h-16">
        <nuxt-link :to="{ name: 'index' }">
          <svg
            width="50"
            height="40"
            viewBox="0 0 50 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="50"
              height="40"
              rx="3"
              style="fill: currentColor"
            ></rect>
            <path
              d="M19.099 23.508c0 1.31-.423 2.388-1.27 3.234-.838.839-1.942 1.258-3.312 1.258h-4.403V12.277h4.492c1.31 0 2.385.423 3.224 1.27.846.838 1.269 1.912 1.269 3.223v6.738zm-2.808 0V16.77c0-.562-.187-.981-.562-1.258-.374-.285-.748-.427-1.122-.427h-1.685v10.107h1.684c.375 0 .75-.138 1.123-.415.375-.285.562-.708.562-1.27zM28.185 28h-5.896c-.562 0-1.03-.187-1.404-.561-.375-.375-.562-.843-.562-1.404V14.243c0-.562.187-1.03.562-1.404.374-.375.842-.562 1.404-.562h5.896v2.808H23.13v3.65h3.088v2.808h-3.088v3.65h5.054V28zm7.12 0c-.936 0-1.684-.655-2.246-1.965l-3.65-13.758h3.089l2.807 10.804 2.808-10.804H41.2l-3.65 13.758C36.99 27.345 36.241 28 35.305 28z"
              fill="white"
            ></path>
          </svg>
        </nuxt-link>

        <div class="text-2xl text-gray-600 w-auto">{{ pageTitle }}</div>
        <div>
          <button
            @click="save"
            class="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-blue-800 focus:outline-none"
          >
            {{ btnText }}
          </button>
        </div>
      </nav>
    </header>

    <main class="container flex flex-col space-y-4 mx-auto mt-20 flex-auto">
      <div class="w-full">
        <input
          type="text"
          v-model="article.title"
          placeholder="请输入标题"
          class="text-gray-600 placeholder-gray-600 rounded-md p-4 h-10 bg-gray-100 w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <section>
        <b-taginput
          v-model="article.tags"
          :data="filteredTags"
          autocomplete
          field="name"
          icon="label"
          maxtags="3"
          placeholder="添加标签"
          @typing="getFilteredTags"
          class="z-40"
        >
        </b-taginput>
      </section>

      <no-ssr>
        <mavon-editor
          ref="md"
          :toolbars="markdownOption"
          v-model="content"
          code-style="atom-one-dark"
          @imgAdd="imgAdd"
          @change="change"
          style="z-index: 30 !important"
        />
      </no-ssr>
    </main>
  </div>
</template>

<script>
export default {
  layout: "edit",

  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      pageTitle: "写文章",
      // MD 编辑器内容
      content: "开始编辑",
      btnText: "发布文章",
      article: {
        // 文章数据
        title: "",
        tags: [],
        content_md: "",
        content_html: "",
      },
      tagList: [],
      filteredTags: [],
      // 图片上传地址
      url: "/upload/images/article",
    };
  },

  async fetch() {
    await this.getTagList();
    this.filteredTags = this.tagList;
  },

  methods: {
    // 获取标签列表
    async getTagList() {
      const res = await this.$axios.get("/tag");
      if (res.data.code === 0) {
        this.tagList = res.data.data.tagList;
      }
    },

    // 自动过滤标签
    getFilteredTags(text) {
      this.filteredTags = this.tagList.filter((option) => {
        return (
          option.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      });
    },

    // 新增或更新文章
    async save() {
      const { title, content_md, content_html } = this.article;
      let { tags } = this.article;
      tags = tags.map((item) => item._id);
      // 发送的数据对象
      const data = { title, tags, content_md, content_html };
      // 新增或更新文章
      const res = await this.$axios.post("/article", data);
      // 操作成功
      if (res.code === 0) {
        this.$router.push("/");
      }
    },

    // 上传图片
    async imgAdd(pos, file) {
      const formdata = new FormData();
      formdata.append("file", file);
      const res = await this.$axios.post("/upload/images/article", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // 设置图片到md编辑器
      this.$refs.md.$img2Url(pos, res.data.data.url);
    },

    // MD 编辑器内容改变
    change(value, render) {
      this.article.content_md = value;
      this.article.content_html = render;
    },
  },
};
</script>
