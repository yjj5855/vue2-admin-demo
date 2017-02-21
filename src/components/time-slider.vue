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
              :min="0"
              :max="value2"
              label="上班时间"
              v-model="value1"
              ref="button1">
      </time-slider-button>
      <time-slider-button
              label="午休开始"
              v-model="value2"
              ref="button1">
      </time-slider-button>
      <time-slider-button
              label="午休结束"
              v-model="value3"
              ref="button1">
      </time-slider-button>
      <time-slider-button
              label="下班时间"
              v-model="value4"
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
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,

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
      }
    },
    components: {
      TimeSliderButton
    },
    watch: {
      value (val, oldVal) {
        console.log(val)
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
        return `${100 * (this.value2 - this.value1) / (this.max - this.min)}%`
      },
      shangwuBarLeft () {
        return `${100 * (this.value1 - this.min) / (this.max - this.min)}%`
      },
      xiawuBarWidth () {
        return `${100 * (this.value4 - this.value3) / (this.max - this.min)}%`
      },
      xiawuBarLeft () {
        return `${100 * (this.value3 - this.min) / (this.max - this.min)}%`
      }
    },
    methods: {
      setValues () {
        const val = this.value
        console.log(val)
        this.value1 = val[0]
        this.value2 = val[1]
        this.value3 = val[2]
        this.value4 = val[3]
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
      console.log(new Date(1439 * 60 * 1000 - 28800000).Format('HH:mm'))
      this.value1 = this.value[0]
      this.value2 = this.value[1]
      this.value3 = this.value[2]
      this.value4 = this.value[3]
      let precisions = [0, 100, 1].map(item => {
        let decimal = ('' + item).split('.')[1]
        return decimal ? decimal.length : 0
      })
      this.precision = Math.max.apply(null, precisions)
    }
  }
</script>