<template>
  <div class="bb-index">

  </div>
</template>
<style scoped>
  .bb-index{

  }
</style>
<script>
  export default{
    data () {
      return {
        show: true
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '首页', path: '/'}])
    },
    components: {

    },
    methods: {

    }
  }
</script>
