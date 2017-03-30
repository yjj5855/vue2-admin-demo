
export default [
  {
    path: '/',
    name: 'home',
    component: resolve => {
      require.ensure([], () => {
        resolve(require('./index.vue'))
      }, 'app')
    }
  }
]
