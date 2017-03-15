<template>
  <div class="page-404">

    <div class="image">
      <div class="text-title">班步系统维护升级中，稍后回来......</div>
      <div class="white-space"></div>
      <div class="text-small">升级期间班步门户暂停服务，升级时间：2017.01.06 19:00-24:00</div>
      <div class="text-small">感谢您的配合，期待为您提供更优质的服务</div>
      <div class="text-small">知道了 <a>前往官网 >></a></div>
    </div>

  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../var";
  .page-404{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: url("../assets/404.jpg");
    background-repeat: no-repeat;
    background-position: 0% 40%;

    .image{
      width: 500px;
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      div{
        margin-left: 50px;
      }
    }

    .text-title{
      font-size: 16px;
      color: #222;
    }
    .text-small{
      font-size: 14px;
      color: #999;

      a{
        color: @--color-primary;
      }
    }
  }
</style>
<script>
  export default{
    components: {

    },
    data () {
      return {

      }
    },
    computed: {

    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
  }
</script>
