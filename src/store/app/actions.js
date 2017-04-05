import * as mutations from './mutation-types'
// import demoRouter from '../../page/demo'
// import axios from 'axios'

export function addMenu ({commit, dispatch, state}, payload) {
  // TODO 动态添加路由
  // console.log(payload.$router.options.routes[0])
  // payload.$router.addRoutes(demoRouter)
  // payload.$router.onReady(() => {
  //   console.log('$router.onReady')
  // })
  commit(mutations.ADD_MENU, payload.index)
}
