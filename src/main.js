
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { sync } from 'vuex-router-sync'
import 'fastclick'
import 'raven-js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './main.css'

import homeRouter from './page/home'
import userRouter from './page/user'

require('promise.prototype.finally').shim()

axios.defaults.withCredentials = true

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      next('/login')
    },
    component: resolve => {
      require.ensure(['./page/app.vue'], () => {
        resolve(require('./page/app.vue'))
      }, 'app')
    },
    children: [
      homeRouter,
      ...userRouter
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

new Vue({
  router,
  store
}).$mount('#app')
