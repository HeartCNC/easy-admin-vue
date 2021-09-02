<template>
  <aside class="float-left scroll-y sidebar">
    <el-menu class="menu"
             :default-active="cptActiveMenu"
             :collapse="false"
             mode="vertical">
      <template v-for="item in cptRoutes">
        <template v-if="!item.hidden">
          <el-submenu v-if="!item.redirect"
                      :key="item.name"
                      :index="item.path">
            <template slot="title">
              <i v-if="item.meta.icon"
                 class="menu-icon"
                 :class="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </template>
            <sidebar-item v-for="child in item.children"
                          :key="child.name"
                          :route="child" />
          </el-submenu>
          <sidebar-item v-else
                        :key="item.name"
                        :route="item" />
        </template>
      </template>
    </el-menu>
  </aside>
</template>

<script>
import SidebarItem from './item'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  computed: {
    cptRoutes() {
      return this.$router.options.routes
    },
    cptActiveMenu() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  width: $--width-sidebar;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);

  .menu {
    height: 100%;
    border: none;
    user-select: none;
    // reset
    .el-submenu__title,
    .el-menu-item {
      padding-left: 48px !important;
      position: relative;
      height: 48px;
      line-height: 48px;
      &:hover,
      &:focus {
        background-color: unset;
      }

      &.is-active {
        color: $--color-primary-light-1;
        background-color: $--color-primary-light-9;
      }

      .menu-icon {
        margin-right: 0;
        position: absolute;
        top: 50%;
        left: 24px;
        transform: translateY(-50%);
      }
    }

    .el-submenu > .el-menu-item {
      padding-left: 20px !important;
    }

    .collapse-transition {
      transition: none;
    }
  }
}
</style>
