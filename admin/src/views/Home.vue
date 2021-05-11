<template>
  <div class="dashboard-container">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24">
        <div class="chart-wrapper">
          <pie-chart :chart-data="tagProportion" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";

import tag from "@/api/tag";
import user from "@/api/user";
import article from "@/api/article";

import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";

export default {
  name: "DashboardAdmin",
  components: {
    LineChart,
    PieChart,
  },
  data() {
    return {
      lineChartData: {
        last7Days: [],
        userGrowth: new Array(7).fill(0),
        articleGrowth: new Array(7).fill(0),
      },
      tagProportion: [],
    };
  },
  mounted() {
    this.getGrowth();
    this.getTagProportion();
  },
  methods: {
    async getGrowth() {
      // 过去7天的日期
      let last7Days = this.lineChartData.last7Days;
      last7Days.push(moment().subtract(6, "days").format("MM-DD"));
      last7Days.push(moment().subtract(5, "days").format("MM-DD"));
      last7Days.push(moment().subtract(4, "days").format("MM-DD"));
      last7Days.push(moment().subtract(3, "days").format("MM-DD"));
      last7Days.push(moment().subtract(2, "days").format("MM-DD"));
      last7Days.push(moment().subtract(1, "days").format("MM-DD"));
      last7Days.push(moment().format("MM-DD"));

      const resUser = await user.userGrowth();
      const resArticle = await article.articleGrowth();
      if (resUser.code === 0) {
        for (let item of resUser.data.userGrowth) {
          this.lineChartData.userGrowth[last7Days.indexOf(item._id)] =
            item.count;
        }
      }
      if (resArticle.code === 0) {
        for (let item of resArticle.data.articleGrowth) {
          this.lineChartData.articleGrowth[last7Days.indexOf(item._id)] =
            item.count;
        }
      }
    },

    async getTagProportion() {
      const res = await tag.tagProportion();
      if (res.code === 0) {
        this.tagProportion = res.data.tagProportion;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.dashboard-container {
  padding: 32px;
  background-color: #f0f2f5;
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>