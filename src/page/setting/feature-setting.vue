<template>
  <div class="feature-setting">
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

    <!--列表-->
    <div class="list-item" v-for="(item, index) in menuList">
      <div class="list-item__title">
        <span class="anchor-item" :id="'anchor-'+index" v-text="item.name"></span>
        <span class="list-item__title__desc" v-text="item.desc"></span>
      </div>
      <div>
        <router-link :to="{name: row.pathName, params: {from: 'feature-setting'}}" class="item__icon" v-for="row in item.stateList">
          <img src="" />
          <div>
            <span v-text="row.name"></span>
            <span class="color-gray-2" v-if="row.must">(必须)</span>
          </div>
        </router-link>
      </div>
    </div>

    <!--锚点菜单-->
    <div style="position: fixed; top: 200px;right: 50px;">
      <el-steps :space="50" direction="vertical">
        <el-step :class="{active: activeItem == 'anchor-'+index}" :title="item.name" v-for="(item, index) in menuList"></el-step>
      </el-steps>
    </div>

  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../var";
  .feature-setting{
    margin: 0 -20px;

    .box-header{
      margin-left: 20px;
      margin-right: 20px;
    }
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

    .list-item{
      padding: 40px;

      &:nth-child(odd){
        background: #fbfbfb;
      }
    }
    .list-item__title{
      color: #222;
      margin-bottom: 30px;
    }
    .list-item__title__desc{
      margin-left: 15px;
      color: #a2a2a2;
      font-size: 14px;
    }

    .item__icon{
      display: inline-block;
      margin-right: 60px;
      color: #222;
      font-size: 14px;
      text-align: center;
      text-decoration: none;

      img{
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin-bottom: 10px;
      }

      .color-gray-2{
        color: #a2a2a2;
      }
    }

    .el-switch{
      transform: scale(.8);
    }

    .el-step.active{
      .el-step__head{
        background: @color-primary!important;
      }
      .el-step__title{
        color: @color-primary!important;
      }
    }
    @px16: 16px;
    .el-step__head{
      width: @px16;
      height: @px16;
      line-height: @px16;
      border-color: @color-primary!important;
    }
    .el-step__title{
      line-height: 20px;
    }
    .el-step__line{
      left: 9px;
      top: 20px;
      border-left: 2px @color-primary dashed;
      background-color: transparent;

      .el-step__line-inner{
        display: none;
      }
    }
    .el-step__icon{
      display: none;
    }

  }
</style>
<script>
  import $ from 'zepto'
  export default{
    components: {

    },
    data () {
      return {
        activeItem: 'anchor-0'
      }
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '功能设置', path: '/feature-setting'}])
    },
    mounted () {
      let self = this
      $(window).scroll(function () {
        let items = $('.feature-setting').find('.anchor-item')
        let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let currId = ''
        items.map(function () {
          let my = $(this)
          if (top + 222 >= my.offset().top) {
            currId = my.attr('id')
          }
        })
        self.activeItem = currId
      })
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
