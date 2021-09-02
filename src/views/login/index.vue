<template>
  <div class="login-container">
    <div class="blur-bg" />
    <el-form ref="loginForm"
             size="small"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             autocomplete="off"
             label-position="left">
      <div class="title-container">
        <h3 class="title">欢迎您</h3>
      </div>

      <el-form-item prop="username">
        <el-input ref="username"
                  v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                  placeholder="Username"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  prefix-icon="el-icon-lock"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading"
                 size="small"
                 type="primary"
                 class="btn-login"
                 @click.native.prevent="handleLogin">
        登 录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
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
    @include gradient-primary;
    filter: blur(4px);
    z-index: -1;
  }

  .login-form {
    padding: 60px 60px;
    width: 440px;
    position: relative;
    border: 1px solid #fff;
    border-radius: $--size-space;
    background-color: $--color-white-light-2;
    overflow: hidden;

    .el-input__icon {
      color: #fff;
    }

    .el-input {
      display: inline-block;
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
