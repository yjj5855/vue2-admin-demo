<template>
  <div>

    <div id="infovis" style="width: 100%;height: 500px;"></div>

  </div>
</template>
<style>

</style>
<script>
  export default{
    data () {
      return {

      }
    },
    components: {

    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '人员信息', path: '/user'}, {name: '组织架构', path: '/user/org'}])
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
