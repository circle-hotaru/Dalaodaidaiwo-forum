<template>
  <div class="article-secu">
    <el-card class="box-list-card">
      <div class="left">
        <i class="el-icon-document" />
        <span class="title">文章列表</span>
      </div>
    </el-card>

    <el-table :data="articleList" border style="width: 100%">
      <el-table-column prop="number" label="编号" width="150" />
      <el-table-column prop="_id" label="ID" width="450" />
      <el-table-column prop="title" label="标题" width="550" />
      <el-table-column label="操作" min-width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delArticle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import article from "@/api/article";
export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    // 获取文章列表
    async getArticleList() {
      const res = await article.articleList();
      if (res.code === 0) {
        this.handleArticleList(res.data.articleList);
      }
    },

    // 删除文章
    delArticle(row) {
      this.$confirm(`确认要删除文章"${row.title}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await article.delArticle({ id: row._id });
          // 删除成功
          if (res.code === 0) {
            this.$message({ type: "success", message: "删除成功" });
            this.getArticleList();
          }
        })
        .catch(() => {});
    },

    // 对返回的数据进行处理
    handleArticleList(data) {
      data.forEach((item, index) => {
        item.number = index + 1;
      });
      this.articleList = data;
    },
  },
};
</script>
