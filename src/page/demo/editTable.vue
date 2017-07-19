<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
    >

      <el-table-column class-name="table-column-edit" :label="item" v-for="(item, index) in tableColumns" width="150px" align="center">
        <template scope="scope">
          <div class="table-item">
            <div class="table-item--disabled" v-if="scope.row.columns[index].disabled" v-text="scope.row.columns[index].value"></div>

            <el-input
              v-else
              class="table-item--input"
              v-model="scope.row.columns[index].value"
              @blur="onInputBlur(scope.row, index)"
              @dblclick.native="onInputDbclick(scope.row, index)"
              :disabled="!scope.row.columns[index].editStatus"
            ></el-input>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @table-item-height: 100px;
  .table-column-edit .cell{
    padding: 0;
  }
  .table-item {
    height: @table-item-height;
    line-height: @table-item-height;
    text-align: center;
  }
  .table-item--input {
    width: 100%;
    height: @table-item-height;
    line-height: @table-item-height;
    text-align: center;

    .el-input__inner {
      height: @table-item-height;
      text-align: center;
      border-radius: 0;
    }

    &.is-disabled {
      .el-input__inner {
        background-color: #fff;
        border-color: #fff;
        color: inherit;
        cursor: pointer;
      }
    }
  }
  .table-item--disabled {
    background-color: #e4e4e4;
  }
</style>
<script>
  export default{
    components: {},
    data () {
      return {
        tableData: [
          {
            uuid: 1,
            emplUuid: 'EFWWEJFJ234',

            columns: [
              {name: '姓名', disabled: true, value: '张三', editStatus: false},
              {name: '部门', disabled: false, value: 1.0, editStatus: false},
              {name: '工资', disabled: true, value: 0, editStatus: false}
            ]
          },
          {
            uuid: 2,
            emplUuid: 'WE32I4J23RJ23R',

            columns: [
              {name: '姓名', disabled: true, value: '李四', editStatus: false},
              {name: '部门', disabled: false, value: 2.0, editStatus: false},
              {name: '工资', disabled: true, value: 0, editStatus: false}
            ]
          }
        ],
        loading: false

      }
    },
    computed: {
      tableColumns () {
        return this.tableData[0].columns.map(item => item.name)
      }
    },
    created () {

    },
    mounted () {

    },
    methods: {
      onInputDbclick (row, index) {
        if (row.columns[index].editStatus) {
          return
        }
        console.log('onInputDbclick')
        row.columns[index].editStatus = !row.columns[index].editStatus
      },
      onInputBlur (row, index) {
        console.log(row, row.columns[index].value)

        row.columns[index].editStatus = false
//        this.loading = true
        setTimeout(() => {
          let rowIndex = this.tableData.findIndex(item => item.uuid === row.uuid)

          this.$set(this.tableData, rowIndex, {
            uuid: 1,
            emplUuid: 'EFWWEJFJ234',

            columns: [
              {name: '姓名', disabled: true, value: '张三', editStatus: false},
              {name: '部门', disabled: false, value: row.columns[index].value, editStatus: false},
              {name: '工资', disabled: true, value: row.columns[index].value * row.columns[index].value, editStatus: false}
            ]
          })
          this.loading = false
        }, 1000)
      }
    }
  }
</script>
