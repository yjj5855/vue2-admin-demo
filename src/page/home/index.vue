<template>
  <div class="bb-index">
    <el-row type="flex" align="middle" justify="space-between" class="box-header">
      <el-col :span="12">
        薪资占比
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" v-for="item in svgList">
        <div style="padding: 0 10px"><svg-circle></svg-circle></div>
        <div style="text-align: center;color: #999">{{item}}</div>
      </el-col>
    </el-row>

  </div>
</template>
<style scoped>
  .bb-index{

  }
  .box-header{
    height: 50px;
    border-bottom: 1px #eee solid;
  }
</style>
<script>
  import svgCircle from '../../components/svg-circle.vue'
  export default{
    data () {
      return {
        show: true,
        svgList: ['3000-6000', '6000-9000', '9000-12000', '12000-15000', '15000-20000', '20000-40000']
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '首页', path: '/'}])
    },
    components: {
      svgCircle
    },
    methods: {

    }
  }
</script>
