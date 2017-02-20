<template>
  <div>
    <tree-node :vm="vm" :node="treeData"></tree-node>
  </div>
</template>
<style>

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
        }
      }
    },
    components: {
      TreeNode
    },
    methods: {

    }
  }
</script>