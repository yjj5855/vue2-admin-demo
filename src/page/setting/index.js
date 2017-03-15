
export default [
  {
    path: '/setting',
    component: resolve => {
      require.ensure(['./index.vue'], () => {
        resolve(require('./index.vue'))
      }, 'setting')
    }
  },
  {
    path: '/setting/pre',
    component: resolve => {
      require.ensure(['./pre-setting.vue'], () => {
        resolve(require('./pre-setting.vue'))
      }, 'setting')
    }
  }
]
