<template>
  <div>
    <!--<div class="dots">-->
      <!--<div class="dot"></div>-->
      <!--<div class="dot"></div>-->
      <!--<div class="dot"></div>-->
      <!--<div class="dot"></div>-->
      <!--<div class="dot"></div>-->
    <!--</div>-->
    <div class="drag-dots"
    >
      <div
        class="drag-dots__item"
        @mousedown.stop="onmousedown"
        @mousemove.stop="onmousemove"
        @mouseup.stop="onmouseup"
        @mouseout.stop="onout"
        @mouseleave.stop="onout"
      >
        12
      </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 0;height: 0;">
      <defs>
        <filter id="spin">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5" result="spin" />
          <feBlend in="SourceGraphic" in2="spin" />
        </filter>
      </defs>
    </svg>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  .drag-dots{
    position: relative;
    background: red;
    border-radius: 14px;
    -webkit-filter: url('#spin');
    filter: url('#spin');
  }
  .drag-dots__item{
    color: #fff;
    background: red;
    border-radius: 14px;
    padding: 5px 10px;
  }
  .drag-dots__item.placeholder{
    min-height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }



  body {
    background: #f1f1f1;
  }

  .dots {
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    -webkit-filter: url('#spin');
    filter: url('#spin');
  }

  .dot {
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  .dot:before {
    content: '';
    width: 35px;
    height: 35px;
    border-radius: 50px;
    background: #ffc82e;
    position: absolute;
    left: 50%;
    -webkit-transform: translateY(0) rotate(0deg);
    transform: translateY(0) rotate(0deg);
    margin-left: -17.5px;
    margin-top: -17.5px;
  }
  @-webkit-keyframes dot-move {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    18%,
    22% {
      -webkit-transform: translateY(-70px);
      transform: translateY(-70px);
    }
    40%,
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes dot-move {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    18%,
    22% {
      -webkit-transform: translateY(-70px);
      transform: translateY(-70px);
    }
    40%,
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @-webkit-keyframes dot-colors {
    0% {
      background-color: #ffc82e;
    }
    25% {
      background-color: #f16639;
    }
    50% {
      background-color: #00ade7;
    }
    75% {
      background-color: #3c9f64;
    }
    100% {
      background-color: #ffc82e;
    }
  }
  @keyframes dot-colors {
    0% {
      background-color: #ffc82e;
    }
    25% {
      background-color: #f16639;
    }
    50% {
      background-color: #00ade7;
    }
    75% {
      background-color: #3c9f64;
    }
    100% {
      background-color: #ffc82e;
    }
  }
  .dot:nth-child(5):before {
    z-index: 100;
    width: 45.5px;
    height: 45.5px;
    margin-left: -22.75px;
    margin-top: -22.75px;
    -webkit-animation: dot-colors 40s ease infinite;
    animation: dot-colors 40s ease infinite;
  }
  @-webkit-keyframes dot-rotate-1 {
    0% {
      -webkit-transform: rotate(-105deg);
      transform: rotate(-105deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  @keyframes dot-rotate-1 {
    0% {
      -webkit-transform: rotate(-105deg);
      transform: rotate(-105deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  .dot:nth-child(1) {
    -webkit-animation: dot-rotate-1 40s 0s linear infinite;
    animation: dot-rotate-1 40s 0s linear infinite;
  }
  .dot:nth-child(1):before {
    background-color: #f16639;
    -webkit-animation: dot-move 40s 0s ease infinite;
    animation: dot-move 40s 0s ease infinite;
  }
  @-webkit-keyframes dot-rotate-2 {
    0% {
      -webkit-transform: rotate(165deg);
      transform: rotate(165deg);
    }
    100% {
      -webkit-transform: rotate(540deg);
      transform: rotate(540deg);
    }
  }
  @keyframes dot-rotate-2 {
    0% {
      -webkit-transform: rotate(165deg);
      transform: rotate(165deg);
    }
    100% {
      -webkit-transform: rotate(540deg);
      transform: rotate(540deg);
    }
  }
  .dot:nth-child(2) {
    -webkit-animation: dot-rotate-2 40s 10s linear infinite;
    animation: dot-rotate-2 40s 10s linear infinite;
  }
  .dot:nth-child(2):before {
    background-color: #00ade7;
    -webkit-animation: dot-move 40s 10s ease infinite;
    animation: dot-move 40s 10s ease infinite;
  }
  @-webkit-keyframes dot-rotate-3 {
    0% {
      -webkit-transform: rotate(435deg);
      transform: rotate(435deg);
    }
    100% {
      -webkit-transform: rotate(810deg);
      transform: rotate(810deg);
    }
  }
  @keyframes dot-rotate-3 {
    0% {
      -webkit-transform: rotate(435deg);
      transform: rotate(435deg);
    }
    100% {
      -webkit-transform: rotate(810deg);
      transform: rotate(810deg);
    }
  }
  .dot:nth-child(3) {
    -webkit-animation: dot-rotate-3 40s 20s linear infinite;
    animation: dot-rotate-3 40s 20s linear infinite;
  }
  .dot:nth-child(3):before {
    background-color: #3c9f64;
    -webkit-animation: dot-move 40s 20s ease infinite;
    animation: dot-move 40s 20s ease infinite;
  }
  @-webkit-keyframes dot-rotate-4 {
    0% {
      -webkit-transform: rotate(705deg);
      transform: rotate(705deg);
    }
    100% {
      -webkit-transform: rotate(1080deg);
      transform: rotate(1080deg);
    }
  }
  @keyframes dot-rotate-4 {
    0% {
      -webkit-transform: rotate(705deg);
      transform: rotate(705deg);
    }
    100% {
      -webkit-transform: rotate(1080deg);
      transform: rotate(1080deg);
    }
  }
  .dot:nth-child(4) {
    -webkit-animation: dot-rotate-4 40s 30s linear infinite;
    animation: dot-rotate-4 40s 30s linear infinite;
  }
  .dot:nth-child(4):before {
    background-color: #ffc82e;
    -webkit-animation: dot-move 40s 30s ease infinite;
    animation: dot-move 40s 30s ease infinite;
  }

</style>
<script>
  export default{
    components: {},
    data () {
      return {
        mousedown: false,
        dragDom: null,
        x: 0,
        y: 0,
        dragDotsDom: null
      }
    },
    computed: {},
    created () {

    },
    mounted () {
      this.dragDotsDom = document.querySelector('.drag-dots')
      this.dragDom = document.querySelector('.drag-dots__item')
      console.log(this.dragDom)
    },
    methods: {
      onmousedown (ev) {
        console.log('down', ev.x, ev.y)
        this.mousedown = true

        this.dragDom._style = this.dragDom.style

        this.x = ev.x
        this.y = ev.y
      },
      onmousemove (ev) {
        if (!this.mousedown) { return }
        console.log('move', ev.x, ev.y)

        this.dragDotsDom.style.webkitTransform = `translate(${(ev.x - this.x) / 2}px,  ${(ev.y - this.y) / 2}px)`
        this.dragDotsDom.style.MozTransform = `translate(${(ev.x - this.x) / 2}px,  ${(ev.y - this.y) / 2}px)`

        this.dragDom.style.webkitTransform = `translate(${ev.x - this.x}px,  ${ev.y - this.y}px)`
        this.dragDom.style.MozTransform = `translate(${ev.x - this.x}px,  ${ev.y - this.y}px)`
      },
      onmouseup (ev) {
        if (!this.mousedown) { return }
        this.mousedown = false
        console.log('up', ev.x, ev.y)
      },
      onout () {
        if (!this.mousedown) { return }
        this.mousedown = false
        this.dragDom.style = this.dragDom._style
        this.x = 0
        this.y = 0
      }
    }
  }
</script>
