<template>
  <transition name="bounce">
    <div>
      <common-header/>
      <el-row>
        <el-col :span="4">
          <common-menu/>
        </el-col>

        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>
<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.1) translate(4000px,200px) ;
    }
    /*50% {*/
      /*transform: scale(1.2) translateX(150px);*/
    /*}*/
    100% {
      opacity: 1;
      transform: scale(1) translate(0px) ;
    }
  }
  @keyframes bounce-out {
    0% {
      opacity: 1;
      transform: scale(1) translate(0px);
    }
    /*50% {*/
      /*transform: scale(1.2) translateX(150px);*/
    /*}*/
    100% {
      opacity: 0;
      transform: scale(0.1) translate(4000px,200px);
    }
  }
</style>
<script>
  import CommonHeader from '../components/common-header.vue'
  import CommonMenu from '../components/common-menu.vue'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      CommonHeader,
      CommonMenu
    }
  }
</script>
