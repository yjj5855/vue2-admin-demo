<template>
  <div class="echart-box">
    <div class="echart" ref="chart">

    </div>
    <div class="echart-center">
      <i v-if="loading" class="el-icon-loading"></i>
      <slot v-if="!loading"></slot>
    </div>
  </div>
</template>
<style scoped>
  .echart{
    width: 100%;
    height: 350px;
  }
  .echart-box{
    position: relative;
  }
  .echart-center{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

</style>
<script>
  import echarts from 'echarts'

  export default {
    props: {
      option: {
        type: Object,
        default: {}
      },
      notMerge: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        chart: null,
        loading: false
      }
    },
    components: {

    },
    mounted () {
      this.chart = echarts.init(this.$refs.chart)
      this.drawCharts()
    },
    methods: {
      drawCharts () {
        const { series } = this.option
        if ((!(series && series.length > 0 && series[0].data && series[0].data.length > 0))) {
          this.loading = true
        } else {
          this.chart.setOption(this.option, this.notMerge || false)
          this.loading = false
        }
      },
      onFullScreen (arg) {
        let status = arg[0]

        if (status) {
          this.chart.setOption({
            dataZoom: [{
              type: 'inside',
              zoomLock: true,
              start: 0,
              end: 100
            }]
          })
        } else {
          this.chart.setOption(this.option)
        }
        this.chart.resize()
      },
      onEyeToggle (arg) {
        let status = arg[0]

        this.chart.setOption({
          series: this.option.series.map(item => {
            return {
              ...item,
              label: {
                normal: {
                  show: status,
                  position: 'top'
                }
              }
            }
          })
        })
      }
    }
  }
</script>
