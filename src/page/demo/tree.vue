<template>
  <div class="banbu-tree" style="background: #fff">
    <el-row>
      <el-col :span="12">
        <tree-node
          v-model="vm"
          :node="treeData"
          @on-node-change="onNodeChange"
          @on-copy-btn-click="copyOrg"
          @on-add-btn-click="addOrg"
          @on-del-btn-click="delOrg"
        >
        </tree-node>
      </el-col>
      <el-col class="check-tree" :span="12">
        <el-tree
          :data="[treeData]"
          show-checkbox
          :default-expand-all="true"
          :props="defaultProps">
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .banbu-tree {

    .el-tree-node__content {
      .el-tree-node__expand-icon {
        border: transparent;
      }

      // label 右边加 箭头
      .el-tree-node__label{
        &:after{
          font-family: 'element-icons' !important;
          margin-left: 8px;
          content: "";
        }
      }
      .el-tree-node__expand-icon+.el-checkbox+.el-tree-node__label{
        &:after{
          content: "\E600";
        }
      }

      .el-tree-node__expand-icon.is-leaf+.el-checkbox+.el-tree-node__label{
        &:after{
          content: "";
        }
      }

      .el-tree-node__expand-icon.expanded+.el-checkbox+.el-tree-node__label{
        &:after{
          content: "\E603";
        }
      }
    }
  }
</style>
<script>
  import TreeNode from 'components/tree-node.vue'
  export default{
    data () {
      return {
        vm: null,
        treeData: {
          name: '公司',
          children: [
            { name: '管理部',
              children: [
                { name: '技术部' },
                { name: '客服中心',
                  children: [
                    { name: '行政部' }
                  ]
                },
                { name: '仓储部' },
                { name: '人事部',
                  children: [
                    { name: '人事助理',
                      children: [
                        { name: '出纳',
                          children: [
                            { name: '仓管员' }
                          ]
                        }
                      ]
                    },
                    { name: '财务部' }
                  ]
                }
              ]
            },
            {
              name: '总监会',
              children: [
                { name: '市场中心' }
              ]
            }
          ]
        },

        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    components: {
      TreeNode
    },
    methods: {
      onNodeChange (rootNode) {
        this.$set(this, 'treeData', JSON.parse(JSON.stringify(rootNode)))
      },
      copyOrg (node) {
        console.log('拷贝', node)
      },
      addOrg (node) {
        console.log('添加', node)
      },
      delOrg (node) {
        console.log('删除', node)
      }
    },
    created () {

    }
  }
</script>
