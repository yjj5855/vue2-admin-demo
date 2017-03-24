
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { sync } from 'vuex-router-sync'
import va from './libs/va'
import 'raven-js'
import axios from 'axios'
import './libs/axiosConfig'
import ElementUI from 'element-ui'
import './transition'

// import ThemeSetting from './components/theme-setting/theme.vue'

// import 'element-ui/lib/theme-default/index.css'
// import '../theme/index.css' // 需要在index.html引入
import './main.less'

import homeRouter from './page/home'
import userRouter from './page/user'
import demoRouter from './page/demo'
import settingRouter from './page/setting'

import './transition/my-transition'

require('promise.prototype.finally').shim()

axios.defaults.withCredentials = true

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(va)

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      // next('/login')
      // TODO 验证权限
      next()
    },
    component: resolve => {
      require.ensure(['./page/app.vue'], () => {
        resolve(require('./page/app.vue'))
      }, 'app')
    },
    children: [
      ...homeRouter,
      ...userRouter,
      ...demoRouter,
      ...settingRouter
    ]
  },
  {
    path: '/login',
    component: resolve => {
      require.ensure(['./page/login.vue'], () => {
        resolve(require('./page/login.vue'))
      }, 'login')
    }
  },
  {
    path: '/404',
    component: resolve => {
      require.ensure(['./page/404.vue'], () => {
        resolve(require('./page/404.vue'))
      }, '404')
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

sync(store, router)
const App = new Vue({
  router,
  store
}).$mount('#app')
App
/**
 * 自定义主题设置
 */
// App.$nextTick(() => {
//   let cssText = window.localStorage.getItem('themeCss')
//   if (cssText) {
//     const style = document.createElement('style')
//     style.innerText = cssText
//     document.head.appendChild(style)
//   }
// })
// // 等一会再初始化 优化性能
// setTimeout(() => {
//   let themeSetting = new Vue({
//     ...ThemeSetting,
//     store
//   }).$mount('#theme-setting')
//   document.addEventListener('click', () => {
//     themeSetting.active = false
//   })
// }, 5000)
