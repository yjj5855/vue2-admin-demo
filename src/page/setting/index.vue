<template>
  <div class="setting">
    <el-row type="flex" align="middle" class="box-header">
      <el-col class="box-header__title">
        <span>温馨提示：</span>员工管理模块是基础模块，建议创建组织，导入员工后再开展相关模块启用
      </el-col>
      <router-link to="setting/pre">
        <el-button size="small">
          设置引导
        </el-button>
      </router-link>
    </el-row>
    <div class="white-space"></div>
    <div class="white-space"></div>
    <div class="white-space"></div>
    <el-row :gutter="100" class="card-box">
      <el-col :span="12" class="card-item" v-for="(item, index) in menuList">
        <el-card class="card-item-box">
          <el-row :gutter="20">
            <el-col :span="6" class="card-item-box__left">
              <i :class="item.icon" style="color: #1ab394;font-size: 50px!important;"></i>
              <br/><br/>
              <el-switch
                :width="55"
                v-model="item.onOff"
                :disabled="item.disabled"
                on-text=""
                off-text=""
                @change="onSwitchChange(item, index)">
              </el-switch>
            </el-col>
            <el-col :span="18">
              <div class="card-item__title">
                <div v-text="item.name"></div>
                <div class="card-item__title__desc" v-text="item.desc"></div>
              </div>

              <el-row type="flex" align="middle" class="card-item__state" v-for="row in item.stateList">
                <div class="flex-1" v-text="row.name"></div>
                <i class="el-icon-check" v-if="row.state"></i>
                <i class="el-icon-arrow-right"></i>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../var";
  .setting{
    .box-header__title{
      flex: 1;
      color: #999;
      font-size: 12px;
      span{
        color: @color-warning;
      }
    }
    .el-button--default{
      color: @color-primary;
      border-color: @color-primary;
    }

    .card-box{
      margin-left: 0!important;
      margin-right: 0!important;
      padding: 0 50px;
    }
    .card-item{
      margin-bottom: 50px;
    }
    .card-item-box{
      transition: all 0.3s ease;
      height: 205px;
      box-shadow: none;

      &:hover{
        transform: translate3d(0, -2px, 0);
        box-shadow: 0 15px 30px rgba(0,0,0,0.1);
      }

      .el-card__body{
        padding-bottom: 5px;
      }
    }
    .card-item-box__left{
      text-align: center;
    }

    .card-item__title{
      height: 100px;
      overflow: hidden;
    }
    .card-item__title__desc{
      margin-top: 20px;
      font-size: 13px;
      color: #999;
    }
    .card-item__state{
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      border-top: @border-base;
      color: #999;

      .flex-1{
        flex: 1;
      }
      i{
        padding: 10px;
        font-size: 12px;
      }
      .el-icon-check{
        color: @color-primary;
      }
    }

    .el-switch{
      transform: scale(.8);
    }
  }
</style>
<script>
  export default{
    components: {

    },
    data () {
      return {
      }
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '菜单设置', path: '/setting'}])
    },
    mounted () {

    },
    methods: {
      onSwitchChange (item, index) {
        if (item.onOff) {
          // 添加菜单 到菜单列表
          this.$store.dispatch('addMenu', {
            index,
            $router: this.$router
          })
        } else {
          // 删除菜单
          this.$store.commit('DELETE_MENU', index)
        }
      }
    }
  }
</script>
