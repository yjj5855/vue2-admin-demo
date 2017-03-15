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
      <el-col :span="12" class="card-item"  v-for="item in cardList">
        <el-card class="card-item-box">
          <el-row :gutter="20">
            <el-col :span="6" class="card-item-box__left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" :style="{stroke:'#1ab394'}" style="width: 50px;height: 50px;">
                <rect x="175" y="100" width="50" height="50" style="fill: none;stroke-width: 10;"/>
                <rect x="75" y="250" width="50" height="50" style="fill: none;stroke-width: 10;"/>
                <rect x="175" y="250" width="50" height="50" style="fill: none;stroke-width: 10;"/>
                <rect x="275" y="250" width="50" height="50" style="fill: none;stroke-width: 10;"/>
                <path d="M 200 150 L 200 250" style="fill: none;stroke-width: 10;"/>
                <path d="M 100.114 250 L 100 200 L 299.718 200.508 L 300 249.508" style="fill: none;stroke-width: 10;"/>
              </svg>
              <br/><br/>
              <el-switch
                :width="55"
                v-model="item.onOff"
                on-text=""
                off-text="">
              </el-switch>
            </el-col>
            <el-col :span="18">
              <div class="card-item__title">
                <div v-text="item.title">员工管理</div>
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
        color: @--color-warning;
      }
    }
    .el-button--default{
      color: @--color-primary;
      border-color: @--color-primary;
    }

    .card-box{
      padding: 0 50px;
    }
    .card-item{
      margin-bottom: 50px;
    }
    .card-item-box{
      height: 205px;

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
      border-top: 1px #e4e4e4 solid;
      color: #999;

      .flex-1{
        flex: 1;
      }
      i{
        padding: 10px;
        font-size: 12px;
      }
      .el-icon-check{
        color: @--color-primary;
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
        switch1: false,
        cardList: [
          {
            img: '',
            onOff: true,
            title: '员工管理',
            desc: '支持员工入，离职办理，员工信息录入，查询，搜索，更新，跟踪',
            stateList: [
              {name: '创建组织架构', state: true},
              {name: '导入员工', state: true}
            ]
          },
          {
            img: '',
            onOff: false,
            title: '考勤管理',
            desc: '多种考勤方案的设置，员工可以使用班步APP打卡考勤，考勤数据自动上传至云端',
            stateList: [
              {name: '考勤方案设置', state: true}
            ]
          },
          {
            img: '',
            onOff: false,
            title: '社保公积金',
            desc: '设置员工的社保方案，员工会产生对应的社保账单',
            stateList: [
              {name: '社保方案设置', state: false},
              {name: '公积金对账', state: false}
            ]
          },
          {
            img: '',
            onOff: false,
            title: '薪酬福利',
            desc: '维护员工的工资福利信息，系统每月根据员工的考勤状况自动计算工资',
            stateList: [
              {name: '工资福利信息维护', state: false},
              {name: '司龄/生日祝福', state: false}
            ]
          },
          {
            img: '',
            onOff: false,
            title: '招聘管理',
            desc: '编辑招聘需求，录入员工简历，发起面试通知，反馈面试结果',
            stateList: [
              {name: '面试管理', state: false},
              {name: '人才库', state: false}
            ]
          },
          {
            img: '',
            onOff: false,
            title: '其他功能',
            desc: '专业的解决方案，帮助提高企业的效率，减少企业的用工风险',
            stateList: [
              {name: '企业初始化设置', state: false},
              {name: '公休日设置', state: false}
            ]
          }
        ]
      }
    },
    computed: {

    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '菜单设置', path: '/setting'}])
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
