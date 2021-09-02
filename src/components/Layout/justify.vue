<template>
  <section class="clear-float layout-justify">
    <div class="float-left">
      <slot name="left" />
    </div>
    <div class="float-right">
      <slot name="right" />
    </div>
  </section>
</template>

<script>

export default {
  components: {},
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

<style lang="scss" scoped>
.layout-justify {
  width: 100%;
}
</style>
