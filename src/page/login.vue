<template>
  <transition name="fade" mode="in-out">
    <div style="background: #f0f3f3;position: absolute;top: 0; right: 0;bottom: 0;left: 0;height: 100vh;width: 100%">


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

        <section class="login-box">
          <header style="padding-top: 150px;">
            <h1 style="text-align: center;color:#fff">欢迎使用班步SaaS平台</h1>
          </header>
          <div style="padding: 10px 30px;">
            <el-form ref="form" :model="form">
              <el-form-item>
                <el-input v-model="form.name" placeholder="请输入邀请码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-input v-model="form.name" placeholder="请输入验证码"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.date1" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <div>换一张</div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 100%;">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <footer class="login-footer">
            <el-row type="flex" style="color: #fff" v-for="item in 2">
              <span>[系统公告]：</span>
              <el-col class="flex-1" style="color: #11b95c">系统维护升级公告</el-col>
              <span>2017/01/04</span>
            </el-row>
          </footer>
        </section>
      </el-row>
    </div>
  </transition>
</template>
<style>
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

  .login-box{
    width: 400px;
    position: absolute;
    top: 0;
    right: 100px;
    bottom: 0;
    z-index: 2;
    background: rgba(255,255,255, 0.3);
  }
  .login-footer{
    font-size: 14px;color: #fff;padding: 0 30px;
  }
  .img-cover{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 20px;
    background: rgba(0,0,0,0.4);
  }
</style>
<script>
  import AnimatedInteger from 'components/animated-integer'
  export default{
    data () {
      return {
        msg: 'hello vue',
        count_1: 100,
        count_2: 10000,
        img_list: [
          'https://demo.ibanbu.com/resources/img/bg1.jpg?76',
          'https://demo.ibanbu.com/resources/img/bg2.jpg?76'
        ],
        form: {
          name: '',
          region: '',
          date1: '2133',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    components: {
      AnimatedInteger
    },
    methods: {
      onSubmit () {
        this.$router.replace('/')
      }
    }
  }
</script>
