<template>
  <div id="c" ref="divDom" style="overflow: scroll;box-sizing: border-box;-webkit-overflow-scrolling: touch" :style="{height: containerHeight}">
    <div ref="upperContentDom" :style="{height: upperPlaceholderHeight+'px'}" ></div>
    <scroll-item
      v-for="(item, $index) in projectedItems"
      :key="identity ? item[identity] : $index"
      :item="item"
      :index="$index">
    </scroll-item>
    <div :style="{height: underPlaceholderHeight+'px'}"></div>
  </div>
</template>

<script>
  import ScrollItem from './scrollItem'
  import {Projector} from '../../libs/projector'
  export default {
    name: 'scroll',
    components: {
      ScrollItem
    },
    props: {
      initialScrollTop: {
        type: Number,
        default: 0
      },
      onScroll: {
        type: Function,
        default: function () {
          return () => {}
        }
      },
      onEnd: {
        type: Function,
        default: function () {
          return () => {}
        }
      },

      cache: Array, // 缓存对象
      containerHeight: String, // 容器高度
      itemAverageHeight: Number, // 平均高度
      className: String,
      items: Array, // 全部数据
      identity: String // 循环key
    },
    data: function () {
      return {
        upperPlaceholderHeight: 0,
        underPlaceholderHeight: 0,
        projectedItems: [],

        divDom: null,
        upperContentDom: null,
        hasBottomTouched: true,
        scrollTop: 0,
        projector: null,
        width: null,
        resizing: false,

        firstRender: true
      }
    },
    watch: {
      items: function (newValue) {
        if (newValue && newValue.length > 0) {
          console.log('watch items => next')
          this.hasBottomTouched = false
          this.projector.next(newValue)
        }
      }
    },
    updated () {
      // 稍微正确的写法
      if (!this.firstRender) {
        console.log('纠正缓冲区')
        // $nextTick 太快了 这里要慢一点
        setTimeout(() => {
          this.adjustUpperPlacehilderHieght()
        }, 30)
      } else {
        this.firstRender = false
      }
    },
    mounted () {
      this.divDom = this.$refs.divDom
      this.upperContentDom = this.$refs.upperContentDom
      this.width = this.divDom.clientWidth
      this.projector = new Projector(this.divDom, this.upperContentDom, this.items, this.itemAverageHeight, this.cache)

      this.projector.subscribe((projectedItems, upperPlaceholderHeight, underPlaceholderHeight) => {
        console.log('subscribe')
        console.log(projectedItems, upperPlaceholderHeight, underPlaceholderHeight)
        if (underPlaceholderHeight < this.divDom.clientHeight && !this.hasBottomTouched) {
          this.hasBottomTouched = true
          this.onEnd && this.onEnd()
        }
        const prevStateItemsLength = this.projectedItems.length

        this.projectedItems = projectedItems
        this.upperPlaceholderHeight = upperPlaceholderHeight
        this.underPlaceholderHeight = underPlaceholderHeight
        this.$nextTick(() => {
          if (prevStateItemsLength === 0 && projectedItems.length > 0) {
            this.divDom.scrollTop = this.initialScrollTop || 0
          }
        })
      })

      // 如果初始化的时候 items 不是空数组，则要通知投影仪渲染。异步的情况下，receiveProps 通知投影仪渲染
      if (this.items.length > 0) {
        this.hasBottomTouched = false
        this.projector.next()
      }

      window.addEventListener('resize', () => {
        if (this.divDom.clientWidth !== this.width) {
          console.log('window resize => next')
          this.width = this.divDom.clientWidth
          this.resizing = true
          this.projector.cachedItemRect.length = 0
          this.projector.next()
        }
      })

      this.divDom.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy () {
      this.divDom.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll () {
        const newScrollTop = this.divDom.scrollTop
        this.onScroll && this.onScroll(this.divDom)
        if (newScrollTop < this.scrollTop) {
          // 手往下滑,屏幕往上滑
          this.projector.down()
        } else {
          // 往上滑,屏幕往下滑
          this.projector.up()
        }
        this.scrollTop = newScrollTop
      },

      /**
       * 纠正缓冲区
       * 如果上方填充高度是猜测得来的，那加载之后的新的item是的top也是基于猜测得来的。
       * 如何知道上方是猜测得来的，可以看 needAdjust 是否为 true。
       * 第一次 next，填充高度不变，告诉之后需要调整。
       * 第一次 render，子节点发现需要调整，刷新自己的缓存。
       * 第一次 didupdate，发现需要调整，根据之前的高度减去滑过的item的高度(这些高度就是刚缓存进去的)
       * 第二次 render，子节点发现还是需要调整，根据刚刚拿到的正确的填充高度再刷新一次缓存。最后一个子节点把 needAdjustment 改成 false。
       * 第二次didupdate，不需要调整
       */
      adjustUpperPlacehilderHieght () {
        if (this.projector.needAdjustment) {
          const cachedItemRect = this.projector.cachedItemRect
          const anchor = this.projector.anchorItem
          const cachedAnchorItem = cachedItemRect[anchor.index]
          const startItem = this.projector.cachedItemRect[this.projector.startIndex]
          const finalHeight = this.projector.computeUpperPlaceholderHeight(cachedAnchorItem, startItem.top)
          const scrollTop = this.divDom.scrollTop
          const upperPlaceholderHeight = startItem.index === 0 ? 0 : finalHeight < 0 ? 0 : finalHeight

          this.upperPlaceholderHeight = upperPlaceholderHeight
          this.$nextTick(() => {
            if (startItem.index > 0) {
              if (finalHeight < 0) this.divDom.scrollTop = scrollTop - finalHeight
              if (this.resizing) {
                const currentAnchor = this.projector.cachedItemRect[this.projector.startIndex + 3]
                const anchorDelta = anchor.offset - currentAnchor.top
                const nextScrollTop = this.divDom.scrollTop - anchorDelta

                // 让滚动位置保持在描点中
                if (nextScrollTop < currentAnchor.top) {
                  this.divDom.scrollTop = currentAnchor.top
                } else if (nextScrollTop > currentAnchor.bottom) {
                  this.divDom.scrollTop = currentAnchor.bottom
                } else {
                  this.divDom.scrollTop = nextScrollTop
                }

                this.resizing = false
              }
            } else {
              this.divDom.scrollTop = scrollTop - finalHeight
            }
          })
        }
        this.projector.anchorItem.index = this.projector.startIndex + 3
        this.projector.anchorItem.offset = this.projector.cachedItemRect[this.projector.startIndex + 3].top
      }
    }
  }
</script>

<style scoped>

</style>
