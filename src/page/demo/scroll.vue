<template>
  <div style="width: 300px;">
    <scroll containerHeight="636px" :itemAverageHeight="44" :cache="cache" :items="items" identity="id" :onEnd="getMore">

    </scroll>
  </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script>
  import Scroll from '../../components/scroll/scroll'
  export default {
    components: {
      Scroll
    },
    data () {
      return {
        id: 0,
        items: [],
        cache: []
      }
    },
    computed: {

    },
    created () {
    },
    mounted () {
      setTimeout(() => {
        this.items = new Array(50).fill({}).map(() => {
          return {id: this.id++}
        })
      }, 1000)
    },
    methods: {
      getMore () {
        this.items = this.items.concat(new Array(50).fill({}).map(() => {
          return {id: this.id++}
        }))
      }
    }
  }
</script>
