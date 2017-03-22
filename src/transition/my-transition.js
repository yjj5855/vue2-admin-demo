import Vue from 'vue'
import TWEEN from 'TWEEN'
import requestAnimationFrame from 'requestAnimationFrame'

export default Vue.component('my-transition', {
  name: 'my-transition',
  template: `
    <transition appear
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >
      <slot></slot>
    </transition>
  `,
  data: function () {
    return {

      position: {rotation: 90},
      target: null,
      tween: null,
      tweenBack: null
    }
  },
  methods: {
    beforeEnter (el) {
      console.log('beforeEnter')
      // el.style['transform-origin'] = '50% 50%'
      // el.style['preserve-3d'] = 'preserve-3d'
      // el.style.background = '#eeeeee'
    },
    enter (el, done) {
      console.log('enter')
      this.init(el, done)
      this.animate()
    },
    afterEnter (el) {
      console.log('afterEnter')
    },
    beforeLeave (el) {

    },
    leave (el, done) {
      console.log('leave')
    },
    afterLeave (el) {
      console.log('afterLeave')
    },
    init (el, cb) {
      this.target = el

      this.tween = new TWEEN.Tween(this.position)
        .to({rotation: 90}, 0)
        .onUpdate(this.update)

      // let tween3 = new TWEEN.Tween(this.position)
      //   .to({rotation: -10}, 400)
      //   .delay(200)
      //   .easing(TWEEN.Easing.Elastic.In)
      //   .onUpdate(this.update)
      //
      // let tween1 = new TWEEN.Tween(this.position)
      //   .to({rotation: 10}, 300)
      //   .delay(150)
      //   .easing(TWEEN.Easing.Elastic.In)
      //   .onUpdate(this.update)

      let tween2 = new TWEEN.Tween(this.position)
        .to({rotation: 0}, 1000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(this.update)

      this.tween
        // .chain(tween3)
        // .chain(tween1)
        .chain(tween2)
      this.tween.start().onComplete(() => { cb() })
    },
    animate (time) {
      requestAnimationFrame(this.animate)
      TWEEN.update(time)
    },
    update () {
      // this.target.style.left = this.position.x + 'px'
      // this.target.style.top = this.position.y + 'px'
      this.target.style.webkitTransform = `perspective(1000px) rotateX(${Math.floor(this.position.rotation)}deg)`
      this.target.style.MozTransform = `perspective(1000px) rotateX(${Math.floor(this.position.rotation)}deg)`
    }
  }
})
