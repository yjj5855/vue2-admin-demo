<template>
  <div class="user-detail">
    <el-row type="flex">
      <el-col style="flex: 1;">
        <el-row type="flex" align="middle" class="user-info">
          <img src="" class="user-avatar"/>
          <el-col style="flex: 1;">
            <div class="user-info__body">
              <div style="font-size: 14px;margin-bottom: 10px">
                <span>王小布</span><span>管理中心</span><span>COO</span><span>#05121</span>
              </div>
              <div style="font-size: 12px">
                <span>试用期</span><span>入职时间: 2017-01-01</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-dropdown>
            <el-button type="primary" :plain="true" class="btn-more-action">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <tag-edit/>

        </el-row>
      </el-col>
      <svg-circle style="height: 150px;width: 150px;"><div style="font-size: 13px;">资料完善度</div></svg-circle>
      <svg-circle style="height: 150px;width: 150px;"><div style="font-size: 13px;">本月出勤率</div></svg-circle>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="个人" name="tab_1">用户管理</el-tab-pane>
      <el-tab-pane label="工作" name="tab_2">配置管理</el-tab-pane>
      <el-tab-pane label="合同" name="tab_3">角色管理</el-tab-pane>
      <el-tab-pane label="社保" name="tab_4">定时任务补偿</el-tab-pane>
      <el-tab-pane label="公积金" name="tab_5">定时任务补偿</el-tab-pane>
      <el-tab-pane label="薪酬" name="tab_6">定时任务补偿</el-tab-pane>
      <el-tab-pane label="考勤" name="tab_7">定时任务补偿</el-tab-pane>
      <el-tab-pane label="附件" name="tab_8">定时任务补偿</el-tab-pane>
      <el-tab-pane label="360评价" name="tab_9">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="less">
  .user-detail{
    padding-top: 15px;
    .user-info{
      margin-bottom: 15px;

      .user-info__body{
        color: #999;

        span{
          margin-right: 30px;
        }
      }
    }
    .user-avatar{
      width: 85px;
      height: 85px;
      border-radius: 50%;
      margin-right: 30px;
    }
    .btn-more-action{
      width: 100px;
      margin-right: 15px;
    }
    .el-tabs__item{
      padding: 0 32px;
    }
  }
</style>
<script>
  import svgCircle from '../../components/svg-circle.vue'
  import tagEdit from '../../components/tag-edit.vue'

  export default{
    data () {
      return {
        activeName: 'tab_1'
      }
    },
    components: {
      svgCircle,
      tagEdit
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '人员信息', path: '/user'}, {name: '花名册', path: '/user/list'}, {name: '详情', path: '/user/1'}])
    },
    methods: {

    }
  }
</script>
