<template>
  <div class="user-edit-base">

    <el-row type="flex" align="middle" justify="space-between" class="box-header">
      <el-col :span="12" class="box-header__title" v-text="title">

      </el-col>
      <!--右侧动作组件-->
      <div>
        <div v-if="!status" @click="status = true" class="c-primary">
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
      <draggable v-model="valueModel" :options="{disabled:!status,chosenClass: 'sortable-chosen',dragClass: 'sortable-drag'}">
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
      </draggable>
    </el-row>

  </div>
</template>
<style lang="less">
  @import '../var.less';

  .user-edit-base{
    .el-icon-check,.c-primary{
      color: @color-primary;
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

    .sortable-chosen{
      background: #eee;
    }
    .sortable-drag{
      background: @color-white;
      opacity: .5;
    }
  }
</style>
<script>
  import draggable from 'vuedraggable'
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
      draggable
    },
    methods: {

    }
  }
</script>
