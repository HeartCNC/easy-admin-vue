<template>
  <section class="scroll-y main">
    <div class="main-container">
      <router-view :key="key" />
    </div>
  </section>
</template>

<script>

export default {
  name: 'Main',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-left: $--width-sidebar;
  padding: $--size-space;
  position: relative;
  width: calc(100% - #{$--width-sidebar});
  height: 100%;
  .main-container {
    position: relative;
    padding: $--size-space;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  }
}
</style>
