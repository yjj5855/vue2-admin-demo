<template>
  <div
          class="el-slider__button-wrapper"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @mousedown="onButtonDown"
          :class="{ 'hover': hovering, 'dragging': dragging }"
          :style="{ left: currentPosition }"
          ref="button">
    <el-tooltip placement="top" ref="tooltip">
      <span slot="content">{{label}} {{ val2time }}</span>
      <div class="el-slider__button" :class="{ 'hover': hovering, 'dragging': dragging }"></div>
    </el-tooltip>
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'TimeSliderButton',
    props: {
      value: {
        type: Number,
        default: 0
      },
      label: {
        type: String,
        default: ''
      },
      maxValue: {
        type: Number,
        default: 1439
      },
      minValue: {
        type: Number,
        default: 0
      }

    },
    data () {
      return {
        hovering: false,
        dragging: false,
        startX: 0,
        currentX: 0,
        startPosition: 0,
        newPosition: null,
        oldValue: this.value
      }
    },
    computed: {
      disabled () {
        return this.$parent.disabled
      },
      max () {
        return this.$parent.max
      },
      min () {
        return this.$parent.min
      },
      step () {
        return 1
      },
      precision () {
        return this.$parent.precision
      },
      currentPosition () {
//        console.log(this.value)
        return `${(this.value - this.min) / (this.max - this.min) * 100}%`
      },
      val2time () {
        return new Date(this.value * 60 * 1000 - 28800000).Format('HH:mm')
      }
    },
    watch: {
      dragging (val) {
        this.$parent.dragging = val
      }
    },
    methods: {
      showTooltip () {
        this.$refs.tooltip && (this.$refs.tooltip.showPopper = true)
      },
      hideTooltip () {
        this.$refs.tooltip && (this.$refs.tooltip.showPopper = false)
      },
      handleMouseEnter () {
//        console.log('handleMouseEnter')
        this.hovering = true
        this.showTooltip()
      },

      handleMouseLeave () {
//        console.log('handleMouseLeave')
        this.hovering = false
        this.hideTooltip()
      },
      onButtonDown (event) {
//        console.log('onButtonDown')
        if (this.disabled) return
        this.onDragStart(event)
        window.addEventListener('mousemove', this.onDragging)
        window.addEventListener('mouseup', this.onDragEnd)
        window.addEventListener('contextmenu', this.onDragEnd)
      },
      onDragStart (event) {
//        console.log('onDragStart')
        this.dragging = true
        this.startX = event.clientX
        this.startPosition = parseInt(this.currentPosition, 10)
      },
      onDragging (event) {
//        console.log('onDragging')
        if (this.dragging) {
          this.showTooltip()
          this.currentX = event.clientX
//          console.log(this.currentX, this.startX, this.$parent.$sliderWidth)
          const diff = (this.currentX - this.startX) / this.$parent.$sliderWidth * 100
//          console.log(this.startPosition, diff)
          this.newPosition = this.startPosition + diff
          this.setPosition(this.newPosition)
        }
      },
      onDragEnd () {
//        console.log('onDragEnd')
        if (this.dragging) {
          /*
           * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
           * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
           */
          setTimeout(() => {
            this.dragging = false
            this.hideTooltip()
            this.setPosition(this.newPosition)
          }, 0)
          window.removeEventListener('mousemove', this.onDragging)
          window.removeEventListener('mouseup', this.onDragEnd)
          window.removeEventListener('contextmenu', this.onDragEnd)
        }
      },
      setPosition (newPosition) {
        if (newPosition < 0) {
          newPosition = 0
        } else if (newPosition > 100) {
          newPosition = 100
        }
        const lengthPerStep = 100 / ((this.max - this.min) / this.step)
        const steps = Math.round(newPosition / lengthPerStep)
        let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min
        value = parseFloat(value.toFixed(this.precision))
        console.log(value)
        this.$emit('input', value)
        this.$refs.tooltip && this.$refs.tooltip.updatePopper()
        if (!this.dragging && this.value !== this.oldValue) {
          this.oldValue = this.value
        }
      }
    }
  }
</script>