<template>
  <router-link :to="cptPath">
    <el-menu-item v-if="!route.hidden" :index="cptPath">
      <template slot="title">
        <i v-if="route.meta.icon" class="menu-icon" :class="route.meta.icon" />
        <span>{{ route.meta.title }}</span>
      </template>
    </el-menu-item>
  </router-link>
</template>

<script>

export default {
  components: {},
  props: {
    route: {
      type: Object,
      default: () => ({})
    },
    parent: {
      type: Object,
      default: () => ({
        path: '/'
      })
    }
  },
  data() {
    return {
    }
  },
  computed: {
    cptPath() {
      return this.parent.path + this.route.path
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
