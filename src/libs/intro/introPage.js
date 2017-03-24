/**
 *
 * @param steps
 * {
      // 第一步引导
      // 这个属性类似于jquery的选择器， 可以通过jquery选择器的方式来选择你需要选中的对象进行指引
      element: '.el-icon-fa-eye',
      // 这里是每个引导框具体的文字内容，中间可以编写HTML代码
      intro: '点击这个眼睛，可以在图表中显示数据',
      // 这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
      position: 'bottom',
      // 这里可以自定义样式
      tooltipClass: ''
    }
 * @returns {{prevLabel: string, nextLabel: string, skipLabel: string, doneLabel: string, steps: Array}}
 */
export function getIntroOptions ({ steps = [] }) {
  return {
    // 对应的按钮
    prevLabel: '上一步',
    nextLabel: '下一步',
    skipLabel: '跳过',
    doneLabel: '结束',
    // 对应的数组，顺序出现每一步引导提示
    steps: steps.map(item => {
      item.tooltipClass = 'png' // zidingyi
      return item
    })
  }
}

export function introStart (options) {
  return new Promise((resolve, reject) => {
    window.introJs()
      .setOptions(options)
      .start()
      .oncomplete(() => {
        resolve()
      })
  })
}

export function home () {
  return introStart(getIntroOptions({
    steps: [
      {
        element: '.el-icon-fa-eye',
        intro: '点击这个眼睛，可以在图表中显示数据',
        position: 'right'
      },
      {
        element: '.el-icon-fa-expand',
        intro: '点击这个图标，可以放大到整个窗口查看',
        position: 'right'
      },
      {
        element: '.el-icon-fa-download',
        intro: '点击这个图标，可以把图表下载为图片',
        position: 'right'
      }
    ]
  }))
}
