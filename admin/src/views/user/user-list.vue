<template>
  <div class="user-secu">
    <el-card class="box-list-card">
      <div class="left">
        <i class="el-icon-document" />
        <span class="title">用户列表</span>
      </div>
    </el-card>

    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="number" label="编号" width="150" />
      <el-table-column prop="_id" label="ID" width="450" />
      <el-table-column prop="username" label="用户名" width="550" />
      <el-table-column label="操作" min-width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delUser(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import user from "@/api/user";
export default {
  name: "UserList",
  data() {
    return {
      userList: [],
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const res = await user.userList();
      if (res.code === 0) {
        this.handleUserList(res.data.userList);
      }
    },

    // 删除用户
    delUser(row) {
      this.$confirm(`确认要删除用户"${row.username}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await user.delUser({ id: row._id });
          // 删除成功
          if (res.code === 0) {
            this.$message({ type: "success", message: "删除成功" });
            this.getUserList();
          }
        })
        .catch(() => {});
    },

    // 对返回的数据进行处理
    handleUserList(data) {
      data.forEach((item, index) => {
        item.number = index + 1;
      });
      this.userList = data;
    },
  },
};
</script>
