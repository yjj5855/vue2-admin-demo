<template>
  <div class="bb-index">
    <div>
      <el-row type="flex" align="middle" justify="space-between" class="box-header">
        <el-col :span="12" class="box-header__title">
          薪资占比
        </el-col>
        <div>
          <i class="el-icon-view"></i>
          <i class="el-icon-close"></i>
        </div>
      </el-row>
      <el-row :gutter="30"  style="padding: 40px 88px;">
        <el-col :span="4" v-for="item in svgList">
          <div style="padding: 0 10px"><svg-circle></svg-circle></div>
          <div style="text-align: center;color: #999">{{item}}</div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="echarts-box">
          <el-row type="flex" align="middle" justify="space-between" class="box-header">
            <el-col :span="12" class="box-header__title">
              子公司员工年龄分布统计
            </el-col>
            <div>
              <i class="el-icon-view"></i>
              <i class="el-icon-close"></i>
            </div>
          </el-row>
          <echarts :option="lineCharts"></echarts>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echarts-box">
          <el-row type="flex" align="middle" justify="space-between" class="box-header">
            <el-col :span="12" class="box-header__title">
              子公司员工性别统计
            </el-col>
            <div>
              <i class="el-icon-view"></i>
              <i class="el-icon-close"></i>
            </div>
          </el-row>
          <echarts :option="barCharts"></echarts>
        </div>
      </el-col>

      <!--子公司列表-->
      <el-col :span="8">
        <div class="echarts-box">
          <el-row type="flex" align="middle" justify="space-between" class="box-header">
            <el-col :span="12" class="box-header__title">
              子公司列表
            </el-col>
            <div>
              <i class="el-icon-view"></i>
              <i class="el-icon-close"></i>
            </div>
          </el-row>
          <el-table
            height="350"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="公司">
            </el-table-column>
            <el-table-column
              prop="count"
              label="人数"
              width="100">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <div class="white-space"></div>
  </div>
</template>
<style scoped>
  .bb-index{

  }
  .box-header{
    height: 50px;
    border-bottom: 1px #eee solid;
    color: #999
  }
  .box-header__title{
    color: #474747
  }
</style>
<script>
  import svgCircle from 'components/svg-circle.vue'
  import echarts from 'components/echarts'
  import { LineOrBarOption } from '../../libs/echarts-template'
  export default{
    data () {
      return {
        show: true,
        svgList: ['3000-6000', '6000-9000', '9000-12000', '12000-15000', '15000-20000', '20000-40000'],

        lineCharts: null,
        barCharts: null,
        tableData: [
          {name: '上海云才网络科技有限公司', count: '180人'},
          {name: '上海云才网络科技有限公司', count: '180人'},
          {name: '上海云才网络科技有限公司', count: '180人'},
          {name: '上海云才网络科技有限公司', count: '180人'},
          {name: '上海云才网络科技有限公司', count: '180人'},
          {name: '上海云才网络科技有限公司', count: '180人'},
          {name: '上海云才网络科技有限公司', count: '180人'},
          {name: '上海云才网络科技有限公司', count: '180人'}
        ]
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '首页', path: '/'}])

      this.lineCharts = new LineOrBarOption({
        xAxis: [{data: new Array(12).fill('公司').map((item, index) => item + index)}],
        series: [
          {
            name: '18-30岁',
            type: 'line',
            data: new Array(12).fill(800).map((item, index) => parseInt(item + item * Math.random()))
          },
          {
            name: '30-50岁',
            type: 'line',
            data: new Array(12).fill(1000).map((item, index) => parseInt(item + item * Math.random()))
          }
        ]
      })

      this.barCharts = new LineOrBarOption({
        xAxis: [{data: new Array(12).fill('公司').map((item, index) => item + index)}],
        series: [
          {
            name: '男',
            type: 'bar',
            data: new Array(12).fill(1000).map((item, index) => parseInt(item + item * Math.random()))
          },
          {
            name: '女',
            type: 'bar',
            data: new Array(12).fill(800).map((item, index) => parseInt(item + item * Math.random()))
          }
        ]
      })
    },
    components: {
      svgCircle,
      echarts
    },
    methods: {

    }
  }
</script>
