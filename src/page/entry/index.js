
export default [
  {
    path: '/',
    name: 'login',
    component: resolve => {
      require.ensure([], () => {
        resolve(require('./login.vue'))
      }, 'entry')
    }
  },
  {
    path: 'signin',
    name: 'signin',
    component: resolve => {
      require.ensure([], () => {
        resolve(require('./signin.vue'))
      }, 'entry')
    }
  },
  {
    path: 'forget-password',
    name: 'forget-password',
    component: resolve => {
      require.ensure([], () => {
        resolve(require('./forget-password.vue'))
      }, 'entry')
    }
  }
]
