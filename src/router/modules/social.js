import Layout from '@/layout'

export default {
  path: '/social',
  name: 'social_securitys',
  component: Layout,
  // 配置二级路由表
  children: [
    {
      path: '', // 什么都不写，表示改路由为当前二级路由的默认路由
      component: () => import('@/views/social'),
      // 路由元信息
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
