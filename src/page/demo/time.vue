<template>
  <div style="min-height: 300px;margin: 15px 30px;padding: 8px;background: #fff;">
    <el-row>
      <el-col :span="24">
        <time-slider v-model="timeRange" :step="10"></time-slider>

        <el-slider v-model="value1"></el-slider>
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
  import TimeSlider from 'components/time-slider.vue'
  export default{
    data () {
      return {
        timeRange: [480, 720, 780, 1080],
        value1: 30,
        value2: 50,
        value3: 60,
        value4: 90
      }
    },
    components: {
      TimeSlider
    },
    methods: {

    }
  }
</script>