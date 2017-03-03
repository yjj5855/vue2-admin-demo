
import Vue from 'vue'
import VueRouter from 'vue-router'
import 'fastclick'
import 'raven-js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './main.css'

import homeRouter from './page/home'

require('promise.prototype.finally').shim()

axios.defaults.withCredentials = true

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {
    path: '/',
    component: resolve => {
      require.ensure(['./page/app.vue'], () => {
        resolve(require('./page/app.vue'))
      }, 'app')
    },
    children: [
      homeRouter
    ]
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

new Vue({
  router
}).$mount('#app')
