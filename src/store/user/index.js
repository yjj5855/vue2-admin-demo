import {
  UPDATE_BASE
} from './mutation-types'
import * as actions from './actions'

const state = {
  base: {
    paramsData: {
      draw: 0,
      currentPage: 1,
      pageSize: 10,
      department: '',
      status0: 0,
      status1: 1,
      status2: 2,
      status3: '',
      'search[value]': ''
    },
    respData: {
      list: [],
      total: 0
    },
    loading: false
  }
}

const mutations = {
  [UPDATE_BASE] (state, data) {
    state.base = {
      ...state.base,
      ...data
    }
  }
}

export default {
  state,
  mutations,
  actions
}
