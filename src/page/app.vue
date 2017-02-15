<template>
  <div>
    <common-header/>
    <el-row>
      <el-col :span="4">
        <common-menu/>
      </el-col>

      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<style>

</style>
<script>
  import CommonHeader from '../components/common-header.vue'
  import CommonMenu from '../components/common-menu.vue'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      CommonHeader,
      CommonMenu
    }
  }
</script>
