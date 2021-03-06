import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  // 配置二级路由表
  children: [
    {
      path: '', // 什么都不写，表示改路由为当前二级路由的默认路由
      component: () => import('@/views/employees'),
      // 路由元信息
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id?', // 动态路由传参
      hidden: true,
      component: () => import('@/views/employees/detail'),
      meta: {
        title: '员工详情'
      }
    },
    {
      path: 'print/:id?', // 动态路由传参
      hidden: true,
      component: () => import('@/views/employees/print'),
      meta: {
        title: '打印详情'
      }
    }
  ]
}
