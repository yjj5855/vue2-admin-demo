<template>
  <div class="svg-box">
    <svg viewBox="0 0 440 440" style="width: 100%;height: 100%">
      <circle cx="220" cy="220" r="170" stroke-width="15" stroke="#EEEEEE" fill="none"></circle>
      <circle cx="220" cy="220" r="170" stroke-width="15" v-bind:stroke="color" fill="none" ref="circle" transform="matrix(0,-1,1,0,0,440)" v-bind:stroke-dasharray="dasharray"></circle>
    </svg>
    <div class="text">
      <animated-integer v-bind:value="percentInt"></animated-integer>%
    </div>
  </div>
</template>
<style scoped>
  .svg-box{
    position: relative;
  }
  .text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    font-size: 20px;
    font-weight: 300;
    color: #474747;
  }
  circle {
    stroke-linecap: round;
    stroke-linejoin: round;
    -webkit-transition: stroke-dasharray .5s;
    transition: stroke-dasharray .5s;
  }
</style>
<script>
  import animatedInteger from './animated-integer.vue'

  export default{
    props: {
      value: {
        default: 0
      }
    },
    data () {
      return {
        percent: 0,
        color: 'hsla(' + Math.floor(Math.random() * (360)) + ', 60%, 50%, 1)'
      }
    },
    components: {
      animatedInteger
    },
    mounted () {
      setTimeout(() => {
        this.percent = Math.random()
      }, 500)

      setInterval(() => {
        this.percent = Math.random()
      }, 5000)
    },
    methods: {

    },
    computed: {
      percentInt () {
        return parseInt(this.percent * 100)
      },
      dasharray () {
        let perimeter = Math.PI * 2 * 170
        return perimeter * this.percent + ' ' + perimeter * (1 - this.percent)
      }
    }
  }
</script>
