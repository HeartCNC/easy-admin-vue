<template>
  <el-select v-model="selected"
             :placeholder="placeholder"
             @change="onSelect">
    <el-option v-for="item in cptDict"
               :key="item.value"
               :label="item.label"
               :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { getDict } from '@/dictionary'
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    dictKey: {
      type: String,
      default: ''
    },
    dict: {
      type: Array,
      default: () => ([])
    },
    fillAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: this.value
    }
  },
  computed: {
    cptDict() {
      return this.dictKey ? getDict(this.dictKey, this.fillAll) : this.dict
    }
  },
  methods: {
    onSelect(e) {
      this.$emit('input', e)
      this.$emit('change', e)
    }
  }
}
</script>
