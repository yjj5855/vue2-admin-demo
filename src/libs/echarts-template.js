import tinycolor from './tinycolor'

export class LineOrBarOption {
  constructor({ xAxis = [{ data }], series = [{ name, stack, type, data }] }) {
    // 折线图基本配置
    let option = {
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        triggerOn: 'click',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0,0,0,.05)',
          }
        },
        formatter: '{b}<br />{a0}: {c0}人<br />{a1}: {c1}人'
      },
      legend: {
        top: '2%',
        right: 0,
        data: []
      },
      // grid: {
      //   top: '10%',
      //   left: '8%',
      //   right: '8%',
      //   bottom: '15%',
      // },
      dataZoom: [{
        type: 'inside',
        zoomLock: true,
        start: 70,
        end: 100
      }],
      xAxis: [],
      yAxis: [{
        name: '单位（人）',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }],
      series: [ ]
    }


    option.xAxis = xAxis.map(item => {
      return {
        position: 'bottom',
        type: 'category',
        boundaryGap: true,
        data: item.data,


        axisLabel: {
          margin: 10
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisTick: {
          show: false
        },

        triggerEvent: true
      }
    })

    option.series = series.map(item => {
      const {start_color, end_color} = getRandomColor()

      option.legend.data.push({name: item.name})

      return {
        name: item.name,
        type: item.type || 'line',
        stack: item.stack,
        barMaxWidth: 15,
        // 默认不在图表中显示每项的数值
        // label: {
        //   normal: {
        //     show: true,
        //     position: 'top',
        //   }
        // },
        itemStyle: {
          normal: {
            color: start_color
          }
        },

        // areaStyle: {
        //   normal: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //       offset: 0,
        //       color: start_color // 0% 处的颜色
        //     }, {
        //       offset: 1,
        //       color: end_color // 100% 处的颜色
        //     }], false)
        //   }
        // },
        data: item.data
      }
    })

    return option
  }
}

// 获取随机颜色
function getRandomColor() {
  const random_color = "hsla(" + Math.floor(Math.random() * (360)) + ", 60%, 50%, 1)";
  return {
    start_color: tinycolor(random_color).toHexString(),
    end_color: tinycolor(random_color).lighten(30).desaturate().toHexString()
  }
}
