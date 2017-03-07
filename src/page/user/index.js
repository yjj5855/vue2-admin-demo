
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
    path: '/user/list',
    component: resolve => {
      require.ensure(['./list.vue'], () => {
        resolve(require('./list.vue'))
      }, 'user')
    }
  },
  {
    path: '/user/:id',
    component: resolve => {
      require.ensure(['./detail.vue'], () => {
        resolve(require('./detail.vue'))
      }, 'user')
    }
  }
]
