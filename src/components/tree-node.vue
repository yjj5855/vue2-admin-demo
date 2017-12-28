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
    <div class="tree-node-name" :style="{'padding-left': level * 16 + 'px'}" :class="{ 'has-name': node.name, ['idx_'+idx]: true }">
      <div @click="emitEvent('nodeRow')">
        <span v-if="node.name && idx >= 0" class="el-icon-iconfont-paixu"></span>
        <span @click.parent="emitEvent('nodeName')">
          <span class="el-tree-node__label">{{ node.name }}</span>
          <i v-if="node.name && node.children && node.children.length > 0" :class="{'el-icon-arrow-down': hideChildren, 'el-icon-arrow-up': !hideChildren }"></i>
        </span>
        <span class="tree-node-action" v-if="node.name">
          <i class="el-icon-plus" @click="emitEvent('add')"></i>
          <i class="el-icon-fa-copy" @click="emitEvent('copy')" v-if="idx !== undefined"></i>
          <i class="el-icon-delete" @click="emitEvent('delete')" v-if="idx !== undefined"></i>
        </span>
      </div>
    </div>
    <div class="tree-node-children">
      <tree-node
        v-show="!hideChildren"
        v-for="(child, $index) in children"
        v-model="valueModel" :node="child" :idx="$index" :level="level+1">
      </tree-node>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../var";
  .tree-node { /* 普通节点 */
    /*display: list-item;*/
    /*list-style: none;*/
    /*border-left: 1px dashed #ccc;*/
  }
  .tree-node.empty-node { /* 空节点 */
    height: 5px;
    list-style-type: none;
  }
  .tree-node-children { /* 层次缩进 */
    /*margin-left: 1.5em;*/

  }
  .tree-node-name.has-name{
    min-height: 22px;
    line-height: 22px;
    position: relative;

    &.idx_undefined{
      background: transparent!important;
      color: @color-primary!important;

      .tree-node-action{
        display: inline-block!important;
        height: 14px!important;
      }
    }

    .tree-node-action{
      margin-left: 15px;
      font-size: 14px;
      display: none;

      i{
        cursor: pointer;
        color: @color-primary;
        margin-right: 15px;

        &.el-icon-iconfont-tianjia{
          font-size: 16px!important;
        }
      }
    }
    .el-icon-iconfont-paixu{
      cursor: move;
      visibility: hidden;
      font-size: 12px;
      color: @color-primary;
    }

    &:hover{
      background: rgba(26, 179, 148, .1);
      color: @color-primary;
      box-shadow: 0 2px 10px -2px rgba(26, 179, 148, 0.3);

      .tree-node-action{
        display: inline-block;
        height: 14px;
      }
      .el-icon-iconfont-paixu{
        visibility: visible;
      }
    }
    .el-tree-node__label{
      margin-left: 5px;
      line-height: 34px;
    }
  }

  .el-icon-arrow-down,.el-icon-arrow-up{
    line-height: 34px;
    &:before{
      font-size: 12px!important;
      color: @color-extra-light-black;
    }
  }
