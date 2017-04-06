<template>
  <div class="login-box">
    <header style="padding-top: 150px;">
      <h1 style="text-align: center;color:#fff">欢迎使用班步SaaS平台</h1>
    </header>
    <div style="padding: 10px 30px;">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input type="mobile" v-model="form.account" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="space-between" class="login-body__bottom">
        <router-link :to="{name: 'forget-password'}" tag="div">忘记密码？</router-link>
        <div>没有账号，<router-link :to="{name: 'signin'}" tag="span">马上注册></router-link></div>
      </el-row>
    </div>
    <footer class="login-footer">
      <el-row type="flex" style="color: #fff" v-for="item in 2">
        <span>[系统公告]：</span>
        <el-col class="flex-1" style="color: #11b95c">系统维护升级公告</el-col>
        <span>2017/01/04</span>
      </el-row>
    </footer>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../var";
  .login-box{
    width: 400px;
    position: absolute;
    top: 0;
    right: 100px;
    bottom: 0;
    z-index: 2;
    background: rgba(255,255,255, 0.3);

    .password-desc{
      line-height: 1.2;
      margin-bottom: 11px;
      color: #fff;

      .el-icon-fa-lightbulb-o{
        color: @color-warning;
        font-size: 26px!important;
        margin-right: 5px;
      }
    }
  }
  .login-body__bottom{
    color: #e4e4e4;
    font-size: 14px;
    padding-bottom: 11px;
    margin-bottom: 11px;
    border-bottom: @border-base;

    span{
      color: @color-primary;
    }
  }
  .login-footer{
    font-size: 14px;color: #fff;padding: 0 30px;
  }
</style>
<script>
  import axios from 'axios'
  export default{
    data () {
      return {
        form: {
          account: '13812345678',
          password: 'admin'
        }
      }
    },
    components: {},
    methods: {
      onSubmit () {
        axios.post('/login', this.form)
          .then((data) => {
            this.$router.replace('/')
          })
          .catch((err) => {
            this.$message.error(err.reasons && err.reasons[0].message || '登录失败')
          })
      }
    }
  }
</script>
