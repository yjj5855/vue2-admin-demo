<template>
  <div class="custom-fields">
    <el-row type="flex" align="middle" class="box-header">
      <el-col class="box-header__title">
        <span>温馨提示：</span>您可根据实际情况定制员工信息字段，对员工信息字段进行编辑，删除或排序（必填字段无法删除），或者拖拽自定义字段至工作区添加扩展信息
      </el-col>
      <el-button size="small" @click="$router.back()">
        返  回
      </el-button>
    </el-row>


    <el-row :gutter="50">
      <el-col :span="12">
        <div class="text-center">自定义员工字段</div>
        <div class="text-center">(拖动即可排序哦)</div>
      </el-col>
      <el-col :span="12">
        <div class="text-center">字段库</div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :span="12">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="item.name" :name="'tab_'+index" v-for="(item, index) in showModel">

            <draggable v-model="item.children" :options="{group:item.name}">
              <el-collapse v-for="(block, ii) in item.children" :value="block.name">
                <el-collapse-item :name="block.name">
                  <template slot="title">
                    {{block.name}}
                  </template>
                  <draggable v-model="block.children" :options="{group:block.name}" :move="onMove">
                    <div class="row-box" v-for="(row, i) in block.children" :must="row.must">
                      <div class="row-box__title">{{row.name}} {{row.must?'(必填)':''}}</div>
                      <div class="row-box__action">
                        <i class="el-icon-edit" @click.stop="editCustomField(row)"></i>
                        <i class="el-icon-fa-bars"></i>
                        <i class="el-icon-delete2" v-if="!row.must" @click.stop="deleteCustomField(block.children, i, hideModel[index].children[ii])"></i>
                        <i class="el-icon-delete2" v-else style="color: #a0a0a0"></i>
                      </div>
                    </div>
                    <div class="row-box text-center" v-if="block.children.length == 0" style="padding-right: 20px;">
                      暂无字段
                    </div>
                  </draggable>
                </el-collapse-item>
              </el-collapse>


              <!--<div class="block-box" v-for="block in item.children">-->
                <!--<div class="block-box__title">{{block.name}}</div>-->

                <!--<draggable v-model="block.children" :options="{group:block.name}">-->
                  <!--<div class="row-box"  v-for="row in block.children">-->
                    <!--<div class="row-box__title">{{row.name}}</div>-->
                  <!--</div>-->
                <!--</draggable>-->
              <!--</div>-->
            </draggable>

          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="12">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="item.name" :name="'tab_'+index" v-for="(item, index) in hideModel">

            <draggable v-model="item.children" :options="{group: 'hide_'+item.name}">

              <el-collapse v-for="block in item.children" :value="block.name" >
                <el-collapse-item :name="block.name">
                  <template slot="title">
                    {{block.name}}
                  </template>
                  <draggable v-model="block.children" :options="{group:block.name}">
                    <div class="row-box"  v-for="row in block.children">
                      <div class="row-box__title">{{row.name}}</div>
                    </div>
                    <div class="row-box text-center" @click="addCustomField(block.children)">
                      <i class="el-icon-plus"></i>
                    </div>
                  </draggable>
                </el-collapse-item>
              </el-collapse>

            </draggable>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-button type="primary" :loading="true">提交</el-button>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../var";
  .custom-fields{
    .box-header{

    }
    .box-header__title{
      flex: 1;
      color: #999;
      font-size: 12px;
      span{
        color: @color-warning;
      }
    }
    .text-center{
      text-align: center;
    }

    .block-box{
      margin-bottom: 50px;
      background: #ffffff;

      .block-box__title{
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        border-bottom: 1px @color-dark-white solid;
      }
    }
    .row-box{
      position: relative;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      background: #ffffff;

      &:hover{
        background: #f9f9f9;

        .row-box__action{
          display: block;
        }
      }
      .row-box__title{
        font-size: 14px;
      }
      .row-box__action{
        display: none;
        position: absolute;
        right: 10px;
        top: 0;

        i{
          cursor: pointer;
          padding: 18px;
        }

      }
    }

    .el-collapse{
      margin-bottom: 30px;
    }
  }
</style>
<script>
  import draggable from 'vuedraggable'
  export default{
    components: {
      draggable
    },
    data () {
      return {
        activeName: 'tab_0',

        customFieldList: JSON.parse(JSON.stringify(this.$store.state.app.customFields)),

        showModel: [],
        hideModel: []
      }
    },
    computed: {
      customFields () {
        return JSON.parse(JSON.stringify(this.$store.state.app.customFields))
      }
    },
    created () {
      let showModel = []
      let hideModel = []
      for (let i = 0; i < this.customFields.length; i++) {
        showModel.push({
          ...this.customFields[i],
          children: []
        })
        hideModel.push({
          ...this.customFields[i],
          children: []
        })
        this.customFields[i].children && this.customFields[i].children.map((item, index) => {
          showModel[i].children[index] = {
            ...item,
            children: []
          }
          hideModel[i].children[index] = {
            ...item,
            children: []
          }
          item.children && item.children.map(item => {
            if (item.show) {
              delete item.show
              showModel[i].children[index].children.push(item)
            } else {
              delete item.show
              hideModel[i].children[index].children.push(item)
            }
          })
        })
      }
      this.$set(this, 'showModel', showModel)
      this.$set(this, 'hideModel', hideModel)
    },
    mounted () {

    },
    methods: {
      getShowCustomFields (list = []) {
        return list.filter(item => {
          return item.show
        })
      },
      getHideCustomFields (list = []) {
        return list.filter(item => {
          return !item.show
        })
      },
      addCustomField (parentList) {
        this.$prompt(`请输入新字段的名字`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: `增加了新字段: 【${value}】`
          })
          parentList.push({
            name: value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      editCustomField (item) {
        this.$prompt(`请输入【${item.name}】的新名称`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: `字段【${item.name}】改为了: 【${value}】`
          })
          item.name = value
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      deleteCustomField (list, index, hideList) {
        this.$confirm(`是否要删除【${list[index].name}】这个字段?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let item = JSON.parse(JSON.stringify(list[index]))
          console.log(hideList)
          hideList.children.push(item)
          list.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      onMove (evt) {
        return !evt.draggedContext.element.must
      }
    }
  }
</script>
