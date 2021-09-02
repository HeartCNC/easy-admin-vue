<template>
  <el-date-picker v-model="dateRange"
                  type="daterange"
                  :clearable="false"
                  :picker-options="datePickerOption"
                  :value-format="valueFormat"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  placeholder="请选择"
                  @change="dateChange" />
</template>

<script>
import { dateFormat } from '@actly/core'

export default {
  props: {
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  data() {
    return {
      dateRange: [],
      datePickerOption: {
        disabledDate(date) {
          return Date.now() <= date.getTime()
        }
      }
    }
  },
  methods: {
    dateChange(e) {
      this.query.startTime = dateFormat(this.dateRange[0], this.valueFormat)
      this.query.endTime = dateFormat(this.dateRange[1], this.valueFormat)
    }
  }
}
</script>
