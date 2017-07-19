
export default [
  {
    path: '/demo',
    component: resolve => {
      require.ensure(['./index.vue'], () => {
        resolve(require('./index.vue'))
      }, 'demo')
    }
  },
  {
    path: '/tree',
    component: resolve => {
      require.ensure(['./tree.vue'], () => {
        resolve(require('./tree.vue'))
      }, 'demo')
    }
  },
  {
    path: '/wifi',
    component: resolve => {
      require.ensure(['./wifi.vue'], () => {
        resolve(require('./wifi.vue'))
      }, 'demo')
    }
  },
  {
    path: '/time',
    component: resolve => {
      require.ensure(['./time.vue'], () => {
        resolve(require('./time.vue'))
      }, 'demo')
    }
  },
  {
    path: '/bigdata',
    component: resolve => {
      require.ensure(['./bigdata.vue'], () => {
        resolve(require('./bigdata.vue'))
      }, 'demo')
    }
  },
  {
    path: '/calendar',
    component: resolve => {
      require.ensure(['./calendar.vue'], () => {
        resolve(require('./calendar.vue'))
      }, 'demo')
    }
  },
  {
    path: '/editTable',
    component: resolve => {
      require.ensure(['./editTable.vue'], () => {
        resolve(require('./editTable.vue'))
      }, 'demo')
    }
  }
]
