<template>
    <div>
      <div>
        <div class="box-header">
          <div class="box-header__title">每月出勤统计</div>
        </div>
        <echarts :option="options" :height="'400px'" ref="listEchart"/>
      </div>
      <div class="white-space"></div>
      <div>
        <div class="box-header">
          <div class="box-header__title">当月出勤时间</div>
        </div>
        <echarts :option="pieCalendarOption" :height="'600px'" ref="pieEchart"/>
      </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .box-header__title{
    line-height: 50px;
  }
</style>
<script>
  import echarts from 'components/echarts.vue'
  import echart from 'echarts'
  import { CalendarOption } from '../../libs/echarts-template'

  const cellSize = [80, 80]
  export default{
    components: {
      echarts
    },
    data () {
      return {
        options: new CalendarOption({
          calendar: new Array(10).fill(0).map((item, index) => {
            return {
              range: '2017-02',
              yearLabel: {
                formatter: function (param) {
                  return 'user' + index
                }
              },
              top: parseInt(index / 5) > 0 ? 180 * parseInt(index / 5) + 100 : 100,
              left: 220 * parseInt(index % 5) + 50
            }
          }),
          series: new Array(10).fill(0).map((item, index) => {
            return {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: index,
              data: CalendarOption.getVirtulData('2017-02-01', '2017-03-01')
            }
          })
        }),
        pieCalendarOption: new CalendarOption({
          tooltip: {},
          legend: {
            data: ['工作', '休息'],
            bottom: 20
          },
          visualMap: { show: false },
          calendar: [{
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
              show: false
            },
            dayLabel: {
              margin: 20,
              firstDay: 1,
              nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            },
            monthLabel: {
              show: false
            },
            range: ['2017-02']
          }],
          series: [{
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return echart.format.formatTime('dd', params.value[0])
                },
                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                textStyle: {
                  color: '#000',
                  fontSize: 14
                }
              }
            },
            data: CalendarOption.getVirtulData('2017-02-01', '2017-03-01')
          }]
        })
      }
    },
    computed: {},
    created () {

    },
    mounted () {
      setTimeout(() => {
        this.$refs.pieEchart.chart.setOption({
          series: getPieSeries(this.pieCalendarOption.series[0].data, this.$refs.pieEchart.chart)
        })
      }, 1000)
    },
    methods: {

    }
  }

  function getPieSeries (scatterData, chart) {
    return echart.util.map(scatterData, function (item, index) {
      let center = chart.convertToPixel('calendar', item)
      let workTime = Math.round(Math.random() * 3) + 8
      let unWorkTime = 24 - workTime
      return {
        id: index + 'pie',
        type: 'pie',
        center: center,
        label: {
          normal: {
            formatter: '{c}',
            position: 'inside'
          }
        },
        radius: 30,
        data: [
          {name: '工作', value: workTime},
          {name: '休息', value: unWorkTime}
        ]
      }
    })
  }
</script>
