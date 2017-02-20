
export default [
  {
    path: '/demo',
    component: resolve => {
      require.ensure(['./index.vue'], () => {
        resolve(require('./index.vue'))
      }, 'demo')
    }
  }
]
