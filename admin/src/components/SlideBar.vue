<template>
  <div class="slide-bar">
    <div class="slide-bar-logo">
      <img class="logo" src="../assets/logo.png" />
      <span class="title">DDW</span>
    </div>

    <el-menu
      router
      text-color="#bfcbd9"
      background-color="#304156"
      active-text-color="#409eff"
      :unique-opened="true"
      :default-active="$route.path"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home" />
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-collection-tag" />
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item index="/article/list">文章列表</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-collection-tag" />
          <span slot="title">标签管理</span>
        </template>
        <el-menu-item index="/tag/add">新增标签</el-menu-item>
        <el-menu-item index="/tag/list">标签列表</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-custom" />
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="/user/list">用户列表</el-menu-item>
      </el-submenu>

      <!-- <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-tools" />
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="/system/admin-add">新增管理员</el-menu-item>
        <el-menu-item index="/system/admin-list">管理员列表</el-menu-item>
      </el-submenu> -->

      <el-menu-item class="github-link">
        <a
          href="https://github.com/circle-hotaru/Dalaodaidaiwo-forum"
          target="_blank"
        >
          <i class="el-icon-link" />
          <span slot="title">友情链接</span>
        </a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/variable.styl';

.slide-bar {
  .slide-bar-logo {
    color: $colorA;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    background-color: $colorJ;
    overflow: hidden;

    .logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }

    .title {
      margin-left: 15px;
      font-weight: 700;
    }
  }

  .el-menu {
    border: none;
  }

  .el-menu i {
    color: $colorD;
    margin-right: 10px;
  }

  .el-menu .github-link i {
    color: $colorD !important;
  }

  .el-menu .el-menu-item.is-active i {
    color: $colorB;
  }

  .el-menu .el-submenu li, >>> .el-menu .el-submenu ul .el-submenu__title {
    background-color: $colorF !important;
  }

  .el-menu .el-submenu li:hover, >>> .el-menu .el-submenu ul .el-submenu__title:hover {
    background-color: $colorG !important;
  }
}
</style>
