
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
    name: 'userList',
    path: '/user/list',
    component: resolve => {
      require.ensure(['./list.vue'], () => {
        resolve(require('./list.vue'))
      }, 'user')
    }
  },
  {
    name: 'userOrg',
    path: '/user/org',
    component: resolve => {
      require.ensure(['./org.vue'], () => {
        resolve(require('./org.vue'))
      }, 'user')
    }
  },
  {
    name: 'userDetail',
    path: '/user/:id',
    component: resolve => {
      require.ensure(['./detail.vue'], () => {
        resolve(require('./detail.vue'))
      }, 'user')
    }
  }
]
