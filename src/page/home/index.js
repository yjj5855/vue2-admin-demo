
export default [
  {
    path: '/',
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
