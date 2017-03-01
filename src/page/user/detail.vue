<template>
  <div>
    <app-header :path-list="pathList"/>

    <div style="margin: 15px 30px;">
      <el-tabs type="card">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="合同信息">合同信息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style>
  .el-tabs__item.is-active{
    background-color: #fff!important;;
  }
  .el-tabs__header{
    margin-bottom: 0!important;
  }
  .el-tabs__content{
    padding: 15px!important;
    background-color: #fff!important;
    border: 1px solid #d1dbe5!important;
    border-top: none!important;
  }

</style>
<script>
  import AppHeader from 'components/app-header.vue'
  export default{
    data () {
      return {
        pathList: [
          {name: '首页', path: '/'},
          {name: '员工管理', path: '/user'},
          {name: '员工基本信息', path: '/user/base'},
          {name: '员工详细信息', path: '/user/base/1'}
        ]
      }
    },
    components: {
      AppHeader
    },
    methods: {
      handleClick () {
        console.log(1)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>
