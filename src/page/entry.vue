<template>
  <transition name="fade" mode="in-out">
    <div class="entry-page">
      <el-row type="flex">
        <section class="flex-1">
          <el-carousel :autoplay="false" style="height:100vh;">
            <el-carousel-item v-for="item in img_list" :style="{'background-image': `url(${item})`}" style="height:100%;background-size: cover;">
              <div class="img-cover">
                <div style="font-size: 20px;font-weight: 300;color: #fff;">人力资源智能云平台班步VIP版</div>
                <div style="color: #fff;font-size: 60px;font-weight: 300;margin-top: 200px;margin-left: 80px;">
                  <div><span style="font-size: 35px;border-bottom: 1px #fff solid;padding-bottom: 20px;margin-bottom: 20px;display: inline-block;">班步人力资源Saas平台</span></div>
                  <animated-integer v-bind:value="count_1" />+<span style="font-size: 16px;"> 人事，IT专家的智慧</span>
                  <animated-integer v-bind:value="count_2" />+<span style="font-size: 16px;"> 企业的选择</span>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </section>

        <transition name="entry" mode="out-in">
          <router-view></router-view>
        </transition>

      </el-row>
    </div>
  </transition>
</template>
<style lang="less" rel="stylesheet/less">
  body{
    margin: 0;
  }
  .flex-1{
    flex: 1;
  }
  .el-carousel__container{
    height: 100vh;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #4b515d;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #3a3c40;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .entry-enter-active, .entry-leave-active {
    transition: all .5s;
  }
  .entry-enter, .entry-leave-active {
    transform: translateX(500px);
  }

  .entry-page{
    background: #f0f3f3;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100%;

    .img-cover{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 20px;
      background: rgba(0,0,0,0.4);
    }
  }


</style>
<script>
  import AnimatedInteger from 'components/animated-integer'
  export default{
    data () {
      return {
        count_1: 100,
        count_2: 10000,
        img_list: [
          'https://demo.ibanbu.com/resources/img/bg1.jpg?76',
          'https://demo.ibanbu.com/resources/img/bg2.jpg?76'
        ]
      }
    },
    components: {
      AnimatedInteger
    },
    methods: {

    }
  }
</script>
