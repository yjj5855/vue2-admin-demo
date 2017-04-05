<template>
  <div class="bb-index">
    <div id="xinzi">
      <el-row type="flex" align="middle" justify="space-between" class="box-header">
        <el-col :span="12" class="box-header__title">
          薪资占比
        </el-col>
        <!--右侧动作组件-->
        <action-icon full-screen="xinzi"/>
      </el-row>
      <el-row :gutter="30"  style="padding: 40px 88px;">
        <el-col :span="4" v-for="item in svgList">
          <div style="padding: 0 10px"><svg-circle></svg-circle></div>
          <div style="font-weight: 300;text-align: center;color: #999">{{item}}</div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="echarts-box" id="chart-age">
          <el-row type="flex" align="middle" justify="space-between" class="box-header">
            <el-col :span="12" class="box-header__title">
              子公司员工年龄分布统计
            </el-col>

            <!-- 操作按钮 可以绑定其他组件的事件 -->
            <action-icon
              :show-eye="true"
              @on-eye-toggle="$refs.age && $refs.age.onEyeToggle(arguments)"

              :full-screen="'chart-age'"
               @on-full-screen="$refs.age && $refs.age.onFullScreen(arguments)"

              :download-name="'chart-age'">
            </action-icon>
          </el-row>
          <echarts :option="lineCharts" ref="age"></echarts>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echarts-box" id="chart-xb">
          <el-row type="flex" align="middle" justify="space-between" class="box-header">
            <el-col :span="12" class="box-header__title">
              子公司员工性别统计
            </el-col>
            <action-icon
              :show-eye="true"
              @on-eye-toggle="$refs.xb && $refs.xb.onEyeToggle(arguments)"

              :full-screen="'chart-xb'"
              @on-full-screen="$refs.xb && $refs.xb.onFullScreen(arguments)"

              :download-name="'chart-xb'">
            </action-icon>
          </el-row>
          <echarts :option="barCharts" ref="xb"></echarts>
        </div>
      </el-col>

      <!--子公司列表-->
      <el-col :span="8">
        <div class="echarts-box">
          <el-row type="flex" align="middle" justify="space-between" class="box-header">
            <el-col :span="12" class="box-header__title">
              子公司列表
            </el-col>
            <action-icon/>
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
</style>
<script>
  import svgCircle from 'components/svg-circle.vue'
  import echarts from 'components/echarts.vue'
  import actionIcon from 'components/action-icon.vue'
  import { LineOrBarOption } from '../../libs/echarts-template'
  export default{
    data () {
      return {
        show: true,
        svgList: ['3000-6000', '6000-9000', '9000-12000', '12000-15000', '15000-20000', '20000-40000'],

        lineCharts: {},
        barCharts: {},
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
        xAxis: [{data: new Array(12).fill('云才网络').map((item, index) => item + index)}],
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
    mounted () {

    },
    components: {
      svgCircle,
      echarts,
      actionIcon
    },
    methods: {
      onFullScreen () {
        console.log(this.$refs)

        this.$refs.age.onFullScreen()
      }
    }
  }
</script>
