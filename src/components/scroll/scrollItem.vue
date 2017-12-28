<template>
  <div ref="dom" style="min-height: 64px;">
    itemIndex:{{itemIndex}}
  </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script>
  export default {
    components: {},
    props: {
      item: [Object, Number],
      index: Number
    },
    data () {
      return {
        itemIndex: null
      }
    },
    computed: {},
    created () {
      this.parent = this.$parent
      this.itemIndex = this.$parent.projector.startIndex + this.index
    },
    mounted () {
      this.setCache()
    },
    methods: {
      setCache () {
        const itemIndex = this.itemIndex

        const projector = this.parent.projector
        const cachedItemRect = projector.cachedItemRect
        const curItem = cachedItemRect[itemIndex]
        const prevItem = cachedItemRect[itemIndex - 1]

        // 需要调整啥事都不用干(不过还是走到if的分支去了)，这个时候的填充高度不准(待优化)。等新的填充高度计算出来再更新缓存
        // 更新已存在的缓存有2种情况
        // 1、window.resize
        // 2、一次性滑动过多，纠正填充高度之后需要纠正之后的缓存
        if (projector.needAdjustment) {
          const rect = this.$refs.dom.getBoundingClientRect()
          if (itemIndex === projector.startIndex) {
            const bottom = this.$parent.upperPlaceholderHeight + rect.height
            const top = this.$parent.upperPlaceholderHeight
            cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: true }
          } else {
            const bottom = prevItem.bottom + rect.height
            const top = prevItem.bottom
            cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: true }
          }
          if (projector.isAdjusting && this.index === this.$parent.projectedItems.length - 1) {
            projector.needAdjustment = false
            projector.isAdjusting = false
          }
        } else {
          if (curItem && curItem.needAdjustment === false) return
          // if (!curItem) {
          const rect = this.$refs.dom.getBoundingClientRect()
          if (prevItem) {
            // 当前item不存在但是前一个存在
            const bottom = prevItem.bottom + rect.height
            const top = prevItem.bottom
            cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: false }
          } else {
            // 当前 item 不存在，且前一个也不存在
            const bottom = this.$parent.upperPlaceholderHeight + rect.height
            const top = this.$parent.upperPlaceholderHeight
            cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: false }
          }
        }
      }
    }
  }
</script>
