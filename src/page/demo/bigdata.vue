<!--大数据导入-->

<template>
  <div class="big-data">

    <el-row type="flex" align="middle" justify="space-between">
      <el-col style="flex:1">
        <el-button @click="va">验证数据</el-button>
      </el-col>

      <div class="el-pagination" style="margin: 20px 10px">
        <ul class="el-pager">
          <li class="number"
              v-for="item in totalPage"
              :class="{active: item == listData.currentPage}"
              @click="handleCurrentChange(item)">
            <el-badge :value="errorCountList[item-1]">
              <span>第{{item}}页</span>
            </el-badge>
          </li>
        </ul>
      </div>
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="listData.currentPage"-->
        <!--:page-size="listData.pageSize"-->
        <!--layout="prev, pager, next"-->
        <!--:total="listData.total">-->
      <!--</el-pagination>-->
    </el-row>

    <el-table
      class="no-left-right-border"
      style="width: 100%;margin-bottom: 10px;"
      element-loading-text="拼命加载中"
      :data="tableData"
      :row-class-name="tableRowClassName">

      <el-table-column
        v-for="(item,index) in keyList" :key="index"
        width="150"
        :prop="item.key"
        :label="item.label">
        <template scope="scope">
          {{ scope.row[item.key] }}
          <i class="el-icon-circle-check" v-if="tableErrorData[scope.$index] && tableErrorData[scope.$index][item.key] == true"></i>
          <i class="el-icon-circle-cross" v-else></i>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button type="text" size="small" @click="editRow(scope)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .big-data{
    .el-icon-circle-check{
      color: green
    }
    .el-icon-circle-cross{
      color: red
    }
    .error-row {
      background: #ffc0c0;
    }
  }
