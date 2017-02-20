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
    <div class="tree-node-name">
      {{ node.name }}&emsp;
      <span class="tree-node-action" v-if="node.name">操作按钮</span>
    </div>
    <div class="tree-node-children">
      <tree-node v-for="(child, $index) in children"
                 :vm="myVm" @on-myVm-change="setMyVm" :node="child" :idx="$index">
      </tree-node>
    </div>
  </div>
</template>
<style scoped>
  .tree-node { /* 普通节点 */
    display: list-item;
    list-style: none;
    border-left: 1px dashed gray;
  }
  .tree-node.empty-node { /* 空节点 */
    height: .5em;
    list-style-type: none;
  }
  .tree-node-children { /* 层次缩进 */
    margin-left: 2em;
  }
  .tree-node-name .tree-node-action{
    display: none;
  }
  .tree-node-name:hover .tree-node-action{
    display: inline-block;
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    name: 'tree-node', // 递归组件需指明 name
    props: {
      vm: Object, // 正在拖动的节点实例（TreeNode 组件通用，须双向绑定）
      node: Object, // 节点数据，形如 { name: 'xxx', children: [] }
      idx: Number // v-for 的索引，用于相邻节点的判别
    },
    data: function () {
      return {
        myVm: this.vm
      }
    },
    watch: {
      vm (val) {
        this.myVm = val // 新增result的watch，监听变更并同步到myResult上
      },
      myVm (val, oldVal) {
        this.$emit('on-myVm-change', val) // ③组件内对myResult变更后向外部发送事件通知
      }
    },
    computed: {
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
        return this === (this.myVm && this.myVm.$parent)
      },
      isNextToMe () { // 拖放限制 2：判断“我”是否为被拖动节点的相邻节点
        return this.$parent === this.myVm && this.myVm.$parent && Math.abs(this.idx - this.myVm.idx) === 1
      },
      isMeOrMyAncestor () { // 拖放限制 3：判断被拖动节点是否为“我”自身或“我”的祖先
        var p = this
        while (p) {
          if (this.myVm === p) return true
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
        this.myVm = this // 设置本组件为当前正在拖动的实例，此举将同步 sync 到所有 TreeNode 实例
        this.$el.style.backgroundColor = 'silver'
      },
      handleDrop () {
        this.clearBgColor() // 此时 this 为目的地节点，vm 才是被拖动节点
        if (!this.isAllowToDrop) return

        // 无论如何都直接删除被拖动节点
        let index = this.myVm.$parent.node.children.indexOf(this.myVm.node)
        this.myVm.$parent.node.children.splice(index, 1)

        // 情况 1：拖入空节点，成其兄弟（使用 splice 插入节点）
        if (!this.node.name) {
          return this.$parent.node.children.splice(this.idx / 2, 0, this.myVm.node)
        }

        // 情况2：拖入普通节点，成为其子
        if (!this.node.children) Vue.set(this.node, 'children', []) // 须用 $set 引入双向绑定
        this.node.children.push(this.myVm.node)
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
      setMyVm (val) {
        this.myVm = val
      }
    }
  }
</script>