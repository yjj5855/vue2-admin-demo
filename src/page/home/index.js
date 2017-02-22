
export default [
  {
    path: '/',
    component: resolve => {
      require.ensure(['./index.vue'], () => {
        resolve(require('./index.vue'))
      }, 'app')
    }
  }
]
