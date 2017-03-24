<template>
  <div>
    <!--最顶部-->
    <el-row type="flex" align="middle"  class="common-menu theme-white">
      <el-col style="flex: 1;">
        <div class="common-menu__title" style="font-size: 20px;font-weight: 300;">人力资源智能云平台班步VIP版</div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="common-menu__subTitle">上海云才网络科技有限公司</span>
              <span class="common-menu__sub_right">切换<i class="el-icon-arrow-down el-icon--right"></i></span>
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
        <span class="el-dropdown-link common-menu__user">
          王小布 <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
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

        <el-row type="flex" align="middle" justify="space-between">
          <span class="breadcrumb-icon">
              <i class="el-icon-fa-bell-o"></i>
          </span>
          <span class="breadcrumb-badge">12</span>&emsp;
          <span class="breadcrumb-text">人员总计：500人</span>&emsp;
          <span class="breadcrumb-text">本月入职：15人</span>&emsp;
          <span class="breadcrumb-text">本月离职：15人</span>&emsp;
          <span class="breadcrumb-text">意见反馈</span>&emsp;
          <span class="breadcrumb-text" @click="onHelpClick">帮助</span>&emsp;
          <span class="breadcrumb-icon">
              <i class="el-icon-fa-gear"></i>
          </span>
        </el-row>
      </el-row>
    </sticky>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  @import "../var";
  .common-menu{
    height: 80px;
    padding: 0 20px;
    border-bottom: @border-base !important;
    z-index: 3;
    color: #fff;
    background: @color-primary;

    &.theme-white{
      background: @color-white;
      .common-menu__title{
        color: @color-extra-light-black;
      }
      .common-menu__subTitle{
        color: @color-light-black;
      }
      .common-menu__sub_right{
        color: @color-extra-light-black;
      }
      .common-menu__user{
        color: @color-primary;
      }
    }
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
    border-bottom: @border-base !important;
    z-index: 3;
  }
  .breadcrumb-text{
    font-size: 13px;
    color: #999;
  }
  .breadcrumb-badge{
    font-size: 13px;
    color: #fff;
    background-color: @color-danger;
    padding: 0 5px;
    border-radius: 13px;
  }
  .breadcrumb-icon{
    color: #999;
    i{
      font-size: 20px!important;
    }
  }
</style>
<script>
  import sticky from './sticky.vue'
  import intro from '../libs/intro'

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
        return { 'background-color': '#fff' || this.themeColors.primary || '#1ab394' }
      },
      pathList () {
        return this.$store.state.app.pathList
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      onHelpClick () {
        if (this.$route.name) {
          intro[this.$route.name]()
        }
      }
    }
  }
</script>
