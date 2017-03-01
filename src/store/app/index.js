import {
  UPDATE_LOADING,
  UPDATE_DIRECTION,
  DDCONFIG_SUCCESS,
  DDCONFIG_ERROR,
  UPDATE_CODE,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  THEME_CHANGE
} from './mutation-types'
import * as actions from './actions'

const state = {
  isLoading: false, // 路由加载标志位
  direction: 'forward', // 路由动画变量

  ddConfig: null,
  ddConfigStatus: null,
  code: null,

  user: null,

  themeColors: {

  }
}

const mutations = {
  [UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  },
  [DDCONFIG_SUCCESS] (state, config) {
    state.ddConfig = config
    state.ddConfigStatus = true
  },
  [DDCONFIG_ERROR] (state, config) {
    state.ddConfig = null
    state.ddConfigStatus = false
  },
  [UPDATE_CODE] (state, code) {
    state.code = code
  },
  [LOGIN_SUCCESS] (state, user) {
    state.user = user
  },
  [LOGIN_ERROR] (state, user) {
    state.user = false
  },
  [THEME_CHANGE] (state, colors) {
    state.themeColors = JSON.parse(JSON.stringify(colors))
  }
}

export default {
  state,
  mutations,
  actions
}
