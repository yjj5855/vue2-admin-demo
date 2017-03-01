<template>
  <div class="popout">
    <div class="btn" :class="{'active': active}" @click.stop="active = !active">
      <i class="el-icon-setting"></i>
    </div>
    <div class="panel" :class="{'active': active}" @click.stop="handlePanelClick">
      <div class="panel-header" @click.stop="handlePanelClick">
        设置主题
      </div>
      <div class="panel-body">
        <el-alert
          v-show="showWarning"
          title="所有颜色不能为空"
          type="warning"
          @close="showWarning = false"
          show-icon>
        </el-alert>
        <el-row>
          <el-col :span="8">
            <div>主色</div>
            <el-color-picker v-model="colors.primary"></el-color-picker>
          </el-col>
          <el-col :span="8">
            <div>信息</div>
            <el-color-picker v-model="colors.info"></el-color-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div>成功</div>
            <el-color-picker v-model="colors.success"></el-color-picker>
          </el-col>
          <el-col :span="8">
            <div>警告</div>
            <el-color-picker v-model="colors.warning"></el-color-picker>
          </el-col>
          <el-col :span="8">
            <div>失败</div>
            <el-color-picker v-model="colors.danger"></el-color-picker>
          </el-col>
        </el-row>
      </div>
      <div class="panel-footer">
        <el-button type="primary" size="small" @click="submitForm">确定</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .popout {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    z-index: 5;
  }
  .popout .btn {
    display: inline-block;
    position: relative;
    outline: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
    z-index: 999;
    background: #eee;
    color: #95a5a6;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0,0,0,0.15);
    transition:0.2s opacity ease-in-out;
    -webkit-transition:0.2s opacity ease-in-out;
  }
  .popout .btn.active {
    visibility: hidden;
    opacity: 0;
  }
  .popout .btn:after {
    display: block;
    position: absolute;
    top: 0;
    content: "";
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: #fff;
    z-index: -2;
    -webkit-transition: -webkit-transform 0.2s, opacity 0.2s;
    -moz-transition: -moz-transform 0.2s, opacity 0.2s;
    transition: transform 0.2s, opacity 0.2s;
  }
  .popout .btn:active:after {
    -webkit-transform: scale(1.3);
    -moz-transform: scale(1.3);
    -ms-transform: scale(1.3);
    transform: scale(1.3);
    opacity: 0;
  }
  .popout .panel {
    box-shadow: 0 0 5px rgba(0,0,0,0.15);
    position: absolute;
    bottom: 0;
    right: 0;
    width: 340px;
    text-align: left;
    overflow: hidden;
    visibility: hidden;
    transform: scale(0);
    transform-origin: 100% 100%;
    transition: transform 0.2s, visibility 0s 0.2s, opacity 0.2s;
    opacity: 0;
  }
  .popout .panel.active {
    height: auto;
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: transform 0.2s, visibility 0s 0s, opacity 0.2s;
  }
  .popout .panel-header {
    padding: 10px 20px;
    font-size: 15px;
    background-color: #34495e;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .popout .panel-body {
    padding: 10px 20px;
    background-color: #fff;
    /*border-bottom-left-radius: 4px;*/
    /*border-bottom-right-radius: 4px;*/
    font-size: 11px;
    color: #aaa;
  }
  .popout .panel-footer {
    text-align: right;
    padding: 10px 20px;
    background-color: #fff;
    border-top: 1px #f1f1f1 solid;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-size: 14px;
    color: #aaa;
  }
</style>
<script>
  import generateColors from './color'
  import objectAssign from 'object-assign'

  const themePath = '//unpkg.com/element-ui/lib/theme-default'
