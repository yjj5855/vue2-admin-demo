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
      position: 'bottom'
    }
 * @returns {{prevLabel: string, nextLabel: string, skipLabel: string, doneLabel: string, steps: Array}}
 */
function getIntroOptions({ steps = [] }) {
  return {
    // 对应的按钮
    prevLabel: '上一步',
    nextLabel: '下一步',
    skipLabel: '跳过',
    doneLabel: '结束',
    // 对应的数组，顺序出现每一步引导提示
    steps: steps
  }
}


export function introIndexPage() {
  window.introJs().setOptions(getIntroOptions({
    steps: [
      {
        element: '.el-icon-fa-eye',
        intro: '点击这个眼睛，可以在图表中显示数据',
        position: 'bottom'
      },
      {
        element: '.el-icon-fa-expand',
        intro: '点击这个图标，可以放大到整个窗口查看',
        position: 'bottom'
      },
      {
        element: '.el-icon-fa-download',
        intro: '点击这个图标，可以把图表下载为图片',
        position: 'bottom'
      }
    ]
  })).start()
}


export function importUser() {
  window.introJs().setOptions(getIntroOptions({
    steps: [
      {
        element: '#import-user-btn',
        intro: '点击按钮，导入员工数据',
        position: 'bottom'
      }
    ]
  })).start()
}
