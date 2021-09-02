<template>
  <section class="view-list"
           :class="{'fixed-pagination': fixedPagination}">
    <slot />
    <div class="text-right pagination-container">
      <pagination :total="pagination.total"
                  :page.sync="pagination.page"
                  :limit.sync="pagination.size"
                  @pagination="pageChange" />
    </div>
  </section>
</template>

<script>
import Pagination from './pagination'
export default {
  components: {
    Pagination
  },
  props: {
    fixedPagination: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: () => ({})
    }
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
    pageChange(e) {
      this.$emit('pagination', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.view-list {
  height: 100%;

  .pagination-container {
    margin-top: $--size-space;
    width: 100%;
    background-color: #fff;
  }

  &.fixed-pagination {
    margin-bottom: -52px - $--size-space-multiply-2;
    padding-bottom: 52px + $--size-space-multiply-2;
    .pagination-container {
      margin-top: 0;
      padding: $--size-space;
      position: fixed;
      right: 0;
      bottom: 0;
      width: calc(100% - #{$--width-sidebar});
      z-index: 1;
      @include shadow-gray(2px, -2px);
    }
  }
}
</style>
