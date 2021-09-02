import InDate from './Form/date'
import InSelect from './Form/select'

export {
  InDate,
  InSelect
}

export default {
  install(Vue) {
    Vue.component('in-date', InDate)
    Vue.component('in-select', InSelect)
  }
}
