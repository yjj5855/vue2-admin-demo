<template>
  <div class="sticky" :style="fixedTop">
    <slot></slot>
  </div>
</template>
<style scoped>
  /*.sticky{*/
    /*transition: 0.3s all ease;*/
  /*}*/
</style>
<script>
//  import Velocity from 'velocity-animate'
  export default {
    props: {
      top: {
        type: String,
        default: '0px'
      },
      width: {
        type: String,
        default: '100%'
      },
      z: {
        type: Number,
        default: 2
      }
    },
    data () {
      return {
        fixedTop: {
          'z-index': this.z
        },
        stickyT: 0
      }
    },
    mounted () {
      var stickyEl = this.$el
      // 守家占位符
      var stickyHolder = document.createElement('div')
      var rect = stickyEl.getBoundingClientRect()
      // console.log(rect)
      stickyEl.parentNode.replaceChild(stickyHolder, stickyEl)
      stickyHolder.appendChild(stickyEl)
      stickyHolder.style.height = rect.height + 'px'

      this.stickyT = stickyEl.offsetTop

      window.addEventListener('scroll', this.onScroll)

      window.addEventListener('resize', this.onResize)
    },
    methods: {
      onScroll () {
        const self = this
        var scrollT = document.body.scrollTop
        if (scrollT > this.stickyT) {
          self.fixedTop = {
            position: 'fixed',
            left: 0,
            'z-index': self.z,

            top: self.top,
            width: self.width
          }
        } else {
          self.fixedTop = {
            'z-index': this.z
          }
        }
      },
      onResize () {
        const srcollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        const winHeight = window.innerHeight
        if (srcollHeight > winHeight + 50) {
          window.removeEventListener('scroll', this.onScroll)
          window.addEventListener('scroll', this.onScroll)
        } else {
          window.removeEventListener('scroll', this.onScroll)
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.onResize)
    }
  }
</script>
