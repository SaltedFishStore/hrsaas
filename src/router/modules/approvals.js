import Layout from '@/layout'

export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  // 配置二级路由表
  children: [
    {
      path: '', // 什么都不写，表示改路由为当前二级路由的默认路由
      component: () => import('@/views/approvals'),
      // 路由元信息
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
