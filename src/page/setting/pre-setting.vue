<template>
  <div class="pre-setting">
    <div class="white-space"></div>
    <div class="text-center small-text">欢迎使用班步 最专业的人力资源管理平台</div>
    <div class="white-space"></div>
    <div class="text-center big-text">轻松完成设置 开始班步之旅</div>

    <div class="white-space"></div>
    <iframe height="400px" width="100%" src="http://player.youku.com/embed/XMjUwMzI2MTc3Ng==" frameborder="0 allowfullscreen"></iframe>

    <div class="white-space"></div>
    <el-row type="flex" align="middle" justify="space-between">
      <div class="step-item">创建企业</div>
      <div>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="step-item"><div>创建</div><div>组织架构</div></div>
      <div>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="step-item">导入员工</div>
      <div>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="step-item">开启功能</div>
      <div>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="step-item">分配权限</div>
    </el-row>

    <div class="white-space"></div>
    <div class="white-space"></div>
    <div class="text-center">
      <el-button type="primary">开始设置</el-button>
    </div>

    <div class="white-space"></div>
    <div class="white-space"></div>
    <div class="text-center small-text">一对一专业服务 服务热线：400-021-9488</div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../var";
  .pre-setting{
    padding: 0 100px;
    .text-center{
      text-align: center;
    }
    .small-text{
      font-size: 13px;
      color: #999;
      font-weight: 300;
    }
    .big-text{
      font-size: 32px;
      color: #222;
      font-weight: lighter;
    }

    .step-item{
      color: @--color-primary;
      border-radius: 100%;
      width: 100px;
      height: 100px;
      background: #fff;
      border: 1px @--color-primary solid;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: 300;
    }
    .el-icon-arrow-right{
      color: @--color-primary;
      font-size: 12px;
      font-weight: lighter;
      margin-right: -10px;
    }
  }
</style>
<script>
  export default{
    components: {

    },
    data () {
      return {

      }
    },
    computed: {

    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '菜单设置', path: '/setting'}, {name: '引导设置', path: '/setting/pre'}])
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
