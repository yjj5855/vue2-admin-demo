<template>
  <div class="user-list">
    <div style="margin: 30px 0;background: #fff;">

      <el-form :inline="true" class="form-inline">

        <el-form-item label="部门">
          <el-select  placeholder="请选择">
            <el-option label="部门一" value="1"></el-option>
            <el-option label="部门二" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input  placeholder="请填写" style="width: 194px;"></el-input>
        </el-form-item>

        <el-form-item label="员工状态">
          <el-select  placeholder="请选择">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-button class="flex-button" type="primary" :plain="true" icon="fa-tag" style="width: 100%">标签</el-button>
        <el-button class="flex-button" type="primary" :plain="true" icon="search">搜索</el-button>
        <el-button class="flex-button" type="text" @click="showMore = !showMore">更多 <i class="el-icon-arrow-down" :style="{transition: 'transform .3s', transform: `rotate(${showMore?180:0}deg)`}"></i></el-button>
        <el-button class="flex-button" type="primary">查询</el-button>

      </el-form>

      <el-form :inline="true" class="form-inline" v-show="showMore">

        <el-form-item label="性别">
          <el-select  placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职务">
          <el-select  placeholder="请选择">
            <el-option label="销售" value="1"></el-option>
            <el-option label="运营" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="在职状态">
          <el-select  placeholder="请选择">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="2"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <!--<el-row type="flex" align="middle" justify="space-between">-->
        <!--<el-row type="flex" align="middle" style="margin-bottom: 10px;">-->
          <!--<el-button @click="open4" :plain="true" type="success" icon="view">筛选</el-button>-->
          <!--&nbsp;-->
          <!--<el-input-->
            <!--placeholder="输入姓名按回车键检索"-->
            <!--icon="search"-->
            <!--v-model="userBase.paramsData['search[value]']"-->
            <!--@keyup.enter.native="handleIconClick"-->
            <!--:on-icon-click="handleIconClick">-->
            <!--<template slot="input">.com</template>-->
          <!--</el-input>-->
        <!--</el-row>-->
      <!--</el-row>-->

      <div class="white-space"></div>

      <!--表格-->
      <el-table
        v-loading="userBase.loading"
        element-loading-text="拼命加载中"
        :data="userBase.respData.list"
        border
        style="width: 100%;margin-bottom: 10px;">
        <el-table-column
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <el-button @click="handleClick" type="success" size="small" icon="view">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="white-space"></div>

      <el-row type="flex" align="middle" justify="space-between">
        <el-col style="flex:1">
          <el-button type="info">新增员工</el-button>
          <el-button type="success">员工信息导入</el-button>
          <el-button type="success">导出当前结果</el-button>
        </el-col>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userBase.paramsData.currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="userBase.paramsData.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="userBase.respData.total">
        </el-pagination>
      </el-row>
    </div>

    <choose-box
      ref="chooseBox"
      :choose-list="['BM', 'YG_STATUS']"
      @confirm="chooseEnd">
    </choose-box>
  </div>
</template>
<style scoped>
  .form-inline{
    display: flex;
    align-content: center;
  }
  .flex-button{
    flex: 1;
    height: 37px;
  }
</style>
<script>
  import * as mutations from 'store/user/mutation-types'
  import ChooseBox from 'components/choose-box.vue'

  function ajax (store, params) {
    return store.dispatch('FETCH_LIST_DATA', {
      ...store.state.user.base.paramsData,
      ...params
    })
  }

  export default{
    components: {
      ChooseBox
    },
    data () {
      return {
        flag: false,
        visible: false,
        pathList: [],

        showMore: false
      }
    },
    computed: {
      userBase () {
        return this.$store.state.user.base
      }
    },
    created () {
      ajax(this.$store)
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '人员信息', path: '/user'}, {name: '花名册', path: '/user/base'}])
    },
    methods: {
      handleClick () {
        this.$router.push('/user/base/1')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        if (this.userBase.paramsData.currentPage * val > this.userBase.respData.total) {
          this.$store.commit(mutations.UPDATE_BASE, {
            paramsData: {
              ...this.$store.state.user.base.paramsData,
              pageSize: val
            }
          })
        } else {
          ajax(this.$store, { pageSize: val })
        }
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.flag = true
        ajax(this.$store, { currentPage: val })
      },
      open4 () {
        this.$refs.chooseBox.showBox()
      },
      chooseEnd (data) {
        ajax(this.$store, { ...data })
      },
      handleIconClick (ev) {
        ajax(this.$store)
      }
    }
  }
</script>
