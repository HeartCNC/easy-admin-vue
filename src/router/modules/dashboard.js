import Viewport from '@/viewport'

export default {
  path: '/',
  meta: {
    title: 'Dashboard',
    icon: 'el-icon-s-tools'
  },
  name: 'Dashboard',
  component: Viewport,
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard1',
      meta: {
        title: 'Dashboard'
      }
    },
    {
      path: 'qs',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard2',
      meta: {
        title: 'Dashboard'
      }
    }
  ]
}
