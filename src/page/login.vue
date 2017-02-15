<template>
  <el-row type="flex">
    <section class="flex-1">
      <el-carousel :autoplay="false" style="height:100vh;">
        <el-carousel-item v-for="item in 4" style="height:100%;">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section style="width: 400px;">
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
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<script>
  export default{
    data () {
      return {
        msg: 'hello vue',
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
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
