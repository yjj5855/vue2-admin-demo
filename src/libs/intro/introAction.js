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
