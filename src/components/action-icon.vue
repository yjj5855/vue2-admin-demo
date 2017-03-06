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
    <span @click="dom2ImageAndDownload" v-if="downloadName">
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
      },
      downloadName: {
        type: String
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
        if (!this.fullScreenStatus) {
          this.fullScreenStatus = true
          fullScreenDom.style_old = fullScreenDom.style // 记录下未全屏时的样式
          fullScreenDom.style.position = 'fixed'
          fullScreenDom.style.top = 0
          fullScreenDom.style.left = 0
          fullScreenDom.style.right = 0
          fullScreenDom.style.bottom = 0
          fullScreenDom.style['z-index'] = 999
          fullScreenDom.style.background = '#fff'

          fullScreenDom.style.width = '100%'
          fullScreenDom.style.height = '100%'
          fullScreenDom.style.padding = '50px'
          fullScreenDom.style['box-sizing'] = 'border-box'
          this.$nextTick(() => {
            this.$emit('on-full-screen', true)
          })
        } else {
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
      },
      dom2ImageAndDownload () {
        let downloadDom = document.querySelector(`#${this.downloadName}`)
        window.html2canvas(downloadDom, {
          allowTaint: true,
          onrendered: function (canvas) {
            var url = canvas.toDataURL()

            // 以下代码为下载此图片功能
            var triggerDownload = document.createElement('a')
            triggerDownload.setAttribute('href', url)
            triggerDownload.setAttribute('download', '数据截图.png')

            document.body.appendChild(triggerDownload)
            triggerDownload.click()
            triggerDownload.remove()
          }
        })
      }
    }
  }
</script>
