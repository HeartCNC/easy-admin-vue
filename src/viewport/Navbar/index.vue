<template>
  <header class="clearfloat app-navbar">
    <div class="float-left left">
      <span class="unselect logo">LOGO</span>
    </div>
    <div class="float-right right">
      <el-dropdown szie="small"
                   trigger="hover">
        <div class="userinfo-container">
          <div class="avatar" />
          <div class="unselect">nickname</div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown"
                          class="user-dropdown">
          <el-dropdown-item>
            <router-link to="/">
              退出登录
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  components: {
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-navbar {
  padding: 0 32px;
  position: fixed;
  top: 0;
  width: 100%;
  height: $--height-navbar;
  color: $--color-white;
  overflow: hidden;
  background: $--color-primary;
  box-shadow: 0 2px 2px 0 $--color-primary-light-1;
  z-index: 10;

  .left,
  .right {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .left {
    .logo {
      font-size: 20px;
    }
  }

  .right {
    font-size: 14px;

    .userinfo-container {
      display: flex;
      align-items: center;
      color: $--color-white;
      cursor: pointer;
      > div {
        display: inline-block;
        margin-left: $--size-space;
      }
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;
    }
  }
}
</style>