</style>
<script>
  // 正则表
  const regList = {
    ImgCode: /^[0-9a-zA-Z]{4}$/,
    SmsCode: /^\d{4}$/,
    MailCode: /^\d{4}$/,
    UserName: /^[\w|\d]{4,16}$/,
    Password: /^[\w!@#$%^&*.]{6,16}$/,
    Mobile: /^1[3|5|8]\d{9}$/,
    RealName: /^[\u4e00-\u9fa5 ]{2,10}$/,
    BankNum: /^\d{10,19}$/,
    Money: /^([1-9]\d*|0)$/,
    Answer: /^\S+$/,
    Mail: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,

    // 字段一样
    age: /^([1-9]\d*|0)$/,
    email: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    avatar: /^([1-9]\d*|0)$/,
    birthday: /^([1-9]\d*|0)$/,
    depaUuid: /^([1-9]\d*|0)$/,
    exigAddress: /^([1-9]\d*|0)$/,
    exigPerson: /^([1-9]\d*|0)$/,
    exigTel: /^([1-9]\d*|0)$/,
    exteNumber: /^([1-9]\d*|0)$/,
    idNumber: /^([1-9]\d*|0)$/,
    idType: /^([1-9]\d*|0)$/,
    improvePersonInfoFlag: /^([1-9]\d*|0)$/,
    inDate: /^([1-9]\d*|0)$/,
    mariStatus: /^([1-9]\d*|0)$/,
    mobile: /^1[3|5|8]\d{9}$/,
    name: /^[\u4e00-\u9fa5 ]{2,10}$/,
    sex: /^[\w|\d]{4,16}$/,
    showName: /^[\w|\d]{4,16}$/,
    spelling: /^([1-9]\d*|0)$/,
    statusForJsp: /^([1-9]\d*|0)$/,
    uuid: /^([1-9]\d*|0)$/,
    workAge: /^([1-9]\d*|0)$/,
    workScheType: /^([1-9]\d*|0)$/
  }

  export default{
    components: {

    },
    data () {
      return {
        height: '100',
        keyList: [
          {key: 'uuid', label: '工号'},
          {key: 'age', label: '年龄'},
          {key: 'birthday', label: '生日'},
          {key: 'depaUuid', label: '部门'},
          {key: 'email', label: '邮箱'},
          {key: 'idNumber', label: '身份证'},
          {key: 'inDate', label: '入职时间'},
          {key: 'mobile', label: '手机号'},
          {key: 'name', label: '姓名'},
          {key: 'mariStatus', label: '婚姻状况'},
          {key: 'sex', label: '性别'},
          {key: 'showName', label: '昵称'},
          {key: 'statusForJsp', label: '入职状态'},
          {key: 'workAge', label: '工作年限'},
          {key: 'workScheType', label: '考勤方式'},
          {key: 'exigPerson', label: '紧急联系人'},
          {key: 'exigTel', label: '紧急联系人电话'},
          {key: 'exigAddress', label: '紧急联系人地址'}
        ],
        listData: {
          currentPage: 1,
          pageSize: 100,
          total: 1000,

          list: []
        },
        errorList: []
      }
    },
    computed: {
      tableData () {
        return this.listData.list.slice((this.listData.currentPage - 1) * this.listData.pageSize, this.listData.currentPage * this.listData.pageSize)
      },
      tableErrorData () {
        return this.errorList.slice((this.listData.currentPage - 1) * this.listData.pageSize, this.listData.currentPage * this.listData.pageSize)
      },
      totalPage () {
        let yu = this.listData.total % this.listData.pageSize
        let chu = this.listData.total / this.listData.pageSize
        return yu > 0 ? chu + 1 : chu
      },
      errorCountList () {
        let countList = new Array(this.totalPage).fill(0)
        this.errorList.map((item, index) => {
          for (let key in item) {
            // 验证没通过
            if (item[key] === false) {
              countList[parseInt(index / this.listData.pageSize)]++
            }
          }
        })
        return countList
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: 'demo', path: '/demo'}, {name: '大数据导入', path: '/bigdata'}])
    },
    mounted () {
      this.$set(this.listData, 'list', new Array(1000).fill({
        age: 27,
        avatar: null,
        birthday: '1990-02-13',
        depaUuid: '运营部',
        email: '651380735@qq.com',
        exigAddress: null,
        exigPerson: null,
        exigTel: null,
        exteNumber: '',
        idNumber: '100016',
        idType: '2',
        improvePersonInfoFlag: false,
        inDate: '2015-02-28',
        mariStatus: null,
        mobile: '13100000016',
        name: 'aa',
        sex: '女',
        showName: 'aa',
        spelling: 'aa',
        statusForJsp: '正式',
        uuid: '',
        workAge: 2,
        workScheType: '常规考勤'
      }).map((item, index) => {
        return {
          ...item,
          uuid: 'uuid' + index
        }
      }))
      this.$set(this, 'errorList', new Array(this.totalPage).fill(0))
      this.$nextTick(() => {
        this.va()
      })
    },
    methods: {
      handleCurrentChange (val) {
        this.listData.currentPage = val
      },
      va () {
        let startTime = new Date().getTime()
        // 循环验证大数据
        let errList = this.listData.list.map((item, index) => {
          let err = {}
          for (let key in item) {
            if (regList[key].test(item[key])) {
              err[key] = true
            } else {
              err[key] = false
            }
          }
          return err
        })
        this.$set(this, 'errorList', errList)
        this.$nextTick(() => {
          this.$message.success('验证用时' + (new Date().getTime() - startTime) + '毫秒')
        })
      },
      vaRow (item, index) {
        let startTime = new Date().getTime()
        let error = {}
        for (let key in item) {
          if (regList[key].test(item[key])) {
            error[key] = true
          } else {
            error[key] = false
          }
        }
        this.$set(this.errorList, index, error)
        this.$nextTick(() => {
          this.$message.success('验证用时' + (new Date().getTime() - startTime) + '毫秒')
        })
      },
      tableRowClassName (row, index) {
        for (let key in this.tableErrorData[index]) {
          if (this.tableErrorData[index][key] === false) {
            return 'error-row'
          }
        }
        return ''
      },
      editRow (scope) {
        try {
          let listItem = this.listData.list[(this.listData.currentPage - 1) * this.listData.pageSize + scope.$index]
          listItem = {
            age: 27,
            avatar: 2,
            birthday: 2,
            depaUuid: 2,
            email: '651380735@qq.com',
            exigAddress: 2,
            exigPerson: 2,
            exigTel: 2,
            exteNumber: 2,
            idNumber: '100016',
            idType: '2',
            improvePersonInfoFlag: 2,
            inDate: 2,
            mariStatus: 2,
            mobile: '13100000016',
            name: '我',
            sex: '女',
            showName: '我',
            spelling: '我',
            statusForJsp: '正式',
            uuid: (this.listData.currentPage - 1) * this.listData.pageSize + scope.$index,
            workAge: 2,
            workScheType: '常规考勤'
          }
          let index = (this.listData.currentPage - 1) * this.listData.pageSize + scope.$index
          this.$set(this.listData.list, index, listItem)
          this.vaRow(listItem, index)
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

</script>
