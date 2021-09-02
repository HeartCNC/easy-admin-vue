<template>
  <view-list class=""
             :pagination="query"
             @pagination="getList">
    <!-- <layout-justify class="fixed-header">
      <template slot="left">
        <el-button>123</el-button>
      </template>
      <template slot="right">
        <el-button>123</el-button>
      </template>
    </layout-justify> -->
    <layout-justify>
      <template slot="left">
        <el-button v-for="(item, index) in btns" :key="index" @click="item.func">{{ item.label }}</el-button>
      </template>
      <template slot="right">
        <el-button>123</el-button>
      </template>
    </layout-justify>
    <table-list ref="table"
                :loading="query.loading"
                :columns="cptCol"
                :data-source="list"
                :default-sort="{prop: 'date', order: 'descending'}"
                :selections="table.selections" />
  </view-list>
</template>

<script>
import ViewList from '@/components/ViewList'
import LayoutJustify from '@/components/Layout/justify'
// import LayoutHeader from '@/Layout/header'
import TableList from '@/components/TableList'
export default {
  name: 'Dashboard',
  components: {
    ViewList,
    LayoutJustify,
    TableList
    // LayoutHeader
  },
  data() {
    return {
      query: {
        loading: false,
        total: 0,
        page: 1,
        size: 10
      },
      btns: [
        { label: '确定', func: () => {
          console.log(this)
        } }
      ],
      queryResult: {},
      list: [],
      table: {
        selections: []
      }
    }
  },
  computed: {
    cptCol() {
      return [
        {
          width: '120',
          label: '销量',
          align: 'center',
          prop: 'date',
          sortable: true,
          formatter(value) {
            return value
          },
          cellClass(value) {
            return 'is-dd'
          }
        },
        {
          width: '90',
          label: '总库存',
          align: 'center',
          prop: 'name'
        },
        {
          width: '160',
          label: '地址',
          align: 'center',
          prop: 'address',
          sortable: true,
          ellipsis: true
        },
        {
          label: '操作',
          align: 'center',
          prop: '$opration',
          slot: true
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  mounted() {

  },
  methods: {
    getList() {
      this.query.loading = true
      setTimeout(() => {
        this.query.loading = false
        const select = []
        this.list = Array(this.query.size).fill(0).map((item, index) => {
          const id = +`${this.query.page}${index}`
          const data = {
            id: id,
            date: id,
            name: id,
            address: 'add: ' + id
          }
          if (id % 3 === 0) {
            select.push(data)
          }
          return data
        })
        this.table.selections = select
        const [total] = [50]
        this.query.total = total
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-header {
  padding: $--size-space;
  position: fixed;
  top: #{$--height-navbar};
  right: 0;
  width: calc(100% - #{$--width-sidebar});
  background-color: #fff;
  @include shadow-gray(2px, 2px);
  z-index: 1;
}
</style>
