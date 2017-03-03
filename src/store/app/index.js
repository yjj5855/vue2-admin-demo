import {
  UPDATE_BREADCRUMB,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  THEME_CHANGE
} from './mutation-types'
import * as actions from './actions'

const state = {
  pathList: [],
  user: null,

  themeColors: JSON.parse(window.localStorage.getItem('themeColors')) || {}
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
  }
}

export default {
  state,
  mutations,
  actions
}
