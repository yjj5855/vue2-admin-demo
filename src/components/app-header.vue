<template>
  <div class="app-header">
    <h3>{{pathList[pathList.length-1].name}}</h3>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: item.path }" v-for="item in pathList">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style scoped>
  .app-header{
    padding: 20px;
    background: #fff;
    border-bottom: 1px solid #e7eaec !important;
  }
  .app-header h1{
    margin-top: 0;
  }
  h3{
    margin-bottom: 10px;
  }
</style>
<script>
  export default{
    props: {
      pathList: {
        type: Array,
        default: function () {
          return [ {name: '首页', path: '/'} ]
        }
      }
    },
    methods: {

    }
  }
</script>
