<template>
  <div class="user-detail">
    <div>
      <el-tabs type="card">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="合同信息">合同信息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style scoped>
  /*.el-tabs__item.is-active{*/
    /*background-color: #fff!important;;*/
  /*}*/
  /*.el-tabs__header{*/
    /*margin-bottom: 0!important;*/
  /*}*/
  /*.el-tabs__content{*/
    /*padding: 15px!important;*/
    /*background-color: #fff!important;*/
    /*border: 1px solid #d1dbe5!important;*/
    /*border-top: none!important;*/
  /*}*/

</style>
<script>
  export default{
    data () {
      return {

      }
    },
    components: {

    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '人员信息', path: '/user'}, {name: '花名册', path: '/user/base'}, {name: '详情', path: '/user/1'}])
    },
    methods: {

    }
  }
</script>
