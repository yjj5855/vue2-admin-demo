<template>
  <transition name="fade" mode="in-out">
    <div style="background: #f0f3f3;position: absolute;top: 0; right: 0;bottom: 0;left: 0;height: 100vh;width: 100%">
      <el-row type="flex">
        <section class="flex-1">
          <el-carousel :autoplay="false" style="height:100vh;">
            <el-carousel-item v-for="item in img_list" :style="{'background-image': `url(${item})`}" style="height:100%;background-size: cover;">
              <div class="img-cover"></div>
              <!--<div style="color: #fff;font-size: 50px;font-weight: 100;">-->
                <!--已有<animated-integer v-bind:value="count_company"></animated-integer>+企业使用班步-->
              <!--</div>-->
            </el-carousel-item>
          </el-carousel>
        </section>
        <section class="login-box">
          <header style="padding-top: 100px;">
            <h1 style="text-align: center;">欢迎使用班步SaaS平台</h1>
          </header>
          <div style="padding: 30px;">
            <el-form ref="form" :model="form">
              <el-form-item>
                <el-input v-model="form.name" placeholder="请输入邀请码"></el-input>
              </el-form-item>
              <el-form-item >
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
          <footer style="font-size: 14px;text-align: center">
            账号已有，直接<a>登录</a>吧。没有账号，赶快<a>注册</a>吧
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
    background: rgba(255,255,255, 0.8);
  }
  .img-cover{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
  }
</style>
<script>
  import AnimatedInteger from 'components/animated-integer'
  export default{
    data () {
      return {
        msg: 'hello vue',
        count_company: 1000,
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
