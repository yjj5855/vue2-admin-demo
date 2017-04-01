import featureSettingRouter from './feature-setting/index'

export default [
  ...featureSettingRouter,
  {
    path: '/setting',
    component: resolve => {
      require.ensure(['./index.vue'], () => {
        resolve(require('./index.vue'))
      }, 'setting')
    }
  },
  {
    path: '/feature-setting',
    component: resolve => {
      require.ensure(['./feature-setting.vue'], () => {
        resolve(require('./feature-setting.vue'))
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
