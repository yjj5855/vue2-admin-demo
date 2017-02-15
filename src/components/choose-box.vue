<template>
  <el-dialog title="筛选" v-model="show">
    <el-form>
      <el-form-item label="部门" :label-width="formLabelWidth">
        <el-select v-model="department" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-checkbox v-model="zhuangtai.status0" :true-label="0" :false-label="''">合同未签订</el-checkbox>
        <el-checkbox v-model="zhuangtai.status1" :true-label="1" :false-label="''">试用期</el-checkbox>
        <el-checkbox v-model="zhuangtai.status2" :true-label="2" :false-label="''">正式</el-checkbox>
        <el-checkbox v-model="zhuangtai.status3" :true-label="3" :false-label="''">离职</el-checkbox>
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="confirm(false)">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style>

</style>
<script>
  const LIST = {
    YG_STATUS: 'YG_STATUS', // 员工状态
    HT_STATUS: 'HT_STATUS', // 合同状态
    ZG_STATUS: 'ZG_STATUS', // 招工状态
    SB_TYPE: 'SB_TYPE'    // 社保类型
  }
  LIST
  export default {
    props: {
      chooseList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        show: false,
        department: '', // 部门
        zhuangtai: {
          status0: 0,
          status1: 1,
          status2: 2,
          status3: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      showBox () {
        this.show = true
      },
      confirm (flag) {
        this.show = false
        if (flag === false) {
          return
        }
        this.$emit('confirm', {department: this.department, ...this.zhuangtai})
      }
    }
  }
</script>
