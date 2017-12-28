<template>
    <div>
      <el-row class="password-strength">
        <el-col class="strength-item" :class="{'lv_1': lv < 2 }" :span="8">&nbsp;<span>弱</span>&nbsp;</el-col>
        <el-col class="strength-item" :class="{'lv_2': lv === 2 }" :span="8">&nbsp;<span>中</span>&nbsp;</el-col>
        <el-col class="strength-item" :class="{'lv_3': lv > 2 }" :span="8">&nbsp;<span>强</span>&nbsp;</el-col>
      </el-row>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../var";
  .password-strength{
    line-height: 22px;

    .strength-item{
      color: #ffffff;
      background: #bfbfbf;
      text-align: center;

      &:nth-child(2) {
        background: #afafaf;
      }

      &.lv_1{
        background: @color-danger;
      }
      &.lv_2{
        background: @color-warning;
      }
      &.lv_3{
        background: @color-success;
      }
    }
  }
</style>
<script>
  export default{
    components: {},
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        lv: 0
      }
    },
    computed: {},
    created () {

    },
    mounted () {

    },
    watch: {
      text (newValue) {
        this.lv = this.checkStrength(newValue)
      }
    },
    methods: {
      checkStrength (val) {
        let lv = 0
        if (val.match(/[a-z]/g)) {
          lv++
        }
        if (val.match(/[0-9]/g)) {
          lv++
        }
        if (val.match(/(.[^a-z0-9])/g)) {
          lv++
        }
        if (val.length < 6) {
          lv = 0
        }
        if (lv > 3) {
          lv = 3
        }
        return lv
      }
    }
  }
</script>
