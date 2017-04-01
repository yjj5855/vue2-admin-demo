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


    <el-row>
      <el-col :span="14">
        <div class="text-center">自定义员工字段</div>
        <div class="text-center">(拖动即可排序哦)</div>
      </el-col>
      <el-col :span="10">
        <div class="text-center">字段库</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="14">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="item.name" :name="'tab_'+index" v-for="(item, index) in showModel">

            <draggable v-model="item.children" :options="{group:item.name}">

              <div class="block-box" v-for="block in item.children">
                <div class="block-box__title">{{block.name}}</div>

                <draggable v-model="block.children" :options="{group:block.name}">
                  <div class="row-box"  v-for="row in block.children">
                    <div class="row-box__title">{{row.name}}</div>
                  </div>
                </draggable>
              </div>
            </draggable>

          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="10" style="padding: 0 100px">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="item.name" :name="'tab_'+index" v-for="(item, index) in hideModel">

          </el-tab-pane>
        </el-tabs>
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
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      background: #ffffff;

      .row-box__title{
        font-size: 14px;
      }
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
      this.$set(this, 'showModel', this.customFields.filter(item => {
        return item.show
      }))
      this.$set(this, 'hideModel', this.customFields.filter(item => {
        return !item.show
      }))
    },
    mounted () {
      console.log(this.$route.params)
    },
    methods: {}
  }
</script>
