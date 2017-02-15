<template>
  <el-row type="flex" align="middle" justify="space-between" class="common-menu">
    <el-col :span="12">
      <h2>上海云才网络科技有限公司 人力资源管理云平台<small style="font-size: 12px;margin-top: 13px">2.0.11.025</small></h2>
    </el-col>

    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="2">
        <template slot="title">阿布（人事经理）</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-row>
</template>
<style>
  .common-menu{
    padding: 0 20px;
    border-bottom: 1px solid #e7eaec !important;
  }
  .common-menu,.el-menu-demo{
    background-color: #fff;
  }
</style>
<script>
  export default {
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
