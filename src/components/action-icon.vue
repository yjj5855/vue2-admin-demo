/**
action-icon 用法
<div class="echarts-box" id="chart-age">
  <el-row type="flex" align="middle" justify="space-between" class="box-header">
    <el-col :span="12" class="box-header__title">
      子公司员工年龄分布统计
    </el-col>

    <!-- 操作按钮 可以绑定其他组件的事件 -->
    <action-icon
      :show-eye="true"
      @on-eye-toggle="$refs.age && $refs.age.onEyeToggle(arguments)"

      :full-screen="'chart-age'"
      @on-full-screen="$refs.age && $refs.age.onFullScreen(arguments)">

    </action-icon>
  </el-row>
  <echarts :option="lineCharts" ref="age"></echarts>
</div>
**/

<template>
  <div class="action-box">
    <span @click="toggleEyeIcon" v-if="showEye">
       <i class="el-icon-fa-eye" v-if="!eyeStatus"></i>
      <i class="el-icon-fa-eye-slash" v-if="eyeStatus"></i>
    </span>
    <span @click="toggleFullScreen" v-if="fullScreen">
      <i class="el-icon-fa-expand" v-if="!fullScreenStatus"></i>
      <i class="el-icon-fa-compress" v-if="fullScreenStatus"></i>
    </span>
    <span>
      <i class="el-icon-fa-download"></i>
    </span>
  </div>
</template>
<style scoped>
  span{
    padding: 16px 5px;
    cursor: pointer;
  }
  .el-icon-close{
    font-size: 14px;
  }

  /*全屏显示*/
  .full-screen {
    width: 100%!important;
    height: 100%!important;
  }
</style>
<script>
  export default{
    props: {
      fullScreen: {
        type: String
      },
      showEye: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        fullScreenStatus: false,
        eyeStatus: false
      }
    },
    components: {

    },
    methods: {
      toggleFullScreen () {
        let fullScreenDom = document.querySelector(`#${this.fullScreen}`)
        if (!this.fullScreen || !fullScreenDom) {
          window.alert('没有找到要全屏展示的元素')
          return
        }
        if (!document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
          if (fullScreenDom.requestFullscreen) {
            fullScreenDom.requestFullscreen()
          } else if (fullScreenDom.mozRequestFullScreen) {
            fullScreenDom.mozRequestFullScreen()
          } else if (fullScreenDom.webkitRequestFullscreen) {
            fullScreenDom.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT)
          }
          this.fullScreenStatus = true
          fullScreenDom.style_old = fullScreenDom.style // 记录下未全屏时的样式
          fullScreenDom.style.width = '100%'
          fullScreenDom.style.height = '100%'
          fullScreenDom.style.padding = '50px'
          fullScreenDom.style['box-sizing'] = 'border-box'
          this.$nextTick(() => {
            this.$emit('on-full-screen', true)
          })
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
          this.fullScreenStatus = false
          fullScreenDom.style = fullScreenDom.style_old
          this.$nextTick(() => {
            this.$emit('on-full-screen', false)
          })
        }
      },
      toggleEyeIcon () {
        if (!this.eyeStatus) {
          this.$emit('on-eye-toggle', true)
        } else {
          this.$emit('on-eye-toggle', false)
        }
        this.eyeStatus = !this.eyeStatus
      }
    }
  }
</script>
