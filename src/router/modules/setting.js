import Layout from '@/layout'

export default {
  path: '/setting',
  name: 'settings',
  component: Layout,
  // 配置二级路由表
  children: [
    {
      path: '', // 什么都不写，表示改路由为当前二级路由的默认路由
      component: () => import('@/views/setting'),
      // 路由元信息
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
