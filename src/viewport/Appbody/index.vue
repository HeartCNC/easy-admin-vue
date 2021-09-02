<template>
  <section class="app-body">
    <Sidebar />
    <Main />
  </section>
</template>

<script>
import Sidebar from './Sidebar'
import Main from './Main'
export default {
  name: 'Appbody',
  components: {
    Sidebar,
    Main
  },
  data() {
    return {
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

<style lang="scss">
.app-body {
  padding-top: $--height-navbar;
  height: 100%;
}
</style>
