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
        }
      },
      legend: {
        data: []
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '0%',
      },
      dataZoom: [{
        type: 'inside',
        zoomLock: true,
        start: 70,
        end: 100
      }],
      xAxis: [],
      yAxis: [{
        type: 'value',
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
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
        position: 'top',
        type: 'category',
        boundaryGap: false,
        data: item.data,

        axisLabel: {
          margin: 20
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },

        triggerEvent: true
      }
    })

    const {start_color, end_color} = getRandomColor()
    option.series = series.map(item => {
      return {
        name: item.name,
        type: item.type || 'line',
        stack: item.stack,
        label: {
          normal: {
            show: true,
            position: 'top',
          }
        },
        itemStyle: {
          normal: {
            color: start_color
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: start_color // 0% 处的颜色
            }, {
              offset: 1,
              color: end_color // 100% 处的颜色
            }], false)
          }
        },
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
