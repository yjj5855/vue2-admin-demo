<template>
  <sticky :top="'50px'" :width="'16.66667%'" :z="2">
    <el-menu :unique-opened="true" theme="light" :default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
      <el-menu-item index="/" :route="{path:'/'}">
        <i class="el-icon-fa-home"></i>首页
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
            <i class="el-icon-fa-user"></i>员工管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user/list" :route="{path:'/user/list'}">花名册</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-message"></i>demo
        </template>
        <el-menu-item-group>
          <el-menu-item index="/demo" :route="{path:'/demo'}">过渡状态</el-menu-item>
          <el-menu-item index="/tree" :route="{path:'/tree'}">树形结构拖动</el-menu-item>
          <el-menu-item index="/wifi" :route="{path:'/wifi'}">动态标签</el-menu-item>
          <el-menu-item index="/time" :route="{path:'/time'}">上下班时间设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/login"><i class="el-icon-setting"></i>退出登录</el-menu-item>
    </el-menu>
  </sticky>
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
  import sticky from './sticky.vue'

  export default {
    data: function () {
      return {}
    },
    components: {
      sticky
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log('handleOpen', key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log('handleClose', key, keyPath)
      },
      handleSelect (index, indexPath) {
        console.log('handleSelect', typeof index)
        this.$router.history.push(index)
      }
    },
    mounted () {
    }
  }
</script>
