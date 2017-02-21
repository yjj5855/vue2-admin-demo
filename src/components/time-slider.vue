<template>
  <div class="el-slider">

    <div class="el-slider__runway"
         :class="{ 'disabled': disabled }"
         @click="onSliderClick"
         ref="slider">
      <div
          class="el-slider__bar"
          :style="{
          width: shangwuBarWidth,
          left: shangwuBarLeft
        }">
      </div>
      <div
              class="el-slider__bar"
              :style="{
          width: xiawuBarWidth,
          left: xiawuBarLeft
        }">
      </div>


      <time-slider-button
              :tooltip="'top'"
              label="上班时间"
              v-model="value[0]"
              :maxValue="value[1]"
              ref="button1">
      </time-slider-button>
      <time-slider-button
              :tooltip="'bottom'"
              label="午休开始"
              :minValue="value[0]"
              v-model="value[1]"
              :maxValue="value[2]"
              ref="button1">
      </time-slider-button>
      <time-slider-button
              :tooltip="'top'"
              label="午休结束"
              :minValue="value[1]"
              v-model="value[2]"
              :maxValue="value[3]"
              ref="button1">
      </time-slider-button>
      <time-slider-button
              :tooltip="'bottom'"
              label="下班时间"
              :minValue="value[2]"
              v-model="value[3]"
              ref="button1">
      </time-slider-button>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import TimeSliderButton from './time-slider-button.vue'
  import {getStyle} from '../libs/utils'
  export default{
    data () {
      return {
        precision: 0,
        dragging: false
      }
    },
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 1439
      },
      value: {
        type: Array,
        default: [25, 50, 75, 100]
      },
      showStops: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      step: {
        type: Number,
        default: 1
      }
    },
    components: {
      TimeSliderButton
    },
    watch: {
      value (val, oldVal) {
        if (this.dragging ||
                Array.isArray(val) &&
                Array.isArray(oldVal) &&
                val.every((item, index) => item === oldVal[index])) {
          return
        }
        this.setValues()
      }
    },
    computed: {
      $sliderWidth () {
        return parseInt(getStyle(this.$refs.slider, 'width'), 10)
      },
      shangwuBarWidth () {
        return `${100 * (this.value[1] - this.value[0]) / (this.max - this.min)}%`
      },
      shangwuBarLeft () {
        return `${100 * (this.value[0] - this.min) / (this.max - this.min)}%`
      },
      xiawuBarWidth () {
        return `${100 * (this.value[3] - this.value[2]) / (this.max - this.min)}%`
      },
      xiawuBarLeft () {
        return `${100 * (this.value[2] - this.min) / (this.max - this.min)}%`
      }
    },
    methods: {
      setValues () {
        this.$emit('input', this.value)
      },
      onSliderClick (event) {
        if (this.disabled || this.dragging) return
        const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left
        this.setPosition((event.clientX - sliderOffsetLeft) / this.$sliderWidth * 100)
      },
      val2time (val) {
        return new Date(1439 * 60 * 1000 - 28800000).Format('HH:mm')
      }

    },
    mounted () {
//      console.log(new Date(1439 * 60 * 1000 - 28800000).Format('HH:mm'))
      let precisions = [this.min, this.max, this.step].map(item => {
        let decimal = ('' + item).split('.')[1]
        return decimal ? decimal.length : 0
      })
      this.precision = Math.max.apply(null, precisions)
    }
  }
</script>