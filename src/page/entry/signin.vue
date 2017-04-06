<template>
  <div class="login-box">
    <header style="padding-top: 150px;">
      <h1 style="text-align: center;color:#fff">欢迎注册</h1>
    </header>
    <div style="padding: 10px 30px;">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input type="mobile" v-model="form.account" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-input type="password" v-model="form.code" placeholder="请输入短信验证码"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-input type="password" v-model="form.password" placeholder="请输入登录密码"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row class="password-desc" type="flex">
            <i class="el-icon-fa-lightbulb-o"></i>
            <el-col class="flex-1">请输入不少于6位数的密码，必须为字母与数字的混合密码</el-col>
          </el-row>
          <password-strength :text="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%;">注册</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="space-between" class="login-body__bottom">
        <div></div>
        <div>有账号，<router-link :to="{name: 'login'}" tag="span">马上登录></router-link></div>
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
<style>

</style>
<script>
  import axios from 'axios'
  import PasswordStrength from 'components/password-strength'
  export default{
    data () {
      return {
        form: {
          account: '',
          code: '',
          password: ''
        }
      }
    },
    components: {
      PasswordStrength
    },
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
