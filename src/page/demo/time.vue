<template>
  <div style="min-height: 300px;margin: 15px 30px;padding: 8px;background: #fff;">
    <el-row>
      <el-col :span="6">
        <div>上班时间</div>
        <el-time-select
                :editable="false"
                :clearable="false"
                v-model="shangbanModel"
                :picker-options="shangbanOption"
                placeholder="上班时间">
        </el-time-select>
      </el-col>
      <el-col :span="6">
        <div>午休开始</div>
        <el-time-select
                :editable="false"
                :clearable="false"
                v-model="wuxiuStartModel"
                :picker-options="wuxiuStartOption"
                placeholder="午休开始">
        </el-time-select>
      </el-col>
      <el-col :span="6">
        <div>午休结束</div>
        <el-time-select
                :editable="false"
                :clearable="false"
                v-model="wuxiuEndModel"
                :picker-options="wuxiuEndOption"
                placeholder="午休结束">
        </el-time-select>
      </el-col>
      <el-col :span="6">
        <div>下班时间</div>
        <el-time-select
                :editable="false"
                :clearable="false"
                v-model="xiabanModel"
                :picker-options="xiabanOption"
                placeholder="下班时间">
        </el-time-select>
      </el-col>
    </el-row>
    <el-row style="padding: 50px 0;">
      <el-col :span="24">
        <time-slider v-model="timeRange" :step="10"></time-slider>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .shangban,.wuxiu-end,.wuxiu-start,.xiaban{
    position: absolute;
    left: 0;
    right: 0;
  }
  .el-slider.shangban .el-slider__bar,.el-slider.wuxiu-end .el-slider__bar{
    background-color: transparent!important;
  }
</style>
<script>
  import Vue from 'vue'
  import TimeSlider from 'components/time-slider.vue'
  export default{
    data () {
      return {
        timeRange: [480, 720, 780, 1080]
      }
    },
    components: {
      TimeSlider
    },
    computed: {
      shangbanOption () {
        return {
          start: '00:00',
          end: new Date((this.timeRange[1] - 30) * 60 * 1000 - 28800000).Format('HH:mm'),
          step: '00:10'
        }
      },
      wuxiuStartOption () {
        return {
          start: new Date((this.timeRange[0] + 30) * 60 * 1000 - 28800000).Format('HH:mm'),
          end: new Date((this.timeRange[2] - 30) * 60 * 1000 - 28800000).Format('HH:mm'),
          step: '00:10'
        }
      },
      wuxiuEndOption () {
        return {
          start: new Date((this.timeRange[1] + 30) * 60 * 1000 - 28800000).Format('HH:mm'),
          end: new Date((this.timeRange[3] - 30) * 60 * 1000 - 28800000).Format('HH:mm'),
          step: '00:10'
        }
      },
      xiabanOption () {
        return {
          start: new Date((this.timeRange[2] + 30) * 60 * 1000 - 28800000).Format('HH:mm'),
          end: '23:30',
          step: '00:10'
        }
      },
      shangbanModel: {
        get: function () {
          return new Date(this.timeRange[0] * 60 * 1000 - 28800000).Format('HH:mm')
        },
        set: function (newValue) {
          let arr = newValue.split(':')
          let val = parseInt(arr[0] * 60) + parseInt(arr[1])
          Vue.set(this.timeRange, 0, val)
        }
      },
      wuxiuStartModel: {
        get: function () {
          return new Date(this.timeRange[1] * 60 * 1000 - 28800000).Format('HH:mm')
        },
        set: function (newValue) {
          let arr = newValue.split(':')
          let val = parseInt(arr[0] * 60) + parseInt(arr[1])
          Vue.set(this.timeRange, 1, val)
        }
      },
      wuxiuEndModel: {
        get: function () {
          return new Date(this.timeRange[2] * 60 * 1000 - 28800000).Format('HH:mm')
        },
        set: function (newValue) {
          let arr = newValue.split(':')
          let val = parseInt(arr[0] * 60) + parseInt(arr[1])
          Vue.set(this.timeRange, 2, val)
        }
      },
      xiabanModel: {
        get: function () {
          return new Date(this.timeRange[3] * 60 * 1000 - 28800000).Format('HH:mm')
        },
        set: function (newValue) {
          let arr = newValue.split(':')
          let val = parseInt(arr[0] * 60) + parseInt(arr[1])
          Vue.set(this.timeRange, 3, val)
        }
      }

    },
    methods: {

    }
  }
</script>