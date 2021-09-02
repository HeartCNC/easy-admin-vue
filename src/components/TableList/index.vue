<template>
  <el-table ref="table"
            v-loading="loading"
            :data="dataSource"
            border
            :default-sort="defaultSort"
            :cell-class-name="__cellClassName"
            @selection-change="__selectionChange">
    <el-table-column v-if="showSelection"
                     type="selection"
                     width="40"
                     align="center" />
    <template v-for="(column, index) in columns">
      <el-table-column :key="index"
                       :type="column.type"
                       :fixed="column.fixed"
                       :width="column.width"
                       :label="column.label"
                       :align="column.align || 'center'"
                       :prop="column.prop"
                       :sortable="column.sortable"
                       :sort-method="column.sort"
                       :show-overflow-tooltip="column.ellipsis">
        <template slot-scope="scope">
          <template v-if="!column.render">
            <template v-if="column.slot">
              <slot :name="column.prop" :row="scope.row" />
            </template>
            <template v-else>
              <span>{{ (column.formatter && column.formatter(scope.row[column.prop], scope)) || scope.row[column.prop] }}</span>
            </template>
          </template>
          <template v-else>
            <render :column="column"
                    :scope="scope"
                    :render="column.render" />
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>

export default {
  components: {
    render: {
      functional: true,
      props: {
        column: Object,
        render: Function,
        scope: Object
      },
      render: (h, content) => {
        return content.props.render(h, content)
      }
    }
  },
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    border: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    defaultSelections: {
      type: Array,
      default: () => ([])
    },
    defaultSort: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    tableData() {
      return this.$refs.table.tableData
    },
    selections() {
      return this.multipleSelection || []
    }
  },
  watch: {
    dataSource() {
      this.$nextTick(this.__selectDefault)
    }
  },
  methods: {
    __cellClassName({ row, columnIndex }) {
      const selection = +this.showSelection
      const col = this.columns[columnIndex - selection]
      if (col && col.cellClass) {
        return col.cellClass(row[col.prop], arguments)
      }
    },
    __selectionChange(val) {
      this.multipleSelection = val
    },
    __selectDefault() {
      if (this.defaultSelections) {
        this.defaultSelections.forEach(row => {
          this.$refs.table.toggleRowSelection(row, true)
        })
      }
    },
    getSelection() {
      return this.multipleSelection
    }
  }
}
</script>
