<template>
  <div class="w-2/3">
    <div class="flex flex-col space-y-2">
      <div class="border shadow rounded-lg bg-white">
        <div class="echart" style="width: 100%; height: 300px" />
      </div>
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
      tagProportion: [],
    };
  },
  async fetch() {
    this.getUserTagProportion();
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

    // 获取标签比重
    async getUserTagProportion() {
      const res = await this.$axios.$get(`/${this.$route.params.id}/user-tag`);
      if (res.code === 0) {
        this.tagProportion = res.data.tagProportion;
        this.initChart();
      }
    },

    initChart() {
      const pieChartElement = this.$el.querySelector(".echart");
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
            data: this.tagProportion,
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
  },
};
</script>
