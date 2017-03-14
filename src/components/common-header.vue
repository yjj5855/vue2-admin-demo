<template>
  <div>
    <!--最顶部-->
    <el-row type="flex" align="middle"  class="common-menu" :style="backgroundColor">
      <el-col style="flex: 1;">
        <div style="font-size: 20px;font-weight: 300;">人力资源智能云平台班步VIP版</div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              上海云才网络科技有限公司 切换<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>上海云才网络科技有限公司</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>

      <!--头像-->
      <img class="avatar" src="../assets/logo.png"/>
      <el-dropdown>
      <span class="el-dropdown-link">
        用户XX<i class="el-icon-arrow-down el-icon--right"></i>
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

    <!--面包屑-吸顶-->
    <sticky :z="4">
      <el-row type="flex" align="middle" justify="space-between" class="breadcrumb">
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: item.path }" v-for="item in pathList">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <div>
          <span class="breadcrumb-text">人员总计：500人</span>&emsp;
          <span class="breadcrumb-text">本月入职：15人</span>&emsp;
          <span class="breadcrumb-text">本月离职：15人</span>&emsp;
          <span class="breadcrumb-text">意见反馈</span>&emsp;
          <span class="breadcrumb-text">帮助</span>
        </div>
      </el-row>
    </sticky>
  </div>
</template>
<style scoped>
  .common-menu{
    height: 80px;
    padding: 0 20px;
    border-bottom: 1px solid #e7eaec !important;
    z-index: 3;
    color: #fff
  }
  .el-dropdown {
    color: #fff;
  }
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .breadcrumb{
    height: 50px;
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #e7eaec !important;
    z-index: 3;
  }
  .breadcrumb-text{
    font-size: 13px;
    color: #999;
  }
</style>
<script>
  import sticky from './sticky.vue'

  export default {
    data: function () {
      return {

      }
    },
    components: {
      sticky
    },
    mounted () {

    },
    computed: {
      themeColors () {
        return this.$store.state.app.themeColors
      },
      backgroundColor () {
        return { 'background-color': this.themeColors.primary || '#1ab394' }
      },
      pathList () {
        return this.$store.state.app.pathList
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
