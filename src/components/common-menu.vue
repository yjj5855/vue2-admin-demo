<template>
  <el-menu :router="true" :unique-opened="true" theme="dark" default-active="/" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
    <el-submenu index="/user">
      <template slot="title">
        <!--<el-menu-item index="/user">-->
          <i class="el-icon-message"></i>员工管理
        <!--</el-menu-item>-->
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user/base">员工基本信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/demo">
      <template slot="title">
        <!--<el-menu-item index="/user">-->
        <i class="el-icon-message"></i>demo
        <!--</el-menu-item>-->
      </template>
      <el-menu-item-group>
        <el-menu-item index="/demo">过渡状态</el-menu-item>
        <el-menu-item index="/demo/tree">树形结构拖动</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item index="/login"><i class="el-icon-setting"></i>退出登录</el-menu-item>
  </el-menu>
</template>
<style>
  .el-submenu__title .el-menu-item{
    padding-left: 0!important;
  }
  .el-menu-vertical-demo{
    min-height: calc(100vh - 60px);
  }
</style>
<script>
  export default {
    methods: {
      handleOpen (key, keyPath) {
        this.$router.push(key)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
