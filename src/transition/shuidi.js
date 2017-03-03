import Vue from 'vue'
import Velocity from 'velocity-animate'

export default Vue.component('my-special-transition', {
  functional: true,
  data: function () {
    return {
      x: 0,
      y: 0
    }
  },
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          console.log('beforeEnter')
          el.style.opacity = 0
          el.style.transformOrigin = 'left'
        },
        enter: function (el, done) {
          console.log('enter')
          Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
          Velocity(el, { fontSize: '1em' }, { complete: done })
        },
        afterEnter: function (el) {

        },

        beforeLeave: function (el) {
          el.style.transformOrigin = 'left'
        },
        leave: function (el, done) {
          console.log('leave')
          Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
          Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
          Velocity(el, {
            rotateZ: '45deg',
            translateY: '30px',
            translateX: '30px',
            opacity: 0
          }, { complete: done })
        },
        afterLeave: function (el) {

        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
