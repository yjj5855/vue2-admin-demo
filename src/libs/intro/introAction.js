import { introStart, getIntroOptions } from './introPage'

export function importUser () {
  return introStart(getIntroOptions({
    steps: [
      {
        element: '#import-user-btn',
        intro: '点击按钮，导入员工数据',
        position: 'auto'
      }
    ]
  }))
}

export function createOrg () {
  return introStart(getIntroOptions({
    steps: [
      {
        element: '.tree-node-name',
        intro: '鼠标移动到这里，点击加号，开始创建组织架构',
        position: 'auto'
      }
    ]
  }))
}
