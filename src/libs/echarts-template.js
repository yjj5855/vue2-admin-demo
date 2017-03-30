import tinycolor from './tinycolor'
import echart from 'echarts'

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
      grid: {
        // top: '10%',
        // left: '8%',
        // right: '8%',
        bottom: '10%',
      },
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
        barMaxWidth: 30,
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

export class CalendarOption {

  static getVirtulData = function (start, end) {
    let date = +echart.number.parseDate(start)
    let end_date = +echart.number.parseDate(end)

    var dayTime = 3600 * 24 * 1000
    var data = []
    for (var time = date; time < end_date; time += dayTime) {
      data.push([
        echart.format.formatTime('yyyy-MM-dd', time),
        Math.floor(Math.random() * 1000)
      ])
    }
    return data
  }

  constructor(opt) {

    let default_calendar = {
      orient: 'vertical',
      monthLabel: {
        nameMap: 'cn'
      },
      dayLabel: {
        nameMap: 'cn',
        firstDay: 1 // 从周一开始
      }
    }

    let option = {
      tooltip: opt.tooltip || {
        position: 'top',
        formatter: function (p) {
          var format = echart.format.formatTime('yyyy-MM-dd', p.data[0]);
          return format + ': ' + p.data[1];
        }
      },
      visualMap: opt.visualMap || {
        min: 0,
        max: 1000,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: '0',
        // 颜色设置
        // inRange: {
        //   color: ['#ecffe0', '#54db00'],
        //   opacity: 0.5
        // },
        // controller: {
        //   inRange: {
        //     opacity: 0.8
        //   }
        // }
      },
      legend: opt.legend || {},
      calendar: opt.calendar.map((item, index)=>{
        return {
          ...default_calendar,
          ...item
        }
      }),
      series: opt.series
    }
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
