
export default [
  {
    path: '/',
    name: 'home',
    component: resolve => {
      // import('./index.vue').then(module => {
      //   resolve(module)
      // })
      require.ensure([], () => {
        resolve(require('./index.vue'))
      }, 'app')
    }
  }
]
