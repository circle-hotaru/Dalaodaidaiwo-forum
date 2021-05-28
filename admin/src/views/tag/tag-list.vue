<template>
  <div class="tag-List">
    <el-card class="box-list-card">
      <div class="left">
        <i class="el-icon-document" />
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/tag/add')"
          >添加</el-button
        >
      </div>
    </el-card>

    <el-table :data="tagList" border style="width: 100%">
      <el-table-column prop="number" label="编号" width="150" />
      <el-table-column prop="name" label="标签名称" width="300" />
      <el-table-column label="图标" width="200">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" :src="scope.row.icon" />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="level" label="级别" width="250" />
      <el-table-column label="设置" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.level==='二级'"
            @click="nextLevel(scope.row._id)"
          >查看下级
          </el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" min-width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$router.push(`/tag/update/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="delTag(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination
        v-if="isPage"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import tag from "@/api/tag";
export default {
  name: "TagList",
  data() {
    return {
      isPage: true, // 控制分页器的显示，这里是用于解决一二级标签切换时页码高亮不正确问题
      tagList: [], // 标签列表数据
      total: 0, // 当前级别标签的总数
      page: 1, // 当前页数
      pageSize: 5, // 每页总数
    };
  },
  mounted() {
    // 加载刷新时获取一级标签
    this.getTagList();
  },
  methods: {
    // 获取标签列表
    async getTagList() {
      const { page, pageSize } = this;
      const res = await tag.tagList({ params: { page, pageSize } });
      if (res.code === 0) {
        this.handleTag(res.data);
      }
    },

    // 删除标签
    async delTag(row) {
      this.$confirm(`确认要删除标签"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await tag.delTag({ id: row._id });
          if (res.code === 0) {
            // 删除成功
            this.$message({ type: "success", message: res.msg });
            // 如果当前不是第一页且当前页删除前 只有一条数据, 那么页数-1
            if (this.page !== 1 && this.tagList.length === 1) {
              this.page = this.page - 1;
            }
            this.getTagList();
          }
        })
        .catch(() => {});
    },

    // 对返回的标签数据进行处理
    handleTag(data) {
      data.tagList.forEach((item, index) => {
        if (this.page === 1) {
          item.number = index + 1;
        } else {
          item.number = (this.page - 1) * this.pageSize + (index + 1);
        }
      });
      this.total = data.total;
      this.tagList = data.tagList;
    },

    // 页数改变
    pageChange(currentPage) {
      this.page = currentPage;
      this.getTagList();
    },
  },
};
</script>

<style lang="stylus" scoped></style>

