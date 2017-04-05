
const basePath = '/feature-setting'
export default [
  {
    name: 'custom-fields',
    path: basePath + '/custom-fields',
    component: resolve => {
      require.ensure(['./custom-fields.vue'], () => {
        resolve(require('./custom-fields.vue'))
      }, 'setting')
    }
  }
]
