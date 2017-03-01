
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { sync } from 'vuex-router-sync'
import 'fastclick'
import 'raven-js'
import axios from 'axios'
import ElementUI from 'element-ui'

import ThemeSetting from './components/theme-setting/theme.vue'

import 'element-ui/lib/theme-default/index.css'
import './main.css'

import homeRouter from './page/home'
import userRouter from './page/user'
import demoRouter from './page/demo'

require('promise.prototype.finally').shim()

axios.defaults.withCredentials = true

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      // next('/login')
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
      ...demoRouter
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
    path: '*',
    redirect: '/'
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

App.$nextTick(() => {
  // setTimeout(() => {
  let cssText = window.localStorage.getItem('themeCss')
  if (cssText) {
    const style = document.createElement('style')
    style.innerText = cssText
    document.head.appendChild(style)
  }
  // }, 300)
})

// 等一会再初始化 优化性能
setTimeout(() => {
  let themeSetting = new Vue({
    ...ThemeSetting,
    store
  }).$mount('#theme-setting')
  document.addEventListener('click', () => {
    themeSetting.active = false
  })
}, 5000)

