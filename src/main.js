import '@/assets/styles/index.scss'
import ElementUI from 'element-ui'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
