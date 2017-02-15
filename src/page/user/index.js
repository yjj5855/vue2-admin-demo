
export default [
  {
    path: '/user',
    component: resolve => {
      require.ensure(['./index.vue'], () => {
        resolve(require('./index.vue'))
      }, 'user')
    }
  },
  {
    path: '/user/base',
    component: resolve => {
      require.ensure(['./base.vue'], () => {
        resolve(require('./base.vue'))
      }, 'user')
    }
  },
  {
    path: '/user/base/:id',
    component: resolve => {
      require.ensure(['./detail.vue'], () => {
        resolve(require('./detail.vue'))
      }, 'user')
    }
  }
]
