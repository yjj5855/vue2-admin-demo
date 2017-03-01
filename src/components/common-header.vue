<template>
  <el-row type="flex" align="middle" justify="space-between" class="common-menu" :style="backgroundColor">
    <el-col :span="12">
      <h2>上海云才网络科技有限公司 人力资源管理云平台<small style="font-size: 12px;margin-top: 13px">2.0.11.025</small></h2>
    </el-col>

    <el-dropdown>
      <span class="el-dropdown-link">
        用户XX<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-row>
</template>
<style scoped>
  h2{
    color: #fff
  }
  .common-menu{
    height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #e7eaec !important;
  }
  .el-dropdown {
    color: #fff;
  }
</style>
<script>
  export default {
    data: function () {
      return { }
    },
    computed: {
      themeColors () {
        return this.$store.state.app.themeColors
      },
      backgroundColor () {
        return { 'background-color': this.themeColors.primary || '#20a0ff' }
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