</style>
<script>
  import Vue from 'vue'

  export default {
    name: 'tree-node', // 递归组件需指明 name
    props: {
      value: Object, // 正在拖动的节点实例（TreeNode 组件通用，须双向绑定）
      node: Object, // 节点数据，形如 { name: 'xxx', children: [] }
      idx: Number, // v-for 的索引，用于相邻节点的判别
      level: {
        type: Number,
        default: 0
      } // 层级
    },
    data: function () {
      return {
        hideChildren: false,
        unwatchRootNode: () => {}
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
      handleDragStart (ev) {
        this.valueModel = this // 设置本组件为当前正在拖动的实例，此举将同步 sync 到所有 TreeNode 实例
        this.$el.style.backgroundColor = 'silver'
        ev.dataTransfer.effectAllowed = 'move'
      },
      handleDrop () {
        this.clearBgColor() // 此时 this 为目的地节点，vm 才是被拖动节点
        if (!this.isAllowToDrop) return

        // 无论如何都直接删除被拖动节点
        let index = this.value.$parent.node.children.indexOf(this.value.node)
        this.value.$parent.node.children.splice(index, 1)

        let dropNode = null
//        console.log('正在拖动的节点' + this.value.node.name)
        // 情况 1：拖入空节点，成其兄弟（使用 splice 插入节点）
        if (!this.node.name) {
//          console.log('拖入了空节点， ')
          // TODO 获取上一个节点
//          console.log(this.idx / 2)
          if (this.idx / 2 === 0) {
            dropNode = this.$parent.node
          } else {
            dropNode = this.$parent.node.children[this.idx / 2 - 1]
          }

          // 插入节点
          this.$parent.node.children.splice(this.idx / 2, 0, this.value.node)

          if (typeof this.idx === 'undefined') {
            this.$emit('on-node-change', this.node)
            this.$emit('on-change', { dragNode: this.value.node, dropNode: dropNode })
          } else {
            this.$parent && this.$parent.onDragEnd({ dragNode: this.value.node, dropNode: dropNode })
          }
          return
        }

        // 情况2：拖入普通节点，成为其子
        if (!this.node.children || this.node.children.length === 0) {
          Vue.set(this.node, 'children', []) // 须用 $set 引入双向绑定
          dropNode = this.node
//          console.log('拖入了没有子节点的节点' + this.node.name)
        } else {
          dropNode = this.node.children[this.node.children.length - 1]
//          console.log('拖入了有子节点的节点, 最后一个子节点为' + this.node.children[this.node.children.length - 1].name)
        }
        this.node.children.push(this.value.node)

        if (typeof this.idx === 'undefined') {
          this.$emit('on-node-change', this.node)
        } else {
          this.$parent && this.$parent.onDragEnd({ dragNode: this.value.node, dropNode: dropNode })
        }
      },
      handleDragEnter () { // 允许拖放才会显示样式
        if (!this.isAllowToDrop) return
        this.$el.style.backgroundColor = 'rgba(26, 179, 148, 0.1)'
      },
      handleDragLeave () {
        this.clearBgColor()
      },
      handleDragEnd () {
        this.clearBgColor()
      },
      onDragEnd (changeInfo) {
        if (typeof this.idx === 'undefined') {
          this.$emit('on-node-change', this.node)
          this.$emit('on-change', changeInfo)
        } else {
          this.$parent && this.$parent.onDragEnd(changeInfo)
        }
      },
      onAddBtnClick (data) {
        if (typeof this.idx === 'undefined') {
          this.$emit('on-add-btn-click', data)
        } else {
          this.$parent && this.$parent.onAddBtnClick(data)
        }
      },
      onEditBtnClick (data) {
        if (typeof this.idx === 'undefined') {
          this.$emit('on-edit-btn-click', data)
        } else {
          this.$parent && this.$parent.onEditBtnClick(data)
        }
      },
      onCopyBtnClick (data) {
        if (typeof this.idx === 'undefined') {
          this.$emit('on-copy-btn-click', data)
        } else {
          this.$parent && this.$parent.onCopyBtnClick(data)
        }
      },
      onDelBtnClick (data) {
        if (typeof this.idx === 'undefined') {
          this.$emit('on-del-btn-click', data)
        } else {
          this.$parent && this.$parent.onDelBtnClick(data)
        }
      },
      onNodeNameClick (data) {
        if (typeof this.idx === 'undefined') {
          this.$emit('on-node-name-click', data)
        } else {
          this.$parent && this.$parent.onNodeNameClick(data)
        }
      },
      onNodeRowClick (data) {
        if (typeof this.idx === 'undefined') {
          this.$emit('on-node-row-click', data)
        } else {
          this.$parent && this.$parent.onNodeRowClick(data)
        }
      },
      emitEvent (type, node) {
        switch (type) {
          case 'add':
            this.onAddBtnClick(this.node)
            break
          case 'edit':
            this.onEditBtnClick(this.node)
            break
          case 'copy':
            this.onCopyBtnClick(this.node)
            break
          case 'delete':
            this.onDelBtnClick(this.node)
            break
          case 'nodeRow':
            this.onNodeRowClick(this.node)
            break
          case 'nodeName':
            this.hideChildren = !this.hideChildren
            this.onNodeNameClick(this.node)
            break
        }
      }
    }
  }
</script>
