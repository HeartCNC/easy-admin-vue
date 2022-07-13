<template>
  <div class="login-container">
    <div class="blur-bg" />
    <el-form ref="loginForm"
             size="medium"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             label-position="left">
      <div class="title-container">
        <h3 class="title">后台管理</h3>
      </div>
      <el-form-item prop="username">
        <el-input ref="username"
                  v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                  placeholder="请输入用户名"
                  name="username"
                  type="text" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input key="password"
                  ref="password"
                  v-model="loginForm.password"
                  prefix-icon="el-icon-lock"
                  type="password"
                  placeholder="请输入密码"
                  name="password" />
      </el-form-item>
      <el-form-item prop="captcha"
                    class="form-code">
        <el-input ref="captcha"
                  v-model="loginForm.captchaCode"
                  prefix-icon="el-icon-paperclip"
                  placeholder="请输入验证码"
                  maxlength="6"
                  type="text"
                  @keyup.enter.native="handleLogin" />
        <img :src="captchaImg"
             class="code"
             alt=""
             title="更换验证码"
             @click="tapCaptcha">
      </el-form-item>
      <el-button :loading="loading"
                 size="medium"
                 type="primary"
                 class="btn-login"
                 @click.native.prevent="handleLogin">
        登 录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { apiCaptcha, apiSysLogin } from '@/api/index'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captchaTicket: '',
        captchaCode: ''
      },
      captchaImg: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        captchaCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loading: false
    }
  },
  computed: {
    redirect() {
      return this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect)
    }
  },
  mounted() {
    this.tapCaptcha()
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (!valid) {
          return
        }
        this.loading = true
        try {
          const data = await apiSysLogin(this.loginForm)
          setToken(data)
          this.$router.replace({ path: this.redirect || '/' })
        } catch (error) {
          this.$message.error(error.message)
          this.tapCaptcha()
        }
        this.loading = false
      })
    },
    async tapCaptcha() {
      try {
        const data = await apiCaptcha()
        this.captchaImg = data.base64Img
        this.loginForm.captchaTicket = data.ticket
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .blur-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: #e3e8ee;
  }

  .login-form {
    padding: 40px 60px 60px;
    width: 440px;
    position: relative;
    border: 1px solid #dcdfe6;
    background-color: rgba($color: #fff, $alpha: 0.5);
    overflow: hidden;

    .el-input__icon {
      color: #fff;
    }

    .el-input {
      display: inline-block;
    }

    .form-code {
      position: relative;
      padding-right: 112px;
      .code {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100px;
        transform: translateX(100%) translateX(12px) translateX(1px);
        cursor: pointer;
        object-fit: contain;
        object-position: center;
        font-size: 0;
        border: 1px solid transparent;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        &[src="unknown"] {
          display: none;
        }
      }
    }
  }

  .title-container {
    position: relative;
    margin-bottom: 20px;

    .title {
      font-size: 26px;
      color: $--color-primary-light-2;
      text-align: center;
      font-weight: bold;
    }
  }

  .btn-login {
    display: block;
    width: 100%;
  }
}
</style>
