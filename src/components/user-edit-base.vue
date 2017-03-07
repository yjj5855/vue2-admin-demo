<template>
  <div class="user-edit-base">

    <el-row type="flex" align="middle" justify="space-between" class="box-header">
      <el-col :span="12" class="box-header__title" v-text="title">

      </el-col>
      <!--右侧动作组件-->
      <div>
        <div v-if="!status" @click="status = true" style="color: #11b95c">
          <i class="el-icon-edit"></i> 编辑
        </div>
        <div v-else>
          <i class="el-icon-check" @click="status = false"></i>&emsp;
          <i class="el-icon-close" @click="status = false"></i>
        </div>
      </div>
    </el-row>

    <div class="white-space"></div>

    <!--<el-form label-position="right" label-width="100">-->
      <!--<el-form-item :label="item.label" v-for="item in valueModel">-->
        <!---->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <el-row :gutter="20" style="padding: 0 100px;">
      <el-col :span="12" v-for="item in valueModel" class="item">
        <el-row type="flex" align="middle">
          <el-col :span="6" class="item-label">
            <span v-text="item.label"></span>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="16">
            <el-input v-model="item.value" :disabled="!status"></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="less">
  .user-edit-base{
    .el-icon-check{
      color: #11b95c;
    }
    .el-icon-close{
      color: red;
    }

    .item{
      margin-bottom: 20px;

      .is-disabled{
        .el-input__inner{
          color: #1f2b3d;
          border: none!important;
          background: transparent!important;
        }
      }
    }

    .item-label{
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
</style>
<script>
  export default{
    props: {
      title: {
        type: String,
        default: '基本信息'
      },
      editStatus: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        // 控制全部input的编辑状态
        status: this.editStatus,

        // model
        valueModel: JSON.parse(JSON.stringify(this.value))
      }
    },
    components: {

    },
    methods: {

    }
  }
</script>
