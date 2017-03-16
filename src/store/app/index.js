import {
  UPDATE_BREADCRUMB,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  THEME_CHANGE,
  ADD_MENU
} from './mutation-types'
import * as actions from './actions'

const state = {
  pathList: [],
  user: null,

  // 主题颜色
  themeColors: JSON.parse(window.localStorage.getItem('themeColors')) || {},

  // 菜单列表
  menuList: [
    {
      name: '员工管理',
      icon: 'el-icon-fa-user',
      type: 'submenu',
      children: [
        {name: '花名册', type: 'menu-item', index: '/user/list', route: {path: '/user/list'}},
        {name: '组织架构', type: 'menu-item', index: '/user/org', route: {path: '/user/org'}}
      ]
    },
    {
      name: '账户管理',
      icon: 'el-icon-fa-unlock-alt',
      type: 'submenu',
      children: [
        {name: '菜单设置', type: 'menu-item', index: '/setting', route: {path: '/setting'}}
      ]
    }
  ]
}

const mutations = {
  [UPDATE_BREADCRUMB] (state, pathList) {
    state.pathList = pathList
  },
  [LOGIN_SUCCESS] (state, user) {
    state.user = user
  },
  [LOGIN_ERROR] (state, user) {
    state.user = false
  },
  [THEME_CHANGE] (state, colors) {
    const themeColors = JSON.stringify(colors)
    state.themeColors = JSON.parse(themeColors)
    window.localStorage.setItem('themeColors', themeColors)
  },
  [ADD_MENU] (state, menu, index) {
    state.menuList.push(menu)
    // TODO 动态添加路由
  }
}

export default {
  state,
  mutations,
  actions
}
