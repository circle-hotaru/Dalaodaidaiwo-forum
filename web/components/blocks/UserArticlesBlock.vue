<template>
  <div class="w-2/3">
    <div class="flex flex-col space-y-2">
      <div class="border shadow rounded-lg bg-white"><div id="echart" /></div>
      <article-card-block
        v-for="article in articles"
        :key="article._id"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import ArticleCardBlock from "@/components/blocks/ArticleCardBlock";
import InlineErrorBlock from "@/components/blocks/InlineErrorBlock";
import echarts from "echarts";

export default {
  components: {
    ArticleCardBlock,
    InlineErrorBlock,
  },
  data() {
    return {
      page: 1, // 页数
      articles: [],
    };
  },
  mounted() {
    const pieChartElement = this.$el.querySelector("#echart");
    const pieChart = echarts.init(pieChartElement);
    const options = {
      title: {
        text: "标签比重",
        top: "10px",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "标签",
          type: "pie",
          radius: "50%",
          data: [
            { value: 8, name: "VueJS" },
            { value: 5, name: "NodeJS" },
            { value: 8, name: "NuxtJS" },
            { value: 4, name: "Python" },
            { value: 2, name: "JavaScript" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    pieChart.setOption(options);
  },
  async fetch() {
    this.getUserArticleList();
  },
  methods: {
    // 获取文章列表
    async getUserArticleList() {
      const page = this.page;
      const res = await this.$axios.$get(
        `/${this.$route.params.id}/user-article`,
        {
          params: { page, pageSize: 5 },
        }
      );
      if (res.code === 0) {
        this.articles = res.data.articleList;
      }
    },
  },
};
</script>

<style scoped>
#echart {
  height: 350px;
}
</style>