//  const themePath = 'theme'
  export default {
    name: 'theme-setting',
    data () {
      return {
        active: false,
        showWarning: false,

        colors: {
          primary: '#20a0ff',
          info: '#50bfff',
          success: '#13ce66',
          warning: '#f7ba2a',
          danger: '#ff4949'
        },
        originalStylesheetCount: -1,
        originalStyle: '',
        primaryColor: '#20a0ff',
        infoColor: '#50bfff',
        successColor: '#13ce66',
        warningColor: '#f7ba2a',
        dangerColor: '#ff4949',
        styleFiles: [],
        fontFiles: ['element-icons.woff', 'element-icons.ttf'],
        fonts: []
      }
    },
    computed: {
    },
    methods: {
      handlePanelClick (e) {

      },

      submitForm () {
        if (!this.colors.primary || !this.colors.info || !this.colors.success || !this.colors.warning || !this.colors.danger) {
          this.showWarning = true
          return
        }
        this.primaryColor = this.colors.primary
        this.infoColor = this.colors.info
        this.successColor = this.colors.success
        this.warningColor = this.colors.warning
        this.dangerColor = this.colors.danger

        this.colors = objectAssign({}, this.colors, generateColors(this.colors.primary,
          this.colors.info, this.colors.success, this.colors.warning, this.colors.danger))

        this.writeNewStyle()
        this.$store.commit('THEME_CHANGE', this.colors)
        this.active = false
      },
      writeNewStyle () {
        let cssText = this.originalStyle
        Object.keys(this.colors).forEach(key => {
          cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
        })
        if (this.originalStylesheetCount === document.styleSheets.length) {
          const style = document.createElement('style')
          style.innerText = cssText
          document.head.appendChild(style)
        } else {
          const style = document.createElement('style')
          style.innerText = cssText
          document.head.appendChild(style)
        }

        cssText = cssText.replace(/(\n|\t|\s)*/ig, '$1')
        cssText = cssText.replace(/\n|\t|\s(\{|\}|,|:|;)/ig, '$1')
        cssText = cssText.replace(/(\{|\}|,|:|;)\s/ig, '$1')
        window.localStorage.setItem('themeCss', cssText)
      },
      getStyleTemplate (data) {
        const colorMap = {
          '#20a0ff': 'primary',
          '#0190fe': 'secondary',
          '#fbfdff': 'darkWhite',
          '#1f2d3d': 'baseBlack',
          '#324157': 'lightBlack',
          '#48576a': 'extraLightBlack',
          '#8391a5': 'baseSilver',
          '#97a8be': 'lightSilver',
          '#bfcbd9': 'extraLightSilver',
          '#d1dbe5': 'baseGray',
          '#e4e8f1': 'lightGray',
          '#eef1f6': 'extraLightGray',
          '#1d90e6': 'buttonActive',
          '#4db3ff': 'buttonHover',
          '#dfe6ec': 'tableBorder',
          '#d2ecff': 'datepickerInRange',
          '#afddff': 'datepickerInRangeHover',
          '#1c8de0': 'selectOptionSelected',
          '#edf7ff': 'lightBackground',

          '#50bfff': 'info',
          '#13ce66': 'success',
          '#f7ba2a': 'warning',
          '#ff4949': 'danger'
        }
        Object.keys(colorMap).forEach(key => {
          const value = colorMap[key]
          data = data.replace(new RegExp(key, 'ig'), value)
        })
        return data
      },
      getFile (url, isBlob = false) {
        return new Promise((resolve, reject) => {
          const client = new window.XMLHttpRequest()
          client.responseType = isBlob ? 'blob' : ''
          client.onreadystatechange = () => {
            if (client.readyState !== 4) {
              return
            }
            if (client.status === 200) {
              const urlArr = client.responseURL.split('/')
              resolve({
                data: client.response,
                url: urlArr[urlArr.length - 1]
              })
            } else {
              reject(new Error(client.statusText))
            }
          }
          client.open('GET', url)
          client.send()
        })
      },
      getIndexStyle () {
        this.getFile(`${themePath}/index.css`)
          .then(({ data }) => {
            this.originalStyle = this.getStyleTemplate(data)
          })
      },
      getSeparatedStyles () {
        this.getFile(`${themePath}`)
          .then(({ data }) => {
            return data.match(/href="[\w-]+\.css"/g).map(str => str.split('"')[1])
          })
          .then(styleFiles => {
            return Promise.all(styleFiles.map(file => {
              return this.getFile(`${themePath}/${file}`)
            }))
          })
          .then(files => {
            this.styleFiles = files.map(file => {
              return {
                name: file.url,
                data: this.getStyleTemplate(file.data)
              }
            })
          })
      },
      getFontFiles () {
        Promise.all(this.fontFiles.map(font => {
          return this.getFile(`${themePath}/fonts/${font}`, true)
        }))
          .then(fonts => {
            this.fonts = fonts
          })
      }
    },
    created () {
      this.getIndexStyle()
      this.getSeparatedStyles()
      this.getFontFiles()
    },
    mounted () {
      this.$nextTick(() => {
        this.originalStylesheetCount = document.styleSheets.length

        if (window.localStorage.getItem('themeColors')) {
          const themeColors = JSON.parse(window.localStorage.getItem('themeColors'))
          this.colors.primary = themeColors.primary
          this.colors.info = themeColors.info
          this.colors.success = themeColors.success
          this.colors.warning = themeColors.warning
          this.colors.danger = themeColors.danger
        }
      })
    }
  }
</script>
