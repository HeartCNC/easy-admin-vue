import Vue from 'vue'
import Router from 'vue-router'

import common from './common'
import modules from './modules'

Vue.use(Router)

const routes = [
  ...common,
  ...modules
]

const createRouter = () => new Router({
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
