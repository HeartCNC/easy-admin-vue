<template>
  <div class="viewport-container">
    <Navbar />
    <Appbody />
  </div>
</template>

<script>
import Navbar from './Navbar'
import Appbody from './Appbody'

export default {
  name: 'Viewport',
  components: {
    Navbar,
    Appbody
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.viewport-container {
  height: 100%;
  background-color: #e5eaf0;
}
</style>
