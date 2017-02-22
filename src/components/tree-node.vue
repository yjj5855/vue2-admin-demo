<template>
  <!-- [解析]
  [:draggable="{Boolean}"] 空节点不能被拖动，判断依据是是否存在 node.name
  [@dragover.prevent] 必须设置，否则浏览器默认是禁用拖动的 -->
  <div class="tree-node" :class="{ 'empty-node': !node.name }"
       :draggable="!!node.name"
       @dragover.prevent
       @dragstart.stop="handleDragStart"
       @drop.stop="handleDrop"
       @dragenter.stop="handleDragEnter"
       @dragleave.stop="handleDragLeave"
       @dragend.prevent="handleDragEnd">
    <div class="tree-node-name" :class="{ 'has-name': node.name }">
      <span @click.stop.parent="hideChildren = !hideChildren">
        <span v-if="node.name && node.children && node.children.length > 0" class="el-tree-node__expand-icon" :class="{ expanded: !hideChildren }"></span>
        <span class="el-tree-node__label">{{ node.name }}</span>
      </span>
      <span class="tree-node-action" v-if="node.name">
        <el-button-group>
          <el-button type="primary" size="mini" icon="plus" @click="showDialog('add')"></el-button>
          <el-button type="primary" size="mini" icon="edit" @click="showDialog('edit')"></el-button>
          <el-button type="primary" size="mini" icon="delete" @click="showDialog('delete')"></el-button>
        </el-button-group>
      </span>
    </div>
    <div class="tree-node-children">
      <tree-node v-for="(child, $index) in children" v-show="!hideChildren"
                 v-model="valueModel" :node="child" :idx="$index">
      </tree-node>
    </div>
  </div>
</template>
<style scoped>
  .tree-node { /* 普通节点 */
    /*display: list-item;*/
    /*list-style: none;*/
    /*border-left: 1px dashed #ccc;*/
  }
  .tree-node.empty-node { /* 空节点 */
    height: 8px;
    list-style-type: none;
  }
  .tree-node-children { /* 层次缩进 */
    margin-left: 1.5em;
  }
  .tree-node-name .tree-node-action{
    margin-left: 15px;
    font-size: 14px;
    display: none;
  }
  .tree-node-name.has-name{
    min-height: 22px;
    line-height: 22px;
  }
  .tree-node-name.has-name:hover{
    background: #eee;
  }
  .tree-node-name:hover .tree-node-action{
    display: inline-block;
    height: 14px;
  }
  .el-tree-node__label{
    margin-left: 5px;
  }
</style>
<script>
  import Vue from 'vue'
  
  export default {
    name: 'tree-node', // 递归组件需指明 name
    props: {
      value: Object, // 正在拖动的节点实例（TreeNode 组件通用，须双向绑定）
      node: Object, // 节点数据，形如 { name: 'xxx', children: [] }
      idx: Number // v-for 的索引，用于相邻节点的判别
    },
    data: function () {
      return {
        hideChildren: false,
        unwatchRootNode: () => {}
      }
    },
    created () {
      if (typeof this.idx === 'undefined') {
        this.unwatchRootNode = this.$watch('node', val => { this.$emit('on-node-change', val) }, { deep: true })
      }
    },
    beforeDestroy () {
      if (typeof this.idx === 'undefined') {
        this.unwatchRootNode()
      }
    },
    computed: {
      valueModel: {
        get: function () {
          return this.value
        },
        set: function (val) {
          this.$emit('input', val)
        }
      },
      children () { // 为每个子节点前后都生成空节点，便于实现兄弟节点间的“插入排序”
        // 举例：原本是 [N1, N2, N3]
        let { children } = this.node
        if (!children || !children.length) return []

        let _children = []
        children.forEach(child => _children.push({}, child))
        _children.push({})

        // 最后生成 [E1, N1, E2, N2, E3, N3, E4]（其中 N 表示节点，E 表示空节点）
        return _children
      },
      isParent () { // 拖放限制 1：判断“我”是否为被拖动节点的父节点
        return this === (this.value && this.value.$parent)
      },
      isNextToMe () { // 拖放限制 2：判断“我”是否为被拖动节点的相邻节点
        return this.$parent === this.value && this.value.$parent && Math.abs(this.idx - this.value.idx) === 1
      },
      isMeOrMyAncestor () { // 拖放限制 3：判断被拖动节点是否为“我”自身或“我”的祖先
        var p = this
        while (p) {
          if (this.value === p) return true
          p = p.$parent
        }
      },
      isAllowToDrop () { // 上述拖放限制条件的综合
        return !(this.isParent || this.isNextToMe || this.isMeOrMyAncestor)
      }
    },
    methods: {
      clearBgColor () { // 清理样式
        this.$el.style.backgroundColor = ''
      },
      handleDragStart () {
        this.valueModel = this // 设置本组件为当前正在拖动的实例，此举将同步 sync 到所有 TreeNode 实例
        this.$el.style.backgroundColor = 'silver'
      },
      handleDrop () {
        this.clearBgColor() // 此时 this 为目的地节点，vm 才是被拖动节点
        if (!this.isAllowToDrop) return

        // 无论如何都直接删除被拖动节点
        let index = this.value.$parent.node.children.indexOf(this.value.node)
        this.value.$parent.node.children.splice(index, 1)

        // 情况 1：拖入空节点，成其兄弟（使用 splice 插入节点）
        if (!this.node.name) {
          return this.$parent.node.children.splice(this.idx / 2, 0, this.value.node)
        }

        // 情况2：拖入普通节点，成为其子
        if (!this.node.children) Vue.set(this.node, 'children', []) // 须用 $set 引入双向绑定
        this.node.children.push(this.value.node)
      },
      handleDragEnter () { // 允许拖放才会显示样式
        if (!this.isAllowToDrop) return
        this.$el.style.backgroundColor = 'yellow'
      },
      handleDragLeave () {
        this.clearBgColor()
      },
      handleDragEnd () {
        this.clearBgColor()
      },

      showDialog (type, node) {
        switch (type) {
          case 'add':
            this.$prompt(`请输入部门名称`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(({ value }) => {
              if (!this.node.children) Vue.set(this.node, 'children', []) // 须用 $set 引入双向绑定
              this.node.children.push({name: value})
              this.$message({
                type: 'success',
                message: `新增了部门【${value}】`
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              })
            })
            break
          case 'edit':
            let oldName = this.node.name
            this.$prompt(`请输入部门【${oldName}】的新名称`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(({ value }) => {
              this.node.name = value
              this.$message({
                type: 'success',
                message: `部门【${oldName}】改为了: 【${value}】`
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              })
            })
            break
          case 'delete':
            this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let index = this.$parent.node.children.indexOf(this.node)
              this.$parent.node.children.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
            break
        }
      }
    }
  }
</script>